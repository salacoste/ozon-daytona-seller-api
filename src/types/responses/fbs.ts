/**
 * Response types for FBS API
 * Generated from OZON API documentation
 * FBS - Fulfillment by Seller operations
 */

/**
 * Причина отмены отправления
 * Posting cancellation reason
 */
export interface FbsCancelReason {
  /** 
   * Идентификатор причины отмены
   * Cancellation reason ID
   */
  id?: number;
  
  /** 
   * Название причины отмены
   * Cancellation reason name
   */
  name?: string;
  
  /** 
   * Тип причины отмены
   * Cancellation reason type
   */
  type_id?: number;
  
  readonly [key: string]: unknown;
}

/**
 * Связанная причина отмены отправления
 * Related posting cancellation reason
 */
export interface FbsRelatedCancelReason {
  /** 
   * Номер отправления
   * Posting number
   */
  posting_number?: string;
  
  /** 
   * Доступные причины отмены
   * Available cancellation reasons
   */
  cancel_reasons?: FbsCancelReason[];
  
  readonly [key: string]: unknown;
}

/**
 * Ответ получения причин отмены отправлений
 * Response for getting posting cancellation reasons
 */
export interface FbsCancelReasonResponse {
  /** 
   * Результат запроса
   * Request result
   */
  result?: FbsRelatedCancelReason[];
  
  readonly [key: string]: unknown;
}

/**
 * Ответ списка причин отмены отправлений
 * Response for cancellation reasons list
 */
export interface FbsCancelReasonListResponse {
  /** 
   * Результат работы метода
   * Method result
   */
  result?: FbsCancelReason[];
  
  readonly [key: string]: unknown;
}

/**
 * Результат создания задания на этикетки
 * Label batch creation result
 */
export interface FbsCreateLabelBatchResult {
  /** 
   * Идентификатор задания
   * Task ID
   */
  task_id?: number;
  
  /** 
   * Статус задания
   * Task status
   */
  status?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ создания задания на формирование этикеток
 * Response for creating label batch task
 */
export interface FbsCreateLabelBatchResponse {
  /** 
   * Результат создания
   * Creation result
   */
  result?: FbsCreateLabelBatchResult;
  
  readonly [key: string]: unknown;
}

/**
 * Результат получения файла с этикетками
 * Label batch file result
 */
export interface FbsGetLabelBatchResult {
  /** 
   * Идентификатор задания
   * Task ID
   */
  task_id?: number;
  
  /** 
   * Статус задания
   * Task status
   */
  status?: string;
  
  /** 
   * Ссылка на файл с этикетками
   * Label file URL
   */
  file_url?: string;
  
  /** 
   * Ошибки при обработке
   * Processing errors
   */
  error?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ получения файла с этикетками
 * Response for getting label batch file
 */
export interface FbsGetLabelBatchResponse {
  /** 
   * Результат получения
   * Getting result
   */
  result?: FbsGetLabelBatchResult;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ проверки кода курьера
 * Response for courier code verification
 */
export interface FbsPickupCodeVerifyResponse {
  /** 
   * Результат проверки
   * Verification result
   */
  result?: boolean;
  
  /** 
   * Информация о проверке
   * Verification info
   */
  verification_info?: {
    /** Код курьера валиден */
    is_valid?: boolean;
    /** Номер отправления */
    posting_number?: string;
    /** Информация об ошибке */
    error_message?: string;
  };
  
  readonly [key: string]: unknown;
}

/**
 * Ограничения пункта приёма
 * Pickup point restrictions
 */
export interface FbsRestrictions {
  /** 
   * Максимальный вес (кг)
   * Maximum weight (kg)
   */
  max_weight?: number;
  
  /** 
   * Максимальные габариты
   * Maximum dimensions
   */
  max_dimensions?: {
    /** Длина (см) */
    length?: number;
    /** Ширина (см) */
    width?: number;
    /** Высота (см) */
    height?: number;
  };
  
  /** 
   * Дополнительные ограничения
   * Additional restrictions
   */
  additional_restrictions?: string[];
  
  readonly [key: string]: unknown;
}

/**
 * Ответ получения ограничений пункта приёма
 * Response for pickup point restrictions
 */
export interface FbsGetRestrictionsResponse {
  /** 
   * Ограничения
   * Restrictions
   */
  result?: FbsRestrictions;
  
  readonly [key: string]: unknown;
}

/**
 * Базовый булевский ответ
 * Basic boolean response
 */
export interface FbsBooleanResponse {
  /** 
   * Результат обработки запроса
   * Request processing result
   */
  result?: boolean;
  
  readonly [key: string]: unknown;
}

/**
 * Товар в отправлении
 * Product in posting
 */
export interface FbsPostingProduct {
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
   * Артикул продавца
   * Seller article
   */
  offer_id?: string;
  
  /** 
   * Цена
   * Price
   */
  price?: string;
  
  /** 
   * Валюта
   * Currency
   */
  currency_code?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Информация об отправлении FBS
 * FBS posting information
 */
export interface FbsPosting {
  /** 
   * Номер отправления
   * Posting number
   */
  posting_number?: string;
  
  /** 
   * Статус отправления
   * Posting status
   */
  status?: string;
  
  /** 
   * Дата создания
   * Creation date
   */
  created_at?: string;
  
  /** 
   * Дата отгрузки
   * Shipment date
   */
  shipment_date?: string;
  
  /** 
   * Товары в отправлении
   * Products in posting
   */
  products?: FbsPostingProduct[];
  
  /** 
   * Адрес доставки
   * Delivery address
   */
  delivery_address?: {
    /** Город */
    city?: string;
    /** Адрес */
    address?: string;
    /** Имя получателя */
    name?: string;
    /** Телефон */
    phone?: string;
  };
  
  /** 
   * Штрихкоды
   * Barcodes
   */
  barcodes?: string[];
  
  readonly [key: string]: unknown;
}

/**
 * Ответ получения информации об отправлении
 * Response for getting posting information
 */
export interface FbsPostingResponse {
  /** 
   * Информация об отправлении
   * Posting information
   */
  result?: FbsPosting;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ печати этикетки
 * Response for printing label
 */
export interface FbsPackageLabelResponse {
  /** 
   * Содержимое PDF файла в base64
   * PDF file content in base64
   */
  content?: string;
  
  /** 
   * Тип контента
   * Content type
   */
  content_type?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Результат отмены товара
 * Product cancellation result
 */
export interface FbsProductCancelResult {
  /** 
   * SKU товара
   * Product SKU
   */
  sku?: string;
  
  /** 
   * Результат отмены
   * Cancellation result
   */
  result?: boolean;
  
  /** 
   * Ошибка при отмене
   * Cancellation error
   */
  error?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ отмены товаров в отправлении
 * Response for cancelling products in posting
 */
export interface FbsProductCancelResponse {
  /** 
   * Результаты отмены товаров
   * Product cancellation results
   */
  result?: FbsProductCancelResult[];
  
  readonly [key: string]: unknown;
}

/**
 * Результат изменения товара
 * Product change result
 */
export interface FbsProductChangeResult {
  /** 
   * SKU товара
   * Product SKU
   */
  sku?: string;
  
  /** 
   * Результат изменения
   * Change result
   */
  result?: boolean;
  
  /** 
   * Ошибка при изменении
   * Change error
   */
  error?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ изменения товаров в отправлении
 * Response for changing products in posting
 */
export interface FbsProductChangeResponse {
  /** 
   * Результаты изменения товаров
   * Product change results
   */
  result?: FbsProductChangeResult[];
  
  readonly [key: string]: unknown;
}

/**
 * Страна-изготовитель
 * Product country
 */
export interface FbsProductCountry {
  /** 
   * ISO код страны
   * Country ISO code
   */
  iso_code?: string;
  
  /** 
   * Название страны
   * Country name
   */
  name?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ списка стран-изготовителей
 * Response for product countries list
 */
export interface FbsProductCountryListResponse {
  /** 
   * Список стран
   * Countries list
   */
  result?: FbsProductCountry[];
  
  readonly [key: string]: unknown;
}

/**
 * Результат установки страны-изготовителя
 * Product country set result
 */
export interface FbsProductCountrySetResult {
  /** 
   * SKU товара
   * Product SKU
   */
  sku?: string;
  
  /** 
   * Результат установки
   * Set result
   */
  result?: boolean;
  
  /** 
   * Ошибка при установке
   * Set error
   */
  error?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ установки страны-изготовителя товара
 * Response for setting product country
 */
export interface FbsProductCountrySetResponse {
  /** 
   * Результаты установки
   * Set results
   */
  result?: FbsProductCountrySetResult[];
  
  readonly [key: string]: unknown;
}

/**
 * Ответ получения информации об отправлении v3
 * Response for getting posting info v3
 */
export interface FbsGetPostingV3Response {
  /** 
   * Информация об отправлении
   * Posting information
   */
  result?: FbsPosting;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ списка отправлений v3
 * Response for postings list v3
 */
export interface FbsGetPostingListV3Response {
  /** 
   * Список отправлений
   * Postings list
   */
  result?: FbsPosting[];
  
  /** 
   * Есть следующая страница
   * Has next page
   */
  has_next?: boolean;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ списка необработанных отправлений v3
 * Response for unfulfilled postings list v3
 */
export interface FbsGetUnfulfilledListV3Response {
  /** 
   * Список необработанных отправлений
   * Unfulfilled postings list
   */
  result?: FbsPosting[];
  
  /** 
   * Есть следующая страница
   * Has next page
   */
  has_next?: boolean;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ установки количества коробок
 * Response for setting multi-box quantity
 */
export interface FbsMultiBoxQtySetV3Response {
  /** 
   * Результат установки
   * Set result
   */
  result?: boolean;
  
  readonly [key: string]: unknown;
}

/**
 * Таможенная декларация ETGB
 * ETGB customs declaration
 */
export interface FbsEtgbDeclaration {
  /** 
   * Номер отправления
   * Posting number
   */
  posting_number?: string;
  
  /** 
   * Ссылка на документ
   * Document URL
   */
  document_url?: string;
  
  /** 
   * Тип документа
   * Document type
   */
  document_type?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ получения таможенных деклараций ETGB
 * Response for ETGB customs declarations
 */
export interface FbsGetEtgbResponse {
  /** 
   * Таможенные декларации
   * Customs declarations
   */
  result?: FbsEtgbDeclaration[];
  
  readonly [key: string]: unknown;
}

/**
 * Неоплаченный товар юридического лица
 * Unpaid legal product
 */
export interface FbsUnpaidLegalProduct {
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
   * Цена
   * Price
   */
  price?: string;
  
  /** 
   * Номер отправления
   * Posting number
   */
  posting_number?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ списка неоплаченных товаров юридических лиц
 * Response for unpaid legal products list
 */
export interface FbsUnpaidLegalProductListResponse {
  /** 
   * Список неоплаченных товаров
   * Unpaid products list
   */
  result?: FbsUnpaidLegalProduct[];
  
  /** 
   * Есть следующая страница
   * Has next page
   */
  has_next?: boolean;
  
  readonly [key: string]: unknown;
}