/**
 * Response types for finance API
 * Manually implemented for type safety
 * Ready for manual editing and enhancements
 */

import type { TransactionType } from '../requests/finance.js';

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

/**
 * Информация об операции (строго по MCP документации)  
 * Operation information (strict per MCP documentation)
 */
export interface FinanceTransactionOperation {
  /** Стоимость товаров с учётом скидок продавца */
  accruals_for_sale?: number;
  /** Итоговая сумма операции */
  amount?: number;
  /** Стоимость доставки для начислений по старым тарифам */
  delivery_charge?: number;
  /** Информация о товаре */
  items?: OperationItem[];
  /** Дата операции */
  operation_date?: string;
  /** Идентификатор операции */
  operation_id?: number;
  /** Тип операции */
  operation_type?: string;
  /** Название типа операции */
  operation_type_name?: string;
  /** Информация о размещении */
  posting?: OperationPosting;
  /** Плата за возвраты и отмены для старых тарифов */
  return_delivery_charge?: number;
  /** Комиссия за продажу или возврат комиссии за продажу */
  sale_commission?: number;
  /** Название услуги */
  services?: OperationService[];
  /** Тип начисления */
  type?: TransactionType;
}

/**
 * Информация о товаре в операции
 * Operation item information
 */
export interface OperationItem {
  /** SKU товара */
  sku?: string;
  /** Название товара */
  name?: string;
  /** Количество */
  quantity?: number;
  /** Сумма */
  amount?: number;
  readonly [key: string]: unknown;
}

/**
 * Информация о размещении в операции
 * Operation posting information
 */
export interface OperationPosting {
  /** Номер отправления */
  posting_number?: string;
  /** Дата отправления */
  delivery_date?: string;
  readonly [key: string]: unknown;
}

/**
 * Информация об услуге в операции
 * Operation service information
 */
export interface OperationService {
  /** Название услуги */
  name?: string;
  /** Стоимость услуги */
  price?: number;
  readonly [key: string]: unknown;
}

/**
 * Результат списка транзакций v3 (строго по MCP документации)
 * Transaction list v3 result (strict per MCP documentation)
 */
export interface FinanceTransactionListV3Result {
  /** Информация об операциях */
  operations?: FinanceTransactionOperation[];
  /** Количество страниц. Если 0, страниц больше нет */
  page_count?: number;
  /** Количество транзакций на всех страницах. Если 0, транзакций больше нет */
  row_count?: number;
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
  header?: Record<string, unknown>;
  data?: RealizationReportRow[];
}

export interface GetRealizationReportV2Response {
  result?: RealizationReportV2Result;
  readonly [key: string]: unknown;
}