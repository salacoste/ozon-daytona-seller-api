/**
 * Request types for SupplierAPI
 * Generated from OZON API documentation
 * SupplierAPI - Supplier integration and management
 */

/**
 * Запрос на удаление ссылки на счёт-фактуру
 * Request to delete invoice reference
 */
export interface SupplierInvoiceDeleteRequest {
  /**
   * Номер отправления
   * Posting number
   */
  posting_number: string;

  readonly [key: string]: unknown;
}

/**
 * Запрос на загрузку счёт-фактуры
 * Request for invoice file upload
 *
 * Доступные форматы: JPEG и PDF. Максимальный размер файла: 10 МБ.
 */
export interface SupplierInvoiceFileUploadRequest {
  /**
   * Счёт-фактура в кодировке Base64
   * Invoice file in Base64 encoding
   */
  base64_content: string;

  /**
   * Номер отправления
   * Posting number
   */
  posting_number: string;

  readonly [key: string]: unknown;
}

/**
 * HS-код товара
 * HS code for product
 */
export interface SupplierHsCode {
  /** HS-код */
  code?: string;

  readonly [key: string]: unknown;
}

/**
 * Запрос на создание или изменение счёт-фактуры
 * Request to create or update invoice
 *
 * Создание или изменение таможенного счёта-фактуры для возврата НДС продавцам из Турции.
 */
export interface SupplierInvoiceCreateOrUpdateRequest {
  /**
   * Дата счёт-фактуры
   * Invoice date
   */
  date: string;

  /**
   * Номер отправления
   * Posting number
   */
  posting_number: string;

  /**
   * Ссылка на счёт-фактуру
   * Invoice URL
   *
   * Чтобы создать ссылку, используйте метод /v1/invoice/file/upload
   */
  url: string;

  /**
   * Номер счёт-фактуры
   * Invoice number
   *
   * Номер может содержать буквы и цифры, максимальная длина — 50 символов.
   */
  number?: string;

  /**
   * Стоимость, указанная в счёте-фактуре
   * Price specified in the invoice
   *
   * Разделитель дробной части — точка, до двух знаков после точки.
   */
  price?: number;

  /**
   * Валюта счёта-фактуры
   * Invoice currency
   *
   * - `USD` — доллар
   * - `EUR` — евро
   * - `TRY` — турецкая лира
   * - `CNY` — юань
   * - `RUB` — рубль
   * - `GBP` — фунт стерлингов
   *
   * Значение по умолчанию — `USD`.
   */
  price_currency?: "USD" | "EUR" | "TRY" | "CNY" | "RUB" | "GBP";

  /**
   * HS-коды товаров
   * Product HS codes
   */
  hs_codes?: SupplierHsCode[];

  readonly [key: string]: unknown;
}

/**
 * Запрос информации о счёт-фактуре
 * Request for invoice information
 */
export interface SupplierInvoiceGetRequest {
  /**
   * Номер отправления
   * Posting number
   */
  posting_number: string;

  readonly [key: string]: unknown;
}
