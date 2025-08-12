/**
 * SupplierAPI invoice types
 * Based on /methods/21-supplierapi.json
 */

/**
 * HS Code for invoice
 */
export interface HsCode {
  /** HS-код товара */
  code?: string;
  /** Идентификатор товара в системе Ozon — SKU */
  sku?: string;
}

/**
 * Supported invoice currencies
 */
export type InvoiceCurrency = 'USD' | 'EUR' | 'TRY' | 'CNY' | 'RUB' | 'GBP';

/**
 * Request to create or update invoice V2
 */
export interface InvoiceCreateOrUpdateRequest {
  /** Дата счёта-фактуры */
  date: string;
  /** HS-коды товаров */
  hs_codes?: HsCode[];
  /** Номер счёта-фактуры. Максимальная длина — 50 символов */
  number?: string;
  /** Номер отправления */
  posting_number: string;
  /** Стоимость, указанная в счёте-фактуре */
  price?: number;
  /** Валюта счёта-фактуры. Значение по умолчанию — USD */
  price_currency?: InvoiceCurrency;
  /** Ссылка на счёт-фактуру */
  url: string;
}

/**
 * Response from create or update invoice V2
 */
export interface InvoiceCreateOrUpdateResponse {
  /** Результат работы метода */
  result?: boolean;
}

/**
 * Request to upload invoice file V1
 */
export interface InvoiceFileUploadRequest {
  /** Счёт-фактура в кодировке Base64 */
  base64_content: string;
  /** Номер отправления */
  posting_number: string;
}

/**
 * Response from upload invoice file V1
 */
export interface InvoiceFileUploadResponse {
  /** Ссылка на счёт-фактуру */
  url?: string;
}

/**
 * Request to get invoice V2
 */
export interface InvoiceGetRequest {
  /** Номер отправления */
  posting_number: string;
}

/**
 * Invoice information result
 */
export interface InvoiceInfo {
  /** Дата загрузки счёта-фактуры */
  date?: string;
  /** Ссылка на счёт-фактуру */
  file_url?: string;
  /** HS-коды товаров */
  hs_codes?: HsCode[];
  /** Номер счёта-фактуры */
  number?: string;
  /** Стоимость, указанная в счёте-фактуре */
  price?: number;
  /** Валюта счёта-фактуры */
  price_currency?: InvoiceCurrency;
}

/**
 * Response from get invoice V2
 */
export interface InvoiceGetResponse {
  /** Информация о счёте-фактуре */
  result?: InvoiceInfo;
}

/**
 * Request to delete invoice V1
 */
export interface InvoiceDeleteRequest {
  /** Номер отправления */
  posting_number: string;
}

/**
 * Response from delete invoice V1
 */
export interface InvoiceDeleteResponse {
  /** Результат работы метода */
  result?: boolean;
}