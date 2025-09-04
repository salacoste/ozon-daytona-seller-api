/**
 * Response types for SupplierAPI
 * Generated from OZON API documentation
 * SupplierAPI - Supplier integration and management
 */

/**
 * Ответ на удаление ссылки на счёт-фактуру
 * Response for invoice reference deletion
 */
export interface SupplierInvoiceDeleteResponse {
  /**
   * Результат работы метода
   * Method execution result
   */
  result?: boolean;

  readonly [key: string]: unknown;
}

/**
 * Ответ на загрузку счёт-фактуры
 * Response for invoice file upload
 */
export interface SupplierInvoiceFileUploadResponse {
  /**
   * Ссылка на счёт-фактуру
   * Invoice URL
   */
  url?: string;

  readonly [key: string]: unknown;
}

/**
 * Информация о товаре в счёт-фактуре
 * Invoice item information
 */
export interface SupplierInvoiceItem {
  /**
   * SKU товара
   * Product SKU
   */
  sku?: string;

  /**
   * Название товара
   * Product name
   */
  name?: string;

  /**
   * Количество
   * Quantity
   */
  quantity?: number;

  /**
   * Цена за единицу
   * Unit price
   */
  unit_price?: number;

  /**
   * Общая стоимость
   * Total price
   */
  total_price?: number;

  /**
   * Ставка НДС
   * VAT rate
   */
  vat_rate?: number;

  /**
   * Сумма НДС
   * VAT amount
   */
  vat_amount?: number;

  readonly [key: string]: unknown;
}

/**
 * Информация о счёт-фактуре
 * Invoice information
 */
export interface SupplierInvoice {
  /**
   * Идентификатор счёт-фактуры
   * Invoice ID
   */
  invoice_id?: string;

  /**
   * Номер счёт-фактуры
   * Invoice number
   */
  invoice_number?: string;

  /**
   * Дата счёт-фактуры
   * Invoice date
   */
  invoice_date?: string;

  /**
   * Дата создания
   * Creation date
   */
  created_at?: string;

  /**
   * Дата обновления
   * Update date
   */
  updated_at?: string;

  /**
   * Статус счёт-фактуры
   * Invoice status
   */
  status?: "draft" | "submitted" | "approved" | "rejected";

  /**
   * Идентификатор файла
   * File ID
   */
  file_id?: string;

  /**
   * Ссылка на файл
   * File URL
   */
  file_url?: string;

  /**
   * Общая сумма
   * Total amount
   */
  total_amount?: number;

  /**
   * Валюта
   * Currency
   */
  currency?: string;

  /**
   * Общая сумма НДС
   * Total VAT amount
   */
  vat_amount?: number;

  /**
   * Товары в счёт-фактуре
   * Items in invoice
   */
  items?: SupplierInvoiceItem[];

  /**
   * Комментарий к отклонению
   * Rejection comment
   */
  rejection_reason?: string;

  readonly [key: string]: unknown;
}

/**
 * Ответ на создание или изменение счёт-фактуры
 * Response for invoice creation or update
 */
export interface SupplierInvoiceCreateOrUpdateResponse {
  /**
   * Результат работы метода
   * Method execution result
   */
  result?: boolean;

  readonly [key: string]: unknown;
}

/**
 * HS-код товара в ответе
 * HS code in response
 */
export interface SupplierResponseHsCode {
  /** HS-код */
  code?: string;

  readonly [key: string]: unknown;
}

/**
 * Информация о счёт-фактуре из ответа
 * Invoice information from response
 */
export interface SupplierInvoiceInfo {
  /**
   * Дата загрузки счёт-фактуры
   * Invoice upload date
   */
  date?: string;

  /**
   * Ссылка на счёт-фактуру
   * Invoice URL
   */
  file_url?: string;

  /**
   * HS-коды товаров
   * Product HS codes
   */
  hs_codes?: SupplierResponseHsCode[];

  /**
   * Номер счёт-фактуры
   * Invoice number
   */
  number?: string;

  /**
   * Стоимость, указанная в счёт-фактуре
   * Price specified in invoice
   *
   * Разделитель дробной части — точка, до двух знаков после точки.
   * Пример: 199.99
   */
  price?: number;

  /**
   * Валюта счёт-фактуры
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

  readonly [key: string]: unknown;
}

/**
 * Ответ с информацией о счёт-фактуре
 * Response with invoice information
 */
export interface SupplierInvoiceGetResponse {
  /**
   * Информация о счёт-фактуре
   * Invoice information
   */
  result?: SupplierInvoiceInfo;

  readonly [key: string]: unknown;
}
