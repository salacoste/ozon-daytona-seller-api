/**
 * Pagination iterators for PricesStocksAPI
 * 
 * Provides async iterators for paginated endpoints with cursor navigation
 */

import type {
  IV4GetProductInfoStocksRequest,
  IV4GetProductInfoStocksResponse,
  IV4GetProductInfoStocksResponseItem,
  IProductv5GetProductInfoPricesV5Request,
  IProductv5GetProductInfoPricesV5Response,
} from '../../types/generated/prices&stocksapi';

import type { PricesStocksStockOps } from './stocks';
import type { PricesStocksPriceOps } from './prices';

/**
 * Generic cursor-based iterator for PricesStocksAPI
 * 
 * @param fetchPage - Function to fetch a page
 * @param getCursor - Function to extract cursor from response
 * @param getItems - Function to extract items from response
 */
async function* iterateWithCursor<TRequest, TResponse, TItem>(
  fetchPage: (cursor?: string) => Promise<{ data: TResponse }>,
  getCursor: (response: TResponse) => string | undefined,
  getItems: (response: TResponse) => TItem[]
): AsyncGenerator<TItem, void, unknown> {
  let cursor: string | undefined = undefined;
  let pageCount = 0;
  const maxPages = 100; // Safety limit
  
  do {
    pageCount++;
    if (pageCount > maxPages) {
      throw new Error('Pagination safety limit exceeded (100 pages)');
    }
    
    const response = await fetchPage(cursor);
    const items = getItems(response.data);
    
    for (const item of items) {
      yield item;
    }
    
    cursor = getCursor(response.data);
  } while (cursor && cursor.trim().length > 0);
}

/**
 * Iterate through all stock information with automatic pagination
 * 
 * @param stockOps - Stock operations instance
 * @param params - Base request parameters (cursor will be managed automatically)
 * @yields Stock information items
 * 
 * @example
 * ```typescript
 * for await (const stockItem of iterateStockInfo(stockOps, {
 *   filter: {
 *     visibility: "ALL",
 *     with_quant: { exists: true }
 *   },
 *   limit: 100
 * })) {
 *   console.log(`Product ${stockItem.product_id}: ${stockItem.stocks?.length} warehouses`);
 * }
 * ```
 */
export async function* iterateStockInfo(
  stockOps: PricesStocksStockOps,
  params: Omit<IV4GetProductInfoStocksRequest, 'cursor'>
): AsyncGenerator<IV4GetProductInfoStocksResponseItem, void, unknown> {
  yield* iterateWithCursor<
    IV4GetProductInfoStocksRequest,
    IV4GetProductInfoStocksResponse,
    IV4GetProductInfoStocksResponseItem
  >(
    (cursor) => stockOps.getStockInfo({ ...params, ...(cursor && { cursor }) }),
    (response) => response.cursor,
    (response) => response.items || []
  );
}

/**
 * Iterate through all price information with automatic pagination
 * 
 * @param priceOps - Price operations instance
 * @param params - Base request parameters (cursor will be managed automatically)
 * @yields Price information items
 * 
 * @example
 * ```typescript
 * for await (const priceItem of iteratePriceInfo(priceOps, {
 *   filter: {
 *     visibility: "ALL"
 *   },
 *   limit: 100
 * })) {
 *   console.log(`Product ${priceItem.product_id}: ${priceItem.price?.price} ${priceItem.price?.currency_code}`);
 *   console.log(`  Index: ${priceItem.price_indexes?.color_index}`);
 * }
 * ```
 */
export async function* iteratePriceInfo(
  priceOps: PricesStocksPriceOps,
  params: Omit<IProductv5GetProductInfoPricesV5Request, 'cursor'>
): AsyncGenerator<any, void, unknown> {
  yield* iterateWithCursor<
    IProductv5GetProductInfoPricesV5Request,
    IProductv5GetProductInfoPricesV5Response,
    any
  >(
    (cursor) => priceOps.getPriceInfo({ ...params, ...(cursor && { cursor }) }),
    (response) => response.cursor,
    (response) => (response.items as any[]) || []
  );
}