/**
 * Pass API implementation
 * Arrival pass and warehouse access management
 */

import { HttpClient } from "../../core/http.js";
import type { RequestOptions } from "../../core/types.js";
import type { EmptyResponse } from "../../types/common/base.js";
import type { PassCreateCarriagePassRequest, PassDeleteCarriagePassRequest, PassUpdateCarriagePassRequest, PassListRequest, PassCreateReturnPassRequest, PassDeleteReturnPassRequest, PassUpdateReturnPassRequest } from "../../types/requests/pass.js";
import type { PassCreateCarriagePassResponse, PassListResponse, PassCreateReturnPassResponse } from "../../types/responses/pass.js";

/**
 * Pass API для управления пропусками прибытия и доступом к складу
 * Pass API for arrival pass and warehouse access management
 *
 * @example
 * ```typescript
 * // Создать пропуск для перевозки
 * const carriagePass = await passApi.createCarriagePass({
 *   carriage_id: 12345,
 *   arrival_passes: [{
 *     vehicle_number: 'А123БВ777',
 *     driver_name: 'Иванов Иван Иванович',
 *     driver_license: '12 34 567890',
 *     arrival_date: '2024-01-15T09:00:00Z',
 *     comment: 'Доставка товаров'
 *   }]
 * });
 *
 * // Получить список пропусков
 * const passList = await passApi.getPassList({
 *   limit: 100,
 *   filter: {
 *     arrival_reason: 'FBS_DELIVERY',
 *     only_active_passes: true,
 *     warehouse_ids: ['12345']
 *   }
 * });
 *
 * // Создать пропуск для возврата
 * const returnPass = await passApi.createReturnPass({
 *   arrival_passes: [{
 *     vehicle_number: 'В456ГД888',
 *     driver_name: 'Петров Петр Петрович',
 *     posting_number: '12345-0001-1'
 *   }]
 * });
 * ```
 */
export class PassApi {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Создать пропуск для перевозки
   * Create carriage pass
   *
   * Идентификатор созданного пропуска добавится к перевозке.
   *
   * @param request - Параметры запроса создания пропуска для перевозки
   * @param options - Дополнительные опции запроса
   * @returns Идентификаторы созданных пропусков
   *
   * @example
   * ```typescript
   * const result = await passApi.createCarriagePass({
   *   carriage_id: 12345,
   *   arrival_passes: [{
   *     vehicle_number: 'А123БВ777',
   *     driver_name: 'Иванов Иван Иванович',
   *     driver_license: '12 34 567890',
   *     arrival_date: '2024-01-15T09:00:00Z',
   *     comment: 'Плановая поставка товаров'
   *   }, {
   *     vehicle_number: 'Б456ГД888',
   *     driver_name: 'Петров Петр Петрович',
   *     driver_license: '98 76 543210',
   *     arrival_date: '2024-01-15T14:00:00Z',
   *     comment: 'Дополнительная поставка'
   *   }]
   * });
   *
   * console.log(`Создано пропусков: ${result.arrival_pass_ids?.length}`);
   * result.arrival_pass_ids?.forEach(id => {
   *   console.log(`Пропуск ID: ${id}`);
   * });
   * ```
   */
  async createCarriagePass(request: PassCreateCarriagePassRequest, options?: RequestOptions): Promise<PassCreateCarriagePassResponse> {
    return this.httpClient.request<PassCreateCarriagePassRequest, PassCreateCarriagePassResponse>("POST", "/v1/carriage/pass/create", request, options);
  }

  /**
   * Удалить пропуск для перевозки
   * Delete carriage pass
   *
   * Удаляет указанные пропуски для перевозки.
   *
   * @param request - Параметры запроса удаления пропуска для перевозки
   * @param options - Дополнительные опции запроса
   * @returns Результат удаления пропуска
   *
   * @example
   * ```typescript
   * await passApi.deleteCarriagePass({
   *   carriage_id: 12345,
   *   arrival_pass_ids: ['67890', '54321']
   * });
   *
   * console.log('Пропуски успешно удалены');
   * ```
   */
  async deleteCarriagePass(request: PassDeleteCarriagePassRequest, options?: RequestOptions): Promise<void> {
    await this.httpClient.request<PassDeleteCarriagePassRequest, EmptyResponse>("POST", "/v1/carriage/pass/delete", request, options);
  }

  /**
   * Обновить пропуск для перевозки
   * Update carriage pass
   *
   * Обновляет информацию о пропусках для перевозки.
   *
   * @param request - Параметры запроса обновления пропуска для перевозки
   * @param options - Дополнительные опции запроса
   * @returns Результат обновления пропуска
   *
   * @example
   * ```typescript
   * await passApi.updateCarriagePass({
   *   carriage_id: 12345,
   *   arrival_passes: [{
   *     arrival_pass_id: '67890',
   *     vehicle_number: 'В789ДЕ999',
   *     driver_name: 'Сидоров Сидор Сидорович',
   *     driver_license: '11 22 334455',
   *     arrival_date: '2024-01-16T10:00:00Z',
   *     comment: 'Изменено время прибытия'
   *   }]
   * });
   *
   * console.log('Пропуск успешно обновлён');
   * ```
   */
  async updateCarriagePass(request: PassUpdateCarriagePassRequest, options?: RequestOptions): Promise<void> {
    await this.httpClient.request<PassUpdateCarriagePassRequest, EmptyResponse>("POST", "/v1/carriage/pass/update", request, options);
  }

  /**
   * Список пропусков
   * Get pass list
   *
   * Возвращает список пропусков с возможностью фильтрации.
   *
   * @param request - Параметры запроса списка пропусков
   * @param options - Дополнительные опции запроса
   * @returns Список пропусков
   *
   * @example
   * ```typescript
   * const passList = await passApi.getPassList({
   *   limit: 50,
   *   filter: {
   *     carriage_id: 12345,
   *     status: 'ACTIVE',
   *     date_from: '2024-01-01',
   *     date_to: '2024-01-31'
   *   }
   * });
   *
   * passList.arrival_passes?.forEach(pass => {
   *   console.log(`Пропуск ${pass.arrival_pass_id}:`);
   *   console.log(`  Автомобиль: ${pass.vehicle_number}`);
   *   console.log(`  Водитель: ${pass.driver_name}`);
   *   console.log(`  Прибытие: ${pass.arrival_date}`);
   *   console.log(`  Статус: ${pass.status}`);
   *   if (pass.comment) {
   *     console.log(`  Комментарий: ${pass.comment}`);
   *   }
   * });
   *
   * // Загрузить следующую страницу
   * if (passList.cursor) {
   *   const nextPage = await passApi.getPassList({
   *     limit: 50,
   *     cursor: passList.cursor,
   *     filter: { carriage_id: 12345 }
   *   });
   * }
   * ```
   */
  async getPassList(request: PassListRequest, options?: RequestOptions): Promise<PassListResponse> {
    return this.httpClient.request<PassListRequest, PassListResponse>("POST", "/v1/pass/list", request, options);
  }

  /**
   * Создать пропуск для возврата
   * Create return pass
   *
   * Создает пропуск для возврата товаров.
   *
   * @param request - Параметры запроса создания пропуска для возврата
   * @param options - Дополнительные опции запроса
   * @returns Идентификаторы созданных пропусков возврата
   *
   * @example
   * ```typescript
   * const returnPassResult = await passApi.createReturnPass({
   *   arrival_passes: [{
   *     vehicle_number: 'С123ЖЗ111',
   *     driver_name: 'Федоров Федор Федорович',
   *     driver_license: '55 66 778899',
   *     arrival_date: '2024-01-20T11:00:00Z',
   *     posting_number: '12345-0001-1',
   *     comment: 'Возврат бракованных товаров'
   *   }]
   * });
   *
   * console.log(`Создано пропусков возврата: ${returnPassResult.arrival_pass_ids?.length}`);
   * returnPassResult.arrival_pass_ids?.forEach(id => {
   *   console.log(`Пропуск возврата ID: ${id}`);
   * });
   * ```
   */
  async createReturnPass(request: PassCreateReturnPassRequest, options?: RequestOptions): Promise<PassCreateReturnPassResponse> {
    return this.httpClient.request<PassCreateReturnPassRequest, PassCreateReturnPassResponse>("POST", "/v1/return/pass/create", request, options);
  }

  /**
   * Удалить пропуск для возврата
   * Delete return pass
   *
   * Удаляет указанные пропуски для возврата.
   *
   * @param request - Параметры запроса удаления пропуска для возврата
   * @param options - Дополнительные опции запроса
   * @returns Результат удаления пропуска возврата
   *
   * @example
   * ```typescript
   * await passApi.deleteReturnPass({
   *   arrival_pass_ids: ['11111', '22222']
   * });
   *
   * console.log('Пропуски возврата успешно удалены');
   * ```
   */
  async deleteReturnPass(request: PassDeleteReturnPassRequest, options?: RequestOptions): Promise<void> {
    await this.httpClient.request<PassDeleteReturnPassRequest, EmptyResponse>("POST", "/v1/return/pass/delete", request, options);
  }

  /**
   * Обновить пропуск для возврата
   * Update return pass
   *
   * Обновляет информацию о пропусках для возврата.
   *
   * @param request - Параметры запроса обновления пропуска для возврата
   * @param options - Дополнительные опции запроса
   * @returns Результат обновления пропуска возврата
   *
   * @example
   * ```typescript
   * await passApi.updateReturnPass({
   *   arrival_passes: [{
   *     arrival_pass_id: '11111',
   *     vehicle_number: 'Т456УФ222',
   *     driver_name: 'Николаев Николай Николаевич',
   *     driver_license: '33 44 556677',
   *     arrival_date: '2024-01-21T15:00:00Z',
   *     posting_number: '12345-0002-1',
   *     comment: 'Обновлено время прибытия для возврата'
   *   }]
   * });
   *
   * console.log('Пропуск возврата успешно обновлён');
   * ```
   */
  async updateReturnPass(request: PassUpdateReturnPassRequest, options?: RequestOptions): Promise<void> {
    await this.httpClient.request<PassUpdateReturnPassRequest, EmptyResponse>("POST", "/v1/return/pass/update", request, options);
  }
}
