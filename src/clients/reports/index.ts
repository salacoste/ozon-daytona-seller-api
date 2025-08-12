/**
 * ReportAPI client for Ozon Seller API
 * 
 * Implements the 7 report endpoints from /methods/16-reportapi.json:
 * - Report info and listing
 * - Product, returns, postings reports
 * - Discounted and stock-by-warehouse reports
 */

import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';

/**
 * Request for getting report information
 */
export interface ReportInfoRequest {
  readonly code: string;
}

/**
 * Response for report information
 */
export interface ReportInfoResponse {
  result: {
    code: string;
    status: 'success' | 'processing' | 'failed';
    file?: string;
    error?: string;
  };
}

/**
 * Request for listing reports
 */
export interface ReportListRequest {
  readonly limit?: number;
  readonly offset?: number;
  readonly report_type?: string;
}

/**
 * Response for report listing
 */
export interface ReportListResponse {
  result: {
    reports: Array<{
      code: string;
      name: string;
      status: 'success' | 'processing' | 'failed';
      created_at: string;
    }>;
    has_next: boolean;
  };
}

/**
 * Request for creating products report
 */
export interface CreateProductsReportRequest {
  readonly filter: {
    readonly offer_id?: string[];
    readonly product_id?: number[];
    readonly sku?: number[];
  };
}

/**
 * Request for creating returns report V2
 */
export interface CreateReturnsReportV2Request {
  readonly date_from: string;
  readonly date_to: string;
  readonly statuses?: string[];
}

/**
 * Request for creating postings report
 */
export interface CreatePostingsReportRequest {
  readonly date_from: string;
  readonly date_to: string;
  readonly language?: string;
}

/**
 * Request for creating discounted report
 */
export interface CreateDiscountedReportRequest {
  readonly date_from: string;
  readonly date_to: string;
}

/**
 * Request for creating stock by warehouse report
 */
export interface CreateStockByWarehouseReportRequest {
  readonly language?: string;
}

/**
 * Generic response for report creation
 */
export interface CreateReportResponse {
  result: {
    code: string;
  };
}

/**
 * Reports API client implementing the official 7 endpoints
 */
export class ReportsAPI {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Get report information by code
   * 
   * @param params - Report info parameters
   * @returns Report status and download URL if ready
   * 
   * @example
   * ```typescript
   * const info = await client.reports.getReportInfoV1({
   *   code: 'REPORT_seller_products_924336_1720170405_a9ea2f27-a473-4b13-99f9-d0cfcb5b1a69'
   * });
   * 
   * if (info.data.result.status === 'success' && info.data.result.file) {
   *   // Download the report file
   *   console.log('Report ready:', info.data.result.file);
   * }
   * ```
   */
  async getReportInfoV1(params: ReportInfoRequest): Promise<IHttpResponse<ReportInfoResponse>> {
    return this.httpClient.post('/v1/report/info', params);
  }

  /**
   * List reports with pagination
   * 
   * @param params - Report list parameters
   * @returns List of reports with status
   * 
   * @example
   * ```typescript
   * const reports = await client.reports.getReportListV1({
   *   limit: 50,
   *   offset: 0,
   *   report_type: 'seller_products'
   * });
   * ```
   */
  async getReportListV1(params: ReportListRequest = {}): Promise<IHttpResponse<ReportListResponse>> {
    return this.httpClient.post('/v1/report/list', params);
  }

  /**
   * Create products report
   * 
   * @param params - Products report parameters
   * @returns Report creation result with code
   * 
   * @example
   * ```typescript
   * const report = await client.reports.createProductsReportV1({
   *   filter: {
   *     sku: [148313766, 148313767]
   *   }
   * });
   * 
   * // Poll for completion
   * const code = report.data.result.code;
   * ```
   */
  async createProductsReportV1(params: CreateProductsReportRequest): Promise<IHttpResponse<CreateReportResponse>> {
    return this.httpClient.post('/v1/report/products/create', params);
  }

  /**
   * Create returns report V2
   * 
   * @param params - Returns report parameters
   * @returns Report creation result with code
   * 
   * @example
   * ```typescript
   * const report = await client.reports.createReturnsReportV2({
   *   date_from: '2024-01-01',
   *   date_to: '2024-01-31',
   *   statuses: ['returned', 'cancelled']
   * });
   * ```
   */
  async createReturnsReportV2(params: CreateReturnsReportV2Request): Promise<IHttpResponse<CreateReportResponse>> {
    return this.httpClient.post('/v2/report/returns/create', params);
  }

  /**
   * Create postings report
   * 
   * @param params - Postings report parameters
   * @returns Report creation result with code
   * 
   * @example
   * ```typescript
   * const report = await client.reports.createPostingsReportV1({
   *   date_from: '2024-01-01',
   *   date_to: '2024-01-31',
   *   language: 'DEFAULT'
   * });
   * ```
   */
  async createPostingsReportV1(params: CreatePostingsReportRequest): Promise<IHttpResponse<CreateReportResponse>> {
    return this.httpClient.post('/v1/report/postings/create', params);
  }

  /**
   * Create discounted report
   * 
   * Rate limit: 1 request per minute
   * 
   * @param params - Discounted report parameters
   * @returns Report creation result with code
   * 
   * @example
   * ```typescript
   * const report = await client.reports.createDiscountedReportV1({
   *   date_from: '2024-01-01',
   *   date_to: '2024-01-31'
   * });
   * ```
   */
  async createDiscountedReportV1(params: CreateDiscountedReportRequest): Promise<IHttpResponse<CreateReportResponse>> {
    return this.httpClient.post('/v1/report/discounted/create', params);
  }

  /**
   * Create stock by warehouse report
   * 
   * @param params - Stock by warehouse report parameters
   * @returns Report creation result with code
   * 
   * @example
   * ```typescript
   * const report = await client.reports.createStockByWarehouseReportV1({
   *   language: 'DEFAULT'
   * });
   * ```
   */
  async createStockByWarehouseReportV1(params: CreateStockByWarehouseReportRequest = {}): Promise<IHttpResponse<CreateReportResponse>> {
    return this.httpClient.post('/v1/report/warehouse/stock', params);
  }
}