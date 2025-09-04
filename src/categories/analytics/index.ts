/**
 * Analytics API implementation
 * Manually implemented for comprehensive business analytics
 */

import { HttpClient } from "../../core/http.js";
import type { RequestOptions } from "../../core/types.js";
import type { AnalyticsTurnoverStocksRequest, AnalyticsStockOnWarehouseRequest, AnalyticsStocksV1Request } from "../../types/requests/analytics.js";
import type { AnalyticsTurnoverStocksResponse, AnalyticsStockOnWarehouseResponse, AnalyticsStocksV1Response } from "../../types/responses/analytics.js";

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
 * // РЕКОМЕНДУЕМЫЙ: Получить аналитику по остаткам (новый метод)
 * const analytics = await analyticsApi.getAnalyticsStocks({
 *   skus: ['123456789', '987654321'],
 *   item_tags: ['NOVEL', 'SUPER'],
 *   turnover_grades: ['POPULAR', 'DEFICIT']
 * });
 *
 * // УСТАРЕВШИЙ: Получить отчёт по остаткам на складах (будет отключён)
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
   * ⚠️ Ограничение: не больше 1 запроса в минуту по одному кабинету Client-Id.
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
  async getStocksTurnover(request?: AnalyticsTurnoverStocksRequest, options?: RequestOptions): Promise<AnalyticsTurnoverStocksResponse> {
    // Валидация параметров согласно API
    if (request?.limit && (request.limit < 1 || request.limit > 1000)) {
      throw new Error("Limit must be between 1 and 1000");
    }

    return this.httpClient.request<AnalyticsTurnoverStocksRequest, AnalyticsTurnoverStocksResponse>("POST", "/v1/analytics/turnover/stocks", request ?? {}, options);
  }

  /**
   * Отчёт по остаткам и товарам (версия 2) - УСТАРЕВШИЙ
   * Get stock and products report (version 2) - DEPRECATED
   *
   * Метод для получения отчёта по остаткам и товарам в перемещении по складам Ozon.
   *
   * ⚠️ DEPRECATED: В будущем метод будет отключён.
   * 🆕 РЕКОМЕНДАЦИЯ: Используйте новый метод `getAnalyticsStocks()` для получения аналитики по остаткам.
   *
   * Преимущества нового метода:
   * - Более детальная информация о товарах
   * - Фильтрация по тегам товаров и статусу ликвидности
   * - Информация по кластерам и складам
   * - Обновляется ежедневно в 07:00 UTC
   *
   * ⚠️ Отличается от отчёта в разделе "Аналитика → Отчёты → Отчёт по остаткам и товарам в пути на склады Ozon" в личном кабинете.
   *
   * @deprecated Используйте метод getAnalyticsStocks() вместо этого
   * @param request - Параметры запроса отчёта по остаткам
   * @param options - Дополнительные опции запроса
   * @returns Отчёт по остаткам и товарам
   *
   * @example
   * ```typescript
   * // УСТАРЕВШИЙ способ
   * const report = await analyticsApi.getStockOnWarehouses({
   *   limit: 100,
   *   offset: 0,
   *   warehouse_type: 'FULFILLMENT'
   * });
   *
   * // РЕКОМЕНДУЕМЫЙ способ
   * const analytics = await analyticsApi.getAnalyticsStocks({
   *   skus: ['123456789', '987654321'],
   *   warehouse_ids: ['warehouse_id']
   * });
   * ```
   */
  async getStockOnWarehouses(request: AnalyticsStockOnWarehouseRequest, options?: RequestOptions): Promise<AnalyticsStockOnWarehouseResponse> {
    // Валидация обязательного параметра limit согласно API
    if (!request.limit) {
      throw new Error('Parameter "limit" is required');
    }

    return this.httpClient.request<AnalyticsStockOnWarehouseRequest, AnalyticsStockOnWarehouseResponse>("POST", "/v2/analytics/stock_on_warehouses", request, options);
  }

  /**
   * Получить аналитику по остаткам v1 (новый рекомендуемый метод)
   * Get analytics stocks v1 (new recommended method)
   *
   * ✨ НОВЫЙ МЕТОД: Замена для устаревшего `/v2/analytics/stock_on_warehouses`.
   * Используйте этот метод для получения аналитики по остаткам товаров на складах.
   *
   * Метод соответствует разделу "FBO → Управление остатками" в личном кабинете.
   * Аналитика обновляется раз в день в 07:00 UTC.
   *
   * @param request - Параметры запроса аналитики по остаткам
   * @param options - Дополнительные опции запроса
   * @returns Аналитика по остаткам товаров
   *
   * @example
   * ```typescript
   * const analytics = await analyticsApi.getAnalyticsStocks({
   *   skus: ['123456789', '987654321'],
   *   cluster_ids: ['1234'],
   *   item_tags: ['NOVEL', 'SUPER'],
   *   turnover_grades: ['POPULAR', 'DEFICIT']
   * });
   *
   * analytics.items?.forEach(item => {
   *   console.log(`${item.name}: остаток ${item.available_stock_count}, статус ${item.turnover_grade}`);
   * });
   * ```
   */
  async getAnalyticsStocks(request: AnalyticsStocksV1Request, options?: RequestOptions): Promise<AnalyticsStocksV1Response> {
    // Валидация обязательного параметра skus согласно API
    if (!request.skus || request.skus.length === 0) {
      throw new Error('Parameter "skus" is required and must not be empty');
    }

    // Валидация максимального количества SKU
    if (request.skus.length > 100) {
      throw new Error("Maximum 100 SKU items allowed");
    }

    return this.httpClient.request<AnalyticsStocksV1Request, AnalyticsStocksV1Response>("POST", "/v1/analytics/stocks", request, options);
  }
}
