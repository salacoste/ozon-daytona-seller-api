/**
 * Response types for pricing strategy API
 * Manually implemented for type safety
 * Ready for manual editing and enhancements
 */

/**
 * Информация о конкуренте
 * Competitor information
 */
export interface CompetitorInfo {
  /** Идентификатор конкурента */
  competitor_id?: string;
  /** Название конкурента/площадки */
  name?: string;
  /** URL конкурента */
  url?: string;
  /** Цена товара у конкурента */
  price?: string;
  /** Валюта цены */
  currency?: string;
  /** Доступность товара */
  available?: boolean;
}

/**
 * Ответ списка конкурентов
 * Competitors list response
 */
export interface GetCompetitorsResponse {
  /** Список конкурентов */
  competitors?: CompetitorInfo[];
  /** Общее количество найденных конкурентов */
  total_count?: number;
  readonly [key: string]: unknown;
}

/**
 * Результат создания стратегии
 * Create strategy result
 */
export interface CreatePricingStrategyResult {
  /** Идентификатор созданной стратегии */
  strategy_id?: string;
  /** Статус создания */
  status?: string;
}

/**
 * Ответ создания стратегии ценообразования
 * Create pricing strategy response
 */
export interface CreatePricingStrategyResponse {
  /** Результат создания */
  result?: CreatePricingStrategyResult;
  readonly [key: string]: unknown;
}

/**
 * Базовый пустой ответ
 * Empty response
 */
export interface EmptyResponse {
  /** Статус операции */
  status?: string;
  readonly [key: string]: unknown;
}

/**
 * Стратегия ценообразования
 * Pricing strategy
 */
export interface PricingStrategy {
  /** Идентификатор стратегии */
  strategy_id?: string;
  /** Название стратегии */
  name?: string;
  /** Описание стратегии */
  description?: string;
  /** Тип стратегии */
  strategy_type?: string;
  /** Статус стратегии */
  status?: string;
  /** Дата создания */
  created_at?: string;
  /** Дата последнего обновления */
  updated_at?: string;
  /** Настройки стратегии */
  settings?: Record<string, unknown>;
}

/**
 * Ответ информации о стратегии
 * Get strategy response
 */
export interface GetStrategyResponse {
  /** Информация о стратегии */
  strategy?: PricingStrategy;
  readonly [key: string]: unknown;
}

/**
 * Ответ списка стратегий
 * Get strategy list response
 */
export interface GetStrategyListResponse {
  /** Список стратегий */
  strategies?: PricingStrategy[];
  /** Общее количество стратегий */
  total_count?: number;
  /** Смещение */
  offset?: number;
  /** Лимит */
  limit?: number;
  readonly [key: string]: unknown;
}

/**
 * Информация о товаре в стратегии
 * Strategy item info
 */
export interface StrategyItemInfo {
  /** SKU товара */
  sku?: string;
  /** Название товара */
  product_name?: string;
  /** Текущая цена товара */
  current_price?: string;
  /** Рекомендованная цена */
  recommended_price?: string;
  /** Цена конкурента */
  competitor_price?: string;
  /** Ссылка на товар у конкурента */
  competitor_url?: string;
  /** Статус товара в стратегии */
  status?: string;
}

/**
 * Ответ информации о цене товара у конкурента
 * Get strategy item info response
 */
export interface GetStrategyItemInfoResponse {
  /** Информация о товаре */
  item?: StrategyItemInfo;
  readonly [key: string]: unknown;
}

/**
 * Результат добавления товара в стратегию
 * Add strategy item result
 */
export interface AddStrategyItemResult {
  /** SKU товара */
  sku?: string;
  /** Статус добавления */
  status?: string;
  /** Сообщение об ошибке (если есть) */
  error_message?: string;
}

/**
 * Ответ добавления товаров в стратегию
 * Add strategy items response
 */
export interface AddStrategyItemsResponse {
  /** Результаты добавления товаров */
  results?: AddStrategyItemResult[];
  /** Общий статус операции */
  status?: string;
  readonly [key: string]: unknown;
}

/**
 * Результат удаления товара из стратегии
 * Delete strategy item result
 */
export interface DeleteStrategyItemResult {
  /** SKU товара */
  sku?: string;
  /** Статус удаления */
  status?: string;
  /** Сообщение об ошибке (если есть) */
  error_message?: string;
}

/**
 * Ответ удаления товаров из стратегии
 * Delete strategy items response
 */
export interface DeleteStrategyItemsResponse {
  /** Результаты удаления товаров */
  results?: DeleteStrategyItemResult[];
  /** Общий статус операции */
  status?: string;
  readonly [key: string]: unknown;
}

/**
 * Ответ списка товаров в стратегии
 * Get strategy items response
 */
export interface GetStrategyItemsResponse {
  /** Список товаров в стратегии */
  items?: StrategyItemInfo[];
  /** Общее количество товаров */
  total_count?: number;
  /** Смещение */
  offset?: number;
  /** Лимит */
  limit?: number;
  readonly [key: string]: unknown;
}

/**
 * Информация о продукте и связанных стратегиях
 * Product info with strategy IDs
 */
export interface ProductStrategyInfo {
  /** SKU товара */
  sku?: string;
  /** Список идентификаторов стратегий */
  strategy_ids?: string[];
}

/**
 * Ответ списка идентификаторов стратегий по товарам
 * Get strategy IDs by item IDs response
 */
export interface GetStrategyIDsByItemIDsResponse {
  /** Информация о товарах и их стратегиях */
  products?: ProductStrategyInfo[];
  readonly [key: string]: unknown;
}
