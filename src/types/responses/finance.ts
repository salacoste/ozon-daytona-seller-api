/**
 * Response types for finance API
 * Manually implemented for type safety
 * Ready for manual editing and enhancements
 */

export type CreateReportCode = 'SUCCESS' | 'IN_PROGRESS' | 'ERROR';

export interface CreateReportResult {
  code?: CreateReportCode;
  message?: string;
}

export interface CreateReportResponse {
  result?: CreateReportResult;
  readonly [key: string]: unknown;
}

export interface CommonCreateReportResult {
  code?: CreateReportCode;
  report_id?: string;
  download_url?: string;
}

export interface CommonCreateReportResponse {
  result?: CommonCreateReportResult;
  readonly [key: string]: unknown;
}

export interface B2BLegalSaleInvoice {
  invoice_number?: string;
  invoice_date?: string;
  total_amount?: string;
}

export interface CreateDocumentB2BSalesJSONReportResponse {
  invoices?: B2BLegalSaleInvoice[];
  total_amount?: string;
  readonly [key: string]: unknown;
}

export interface FinanceProductsBuyoutProduct {
  sku?: string;
  name?: string;
  buyout_amount?: string;
}

export interface GetFinanceProductsBuyoutResponse {
  products?: FinanceProductsBuyoutProduct[];
  total_buyout_amount?: string;
  readonly [key: string]: unknown;
}

export interface FinanceTransactionOperation {
  id?: string;
  type?: string;
  amount?: string;
  date?: string;
}

export interface FinanceTransactionListV3Result {
  operations?: FinanceTransactionOperation[];
  page?: number;
  total_count?: number;
}

export interface FinanceTransactionListV3Response {
  result?: FinanceTransactionListV3Result;
  readonly [key: string]: unknown;
}

export interface FinanceTransactionTotalsResult {
  total_amount?: string;
  operations_count?: number;
}

export interface FinanceTransactionTotalsV3Response {
  result?: FinanceTransactionTotalsResult;
  readonly [key: string]: unknown;
}

export interface RealizationReportRow {
  sku?: string;
  name?: string;
  quantity?: number;
  amount?: string;
}

export interface GetRealizationReportPostingResponse {
  rows?: RealizationReportRow[];
  total_amount?: string;
  readonly [key: string]: unknown;
}

export interface RealizationReportV2Result {
  header?: any;
  data?: RealizationReportRow[];
}

export interface GetRealizationReportV2Response {
  result?: RealizationReportV2Result;
  readonly [key: string]: unknown;
}