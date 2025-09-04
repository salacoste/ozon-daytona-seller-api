/**
 * Response types for analytics API
 * Manually implemented for type safety
 * Ready for manual editing and enhancements
 */

import type { AnalyticsItemTag, AnalyticsTurnoverGrade } from "../requests/analytics.js";

/**
 * Элемент ответа оборачиваемости товара
 * Stock turnover response item
 */
export interface AnalyticsTurnoverStocksResponseItem {
  /** Идентификатор товара в системе Ozon — SKU */
  sku?: string;
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
  sku?: string;
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

/**
 * Элемент ответа аналитики по остаткам v1 (новый метод)
 * Analytics stocks v1 response item (new method)
 */
export interface AnalyticsStocksV1ResponseItem {
  /** Идентификатор товара в системе Ozon — SKU */
  sku?: string;
  /** Идентификатор товара в системе продавца — артикул */
  offer_id?: string;
  /** Название товара */
  name?: string;
  /** Идентификатор кластера */
  cluster_id?: string;
  /** Название кластера */
  cluster_name?: string;
  /** Идентификатор склада */
  warehouse_id?: string;
  /** Название склада */
  warehouse_name?: string;
  /** Теги товара */
  item_tags?: AnalyticsItemTag[];
  /** Статус ликвидности товара по всем кластерам */
  turnover_grade?: AnalyticsTurnoverGrade;
  /** Статус ликвидности товара в кластере */
  turnover_grade_cluster?: AnalyticsTurnoverGrade;
  /** Среднесуточное количество проданных единиц товара за последние 28 дней по всем кластерам */
  ads?: number;
  /** Среднесуточное количество проданных единиц товара за последние 28 дней в кластере */
  ads_cluster?: number;
  /** Количество дней, на которое хватит остатка товара с учётом среднесуточных продаж за 28 дней по всем кластерам */
  idc?: number;
  /** Количество дней, на которое хватит остатка товара с учётом среднесуточных продаж за 28 дней в кластере */
  idc_cluster?: number;
  /** Количество дней без продаж по всем кластерам */
  days_without_sales?: number;
  /** Количество дней без продаж в кластере */
  days_without_sales_cluster?: number;
  /** Количество единиц товара, доступное к продаже */
  available_stock_count?: number;
  /** Количество единиц товара в поставках в пути */
  transit_stock_count?: number;
  /** Количество единиц товара в заявках на поставку */
  requested_stock_count?: number;
  /** Количество единиц товара без брака и с достаточным сроком годности, которое скоро разместим на складе */
  valid_stock_count?: number;
  /** Количество маркируемых товаров, которые ожидают ваших действий */
  waiting_docs_stock_count?: number;
  /** Количество единиц товара, проходящих проверку */
  other_stock_count?: number;
  /** Количество единиц товара в процессе возврата от покупателей */
  return_from_customer_stock_count?: number;
  /** Количество единиц товара, готовящихся к вывозу по вашей заявке */
  return_to_seller_stock_count?: number;
  /** Количество брака, доступное к вывозу со стока */
  stock_defect_stock_count?: number;
  /** Количество брака, доступное к вывозу с поставки */
  transit_defect_stock_count?: number;
  /** Количество излишков с поставки, которые доступны к вывозу */
  excess_stock_count?: number;
  /** Количество единиц товара с истекающим сроком годности */
  expiring_stock_count?: number;
}

/**
 * Ответ аналитики по остаткам v1 (новый метод)
 * Analytics stocks v1 response (new method)
 */
export interface AnalyticsStocksV1Response {
  /** Информация о товарах */
  items?: AnalyticsStocksV1ResponseItem[];
  readonly [key: string]: unknown;
}
