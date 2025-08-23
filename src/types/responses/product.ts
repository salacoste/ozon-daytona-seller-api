/**
 * Product API response types
 * Manually implemented for type safety
 * Ready for manual editing and enhancements
 */

import type { ProductId } from '../common/base.js';

/**
 * Элемент списка товаров
 * Product list item
 */
export interface ProductListItem {
  /** Идентификатор товара в системе Ozon */
  product_id?: ProductId;
  /** Идентификатор товара в системе продавца */
  offer_id?: string;
  /** Название товара */
  name?: string;
  /** Цена товара */
  price?: string;
  /** Старая цена товара */
  old_price?: string;
  /** SKU товара */
  sku?: number;
  /** Статус товара */
  state?: string;
  /** Статус видимости */
  visible?: boolean;
  /** Дата создания */
  created_at?: string;
  /** Дата обновления */
  updated_at?: string;
  /** Количество на складе */
  stocks?: {
    /** Резерв */
    reserved?: number;
    /** В наличии */
    present?: number;
    /** Тип склада */
    type?: string;
  }[];
}

/**
 * Ответ списка товаров
 * Get product list response
 */
export interface GetProductListResponse {
  /** Результат запроса */
  result?: {
    /** Список товаров */
    items?: ProductListItem[];
    /** Общее количество товаров */
    total?: number;
    /** Идентификатор последней записи */
    last_id?: string;
  };
  readonly [key: string]: unknown;
}

/**
 * Остаток товара на складе
 * Product stock item
 */
export interface ProductStockItem {
  /** Идентификатор товара в системе Ozon */
  product_id?: ProductId;
  /** Идентификатор товара в системе продавца */
  offer_id?: string;
  /** Остатки товара */
  stocks?: Array<{
    /** Тип склада */
    type?: 'fbo' | 'fbs';
    /** В наличии */
    present?: number;
    /** Резерв */
    reserved?: number;
  }>;
}

/**
 * Ответ остатков товаров
 * Get product stocks response
 */
export interface GetProductStocksResponse {
  /** Результат запроса */
  result?: {
    /** Список товаров с остатками */
    items?: ProductStockItem[];
    /** Общее количество товаров */
    total?: number;
    /** Идентификатор последней записи */
    last_id?: string;
  };
  readonly [key: string]: unknown;
}

/**
 * Цена товара
 * Product price item
 */
export interface ProductPriceItem {
  /** Идентификатор товара в системе Ozon */
  product_id?: ProductId;
  /** Идентификатор товара в системе продавца */
  offer_id?: string;
  /** Цена товара */
  price?: {
    /** Цена */
    price?: string;
    /** Старая цена */
    old_price?: string;
    /** Цена Premium */
    premium_price?: string;
    /** Рекомендованная цена */
    recommended_price?: string;
    /** Валюта */
    currency_code?: string;
  };
  /** Ошибки валидации цены */
  price_errors?: string[];
}

/**
 * Ответ цен товаров
 * Get product prices response
 */
export interface GetProductPricesResponse {
  /** Результат запроса */
  result?: {
    /** Список товаров с ценами */
    items?: ProductPriceItem[];
    /** Общее количество товаров */
    total?: number;
    /** Идентификатор последней записи */
    last_id?: string;
  };
  readonly [key: string]: unknown;
}

/**
 * Значение атрибута товара
 * Product attribute value
 */
export interface ProductAttributeValue {
  /** Словарное значение атрибута */
  dictionary_value_id?: number;
  /** Значение атрибута */
  value?: string;
}

/**
 * Атрибут товара
 * Product attribute
 */
export interface ProductAttributeItem {
  /** Идентификатор атрибута */
  attribute_id?: number;
  /** Идентификатор характеристики */
  complex_id?: number;
  /** Значения атрибута */
  values?: ProductAttributeValue[];
}

/**
 * Товар с атрибутами
 * Product with attributes
 */
export interface ProductWithAttributes {
  /** Идентификатор товара в системе Ozon */
  product_id?: ProductId;
  /** Идентификатор товара в системе продавца */
  offer_id?: string;
  /** Атрибуты товара */
  attributes?: ProductAttributeItem[];
}

/**
 * Ответ атрибутов товаров
 * Get product attributes response
 */
export interface GetProductAttributesResponse {
  /** Результат запроса */
  result?: {
    /** Список товаров с атрибутами */
    items?: ProductWithAttributes[];
    /** Общее количество товаров */
    total?: number;
    /** Идентификатор последней записи */
    last_id?: string;
  };
  readonly [key: string]: unknown;
}

/**
 * Результат импорта товара
 * Import product result
 */
export interface ImportProductResult {
  /** Идентификатор товара в системе продавца */
  offer_id?: string;
  /** Идентификатор товара в системе Ozon */
  product_id?: ProductId;
  /** Статус импорта */
  status?: string;
  /** Ошибки импорта */
  errors?: string[];
}

/**
 * Ответ импорта товаров
 * Import products response
 */
export interface ImportProductsResponse {
  /** Результат запроса */
  result?: {
    /** Идентификатор задачи */
    task_id?: string;
  };
  readonly [key: string]: unknown;
}

/**
 * Ответ статуса импорта товаров
 * Import products status response
 */
export interface ImportProductsStatusResponse {
  /** Результат запроса */
  result?: {
    /** Список товаров с результатами импорта */
    items?: ImportProductResult[];
    /** Общее количество товаров */
    total?: number;
  };
  readonly [key: string]: unknown;
}

/**
 * Тип сертификата
 * Certificate type
 */
export interface CertificateType {
  /** Идентификатор типа сертификата */
  id?: number;
  /** Название типа сертификата */
  name?: string;
  /** Является ли обязательным */
  is_required?: boolean;
}

/**
 * Ответ типов сертификатов
 * Get certificate types response
 */
export interface GetCertificateTypesResponse {
  /** Результат запроса */
  result?: {
    /** Список типов сертификатов */
    certificate_types?: CertificateType[];
  };
  readonly [key: string]: unknown;
}

/**
 * Информация о товаре со скидкой
 * Discounted product info
 */
export interface DiscountedProductInfo {
  /** Идентификатор товара в системе Ozon */
  product_id?: ProductId;
  /** Идентификатор товара в системе продавца */
  offer_id?: string;
  /** Тип скидки */
  discount_type?: string;
  /** Размер скидки */
  discount_value?: string;
  /** Цена со скидкой */
  discounted_price?: string;
  /** Обычная цена */
  price?: string;
}

/**
 * Ответ информации о товарах со скидкой
 * Get discounted products info response
 */
export interface GetDiscountedProductsResponse {
  /** Результат запроса */
  result?: {
    /** Список товаров со скидками */
    items?: DiscountedProductInfo[];
    /** Общее количество товаров */
    total?: number;
    /** Идентификатор последней записи */
    last_id?: string;
  };
  readonly [key: string]: unknown;
}

// === НОВЫЕ МЕТОДЫ ===

/**
 * Описание товара
 * Product description
 */
export interface ProductDescription {
  /** Идентификатор товара в системе Ozon */
  product_id?: ProductId;
  /** Идентификатор товара в системе продавца */
  offer_id?: string;
  /** Описание товара */
  description?: string;
  /** Название товара */
  name?: string;
  /** Характеристики товара */
  attributes?: Array<{
    /** Идентификатор атрибута */
    attribute_id?: number;
    /** Название атрибута */
    attribute_name?: string;
    /** Значения атрибута */
    values?: Array<{
      /** Словарное значение */
      dictionary_value_id?: number;
      /** Текстовое значение */
      value?: string;
    }>;
  }>;
}

/**
 * Ответ описания товара
 * Get product description response
 */
export interface GetProductInfoDescriptionResponse {
  /** Результат запроса */
  result?: ProductDescription;
  readonly [key: string]: unknown;
}

/**
 * Информация о подписках на товар
 * Product subscription info
 */
export interface ProductSubscriptionInfo {
  /** SKU товара */
  sku?: string;
  /** Количество подписавшихся */
  count?: number;
}

/**
 * Ответ количества подписавшихся на товар
 * Get product subscription info response
 */
export interface GetProductInfoSubscriptionResponse {
  /** Список товаров с количеством подписок */
  result?: ProductSubscriptionInfo[];
  readonly [key: string]: unknown;
}

/**
 * Результат импорта изображений
 * Product import pictures result
 */
export interface ProductImportPicturesResult {
  /** Статус операции */
  status?: string;
  /** Сообщение об ошибке */
  message?: string;
  /** Количество загруженных изображений */
  uploaded_count?: number;
}

/**
 * Ответ импорта изображений товара
 * Product import pictures response
 */
export interface ProductImportPicturesResponse {
  /** Результат операции */
  result?: ProductImportPicturesResult;
  readonly [key: string]: unknown;
}

/**
 * Изображения товара
 * Product pictures
 */
export interface ProductPicturesItem {
  /** Идентификатор товара в системе Ozon */
  product_id?: ProductId;
  /** Идентификатор товара в системе продавца */
  offer_id?: string;
  /** Массив изображений */
  images?: Array<{
    /** URL изображения */
    file_name?: string;
    /** Порядок изображения */
    index?: number;
  }>;
  /** Изображения 360 */
  images360?: Array<{
    /** URL изображения */
    file_name?: string;
    /** Порядок изображения */
    index?: number;
  }>;
  /** Маркетинговый цвет */
  color_image?: string;
}

/**
 * Ответ получения изображений товаров
 * Get product pictures response
 */
export interface GetProductPicturesResponse {
  /** Список товаров с изображениями */
  items?: ProductPicturesItem[];
  readonly [key: string]: unknown;
}

/**
 * Контент-рейтинг товара
 * Product content rating
 */
export interface ProductRatingInfo {
  /** SKU товара */
  sku?: string;
  /** Рейтинг контента */
  rating?: number;
  /** Максимальный рейтинг */
  rating_max?: number;
  /** Рекомендации по улучшению */
  recommendations?: Array<{
    /** Тип рекомендации */
    type?: string;
    /** Описание рекомендации */
    description?: string;
    /** Влияние на рейтинг */
    impact?: number;
  }>;
}

/**
 * Ответ контент-рейтинга товаров по SKU
 * Get product rating by SKU response
 */
export interface GetProductRatingBySkuResponse {
  /** Список товаров с рейтингами */
  products?: ProductRatingInfo[];
  readonly [key: string]: unknown;
}

/**
 * Связанные SKU
 * Related SKU info
 */
export interface RelatedSKUItem {
  /** Исходный SKU */
  sku?: string;
  /** Связанные SKU */
  related_skus?: string[];
  /** Ошибки */
  errors?: Array<{
    /** Код ошибки */
    code?: string;
    /** Сообщение об ошибке */
    message?: string;
  }>;
}

/**
 * Ответ связанных SKU
 * Get related SKU response
 */
export interface GetRelatedSKUResponse {
  /** Список связанных SKU */
  items?: RelatedSKUItem[];
  /** Ошибки */
  errors?: Array<{
    /** Код ошибки */
    code?: string;
    /** Сообщение об ошибке */
    message?: string;
  }>;
  readonly [key: string]: unknown;
}

/**
 * Результат обновления артикулов
 * Update offer ID result
 */
export interface UpdateOfferIdResult {
  /** Статус операции */
  status?: string;
  /** Список ошибок */
  errors?: Array<{
    /** Старый offer_id */
    offer_id?: string;
    /** Код ошибки */
    error_code?: string;
    /** Сообщение об ошибке */
    error_message?: string;
  }>;
  /** Количество успешно обновленных */
  updated_count?: number;
}

/**
 * Ответ обновления артикулов товаров
 * Update offer ID response
 */
export interface UpdateOfferIdResponse {
  /** Результат операции */
  result?: UpdateOfferIdResult;
  readonly [key: string]: unknown;
}

/**
 * Результат удаления товаров
 * Delete products result
 */
export interface DeleteProductsResult {
  /** Статус операции */
  status?: string;
  /** Список удаленных товаров */
  deleted_products?: Array<{
    /** Артикул товара */
    offer_id?: string;
    /** Статус удаления */
    deleted?: boolean;
  }>;
  /** Ошибки */
  errors?: Array<{
    /** Артикул товара */
    offer_id?: string;
    /** Код ошибки */
    error_code?: string;
    /** Сообщение об ошибке */
    error_message?: string;
  }>;
}

/**
 * Ответ удаления товаров без SKU
 * Delete products response
 */
export interface DeleteProductsResponse {
  /** Результат операции */
  result?: DeleteProductsResult;
  readonly [key: string]: unknown;
}

/**
 * Результат создания/обновления товара
 * Import products v3 result
 */
export interface ImportProductsV3Result {
  /** Идентификатор задачи */
  task_id?: string;
  /** Ошибки валидации */
  validation_errors?: Array<{
    /** Артикул товара */
    offer_id?: string;
    /** Список ошибок */
    errors?: Array<{
      /** Код ошибки */
      code?: string;
      /** Сообщение об ошибке */
      message?: string;
      /** Поле с ошибкой */
      field?: string;
    }>;
  }>;
}

/**
 * Ответ создания/обновления товара v3
 * Import products v3 response
 */
export interface ImportProductsV3Response {
  /** Результат операции */
  result?: ImportProductsV3Result;
  readonly [key: string]: unknown;
}

/**
 * Информация о товаре v3
 * Product info v3
 */
export interface ProductInfoV3Item {
  /** Идентификатор товара в системе Ozon */
  id?: ProductId;
  /** Идентификатор товара в системе продавца */
  offer_id?: string;
  /** SKU товара */
  sku?: number;
  /** Название товара */
  name?: string;
  /** Описание товара */
  description?: string;
  /** Категория */
  category_id?: number;
  /** Статус товара */
  state?: string;
  /** Название статуса */
  state_name?: string;
  /** Описание статуса */
  state_description?: string;
  /** Видимость для FBO */
  is_fbo_visible?: boolean;
  /** Видимость для FBS */
  is_fbs_visible?: boolean;
  /** Архивность */
  archived?: boolean;
  /** Наличие скидки */
  is_discounted?: boolean;
  /** Изображения */
  images?: Array<{
    /** URL изображения */
    file_name?: string;
    /** Порядок изображения */
    index?: number;
  }>;
  /** Цена */
  price?: string;
  /** Старая цена */
  old_price?: string;
  /** Валюта */
  currency_code?: string;
  /** Штрихкод */
  barcode?: string;
  /** Вес */
  weight?: number;
  /** Размеры */
  dimensions?: {
    /** Ширина */
    width?: number;
    /** Высота */
    height?: number;
    /** Глубина */
    depth?: number;
  };
  /** Атрибуты */
  attributes?: Array<{
    /** Идентификатор атрибута */
    attribute_id?: number;
    /** Название атрибута */
    attribute_name?: string;
    /** Значения */
    values?: Array<{
      /** Словарное значение */
      dictionary_value_id?: number;
      /** Текстовое значение */
      value?: string;
    }>;
  }>;
}

/**
 * Ответ получения информации о товарах v3
 * Get product info list v3 response
 */
export interface GetProductInfoListV3Response {
  /** Результат запроса */
  result?: {
    /** Список товаров */
    items?: ProductInfoV3Item[];
    /** Общее количество товаров */
    total?: number;
    /** Идентификатор последней записи */
    last_id?: string;
  };
  readonly [key: string]: unknown;
}

/**
 * Лимиты на создание товаров
 * Daily create quota
 */
export interface DailyCreateQuota {
  /** Лимит на создание в день */
  limit?: number;
  /** Использовано сегодня */
  used?: number;
  /** Остается */
  remaining?: number;
  /** Дата сброса лимита */
  reset_date?: string;
}

/**
 * Лимиты на обновление товаров
 * Daily update quota
 */
export interface DailyUpdateQuota {
  /** Лимит на обновление в день */
  limit?: number;
  /** Использовано сегодня */
  used?: number;
  /** Остается */
  remaining?: number;
  /** Дата сброса лимита */
  reset_date?: string;
}

/**
 * Общие лимиты на ассортимент
 * Total quota
 */
export interface TotalQuota {
  /** Общий лимит на количество товаров */
  limit?: number;
  /** Используется сейчас */
  used?: number;
  /** Остается */
  remaining?: number;
}

/**
 * Ответ получения лимитов на ассортимент
 * Get upload quota response
 */
export interface GetUploadQuotaResponse {
  /** Лимиты на создание товаров в день */
  daily_create?: DailyCreateQuota;
  /** Лимиты на обновление товаров в день */
  daily_update?: DailyUpdateQuota;
  /** Общие лимиты на ассортимент */
  total?: TotalQuota;
  readonly [key: string]: unknown;
}
