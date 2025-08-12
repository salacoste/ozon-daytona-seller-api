/**
 * FinanceAPI client for Ozon Seller API
 * 
 * Implements the finance endpoints from /methods/16-reportapi.json and /methods/09-financeapi.json:
 * - Cash flow statement listing
 * - Realization reports (V1 and V2)
 * - Transaction lists and totals (V3)
 * - B2B document downloads
 * - Mutual settlements and compensation tracking
 */

import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type {
  CashFlowStatementListRequest,
  CashFlowStatementListResponse,
  RealizationReportV2Request,
  RealizationReportV2Response,
  RealizationReportPostingV1Request,
  RealizationReportPostingV1Response,
  RealizationByDayRequest,
  RealizationByDayResponse,
  TransactionListV3Request,
  TransactionListV3Response,
  TransactionTotalsV3Request,
  TransactionTotalsV3Response,
  DocumentB2BSalesRequest,
  DocumentB2BSalesResponse,
  DocumentB2BSalesJsonResponse,
  MutualSettlementRequest,
  MutualSettlementResponse,
  ProductsBuyoutRequest,
  ProductsBuyoutResponse,
  CompensationRequest,
  CompensationResponse,
  DecompensationRequest,
  DecompensationResponse
} from './types';

/**
 * Finance API client implementing cash flow and finance endpoints
 */
export class FinanceAPI {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Get cash flow statement list for period
   * 
   * @param params - Cash flow query parameters
   * @returns Cash flow operations with optional details
   * 
   * @example
   * ```typescript
   * const cashFlow = await client.finance.getCashFlowStatementListV1({
   *   date_from: '2024-01-01',
   *   date_to: '2024-01-31',
   *   with_details: true,
   *   limit: 100,
   *   offset: 0
   * });
   * 
   * cashFlow.data.result.operations.forEach(op => {
   *   console.log(`${op.date}: ${op.type} ${op.amount} ${op.currency}`);
   * });
   * ```
   */
  async getCashFlowStatementListV1(params: CashFlowStatementListRequest): Promise<IHttpResponse<CashFlowStatementListResponse>> {
    return this.httpClient.post('/v1/finance/cash-flow-statement/list', params);
  }

  /**
   * Get realization report V2 for delivered and returned products
   * 
   * Warning: This method is not available for sellers with contracts with "TOO OZON Marketplace Kazakhstan"
   * 
   * @param params - Realization report parameters
   * @returns Product realization data for the month
   */
  async getRealizationReportV2(params: RealizationReportV2Request): Promise<IHttpResponse<RealizationReportV2Response>> {
    return this.httpClient.post('/v2/finance/realization', params);
  }

  /**
   * Get realization report by posting V1
   * 
   * @param params - Realization report posting parameters
   * @returns Posting-based realization data
   */
  async getRealizationReportPostingV1(params: RealizationReportPostingV1Request): Promise<IHttpResponse<RealizationReportPostingV1Response>> {
    return this.httpClient.post('/v1/finance/realization/posting', params);
  }

  /**
   * Get realization breakdown by day V1
   * 
   * @param params - Realization by day parameters
   * @returns Daily realization breakdown with revenue and commission details
   * 
   * @example
   * ```typescript
   * const dailyReport = await client.finance.getRealizationByDayV1({
   *   month: 1,
   *   year: 2024
   * });
   * 
   * dailyReport.data.result.days.forEach(day => {
   *   console.log(`${day.date}: sold ${day.products_sold}, revenue ${day.total_revenue}`);
   * });
   * ```
   */
  async getRealizationByDayV1(params: RealizationByDayRequest): Promise<IHttpResponse<RealizationByDayResponse>> {
    return this.httpClient.post('/v1/finance/realization/by-day', params);
  }

  /**
   * Get transaction list V3 with filters and pagination
   * 
   * Note: Date range cannot exceed 1 month
   * 
   * @param params - Transaction list parameters
   * @returns List of financial transactions
   */
  async getTransactionListV3(params: TransactionListV3Request): Promise<IHttpResponse<TransactionListV3Response>> {
    return this.httpClient.post('/v3/finance/transaction/list', params);
  }

  /**
   * Get transaction totals V3 for the same period as transaction list
   * 
   * @param params - Transaction totals parameters
   * @returns Aggregated transaction totals by type
   */
  async getTransactionTotalsV3(params: TransactionTotalsV3Request): Promise<IHttpResponse<TransactionTotalsV3Response>> {
    return this.httpClient.post('/v3/finance/transaction/totals', params);
  }

  /**
   * Get B2B sales documents with download links
   * 
   * @param params - B2B document parameters
   * @returns B2B sales documents with file URLs
   */
  async getDocumentB2BSalesV1(params: DocumentB2BSalesRequest): Promise<IHttpResponse<DocumentB2BSalesResponse>> {
    return this.httpClient.post('/v1/finance/document-b2b-sales', params);
  }

  /**
   * Get B2B sales documents as JSON data
   * 
   * @param params - B2B document parameters
   * @returns B2B sales documents with JSON payload
   */
  async getDocumentB2BSalesJsonV1(params: DocumentB2BSalesRequest): Promise<IHttpResponse<DocumentB2BSalesJsonResponse>> {
    return this.httpClient.post('/v1/finance/document-b2b-sales/json', params);
  }

  /**
   * Get mutual settlement report V1
   * 
   * @param params - Mutual settlement parameters
   * @returns Settlement transactions and adjustments
   * 
   * @example
   * ```typescript
   * const settlements = await client.finance.getMutualSettlementV1({
   *   date_from: '2024-01-01',
   *   date_to: '2024-01-31'
   * });
   * 
   * settlements.data.result.settlements.forEach(settlement => {
   *   console.log(`${settlement.date}: ${settlement.type} ${settlement.amount}`);
   * });
   * ```
   */
  async getMutualSettlementV1(params: MutualSettlementRequest): Promise<IHttpResponse<MutualSettlementResponse>> {
    return this.httpClient.post('/v1/finance/mutual-settlement', params);
  }

  /**
   * Get products buyout information V1
   * 
   * @param params - Products buyout parameters
   * @returns Information about products bought out by Ozon
   * 
   * @example
   * ```typescript
   * const buyouts = await client.finance.getProductsBuyoutV1({
   *   date_from: '2024-01-01',
   *   date_to: '2024-01-31',
   *   sku: [123456, 789012]
   * });
   * 
   * buyouts.data.result.buyouts.forEach(buyout => {
   *   console.log(`SKU ${buyout.sku}: ${buyout.quantity} × ${buyout.buyout_price}`);
   * });
   * ```
   */
  async getProductsBuyoutV1(params: ProductsBuyoutRequest): Promise<IHttpResponse<ProductsBuyoutResponse>> {
    return this.httpClient.post('/v1/finance/products/buyout', params);
  }

  /**
   * Get compensation report V1
   * 
   * @param params - Compensation parameters
   * @returns Compensation transactions from Ozon
   * 
   * @example
   * ```typescript
   * const compensations = await client.finance.getCompensationV1({
   *   date_from: '2024-01-01',
   *   date_to: '2024-01-31',
   *   compensation_type: 'damaged_goods'
   * });
   * 
   * compensations.data.result.compensations.forEach(comp => {
   *   console.log(`${comp.date}: ${comp.type} ${comp.amount} (${comp.description})`);
   * });
   * ```
   */
  async getCompensationV1(params: CompensationRequest): Promise<IHttpResponse<CompensationResponse>> {
    return this.httpClient.post('/v1/finance/compensation', params);
  }

  /**
   * Get decompensation report V1
   * 
   * @param params - Decompensation parameters
   * @returns Decompensation transactions (charges from Ozon)
   * 
   * @example
   * ```typescript
   * const decompensations = await client.finance.getDecompensationV1({
   *   date_from: '2024-01-01',
   *   date_to: '2024-01-31'
   * });
   * 
   * decompensations.data.result.decompensations.forEach(decomp => {
   *   console.log(`${decomp.date}: ${decomp.type} -${decomp.amount} (${decomp.description})`);
   * });
   * ```
   */
  async getDecompensationV1(params: DecompensationRequest): Promise<IHttpResponse<DecompensationResponse>> {
    return this.httpClient.post('/v1/finance/decompensation', params);
  }
}