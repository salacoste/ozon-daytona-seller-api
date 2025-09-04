/**
 * Premium API implementation
 * Premium seller features and scoring
 */

import { HttpClient } from "../../core/http.js";
import type { RequestOptions } from "../../core/types.js";
import type { PremiumAnalyticsGetDataRequest, PremiumProductQueriesRequest, PremiumProductQueriesDetailsRequest, PremiumChatSendMessageRequest, PremiumChatStartRequest, PremiumRealizationByDayRequest, PremiumChatReadRequest, PremiumChatHistoryRequest } from "../../types/requests/premium.js";
import type {
  PremiumAnalyticsGetDataResponse,
  PremiumProductQueriesResponse,
  PremiumProductQueriesDetailsResponse,
  PremiumChatSendMessageResponse,
  PremiumChatStartResponse,
  PremiumRealizationByDayResponse,
  PremiumChatReadResponse,
  PremiumChatHistoryResponse,
} from "../../types/responses/premium.js";

/**
 * Premium API для премиальных функций продавца и скоринга
 * Premium API for premium seller features and scoring
 *
 * ⚠️ Большинство методов требуют подписку Premium или Premium Plus
 * ⚠️ Most methods require Premium or Premium Plus subscription
 *
 * @example
 * ```typescript
 * // Получить данные аналитики (Premium Plus)
 * const analyticsData = await premiumApi.getAnalyticsData({
 *   date_from: '2024-01-01',
 *   date_to: '2024-01-31',
 *   dimension: ['sku', 'day'],
 *   metrics: ['revenue', 'ordered_units'],
 *   limit: 100
 * });
 *
 * // Получить запросы товаров (Premium/Premium Plus)
 * const productQueries = await premiumApi.getProductQueries({
 *   date_from: '2024-01-01',
 *   skus: ['123456789'],
 *   page_size: 50
 * });
 *
 * // Отправить сообщение в чат (Premium Plus)
 * const messageResult = await premiumApi.sendChatMessage({
 *   chat_id: 'chat_123',
 *   text: 'Здравствуйте! Есть вопросы по заказу?'
 * });
 * ```
 */
export class PremiumApi {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Данные аналитики (Premium Plus)
   * Get analytics data (Premium Plus)
   *
   * Укажите период и метрики, которые нужно посчитать. В ответе будет аналитика,
   * сгруппированная по параметру dimensions. Для продавцов с подпиской Premium Plus
   * ограничений нет. Метод можно использовать не больше 1 раза в минуту.
   * Соответствует разделу "Аналитика → Графики" в личном кабинете.
   *
   * @param request - Параметры запроса данных аналитики
   * @param options - Дополнительные опции запроса
   * @returns Данные аналитики
   *
   * @example
   * ```typescript
   * const analytics = await premiumApi.getAnalyticsData({
   *   date_from: '2024-01-01',
   *   date_to: '2024-01-31',
   *   dimension: ['sku', 'week'],
   *   metrics: ['revenue', 'hits_view', 'conv_tocart'],
   *   limit: 500,
   *   filters: [{
   *     field: 'category1',
   *     values: ['Electronics']
   *   }]
   * });
   *
   * analytics.result?.data?.forEach(item => {
   *   console.log(`SKU: ${item.dimensions?.sku}, Выручка: ${item.metrics?.revenue}`);
   * });
   * ```
   */
  async getAnalyticsData(request: PremiumAnalyticsGetDataRequest, options?: RequestOptions): Promise<PremiumAnalyticsGetDataResponse> {
    return this.httpClient.request<PremiumAnalyticsGetDataRequest, PremiumAnalyticsGetDataResponse>("POST", "/v1/analytics/data", request, options);
  }

  /**
   * Получить информацию о запросах товаров (Premium/Premium Plus)
   * Get product queries information (Premium/Premium Plus)
   *
   * Используйте метод для получения данных о запросах ваших товаров.
   * Полная аналитика доступна с подпиской Premium или Premium Plus.
   * Метод аналогичен вкладке "Товары в поиске → Запросы моего товара" в личном кабинете.
   *
   * @param request - Параметры запроса информации о запросах товаров
   * @param options - Дополнительные опции запроса
   * @returns Информация о запросах товаров
   *
   * @example
   * ```typescript
   * const queries = await premiumApi.getProductQueries({
   *   date_from: '2024-01-01',
   *   date_to: '2024-01-31',
   *   skus: ['123456789', '987654321'],
   *   page_size: 50,
   *   sort_by: 'queries_count',
   *   sort_dir: 'DESC'
   * });
   *
   * queries.items?.forEach(item => {
   *   console.log(`SKU: ${item.sku}, Запросов: ${item.queries_count}, CTR: ${item.ctr}%`);
   * });
   * ```
   */
  async getProductQueries(request: PremiumProductQueriesRequest, options?: RequestOptions): Promise<PremiumProductQueriesResponse> {
    return this.httpClient.request<PremiumProductQueriesRequest, PremiumProductQueriesResponse>("POST", "/v1/analytics/product-queries", request, options);
  }

  /**
   * Получить детализацию запросов по товару (Premium/Premium Plus)
   * Get product query details (Premium/Premium Plus)
   *
   * Используйте метод для получения данных по запросам на конкретный товар.
   * Полная аналитика доступна с подпиской Premium или Premium Plus.
   * Метод аналогичен просмотру данных по товару на вкладке "Товары в поиске → Запросы моего товара".
   *
   * @param request - Параметры запроса детализации запросов по товару
   * @param options - Дополнительные опции запроса
   * @returns Детализация запросов по товару
   *
   * @example
   * ```typescript
   * const details = await premiumApi.getProductQueriesDetails({
   *   date_from: '2024-01-01',
   *   date_to: '2024-01-31',
   *   skus: ['123456789'],
   *   limit_by_sku: 10,
   *   page_size: 100,
   *   sort_by: 'clicks',
   *   sort_dir: 'DESC'
   * });
   *
   * details.queries?.forEach(query => {
   *   console.log(`"${query.query}": ${query.clicks} кликов, позиция ${query.position}`);
   * });
   * ```
   */
  async getProductQueriesDetails(request: PremiumProductQueriesDetailsRequest, options?: RequestOptions): Promise<PremiumProductQueriesDetailsResponse> {
    return this.httpClient.request<PremiumProductQueriesDetailsRequest, PremiumProductQueriesDetailsResponse>("POST", "/v1/analytics/product-queries/details", request, options);
  }

  /**
   * Отправить сообщение в чат (Premium Plus)
   * Send chat message (Premium Plus)
   *
   * Отправляет сообщение в существующий чат по его идентификатору.
   * Доступно для продавцов с подпиской Premium Plus.
   *
   * @param request - Параметры запроса отправки сообщения
   * @param options - Дополнительные опции запроса
   * @returns Результат отправки сообщения
   *
   * @example
   * ```typescript
   * const result = await premiumApi.sendChatMessage({
   *   chat_id: 'chat_123456',
   *   text: 'Здравствуйте! Ваш заказ готов к отправке. Есть вопросы?'
   * });
   *
   * console.log(`Результат отправки: ${result.result}`);
   * ```
   */
  async sendChatMessage(request: PremiumChatSendMessageRequest, options?: RequestOptions): Promise<PremiumChatSendMessageResponse> {
    return this.httpClient.request<PremiumChatSendMessageRequest, PremiumChatSendMessageResponse>("POST", "/v1/chat/send/message", request, options);
  }

  /**
   * Создать новый чат (Premium Plus)
   * Create new chat (Premium Plus)
   *
   * Создает новый чат с покупателем по отправлению. Например, чтобы уточнить адрес или модель товара.
   * Доступно для продавцов с подпиской Premium Plus.
   *
   * @param request - Параметры запроса создания чата
   * @param options - Дополнительные опции запроса
   * @returns Результат создания чата
   *
   * @example
   * ```typescript
   * const chat = await premiumApi.startChat({
   *   posting_number: '12345-0001-1'
   * });
   *
   * console.log(`Чат создан: ${chat.result?.chat_id}`);
   * ```
   */
  async startChat(request: PremiumChatStartRequest, options?: RequestOptions): Promise<PremiumChatStartResponse> {
    return this.httpClient.request<PremiumChatStartRequest, PremiumChatStartResponse>("POST", "/v1/chat/start", request, options);
  }

  /**
   * Отчёт о реализации товаров за день (Premium Plus)
   * Daily product realization report (Premium Plus)
   *
   * Возвращает данные о суммах реализации из отчёта о реализации товаров за день.
   * Отмены и невыкупы не включаются. Данные доступны не более чем за 32 календарных дня.
   * Доступно для продавцов с подпиской Premium Plus.
   *
   * @param request - Параметры запроса отчёта о реализации за день
   * @param options - Дополнительные опции запроса
   * @returns Отчёт о реализации за день
   *
   * @example
   * ```typescript
   * const report = await premiumApi.getRealizationByDay({
   *   day: 15,
   *   month: 1,
   *   year: 2024
   * });
   *
   * report.rows?.forEach(row => {
   *   console.log(`${row.name}: ${row.quantity} шт., ${row.amount} ${row.currency}`);
   * });
   * ```
   */
  async getRealizationByDay(request: PremiumRealizationByDayRequest, options?: RequestOptions): Promise<PremiumRealizationByDayResponse> {
    return this.httpClient.request<PremiumRealizationByDayRequest, PremiumRealizationByDayResponse>("POST", "/v1/finance/realization/by-day", request, options);
  }

  /**
   * Отметить сообщения как прочитанные (Premium Plus)
   * Mark messages as read (Premium Plus)
   *
   * Метод для отметки выбранного сообщения и сообщений до него прочитанными.
   * Доступно для продавцов с подпиской Premium Plus.
   *
   * @param request - Параметры запроса отметки сообщений как прочитанных
   * @param options - Дополнительные опции запроса
   * @returns Результат отметки сообщений
   *
   * @example
   * ```typescript
   * const result = await premiumApi.markChatAsRead({
   *   chat_id: 'chat_123456',
   *   message_id: 'msg_789012'
   * });
   *
   * console.log(`Результат: ${result.result}`);
   * ```
   */
  async markChatAsRead(request: PremiumChatReadRequest, options?: RequestOptions): Promise<PremiumChatReadResponse> {
    return this.httpClient.request<PremiumChatReadRequest, PremiumChatReadResponse>("POST", "/v2/chat/read", request, options);
  }

  /**
   * История чата (Premium Plus)
   * Chat history (Premium Plus)
   *
   * Возвращает историю сообщений чата. По умолчанию от самого нового сообщения к старым.
   * Доступно для продавцов с подпиской Premium Plus.
   *
   * @param request - Параметры запроса истории чата
   * @param options - Дополнительные опции запроса
   * @returns История чата
   *
   * @example
   * ```typescript
   * const history = await premiumApi.getChatHistory({
   *   chat_id: 'chat_123456',
   *   limit: 50
   * });
   *
   * history.messages?.forEach(message => {
   *   console.log(`${message.author}: ${message.text} (${message.created_at})`);
   * });
   * ```
   */
  async getChatHistory(request: PremiumChatHistoryRequest, options?: RequestOptions): Promise<PremiumChatHistoryResponse> {
    return this.httpClient.request<PremiumChatHistoryRequest, PremiumChatHistoryResponse>("POST", "/v3/chat/history", request, options);
  }
}
