/**
 * CancellationAPI implementation
 * Order cancellation management
 */

import { HttpClient } from "../../core/http.js";
import type { RequestOptions } from "../../core/types.js";
import type { EmptyResponse } from "../../types/common/base.js";
import type { CancellationGetListRequest, CancellationGetRequest, CancellationMoveRequest, CancellationGetListV2Request, CancellationApproveV2Request, CancellationRejectV2Request } from "../../types/requests/cancellation.js";
import type { CancellationGetListResponse, CancellationGetResponse, CancellationGetListV2Response } from "../../types/responses/cancellation.js";

/**
 * CancellationAPI для управления заявками на отмену заказов
 * CancellationAPI for order cancellation request management
 *
 * ⚠️ Методы v1 устарели и будут отключены 3 августа 2025 года
 * ⚠️ v1 methods are deprecated and will be disabled on August 3, 2025
 *
 * @example
 * ```typescript
 * // Получить список заявок на отмену (v2)
 * const cancellationList = await cancellationApi.getConditionalCancellationListV2({
 *   limit: 100,
 *   filters: {
 *     state: 'ON_APPROVAL',
 *     cancellation_initiator: ['CLIENT']
 *   },
 *   with: {
 *     counter: true
 *   }
 * });
 *
 * // Подтвердить заявку на отмену
 * await cancellationApi.approveConditionalCancellationV2({
 *   cancellation_id: 12345,
 *   comment: 'Заявка подтверждена, заказ будет отменён'
 * });
 *
 * // Отклонить заявку на отмену
 * await cancellationApi.rejectConditionalCancellationV2({
 *   cancellation_id: 12345,
 *   comment: 'Товар уже отправлен покупателю'
 * });
 * ```
 */
export class CancellationApi {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Получить список заявок на отмену rFBS (v1)
   * Get rFBS cancellation requests list (v1)
   *
   * @deprecated Метод будет отключён 3 августа 2025 года. Используйте getConditionalCancellationListV2()
   * @deprecated Method will be disabled on August 3, 2025. Use getConditionalCancellationListV2()
   *
   * Метод для получения списка заявок на отмену rFBS-заказов с возможностью фильтрации.
   *
   * @param request - Параметры запроса списка заявок на отмену
   * @param options - Дополнительные опции запроса
   * @returns Список заявок на отмену с возможными счётчиками
   *
   * @example
   * ```typescript
   * const cancellationList = await cancellationApi.getConditionalCancellationList({
   *   limit: 50,
   *   offset: 0,
   *   filters: {
   *     state: 'ON_APPROVAL',
   *     cancellation_initiator: ['CLIENT', 'SYSTEM'],
   *     posting_number: ['12345-0001-1']
   *   },
   *   with: {
   *     counters: true
   *   }
   * });
   *
   * cancellationList.result?.forEach(cancellation => {
   *   console.log(`Заявка ${cancellation.cancellation_id}: ${cancellation.posting_number}`);
   *   console.log(`Статус: ${cancellation.state?.state}, инициатор: ${cancellation.cancellation_initiator}`);
   *   console.log(`Причина: ${cancellation.cancellation_reason?.name}`);
   *   if (cancellation.auto_approve_date) {
   *     console.log(`Автоподтверждение: ${cancellation.auto_approve_date}`);
   *   }
   * });
   *
   * if (cancellationList.counters) {
   *   console.log(`На рассмотрении: ${cancellationList.counters.on_approval}`);
   *   console.log(`Подтверждено: ${cancellationList.counters.approved}`);
   *   console.log(`Отклонено: ${cancellationList.counters.rejected}`);
   * }
   * ```
   */
  async getConditionalCancellationList(request: CancellationGetListRequest, options?: RequestOptions): Promise<CancellationGetListResponse> {
    return this.httpClient.request<CancellationGetListRequest, CancellationGetListResponse>("POST", "/v1/conditional-cancellation/list", request, options);
  }

  /**
   * Получить информацию о заявке на отмену rFBS (v1)
   * Get rFBS cancellation request information (v1)
   *
   * @deprecated Метод будет отключён 3 августа 2025 года. Используйте getConditionalCancellationListV2()
   * @deprecated Method will be disabled on August 3, 2025. Use getConditionalCancellationListV2()
   *
   * Метод для получения детальной информации о конкретной заявке на отмену rFBS-заказа.
   *
   * @param request - Параметры запроса информации о заявке на отмену
   * @param options - Дополнительные опции запроса
   * @returns Информация о заявке на отмену
   *
   * @example
   * ```typescript
   * const cancellationInfo = await cancellationApi.getConditionalCancellation({
   *   cancellation_id: 12345
   * });
   *
   * if (cancellationInfo.result) {
   *   const cancellation = cancellationInfo.result;
   *   console.log(`Заявка на отмену ${cancellation.cancellation_id}:`);
   *   console.log(`Отправление: ${cancellation.posting_number}`);
   *   console.log(`Статус: ${cancellation.state?.state}`);
   *   console.log(`Инициатор: ${cancellation.cancellation_initiator}`);
   *   console.log(`Причина: ${cancellation.cancellation_reason?.name}`);
   *   console.log(`Создана: ${cancellation.cancelled_at}`);
   *
   *   if (cancellation.state?.state === 'ON_APPROVAL') {
   *     console.log(`Требует решения до: ${cancellation.auto_approve_date}`);
   *   }
   * }
   * ```
   */
  async getConditionalCancellation(request: CancellationGetRequest, options?: RequestOptions): Promise<CancellationGetResponse> {
    return this.httpClient.request<CancellationGetRequest, CancellationGetResponse>("POST", "/v1/conditional-cancellation/get", request, options);
  }

  /**
   * Подтвердить заявку на отмену rFBS (v1)
   * Approve rFBS cancellation request (v1)
   *
   * @deprecated Метод будет отключён 3 августа 2025 года. Используйте approveConditionalCancellationV2()
   * @deprecated Method will be disabled on August 3, 2025. Use approveConditionalCancellationV2()
   *
   * Метод позволяет согласовать заявку на отмену в статусе ON_APPROVAL.
   * Заказ будет отменён, а деньги вернутся покупателю.
   *
   * @param request - Параметры запроса подтверждения заявки на отмену
   * @param options - Дополнительные опции запроса
   * @returns Результат подтверждения заявки
   *
   * @example
   * ```typescript
   * await cancellationApi.approveConditionalCancellation({
   *   cancellation_id: 12345,
   *   comment: 'Заявка обоснована, подтверждаем отмену заказа'
   * });
   *
   * console.log('Заявка на отмену подтверждена. Заказ будет отменён.');
   * ```
   */
  async approveConditionalCancellation(request: CancellationMoveRequest, options?: RequestOptions): Promise<void> {
    await this.httpClient.request<CancellationMoveRequest, EmptyResponse>("POST", "/v1/conditional-cancellation/approve", request, options);
  }

  /**
   * Отклонить заявку на отмену rFBS (v1)
   * Reject rFBS cancellation request (v1)
   *
   * @deprecated Метод будет отключён 3 августа 2025 года. Используйте rejectConditionalCancellationV2()
   * @deprecated Method will be disabled on August 3, 2025. Use rejectConditionalCancellationV2()
   *
   * Метод позволяет отклонить заявку на отмену в статусе ON_APPROVAL.
   * Заказ останется в том же статусе, и его нужно будет доставить покупателю.
   *
   * @param request - Параметры запроса отклонения заявки на отмену
   * @param options - Дополнительные опции запроса
   * @returns Результат отклонения заявки
   *
   * @example
   * ```typescript
   * await cancellationApi.rejectConditionalCancellation({
   *   cancellation_id: 12345,
   *   comment: 'Товар уже отправлен и находится в пути к покупателю'
   * });
   *
   * console.log('Заявка на отмену отклонена. Заказ будет доставлен.');
   * ```
   */
  async rejectConditionalCancellation(request: CancellationMoveRequest, options?: RequestOptions): Promise<void> {
    await this.httpClient.request<CancellationMoveRequest, EmptyResponse>("POST", "/v1/conditional-cancellation/reject", request, options);
  }

  /**
   * Получить список заявок на отмену rFBS (v2)
   * Get rFBS cancellation requests list (v2)
   *
   * Актуальный метод для получения списка заявок на отмену rFBS-заказов.
   * Поддерживает cursor-based пагинацию для эффективной работы с большими объёмами данных.
   *
   * @param request - Параметры запроса списка заявок на отмену
   * @param options - Дополнительные опции запроса
   * @returns Список заявок на отмену с cursor для пагинации
   *
   * @example
   * ```typescript
   * const cancellationList = await cancellationApi.getConditionalCancellationListV2({
   *   limit: 100,
   *   filters: {
   *     state: 'ON_APPROVAL',
   *     cancellation_initiator: ['CLIENT'],
   *     posting_number: ['12345-0001-1', '12345-0001-2']
   *   },
   *   with: {
   *     counter: true
   *   }
   * });
   *
   * cancellationList.result?.forEach(cancellation => {
   *   console.log(`Заявка ${cancellation.cancellation_id}: ${cancellation.posting_number}`);
   *   console.log(`Статус: ${cancellation.state?.state}, инициатор: ${cancellation.cancellation_initiator}`);
   *   console.log(`Причина: ${cancellation.cancellation_reason?.name}`);
   *   console.log(`Создана: ${cancellation.cancelled_at}`);
   *
   *   if (cancellation.state?.state === 'ON_APPROVAL') {
   *     console.log(`Автоподтверждение: ${cancellation.auto_approve_date}`);
   *   }
   * });
   *
   * console.log(`Заявок на рассмотрении: ${cancellationList.counter}`);
   *
   * // Загрузить следующую страницу
   * if (cancellationList.last_id) {
   *   const nextPage = await cancellationApi.getConditionalCancellationListV2({
   *     limit: 100,
   *     last_id: cancellationList.last_id,
   *     filters: { state: 'ON_APPROVAL' }
   *   });
   * }
   * ```
   */
  async getConditionalCancellationListV2(request: CancellationGetListV2Request, options?: RequestOptions): Promise<CancellationGetListV2Response> {
    return this.httpClient.request<CancellationGetListV2Request, CancellationGetListV2Response>("POST", "/v2/conditional-cancellation/list", request, options);
  }

  /**
   * Подтвердить заявку на отмену rFBS (v2)
   * Approve rFBS cancellation request (v2)
   *
   * Актуальный метод для подтверждения заявки на отмену в статусе ON_APPROVAL.
   * Заказ будет отменён, а деньги вернутся покупателю.
   *
   * @param request - Параметры запроса подтверждения заявки на отмену
   * @param options - Дополнительные опции запроса
   * @returns Результат подтверждения заявки
   *
   * @example
   * ```typescript
   * await cancellationApi.approveConditionalCancellationV2({
   *   cancellation_id: 12345,
   *   comment: 'Заявка обоснована. Товар действительно повреждён при доставке.'
   * });
   *
   * console.log('Заявка на отмену подтверждена. Заказ отменён, деньги вернутся покупателю.');
   * ```
   */
  async approveConditionalCancellationV2(request: CancellationApproveV2Request, options?: RequestOptions): Promise<void> {
    await this.httpClient.request<CancellationApproveV2Request, EmptyResponse>("POST", "/v2/conditional-cancellation/approve", request, options);
  }

  /**
   * Отклонить заявку на отмену rFBS (v2)
   * Reject rFBS cancellation request (v2)
   *
   * Актуальный метод для отклонения заявки на отмену в статусе ON_APPROVAL.
   * Заказ останется в том же статусе, и его нужно будет доставить покупателю.
   *
   * @param request - Параметры запроса отклонения заявки на отмену
   * @param options - Дополнительные опции запроса
   * @returns Результат отклонения заявки
   *
   * @example
   * ```typescript
   * await cancellationApi.rejectConditionalCancellationV2({
   *   cancellation_id: 12345,
   *   comment: 'Товар уже отправлен курьером и будет доставлен в ближайшее время. Отмена невозможна.'
   * });
   *
   * console.log('Заявка на отмену отклонена. Заказ будет доставлен покупателю.');
   * ```
   */
  async rejectConditionalCancellationV2(request: CancellationRejectV2Request, options?: RequestOptions): Promise<void> {
    await this.httpClient.request<CancellationRejectV2Request, EmptyResponse>("POST", "/v2/conditional-cancellation/reject", request, options);
  }
}
