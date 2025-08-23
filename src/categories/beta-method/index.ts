/**
 * BetaMethod API implementation
 * Beta features and experimental APIs
 */

import { HttpClient } from '../../core/http.js';
import type { RequestOptions } from '../../core/types.js';
import type { EmptyRequest } from '../../types/common/base.js';
import type { 
  BetaMethodAverageDeliveryTimeRequest,
  BetaMethodAverageDeliveryTimeDetailsRequest,
  BetaMethodManageStocksRequest,
  BetaMethodAnalyticsStocksRequest,
  BetaMethodProductInfoWrongVolumeRequest,
  BetaMethodRemovalReportRequest
} from '../../types/requests/beta-method.js';
import type { 
  BetaMethodAverageDeliveryTimeResponse,
  BetaMethodAverageDeliveryTimeDetailsResponse,
  BetaMethodAverageDeliveryTimeSummaryResponse,
  BetaMethodManageStocksResponse,
  BetaMethodAnalyticsStocksResponse,
  BetaMethodProductInfoWrongVolumeResponse,
  BetaMethodRemovalReportResponse,
  BetaMethodRolesByTokenResponse
} from '../../types/responses/beta-method.js';

/**
 * BetaMethod API для бета-функций и экспериментальных возможностей
 * BetaMethod API for beta features and experimental functionality
 * 
 * ⚠️ Это экспериментальные методы, которые могут изменяться
 * ⚠️ These are experimental methods that may change
 * 
 * @example
 * ```typescript
 * // Получить аналитику по среднему времени доставки
 * const deliveryAnalytics = await betaMethodApi.getAverageDeliveryTime({
 *   delivery_schema: 'FBO',
 *   supply_period: {
 *     from: '2024-01-01',
 *     to: '2024-01-31'
 *   },
 *   sku: ['123456789']
 * });
 * 
 * // Получить товары с некорректными ОВХ
 * const wrongVolumeProducts = await betaMethodApi.getProductsWithWrongVolume({
 *   limit: 100
 * });
 * 
 * // Получить роли API-ключа
 * const roles = await betaMethodApi.getRolesByToken();
 * ```
 */
export class BetaMethodApi {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Получить аналитику по среднему времени доставки
   * Get average delivery time analytics
   * 
   * Метод позволяет получить аналитику по среднему времени доставки товара до покупателя.
   * Соответствует разделу "Аналитика → География продаж → Среднее время доставки" в личном кабинете.
   * 
   * @param request - Параметры запроса аналитики времени доставки
   * @param options - Дополнительные опции запроса
   * @returns Аналитика по среднему времени доставки
   * 
   * @example
   * ```typescript
   * const analytics = await betaMethodApi.getAverageDeliveryTime({
   *   delivery_schema: 'FBO',
   *   supply_period: {
   *     from: '2024-01-01',
   *     to: '2024-01-31'
   *   },
   *   sku: ['123456789', '987654321']
   * });
   * 
   * analytics.data?.forEach(cluster => {
   *   console.log(`Кластер ${cluster.cluster_name}: ${cluster.average_delivery_time} дней`);
   *   console.log(`Заказов: ${cluster.orders_count} (${cluster.orders_share}%)`);
   * });
   * 
   * console.log(`Общее среднее время: ${analytics.total?.average_delivery_time} дней`);
   * ```
   */
  async getAverageDeliveryTime(
    request: BetaMethodAverageDeliveryTimeRequest,
    options?: RequestOptions
  ): Promise<BetaMethodAverageDeliveryTimeResponse> {
    return this.httpClient.request<BetaMethodAverageDeliveryTimeRequest, BetaMethodAverageDeliveryTimeResponse>(
      'POST',
      '/v1/analytics/average-delivery-time',
      request,
      options
    );
  }

  /**
   * Получить детальную аналитику по среднему времени доставки
   * Get detailed average delivery time analytics
   * 
   * Метод является аналогом вкладки "Аналитика → География продаж → Среднее время доставки"
   * в личном кабинете продавца с детализацией по товарам и регионам.
   * 
   * @param request - Параметры запроса детальной аналитики времени доставки
   * @param options - Дополнительные опции запроса
   * @returns Детальная аналитика по среднему времени доставки
   * 
   * @example
   * ```typescript
   * const details = await betaMethodApi.getAverageDeliveryTimeDetails({
   *   cluster_id: 123,
   *   limit: 100,
   *   offset: 0,
   *   filters: {
   *     sku: ['123456789'],
   *     regions: ['Москва', 'Санкт-Петербург']
   *   }
   * });
   * 
   * details.data?.forEach(item => {
   *   console.log(`Товар: ${item.product_name} (SKU: ${item.sku})`);
   *   console.log(`Время доставки: ${item.average_delivery_time} дней`);
   *   console.log(`Регион: ${item.region}, заказов: ${item.orders_count}`);
   * });
   * ```
   */
  async getAverageDeliveryTimeDetails(
    request: BetaMethodAverageDeliveryTimeDetailsRequest,
    options?: RequestOptions
  ): Promise<BetaMethodAverageDeliveryTimeDetailsResponse> {
    return this.httpClient.request<BetaMethodAverageDeliveryTimeDetailsRequest, BetaMethodAverageDeliveryTimeDetailsResponse>(
      'POST',
      '/v1/analytics/average-delivery-time/details',
      request,
      options
    );
  }

  /**
   * Получить общую аналитику по среднему времени доставки
   * Get delivery time summary analytics
   * 
   * Метод позволяет получить общую аналитику по среднему времени доставки товара до покупателя
   * с рекомендациями и информацией о переплатах.
   * 
   * @param options - Дополнительные опции запроса
   * @returns Общая аналитика по среднему времени доставки
   * 
   * @example
   * ```typescript
   * const summary = await betaMethodApi.getAverageDeliveryTimeSummary();
   * 
   * console.log(`Текущее среднее время доставки: ${summary.average_delivery_time} дней`);
   * console.log(`Рекомендуемое время: ${summary.perfect_delivery_time} дней`);
   * console.log(`Переплата за логистику: ${summary.lost_profit} руб.`);
   * console.log(`Текущий тариф: ${summary.current_tariff?.name} (${summary.current_tariff?.cost} руб.)`);
   * ```
   */
  async getAverageDeliveryTimeSummary(
    options?: RequestOptions
  ): Promise<BetaMethodAverageDeliveryTimeSummaryResponse> {
    return this.httpClient.request<EmptyRequest, BetaMethodAverageDeliveryTimeSummaryResponse>(
      'POST',
      '/v1/analytics/average-delivery-time/summary',
      undefined,
      options
    );
  }

  /**
   * Управление остатками (устаревший)
   * Stock management (deprecated)
   * 
   * Используйте метод для получения информации об остатках товаров на складах FBO.
   * 
   * @deprecated В будущем метод будет отключён. Переключитесь на getAnalyticsStocks()
   * @param request - Параметры запроса управления остатками
   * @param options - Дополнительные опции запроса
   * @returns Информация об остатках товаров
   * 
   * @example
   * ```typescript
   * const stocks = await betaMethodApi.getManageStocks({
   *   filter: {
   *     sku: ['123456789', '987654321'],
   *     status: ['ACTIVE']
   *   },
   *   limit: 100,
   *   offset: 0
   * });
   * 
   * stocks.items?.forEach(item => {
   *   console.log(`${item.product_name}: ${item.available_for_sale} доступно`);
   *   console.log(`На складе: ${item.warehouse_stock}, зарезервировано: ${item.reserved_quantity}`);
   * });
   * ```
   */
  async getManageStocks(
    request: BetaMethodManageStocksRequest,
    options?: RequestOptions
  ): Promise<BetaMethodManageStocksResponse> {
    return this.httpClient.request<BetaMethodManageStocksRequest, BetaMethodManageStocksResponse>(
      'POST',
      '/v1/analytics/manage/stocks',
      request,
      options
    );
  }

  /**
   * Получить аналитику по остаткам
   * Get stock analytics
   * 
   * Используйте метод для получения аналитики по остаткам товаров на складах.
   * Метод соответствует разделу "FBO → Управление остатками" в личном кабинете.
   * Аналитика обновляется раз в день в 07:00 UTC.
   * 
   * @param request - Параметры запроса аналитики остатков
   * @param options - Дополнительные опции запроса
   * @returns Аналитика по остаткам товаров
   * 
   * @example
   * ```typescript
   * const analytics = await betaMethodApi.getAnalyticsStocks({
   *   skus: ['123456789', '987654321'],
   *   turnover_grades: ['DEFICIT', 'POPULAR'],
   *   item_tags: ['NOVEL', 'SUPER'],
   *   warehouse_ids: ['12345', '67890']
   * });
   * 
   * analytics.items?.forEach(item => {
   *   console.log(`${item.product_name} (SKU: ${item.sku})`);
   *   console.log(`Остаток: ${item.warehouse_stock}, статус: ${item.turnover_grade}`);
   *   console.log(`Прогноз продаж: ${item.sales_forecast}, тег: ${item.item_tag}`);
   * });
   * ```
   */
  async getAnalyticsStocks(
    request: BetaMethodAnalyticsStocksRequest,
    options?: RequestOptions
  ): Promise<BetaMethodAnalyticsStocksResponse> {
    return this.httpClient.request<BetaMethodAnalyticsStocksRequest, BetaMethodAnalyticsStocksResponse>(
      'POST',
      '/v1/analytics/stocks',
      request,
      options
    );
  }

  /**
   * Список товаров с некорректными ОВХ
   * Get products with wrong volume characteristics
   * 
   * Возвращает список товаров с некорректными объёмно-весовыми характеристиками (ОВХ).
   * Если вы указали размеры правильно, обратитесь в поддержку Ozon.
   * 
   * @param request - Параметры запроса товаров с некорректными ОВХ
   * @param options - Дополнительные опции запроса
   * @returns Список товаров с некорректными ОВХ
   * 
   * @example
   * ```typescript
   * const wrongVolumeProducts = await betaMethodApi.getProductsWithWrongVolume({
   *   limit: 50
   * });
   * 
   * wrongVolumeProducts.products?.forEach(product => {
   *   console.log(`Товар: ${product.product_name} (SKU: ${product.sku})`);
   *   console.log(`Текущие размеры: ${product.current_volume?.length}x${product.current_volume?.width}x${product.current_volume?.height} см`);
   *   console.log(`Рекомендуемые размеры: ${product.recommended_volume?.length}x${product.recommended_volume?.width}x${product.recommended_volume?.height} см`);
   *   console.log(`Текущий вес: ${product.current_volume?.weight}г, рекомендуемый: ${product.recommended_volume?.weight}г`);
   * });
   * 
   * // Загрузить следующую страницу
   * if (wrongVolumeProducts.cursor) {
   *   const nextPage = await betaMethodApi.getProductsWithWrongVolume({
   *     cursor: wrongVolumeProducts.cursor,
   *     limit: 50
   *   });
   * }
   * ```
   */
  async getProductsWithWrongVolume(
    request: BetaMethodProductInfoWrongVolumeRequest,
    options?: RequestOptions
  ): Promise<BetaMethodProductInfoWrongVolumeResponse> {
    return this.httpClient.request<BetaMethodProductInfoWrongVolumeRequest, BetaMethodProductInfoWrongVolumeResponse>(
      'POST',
      '/v1/product/info/wrong-volume',
      request,
      options
    );
  }

  /**
   * Отчёт по вывозу и утилизации со склада FBO
   * FBO stock removal and disposal report
   * 
   * Метод соответствует разделу "FBO → Вывоз и утилизация" в личном кабинете.
   * 
   * @param request - Параметры запроса отчёта по вывозу и утилизации
   * @param options - Дополнительные опции запроса
   * @returns Отчёт по вывозу и утилизации со склада
   * 
   * @example
   * ```typescript
   * const removalReport = await betaMethodApi.getRemovalFromStockReport({
   *   date_from: '2024-01-01',
   *   date_to: '2024-01-31',
   *   limit: 100
   * });
   * 
   * removalReport.returns_summary_report_rows?.forEach(row => {
   *   console.log(`${row.product_name}: ${row.quantity} шт.`);
   *   console.log(`Операция: ${row.operation_type}, дата: ${row.operation_date}`);
   *   console.log(`Стоимость: ${row.operation_cost} руб., статус: ${row.status}`);
   * });
   * ```
   */
  async getRemovalFromStockReport(
    request: BetaMethodRemovalReportRequest,
    options?: RequestOptions
  ): Promise<BetaMethodRemovalReportResponse> {
    return this.httpClient.request<BetaMethodRemovalReportRequest, BetaMethodRemovalReportResponse>(
      'POST',
      '/v1/removal/from-stock/list',
      request,
      options
    );
  }

  /**
   * Отчёт по вывозу и утилизации с поставки FBO
   * FBO supply removal and disposal report
   * 
   * Метод соответствует разделу "FBO → Вывоз и утилизация" в личном кабинете.
   * 
   * @param request - Параметры запроса отчёта по вывозу и утилизации
   * @param options - Дополнительные опции запроса
   * @returns Отчёт по вывозу и утилизации с поставки
   * 
   * @example
   * ```typescript
   * const supplyRemovalReport = await betaMethodApi.getRemovalFromSupplyReport({
   *   date_from: '2024-01-01',
   *   date_to: '2024-01-31',
   *   limit: 100
   * });
   * 
   * supplyRemovalReport.returns_summary_report_rows?.forEach(row => {
   *   console.log(`${row.product_name}: ${row.quantity} шт.`);
   *   console.log(`Операция: ${row.operation_type}, дата: ${row.operation_date}`);
   *   console.log(`Стоимость: ${row.operation_cost} руб., статус: ${row.status}`);
   * });
   * ```
   */
  async getRemovalFromSupplyReport(
    request: BetaMethodRemovalReportRequest,
    options?: RequestOptions
  ): Promise<BetaMethodRemovalReportResponse> {
    return this.httpClient.request<BetaMethodRemovalReportRequest, BetaMethodRemovalReportResponse>(
      'POST',
      '/v1/removal/from-supply/list',
      request,
      options
    );
  }

  /**
   * Получить список ролей и методов по API-ключу
   * Get roles and methods list by API key
   * 
   * Метод для получения информации о ролях и методах, привязанных к API-ключу.
   * 
   * @param options - Дополнительные опции запроса
   * @returns Список ролей и методов API-ключа
   * 
   * @example
   * ```typescript
   * const roles = await betaMethodApi.getRolesByToken();
   * 
   * roles.roles?.forEach(role => {
   *   console.log(`Роль: ${role.name}`);
   *   console.log(`Описание: ${role.description}`);
   *   console.log(`Доступные методы: ${role.methods?.join(', ')}`);
   * });
   * ```
   */
  async getRolesByToken(
    options?: RequestOptions
  ): Promise<BetaMethodRolesByTokenResponse> {
    return this.httpClient.request<Record<string, never>, BetaMethodRolesByTokenResponse>(
      'POST',
      '/v1/roles',
      {},
      options
    );
  }
}