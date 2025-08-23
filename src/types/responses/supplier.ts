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
   * Результат операции
   * Operation result
   */
  result?: 'success' | 'error';
  
  /** 
   * Сообщение об ошибке
   * Error message
   */
  error?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ на загрузку счёт-фактуры
 * Response for invoice file upload
 */
export interface SupplierInvoiceFileUploadResponse {
  /** 
   * Идентификатор загруженного файла
   * Uploaded file ID
   */
  file_id?: string;
  
  /** 
   * Название файла
   * File name
   */
  file_name?: string;
  
  /** 
   * Размер файла
   * File size
   */
  file_size?: number;
  
  /** 
   * Статус загрузки
   * Upload status
   */
  status?: 'uploaded' | 'processing' | 'completed' | 'error';
  
  /** 
   * Ссылка на файл
   * File URL
   */
  file_url?: string;
  
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
  status?: 'draft' | 'submitted' | 'approved' | 'rejected';
  
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
   * Информация о счёт-фактуре
   * Invoice information
   */
  invoice?: SupplierInvoice;
  
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
  invoice?: SupplierInvoice;
  
  readonly [key: string]: unknown;
}