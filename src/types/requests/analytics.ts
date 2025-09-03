/**
 * Request types for analytics API
 * Manually implemented for type safety
 * Ready for manual editing and enhancements
 */

/**
 * Запрос для получения оборачиваемости товара
 * Request for stock turnover analytics
 */
export interface AnalyticsTurnoverStocksRequest {
  /** 
   * Количество значений в ответе (1-1000)
   * Number of values in response
   */
  limit?: number;
  
  /** 
   * Количество элементов, которое будет пропущено в ответе
   * Number of elements to skip in response
   */
  offset?: number;
  
  /** 
   * Идентификаторы товаров в системе Ozon — SKU
   * Product identifiers in Ozon system - SKU
   */
  sku?: string[];
  
  readonly [key: string]: unknown;
}

/**
 * Тип склада для отчёта по остаткам
 * Warehouse type for stock report
 */
export type AnalyticsWarehouseType = 'ALL' | 'CROSSDOCK' | 'FULFILLMENT';

/**
 * Теги товара для аналитики
 * Item tags for analytics
 */
export type AnalyticsItemTag = 
  | 'ITEM_ATTRIBUTE_NONE'
  | 'ECONOM'
  | 'NOVEL'
  | 'DISCOUNT'
  | 'FBS_RETURN'
  | 'SUPER';

/**
 * Статус ликвидности товара
 * Turnover grade status
 */
export type AnalyticsTurnoverGrade = 
  | 'UNSPECIFIED'
  | 'TURNOVER_GRADE_NONE'
  | 'DEFICIT'
  | 'POPULAR'
  | 'ACTUAL'
  | 'SURPLUS'
  | 'NO_SALES'
  | 'WAS_NO_SALES'
  | 'RESTRICTED_NO_SALES'
  | 'COLLECTING_DATA'
  | 'WAITING_FOR_SUPPLY'
  | 'WAS_DEFICIT'
  | 'WAS_POPULAR'
  | 'WAS_ACTUAL'
  | 'WAS_SURPLUS';

/**
 * Запрос для получения отчёта по остаткам и товарам
 * Request for stock and products report
 */
export interface AnalyticsStockOnWarehouseRequest {
  /** 
   * Количество ответов на странице (обязательный)
   * Number of responses per page (required)
   */
  limit: number;
  
  /** 
   * Количество элементов для пропуска
   * Number of elements to skip
   */
  offset?: number;
  
  /** 
   * Тип склада
   * Warehouse type
   */
  warehouse_type?: AnalyticsWarehouseType;
  
  readonly [key: string]: unknown;
}

/**
 * Запрос для получения аналитики по остаткам v1 (новый метод)
 * Request for analytics stocks v1 (new method)
 */
export interface AnalyticsStocksV1Request {
  /** 
   * Идентификаторы товаров в системе Ozon — SKU (максимум 100, обязательный)
   * Product identifiers in Ozon system - SKU (max 100, required)
   */
  skus: string[];
  
  /** 
   * Фильтр по идентификаторам кластеров
   * Filter by cluster identifiers
   */
  cluster_ids?: string[];
  
  /** 
   * Фильтр по тегам товара
   * Filter by item tags
   */
  item_tags?: AnalyticsItemTag[];
  
  /** 
   * Фильтр по статусу ликвидности товаров
   * Filter by turnover grade status
   */
  turnover_grades?: AnalyticsTurnoverGrade[];
  
  /** 
   * Фильтр по идентификаторам складов
   * Filter by warehouse identifiers
   */
  warehouse_ids?: string[];
  
  readonly [key: string]: unknown;
}