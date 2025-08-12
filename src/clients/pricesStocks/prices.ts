/**
 * Price management operations for PricesStocksAPI
 * 
 * Handles product price updates and detailed pricing information
 */

import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type {
  IProductImportProductsPricesRequest,
  IProductImportProductsPricesResponse,
  IProductv5GetProductInfoPricesV5Request,
  IProductv5GetProductInfoPricesV5Response,
} from '../../types/generated/prices&stocksapi';

/**
 * Price operations for pricing management
 */
export class PricesStocksPriceOps {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Import/Update product prices (v1)
   * 
   * Updates pricing for one or more products. Each product price can be 
   * updated up to 10 times per hour. Supports automatic action participation
   * and pricing strategy configuration.
   * 
   * @param params - Price update request with pricing details
   * @returns Update results with success/error status per item
   * 
   * @example
   * ```typescript
   * const result = await priceOps.updatePrices({
   *   prices: [
   *     {
   *       product_id: 1386,
   *       price: "1448",
   *       old_price: "1600", 
   *       min_price: "800",
   *       currency_code: "RUB",
   *       auto_action_enabled: "ENABLED",
   *       vat: "0.1"
   *     }
   *   ]
   * });
   * 
   * console.log('Price updated:', result.data.result?.[0]?.updated);
   * ```
   */
  async updatePrices(
    params: IProductImportProductsPricesRequest
  ): Promise<IHttpResponse<IProductImportProductsPricesResponse>> {
    return this.httpClient.post('/v1/product/import/prices', params);
  }

  /**
   * Get detailed price information (v5)
   * 
   * Returns comprehensive pricing information including commissions, 
   * marketing actions, price indexes, and competitive analysis.
   * Supports pagination with cursor-based navigation.
   * 
   * @param params - Filter and pagination parameters
   * @returns Detailed price information with commissions and indexes
   * 
   * @example
   * ```typescript
   * const prices = await priceOps.getPriceInfo({
   *   filter: {
   *     product_id: ["243686911"],
   *     visibility: "ALL"
   *   },
   *   limit: 100
   * });
   * 
   * for (const item of prices.data.items || []) {
   *   console.log(`Product ${item.product_id}:`);
   *   console.log(`  Price: ${item.price?.price} ${item.price?.currency_code}`);
   *   console.log(`  Old Price: ${item.price?.old_price}`);
   *   console.log(`  Index: ${item.price_indexes?.color_index}`);
   * }
   * ```
   */
  async getPriceInfo(
    params: IProductv5GetProductInfoPricesV5Request
  ): Promise<IHttpResponse<IProductv5GetProductInfoPricesV5Response>> {
    return this.httpClient.post('/v5/product/info/prices', params);
  }
}