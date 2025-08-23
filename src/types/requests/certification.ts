/**
 * Certification API request types
 * Generated from MCP documentation: certificationapi--chunk-001.md, certificationapi--chunk-002.md
 * Ready for manual editing and enhancements
 */

/**
 * Запрос списка сертификатов
 * Certificate list request
 */
export interface CertificateListRequest {
  /** Идентификатор товара в системе продавца — артикул, привязанный к сертификату */
  offer_id?: string;
  /** Статус сертификата */
  status?: string;
  /** Тип сертификата */
  type?: string;
  /** Страница, с которой следует выводить список. Минимальное значение — 1 */
  page: number;
  /** Количество объектов на странице. Значение — от 1 до 1000 */
  page_size: number;
  readonly [key: string]: unknown;
}

/**
 * Запрос привязки товара к сертификату
 * Certificate bind request
 */
export interface CertificateBindRequest {
  /** Идентификатор сертификата */
  certificate_id: number;
  /** Список идентификаторов товаров */
  product_id: string[];
  readonly [key: string]: unknown;
}

/**
 * Запрос создания сертификата
 * Certificate create request
 */
export interface CertificateCreateRequest {
  /** Название сертификата */
  name: string;
  /** Тип сертификата */
  type: string;
  /** Номер сертификата */
  number?: string;
  /** Дата окончания действия */
  expire_date?: string;
  /** Файлы сертификата */
  file?: string[];
  readonly [key: string]: unknown;
}

/**
 * Запрос удаления сертификатов
 * Certificate delete request
 */
export interface CertificateDeleteRequest {
  /** Список идентификаторов сертификатов для удаления */
  certificate_id: number[];
  readonly [key: string]: unknown;
}

/**
 * Запрос информации о товарах, привязанных к сертификату
 * Certificate info from list request
 */
export interface CertificateInfoFromListRequest {
  /** Идентификатор сертификата */
  certificate_id: number;
  /** Номер страницы */
  page: number;
  /** Количество элементов на странице */
  page_size: number;
  readonly [key: string]: unknown;
}

/**
 * Запрос списка причин отклонения сертификатов
 * Certificate rejection reasons list request
 */
export interface CertificateRejectionReasonsListRequest {
  readonly [key: string]: unknown;
}

/**
 * Запрос списка статусов сертификатов
 * Certificate status list request
 */
export interface CertificateStatusListRequest {
  readonly [key: string]: unknown;
}

/**
 * Запрос отвязки товара от сертификата
 * Certificate unbind request
 */
export interface CertificateUnbindRequest {
  /** Идентификатор сертификата */
  certificate_id: number;
  /** Список идентификаторов товара, которые нужно отвязать от сертификата */
  product_id: string[];
  readonly [key: string]: unknown;
}

/**
 * Запрос списка сертифицируемых категорий (v1 - устарел)
 * Product certification list request v1 (deprecated)
 * @deprecated Используйте ProductCertificationListV2Request
 */
export interface ProductCertificationListRequest {
  /** Номер страницы, возвращаемой в запросе */
  page: number;
  /** Количество элементов на странице */
  page_size: number;
  readonly [key: string]: unknown;
}

/**
 * Запрос списка сертифицируемых категорий (v2)
 * Product certification list request v2
 */
export interface ProductCertificationListV2Request {
  /** Номер страницы */
  page: number;
  /** Количество элементов на странице (от 1 до 1000) */
  page_size: number;
  readonly [key: string]: unknown;
}