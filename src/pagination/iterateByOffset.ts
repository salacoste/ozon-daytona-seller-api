/**
 * Offset pagination iterator for Ozon Seller API
 */

import type {
  IOffsetPaginationParams,
  OffsetPageFetcher,
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
 * Iterate through pages using offset pagination pattern
 * 
 * This iterator fetches pages using offset-based pagination (limit/offset)
 * until an empty page is returned or has_next becomes false.
 * 
 * @param fetchPage - Function that fetches a page given parameters
 * @param initialParams - Initial parameters for the first page
 * @param config - Optional pagination configuration
 * 
 * @example
 * ```typescript
 * // Iterate through all orders with offset pagination
 * for await (const page of iterateByOffset(
 *   (params) => client.fbs.getOrdersList(params),
 *   { date_from: '2024-01-01', limit: 500 }
 * )) {
 *   console.log(`Page ${page.pageNumber}: ${page.value.result.orders.length} orders`);
 *   // Process page.value.result.orders
 * }
 * ```
 */
export async function* iterateByOffset<
  TParams extends IOffsetPaginationParams,
  TResult
>(
  fetchPage: OffsetPageFetcher<TParams, TResult>,
  initialParams: TParams,
  config: Partial<IPaginationConfig> = {}
): AsyncGenerator<IPaginationIteratorResult<Awaited<ReturnType<typeof fetchPage>>>, void, unknown> {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };
  
  const limit = initialParams.limit ?? finalConfig.defaultLimit;
  
  // Validate limit
  if (limit > finalConfig.maxLimit) {
    throw new Error(`Limit ${limit} exceeds maximum allowed ${finalConfig.maxLimit}`);
  }
  
  let pageNumber = 1;
  let totalFetched = 0;
  let offset = initialParams.offset ?? 0;
  let totalItems: number | undefined;
  
  while (pageNumber <= finalConfig.maxPages) {
    // Update parameters with current offset
    const pageParams = {
      ...initialParams,
      limit,
      offset,
    } as TParams;
    
    // Fetch the page
    const page = await fetchPage(pageParams);
    
    // Check if we have results
    const hasResults = page.result && typeof page.result === 'object';
    if (!hasResults) {
      break;
    }
    
    // Extract total count if available (for first page)
    if (pageNumber === 1 && page.result.total !== undefined) {
      totalItems = page.result.total;
    }
    
    // Yield the current page
    yield {
      value: page,
      pageNumber,
      totalFetched: totalFetched + 1,
      done: false,
    };
    
    totalFetched++;
    
    // Check if we should continue based on various indicators
    const hasNext = page.result.has_next === true;
    
    // If has_next is explicitly false, stop
    if (page.result.has_next === false) {
      break;
    }
    
    // If we have total count, check if we've reached the end
    if (totalItems !== undefined && offset + limit >= totalItems) {
      break;
    }
    
    // Try to detect empty page by checking if result has array properties
    let hasItems = false;
    if (typeof page.result === 'object' && page.result !== null) {
      // Look for common array properties that might contain items
      const arrayProperties = Object.values(page.result).filter(
        value => Array.isArray(value)
      );
      
      if (arrayProperties.length > 0) {
        // Check if any array has items
        hasItems = arrayProperties.some(arr => arr.length > 0);
      } else {
        // If no arrays found, assume we have items if has_next is not false
        hasItems = hasNext !== false;
      }
    }
    
    // Stop if no items in current page
    if (!hasItems) {
      break;
    }
    
    // Prepare for next iteration
    offset += limit;
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
 * Convenience function to collect all pages from offset pagination into an array
 * 
 * @param fetchPage - Function that fetches a page given parameters
 * @param initialParams - Initial parameters for the first page
 * @param config - Optional pagination configuration
 * @returns Array of all page results
 * 
 * @example
 * ```typescript
 * const allOrderPages = await collectByOffset(
 *   (params) => client.fbs.getOrdersList(params),
 *   { date_from: '2024-01-01', limit: 500 },
 *   { maxPages: 50 }
 * );
 * ```
 */
export async function collectByOffset<
  TParams extends IOffsetPaginationParams,
  TResult
>(
  fetchPage: OffsetPageFetcher<TParams, TResult>,
  initialParams: TParams,
  config: Partial<IPaginationConfig> = {}
): Promise<Array<Awaited<ReturnType<typeof fetchPage>>>> {
  const pages: Array<Awaited<ReturnType<typeof fetchPage>>> = [];
  
  for await (const page of iterateByOffset(fetchPage, initialParams, config)) {
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
 * const allOrders = await collectItemsByOffset(
 *   (params) => client.fbs.getOrdersList(params),
 *   { date_from: '2024-01-01' },
 *   (page) => page.result.orders,
 *   { maxPages: 20 }
 * );
 * ```
 */
export async function collectItemsByOffset<
  TParams extends IOffsetPaginationParams,
  TResult,
  TItem
>(
  fetchPage: OffsetPageFetcher<TParams, TResult>,
  initialParams: TParams,
  extractItems: (page: Awaited<ReturnType<typeof fetchPage>>) => TItem[],
  config: Partial<IPaginationConfig> = {}
): Promise<TItem[]> {
  const allItems: TItem[] = [];
  
  for await (const page of iterateByOffset(fetchPage, initialParams, config)) {
    const items = extractItems(page.value);
    allItems.push(...items);
  }
  
  return allItems;
}