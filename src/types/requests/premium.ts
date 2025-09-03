/**
 * Request types for Premium API
 * Premium seller features and scoring
 * Ready for manual editing and enhancements
 */

/**
 * Измерения для группировки данных аналитики
 * Dimensions for analytics data grouping
 */
export type PremiumAnalyticsDimension = 
  | 'unknownDimension'
  | 'sku'
  | 'spu'
  | 'day'
  | 'week'
  | 'month'
  | 'year'          // Premium Plus only
  | 'category1'     // Premium Plus only
  | 'category2'     // Premium Plus only
  | 'category3'     // Premium Plus only
  | 'category4'     // Premium Plus only
  | 'brand'         // Premium Plus only
  | 'modelID';      // Premium Plus only

/**
 * Метрики для аналитики
 * Analytics metrics
 */
export type PremiumAnalyticsMetric = 
  | 'revenue'                    // Available to all
  | 'ordered_units'              // Available to all
  | 'unknown_metric'             // Premium Plus only
  | 'hits_view_search'           // Premium Plus only
  | 'hits_view_pdp'              // Premium Plus only
  | 'hits_view'                  // Premium Plus only
  | 'hits_tocart_search'         // Premium Plus only
  | 'hits_tocart_pdp'            // Premium Plus only
  | 'hits_tocart'                // Premium Plus only
  | 'session_view_search'        // Premium Plus only
  | 'session_view_pdp'           // Premium Plus only
  | 'session_view'               // Premium Plus only
  | 'conv_tocart_search'         // Premium Plus only
  | 'conv_tocart_pdp'            // Premium Plus only
  | 'conv_tocart'                // Premium Plus only
  | 'returns'                    // Premium Plus only
  | 'cancellations'              // Premium Plus only
  | 'delivered_units'            // Premium Plus only
  | 'position_category';         // Premium Plus only

/**
 * Фильтр для аналитики
 * Analytics filter
 */
export interface PremiumAnalyticsFilter {
  /** 
   * Поле для фильтрации
   * Field to filter by
   */
  field?: string;
  
  /** 
   * Значения фильтра
   * Filter values
   */
  values?: string[];
  
  readonly [key: string]: unknown;
}

/**
 * Направление сортировки
 * Sort direction
 */
export type PremiumSortDirection = 'ASC' | 'DESC';

/**
 * Настройки сортировки
 * Sort settings
 */
export interface PremiumAnalyticsSort {
  /** 
   * Поле для сортировки
   * Field to sort by
   */
  key?: string;
  
  /** 
   * Направление сортировки
   * Sort direction
   */
  order?: PremiumSortDirection;
  
  readonly [key: string]: unknown;
}

/**
 * Запрос данных аналитики (Premium Plus)
 * Analytics data request (Premium Plus)
 */
export interface PremiumAnalyticsGetDataRequest {
  /** 
   * Дата начала периода (YYYY-MM-DD)
   * Period start date (YYYY-MM-DD)
   */
  date_from: string;
  
  /** 
   * Дата окончания периода (YYYY-MM-DD)
   * Period end date (YYYY-MM-DD)
   */
  date_to: string;
  
  /** 
   * Группировка данных в отчёте
   * Data grouping in report
   */
  dimension: PremiumAnalyticsDimension[];
  
  /** 
   * Метрики для отчёта (до 14 метрик)
   * Metrics for report (up to 14 metrics)
   */
  metrics: PremiumAnalyticsMetric[];
  
  /** 
   * Количество значений в ответе (1-1000)
   * Number of values in response (1-1000)
   */
  limit: number;
  
  /** 
   * Фильтры
   * Filters
   */
  filters?: PremiumAnalyticsFilter[];
  
  /** 
   * Количество пропускаемых элементов
   * Number of elements to skip
   */
  offset?: number;
  
  /** 
   * Настройки сортировки
   * Sort settings
   */
  sort?: PremiumAnalyticsSort[];
  
  readonly [key: string]: unknown;
}

/**
 * Тип сортировки для запросов товаров
 * Sort type for product queries
 */
export type PremiumProductQueriesSortBy = 'sku' | 'queries_count' | 'clicks' | 'ctr' | 'position';

/**
 * Запрос информации о запросах товаров (Premium/Premium Plus)
 * Product queries information request (Premium/Premium Plus)
 */
export interface PremiumProductQueriesRequest {
  /** 
   * Дата начала формирования аналитики
   * Analytics formation start date
   */
  date_from: string;
  
  /** 
   * Дата окончания формирования аналитики
   * Analytics formation end date
   */
  date_to?: string;
  
  /** 
   * Список SKU товаров (максимум 1000)
   * List of product SKUs (maximum 1000)
   */
  skus: string[];
  
  /** 
   * Количество элементов на странице
   * Number of elements per page
   */
  page_size: number;
  
  /** 
   * Номер страницы
   * Page number
   */
  page?: number;
  
  /** 
   * Поле для сортировки
   * Sort field
   */
  sort_by?: PremiumProductQueriesSortBy;
  
  /** 
   * Направление сортировки
   * Sort direction
   */
  sort_dir?: PremiumSortDirection;
  
  readonly [key: string]: unknown;
}

/**
 * Тип сортировки для детализации запросов
 * Sort type for query details
 */
export type PremiumProductQueriesDetailsSortBy = 'query' | 'clicks' | 'ctr' | 'position';

/**
 * Запрос детализации запросов по товару (Premium/Premium Plus)
 * Product query details request (Premium/Premium Plus)
 */
export interface PremiumProductQueriesDetailsRequest {
  /** 
   * Дата начала формирования аналитики
   * Analytics formation start date
   */
  date_from: string;
  
  /** 
   * Дата окончания формирования аналитики
   * Analytics formation end date
   */
  date_to?: string;
  
  /** 
   * Список SKU товаров (максимум 1000)
   * List of product SKUs (maximum 1000)
   */
  skus: string[];
  
  /** 
   * Лимит запросов по одному SKU (максимум 15)
   * Limit of queries per SKU (maximum 15)
   */
  limit_by_sku: number;
  
  /** 
   * Количество элементов на странице (максимум 100)
   * Number of elements per page (maximum 100)
   */
  page_size: number;
  
  /** 
   * Номер страницы (минимум 0)
   * Page number (minimum 0)
   */
  page?: number;
  
  /** 
   * Поле для сортировки
   * Sort field
   */
  sort_by?: PremiumProductQueriesDetailsSortBy;
  
  /** 
   * Направление сортировки
   * Sort direction
   */
  sort_dir?: PremiumSortDirection;
  
  readonly [key: string]: unknown;
}

/**
 * Запрос отправки сообщения в чат (Premium Plus)
 * Send chat message request (Premium Plus)
 */
export interface PremiumChatSendMessageRequest {
  /** 
   * Идентификатор чата
   * Chat identifier
   */
  chat_id: string;
  
  /** 
   * Текст сообщения (1-1000 символов)
   * Message text (1-1000 characters)
   */
  text: string;
  
  readonly [key: string]: unknown;
}

/**
 * Запрос создания нового чата (Premium Plus)
 * Create new chat request (Premium Plus)
 */
export interface PremiumChatStartRequest {
  /** 
   * Идентификатор отправления
   * Posting identifier
   */
  posting_number: string;
  
  readonly [key: string]: unknown;
}

/**
 * Запрос отчёта о реализации за день (Premium Plus)
 * Daily realization report request (Premium Plus)
 */
export interface PremiumRealizationByDayRequest {
  /** 
   * День
   * Day
   */
  day: number;
  
  /** 
   * Месяц
   * Month
   */
  month: number;
  
  /** 
   * Год
   * Year
   */
  year: number;
  
  readonly [key: string]: unknown;
}

/**
 * Запрос отметки сообщений как прочитанных (Premium Plus)
 * Mark messages as read request (Premium Plus)
 */
export interface PremiumChatReadRequest {
  /** 
   * Идентификатор чата
   * Chat identifier
   */
  chat_id: string;
  
  /** 
   * Идентификатор сообщения до которого отмечать как прочитанные
   * Message ID up to which to mark as read
   */
  from_message_id?: number;
  
  readonly [key: string]: unknown;
}

/**
 * Запрос истории чата (Premium Plus)
 * Chat history request (Premium Plus)
 */
/**
 * Направление сортировки истории чата
 * Chat history sort direction
 */
export type PremiumChatHistoryDirection = 'Forward' | 'Backward';

export interface PremiumChatHistoryRequest {
  /** 
   * Идентификатор чата
   * Chat identifier
   */
  chat_id: string;
  
  /** 
   * Направление сортировки сообщений
   * Messages sorting direction
   */
  direction?: PremiumChatHistoryDirection;
  
  /** 
   * Количество сообщений (максимум 1000)
   * Number of messages (maximum 1000)
   */
  limit?: number;
  
  /** 
   * Идентификатор сообщения, с которого начать вывод истории чата
   * Message ID from which to start chat history output
   */
  from_message_id?: number;
  
  readonly [key: string]: unknown;
}