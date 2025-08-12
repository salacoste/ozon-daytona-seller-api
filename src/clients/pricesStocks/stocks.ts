/**
 * Stock management operations for PricesStocksAPI
 * 
 * Handles product stock updates and inquiries across warehouses
 */

import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type {
  IProductv2ProductsStocksRequest,
  IProductv2ProductsStocksResponse,
  IV4GetProductInfoStocksRequest,
  IV4GetProductInfoStocksResponse,
  IProductsv1GetProductInfoStocksByWarehouseFbsRequest,
  IProductsv1GetProductInfoStocksByWarehouseFbsResponse,
} from '../../types/generated/prices&stocksapi';

/**
 * Stock operations for inventory management
 */
export class PricesStocksStockOps {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Update product stocks on warehouses (v2)
   * 
   * Updates inventory quantities for products across different warehouses.
   * Can process up to 100 product-warehouse pairs per request.
   * Rate limit: 80 requests per minute, 1 request per 30 seconds per product-warehouse pair.
   * 
   * @param params - Stock update request with product quantities
   * @returns Update results with success/error status per item
   * 
   * @example
   * ```typescript
   * const result = await stockOps.updateStocks({
   *   stocks: [
   *     {
   *       offer_id: "PH11042",
   *       product_id: 313455276,
   *       stock: 100,
   *       warehouse_id: 22142605386000
   *     }
   *   ]
   * });
   * 
   * console.log('Updated:', result.data.result?.[0]?.updated);
   * ```
   */
  async updateStocks(
    params: IProductv2ProductsStocksRequest
  ): Promise<IHttpResponse<IProductv2ProductsStocksResponse>> {
    return this.httpClient.post('/v2/products/stocks', params);
  }

  /**
   * Get product stock information (v4)
   * 
   * Returns stock information for FBS and rFBS schemes with pagination support.
   * Includes available and reserved quantities across warehouses.
   * 
   * @param params - Filter and pagination parameters
   * @returns Stock information with warehouse details
   * 
   * @example
   * ```typescript
   * const stocks = await stockOps.getStockInfo({
   *   filter: {
   *     product_id: ["313455276"],
   *     visibility: "ALL",
   *     with_quant: { exists: true }
   *   },
   *   limit: 100
   * });
   * 
   * for (const item of stocks.data.items || []) {
   *   console.log(`Product ${item.product_id}:`);
   *   for (const stock of item.stocks || []) {
   *     console.log(`  ${stock.type}: ${stock.present} present, ${stock.reserved} reserved`);
   *   }
   * }
   * ```
   */
  async getStockInfo(
    params: IV4GetProductInfoStocksRequest
  ): Promise<IHttpResponse<IV4GetProductInfoStocksResponse>> {
    return this.httpClient.post('/v4/product/info/stocks', params);
  }

  /**
   * Get FBS stock information by warehouse (v1)
   * 
   * Returns detailed stock information for FBS and rFBS schemes by specific warehouse.
   * Shows present and reserved quantities with warehouse details.
   * 
   * @param params - Request with SKU list
   * @returns Warehouse-specific stock information
   * 
   * @example
   * ```typescript
   * const warehouseStocks = await stockOps.getStocksByWarehouse({
   *   sku: ["148313766", "148313767"]
   * });
   * ```
   */
  async getStocksByWarehouse(
    params: IProductsv1GetProductInfoStocksByWarehouseFbsRequest
  ): Promise<IHttpResponse<IProductsv1GetProductInfoStocksByWarehouseFbsResponse>> {
    return this.httpClient.post('/v1/product/info/stocks-by-warehouse/fbs', params);
  }
}