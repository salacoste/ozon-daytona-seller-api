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
   * Идентификатор счёт-фактуры
   * Invoice ID
   */
  invoice_id?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Запрос на загрузку счёт-фактуры
 * Request for invoice file upload
 */
export interface SupplierInvoiceFileUploadRequest {
  /** 
   * Файл счёт-фактуры в формате base64
   * Invoice file in base64 format
   */
  file?: string;
  
  /** 
   * Название файла
   * File name
   */
  file_name?: string;
  
  /** 
   * Тип документа
   * Document type
   */
  document_type?: 'invoice' | 'customs_declaration';
  
  readonly [key: string]: unknown;
}

/**
 * Запрос на создание или изменение счёт-фактуры
 * Request to create or update invoice
 */
export interface SupplierInvoiceCreateOrUpdateRequest {
  /** 
   * Идентификатор счёт-фактуры (для обновления)
   * Invoice ID (for update)
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
   * Идентификатор файла
   * File ID
   */
  file_id?: string;
  
  /** 
   * Сумма счёт-фактуры
   * Invoice amount
   */
  total_amount?: number;
  
  /** 
   * Валюта
   * Currency
   */
  currency?: string;
  
  /** 
   * НДС
   * VAT amount
   */
  vat_amount?: number;
  
  /** 
   * Товары в счёт-фактуре
   * Items in invoice
   */
  items?: Array<{
    /** SKU товара */
    sku?: string;
    /** Название товара */
    name?: string;
    /** Количество */
    quantity?: number;
    /** Цена за единицу */
    unit_price?: number;
    /** Общая стоимость */
    total_price?: number;
    /** НДС по товару */
    vat_rate?: number;
  }>;
  
  readonly [key: string]: unknown;
}

/**
 * Запрос информации о счёт-фактуре
 * Request for invoice information
 */
export interface SupplierInvoiceGetRequest {
  /** 
   * Идентификатор счёт-фактуры
   * Invoice ID
   */
  invoice_id?: string;
  
  readonly [key: string]: unknown;
}