/**
 * Request types for ReportAPI
 * Business reporting and analytics generation
 * Ready for manual editing and enhancements
 */

/**
 * Период для финансового отчёта
 * Period for financial report
 */
export interface ReportFinancePeriod {
  /** 
   * Начало периода в формате YYYY-MM-DD
   * Period start in YYYY-MM-DD format
   */
  from: string;
  
  /** 
   * Конец периода в формате YYYY-MM-DD
   * Period end in YYYY-MM-DD format
   */
  to: string;
}

/**
 * Запрос финансового отчёта
 * Financial report request
 */
export interface ReportFinanceCashFlowStatementListRequest {
  /** 
   * Период отчёта
   * Report period
   */
  date: ReportFinancePeriod;
  
  /** 
   * Номер страницы, возвращаемой в запросе
   * Page number returned in request
   */
  page: number;
  
  /** 
   * Количество элементов на странице
   * Number of elements per page
   */
  page_size: number;
  
  /** 
   * true, если нужно добавить дополнительные параметры в ответ
   * true if additional parameters need to be added to response
   */
  with_details?: boolean;
  
  readonly [key: string]: unknown;
}

/**
 * Запрос создания отчёта об уценённых товарах
 * Request to create discounted products report
 */
export interface ReportCreateDiscountedRequest {
  readonly [key: string]: unknown;
}

/**
 * Запрос информации об отчёте
 * Request for report information
 */
export interface ReportInfoRequest {
  /** 
   * Уникальный идентификатор отчёта
   * Unique report identifier
   */
  code: string;
  
  readonly [key: string]: unknown;
}

/**
 * Тип отчёта для списка отчётов
 * Report type for report list
 */
export type ReportListType = 'ALL' | 'PRODUCTS' | 'POSTINGS' | 'RETURNS' | 'DISCOUNTED' | 'STOCK_BY_WAREHOUSE';

/**
 * Запрос списка отчётов
 * Request for report list
 */
export interface ReportListRequest {
  /** 
   * Номер страницы
   * Page number
   */
  page: number;
  
  /** 
   * Количество значений на странице (по умолчанию — 100, максимальное — 1000)
   * Number of values per page (default 100, maximum 1000)
   */
  page_size: number;
  
  /** 
   * Тип отчёта
   * Report type
   */
  report_type?: ReportListType;
  
  readonly [key: string]: unknown;
}

/**
 * Язык отчёта
 * Report language
 */
export type ReportLanguage = 'DEFAULT' | 'RU' | 'EN';

/**
 * Фильтр для отчёта об отправлениях
 * Filter for postings report
 */
export interface ReportPostingsFilter {
  /** 
   * Начало периода в формате YYYY-MM-DD
   * Period start in YYYY-MM-DD format
   */
  since: string;
  
  /** 
   * Конец периода в формате YYYY-MM-DD
   * Period end in YYYY-MM-DD format
   */
  to: string;
  
  /** 
   * Список статусов отправлений
   * List of posting statuses
   */
  status?: string[];
  
  readonly [key: string]: unknown;
}

/**
 * Запрос создания отчёта об отправлениях
 * Request to create postings report
 */
export interface ReportCreatePostingsRequest {
  /** 
   * Фильтр для отчёта
   * Report filter
   */
  filter: ReportPostingsFilter;
  
  /** 
   * Язык отчёта
   * Report language
   */
  language?: ReportLanguage;
  
  readonly [key: string]: unknown;
}

/**
 * Видимость товаров в отчёте
 * Product visibility in report
 */
export type ReportProductVisibility = 'ALL' | 'VISIBLE' | 'INVISIBLE' | 'EMPTY_STOCK' | 'NOT_MODERATED' | 'MODERATED' | 'DISABLED' | 'STATE_FAILED_MODERATION' | 'READY_TO_SUPPLY' | 'VALIDATION_STATE_PENDING' | 'VALIDATION_STATE_FAIL' | 'VALIDATION_STATE_SUCCESS' | 'TO_SUPPLY' | 'IN_SALE' | 'REMOVED_FROM_SALE' | 'BANNED' | 'OVERPRICED' | 'CRITICALLY_OVERPRICED' | 'EMPTY_BARCODE' | 'BARCODE_EXISTS' | 'QUARANTINE' | 'ARCHIVED' | 'OVERPRICED_WITH_STOCK' | 'PARTIAL_APPROVED' | 'IMAGE_ABSENT' | 'MODERATION_BLOCK';

/**
 * Запрос создания отчёта по товарам
 * Request to create products report
 */
export interface ReportCreateProductsRequest {
  /** 
   * Язык отчёта
   * Report language
   */
  language?: ReportLanguage;
  
  /** 
   * Идентификаторы товаров в системе продавца — артикулы
   * Product identifiers in seller system - article numbers
   */
  offer_id?: string[];
  
  /** 
   * Поиск по содержанию записи
   * Search by record content
   */
  search?: string;
  
  /** 
   * Идентификаторы товаров в системе Ozon — SKU
   * Product identifiers in Ozon system - SKU
   */
  sku?: number[];
  
  /** 
   * Видимость товаров
   * Product visibility
   */
  visibility?: ReportProductVisibility;
  
  readonly [key: string]: unknown;
}

/**
 * Запрос создания отчёта об остатках на FBS-складе
 * Request to create FBS warehouse stock report
 */
export interface ReportCreateStockByWarehouseRequest {
  /** 
   * Идентификаторы складов
   * Warehouse identifiers
   */
  warehouseId: string[];
  
  /** 
   * Язык отчёта
   * Report language
   */
  language?: ReportLanguage;
  
  readonly [key: string]: unknown;
}

/**
 * Запрос создания отчёта о возвратах
 * Request to create returns report
 */
export interface ReportCreateReturnsRequest {
  /** 
   * Начало периода в формате YYYY-MM-DD
   * Period start in YYYY-MM-DD format
   */
  date_from: string;
  
  /** 
   * Конец периода в формате YYYY-MM-DD
   * Period end in YYYY-MM-DD format
   */
  date_to: string;
  
  /** 
   * Язык отчёта
   * Report language
   */
  language?: ReportLanguage;
  
  readonly [key: string]: unknown;
}