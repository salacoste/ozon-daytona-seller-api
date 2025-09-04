/**
 * Promos API implementation
 * Promotional campaigns and discount management
 */

import { HttpClient } from "../../core/http.js";
import type { RequestOptions } from "../../core/types.js";
import type { EmptyRequest } from "../../types/common/base.js";
import type { PromosGetProductsRequest, PromosGetDiscountTasksRequest, PromosApproveDiscountTasksRequest, PromosDeclineDiscountTasksRequest, PromosActivateProductsRequest, PromosDeactivateProductsRequest } from "../../types/requests/promos.js";
import type { PromosGetActionsResponse, PromosGetProductsResponse, PromosGetDiscountTasksResponse, PromosProcessDiscountTasksResponse, PromosActivateProductsResponse, PromosDeactivateProductsResponse } from "../../types/responses/promos.js";

/**
 * Promos API для управления акциями и скидками
 * Promos API for promotional campaigns and discount management
 *
 * @example
 * ```typescript
 * // Получить список доступных акций
 * const actions = await promosApi.getActions();
 *
 * // Получить товары-кандидаты для акции
 * const candidates = await promosApi.getCandidates({
 *   action_id: 12345,
 *   limit: 100
 * });
 *
 * // Добавить товары в акцию
 * const activation = await promosApi.activateProducts({
 *   action_id: 12345,
 *   products: [{
 *     product_id: 67890,
 *     action_price: '999',
 *     stock: 50
 *   }]
 * });
 * ```
 */
export class PromosApi {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Список акций
   * Get promotions list
   *
   * Метод для получения списка акций Ozon, в которых можно участвовать.
   *
   * @param options - Дополнительные опции запроса
   * @returns Список доступных акций
   *
   * @example
   * ```typescript
   * const actions = await promosApi.getActions();
   *
   * actions.result?.forEach(action => {
   *   console.log(`Акция: ${action.title}`);
   *   console.log(`Период: ${action.date_start} - ${action.date_end}`);
   *   console.log(`Статус: ${action.status}`);
   *   console.log(`Можно участвовать: ${action.is_participating_available ? 'Да' : 'Нет'}`);
   * });
   * ```
   */
  async getActions(options?: RequestOptions): Promise<PromosGetActionsResponse> {
    return this.httpClient.request<EmptyRequest, PromosGetActionsResponse>("GET", "/v1/actions", undefined, options);
  }

  /**
   * Список доступных для акции товаров
   * Get promotion candidates list
   *
   * Метод для получения списка товаров, которые могут участвовать в акции, по её идентификатору.
   *
   * @param request - Параметры запроса списка товаров-кандидатов
   * @param options - Дополнительные опции запроса
   * @returns Список товаров-кандидатов для акции
   *
   * @example
   * ```typescript
   * const candidates = await promosApi.getCandidates({
   *   action_id: 12345,
   *   limit: 50,
   *   last_id: 0
   * });
   *
   * candidates.result?.products?.forEach(product => {
   *   console.log(`Товар: ${product.name} (ID: ${product.product_id})`);
   *   console.log(`Цена: ${product.price}, может участвовать: ${product.is_available}`);
   * });
   * ```
   */
  async getCandidates(request: PromosGetProductsRequest, options?: RequestOptions): Promise<PromosGetProductsResponse> {
    return this.httpClient.request<PromosGetProductsRequest, PromosGetProductsResponse>("POST", "/v1/actions/candidates", request, options);
  }

  /**
   * Список участвующих в акции товаров
   * Get participating products list
   *
   * Метод для получения списка товаров, участвующих в акции, по её идентификатору.
   *
   * @param request - Параметры запроса списка участвующих товаров
   * @param options - Дополнительные опции запроса
   * @returns Список товаров, участвующих в акции
   *
   * @example
   * ```typescript
   * const participants = await promosApi.getParticipatingProducts({
   *   action_id: 12345,
   *   limit: 100
   * });
   *
   * participants.result?.products?.forEach(product => {
   *   console.log(`Участвует: ${product.name} (ID: ${product.product_id})`);
   *   console.log(`Цена в акции: ${product.action_price}, остаток: ${product.stock}`);
   * });
   * ```
   */
  async getParticipatingProducts(request: PromosGetProductsRequest, options?: RequestOptions): Promise<PromosGetProductsResponse> {
    return this.httpClient.request<PromosGetProductsRequest, PromosGetProductsResponse>("POST", "/v1/actions/products", request, options);
  }

  /**
   * Список заявок на скидку
   * Get discount tasks list
   *
   * Метод для получения списка товаров, которые покупатели хотят купить со скидкой.
   *
   * @param request - Параметры запроса списка заявок на скидку
   * @param options - Дополнительные опции запроса
   * @returns Список заявок на скидку
   *
   * @example
   * ```typescript
   * const tasks = await promosApi.getDiscountTasks({
   *   status: 'NEW',
   *   limit: 50,
   *   page: 1
   * });
   *
   * tasks.result?.forEach(task => {
   *   console.log(`Заявка: ${task.product_name}`);
   *   console.log(`Текущая цена: ${task.current_price}, желаемая: ${task.desired_price}`);
   *   console.log(`Скидка: ${task.discount_percentage}%`);
   * });
   * ```
   */
  async getDiscountTasks(request: PromosGetDiscountTasksRequest, options?: RequestOptions): Promise<PromosGetDiscountTasksResponse> {
    return this.httpClient.request<PromosGetDiscountTasksRequest, PromosGetDiscountTasksResponse>("POST", "/v1/actions/discounts-task/list", request, options);
  }

  /**
   * Согласовать заявку на скидку
   * Approve discount tasks
   *
   * Вы можете согласовывать заявки в статусах: NEW — новые, SEEN — просмотренные.
   *
   * @param request - Параметры запроса согласования заявок на скидку
   * @param options - Дополнительные опции запроса
   * @returns Результат согласования заявок
   *
   * @example
   * ```typescript
   * const approvalResult = await promosApi.approveDiscountTasks({
   *   tasks: [{
   *     task_id: 'task_123',
   *     product_id: 67890,
   *     discount_percentage: 15
   *   }]
   * });
   *
   * console.log(`Обработано заявок: ${approvalResult.result?.processed_count}`);
   * if (approvalResult.result?.errors?.length) {
   *   console.log(`Ошибки: ${approvalResult.result.errors.join(', ')}`);
   * }
   * ```
   */
  async approveDiscountTasks(request: PromosApproveDiscountTasksRequest, options?: RequestOptions): Promise<PromosProcessDiscountTasksResponse> {
    return this.httpClient.request<PromosApproveDiscountTasksRequest, PromosProcessDiscountTasksResponse>("POST", "/v1/actions/discounts-task/approve", request, options);
  }

  /**
   * Отклонить заявку на скидку
   * Decline discount tasks
   *
   * Вы можете отклонить заявки в статусах: NEW — новые, SEEN — просмотренные.
   *
   * @param request - Параметры запроса отклонения заявок на скидку
   * @param options - Дополнительные опции запроса
   * @returns Результат отклонения заявок
   *
   * @example
   * ```typescript
   * const declineResult = await promosApi.declineDiscountTasks({
   *   tasks: [{
   *     task_id: 'task_456',
   *     product_id: 67890,
   *     decline_reason: 'Слишком большая скидка'
   *   }]
   * });
   *
   * console.log(`Отклонено заявок: ${declineResult.result?.processed_count}`);
   * ```
   */
  async declineDiscountTasks(request: PromosDeclineDiscountTasksRequest, options?: RequestOptions): Promise<PromosProcessDiscountTasksResponse> {
    return this.httpClient.request<PromosDeclineDiscountTasksRequest, PromosProcessDiscountTasksResponse>("POST", "/v1/actions/discounts-task/decline", request, options);
  }

  /**
   * Добавить товар в акцию
   * Add products to promotion
   *
   * Метод для добавления товаров в доступную акцию.
   *
   * @param request - Параметры запроса добавления товаров в акцию
   * @param options - Дополнительные опции запроса
   * @returns Результат добавления товаров в акцию
   *
   * @example
   * ```typescript
   * const activationResult = await promosApi.activateProducts({
   *   action_id: 12345,
   *   products: [{
   *     product_id: 67890,
   *     action_price: '999',
   *     stock: 100
   *   }, {
   *     product_id: 11111,
   *     action_price: '599',
   *     stock: 50
   *   }]
   * });
   *
   * activationResult.result?.results?.forEach(result => {
   *   if (result.is_updated) {
   *     console.log(`Товар ${result.product_id} успешно добавлен в акцию`);
   *   } else {
   *     console.log(`Ошибки для товара ${result.product_id}: ${result.errors?.join(', ')}`);
   *   }
   * });
   * ```
   */
  async activateProducts(request: PromosActivateProductsRequest, options?: RequestOptions): Promise<PromosActivateProductsResponse> {
    return this.httpClient.request<PromosActivateProductsRequest, PromosActivateProductsResponse>("POST", "/v1/actions/products/activate", request, options);
  }

  /**
   * Удалить товары из акции
   * Remove products from promotion
   *
   * Метод для удаления товаров из акции.
   *
   * @param request - Параметры запроса удаления товаров из акции
   * @param options - Дополнительные опции запроса
   * @returns Результат удаления товаров из акции
   *
   * @example
   * ```typescript
   * const deactivationResult = await promosApi.deactivateProducts({
   *   action_id: 12345,
   *   product_ids: [67890, 11111, 22222]
   * });
   *
   * deactivationResult.result?.results?.forEach(result => {
   *   if (result.is_updated) {
   *     console.log(`Товар ${result.product_id} успешно удалён из акции`);
   *   } else {
   *     console.log(`Ошибки для товара ${result.product_id}: ${result.errors?.join(', ')}`);
   *   }
   * });
   * ```
   */
  async deactivateProducts(request: PromosDeactivateProductsRequest, options?: RequestOptions): Promise<PromosDeactivateProductsResponse> {
    return this.httpClient.request<PromosDeactivateProductsRequest, PromosDeactivateProductsResponse>("POST", "/v1/actions/products/deactivate", request, options);
  }
}
