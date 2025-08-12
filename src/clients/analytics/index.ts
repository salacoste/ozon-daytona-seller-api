/**
 * AnalyticsAPI client for Ozon Seller API
 * 
 * Implements the 5 endpoints from /methods/19-analyticsapi.json:
 * - Analytics data with dimensions and metrics
 * - Stock on warehouses report
 * - Stocks turnover analytics
 * - Product queries information
 * - Product queries details
 */

import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';

/**
 * Request parameters for analytics data
 */
export interface AnalyticsGetDataRequest {
  readonly date_from: string;
  readonly date_to: string;
  readonly dimension: string[];
  readonly filters?: Array<{
    readonly key: string;
    readonly op: string;
    readonly value: string;
  }>;
  readonly limit?: number;
  readonly metrics: string[];
  readonly offset?: number;
  readonly sort?: Array<{
    readonly key: string;
    readonly order: 'ASC' | 'DESC';
  }>;
}

/**
 * Response for analytics data
 */
export interface AnalyticsGetDataResponse {
  result: {
    data: Array<{
      dimensions: Array<{
        id: string;
        value: string;
      }>;
      metrics: Array<{
        id: string;
        value: number;
      }>;
    }>;
    totals: Array<{
      id: string;
      value: number;
    }>;
  };
  timestamp: string;
}

/**
 * Request parameters for stock on warehouses
 */
export interface AnalyticsGetStockOnWarehousesRequest {
  readonly skus: number[];
  readonly warehouse_type?: string;
}

/**
 * Response for stock on warehouses
 */
export interface AnalyticsGetStockOnWarehousesResponse {
  result: {
    rows: Array<{
      sku: number;
      warehouse_type: string;
      item_code: string;
      item_name: string;
      promised_amount: number;
      present_amount: number;
      reserved_amount: number;
    }>;
  };
}

/**
 * Request parameters for stocks turnover
 */
export interface StocksTurnoverRequest {
  readonly date_from: string;
  readonly date_to: string;
  readonly skus?: number[];
  readonly limit?: number;
  readonly offset?: number;
}

/**
 * Request parameters for product queries
 */
export interface AnalyticsProductQueriesRequest {
  readonly date_from: string;
  readonly date_to: string;
  readonly skus?: number[];
  readonly limit?: number;
  readonly offset?: number;
  readonly sort?: Array<{
    readonly key: string;
    readonly order: 'ASC' | 'DESC';
  }>;
}

/**
 * Request parameters for product queries details
 */
export interface AnalyticsProductQueriesDetailsRequest {
  readonly date_from: string;
  readonly date_to: string;
  readonly skus?: number[];
  readonly limit?: number;
  readonly offset?: number;
  readonly sort?: Array<{
    readonly key: string;
    readonly order: 'ASC' | 'DESC';
  }>;
  readonly limit_by_sku?: number;
}

/**
 * AnalyticsAPI client implementing the official 5 endpoints
 */
export class AnalyticsAPI {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Get analytics data with dimensions and metrics
   * 
   * Rate limit: 1 request per minute
   * 
   * @param params - Analytics query parameters
   * @returns Analytics data grouped by dimensions
   * 
   * @example
   * ```typescript
   * const analytics = await client.analytics.getDataV1({
   *   date_from: '2024-01-01',
   *   date_to: '2024-01-31',
   *   dimension: ['sku'],
   *   metrics: ['hits_view_search', 'ordered_units'],
   *   limit: 100
   * });
   * ```
   */
  async getDataV1(params: AnalyticsGetDataRequest): Promise<IHttpResponse<AnalyticsGetDataResponse>> {
    return this.httpClient.post('/v1/analytics/data', params);
  }

  /**
   * Get stock on warehouses report (deprecated - use stocks endpoint when available)
   * 
   * @deprecated This endpoint is deprecated in favor of /v1/analytics/stocks
   * @param params - Stock query parameters
   * @returns Stock analytics data by warehouse
   * 
   * @example
   * ```typescript
   * const stocks = await client.analytics.getStockOnWarehousesV2({
   *   skus: [148313766, 148313767],
   *   warehouse_type: 'ALL'
   * });
   * ```
   */
  async getStockOnWarehousesV2(params: AnalyticsGetStockOnWarehousesRequest): Promise<IHttpResponse<AnalyticsGetStockOnWarehousesResponse>> {
    return this.httpClient.post('/v2/analytics/stock_on_warehouses', params);
  }

  /**
   * Get stocks turnover analytics
   * 
   * Rate limit: 1 request per minute
   * 
   * @param params - Turnover query parameters
   * @returns Stocks turnover data
   * 
   * @example
   * ```typescript
   * const turnover = await client.analytics.getStocksTurnoverV1({
   *   date_from: '2024-01-01',
   *   date_to: '2024-01-31',
   *   skus: [148313766],
   *   limit: 50
   * });
   * ```
   */
  async getStocksTurnoverV1(params: StocksTurnoverRequest): Promise<IHttpResponse<any>> {
    return this.httpClient.post('/v1/analytics/turnover/stocks', params);
  }

  /**
   * Get product queries information
   * 
   * @param params - Product queries parameters
   * @returns Product queries analytics
   * 
   * @example
   * ```typescript
   * const queries = await client.analytics.getProductQueriesV1({
   *   date_from: '2024-01-01',
   *   date_to: '2024-01-31',
   *   skus: [148313766],
   *   limit: 100
   * });
   * ```
   */
  async getProductQueriesV1(params: AnalyticsProductQueriesRequest): Promise<IHttpResponse<any>> {
    return this.httpClient.post('/v1/analytics/product-queries', params);
  }

  /**
   * Get product queries details
   * 
   * @param params - Product queries details parameters
   * @returns Detailed product queries analytics
   * 
   * @example
   * ```typescript
   * const details = await client.analytics.getProductQueriesDetailsV1({
   *   date_from: '2024-01-01',
   *   date_to: '2024-01-31',
   *   skus: [148313766],
   *   limit: 100,
   *   limit_by_sku: 10
   * });
   * ```
   */
  async getProductQueriesDetailsV1(params: AnalyticsProductQueriesDetailsRequest): Promise<IHttpResponse<any>> {
    return this.httpClient.post('/v1/analytics/product-queries/details', params);
  }
}