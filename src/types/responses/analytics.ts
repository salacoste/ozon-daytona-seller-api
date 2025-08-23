/**
 * Response types for analytics API
 * Manually implemented for type safety
 * Ready for manual editing and enhancements
 */

/**
 * Элемент ответа оборачиваемости товара
 * Stock turnover response item
 */
export interface AnalyticsTurnoverStocksResponseItem {
  /** Идентификатор товара в системе Ozon — SKU */
  sku?: number;
  /** Количество дней оборачиваемости */
  turnover_days?: number;
  /** Остаток товара */
  current_stock?: number;
  /** Дневные продажи (среднее) */
  daily_sales?: number;
}

/**
 * Ответ по оборачиваемости товаров
 * Stock turnover response
 */
export interface AnalyticsTurnoverStocksResponse {
  /** Список товаров с данными оборачиваемости */
  items?: AnalyticsTurnoverStocksResponseItem[];
  readonly [key: string]: unknown;
}

/**
 * Строка результата отчёта по остаткам
 * Stock report result row
 */
export interface AnalyticsStockOnWarehouseResponseRow {
  /** Идентификатор товара в системе Ozon — SKU */
  sku?: number;
  /** Наименование товара */
  name?: string;
  /** Остаток на складе */
  present?: number;
  /** Товар в пути */
  reserved?: number;
}

/**
 * Результат отчёта по остаткам
 * Stock report result
 */
export interface AnalyticsStockOnWarehouseResponseResult {
  /** Строки отчёта */
  rows?: AnalyticsStockOnWarehouseResponseRow[];
  /** Общее количество товаров */
  total?: number;
}

/**
 * Ответ отчёта по остаткам и товарам
 * Stock and products report response
 */
export interface AnalyticsStockOnWarehouseResponse {
  /** Результат отчёта */
  result?: AnalyticsStockOnWarehouseResponseResult;
  readonly [key: string]: unknown;
}