/**
 * FBS API implementation
 * Generated from OZON API documentation
 * FBS - Fulfillment by Seller operations
 */

import { HttpClient } from '../../core/http.js';
import type { RequestOptions } from '../../core/types.js';
import type { 
  FbsCancelReasonRequest,
  FbsCreateLabelBatchRequest,
  FbsGetLabelBatchRequest,
  FbsPickupCodeVerifyRequest,
  FbsGetRestrictionsRequest,
  FbsMovePostingRequest,
  FbsCancelPostingRequest,
  FbsGetPostingByBarcodeRequest,
  FbsPackageLabelRequest,
  FbsProductCancelRequest,
  FbsProductChangeRequest,
  FbsProductCountryListRequest,
  FbsProductCountrySetRequest,
  FbsGetPostingV3Request,
  FbsGetPostingListV3Request,
  FbsGetUnfulfilledListV3Request,
  FbsMultiBoxQtySetV3Request,
  FbsGetEtgbRequest,
  FbsUnpaidLegalProductListRequest
} from '../../types/requests/fbs.js';
import type { 
  FbsCancelReasonResponse,
  FbsCancelReasonListResponse,
  FbsCreateLabelBatchResponse,
  FbsGetLabelBatchResponse,
  FbsPickupCodeVerifyResponse,
  FbsGetRestrictionsResponse,
  FbsBooleanResponse,
  FbsPostingResponse,
  FbsPackageLabelResponse,
  FbsProductCancelResponse,
  FbsProductChangeResponse,
  FbsProductCountryListResponse,
  FbsProductCountrySetResponse,
  FbsGetPostingV3Response,
  FbsGetPostingListV3Response,
  FbsGetUnfulfilledListV3Response,
  FbsMultiBoxQtySetV3Response,
  FbsGetEtgbResponse,
  FbsUnpaidLegalProductListResponse
} from '../../types/responses/fbs.js';

/**
 * FBS API для управления отправлениями Fulfillment by Seller
 * FBS API for Fulfillment by Seller posting management
 * 
 * Предоставляет полный набор методов для управления отправлениями FBS:
 * - Создание и отмена отправлений
 * - Печать и управление этикетками  
 * - Отслеживание статусов и доставки
 * - Управление товарами в отправлениях
 * - Работа с возвратами и спорами
 * 
 * @example
 * ```typescript
 * // Получить список отправлений
 * const postings = await fbsApi.getPostingListV3({
 *   filter: {
 *     since: '2024-01-01T00:00:00Z',
 *     to: '2024-01-31T23:59:59Z',
 *     status: 'awaiting_deliver'
 *   },
 *   limit: 100
 * });
 * 
 * // Напечатать этикетки для отправлений
 * const labels = await fbsApi.packageLabel({
 *   posting_number: ['12345-0001-1', '12345-0002-1']
 * });
 * 
 * // Отменить отправление
 * const cancelled = await fbsApi.cancelPosting({
 *   posting_number: '12345-0001-1',
 *   cancel_reason_id: 402,
 *   cancel_reason_message: 'Товар не в наличии'
 * });
 * ```
 */
export class FbsApi {
  constructor(private readonly httpClient: HttpClient) {}

  // ============ Причины отмены ============

  /**
   * Причины отмены отправления
   * Get posting cancellation reasons
   * 
   * Возвращает список причин отмены для конкретных отправлений.
   * 
   * @param request - Параметры запроса причин отмены
   * @param options - Дополнительные опции запроса
   * @returns Список причин отмены для отправлений
   * 
   * @example
   * ```typescript
   * const reasons = await fbsApi.getCancelReasons({
   *   related_posting_numbers: ['12345-0001-1', '12345-0002-1']
   * });
   * 
   * reasons.result?.forEach(posting => {
   *   console.log(`Отправление ${posting.posting_number}:`);
   *   posting.cancel_reasons?.forEach(reason => {
   *     console.log(`- ${reason.name} (ID: ${reason.id})`);
   *   });
   * });
   * ```
   */
  async getCancelReasons(
    request: FbsCancelReasonRequest,
    options?: RequestOptions
  ): Promise<FbsCancelReasonResponse> {
    return this.httpClient.request<FbsCancelReasonRequest, FbsCancelReasonResponse>(
      'POST',
      '/v1/posting/fbs/cancel-reason',
      request,
      options
    );
  }

  /**
   * Причины отмены отправлений (список всех)
   * Get all posting cancellation reasons
   * 
   * Возвращает список причин отмены для всех отправлений.
   * 
   * @param options - Дополнительные опции запроса
   * @returns Полный список причин отмены
   * 
   * @example
   * ```typescript
   * const allReasons = await fbsApi.getCancelReasonsList();
   * 
   * allReasons.result?.forEach(reason => {
   *   console.log(`${reason.name} (ID: ${reason.id}, Тип: ${reason.type_id})`);
   * });
   * ```
   */
  async getCancelReasonsList(
    options?: RequestOptions
  ): Promise<FbsCancelReasonListResponse> {
    return this.httpClient.request<{}, FbsCancelReasonListResponse>(
      'POST',
      '/v2/posting/fbs/cancel-reason/list',
      {},
      options
    );
  }

  // ============ Этикетки ============

  /**
   * Создать задание на выгрузку этикеток (v1 - устарел)
   * Create label batch task (v1 - deprecated)
   * 
   * ⚠️ В будущем метод будет отключён. Переключитесь на v2/posting/fbs/package-label/create.
   * 
   * @param request - Параметры создания задания
   * @param options - Дополнительные опции запроса
   * @returns Результат создания задания
   */
  async createLabelBatch(
    request: FbsCreateLabelBatchRequest,
    options?: RequestOptions
  ): Promise<FbsCreateLabelBatchResponse> {
    return this.httpClient.request<FbsCreateLabelBatchRequest, FbsCreateLabelBatchResponse>(
      'POST',
      '/v1/posting/fbs/package-label/create',
      request,
      options
    );
  }

  /**
   * Создать задание на формирование этикеток (v2)
   * Create label batch task (v2)
   * 
   * Метод для создания задания на асинхронное формирование этикеток.
   * Может вернуть несколько заданий: на формирование маленькой и большой этикетки.
   * 
   * @param request - Параметры создания задания
   * @param options - Дополнительные опции запроса
   * @returns Результат создания задания
   * 
   * @example
   * ```typescript
   * const batchTask = await fbsApi.createLabelBatchV2({
   *   posting_number: ['12345-0001-1', '12345-0002-1']
   * });
   * 
   * if (batchTask.result?.task_id) {
   *   console.log(`Задание создано с ID: ${batchTask.result.task_id}`);
   * }
   * ```
   */
  async createLabelBatchV2(
    request: FbsCreateLabelBatchRequest,
    options?: RequestOptions
  ): Promise<FbsCreateLabelBatchResponse> {
    return this.httpClient.request<FbsCreateLabelBatchRequest, FbsCreateLabelBatchResponse>(
      'POST',
      '/v2/posting/fbs/package-label/create',
      request,
      options
    );
  }

  /**
   * Получить файл с этикетками
   * Get label batch file
   * 
   * Метод для получения этикеток после вызова createLabelBatch/createLabelBatchV2.
   * 
   * @param request - Параметры получения этикеток
   * @param options - Дополнительные опции запроса
   * @returns Файл с этикетками
   * 
   * @example
   * ```typescript
   * const labels = await fbsApi.getLabelBatch({
   *   task_id: 123456
   * });
   * 
   * if (labels.result?.file_url) {
   *   console.log(`Этикетки готовы: ${labels.result.file_url}`);
   * } else if (labels.result?.status === 'processing') {
   *   console.log('Этикетки ещё обрабатываются, повторите запрос позднее');
   * }
   * ```
   */
  async getLabelBatch(
    request: FbsGetLabelBatchRequest,
    options?: RequestOptions
  ): Promise<FbsGetLabelBatchResponse> {
    return this.httpClient.request<FbsGetLabelBatchRequest, FbsGetLabelBatchResponse>(
      'POST',
      '/v1/posting/fbs/package-label/get',
      request,
      options
    );
  }

  /**
   * Напечатать этикетку
   * Print package label
   * 
   * Генерирует PDF-файл с этикетками для указанных отправлений.
   * В одном запросе можно передать не больше 20 идентификаторов.
   * Рекомендуем запрашивать этикетки через 45–60 секунд после сборки заказа.
   * 
   * @param request - Параметры печати этикетки
   * @param options - Дополнительные опции запроса
   * @returns PDF файл с этикетками
   * 
   * @example
   * ```typescript
   * const label = await fbsApi.packageLabel({
   *   posting_number: ['12345-0001-1']
   * });
   * 
   * if (label.content) {
   *   // Сохранить PDF файл из base64
   *   const pdfBuffer = Buffer.from(label.content, 'base64');
   *   console.log(`Получен PDF размером ${pdfBuffer.length} байт`);
   * }
   * ```
   */
  async packageLabel(
    request: FbsPackageLabelRequest,
    options?: RequestOptions
  ): Promise<FbsPackageLabelResponse> {
    return this.httpClient.request<FbsPackageLabelRequest, FbsPackageLabelResponse>(
      'POST',
      '/v2/posting/fbs/package-label',
      request,
      options
    );
  }

  // ============ Проверка и ограничения ============

  /**
   * Проверить код курьера
   * Verify courier pickup code
   * 
   * Метод позволяет проверить код курьера при передаче отправлений realFBS Express.
   * 
   * @param request - Параметры проверки кода
   * @param options - Дополнительные опции запроса
   * @returns Результат проверки кода
   * 
   * @example
   * ```typescript
   * const verification = await fbsApi.verifyPickupCode({
   *   code: '123456',
   *   posting_number: '12345-0001-1'
   * });
   * 
   * if (verification.result) {
   *   console.log('Код курьера верный');
   * } else {
   *   console.log('Неверный код курьера');
   * }
   * ```
   */
  async verifyPickupCode(
    request: FbsPickupCodeVerifyRequest,
    options?: RequestOptions
  ): Promise<FbsPickupCodeVerifyResponse> {
    return this.httpClient.request<FbsPickupCodeVerifyRequest, FbsPickupCodeVerifyResponse>(
      'POST',
      '/v1/posting/fbs/pick-up-code/verify',
      request,
      options
    );
  }

  /**
   * Получить ограничения пункта приёма
   * Get pickup point restrictions
   * 
   * Метод для получения габаритных, весовых и прочих ограничений пункта приёма 
   * по номеру отправления. Применим только для работы по схеме FBS.
   * 
   * @param request - Параметры запроса ограничений
   * @param options - Дополнительные опции запроса
   * @returns Ограничения пункта приёма
   * 
   * @example
   * ```typescript
   * const restrictions = await fbsApi.getRestrictions({
   *   posting_number: '12345-0001-1'
   * });
   * 
   * const maxWeight = restrictions.result?.max_weight;
   * const maxDims = restrictions.result?.max_dimensions;
   * console.log(`Макс. вес: ${maxWeight}кг, габариты: ${maxDims?.length}x${maxDims?.width}x${maxDims?.height}см`);
   * ```
   */
  async getRestrictions(
    request: FbsGetRestrictionsRequest,
    options?: RequestOptions
  ): Promise<FbsGetRestrictionsResponse> {
    return this.httpClient.request<FbsGetRestrictionsRequest, FbsGetRestrictionsResponse>(
      'POST',
      '/v1/posting/fbs/restrictions',
      request,
      options
    );
  }

  // ============ Управление отправлениями ============

  /**
   * Открыть спор по отправлению
   * Move posting to arbitration
   * 
   * Если отправление передано в доставку, но не просканировано в сортировочном центре,
   * можно открыть спор. Открытый спор переведёт отправление в статус `arbitration`.
   * 
   * @param request - Параметры перемещения в спор
   * @param options - Дополнительные опции запроса
   * @returns Результат операции
   * 
   * @example
   * ```typescript
   * const result = await fbsApi.moveToArbitration({
   *   posting_number: ['12345-0001-1']
   * });
   * 
   * if (result.result) {
   *   console.log('Отправление переведено в арбитраж');
   * }
   * ```
   */
  async moveToArbitration(
    request: FbsMovePostingRequest,
    options?: RequestOptions
  ): Promise<FbsBooleanResponse> {
    return this.httpClient.request<FbsMovePostingRequest, FbsBooleanResponse>(
      'POST',
      '/v2/posting/fbs/arbitration',
      request,
      options
    );
  }

  /**
   * Передать отправление к отгрузке
   * Move posting to awaiting delivery
   * 
   * Передает спорные заказы к отгрузке. Статус отправления изменится на `awaiting_deliver`.
   * 
   * @param request - Параметры перемещения к отгрузке
   * @param options - Дополнительные опции запроса
   * @returns Результат операции
   * 
   * @example
   * ```typescript
   * const result = await fbsApi.moveToAwaitingDelivery({
   *   posting_number: ['12345-0001-1']
   * });
   * 
   * if (result.result) {
   *   console.log('Отправление передано к отгрузке');
   * }
   * ```
   */
  async moveToAwaitingDelivery(
    request: FbsMovePostingRequest,
    options?: RequestOptions
  ): Promise<FbsBooleanResponse> {
    return this.httpClient.request<FbsMovePostingRequest, FbsBooleanResponse>(
      'POST',
      '/v2/posting/fbs/awaiting-delivery',
      request,
      options
    );
  }

  /**
   * Отменить отправление
   * Cancel FBS posting
   * 
   * Меняет статус отправления на `cancelled`. Условно-доставленные отправления отменить нельзя.
   * Если значение параметра `cancel_reason_id` — 402, заполните поле `cancel_reason_message`.
   * 
   * @param request - Параметры отмены отправления
   * @param options - Дополнительные опции запроса
   * @returns Результат операции
   * 
   * @example
   * ```typescript
   * const result = await fbsApi.cancelPosting({
   *   posting_number: '12345-0001-1',
   *   cancel_reason_id: 402,
   *   cancel_reason_message: 'Товар не в наличии'
   * });
   * 
   * if (result.result) {
   *   console.log('Отправление отменено');
   * }
   * ```
   */
  async cancelPosting(
    request: FbsCancelPostingRequest,
    options?: RequestOptions
  ): Promise<FbsBooleanResponse> {
    return this.httpClient.request<FbsCancelPostingRequest, FbsBooleanResponse>(
      'POST',
      '/v2/posting/fbs/cancel',
      request,
      options
    );
  }

  /**
   * Получить информацию об отправлении по штрихкоду
   * Get posting information by barcode
   * 
   * @param request - Параметры запроса по штрихкоду
   * @param options - Дополнительные опции запроса
   * @returns Информация об отправлении
   * 
   * @example
   * ```typescript
   * const posting = await fbsApi.getPostingByBarcode({
   *   barcode: '1234567890123'
   * });
   * 
   * if (posting.result) {
   *   console.log(`Отправление: ${posting.result.posting_number}`);
   *   console.log(`Статус: ${posting.result.status}`);
   * }
   * ```
   */
  async getPostingByBarcode(
    request: FbsGetPostingByBarcodeRequest,
    options?: RequestOptions
  ): Promise<FbsPostingResponse> {
    return this.httpClient.request<FbsGetPostingByBarcodeRequest, FbsPostingResponse>(
      'POST',
      '/v2/posting/fbs/get-by-barcode',
      request,
      options
    );
  }

  // ============ Управление товарами в отправлениях ============

  /**
   * Отменить отправку некоторых товаров в отправлении
   * Cancel products in posting
   * 
   * Используйте метод, если вы не можете отправить часть продуктов из отправления.
   * Условно-доставленные отправления отменить нельзя.
   * 
   * @param request - Параметры отмены товаров
   * @param options - Дополнительные опции запроса
   * @returns Результат отмены товаров
   * 
   * @example
   * ```typescript
   * const result = await fbsApi.cancelProducts({
   *   posting_number: '12345-0001-1',
   *   products: [
   *     {
   *       sku: '123456789',
   *       quantity: 1,
   *       cancel_reason_id: 402
   *     }
   *   ]
   * });
   * 
   * result.result?.forEach(product => {
   *   if (product.result) {
   *     console.log(`Товар ${product.sku} отменён`);
   *   } else {
   *     console.log(`Ошибка отмены товара ${product.sku}: ${product.error}`);
   *   }
   * });
   * ```
   */
  async cancelProducts(
    request: FbsProductCancelRequest,
    options?: RequestOptions
  ): Promise<FbsProductCancelResponse> {
    return this.httpClient.request<FbsProductCancelRequest, FbsProductCancelResponse>(
      'POST',
      '/v2/posting/fbs/product/cancel',
      request,
      options
    );
  }

  /**
   * Добавить вес для весовых товаров в отправлении
   * Change products in posting
   * 
   * @param request - Параметры изменения товаров
   * @param options - Дополнительные опции запроса
   * @returns Результат изменения товаров
   * 
   * @example
   * ```typescript
   * const result = await fbsApi.changeProducts({
   *   posting_number: '12345-0001-1',
   *   products: [
   *     {
   *       sku: '123456789',
   *       quantity: 2,
   *       weight: 1.5
   *     }
   *   ]
   * });
   * 
   * result.result?.forEach(product => {
   *   if (product.result) {
   *     console.log(`Товар ${product.sku} изменён`);
   *   } else {
   *     console.log(`Ошибка изменения товара ${product.sku}: ${product.error}`);
   *   }
   * });
   * ```
   */
  async changeProducts(
    request: FbsProductChangeRequest,
    options?: RequestOptions
  ): Promise<FbsProductChangeResponse> {
    return this.httpClient.request<FbsProductChangeRequest, FbsProductChangeResponse>(
      'POST',
      '/v2/posting/fbs/product/change',
      request,
      options
    );
  }

  // ============ Страны-изготовители ============

  /**
   * Список доступных стран-изготовителей
   * Get available product countries list
   * 
   * Метод для получения списка доступных стран-изготовителей и их ISO кодов.
   * 
   * @param request - Параметры запроса
   * @param options - Дополнительные опции запроса
   * @returns Список стран-изготовителей
   * 
   * @example
   * ```typescript
   * const countries = await fbsApi.getProductCountriesList({});
   * 
   * countries.result?.forEach(country => {
   *   console.log(`${country.name} (${country.iso_code})`);
   * });
   * ```
   */
  async getProductCountriesList(
    request: FbsProductCountryListRequest,
    options?: RequestOptions
  ): Promise<FbsProductCountryListResponse> {
    return this.httpClient.request<FbsProductCountryListRequest, FbsProductCountryListResponse>(
      'POST',
      '/v2/posting/fbs/product/country/list',
      request,
      options
    );
  }

  /**
   * Добавить информацию о стране-изготовителе товара
   * Set product country information
   * 
   * Метод для добавления на продукт атрибута «Страна-изготовитель», если он не был указан.
   * 
   * @param request - Параметры установки страны
   * @param options - Дополнительные опции запроса
   * @returns Результат установки страны
   * 
   * @example
   * ```typescript
   * const result = await fbsApi.setProductCountry({
   *   posting_number: '12345-0001-1',
   *   products: [
   *     {
   *       sku: '123456789',
   *       country_iso_code: 'RU'
   *     }
   *   ]
   * });
   * 
   * result.result?.forEach(product => {
   *   if (product.result) {
   *     console.log(`Страна для товара ${product.sku} установлена`);
   *   } else {
   *     console.log(`Ошибка установки страны для ${product.sku}: ${product.error}`);
   *   }
   * });
   * ```
   */
  async setProductCountry(
    request: FbsProductCountrySetRequest,
    options?: RequestOptions
  ): Promise<FbsProductCountrySetResponse> {
    return this.httpClient.request<FbsProductCountrySetRequest, FbsProductCountrySetResponse>(
      'POST',
      '/v2/posting/fbs/product/country/set',
      request,
      options
    );
  }

  // ============ Получение информации об отправлениях v3 ============

  /**
   * Получить информацию об отправлении по идентификатору (v3)
   * Get posting information by ID (v3)
   * 
   * Чтобы получать актуальную дату отгрузки, регулярно обновляйте информацию об отправлениях
   * или подключите push-уведомления.
   * 
   * @param request - Параметры запроса отправления
   * @param options - Дополнительные опции запроса
   * @returns Информация об отправлении
   * 
   * @example
   * ```typescript
   * const posting = await fbsApi.getPostingV3({
   *   posting_number: '12345-0001-1',
   *   translit: true
   * });
   * 
   * if (posting.result) {
   *   console.log(`Отправление: ${posting.result.posting_number}`);
   *   console.log(`Статус: ${posting.result.status}`);
   *   console.log(`Дата отгрузки: ${posting.result.shipment_date}`);
   * }
   * ```
   */
  async getPostingV3(
    request: FbsGetPostingV3Request,
    options?: RequestOptions
  ): Promise<FbsGetPostingV3Response> {
    return this.httpClient.request<FbsGetPostingV3Request, FbsGetPostingV3Response>(
      'POST',
      '/v3/posting/fbs/get',
      request,
      options
    );
  }

  /**
   * Список отправлений (версия 3)
   * Get postings list (version 3)
   * 
   * Возвращает список отправлений за указанный период времени — он должен быть не больше одного года.
   * Можно дополнительно отфильтровать отправления по их статусу.
   * 
   * @param request - Параметры запроса списка
   * @param options - Дополнительные опции запроса
   * @returns Список отправлений
   * 
   * @example
   * ```typescript
   * const postings = await fbsApi.getPostingListV3({
   *   filter: {
   *     since: '2024-01-01T00:00:00Z',
   *     to: '2024-01-31T23:59:59Z',
   *     status: 'awaiting_deliver'
   *   },
   *   limit: 100,
   *   offset: 0,
   *   dir: 'DESC',
   *   with: {
   *     analytics_data: true,
   *     financial_data: true
   *   }
   * });
   * 
   * postings.result?.forEach(posting => {
   *   console.log(`${posting.posting_number} - ${posting.status}`);
   * });
   * 
   * if (postings.has_next) {
   *   console.log('Есть ещё отправления, увеличьте offset');
   * }
   * ```
   */
  async getPostingListV3(
    request: FbsGetPostingListV3Request,
    options?: RequestOptions
  ): Promise<FbsGetPostingListV3Response> {
    return this.httpClient.request<FbsGetPostingListV3Request, FbsGetPostingListV3Response>(
      'POST',
      '/v3/posting/fbs/list',
      request,
      options
    );
  }

  /**
   * Список необработанных отправлений (версия 3)
   * Get unfulfilled postings list (version 3)
   * 
   * Возвращает список необработанных отправлений за указанный период времени.
   * Период должен быть не больше одного года.
   * 
   * @param request - Параметры запроса необработанных отправлений
   * @param options - Дополнительные опции запроса
   * @returns Список необработанных отправлений
   * 
   * @example
   * ```typescript
   * const unfulfilledPostings = await fbsApi.getUnfulfilledListV3({
   *   filter: {
   *     since: '2024-01-01T00:00:00Z',
   *     to: '2024-01-31T23:59:59Z'
   *   },
   *   limit: 50
   * });
   * 
   * unfulfilledPostings.result?.forEach(posting => {
   *   console.log(`Необработанное отправление: ${posting.posting_number}`);
   *   console.log(`Статус: ${posting.status}`);
   *   console.log(`Дата создания: ${posting.created_at}`);
   * });
   * ```
   */
  async getUnfulfilledListV3(
    request: FbsGetUnfulfilledListV3Request,
    options?: RequestOptions
  ): Promise<FbsGetUnfulfilledListV3Response> {
    return this.httpClient.request<FbsGetUnfulfilledListV3Request, FbsGetUnfulfilledListV3Response>(
      'POST',
      '/v3/posting/fbs/unfulfilled/list',
      request,
      options
    );
  }

  // ============ Многокоробочные отправления ============

  /**
   * Указать количество коробок для многокоробочных отправлений
   * Set multi-box quantity for postings
   * 
   * Метод для передачи количества коробок для отправлений, в которых есть многокоробочные товары.
   * Используйте метод при работе по схеме rFBS Агрегатор — c доставкой партнёрами Ozon.
   * 
   * @param request - Параметры установки количества коробок
   * @param options - Дополнительные опции запроса
   * @returns Результат операции
   * 
   * @example
   * ```typescript
   * const result = await fbsApi.setMultiBoxQtyV3({
   *   posting_number: '12345-0001-1',
   *   multi_box_qty: 3
   * });
   * 
   * if (result.result) {
   *   console.log('Количество коробок установлено');
   * }
   * ```
   */
  async setMultiBoxQtyV3(
    request: FbsMultiBoxQtySetV3Request,
    options?: RequestOptions
  ): Promise<FbsMultiBoxQtySetV3Response> {
    return this.httpClient.request<FbsMultiBoxQtySetV3Request, FbsMultiBoxQtySetV3Response>(
      'POST',
      '/v3/posting/multiboxqty/set',
      request,
      options
    );
  }

  // ============ Дополнительные методы ============

  /**
   * Таможенные декларации ETGB
   * Get ETGB customs declarations
   * 
   * Метод для получения таможенных деклараций Elektronik Ticaret Gümrük Beyannamesi (ETGB)
   * для продавцов из Турции.
   * 
   * @param request - Параметры запроса деклараций
   * @param options - Дополнительные опции запроса
   * @returns Таможенные декларации
   * 
   * @example
   * ```typescript
   * const declarations = await fbsApi.getEtgb({
   *   posting_number: ['12345-0001-1', '12345-0002-1'],
   *   doc_type: 'ETGB'
   * });
   * 
   * declarations.result?.forEach(declaration => {
   *   console.log(`Декларация для ${declaration.posting_number}: ${declaration.document_url}`);
   * });
   * ```
   */
  async getEtgb(
    request: FbsGetEtgbRequest,
    options?: RequestOptions
  ): Promise<FbsGetEtgbResponse> {
    return this.httpClient.request<FbsGetEtgbRequest, FbsGetEtgbResponse>(
      'POST',
      '/v1/posting/global/etgb',
      request,
      options
    );
  }

  /**
   * Список неоплаченных товаров, заказанных юридическими лицами
   * Get unpaid legal products list
   * 
   * @param request - Параметры запроса неоплаченных товаров
   * @param options - Дополнительные опции запроса
   * @returns Список неоплаченных товаров
   * 
   * @example
   * ```typescript
   * const unpaidProducts = await fbsApi.getUnpaidLegalProductList({
   *   limit: 100,
   *   offset: 0
   * });
   * 
   * unpaidProducts.result?.forEach(product => {
   *   console.log(`Неоплаченный товар: ${product.name} (${product.sku})`);
   *   console.log(`Отправление: ${product.posting_number}, Цена: ${product.price}`);
   * });
   * ```
   */
  async getUnpaidLegalProductList(
    request: FbsUnpaidLegalProductListRequest,
    options?: RequestOptions
  ): Promise<FbsUnpaidLegalProductListResponse> {
    return this.httpClient.request<FbsUnpaidLegalProductListRequest, FbsUnpaidLegalProductListResponse>(
      'POST',
      '/v1/posting/unpaid-legal/product/list',
      request,
      options
    );
  }
}