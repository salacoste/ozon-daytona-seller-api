/**
 * Last ID pagination iterator for Ozon Seller API
 */

import type {
  ILastIdPaginationParams,
  LastIdPageFetcher,
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
 * Iterate through pages using last_id pagination pattern
 * 
 * This iterator fetches pages until the last_id becomes empty or undefined,
 * which indicates the end of results.
 * 
 * @param fetchPage - Function that fetches a page given parameters
 * @param initialParams - Initial parameters for the first page
 * @param config - Optional pagination configuration
 * 
 * @example
 * ```typescript
 * // Iterate through all FBO returns
 * for await (const page of iterateByLastId(
 *   (params) => client.fbo.getReturnsV3(params),
 *   { date_from: '2024-01-01', limit: 500 }
 * )) {
 *   console.log(`Page ${page.pageNumber}: ${page.value.result.returns.length} returns`);
 *   // Process page.value.result.returns
 * }
 * ```
 */
export async function* iterateByLastId<
  TParams extends ILastIdPaginationParams,
  TResult
>(
  fetchPage: LastIdPageFetcher<TParams, TResult>,
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
  let lastId: string | undefined = currentParams.last_id;
  
  while (pageNumber <= finalConfig.maxPages) {
    // Update parameters with current last_id
    const pageParams = {
      ...currentParams,
      ...(lastId !== undefined && { last_id: lastId }),
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
    
    // Extract last_id for next iteration
    const nextLastId = page.result.last_id;
    
    // Check if we should continue
    const hasNext = page.result.has_next === true;
    const hasValidLastId = nextLastId && nextLastId.trim().length > 0;
    
    // Stop if no more pages or no valid last_id
    if (!hasNext || !hasValidLastId) {
      break;
    }
    
    // Prepare for next iteration
    lastId = nextLastId;
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
 * Convenience function to collect all pages from last_id pagination into an array
 * 
 * @param fetchPage - Function that fetches a page given parameters
 * @param initialParams - Initial parameters for the first page
 * @param config - Optional pagination configuration
 * @returns Array of all page results
 * 
 * @example
 * ```typescript
 * const allReturns = await collectByLastId(
 *   (params) => client.fbo.getReturnsV3(params),
 *   { date_from: '2024-01-01', limit: 500 },
 *   { maxPages: 10 }
 * );
 * ```
 */
export async function collectByLastId<
  TParams extends ILastIdPaginationParams,
  TResult
>(
  fetchPage: LastIdPageFetcher<TParams, TResult>,
  initialParams: TParams,
  config: Partial<IPaginationConfig> = {}
): Promise<Array<Awaited<ReturnType<typeof fetchPage>>>> {
  const pages: Array<Awaited<ReturnType<typeof fetchPage>>> = [];
  
  for await (const page of iterateByLastId(fetchPage, initialParams, config)) {
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
 * const allReturnItems = await collectItemsByLastId(
 *   (params) => client.fbo.getReturnsV3(params),
 *   { date_from: '2024-01-01' },
 *   (page) => page.result.returns,
 *   { maxPages: 5 }
 * );
 * ```
 */
export async function collectItemsByLastId<
  TParams extends ILastIdPaginationParams,
  TResult,
  TItem
>(
  fetchPage: LastIdPageFetcher<TParams, TResult>,
  initialParams: TParams,
  extractItems: (page: Awaited<ReturnType<typeof fetchPage>>) => TItem[],
  config: Partial<IPaginationConfig> = {}
): Promise<TItem[]> {
  const allItems: TItem[] = [];
  
  for await (const page of iterateByLastId(fetchPage, initialParams, config)) {
    const items = extractItems(page.value);
    allItems.push(...items);
  }
  
  return allItems;
}