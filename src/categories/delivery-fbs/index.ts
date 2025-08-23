/**
 * DeliveryFBS API implementation
 * Generated from OZON API documentation
 * DeliveryFBS - FBS delivery management and tracking
 */

import { HttpClient } from '../../core/http.js';
import type { RequestOptions } from '../../core/types.js';
import type { 
  DeliveryFbsCarriageApproveRequest,
  DeliveryFbsCarriageCancelRequest,
  DeliveryFbsCarriageCreateRequest,
  DeliveryFbsCarriageDeliveryListRequest,
  DeliveryFbsCarriageGetRequest,
  DeliveryFbsSetPostingsRequest,
  DeliveryFbsCarriageAvailableListRequest,
  DeliveryFbsPostingSplitRequest,
  DeliveryFbsActCheckStatusRequest,
  DeliveryFbsActCreateRequest,
  DeliveryFbsGetBarcodeRequest,
  DeliveryFbsGetContainerLabelsRequest,
  DeliveryFbsGetActRequest,
  DeliveryFbsActGetPostingsRequest,
  DeliveryFbsActListRequest,
  DeliveryFbsDigitalActCheckStatusRequest,
  DeliveryFbsGetDigitalActRequest
} from '../../types/requests/delivery-fbs.js';
import type { 
  DeliveryFbsCarriageApproveResponse,
  DeliveryFbsCarriageCancelResponse,
  DeliveryFbsCarriageCreateResponse,
  DeliveryFbsCarriageDeliveryListResponse,
  DeliveryFbsCarriageGetResponse,
  DeliveryFbsSetPostingsResponse,
  DeliveryFbsCarriageAvailableListResponse,
  DeliveryFbsPostingSplitResponse,
  DeliveryFbsActCheckStatusResponse,
  DeliveryFbsActCreateResponse,
  DeliveryFbsGetBarcodeResponse,
  DeliveryFbsGetBarcodeTextResponse,
  DeliveryFbsGetContainerLabelsResponse,
  DeliveryFbsGetActResponse,
  DeliveryFbsActGetPostingsResponse,
  DeliveryFbsActListResponse,
  DeliveryFbsDigitalActCheckStatusResponse,
  DeliveryFbsGetDigitalActResponse
} from '../../types/responses/delivery-fbs.js';

/**
 * DeliveryFBS API для управления доставкой и отгрузками FBS
 * DeliveryFBS API for FBS delivery and shipment management
 * 
 * Предоставляет полный набор методов для управления доставкой FBS:
 * - Создание и управление отгрузками
 * - Подтверждение и отмена отгрузок
 * - Получение документов и штрихкодов
 * - Управление составом отправлений в отгрузках
 * - Отслеживание статусов документооборота
 * 
 * @example
 * ```typescript
 * // Создать отгрузку
 * const carriage = await deliveryFbsApi.createCarriage({
 *   delivery_method_id: 123,
 *   first_mile_from_time: '09:00',
 *   first_mile_to_time: '18:00'
 * });
 * 
 * // Подтвердить отгрузку
 * const approved = await deliveryFbsApi.approveCarriage({
 *   carriage_id: carriage.result?.carriage_id
 * });
 * 
 * // Получить документы отгрузки
 * const documents = await deliveryFbsApi.getAct({
 *   carriage_id: carriage.result?.carriage_id,
 *   doc_type: 'act'
 * });
 * ```
 */
export class DeliveryFbsApi {
  constructor(private readonly httpClient: HttpClient) {}

  // ============ Управление отгрузками ============

  /**
   * Подтверждение отгрузки
   * Approve carriage
   * 
   * Используйте метод, чтобы подтвердить отгрузку после её создания.
   * После подтверждения отгрузка перейдёт в статус «Сформирована».
   * 
   * @param request - Параметры подтверждения отгрузки
   * @param options - Дополнительные опции запроса
   * @returns Результат подтверждения отгрузки
   * 
   * @example
   * ```typescript
   * const result = await deliveryFbsApi.approveCarriage({
   *   carriage_id: 12345
   * });
   * 
   * if (result.result) {
   *   console.log('Отгрузка подтверждена');
   *   // Теперь можно получить лист отгрузки и штрихкод
   * }
   * ```
   */
  async approveCarriage(
    request: DeliveryFbsCarriageApproveRequest,
    options?: RequestOptions
  ): Promise<DeliveryFbsCarriageApproveResponse> {
    return this.httpClient.request<DeliveryFbsCarriageApproveRequest, DeliveryFbsCarriageApproveResponse>(
      'POST',
      '/v1/carriage/approve',
      request,
      options
    );
  }

  /**
   * Удаление отгрузки
   * Cancel carriage
   * 
   * @param request - Параметры удаления отгрузки
   * @param options - Дополнительные опции запроса
   * @returns Результат удаления отгрузки
   * 
   * @example
   * ```typescript
   * const result = await deliveryFbsApi.cancelCarriage({
   *   carriage_id: 12345
   * });
   * 
   * if (result.result) {
   *   console.log('Отгрузка удалена');
   * }
   * ```
   */
  async cancelCarriage(
    request: DeliveryFbsCarriageCancelRequest,
    options?: RequestOptions
  ): Promise<DeliveryFbsCarriageCancelResponse> {
    return this.httpClient.request<DeliveryFbsCarriageCancelRequest, DeliveryFbsCarriageCancelResponse>(
      'POST',
      '/v1/carriage/cancel',
      request,
      options
    );
  }

  /**
   * Создание отгрузки
   * Create carriage
   * 
   * Используйте метод для создания первой FBS отгрузки. В неё попадут все отправления 
   * со статусом «Готов к отгрузке». Созданная отгрузка получит статус `new`.
   * 
   * @param request - Параметры создания отгрузки
   * @param options - Дополнительные опции запроса
   * @returns Информация о созданной отгрузке
   * 
   * @example
   * ```typescript
   * const carriage = await deliveryFbsApi.createCarriage({
   *   delivery_method_id: 123,
   *   first_mile_from_time: '09:00',
   *   first_mile_to_time: '18:00'
   * });
   * 
   * if (carriage.result?.carriage_id) {
   *   console.log(`Отгрузка создана с ID: ${carriage.result.carriage_id}`);
   *   console.log(`Статус: ${carriage.result.status}`);
   * }
   * ```
   */
  async createCarriage(
    request: DeliveryFbsCarriageCreateRequest,
    options?: RequestOptions
  ): Promise<DeliveryFbsCarriageCreateResponse> {
    return this.httpClient.request<DeliveryFbsCarriageCreateRequest, DeliveryFbsCarriageCreateResponse>(
      'POST',
      '/v1/carriage/create',
      request,
      options
    );
  }

  /**
   * Список методов доставки и отгрузок
   * Get delivery methods and carriages list
   * 
   * Используйте метод, чтобы получить список созданных отгрузок 
   * для метода доставки и их статусы.
   * 
   * @param request - Параметры запроса списка
   * @param options - Дополнительные опции запроса
   * @returns Список методов доставки с отгрузками
   * 
   * @example
   * ```typescript
   * const deliveryList = await deliveryFbsApi.getCarriageDeliveryList({
   *   status: 'new',
   *   limit: 50
   * });
   * 
   * deliveryList.result?.forEach(item => {
   *   console.log(`Метод доставки: ${item.delivery_method?.name}`);
   *   item.carriages?.forEach(carriage => {
   *     console.log(`- Отгрузка ${carriage.carriage_id}: ${carriage.status}`);
   *   });
   * });
   * ```
   */
  async getCarriageDeliveryList(
    request: DeliveryFbsCarriageDeliveryListRequest,
    options?: RequestOptions
  ): Promise<DeliveryFbsCarriageDeliveryListResponse> {
    return this.httpClient.request<DeliveryFbsCarriageDeliveryListRequest, DeliveryFbsCarriageDeliveryListResponse>(
      'POST',
      '/v1/carriage/delivery/list',
      request,
      options
    );
  }

  /**
   * Информация о перевозке
   * Get carriage information
   * 
   * @param request - Параметры запроса информации о перевозке
   * @param options - Дополнительные опции запроса
   * @returns Информация о перевозке
   * 
   * @example
   * ```typescript
   * const carriageInfo = await deliveryFbsApi.getCarriage({
   *   carriage_id: 12345
   * });
   * 
   * if (carriageInfo.result) {
   *   console.log(`Статус перевозки: ${carriageInfo.result.status}`);
   *   console.log(`Создана: ${carriageInfo.result.created_at}`);
   * }
   * ```
   */
  async getCarriage(
    request: DeliveryFbsCarriageGetRequest,
    options?: RequestOptions
  ): Promise<DeliveryFbsCarriageGetResponse> {
    return this.httpClient.request<DeliveryFbsCarriageGetRequest, DeliveryFbsCarriageGetResponse>(
      'POST',
      '/v1/carriage/get',
      request,
      options
    );
  }

  /**
   * Изменение состава отгрузки
   * Set carriage postings
   * 
   * ⚠️ Метод недоступен для продавцов из СНГ.
   * Полностью перезаписывает список заказов в отгрузке.
   * 
   * @param request - Параметры изменения состава отгрузки
   * @param options - Дополнительные опции запроса
   * @returns Результат операции
   * 
   * @example
   * ```typescript
   * const result = await deliveryFbsApi.setPostings({
   *   carriage_id: 12345,
   *   posting_number: ['12345-0001-1', '12345-0002-1']
   * });
   * 
   * if (result.result) {
   *   console.log('Состав отгрузки изменён');
   * }
   * ```
   */
  async setPostings(
    request: DeliveryFbsSetPostingsRequest,
    options?: RequestOptions
  ): Promise<DeliveryFbsSetPostingsResponse> {
    return this.httpClient.request<DeliveryFbsSetPostingsRequest, DeliveryFbsSetPostingsResponse>(
      'POST',
      '/v1/carriage/set-postings',
      request,
      options
    );
  }

  // ============ Доступные перевозки ============

  /**
   * Список доступных перевозок
   * Get available carriages list
   * 
   * Метод для получения перевозок, по которым нужно распечатать штрихкод 
   * для отгрузки и документы.
   * 
   * @param request - Параметры запроса доступных перевозок
   * @param options - Дополнительные опции запроса
   * @returns Список доступных перевозок
   * 
   * @example
   * ```typescript
   * const availableCarriages = await deliveryFbsApi.getCarriageAvailableList({
   *   limit: 20
   * });
   * 
   * availableCarriages.result?.forEach(carriage => {
   *   console.log(`Перевозка ${carriage.carriage_id}`);
   *   console.log(`Статус: ${carriage.status}`);
   *   console.log(`Отправлений: ${carriage.postings_count}`);
   * });
   * ```
   */
  async getCarriageAvailableList(
    request: DeliveryFbsCarriageAvailableListRequest,
    options?: RequestOptions
  ): Promise<DeliveryFbsCarriageAvailableListResponse> {
    return this.httpClient.request<DeliveryFbsCarriageAvailableListRequest, DeliveryFbsCarriageAvailableListResponse>(
      'POST',
      '/v1/posting/carriage-available/list',
      request,
      options
    );
  }

  // ============ Разделение отправлений ============

  /**
   * Разделить заказ на отправления без сборки
   * Split posting without assembly
   * 
   * @param request - Параметры разделения отправления
   * @param options - Дополнительные опции запроса
   * @returns Результат разделения
   * 
   * @example
   * ```typescript
   * const result = await deliveryFbsApi.splitPosting({
   *   posting_number: '12345-0001-1'
   * });
   * 
   * if (result.result) {
   *   console.log('Заказ разделён на отправления');
   *   result.created_postings?.forEach(posting => {
   *     console.log(`Создано отправление: ${posting}`);
   *   });
   * }
   * ```
   */
  async splitPosting(
    request: DeliveryFbsPostingSplitRequest,
    options?: RequestOptions
  ): Promise<DeliveryFbsPostingSplitResponse> {
    return this.httpClient.request<DeliveryFbsPostingSplitRequest, DeliveryFbsPostingSplitResponse>(
      'POST',
      '/v1/posting/fbs/split',
      request,
      options
    );
  }

  // ============ Акты и документы ============

  /**
   * Статус отгрузки и документов
   * Get shipment and documents status
   * 
   * Возвращает статус формирования штрихкода для отгрузки и документов.
   * 
   * @param request - Параметры запроса статуса
   * @param options - Дополнительные опции запроса
   * @returns Статус отгрузки и документов
   * 
   * @example
   * ```typescript
   * const status = await deliveryFbsApi.checkActStatus({
   *   carriage_id: 12345
   * });
   * 
   * console.log(`Статус отгрузки: ${status.carriage_status}`);
   * console.log(`Статус штрихкода: ${status.barcode_status}`);
   * status.documents?.forEach(doc => {
   *   console.log(`${doc.type}: ${doc.status}`);
   * });
   * ```
   */
  async checkActStatus(
    request: DeliveryFbsActCheckStatusRequest,
    options?: RequestOptions
  ): Promise<DeliveryFbsActCheckStatusResponse> {
    return this.httpClient.request<DeliveryFbsActCheckStatusRequest, DeliveryFbsActCheckStatusResponse>(
      'POST',
      '/v2/posting/fbs/act/check-status',
      request,
      options
    );
  }

  /**
   * Подтвердить отгрузку и создать документы
   * Confirm shipment and create documents
   * 
   * Подтверждает отгрузку и запускает формирование транспортной накладной 
   * и штрихкода для отгрузки.
   * 
   * @param request - Параметры подтверждения отгрузки
   * @param options - Дополнительные опции запроса
   * @returns Результат создания документов
   * 
   * @example
   * ```typescript
   * const result = await deliveryFbsApi.createAct({
   *   carriage_id: 12345,
   *   posting_number: ['12345-0001-1', '12345-0002-1']
   * });
   * 
   * if (result.result) {
   *   console.log(`Акт создан с ID: ${result.act_id}`);
   * }
   * ```
   */
  async createAct(
    request: DeliveryFbsActCreateRequest,
    options?: RequestOptions
  ): Promise<DeliveryFbsActCreateResponse> {
    return this.httpClient.request<DeliveryFbsActCreateRequest, DeliveryFbsActCreateResponse>(
      'POST',
      '/v2/posting/fbs/act/create',
      request,
      options
    );
  }

  /**
   * Штрихкод для отгрузки отправления
   * Get shipment barcode
   * 
   * Метод для получения штрихкода, который нужно показать в пункте выдачи 
   * или сортировочном центре при отгрузке отправления.
   * 
   * @param request - Параметры запроса штрихкода
   * @param options - Дополнительные опции запроса
   * @returns Изображение штрихкода
   * 
   * @example
   * ```typescript
   * const barcode = await deliveryFbsApi.getBarcode({
   *   carriage_id: 12345
   * });
   * 
   * if (barcode.barcode) {
   *   // Сохранить изображение штрихкода из base64
   *   const barcodeBuffer = Buffer.from(barcode.barcode, 'base64');
   *   console.log(`Получен штрихкод: ${barcode.content_type}`);
   * }
   * ```
   */
  async getBarcode(
    request: DeliveryFbsGetBarcodeRequest,
    options?: RequestOptions
  ): Promise<DeliveryFbsGetBarcodeResponse> {
    return this.httpClient.request<DeliveryFbsGetBarcodeRequest, DeliveryFbsGetBarcodeResponse>(
      'POST',
      '/v2/posting/fbs/act/get-barcode',
      request,
      options
    );
  }

  /**
   * Значение штрихкода для отгрузки отправления
   * Get shipment barcode text
   * 
   * Используйте этот метод, чтобы получить штрихкод в текстовом виде.
   * 
   * @param request - Параметры запроса текста штрихкода
   * @param options - Дополнительные опции запроса
   * @returns Текстовое значение штрихкода
   * 
   * @example
   * ```typescript
   * const barcodeText = await deliveryFbsApi.getBarcodeText({
   *   carriage_id: 12345
   * });
   * 
   * if (barcodeText.barcode_text) {
   *   console.log(`Штрихкод: ${barcodeText.barcode_text}`);
   * }
   * ```
   */
  async getBarcodeText(
    request: DeliveryFbsGetBarcodeRequest,
    options?: RequestOptions
  ): Promise<DeliveryFbsGetBarcodeTextResponse> {
    return this.httpClient.request<DeliveryFbsGetBarcodeRequest, DeliveryFbsGetBarcodeTextResponse>(
      'POST',
      '/v2/posting/fbs/act/get-barcode/text',
      request,
      options
    );
  }

  /**
   * Этикетки для грузового места
   * Get container labels
   * 
   * Метод создает этикетки для грузового места.
   * 
   * @param request - Параметры запроса этикеток
   * @param options - Дополнительные опции запроса
   * @returns PDF файл с этикетками
   * 
   * @example
   * ```typescript
   * const labels = await deliveryFbsApi.getContainerLabels({
   *   carriage_id: 12345,
   *   container_numbers: ['CONT001', 'CONT002']
   * });
   * 
   * if (labels.content) {
   *   // Сохранить PDF файл из base64
   *   const labelsBuffer = Buffer.from(labels.content, 'base64');
   *   console.log(`Получены этикетки: ${labels.content_type}`);
   * }
   * ```
   */
  async getContainerLabels(
    request: DeliveryFbsGetContainerLabelsRequest,
    options?: RequestOptions
  ): Promise<DeliveryFbsGetContainerLabelsResponse> {
    return this.httpClient.request<DeliveryFbsGetContainerLabelsRequest, DeliveryFbsGetContainerLabelsResponse>(
      'POST',
      '/v2/posting/fbs/act/get-container-labels',
      request,
      options
    );
  }

  /**
   * Получить PDF c документами
   * Get PDF documents
   * 
   * С помощью метода можно получить лист отгрузки и транспортную накладную 
   * для продавцов из России, или акт и транспортную накладную для продавцов из СНГ.
   * 
   * @param request - Параметры запроса документов
   * @param options - Дополнительные опции запроса
   * @returns PDF файл с документами
   * 
   * @example
   * ```typescript
   * const documents = await deliveryFbsApi.getAct({
   *   carriage_id: 12345,
   *   doc_type: 'act'
   * });
   * 
   * if (documents.content) {
   *   // Сохранить PDF файл из base64
   *   const docBuffer = Buffer.from(documents.content, 'base64');
   *   console.log(`Получен документ: ${documents.filename}`);
   * }
   * ```
   */
  async getAct(
    request: DeliveryFbsGetActRequest,
    options?: RequestOptions
  ): Promise<DeliveryFbsGetActResponse> {
    return this.httpClient.request<DeliveryFbsGetActRequest, DeliveryFbsGetActResponse>(
      'POST',
      '/v2/posting/fbs/act/get-pdf',
      request,
      options
    );
  }

  /**
   * Список отправлений в акте
   * Get postings list in act
   * 
   * Возвращает список отправлений в акте по его идентификатору.
   * 
   * @param request - Параметры запроса отправлений
   * @param options - Дополнительные опции запроса
   * @returns Список отправлений в акте
   * 
   * @example
   * ```typescript
   * const postings = await deliveryFbsApi.getActPostings({
   *   carriage_id: 12345,
   *   limit: 100
   * });
   * 
   * postings.result?.forEach(posting => {
   *   console.log(`Отправление: ${posting.posting_number}`);
   *   console.log(`Статус: ${posting.status}`);
   * });
   * ```
   */
  async getActPostings(
    request: DeliveryFbsActGetPostingsRequest,
    options?: RequestOptions
  ): Promise<DeliveryFbsActGetPostingsResponse> {
    return this.httpClient.request<DeliveryFbsActGetPostingsRequest, DeliveryFbsActGetPostingsResponse>(
      'POST',
      '/v2/posting/fbs/act/get-postings',
      request,
      options
    );
  }

  /**
   * Список актов по отгрузкам
   * Get acts list by shipments
   * 
   * Возвращает список актов по отгрузкам с возможностью отфильтровать 
   * отгрузки по периоду, статусу и типу интеграции.
   * 
   * @param request - Параметры запроса списка актов
   * @param options - Дополнительные опции запроса
   * @returns Список актов по отгрузкам
   * 
   * @example
   * ```typescript
   * const acts = await deliveryFbsApi.getActList({
   *   filter: {
   *     since: '2024-01-01T00:00:00Z',
   *     to: '2024-01-31T23:59:59Z',
   *     status: 'confirmed'
   *   },
   *   limit: 50
   * });
   * 
   * acts.result?.forEach(act => {
   *   console.log(`Акт ${act.act_id}, отгрузка ${act.carriage_id}`);
   *   console.log(`Статус: ${act.status}, отправлений: ${act.postings_count}`);
   * });
   * ```
   */
  async getActList(
    request: DeliveryFbsActListRequest,
    options?: RequestOptions
  ): Promise<DeliveryFbsActListResponse> {
    return this.httpClient.request<DeliveryFbsActListRequest, DeliveryFbsActListResponse>(
      'POST',
      '/v2/posting/fbs/act/list',
      request,
      options
    );
  }

  // ============ Цифровые акты ============

  /**
   * Статус формирования накладной
   * Get waybill formation status
   * 
   * @param request - Параметры запроса статуса накладной
   * @param options - Дополнительные опции запроса
   * @returns Статус формирования накладной
   * 
   * @example
   * ```typescript
   * const status = await deliveryFbsApi.checkDigitalActStatus({
   *   carriage_id: 12345
   * });
   * 
   * console.log(`Статус формирования: ${status.status}`);
   * if (status.error_message) {
   *   console.log(`Ошибка: ${status.error_message}`);
   * }
   * ```
   */
  async checkDigitalActStatus(
    request: DeliveryFbsDigitalActCheckStatusRequest,
    options?: RequestOptions
  ): Promise<DeliveryFbsDigitalActCheckStatusResponse> {
    return this.httpClient.request<DeliveryFbsDigitalActCheckStatusRequest, DeliveryFbsDigitalActCheckStatusResponse>(
      'POST',
      '/v2/posting/fbs/digital/act/check-status',
      request,
      options
    );
  }

  /**
   * Получить лист отгрузки по перевозке
   * Get shipment list by carriage
   * 
   * Вы можете получить документы, если статус перевозки: 
   * FORMED, CONFIRMED или CONFIRMED_WITH_MISMATCH.
   * 
   * @param request - Параметры запроса листа отгрузки
   * @param options - Дополнительные опции запроса
   * @returns PDF файл с листом отгрузки
   * 
   * @example
   * ```typescript
   * const shipmentList = await deliveryFbsApi.getDigitalAct({
   *   carriage_id: 12345
   * });
   * 
   * if (shipmentList.content) {
   *   // Сохранить PDF файл из base64
   *   const listBuffer = Buffer.from(shipmentList.content, 'base64');
   *   console.log(`Получен лист отгрузки: ${shipmentList.filename}`);
   * }
   * ```
   */
  async getDigitalAct(
    request: DeliveryFbsGetDigitalActRequest,
    options?: RequestOptions
  ): Promise<DeliveryFbsGetDigitalActResponse> {
    return this.httpClient.request<DeliveryFbsGetDigitalActRequest, DeliveryFbsGetDigitalActResponse>(
      'POST',
      '/v2/posting/fbs/digital/act/get-pdf',
      request,
      options
    );
  }
}