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