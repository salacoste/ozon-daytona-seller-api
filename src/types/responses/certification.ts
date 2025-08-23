/**
 * Certification API response types
 * Generated from MCP documentation: certificationapi--chunk-001.md, certificationapi--chunk-002.md
 * Ready for manual editing and enhancements
 */

import type { BaseResponse } from '../../core/types.js';

/**
 * Информация о сертификате
 * Certificate information
 */
export interface CertificateInfo {
  /** Идентификатор сертификата */
  id: number;
  /** Название сертификата */
  name: string;
  /** Тип сертификата */
  type: string;
  /** Номер сертификата */
  number?: string;
  /** Статус сертификата */
  status: string;
  /** Дата создания */
  created_at?: string;
  /** Дата окончания действия */
  expire_date?: string;
  /** Файлы сертификата */
  files?: string[];
}

/**
 * Результат списка сертификатов
 * Certificate list result
 */
export interface CertificateListResult {
  /** Список сертификатов */
  certificates: CertificateInfo[];
  /** Общее количество сертификатов */
  total: number;
}

/**
 * Ответ списка сертификатов
 * Certificate list response
 */
export interface CertificateListResponse extends BaseResponse {
  /** Результат запроса */
  result?: CertificateListResult;
  readonly [key: string]: unknown;
}

/**
 * Результат привязки товара к сертификату
 * Certificate bind result item
 */
export interface CertificateBindResultItem {
  /** Идентификатор товара */
  product_id: string;
  /** Статус операции */
  status: string;
  /** Сообщение об ошибке (если есть) */
  error?: string;
}

/**
 * Ответ привязки товара к сертификату
 * Certificate bind response
 */
export interface CertificateBindResponse extends BaseResponse {
  /** Результат операции */
  result?: CertificateBindResultItem[];
  readonly [key: string]: unknown;
}

/**
 * Ответ создания сертификата
 * Certificate create response
 */
export interface CertificateCreateResponse extends BaseResponse {
  /** Идентификатор созданного сертификата */
  certificate_id?: number;
  readonly [key: string]: unknown;
}

/**
 * Результат удаления сертификата
 * Certificate delete result item
 */
export interface CertificateDeleteResultItem {
  /** Идентификатор сертификата */
  certificate_id: number;
  /** Статус операции */
  status: string;
  /** Сообщение об ошибке (если есть) */
  error?: string;
}

/**
 * Ответ удаления сертификатов
 * Certificate delete response
 */
export interface CertificateDeleteResponse extends BaseResponse {
  /** Результат операции */
  result?: CertificateDeleteResultItem[];
  readonly [key: string]: unknown;
}

/**
 * Информация о товаре, привязанном к сертификату
 * Product info from certificate
 */
export interface ProductInfoFromCertificate {
  /** Идентификатор товара */
  product_id: string;
  /** Артикул продавца */
  offer_id: string;
  /** Название товара */
  name: string;
  /** Статус привязки */
  status: string;
}

/**
 * Результат информации о товарах сертификата
 * Certificate info from list result
 */
export interface CertificateInfoFromListResult {
  /** Список товаров */
  products: ProductInfoFromCertificate[];
  /** Общее количество товаров */
  total: number;
}

/**
 * Ответ информации о товарах, привязанных к сертификату
 * Certificate info from list response
 */
export interface CertificateInfoFromListResponse extends BaseResponse {
  /** Результат запроса */
  result?: CertificateInfoFromListResult;
  readonly [key: string]: unknown;
}

/**
 * Причина отклонения сертификата
 * Certificate rejection reason
 */
export interface CertificateRejectionReason {
  /** Код причины */
  code: string;
  /** Название причины */
  name: string;
}

/**
 * Ответ списка причин отклонения сертификатов
 * Certificate rejection reasons list response
 */
export interface CertificateRejectionReasonsListResponse extends BaseResponse {
  /** Список причин отклонения */
  result?: CertificateRejectionReason[];
  readonly [key: string]: unknown;
}

/**
 * Статус сертификата
 * Certificate status
 */
export interface CertificateStatus {
  /** Код статуса */
  code: string;
  /** Название статуса */
  name: string;
}

/**
 * Ответ списка статусов сертификатов
 * Certificate status list response
 */
export interface CertificateStatusListResponse extends BaseResponse {
  /** Список статусов сертификатов */
  result?: CertificateStatus[];
  readonly [key: string]: unknown;
}

/**
 * Тип сертификата
 * Certificate type
 */
export interface CertificateType {
  /** Код типа */
  code: string;
  /** Название типа */
  name: string;
  /** Описание */
  description?: string;
}

/**
 * Ответ справочника типов документов
 * Product certificate types response
 */
export interface ProductCertificateTypesResponse extends BaseResponse {
  /** Список типов и названий сертификатов */
  result?: CertificateType[];
  readonly [key: string]: unknown;
}

/**
 * Результат отвязки товара от сертификата
 * Certificate unbind result item
 */
export interface CertificateUnbindResultItem {
  /** Идентификатор товара */
  product_id: string;
  /** Статус операции */
  status: string;
  /** Сообщение об ошибке (если есть) */
  error?: string;
}

/**
 * Ответ отвязки товара от сертификата
 * Certificate unbind response
 */
export interface CertificateUnbindResponse extends BaseResponse {
  /** Результат операции */
  result?: CertificateUnbindResultItem[];
  readonly [key: string]: unknown;
}

/**
 * Информация о сертифицируемой категории
 * Product certification category info
 */
export interface ProductCertificationInfo {
  /** Идентификатор категории */
  category_id: number;
  /** Название категории */
  category_name: string;
  /** Требует ли сертификацию */
  has_certificate: boolean;
  /** Тип требуемого сертификата */
  certificate_type?: string;
}

/**
 * Результат списка сертифицируемых категорий (v1)
 * Product certification list result v1
 */
export interface ProductCertificationListResult {
  /** Список категорий */
  certification: ProductCertificationInfo[];
  /** Общее количество категорий */
  total: number;
}

/**
 * Ответ списка сертифицируемых категорий (v1 - устарел)
 * Product certification list response v1 (deprecated)
 * @deprecated Используйте ProductCertificationListV2Response
 */
export interface ProductCertificationListResponse extends BaseResponse {
  /** Результат запроса */
  result?: ProductCertificationListResult;
  readonly [key: string]: unknown;
}

/**
 * Тип соответствия требованиям
 * Certificate accordance type
 */
export interface CertificateAccordanceType {
  /** Идентификатор типа */
  id: number;
  /** Название типа */
  name: string;
  /** Код типа */
  code: string;
}

/**
 * Результат списка типов соответствия (v2)
 * Certificate accordance types result v2
 */
export interface CertificateAccordanceTypesResult {
  /** Список типов соответствия */
  accordance_types: CertificateAccordanceType[];
}

/**
 * Ответ списка типов соответствия требованиям (версия 2)
 * Certificate accordance types response v2
 */
export interface CertificateAccordanceTypesResponse extends BaseResponse {
  /** Результат запроса */
  result?: CertificateAccordanceTypesResult;
  readonly [key: string]: unknown;
}

/**
 * Информация о сертифицируемой категории (v2)
 * Product certification category info v2
 */
export interface ProductCertificationInfoV2 {
  /** Идентификатор категории */
  category_id: number;
  /** Название категории */
  category_name: string;
  /** Требует ли сертификацию */
  has_certificate: boolean;
  /** Тип требуемого сертификата */
  certificate_type?: string;
  /** Дополнительные требования */
  requirements?: string[];
}

/**
 * Ответ списка сертифицируемых категорий (v2)
 * Product certification list response v2
 */
export interface ProductCertificationListV2Response extends BaseResponse {
  /** Информация о сертифицируемых категориях */
  certification?: ProductCertificationInfoV2[];
  /** Всего категорий */
  total?: number;
  readonly [key: string]: unknown;
}