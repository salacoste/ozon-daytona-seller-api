/**
 * Main PricesStocksAPI client
 * 
 * Coordinates all price and stock management operations through specialized sub-modules
 */

import type { HttpClient } from '../../http/HttpClient';
import { PricesStocksStockOps } from './stocks';
import { PricesStocksPriceOps } from './prices';
import { PricesStocksSpecialOps } from './special';
import { iterateStockInfo, iteratePriceInfo } from './iterators';

// Re-export all types for convenience
export type {
  // Stock Operations
  IProductv2ProductsStocksRequest,
  IProductv2ProductsStocksResponse,
  IV4GetProductInfoStocksRequest,
  IV4GetProductInfoStocksResponse,
  IProductsv1GetProductInfoStocksByWarehouseFbsRequest,
  IProductsv1GetProductInfoStocksByWarehouseFbsResponse,
  // Price Operations
  IProductImportProductsPricesRequest,
  IProductImportProductsPricesResponse,
  IProductv5GetProductInfoPricesV5Request,
  IProductv5GetProductInfoPricesV5Response,
  // Special Operations
  IV1ProductActionTimerUpdateRequest,
  IV1ProductActionTimerUpdateResponse,
  IV1ProductActionTimerStatusRequest,
  IV1ProductActionTimerStatusResponse,
  IV1GetProductInfoDiscountedRequest,
  IV1GetProductInfoDiscountedResponse,
  IV1ProductUpdateDiscountRequest,
  IV1ProductUpdateDiscountResponse,
} from '../../types/generated/prices&stocksapi';

/**
 * PricesStocksAPI client - 9 endpoints for price and stock management
 * 
 * Delegates operations to specialized sub-modules for better code organization:
 * - Stock operations: inventory management across warehouses
 * - Price operations: pricing updates and information
 * - Special operations: action timers and discount management
 * 
 * @example
 * ```typescript
 * // Update product stocks
 * await client.pricesStocks.updateStocks({
 *   stocks: [{ 
 *     product_id: 123, 
 *     stock: 50, 
 *     warehouse_id: 22142605386000 
 *   }]
 * });
 * 
 * // Get price information with pagination
 * const prices = await client.pricesStocks.getPriceInfo({
 *   filter: { visibility: 'ALL' },
 *   limit: 100
 * });
 * ```
 */
export class PricesStocksAPI {
  private readonly stockOps: PricesStocksStockOps;
  private readonly priceOps: PricesStocksPriceOps;
  private readonly specialOps: PricesStocksSpecialOps;

  constructor(httpClient: HttpClient) {
    this.stockOps = new PricesStocksStockOps(httpClient);
    this.priceOps = new PricesStocksPriceOps(httpClient);
    this.specialOps = new PricesStocksSpecialOps(httpClient);
  }

  // ========== STOCK OPERATIONS DELEGATION ==========

  /** @see PricesStocksStockOps.updateStocks */
  async updateStocksV2(params: Parameters<PricesStocksStockOps['updateStocks']>[0]) {
    return this.stockOps.updateStocks(params);
  }

  /** @see PricesStocksStockOps.getStockInfo */
  async getStocksInfoV4(params: Parameters<PricesStocksStockOps['getStockInfo']>[0]) {
    return this.stockOps.getStockInfo(params);
  }

  /** @see PricesStocksStockOps.getStocksByWarehouse */
  async getStocksByWarehouseFbsV1(params: Parameters<PricesStocksStockOps['getStocksByWarehouse']>[0]) {
    return this.stockOps.getStocksByWarehouse(params);
  }

  // ========== BACKWARD COMPATIBILITY - STOCKS ==========

  /** @deprecated Use updateStocksV2 instead */
  async updateStocks(params: Parameters<PricesStocksStockOps['updateStocks']>[0]) {
    return this.updateStocksV2(params);
  }

  /** @deprecated Use getStocksInfoV4 instead */
  async getStockInfo(params: Parameters<PricesStocksStockOps['getStockInfo']>[0]) {
    return this.getStocksInfoV4(params);
  }

  /** @deprecated Use getStocksByWarehouseFbsV1 instead */
  async getStocksByWarehouse(params: Parameters<PricesStocksStockOps['getStocksByWarehouse']>[0]) {
    return this.getStocksByWarehouseFbsV1(params);
  }

  // ========== PRICE OPERATIONS DELEGATION ==========

  /** @see PricesStocksPriceOps.updatePrices */
  async updatePrices(params: Parameters<PricesStocksPriceOps['updatePrices']>[0]) {
    return this.priceOps.updatePrices(params);
  }

  /** @see PricesStocksPriceOps.getPriceInfo */
  async getPriceInfo(params: Parameters<PricesStocksPriceOps['getPriceInfo']>[0]) {
    return this.priceOps.getPriceInfo(params);
  }

  // ========== SPECIAL OPERATIONS DELEGATION ==========

  /** @see PricesStocksSpecialOps.updateActionTimer */
  async updateActionTimer(params: Parameters<PricesStocksSpecialOps['updateActionTimer']>[0]) {
    return this.specialOps.updateActionTimer(params);
  }

  /** @see PricesStocksSpecialOps.getActionTimerStatus */
  async getActionTimerStatus(params: Parameters<PricesStocksSpecialOps['getActionTimerStatus']>[0]) {
    return this.specialOps.getActionTimerStatus(params);
  }

  /** @see PricesStocksSpecialOps.getDiscountedInfo */
  async getDiscountedInfo(params: Parameters<PricesStocksSpecialOps['getDiscountedInfo']>[0]) {
    return this.specialOps.getDiscountedInfo(params);
  }

  /** @see PricesStocksSpecialOps.updateDiscount */
  async updateDiscount(params: Parameters<PricesStocksSpecialOps['updateDiscount']>[0]) {
    return this.specialOps.updateDiscount(params);
  }

  // ========== PAGINATION ITERATORS ==========

  /**
   * Iterate through all stock information with automatic pagination
   * 
   * @param params - Request parameters (cursor handled automatically)
   * @yields Individual stock items
   * 
   * @example
   * ```typescript
   * for await (const stockItem of client.pricesStocks.iterateStockInfo({
   *   filter: { visibility: "ALL" },
   *   limit: 100
   * })) {
   *   console.log(`Product ${stockItem.product_id}`);
   * }
   * ```
   */
  iterateStockInfo(params: Parameters<typeof iterateStockInfo>[1]) {
    return iterateStockInfo(this.stockOps, params);
  }

  /**
   * Iterate through all price information with automatic pagination
   * 
   * @param params - Request parameters (cursor handled automatically)
   * @yields Individual price items
   * 
   * @example
   * ```typescript
   * for await (const priceItem of client.pricesStocks.iteratePriceInfo({
   *   filter: { visibility: "ALL" },
   *   limit: 100
   * })) {
   *   console.log(`Product ${priceItem.product_id}: ${priceItem.price?.price}`);
   * }
   * ```
   */
  iteratePriceInfo(params: Parameters<typeof iteratePriceInfo>[1]) {
    return iteratePriceInfo(this.priceOps, params);
  }
}