/**
 * Response types for Digital API
 * Digital product management
 * Ready for manual editing and enhancements
 */

/**
 * Ошибка кода цифрового товара
 * Digital product code error
 */
export interface DigitalExemplarError {
  /** 
   * Код с ошибкой
   * Error code value
   */
  code?: string;
  
  /** 
   * Описание ошибки
   * Error description
   */
  message?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Результат загрузки кодов по SKU
 * Upload codes result by SKU
 */
export interface DigitalUploadPostingExemplarInfo {
  /** 
   * Идентификатор товара в системе Ozon — SKU
   * Product identifier in Ozon system — SKU
   */
  sku?: number;
  
  /** 
   * Количество принятых кодов
   * Number of accepted codes
   */
  received_qty?: number;
  
  /** 
   * Количество отклонённых кодов
   * Number of rejected codes
   */
  rejected_qty?: number;
  
  /** 
   * Список кодов с ошибками
   * List of codes with errors
   */
  failed_exemplars?: DigitalExemplarError[];
  
  readonly [key: string]: unknown;
}

/**
 * Ответ загрузки кодов цифровых товаров
 * Upload digital product codes response
 */
export interface DigitalUploadPostingCodesResponse {
  /** 
   * Данные о результатах загрузки кодов по SKU
   * Upload results data by SKU
   */
  exemplars_by_sku?: DigitalUploadPostingExemplarInfo[];
  
  readonly [key: string]: unknown;
}

/**
 * Товар в отправлении
 * Product in posting
 */
export interface DigitalPostingProduct {
  /** 
   * Идентификатор товара в системе Ozon — SKU
   * Product identifier in Ozon system — SKU
   */
  sku?: number;
  
  /** 
   * Идентификатор товара в системе продавца — артикул
   * Product identifier in seller system — offer ID
   */
  offer_id?: string;
  
  /** 
   * Название товара
   * Product name
   */
  name?: string;
  
  /** 
   * Цена товара
   * Product price
   */
  price?: string;
  
  /** 
   * Код валюты
   * Currency code
   */
  currency_code?: string;
  
  /** 
   * Количество кодов для цифрового товара
   * Number of codes required for digital product
   */
  required_qty_for_digital_code?: number;
  
  readonly [key: string]: unknown;
}

/**
 * Дополнительные параметры отправления
 * Additional posting parameters
 */
export interface DigitalPostingAdditionalData {
  /** 
   * Ключ параметра
   * Parameter key
   */
  key?: string;
  
  /** 
   * Значение параметра
   * Parameter value
   */
  value?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Аналитические данные отправления
 * Posting analytics data
 */
export interface DigitalPostingAnalyticsData {
  /** 
   * Регион доставки
   * Delivery region
   */
  region?: string;
  
  /** 
   * Город доставки
   * Delivery city
   */
  city?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Финансовые данные отправления
 * Posting financial data
 */
export interface DigitalPostingFinancialData {
  /** 
   * Сумма заказа
   * Order amount
   */
  order_amount?: string;
  
  /** 
   * Комиссия
   * Commission
   */
  commission?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Юридическая информация отправления
 * Posting legal information
 */
export interface DigitalPostingLegalInfo {
  /** 
   * Тип покупателя
   * Buyer type
   */
  buyer_type?: string;
  
  /** 
   * ИНН покупателя
   * Buyer TIN
   */
  buyer_inn?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Информация об отправлении с цифровыми товарами
 * Digital posting information
 */
export interface DigitalPosting {
  /** 
   * Номер отправления
   * Posting number
   */
  posting_number?: string;
  
  /** 
   * Номер заказа
   * Order number
   */
  order_number?: string;
  
  /** 
   * Идентификатор заказа
   * Order identifier
   */
  order_id?: number;
  
  /** 
   * Статус отправления
   * Posting status
   */
  status?: string;
  
  /** 
   * Дата создания отправления
   * Posting creation date
   */
  created_at?: string;
  
  /** 
   * Дата начала обработки
   * Processing start date
   */
  in_process_at?: string;
  
  /** 
   * Крайний срок передачи кодов
   * Digital codes deadline
   */
  waiting_deadline_for_digital_code?: string;
  
  /** 
   * Идентификатор причины отмены
   * Cancel reason identifier
   */
  cancel_reason_id?: number;
  
  /** 
   * Список товаров в отправлении
   * Products list in posting
   */
  products?: DigitalPostingProduct[];
  
  /** 
   * Дополнительные параметры
   * Additional parameters
   */
  additional_data?: DigitalPostingAdditionalData[];
  
  /** 
   * Аналитические данные
   * Analytics data
   */
  analytics_data?: DigitalPostingAnalyticsData;
  
  /** 
   * Финансовые данные
   * Financial data
   */
  financial_data?: DigitalPostingFinancialData;
  
  /** 
   * Юридическая информация
   * Legal information
   */
  legal_info?: DigitalPostingLegalInfo;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ списка отправлений с цифровыми товарами
 * Digital postings list response
 */
export interface DigitalListPostingCodesResponse {
  /** 
   * Список отправлений
   * Postings list
   */
  result?: DigitalPosting[];
  
  readonly [key: string]: unknown;
}

/**
 * Ошибка обработки товара
 * Product processing error
 */
export interface DigitalItemError {
  /** 
   * Код ошибки
   * Error code
   */
  code?: string;
  
  /** 
   * Описание ошибки
   * Error description
   */
  message?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Статус обновления остатков товара
 * Product stock update status
 */
export interface DigitalStockUpdateStatus {
  /** 
   * Идентификатор товара в системе продавца — артикул
   * Product identifier in seller system — offer ID
   */
  offer_id?: string;
  
  /** 
   * Идентификатор товара в системе продавца — product_id
   * Product identifier in seller system — product_id
   */
  product_id?: number;
  
  /** 
   * Идентификатор товара в системе Ozon — SKU
   * Product identifier in Ozon system — SKU
   */
  sku?: number;
  
  /** 
   * Признак успешного обновления
   * Successful update flag
   */
  updated?: boolean;
  
  /** 
   * Список ошибок обработки
   * Processing errors list
   */
  errors?: DigitalItemError[];
  
  readonly [key: string]: unknown;
}

/**
 * Ответ обновления остатков цифровых товаров
 * Update digital product stocks response
 */
export interface DigitalStocksImportResponse {
  /** 
   * Информация о статусах обновления товаров
   * Product update status information
   */
  status?: DigitalStockUpdateStatus[];
  
  readonly [key: string]: unknown;
}