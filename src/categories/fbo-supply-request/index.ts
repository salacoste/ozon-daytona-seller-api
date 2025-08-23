/**
 * FBOSupplyRequest API implementation
 * Generated from OZON API documentation
 * FBOSupplyRequest - FBO supply order management
 */

import { HttpClient } from '../../core/http.js';
import type { RequestOptions } from '../../core/types.js';
import type { 
  FboSupplyRequestCargoesLabelCreateRequest,
  FboSupplyRequestCargoesLabelGetRequest,
  FboSupplyRequestCargoesCreateRequest,
  FboSupplyRequestCargoesCreateInfoRequest,
  FboSupplyRequestCargoesDeleteRequest,
  FboSupplyRequestCargoesDeleteStatusRequest,
  FboSupplyRequestCargoesRulesGetRequest,
  FboSupplyRequestClusterListRequest,
  FboSupplyRequestDraftCreateRequest,
  FboSupplyRequestDraftCreateInfoRequest,
  FboSupplyRequestDraftSupplyCreateRequest,
  FboSupplyRequestDraftSupplyCreateStatusRequest,
  FboSupplyRequestDraftTimeslotInfoRequest,
  FboSupplyRequestSupplyOrderCancelRequest,
  FboSupplyRequestSupplyOrderCancelStatusRequest,
  FboSupplyRequestSupplyOrderContentUpdateRequest,
  FboSupplyRequestSupplyOrderContentUpdateStatusRequest,
  FboSupplyRequestWarehouseFboListRequest
} from '../../types/requests/fbo-supply-request.js';
import type { 
  FboSupplyRequestCargoesLabelCreateResponse,
  FboSupplyRequestCargoesLabelGetResponse,
  FboSupplyRequestCargoesCreateResponse,
  FboSupplyRequestCargoesCreateInfoResponse,
  FboSupplyRequestCargoesDeleteResponse,
  FboSupplyRequestCargoesDeleteStatusResponse,
  FboSupplyRequestCargoesRulesGetResponse,
  FboSupplyRequestClusterListResponse,
  FboSupplyRequestDraftCreateResponse,
  FboSupplyRequestDraftCreateInfoResponse,
  FboSupplyRequestDraftSupplyCreateResponse,
  FboSupplyRequestDraftSupplyCreateStatusResponse,
  FboSupplyRequestDraftTimeslotInfoResponse,
  FboSupplyRequestSupplyOrderCancelResponse,
  FboSupplyRequestSupplyOrderCancelStatusResponse,
  FboSupplyRequestSupplyOrderContentUpdateResponse,
  FboSupplyRequestSupplyOrderContentUpdateStatusResponse,
  FboSupplyRequestWarehouseFboListResponse
} from '../../types/responses/fbo-supply-request.js';

/**
 * FBOSupplyRequest API для управления заявками на поставку FBO
 * FBOSupplyRequest API for FBO supply order management
 * 
 * Предоставляет полный набор методов для управления заявками на поставку FBO:
 * - Создание и управление черновиками заявок
 * - Управление грузоместами и их составом
 * - Генерация этикеток для грузомест
 * - Редактирование товарного состава
 * - Отмена заявок на поставку
 * - Получение информации о складах и таймслотах
 * 
 * @example
 * ```typescript
 * // Создать черновик заявки на поставку
 * const draft = await fboSupplyRequestApi.createDraft({
 *   supply_type: 'DIRECT',
 *   warehouse_id: 123,
 *   items: [
 *     { sku: '123456789', quantity: 10 },
 *     { sku: '987654321', quantity: 5 }
 *   ]
 * });
 * 
 * // Создать заявку на поставку по черновику
 * const supplyOrder = await fboSupplyRequestApi.createSupplyOrderFromDraft({
 *   draft_id: draft.draft?.draft_id,
 *   timeslot_id: 'slot_123'
 * });
 * 
 * // Установить грузоместа
 * const cargoes = await fboSupplyRequestApi.createCargoes({
 *   supply_order_id: 456,
 *   cargoes: [
 *     {
 *       cargo_number: 'CARGO001',
 *       weight: 25.5,
 *       length: 40, width: 30, height: 20,
 *       items: [{ sku: '123456789', quantity: 5 }]
 *     }
 *   ]
 * });
 * ```
 */
export class FboSupplyRequestApi {
  constructor(private readonly httpClient: HttpClient) {}

  // ============ Этикетки для грузомест ============

  /**
   * Сгенерировать этикетки для грузомест
   * Generate cargo labels
   * 
   * Используйте метод, чтобы сгенерировать этикетки для грузомест из заявки на поставку.
   * 
   * @param request - Параметры генерации этикеток
   * @param options - Дополнительные опции запроса
   * @returns Результат генерации этикеток
   * 
   * @example
   * ```typescript
   * const labelTask = await fboSupplyRequestApi.createCargoLabels({
   *   supply_order_id: 12345,
   *   cargo_ids: [1001, 1002, 1003]
   * });
   * 
   * if (labelTask.task_id) {
   *   console.log(`Задача генерации этикеток: ${labelTask.task_id}`);
   *   console.log(`Статус: ${labelTask.status}`);
   * }
   * ```
   */
  async createCargoLabels(
    request: FboSupplyRequestCargoesLabelCreateRequest,
    options?: RequestOptions
  ): Promise<FboSupplyRequestCargoesLabelCreateResponse> {
    return this.httpClient.request<FboSupplyRequestCargoesLabelCreateRequest, FboSupplyRequestCargoesLabelCreateResponse>(
      'POST',
      '/v1/cargoes-label/create',
      request,
      options
    );
  }

  /**
   * Получить идентификатор этикетки для грузомест
   * Get cargo label identifier
   * 
   * Используйте метод, чтобы получить статус формирования этикеток и идентификатор файла с ними.
   * 
   * @param request - Параметры запроса статуса этикеток
   * @param options - Дополнительные опции запроса
   * @returns Статус и файл этикеток
   * 
   * @example
   * ```typescript
   * const labelStatus = await fboSupplyRequestApi.getCargoLabels({
   *   task_id: 'task_12345'
   * });
   * 
   * if (labelStatus.status === 'completed' && labelStatus.file_guid) {
   *   console.log(`Этикетки готовы: ${labelStatus.file_url}`);
   *   // Можно загрузить файл по file_guid
   * } else if (labelStatus.status === 'processing') {
   *   console.log('Этикетки ещё формируются');
   * }
   * ```
   */
  async getCargoLabels(
    request: FboSupplyRequestCargoesLabelGetRequest,
    options?: RequestOptions
  ): Promise<FboSupplyRequestCargoesLabelGetResponse> {
    return this.httpClient.request<FboSupplyRequestCargoesLabelGetRequest, FboSupplyRequestCargoesLabelGetResponse>(
      'POST',
      '/v1/cargoes-label/get',
      request,
      options
    );
  }

  /**
   * Получить PDF с этикетками грузовых мест
   * Get cargo labels PDF file
   * 
   * @param fileGuid - GUID файла с этикетками
   * @param options - Дополнительные опции запроса
   * @returns PDF файл с этикетками
   * 
   * @example
   * ```typescript
   * // После получения file_guid из getCargoLabels
   * const pdfResponse = await fboSupplyRequestApi.getCargoLabelsFile('file_guid_123');
   * 
   * // PDF будет в теле ответа
   * if (pdfResponse) {
   *   console.log('PDF файл с этикетками получен');
   * }
   * ```
   */
  async getCargoLabelsFile(
    fileGuid: string,
    options?: RequestOptions
  ): Promise<{ file: Blob; [key: string]: unknown }> {
    return this.httpClient.request<{}, { file: Blob; [key: string]: unknown }>(
      'GET',
      `/v1/cargoes-label/file/${fileGuid}`,
      {},
      options
    );
  }

  // ============ Управление грузоместами ============

  /**
   * Установка грузомест
   * Set cargoes
   * 
   * Используйте метод, чтобы передать грузоместа и товарный состав в заявку на поставку.
   * 
   * @param request - Параметры установки грузомест
   * @param options - Дополнительные опции запроса
   * @returns Результат установки грузомест
   * 
   * @example
   * ```typescript
   * const cargoTask = await fboSupplyRequestApi.createCargoes({
   *   supply_order_id: 12345,
   *   cargoes: [
   *     {
   *       cargo_number: 'CARGO001',
   *       weight: 25.5,
   *       length: 40, width: 30, height: 20,
   *       items: [
   *         { sku: '123456789', quantity: 5 },
   *         { sku: '987654321', quantity: 3 }
   *       ]
   *     },
   *     {
   *       cargo_number: 'CARGO002',
   *       weight: 18.0,
   *       length: 35, width: 25, height: 15,
   *       items: [
   *         { sku: '555666777', quantity: 10 }
   *       ]
   *     }
   *   ]
   * });
   * 
   * console.log(`Задача установки грузомест: ${cargoTask.task_id}`);
   * ```
   */
  async createCargoes(
    request: FboSupplyRequestCargoesCreateRequest,
    options?: RequestOptions
  ): Promise<FboSupplyRequestCargoesCreateResponse> {
    return this.httpClient.request<FboSupplyRequestCargoesCreateRequest, FboSupplyRequestCargoesCreateResponse>(
      'POST',
      '/v1/cargoes/create',
      request,
      options
    );
  }

  /**
   * Получить информацию по установке грузомест
   * Get cargoes creation info
   * 
   * Используйте метод, чтобы получить информацию по установленным грузоместам.
   * 
   * @param request - Параметры запроса информации о грузоместах
   * @param options - Дополнительные опции запроса
   * @returns Информация о созданных грузоместах
   * 
   * @example
   * ```typescript
   * const cargoInfo = await fboSupplyRequestApi.getCargoesCreateInfo({
   *   task_id: 'task_12345'
   * });
   * 
   * if (cargoInfo.status === 'completed') {
   *   cargoInfo.cargoes?.forEach(cargo => {
   *     console.log(`Грузоместо ${cargo.cargo_number}: ID ${cargo.cargo_id}`);
   *     console.log(`Вес: ${cargo.weight}кг, статус: ${cargo.status}`);
   *   });
   * }
   * 
   * cargoInfo.errors?.forEach(error => {
   *   console.log(`Ошибка для ${error.cargo_number}: ${error.error_message}`);
   * });
   * ```
   */
  async getCargoesCreateInfo(
    request: FboSupplyRequestCargoesCreateInfoRequest,
    options?: RequestOptions
  ): Promise<FboSupplyRequestCargoesCreateInfoResponse> {
    return this.httpClient.request<FboSupplyRequestCargoesCreateInfoRequest, FboSupplyRequestCargoesCreateInfoResponse>(
      'POST',
      '/v1/cargoes/create/info',
      request,
      options
    );
  }

  /**
   * Удалить грузоместо в заявке на поставку
   * Delete cargo in supply request
   * 
   * Метод для удаления грузомест в заявке на поставку.
   * 
   * @param request - Параметры удаления грузомест
   * @param options - Дополнительные опции запроса
   * @returns Результат удаления
   * 
   * @example
   * ```typescript
   * const deleteTask = await fboSupplyRequestApi.deleteCargoes({
   *   supply_order_id: 12345,
   *   cargo_ids: [1001, 1002]
   * });
   * 
   * console.log(`Задача удаления: ${deleteTask.task_id}`);
   * console.log(`Статус: ${deleteTask.status}`);
   * ```
   */
  async deleteCargoes(
    request: FboSupplyRequestCargoesDeleteRequest,
    options?: RequestOptions
  ): Promise<FboSupplyRequestCargoesDeleteResponse> {
    return this.httpClient.request<FboSupplyRequestCargoesDeleteRequest, FboSupplyRequestCargoesDeleteResponse>(
      'POST',
      '/v1/cargoes/delete',
      request,
      options
    );
  }

  /**
   * Информация о статусе удаления грузоместа
   * Get cargo deletion status
   * 
   * Метод для получения статуса удаления грузомест в заявке на поставку.
   * 
   * @param request - Параметры запроса статуса удаления
   * @param options - Дополнительные опции запроса
   * @returns Статус удаления грузомест
   * 
   * @example
   * ```typescript
   * const deleteStatus = await fboSupplyRequestApi.getCargoesDeleteStatus({
   *   task_id: 'delete_task_123'
   * });
   * 
   * if (deleteStatus.status === 'completed') {
   *   deleteStatus.results?.forEach(result => {
   *     if (result.success) {
   *       console.log(`Грузоместо ${result.cargo_id} удалено`);
   *     } else {
   *       console.log(`Ошибка удаления ${result.cargo_id}: ${result.error_message}`);
   *     }
   *   });
   * }
   * ```
   */
  async getCargoesDeleteStatus(
    request: FboSupplyRequestCargoesDeleteStatusRequest,
    options?: RequestOptions
  ): Promise<FboSupplyRequestCargoesDeleteStatusResponse> {
    return this.httpClient.request<FboSupplyRequestCargoesDeleteStatusRequest, FboSupplyRequestCargoesDeleteStatusResponse>(
      'POST',
      '/v1/cargoes/delete/status',
      request,
      options
    );
  }

  /**
   * Чек-лист по установке грузомест FBO
   * Get FBO cargo rules checklist
   * 
   * Метод для получения чек-листа с правилами по установке грузомест.
   * 
   * @param request - Параметры запроса чек-листа
   * @param options - Дополнительные опции запроса
   * @returns Чек-лист правил
   * 
   * @example
   * ```typescript
   * const rules = await fboSupplyRequestApi.getCargoRules({});
   * 
   * rules.rules?.forEach(rule => {
   *   console.log(`${rule.type}: ${rule.description}`);
   *   if (rule.required) {
   *     console.log('  (Обязательное правило)');
   *   }
   * });
   * ```
   */
  async getCargoRules(
    request: FboSupplyRequestCargoesRulesGetRequest,
    options?: RequestOptions
  ): Promise<FboSupplyRequestCargoesRulesGetResponse> {
    return this.httpClient.request<FboSupplyRequestCargoesRulesGetRequest, FboSupplyRequestCargoesRulesGetResponse>(
      'POST',
      '/v1/cargoes/rules/get',
      request,
      options
    );
  }

  // ============ Кластеры и склады ============

  /**
   * Информация о кластерах и их складах
   * Get cluster and warehouse information
   * 
   * @param request - Параметры запроса кластеров
   * @param options - Дополнительные опции запроса
   * @returns Список кластеров и складов
   * 
   * @example
   * ```typescript
   * const clusters = await fboSupplyRequestApi.getClusterList({});
   * 
   * clusters.clusters?.forEach(cluster => {
   *   console.log(`Кластер: ${cluster.name} (ID: ${cluster.cluster_id})`);
   *   cluster.warehouses?.forEach(warehouse => {
   *     console.log(`  Склад: ${warehouse.name}`);
   *     console.log(`  Тип: ${warehouse.type}, доступен: ${warehouse.is_available}`);
   *   });
   * });
   * ```
   */
  async getClusterList(
    request: FboSupplyRequestClusterListRequest,
    options?: RequestOptions
  ): Promise<FboSupplyRequestClusterListResponse> {
    return this.httpClient.request<FboSupplyRequestClusterListRequest, FboSupplyRequestClusterListResponse>(
      'POST',
      '/v1/cluster/list',
      request,
      options
    );
  }

  /**
   * Поиск точек для отгрузки поставки
   * Search FBO warehouse list
   * 
   * Используйте метод, чтобы найти точки отгрузки для кросс-докинга и прямых поставок.
   * 
   * @param request - Параметры поиска складов
   * @param options - Дополнительные опции запроса
   * @returns Список складов FBO
   * 
   * @example
   * ```typescript
   * const warehouses = await fboSupplyRequestApi.getWarehouseFboList({
   *   region: 'Москва',
   *   warehouse_type: 'DIRECT'
   * });
   * 
   * warehouses.warehouses?.forEach(warehouse => {
   *   console.log(`${warehouse.name} (${warehouse.type})`);
   *   console.log(`Адрес: ${warehouse.address}`);
   *   console.log(`Доступен: ${warehouse.is_available}`);
   * });
   * ```
   */
  async getWarehouseFboList(
    request: FboSupplyRequestWarehouseFboListRequest,
    options?: RequestOptions
  ): Promise<FboSupplyRequestWarehouseFboListResponse> {
    return this.httpClient.request<FboSupplyRequestWarehouseFboListRequest, FboSupplyRequestWarehouseFboListResponse>(
      'POST',
      '/v1/warehouse/fbo/list',
      request,
      options
    );
  }

  // ============ Черновики заявок ============

  /**
   * Создать черновик заявки на поставку
   * Create supply draft
   * 
   * Создать черновик заявки на поставку — прямой или кросс-докинг, а также указать поставляемые товары.
   * 
   * @param request - Параметры создания черновика
   * @param options - Дополнительные опции запроса
   * @returns Информация о созданном черновике
   * 
   * @example
   * ```typescript
   * const draft = await fboSupplyRequestApi.createDraft({
   *   supply_type: 'DIRECT',
   *   warehouse_id: 123,
   *   items: [
   *     { sku: '123456789', quantity: 10 },
   *     { sku: '987654321', quantity: 5 },
   *     { sku: '555666777', quantity: 20 }
   *   ]
   * });
   * 
   * if (draft.draft?.draft_id) {
   *   console.log(`Черновик создан: ${draft.draft.draft_id}`);
   *   console.log(`Тип поставки: ${draft.draft.supply_type}`);
   *   console.log(`Склад: ${draft.draft.warehouse?.name}`);
   * }
   * ```
   */
  async createDraft(
    request: FboSupplyRequestDraftCreateRequest,
    options?: RequestOptions
  ): Promise<FboSupplyRequestDraftCreateResponse> {
    return this.httpClient.request<FboSupplyRequestDraftCreateRequest, FboSupplyRequestDraftCreateResponse>(
      'POST',
      '/v1/draft/create',
      request,
      options
    );
  }

  /**
   * Информация о черновике заявки на поставку
   * Get draft information
   * 
   * @param request - Параметры запроса информации о черновике
   * @param options - Дополнительные опции запроса
   * @returns Информация о черновике
   * 
   * @example
   * ```typescript
   * const draftInfo = await fboSupplyRequestApi.getDraftInfo({
   *   draft_id: 'draft_12345'
   * });
   * 
   * if (draftInfo.draft) {
   *   console.log(`Статус черновика: ${draftInfo.draft.status}`);
   *   console.log(`Товаров в черновике: ${draftInfo.draft.items?.length}`);
   *   draftInfo.draft.items?.forEach(item => {
   *     console.log(`- ${item.name}: ${item.quantity} шт`);
   *   });
   * }
   * ```
   */
  async getDraftInfo(
    request: FboSupplyRequestDraftCreateInfoRequest,
    options?: RequestOptions
  ): Promise<FboSupplyRequestDraftCreateInfoResponse> {
    return this.httpClient.request<FboSupplyRequestDraftCreateInfoRequest, FboSupplyRequestDraftCreateInfoResponse>(
      'POST',
      '/v1/draft/create/info',
      request,
      options
    );
  }

  /**
   * Доступные таймслоты
   * Get available timeslots
   * 
   * Доступные таймслоты на конечных складах отгрузки.
   * 
   * @param request - Параметры запроса таймслотов
   * @param options - Дополнительные опции запроса
   * @returns Список доступных таймслотов
   * 
   * @example
   * ```typescript
   * const timeslots = await fboSupplyRequestApi.getTimeslotInfo({
   *   warehouse_id: 123,
   *   date_from: '2024-01-15',
   *   date_to: '2024-01-20'
   * });
   * 
   * timeslots.timeslots?.forEach(slot => {
   *   if (slot.is_available) {
   *     console.log(`Доступен: ${slot.start_time} - ${slot.end_time}`);
   *     console.log(`Макс. палет: ${slot.max_pallets}`);
   *   }
   * });
   * ```
   */
  async getTimeslotInfo(
    request: FboSupplyRequestDraftTimeslotInfoRequest,
    options?: RequestOptions
  ): Promise<FboSupplyRequestDraftTimeslotInfoResponse> {
    return this.httpClient.request<FboSupplyRequestDraftTimeslotInfoRequest, FboSupplyRequestDraftTimeslotInfoResponse>(
      'POST',
      '/v1/draft/timeslot/info',
      request,
      options
    );
  }

  /**
   * Создать заявку на поставку по черновику
   * Create supply order from draft
   * 
   * @param request - Параметры создания заявки
   * @param options - Дополнительные опции запроса
   * @returns Результат создания заявки
   * 
   * @example
   * ```typescript
   * const createTask = await fboSupplyRequestApi.createSupplyOrderFromDraft({
   *   draft_id: 'draft_12345',
   *   timeslot_id: 'slot_67890'
   * });
   * 
   * console.log(`Задача создания заявки: ${createTask.task_id}`);
   * console.log(`Статус: ${createTask.status}`);
   * ```
   */
  async createSupplyOrderFromDraft(
    request: FboSupplyRequestDraftSupplyCreateRequest,
    options?: RequestOptions
  ): Promise<FboSupplyRequestDraftSupplyCreateResponse> {
    return this.httpClient.request<FboSupplyRequestDraftSupplyCreateRequest, FboSupplyRequestDraftSupplyCreateResponse>(
      'POST',
      '/v1/draft/supply/create',
      request,
      options
    );
  }

  /**
   * Информация о создании заявки на поставку
   * Get supply order creation status
   * 
   * @param request - Параметры запроса статуса создания
   * @param options - Дополнительные опции запроса
   * @returns Статус создания заявки
   * 
   * @example
   * ```typescript
   * const createStatus = await fboSupplyRequestApi.getSupplyOrderCreateStatus({
   *   task_id: 'create_task_123'
   * });
   * 
   * if (createStatus.status === 'completed' && createStatus.supply_order_id) {
   *   console.log(`Заявка создана с ID: ${createStatus.supply_order_id}`);
   * } else if (createStatus.status === 'error') {
   *   console.log(`Ошибка: ${createStatus.error_message}`);
   * }
   * ```
   */
  async getSupplyOrderCreateStatus(
    request: FboSupplyRequestDraftSupplyCreateStatusRequest,
    options?: RequestOptions
  ): Promise<FboSupplyRequestDraftSupplyCreateStatusResponse> {
    return this.httpClient.request<FboSupplyRequestDraftSupplyCreateStatusRequest, FboSupplyRequestDraftSupplyCreateStatusResponse>(
      'POST',
      '/v1/draft/supply/create/status',
      request,
      options
    );
  }

  // ============ Управление заявками на поставку ============

  /**
   * Отменить заявку на поставку
   * Cancel supply order
   * 
   * @param request - Параметры отмены заявки
   * @param options - Дополнительные опции запроса
   * @returns Результат отмены
   * 
   * @example
   * ```typescript
   * const cancelTask = await fboSupplyRequestApi.cancelSupplyOrder({
   *   supply_order_id: 12345,
   *   reason: 'Изменились планы поставки'
   * });
   * 
   * console.log(`Задача отмены: ${cancelTask.task_id}`);
   * console.log(`Статус: ${cancelTask.status}`);
   * ```
   */
  async cancelSupplyOrder(
    request: FboSupplyRequestSupplyOrderCancelRequest,
    options?: RequestOptions
  ): Promise<FboSupplyRequestSupplyOrderCancelResponse> {
    return this.httpClient.request<FboSupplyRequestSupplyOrderCancelRequest, FboSupplyRequestSupplyOrderCancelResponse>(
      'POST',
      '/v1/supply-order/cancel',
      request,
      options
    );
  }

  /**
   * Получить статус отмены заявки на поставку
   * Get supply order cancellation status
   * 
   * @param request - Параметры запроса статуса отмены
   * @param options - Дополнительные опции запроса
   * @returns Статус отмены заявки
   * 
   * @example
   * ```typescript
   * const cancelStatus = await fboSupplyRequestApi.getSupplyOrderCancelStatus({
   *   task_id: 'cancel_task_123'
   * });
   * 
   * if (cancelStatus.status === 'completed') {
   *   if (cancelStatus.success) {
   *     console.log('Заявка успешно отменена');
   *   } else {
   *     console.log(`Ошибка отмены: ${cancelStatus.error_message}`);
   *   }
   * }
   * ```
   */
  async getSupplyOrderCancelStatus(
    request: FboSupplyRequestSupplyOrderCancelStatusRequest,
    options?: RequestOptions
  ): Promise<FboSupplyRequestSupplyOrderCancelStatusResponse> {
    return this.httpClient.request<FboSupplyRequestSupplyOrderCancelStatusRequest, FboSupplyRequestSupplyOrderCancelStatusResponse>(
      'POST',
      '/v1/supply-order/cancel/status',
      request,
      options
    );
  }

  /**
   * Редактирование товарного состава
   * Update supply order content
   * 
   * Метод для редактирования товарного состава в заявке на поставку.
   * 
   * @param request - Параметры редактирования состава
   * @param options - Дополнительные опции запроса
   * @returns Результат редактирования
   * 
   * @example
   * ```typescript
   * const updateTask = await fboSupplyRequestApi.updateSupplyOrderContent({
   *   supply_order_id: 12345,
   *   items: [
   *     { sku: '123456789', quantity: 15, operation: 'update' },
   *     { sku: '987654321', quantity: 10, operation: 'add' },
   *     { sku: '555666777', quantity: 0, operation: 'delete' }
   *   ]
   * });
   * 
   * console.log(`Задача редактирования: ${updateTask.task_id}`);
   * ```
   */
  async updateSupplyOrderContent(
    request: FboSupplyRequestSupplyOrderContentUpdateRequest,
    options?: RequestOptions
  ): Promise<FboSupplyRequestSupplyOrderContentUpdateResponse> {
    return this.httpClient.request<FboSupplyRequestSupplyOrderContentUpdateRequest, FboSupplyRequestSupplyOrderContentUpdateResponse>(
      'POST',
      '/v1/supply-order/content/update',
      request,
      options
    );
  }

  /**
   * Информация о статусе редактирования товарного состава
   * Get content update status
   * 
   * Метод для получения статуса редактирования товарного состава.
   * 
   * @param request - Параметры запроса статуса редактирования
   * @param options - Дополнительные опции запроса
   * @returns Статус редактирования состава
   * 
   * @example
   * ```typescript
   * const updateStatus = await fboSupplyRequestApi.getSupplyOrderContentUpdateStatus({
   *   task_id: 'update_task_123'
   * });
   * 
   * if (updateStatus.status === 'completed') {
   *   updateStatus.results?.forEach(result => {
   *     const status = result.success ? 'успешно' : 'ошибка';
   *     console.log(`${result.sku} (${result.operation}): ${status}`);
   *     if (!result.success) {
   *       console.log(`  Ошибка: ${result.error_message}`);
   *     }
   *   });
   * }
   * ```
   */
  async getSupplyOrderContentUpdateStatus(
    request: FboSupplyRequestSupplyOrderContentUpdateStatusRequest,
    options?: RequestOptions
  ): Promise<FboSupplyRequestSupplyOrderContentUpdateStatusResponse> {
    return this.httpClient.request<FboSupplyRequestSupplyOrderContentUpdateStatusRequest, FboSupplyRequestSupplyOrderContentUpdateStatusResponse>(
      'POST',
      '/v1/supply-order/content/update/status',
      request,
      options
    );
  }
}