/**
 * Response types for Premium API
 * Premium seller features and scoring
 * Ready for manual editing and enhancements
 */

/**
 * Элемент данных аналитики
 * Analytics data item
 */
export interface PremiumAnalyticsDataItem {
  /**
   * Измерения (группировка)
   * Dimensions (grouping)
   */
  dimensions?: Record<string, string>;

  /**
   * Значения метрик
   * Metric values
   */
  metrics?: Record<string, number>;

  readonly [key: string]: unknown;
}

/**
 * Результат данных аналитики
 * Analytics data result
 */
export interface PremiumAnalyticsDataResult {
  /**
   * Данные аналитики
   * Analytics data
   */
  data?: PremiumAnalyticsDataItem[];

  /**
   * Общее количество записей
   * Total records count
   */
  total_count?: number;

  readonly [key: string]: unknown;
}

/**
 * Ответ данных аналитики (Premium Plus)
 * Analytics data response (Premium Plus)
 */
export interface PremiumAnalyticsGetDataResponse {
  /**
   * Результат аналитики
   * Analytics result
   */
  result?: PremiumAnalyticsDataResult;

  /**
   * Время создания отчёта
   * Report creation time
   */
  timestamp?: string;

  readonly [key: string]: unknown;
}

/**
 * Период аналитики
 * Analytics period
 */
export interface PremiumAnalyticsPeriod {
  /**
   * Дата начала
   * Start date
   */
  date_from?: string;

  /**
   * Дата окончания
   * End date
   */
  date_to?: string;

  readonly [key: string]: unknown;
}

/**
 * Элемент запросов товара
 * Product queries item
 */
export interface PremiumProductQueriesItem {
  /**
   * SKU товара
   * Product SKU
   */
  sku?: string;

  /**
   * Количество запросов
   * Queries count
   */
  queries_count?: number;

  /**
   * Количество кликов
   * Clicks count
   */
  clicks?: number;

  /**
   * CTR (Click-through rate)
   * CTR (Click-through rate)
   */
  ctr?: number;

  /**
   * Средняя позиция в поиске
   * Average search position
   */
  position?: number;

  /**
   * Показы в поиске
   * Search impressions
   */
  impressions?: number;

  readonly [key: string]: unknown;
}

/**
 * Ответ информации о запросах товаров (Premium/Premium Plus)
 * Product queries information response (Premium/Premium Plus)
 */
export interface PremiumProductQueriesResponse {
  /**
   * Период аналитики
   * Analytics period
   */
  analytics_period?: PremiumAnalyticsPeriod;

  /**
   * Список товаров
   * Products list
   */
  items?: PremiumProductQueriesItem[];

  /**
   * Количество страниц
   * Pages count
   */
  page_count?: number;

  /**
   * Общее количество записей
   * Total records count
   */
  total?: number;

  readonly [key: string]: unknown;
}

/**
 * Запрос с детализацией
 * Detailed query
 */
export interface PremiumQueryDetail {
  /**
   * Текст запроса
   * Query text
   */
  query?: string;

  /**
   * SKU товара
   * Product SKU
   */
  sku?: string;

  /**
   * Количество кликов
   * Clicks count
   */
  clicks?: number;

  /**
   * CTR (Click-through rate)
   * CTR (Click-through rate)
   */
  ctr?: number;

  /**
   * Позиция в поиске
   * Search position
   */
  position?: number;

  /**
   * Показы
   * Impressions
   */
  impressions?: number;

  readonly [key: string]: unknown;
}

/**
 * Ответ детализации запросов по товару (Premium/Premium Plus)
 * Product query details response (Premium/Premium Plus)
 */
export interface PremiumProductQueriesDetailsResponse {
  /**
   * Период аналитики
   * Analytics period
   */
  analytics_period?: PremiumAnalyticsPeriod;

  /**
   * Количество страниц
   * Pages count
   */
  page_count?: number;

  /**
   * Список запросов
   * Queries list
   */
  queries?: PremiumQueryDetail[];

  /**
   * Общее количество запросов
   * Total queries count
   */
  total?: number;

  readonly [key: string]: unknown;
}

/**
 * Ответ отправки сообщения в чат (Premium Plus)
 * Send chat message response (Premium Plus)
 */
export interface PremiumChatSendMessageResponse {
  /**
   * Результат обработки запроса
   * Request processing result
   */
  result?: string;

  readonly [key: string]: unknown;
}

/**
 * Результат создания чата
 * Chat creation result
 */
export interface PremiumChatStartResult {
  /**
   * Идентификатор созданного чата
   * Created chat identifier
   */
  chat_id?: string;

  /**
   * Статус создания
   * Creation status
   */
  status?: string;

  readonly [key: string]: unknown;
}

/**
 * Ответ создания нового чата (Premium Plus)
 * Create new chat response (Premium Plus)
 */
export interface PremiumChatStartResponse {
  /**
   * Результат создания чата
   * Chat creation result
   */
  result?: PremiumChatStartResult;

  readonly [key: string]: unknown;
}

/**
 * Строка отчёта о реализации за день
 * Daily realization report row
 */
export interface PremiumRealizationByDayRow {
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
   * Количество реализованных товаров
   * Realized products quantity
   */
  quantity?: number;

  /**
   * Сумма реализации
   * Realization amount
   */
  amount?: number;

  /**
   * Валюта
   * Currency
   */
  currency?: string;

  readonly [key: string]: unknown;
}

/**
 * Ответ отчёта о реализации за день (Premium Plus)
 * Daily realization report response (Premium Plus)
 */
export interface PremiumRealizationByDayResponse {
  /**
   * Таблица отчёта
   * Report table
   */
  rows?: PremiumRealizationByDayRow[];

  readonly [key: string]: unknown;
}

/**
 * Ответ отметки сообщений как прочитанных (Premium Plus)
 * Mark messages as read response (Premium Plus)
 */
export interface PremiumChatReadResponse {
  /**
   * Результат обработки
   * Processing result
   */
  result?: string;

  readonly [key: string]: unknown;
}

/**
 * Сообщение в чате
 * Chat message
 */
export interface PremiumChatMessage {
  /**
   * Идентификатор сообщения
   * Message identifier
   */
  message_id?: string;

  /**
   * Текст сообщения
   * Message text
   */
  text?: string;

  /**
   * Автор сообщения
   * Message author
   */
  author?: string;

  /**
   * Дата создания сообщения
   * Message creation date
   */
  created_at?: string;

  /**
   * Статус прочтения
   * Read status
   */
  is_read?: boolean;

  readonly [key: string]: unknown;
}

/**
 * Ответ истории чата (Premium Plus)
 * Chat history response (Premium Plus)
 */
export interface PremiumChatHistoryResponse {
  /**
   * Список сообщений
   * Messages list
   */
  messages?: PremiumChatMessage[];

  /**
   * Есть ли ещё сообщения
   * Are there more messages
   */
  has_more?: boolean;

  /**
   * Общее количество сообщений
   * Total messages count
   */
  total_count?: number;

  readonly [key: string]: unknown;
}
