/**
 * Request types for pricing strategy API
 * Manually implemented for type safety
 * Ready for manual editing and enhancements
 */

/**
 * Запрос списка конкурентов
 * Competitors list request
 */
export interface GetCompetitorsRequest {
  /** Список SKU товаров для поиска конкурентов */
  sku?: string[];
  /** Лимит результатов */
  limit?: number;
  readonly [key: string]: unknown;
}

/**
 * Запрос создания стратегии ценообразования
 * Create pricing strategy request
 */
export interface CreatePricingStrategyRequest {
  /** Название стратегии */
  name: string;
  /** Описание стратегии */
  description?: string;
  /** Тип стратегии */
  strategy_type?: string;
  /** Настройки стратегии */
  settings?: Record<string, unknown>;
  readonly [key: string]: unknown;
}

/**
 * Запрос удаления стратегии
 * Delete pricing strategy request
 */
export interface DeletePricingStrategyRequest {
  /** Идентификатор стратегии */
  strategy_id: string;
  readonly [key: string]: unknown;
}

/**
 * Запрос информации о стратегии
 * Get strategy info request
 */
export interface GetStrategyInfoRequest {
  /** Идентификатор стратегии */
  strategy_id: string;
  readonly [key: string]: unknown;
}

/**
 * Запрос списка стратегий
 * Get strategy list request
 */
export interface GetStrategyListRequest {
  /** Лимит результатов */
  limit?: number;
  /** Смещение для пагинации */
  offset?: number;
  readonly [key: string]: unknown;
}

/**
 * Запрос информации о цене товара у конкурента
 * Get strategy item info request
 */
export interface GetStrategyItemInfoRequest {
  /** Идентификатор стратегии */
  strategy_id: string;
  /** SKU товара */
  sku: string;
  readonly [key: string]: unknown;
}

/**
 * Товар для добавления в стратегию
 * Strategy item to add
 */
export interface StrategyItemToAdd {
  /** SKU товара */
  sku: string;
  /** Дополнительные настройки товара */
  settings?: Record<string, unknown>;
}

/**
 * Запрос добавления товаров в стратегию
 * Add strategy items request
 */
export interface AddStrategyItemsRequest {
  /** Идентификатор стратегии */
  strategy_id: string;
  /** Список товаров для добавления */
  items: StrategyItemToAdd[];
  readonly [key: string]: unknown;
}

/**
 * Запрос удаления товаров из стратегии
 * Delete strategy items request
 */
export interface DeleteStrategyItemsRequest {
  /** Идентификатор стратегии */
  strategy_id: string;
  /** Список SKU товаров для удаления */
  sku: string[];
  readonly [key: string]: unknown;
}

/**
 * Запрос списка товаров в стратегии
 * Get strategy items request
 */
export interface GetStrategyItemsRequest {
  /** Идентификатор стратегии */
  strategy_id: string;
  /** Лимит результатов */
  limit?: number;
  /** Смещение для пагинации */
  offset?: number;
  readonly [key: string]: unknown;
}

/**
 * Запрос изменения статуса стратегии
 * Update strategy status request
 */
export interface UpdateStatusStrategyRequest {
  /** Идентификатор стратегии */
  strategy_id: string;
  /** Новый статус стратегии */
  status: 'ACTIVE' | 'INACTIVE' | 'PAUSED';
  readonly [key: string]: unknown;
}

/**
 * Запрос списка идентификаторов стратегий по товарам
 * Get strategy IDs by product IDs request
 */
export interface GetStrategyIDsByItemIDsRequest {
  /** Список SKU товаров */
  sku: string[];
  readonly [key: string]: unknown;
}

/**
 * Запрос обновления стратегии
 * Update pricing strategy request
 */
export interface UpdatePricingStrategyRequest {
  /** Идентификатор стратегии */
  strategy_id: string;
  /** Новое название стратегии */
  name?: string;
  /** Новое описание стратегии */
  description?: string;
  /** Новые настройки стратегии */
  settings?: Record<string, unknown>;
  readonly [key: string]: unknown;
}