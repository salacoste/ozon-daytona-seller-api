/**
 * Certification API implementation
 * Generated from MCP documentation: certificationapi--chunk-001.md, certificationapi--chunk-002.md
 * Handles product certification and document management
 */

import { HttpClient } from '../../core/http.js';
import type { RequestOptions } from '../../core/types.js';
import type {
  CertificateListRequest,
  CertificateBindRequest,
  CertificateCreateRequest,
  CertificateDeleteRequest,
  CertificateInfoRequest,
  CertificateProductsListRequest,
  ProductStatusListRequest,
  CertificateRejectionReasonsListRequest,
  CertificateStatusListRequest,
  CertificateUnbindRequest,
  ProductCertificationListRequest,
  ProductCertificationListV2Request,
} from '../../types/requests/certification.js';
import type {
  CertificateListResponse,
  CertificateBindResponse,
  CertificateCreateResponse,
  CertificateDeleteResponse,
  CertificateInfoResponse,
  CertificateProductsListResponse,
  ProductStatusListResponse,
  CertificateRejectionReasonsListResponse,
  CertificateStatusListResponse,
  ProductCertificateTypesResponse,
  CertificateUnbindResponse,
  ProductCertificationListResponse,
  CertificateAccordanceTypesResponse,
  CertificateAccordanceTypesV1Response,
  ProductCertificationListV2Response,
} from '../../types/responses/certification.js';

/**
 * Certification API для управления сертификатами и документами
 * Certification API for certificate and document management
 * 
 * @example
 * ```typescript
 * // Получить список сертификатов
 * const certificates = await certificationApi.getCertificateList({
 *   page: 1,
 *   page_size: 50
 * });
 * 
 * // Привязать товар к сертификату
 * await certificationApi.bindCertificate({
 *   certificate_id: 12345,
 *   product_id: ['product-1', 'product-2']
 * });
 * ```
 */
export class CertificationApi {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Получить список сертификатов
   * Get certificate list
   * 
   * Возвращает список сертификатов продавца с возможностью фильтрации по различным параметрам.
   * 
   * @param request - Параметры запроса списка сертификатов
   * @param options - Дополнительные опции запроса
   * @returns Список сертификатов с информацией о типе, статусе и сроке действия
   * 
   * @example
   * ```typescript
   * const certificates = await certificationApi.getCertificateList({
   *   page: 1,
   *   page_size: 100,
   *   status: 'ACTIVE',
   *   type: 'CERTIFICATE'
   * });
   * 
   * console.log(`Найдено сертификатов: ${certificates.result?.total}`);
   * certificates.result?.certificates.forEach(cert => {
   *   console.log(`${cert.name} (${cert.status}) - истекает ${cert.expire_date}`);
   * });
   * ```
   */
  async getCertificateList(
    request: CertificateListRequest,
    options?: RequestOptions
  ): Promise<CertificateListResponse> {
    return this.httpClient.request<CertificateListRequest, CertificateListResponse>(
      'POST',
      '/v1/product/certificate/list',
      request,
      options
    );
  }

  /**
   * Привязать товар к сертификату
   * Bind product to certificate
   * 
   * Привязывает один или несколько товаров к существующему сертификату.
   * 
   * @param request - Параметры привязки товара к сертификату
   * @param options - Дополнительные опции запроса
   * @returns Результат операции привязки для каждого товара
   * 
   * @example
   * ```typescript
   * const result = await certificationApi.bindCertificate({
   *   certificate_id: 12345,
   *   product_id: ['product-1', 'product-2', 'product-3']
   * });
   * 
   * result.result?.forEach(item => {
   *   if (item.status === 'success') {
   *     console.log(`Товар ${item.product_id} успешно привязан`);
   *   } else {
   *     console.error(`Ошибка привязки ${item.product_id}: ${item.error}`);
   *   }
   * });
   * ```
   */
  async bindCertificate(
    request: CertificateBindRequest,
    options?: RequestOptions
  ): Promise<CertificateBindResponse> {
    return this.httpClient.request<CertificateBindRequest, CertificateBindResponse>(
      'POST',
      '/v1/product/certificate/bind',
      request,
      options
    );
  }

  /**
   * Создать сертификат
   * Create certificate
   * 
   * Создает новый сертификат с указанными параметрами и файлами.
   * 
   * @param request - Параметры создания сертификата
   * @param options - Дополнительные опции запроса
   * @returns Идентификатор созданного сертификата
   * 
   * @example
   * ```typescript
   * const newCert = await certificationApi.createCertificate({
   *   name: 'Сертификат соответствия ГОСТ',
   *   type_code: 'GOST_CERTIFICATE',
   *   number: 'РОСС RU.АИ37.H00124',
   *   issue_date: '2025-08-21T00:00:00Z',
   *   files: ['base64_file_content_1', 'base64_file_content_2']
   * });
   * 
   * console.log(`Создан сертификат с ID: ${newCert.id}`);
   * ```
   */
  async createCertificate(
    request: CertificateCreateRequest,
    options?: RequestOptions
  ): Promise<CertificateCreateResponse> {
    return this.httpClient.request<CertificateCreateRequest, CertificateCreateResponse>(
      'POST',
      '/v1/product/certificate/create',
      request,
      options
    );
  }

  /**
   * Удалить сертификаты
   * Delete certificates
   * 
   * Удаляет один или несколько сертификатов по идентификаторам.
   * 
   * @param request - Параметры удаления сертификатов
   * @param options - Дополнительные опции запроса
   * @returns Результат операции удаления для каждого сертификата
   * 
   * @example
   * ```typescript
   * const result = await certificationApi.deleteCertificates({
   *   certificate_id: [12345, 12346, 12347]
   * });
   * 
   * result.result?.forEach(item => {
   *   if (item.status === 'success') {
   *     console.log(`Сертификат ${item.certificate_id} успешно удален`);
   *   } else {
   *     console.error(`Ошибка удаления ${item.certificate_id}: ${item.error}`);
   *   }
   * });
   * ```
   */
  async deleteCertificates(
    request: CertificateDeleteRequest,
    options?: RequestOptions
  ): Promise<CertificateDeleteResponse> {
    return this.httpClient.request<CertificateDeleteRequest, CertificateDeleteResponse>(
      'POST',
      '/v1/product/certificate/delete',
      request,
      options
    );
  }

  /**
   * Получить информацию о сертификате
   * Get certificate info
   * 
   * Возвращает детальную информацию о сертификате по его идентификатору.
   * 
   * @param request - Параметры запроса информации о сертификате
   * @param options - Дополнительные опции запроса
   * @returns Информация о сертификате
   * 
   * @example
   * ```typescript
   * const certInfo = await certificationApi.getCertificateInfo({
   *   certificate_id: 12345
   * });
   * 
   * console.log(`Сертификат: ${certInfo.result?.name}`);
   * console.log(`Статус: ${certInfo.result?.status}`);
   * console.log(`Номер: ${certInfo.result?.number}`);
   * ```
   */
  async getCertificateInfo(
    request: CertificateInfoRequest,
    options?: RequestOptions
  ): Promise<CertificateInfoResponse> {
    return this.httpClient.request<CertificateInfoRequest, CertificateInfoResponse>(
      'POST',
      '/v1/product/certificate/info',
      request,
      options
    );
  }

  /**
   * Получить список товаров, привязанных к сертификату
   * Get certificate products list
   * 
   * Возвращает список товаров, которые привязаны к указанному сертификату.
   * 
   * @param request - Параметры запроса списка товаров
   * @param options - Дополнительные опции запроса
   * @returns Список товаров, привязанных к сертификату
   * 
   * @example
   * ```typescript
   * const products = await certificationApi.getCertificateProductsList({
   *   certificate_id: 12345,
   *   page: 1,
   *   page_size: 50
   * });
   * 
   * console.log(`К сертификату привязано товаров: ${products.result?.total}`);
   * products.result?.products.forEach(product => {
   *   console.log(`${product.name} (${product.offer_id}) - ${product.status}`);
   * });
   * ```
   */
  async getCertificateProductsList(
    request: CertificateProductsListRequest,
    options?: RequestOptions
  ): Promise<CertificateProductsListResponse> {
    return this.httpClient.request<CertificateProductsListRequest, CertificateProductsListResponse>(
      'POST',
      '/v1/product/certificate/products/list',
      request,
      options
    );
  }

  /**
   * Получить список возможных статусов товаров
   * Get product status list
   * 
   * Возвращает список возможных статусов товаров при их привязке к сертификату.
   * 
   * @param request - Параметры запроса (пустой объект)
   * @param options - Дополнительные опции запроса
   * @returns Список возможных статусов товаров
   * 
   * @example
   * ```typescript
   * const statuses = await certificationApi.getProductStatusList();
   * 
   * console.log('Возможные статусы товаров:');
   * statuses.result?.forEach(status => {
   *   console.log(`${status.code}: ${status.name}`);
   * });
   * ```
   */
  async getProductStatusList(
    request?: ProductStatusListRequest,
    options?: RequestOptions
  ): Promise<ProductStatusListResponse> {
    return this.httpClient.request<ProductStatusListRequest, ProductStatusListResponse>(
      'POST',
      '/v1/product/certificate/product_status/list',
      request ?? {},
      options
    );
  }

  /**
   * Получить возможные причины отклонения сертификата
   * Get certificate rejection reasons
   * 
   * Возвращает справочник причин, по которым сертификаты могут быть отклонены.
   * 
   * @param request - Параметры запроса (пустой объект)
   * @param options - Дополнительные опции запроса
   * @returns Список возможных причин отклонения
   * 
   * @example
   * ```typescript
   * const reasons = await certificationApi.getRejectionReasons();
   * 
   * console.log('Возможные причины отклонения:');
   * reasons.result?.forEach(reason => {
   *   console.log(`${reason.code}: ${reason.name}`);
   * });
   * ```
   */
  async getRejectionReasons(
    request?: CertificateRejectionReasonsListRequest,
    options?: RequestOptions
  ): Promise<CertificateRejectionReasonsListResponse> {
    return this.httpClient.request<CertificateRejectionReasonsListRequest, CertificateRejectionReasonsListResponse>(
      'POST',
      '/v1/product/certificate/rejection_reasons/list',
      request ?? {},
      options
    );
  }

  /**
   * Получить возможные статусы сертификатов
   * Get certificate statuses
   * 
   * Возвращает справочник всех возможных статусов сертификатов.
   * 
   * @param request - Параметры запроса (пустой объект)
   * @param options - Дополнительные опции запроса
   * @returns Список возможных статусов сертификатов
   * 
   * @example
   * ```typescript
   * const statuses = await certificationApi.getCertificateStatuses();
   * 
   * console.log('Возможные статусы сертификатов:');
   * statuses.result?.forEach(status => {
   *   console.log(`${status.code}: ${status.name}`);
   * });
   * ```
   */
  async getCertificateStatuses(
    request?: CertificateStatusListRequest,
    options?: RequestOptions
  ): Promise<CertificateStatusListResponse> {
    return this.httpClient.request<CertificateStatusListRequest, CertificateStatusListResponse>(
      'POST',
      '/v1/product/certificate/status/list',
      request ?? {},
      options
    );
  }

  /**
   * Получить справочник типов документов
   * Get certificate types
   * 
   * Возвращает справочник всех типов сертификатов и документов, которые можно загружать.
   * 
   * @param options - Дополнительные опции запроса
   * @returns Список типов и названий сертификатов
   * 
   * @example
   * ```typescript
   * const types = await certificationApi.getCertificateTypes();
   * 
   * console.log('Доступные типы сертификатов:');
   * types.result?.forEach(type => {
   *   console.log(`${type.code}: ${type.name}`);
   *   if (type.description) {
   *     console.log(`  Описание: ${type.description}`);
   *   }
   * });
   * ```
   */
  async getCertificateTypes(
    options?: RequestOptions
  ): Promise<ProductCertificateTypesResponse> {
    return this.httpClient.request<Record<string, never>, ProductCertificateTypesResponse>(
      'GET',
      '/v1/product/certificate/types',
      {} as Record<string, never>,
      options
    );
  }

  /**
   * Отвязать товар от сертификата
   * Unbind product from certificate
   * 
   * Отвязывает один или несколько товаров от указанного сертификата.
   * 
   * @param request - Параметры отвязки товара от сертификата
   * @param options - Дополнительные опции запроса
   * @returns Результат операции отвязки для каждого товара
   * 
   * @example
   * ```typescript
   * const result = await certificationApi.unbindCertificate({
   *   certificate_id: 12345,
   *   product_id: ['product-1', 'product-2']
   * });
   * 
   * result.result?.forEach(item => {
   *   if (item.status === 'success') {
   *     console.log(`Товар ${item.product_id} успешно отвязан`);
   *   } else {
   *     console.error(`Ошибка отвязки ${item.product_id}: ${item.error}`);
   *   }
   * });
   * ```
   */
  async unbindCertificate(
    request: CertificateUnbindRequest,
    options?: RequestOptions
  ): Promise<CertificateUnbindResponse> {
    return this.httpClient.request<CertificateUnbindRequest, CertificateUnbindResponse>(
      'POST',
      '/v1/product/certificate/unbind',
      request,
      options
    );
  }

  /**
   * Получить список сертифицируемых категорий (v1 - устарел)
   * Get product certification list v1 (deprecated)
   * 
   * @deprecated 14 апреля 2025 года метод будет отключён. Используйте getProductCertificationListV2
   * 
   * Возвращает список категорий товаров, которые требуют сертификацию.
   * 
   * @param request - Параметры запроса списка категорий
   * @param options - Дополнительные опции запроса
   * @returns Список сертифицируемых категорий
   */
  async getProductCertificationList(
    request: ProductCertificationListRequest,
    options?: RequestOptions
  ): Promise<ProductCertificationListResponse> {
    return this.httpClient.request<ProductCertificationListRequest, ProductCertificationListResponse>(
      'POST',
      '/v1/product/certification/list',
      request,
      options
    );
  }

  /**
   * Получить список типов соответствия требованиям (версия 1)
   * Get certificate accordance types v1
   * 
   * Возвращает список типов соответствия требованиям для сертификации (версия 1).
   * 
   * @param options - Дополнительные опции запроса
   * @returns Список типов соответствия требованиям
   * 
   * @example
   * ```typescript
   * const accordanceTypesV1 = await certificationApi.getCertificateAccordanceTypesV1();
   * 
   * console.log('Доступные типы соответствия (v1):');
   * accordanceTypesV1.result?.forEach(type => {
   *   console.log(`${type.code}: ${type.name}`);
   * });
   * ```
   */
  async getCertificateAccordanceTypesV1(
    options?: RequestOptions
  ): Promise<CertificateAccordanceTypesV1Response> {
    return this.httpClient.request<Record<string, never>, CertificateAccordanceTypesV1Response>(
      'GET',
      '/v1/product/certificate/accordance-types',
      {} as Record<string, never>,
      options
    );
  }

  /**
   * Получить список типов соответствия требованиям (версия 2)
   * Get certificate accordance types v2
   * 
   * Возвращает список типов соответствия требованиям для сертификации.
   * 
   * @param options - Дополнительные опции запроса
   * @returns Список типов соответствия требованиям
   * 
   * @example
   * ```typescript
   * const accordanceTypes = await certificationApi.getCertificateAccordanceTypesV2();
   * 
   * console.log('Доступные типы соответствия:');
   * accordanceTypes.result?.accordance_types.forEach(type => {
   *   console.log(`${type.code}: ${type.name} (ID: ${type.id})`);
   * });
   * ```
   */
  async getCertificateAccordanceTypesV2(
    options?: RequestOptions
  ): Promise<CertificateAccordanceTypesResponse> {
    return this.httpClient.request<Record<string, never>, CertificateAccordanceTypesResponse>(
      'GET',
      '/v2/product/certificate/accordance-types/list',
      {} as Record<string, never>,
      options
    );
  }

  /**
   * Получить список сертифицируемых категорий (версия 2)
   * Get product certification list v2
   * 
   * Возвращает список категорий товаров, которые требуют сертификацию.
   * Рекомендуется использовать этот метод вместо устаревшей версии v1.
   * 
   * @param request - Параметры запроса списка категорий
   * @param options - Дополнительные опции запроса
   * @returns Список сертифицируемых категорий с дополнительной информацией
   * 
   * @example
   * ```typescript
   * const certifications = await certificationApi.getProductCertificationListV2({
   *   page: 1,
   *   page_size: 100
   * });
   * 
   * console.log(`Всего категорий: ${certifications.total}`);
   * certifications.certification?.forEach(category => {
   *   if (category.has_certificate) {
   *     console.log(`${category.category_name} требует сертификацию типа: ${category.certificate_type}`);
   *   }
   * });
   * ```
   */
  async getProductCertificationListV2(
    request: ProductCertificationListV2Request,
    options?: RequestOptions
  ): Promise<ProductCertificationListV2Response> {
    // Валидация параметров согласно API
    if (!request.page || request.page < 1) {
      throw new Error('Parameter "page" is required and must be >= 1');
    }
    if (!request.page_size || request.page_size < 1 || request.page_size > 1000) {
      throw new Error('Parameter "page_size" must be between 1 and 1000');
    }

    return this.httpClient.request<ProductCertificationListV2Request, ProductCertificationListV2Response>(
      'POST',
      '/v2/product/certification/list',
      request,
      options
    );
  }
}