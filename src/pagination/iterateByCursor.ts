/**
 * Cursor pagination iterator for Ozon Seller API
 */

import type {
  ICursorPaginationParams,
  CursorPageFetcher,
  IPaginationConfig,
  IPaginationIteratorResult,
} from './types';

/**
 * Default pagination configuration
 */
const DEFAULT_CONFIG: Required<IPaginationConfig> = {
  defaultLimit: 100,
  maxLimit: 1000,
  maxPages: 100,
  delayBetweenPages: 0,
};

/**
 * Iterate through pages using cursor pagination pattern
 * 
 * This iterator fetches pages using cursor-based pagination until 
 * next_cursor becomes empty/undefined or has_next becomes false.
 * 
 * @param fetchPage - Function that fetches a page given parameters
 * @param initialParams - Initial parameters for the first page
 * @param config - Optional pagination configuration
 * 
 * @example
 * ```typescript
 * // Iterate through all products with cursor pagination
 * for await (const page of iterateByCursor(
 *   (params) => client.product.listByCursor(params),
 *   { limit: 250 }
 * )) {
 *   console.log(`Page ${page.pageNumber}: ${page.value.result.products.length} products`);
 *   // Process page.value.result.products
 * }
 * ```
 */
export async function* iterateByCursor<
  TParams extends ICursorPaginationParams,
  TResult
>(
  fetchPage: CursorPageFetcher<TParams, TResult>,
  initialParams: TParams,
  config: Partial<IPaginationConfig> = {}
): AsyncGenerator<IPaginationIteratorResult<Awaited<ReturnType<typeof fetchPage>>>, void, unknown> {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };
  
  let currentParams = {
    ...initialParams,
    limit: initialParams.limit ?? finalConfig.defaultLimit,
  };
  
  // Validate limit
  if (currentParams.limit && currentParams.limit > finalConfig.maxLimit) {
    throw new Error(`Limit ${currentParams.limit} exceeds maximum allowed ${finalConfig.maxLimit}`);
  }
  
  let pageNumber = 1;
  let totalFetched = 0;
  let cursor: string | undefined = currentParams.cursor;
  
  while (pageNumber <= finalConfig.maxPages) {
    // Update parameters with current cursor
    const pageParams = {
      ...currentParams,
      ...(cursor !== undefined && { cursor }),
    } as TParams;
    
    // Fetch the page
    const page = await fetchPage(pageParams);
    
    // Check if we have results
    const hasResults = page.result && typeof page.result === 'object';
    if (!hasResults) {
      break;
    }
    
    // Yield the current page
    yield {
      value: page,
      pageNumber,
      totalFetched: totalFetched + 1,
      done: false,
    };
    
    totalFetched++;
    
    // Extract next_cursor for next iteration
    const nextCursor = page.result.next_cursor;
    
    // Check if we should continue
    const hasNext = page.result.has_next === true;
    const hasValidCursor = nextCursor && nextCursor.trim().length > 0;
    
    // Stop if no more pages or no valid cursor
    if (!hasNext || !hasValidCursor) {
      break;
    }
    
    // Prepare for next iteration
    cursor = nextCursor;
    pageNumber++;
    
    // Add delay between pages if configured
    if (finalConfig.delayBetweenPages > 0) {
      await new Promise(resolve => setTimeout(resolve, finalConfig.delayBetweenPages));
    }
  }
  
  // Check if we hit the page limit
  if (pageNumber > finalConfig.maxPages) {
    throw new Error(`Pagination limit exceeded: fetched ${finalConfig.maxPages} pages`);
  }
}

/**
 * Convenience function to collect all pages from cursor pagination into an array
 * 
 * @param fetchPage - Function that fetches a page given parameters
 * @param initialParams - Initial parameters for the first page
 * @param config - Optional pagination configuration
 * @returns Array of all page results
 * 
 * @example
 * ```typescript
 * const allProductPages = await collectByCursor(
 *   (params) => client.product.listByCursor(params),
 *   { category_id: '123', limit: 250 },
 *   { maxPages: 20 }
 * );
 * ```
 */
export async function collectByCursor<
  TParams extends ICursorPaginationParams,
  TResult
>(
  fetchPage: CursorPageFetcher<TParams, TResult>,
  initialParams: TParams,
  config: Partial<IPaginationConfig> = {}
): Promise<Array<Awaited<ReturnType<typeof fetchPage>>>> {
  const pages: Array<Awaited<ReturnType<typeof fetchPage>>> = [];
  
  for await (const page of iterateByCursor(fetchPage, initialParams, config)) {
    pages.push(page.value);
  }
  
  return pages;
}

/**
 * Convenience function to collect all items from all pages into a flat array
 * 
 * @param fetchPage - Function that fetches a page given parameters
 * @param initialParams - Initial parameters for the first page
 * @param extractItems - Function to extract items array from page result
 * @param config - Optional pagination configuration
 * @returns Flat array of all items
 * 
 * @example
 * ```typescript
 * const allProducts = await collectItemsByCursor(
 *   (params) => client.product.listByCursor(params),
 *   { category_id: '123' },
 *   (page) => page.result.products,
 *   { maxPages: 10 }
 * );
 * ```
 */
export async function collectItemsByCursor<
  TParams extends ICursorPaginationParams,
  TResult,
  TItem
>(
  fetchPage: CursorPageFetcher<TParams, TResult>,
  initialParams: TParams,
  extractItems: (page: Awaited<ReturnType<typeof fetchPage>>) => TItem[],
  config: Partial<IPaginationConfig> = {}
): Promise<TItem[]> {
  const allItems: TItem[] = [];
  
  for await (const page of iterateByCursor(fetchPage, initialParams, config)) {
    const items = extractItems(page.value);
    allItems.push(...items);
  }
  
  return allItems;
}