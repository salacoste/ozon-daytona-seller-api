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
  /**
   * Страница списка, с которой нужно выгрузить конкурентов
   * Page number for competitors list (minimum 1)
   */
  page: number;

  /**
   * Максимальное количество конкурентов на странице (1-50)
   * Maximum number of competitors per page (1-50)
   */
  limit: number;

  readonly [key: string]: unknown;
}

/**
 * Запрос создания стратегии ценообразования
 * Create pricing strategy request
 */
/**
 * Информация о конкуренте
 * Competitor information
 */
export interface PricingStrategyCompetitor {
  readonly [key: string]: unknown;
}

export interface CreatePricingStrategyRequest {
  /**
   * Название стратегии
   * Strategy name
   */
  strategy_name: string;

  /**
   * Список конкурентов
   * List of competitors
   */
  competitors: PricingStrategyCompetitor[];

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
  /**
   * Страница списка, с которой нужно выгрузить стратегии
   * Page number for strategies list (minimum 1)
   */
  page: number;

  /**
   * Максимальное количество стратегий на странице (1-50)
   * Maximum number of strategies per page (1-50)
   */
  limit: number;

  readonly [key: string]: unknown;
}

/**
 * Запрос информации о цене товара у конкурента
 * Get strategy item info request
 */
export interface GetStrategyItemInfoRequest {
  /**
   * Идентификатор товара в системе продавца
   * Product identifier in seller system
   */
  product_id: number;

  readonly [key: string]: unknown;
}

/**
 * Запрос добавления товаров в стратегию
 * Add strategy items request
 */
export interface AddStrategyItemsRequest {
  /**
   * Идентификатор стратегии
   * Strategy identifier
   */
  strategy_id: string;

  /**
   * Список идентификаторов товаров в системе продавца (максимум 50)
   * List of product identifiers in seller system (maximum 50)
   */
  product_id: string[];

  readonly [key: string]: unknown;
}

/**
 * Запрос удаления товаров из стратегии
 * Delete strategy items request
 */
export interface DeleteStrategyItemsRequest {
  /**
   * Идентификатор стратегии
   * Strategy identifier
   */
  strategy_id: string;

  /**
   * Список идентификаторов товаров в системе продавца (максимум 50)
   * List of product identifiers in seller system (maximum 50)
   */
  product_id: string[];

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
  /**
   * Идентификатор стратегии
   * Strategy identifier
   */
  strategy_id: string;

  /**
   * Статус стратегии: true - включена, false - отключена
   * Strategy status: true - enabled, false - disabled
   */
  enabled?: boolean;

  readonly [key: string]: unknown;
}

/**
 * Запрос списка идентификаторов стратегий по товарам
 * Get strategy IDs by product IDs request
 */
export interface GetStrategyIDsByItemIDsRequest {
  /**
   * Список идентификаторов товаров в системе продавца
   * List of product identifiers in seller system
   */
  product_id: string[];

  readonly [key: string]: unknown;
}

/**
 * Запрос обновления стратегии
 * Update pricing strategy request
 */
export interface UpdatePricingStrategyRequest {
  /**
   * Идентификатор стратегии
   * Strategy identifier
   */
  strategy_id: string;

  /**
   * Название стратегии
   * Strategy name
   */
  strategy_name: string;

  /**
   * Список конкурентов
   * List of competitors
   */
  competitors: PricingStrategyCompetitor[];

  readonly [key: string]: unknown;
}
