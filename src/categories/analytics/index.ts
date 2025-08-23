/**
 * Analytics API implementation
 * Manually implemented for comprehensive business analytics
 */

import { HttpClient } from '../../core/http.js';
import type { RequestOptions } from '../../core/types.js';
import type { 
  AnalyticsTurnoverStocksRequest, 
  AnalyticsStockOnWarehouseRequest 
} from '../../types/requests/analytics.js';
import type { 
  AnalyticsTurnoverStocksResponse, 
  AnalyticsStockOnWarehouseResponse 
} from '../../types/responses/analytics.js';

/**
 * Analytics API для бизнес-аналитики и отчетности данных
 * Analytics API for business analytics and data reporting
 * 
 * @example
 * ```typescript
 * // Получить оборачиваемость товаров
 * const turnover = await analyticsApi.getStocksTurnover({
 *   limit: 10,
 *   sku: ['123456789', '987654321']
 * });
 * 
 * // Получить отчёт по остаткам на складах
 * const stockReport = await analyticsApi.getStockOnWarehouses({
 *   limit: 100,
 *   warehouse_type: 'ALL'
 * });
 * ```
 */
export class AnalyticsApi {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Оборачиваемость товара
   * Get stock turnover analytics
   * 
   * Используйте метод, чтобы узнать оборачиваемость товара и количество дней, 
   * на которое хватит текущего остатка. Метод соответствует разделу 
   * "FBO -> Управление остатками" в личном кабинете.
   * 
   * @param request - Параметры запроса оборачиваемости
   * @param options - Дополнительные опции запроса
   * @returns Данные оборачиваемости товаров
   * 
   * @example
   * ```typescript
   * const result = await analyticsApi.getStocksTurnover({
   *   limit: 50,
   *   offset: 0,
   *   sku: ['123456789']
   * });
   * 
   * result.items?.forEach(item => {
   *   console.log(`SKU: ${item.sku}, Оборачиваемость: ${item.turnover_days} дней`);
   * });
   * ```
   */
  async getStocksTurnover(
    request: AnalyticsTurnoverStocksRequest,
    options?: RequestOptions
  ): Promise<AnalyticsTurnoverStocksResponse> {
    return this.httpClient.request<AnalyticsTurnoverStocksRequest, AnalyticsTurnoverStocksResponse>(
      'POST',
      '/v1/analytics/turnover/stocks',
      request,
      options
    );
  }

  /**
   * Отчёт по остаткам и товарам (версия 2)
   * Get stock and products report (version 2)
   * 
   * Метод для получения отчёта по остаткам и товарам в перемещении по складам Ozon.
   * 
   * ⚠️ В будущем метод будет отключён. Переключитесь на /v1/analytics/stocks.
   * ⚠️ Отличается от отчёта в разделе "Аналитика → Отчёты → Отчёт по остаткам и товарам в пути на склады Ozon" в личном кабинете.
   * 
   * @param request - Параметры запроса отчёта по остаткам
   * @param options - Дополнительные опции запроса
   * @returns Отчёт по остаткам и товарам
   * 
   * @example
   * ```typescript
   * const report = await analyticsApi.getStockOnWarehouses({
   *   limit: 100,
   *   offset: 0,
   *   warehouse_type: 'FULFILLMENT'
   * });
   * 
   * report.result?.rows?.forEach(row => {
   *   console.log(`${row.name}: остаток ${row.present}, в пути ${row.reserved}`);
   * });
   * ```
   */
  async getStockOnWarehouses(
    request: AnalyticsStockOnWarehouseRequest,
    options?: RequestOptions
  ): Promise<AnalyticsStockOnWarehouseResponse> {
    return this.httpClient.request<AnalyticsStockOnWarehouseRequest, AnalyticsStockOnWarehouseResponse>(
      'POST',
      '/v2/analytics/stock_on_warehouses',
      request,
      options
    );
  }
}