/**
 * Product API request types
 * Manually implemented for type safety
 * Ready for manual editing and enhancements
 */

import type { ProductId } from "../common/base.js";

/**
 * Запрос архивирования товаров
 * Product archive request
 */
export interface ProductArchiveRequest {
  /** Список идентификаторов товаров в системе продавца — product_id */
  product_id: ProductId[];
  readonly [key: string]: unknown;
}

/**
 * Запрос разархивирования товаров
 * Product unarchive request
 */
export interface ProductUnarchiveRequest {
  /** Список идентификаторов товаров в системе продавца — product_id */
  product_id: ProductId[];
  readonly [key: string]: unknown;
}

/**
 * Фильтр для списка товаров
 * Product list filter
 */
export interface ProductListFilter {
  /** Идентификатор товара в системе продавца */
  offer_id?: string[];
  /** Идентификатор товара в системе Ozon */
  product_id?: ProductId[];
  /** Статус товара */
  visibility?:
    | "ALL"
    | "VISIBLE"
    | "INVISIBLE"
    | "EMPTY_STOCK"
    | "NOT_MODERATED"
    | "MODERATED"
    | "DISABLED"
    | "STATE_FAILED_MODERATION"
    | "READY_TO_SUPPLY"
    | "VALIDATION_STATE_PENDING"
    | "VALIDATION_STATE_FAIL"
    | "VALIDATION_STATE_SUCCESS"
    | "TO_SUPPLY"
    | "IN_SALE"
    | "REMOVED_FROM_SALE"
    | "BANNED"
    | "OVERPRICED"
    | "CRITICALLY_OVERPRICED"
    | "EMPTY_BARCODE"
    | "BARCODE_EXISTS"
    | "QUARANTINE"
    | "ARCHIVED"
    | "OVERPRICED_WITH_STOCK"
    | "PARTIAL_APPROVED"
    | "IMAGE_ABSENT"
    | "MODERATION_BLOCK";
}

/**
 * Запрос списка товаров
 * Get product list request
 */
export interface GetProductListRequest {
  /** Фильтр */
  filter?: ProductListFilter;
  /** Идентификатор последней записи на странице (для пагинации) */
  last_id?: string;
  /** Количество записей в ответе (максимум 1000) */
  limit?: number;
  readonly [key: string]: unknown;
}

/**
 * Атрибут товара для обновления
 * Product attribute for update
 */
export interface ProductAttribute {
  /** Идентификатор атрибута */
  id: number;
  /** Значения атрибута */
  values: Array<{
    /** Словарное значение атрибута */
    dictionary_value_id?: number;
    /** Значение атрибута */
    value?: string;
  }>;
}

/**
 * Запрос обновления атрибутов товара
 * Product update attributes request
 */
export interface ProductUpdateAttributesRequest {
  /** Список товаров для обновления */
  items: Array<{
    /** Атрибуты товара */
    attributes: ProductAttribute[];
    /** Идентификатор товара в системе продавца */
    offer_id: string;
  }>;
  readonly [key: string]: unknown;
}

/**
 * Запрос создания товара по SKU
 * Import products by SKU request
 */
export interface ImportProductsBySKURequest {
  /** Список SKU для создания товаров */
  items: Array<{
    /** SKU товара в системе Ozon */
    sku: number;
    /** Идентификатор товара в системе продавца */
    offer_id: string;
  }>;
  readonly [key: string]: unknown;
}

/**
 * Запрос информации о статусе импорта
 * Get import info request
 */
export interface GetProductInfoRequest {
  /** Идентификатор задачи импорта */
  task_id: string;
  readonly [key: string]: unknown;
}

/**
 * Запрос информации о товаре
 * Get product info request
 */
export interface GetProductInfoByIdRequest {
  /** Идентификатор товара в системе продавца */
  offer_id?: string;
  /** Идентификатор товара в системе Ozon */
  product_id?: ProductId;
  /** SKU товара */
  sku?: number;
  readonly [key: string]: unknown;
}

/**
 * Запрос остатков товаров
 * Get product stocks request
 */
export interface GetProductStocksRequest {
  /** Фильтр по типу склада */
  filter?: {
    /** Идентификаторы товаров в системе продавца */
    offer_id?: string[];
    /** Идентификаторы товаров в системе Ozon */
    product_id?: ProductId[];
    /** Статус товара */
    visibility?: "ALL" | "VISIBLE" | "INVISIBLE";
  };
  /** Идентификатор последней записи */
  last_id?: string;
  /** Количество записей в ответе */
  limit?: number;
  readonly [key: string]: unknown;
}

/**
 * Запрос цен товаров
 * Get product prices request
 */
export interface GetProductPricesRequest {
  /** Фильтр */
  filter?: {
    /** Идентификаторы товаров в системе продавца */
    offer_id?: string[];
    /** Идентификаторы товаров в системе Ozon */
    product_id?: ProductId[];
    /** Статус товара */
    visibility?: "ALL" | "VISIBLE" | "INVISIBLE";
  };
  /** Идентификатор последней записи */
  last_id?: string;
  /** Количество записей в ответе */
  limit?: number;
  readonly [key: string]: unknown;
}

/**
 * Запрос атрибутов товаров v4
 * Get product attributes v4 request
 */
export interface GetProductAttributesRequest {
  /** Фильтр */
  filter?: {
    /** Идентификаторы товаров в системе продавца */
    offer_id?: string[];
    /** Идентификаторы товаров в системе Ozon */
    product_id?: ProductId[];
    /** SKU товаров */
    sku?: string[];
    /** Статус товара */
    visibility?: "ALL" | "VISIBLE" | "INVISIBLE";
  };
  /** Идентификатор последней записи */
  last_id?: string;
  /** Количество записей в ответе (1-1000) */
  limit?: number;
  /** Параметр сортировки: sku, offer_id, id, title */
  sort_by?: "sku" | "offer_id" | "id" | "title";
  /** Направление сортировки: asc, desc */
  sort_dir?: "asc" | "desc";
  readonly [key: string]: unknown;
}

/**
 * Запрос информации об уценке и основном товаре по SKU уценённого товара
 * Get discounted products info request
 */
export interface GetDiscountedProductsRequest {
  /** Список SKU уценённых товаров */
  discounted_skus: string[];
  readonly [key: string]: unknown;
}

// === НОВЫЕ МЕТОДЫ ===

/**
 * Запрос описания товара
 * Get product description request
 */
export interface GetProductInfoDescriptionRequest {
  /** Идентификатор товара в системе продавца */
  offer_id?: string;
  /** Идентификатор товара в системе Ozon */
  product_id?: ProductId;
  readonly [key: string]: unknown;
}

/**
 * Запрос количества подписавшихся на товар
 * Get product subscription info request
 */
export interface GetProductInfoSubscriptionRequest {
  /** Список SKU товаров */
  skus: string[];
  readonly [key: string]: unknown;
}

/**
 * Запрос импорта изображений товара
 * Product import pictures request
 */
export interface ProductImportPicturesRequest {
  /** Идентификатор товара в системе Ozon */
  product_id: ProductId;
  /** Массив ссылок на изображения */
  images?: string[];
  /** Массив изображений 360 */
  images360?: string[];
  /** Маркетинговый цвет */
  color_image?: string;
  readonly [key: string]: unknown;
}

/**
 * Запрос получения изображений товаров
 * Get product pictures request
 */
export interface GetProductPicturesRequest {
  /** Список идентификаторов товаров */
  product_id: ProductId[];
  readonly [key: string]: unknown;
}

/**
 * Запрос контент-рейтинга товаров по SKU
 * Get product rating by SKU request
 */
export interface GetProductRatingBySkuRequest {
  /** SKU товаров */
  skus: string[];
  readonly [key: string]: unknown;
}

/**
 * Запрос связанных SKU
 * Get related SKU request
 */
export interface GetRelatedSKURequest {
  /** Список SKU */
  skus: string[];
  readonly [key: string]: unknown;
}

/**
 * Запрос обновления артикулов товаров
 * Update offer ID request
 */
export interface UpdateOfferIdRequest {
  /** Список изменений артикулов */
  update_offer_id: Array<{
    /** Старый offer_id */
    offer_id: string;
    /** Новый offer_id */
    new_offer_id: string;
  }>;
  readonly [key: string]: unknown;
}

/**
 * Запрос удаления товаров без SKU
 * Delete products request
 */
export interface DeleteProductsRequest {
  /** Список идентификаторов товаров для удаления */
  products: Array<{
    /** Идентификатор товара в системе продавца */
    offer_id: string;
  }>;
  readonly [key: string]: unknown;
}

/**
 * Запрос создания/обновления товара v3
 * Import products v3 request
 */
export interface ImportProductsV3Request {
  /** Список товаров для создания/обновления */
  items: Array<{
    /** Артикул */
    offer_id: string;
    /** Название */
    name: string;
    /** Описание */
    description?: string;
    /** Категория */
    category_id: number;
    /** Цена */
    price: string;
    /** Старая цена */
    old_price?: string;
    /** Валюта */
    currency_code?: string;
    /** Штрихкод */
    barcode?: string;
    /** Вес */
    weight?: number;
    /** Единица измерения веса */
    weight_unit?: string;
    /** Ширина */
    width?: number;
    /** Высота */
    height?: number;
    /** Глубина */
    depth?: number;
    /** Единица измерения размеров */
    dimension_unit?: string;
    /** Изображения */
    images?: string[];
    /** Главное изображение */
    primary_image?: string;
    /** Изображения 360 */
    images360?: string[];
    /** Маркетинговый цвет */
    color_image?: string;
    /** Атрибуты */
    attributes?: Array<{
      /** Идентификатор атрибута */
      id: number;
      /** Значения */
      values: Array<{
        /** Словарное значение */
        dictionary_value_id?: number;
        /** Текстовое значение */
        value?: string;
      }>;
    }>;
    /** Комплексные атрибуты */
    complex_attributes?: Array<{
      /** Атрибуты */
      attributes: Array<{
        /** Идентификатор атрибута */
        id: number;
        /** Комплексный идентификатор */
        complex_id: number;
        /** Значения */
        values: Array<{
          /** Словарное значение */
          dictionary_value_id?: number;
          /** Текстовое значение */
          value?: string;
        }>;
      }>;
    }>;
  }>;
  readonly [key: string]: unknown;
}

/**
 * Запрос получения информации о товарах v3
 * Get product info list v3 request
 */
export interface GetProductInfoListV3Request {
  /** Идентификаторы товаров в системе продавца */
  offer_id?: string[];
  /** Идентификаторы товаров в системе Ozon */
  product_id?: ProductId[];
  /** SKU товаров */
  sku?: string[];
  readonly [key: string]: unknown;
}

/**
 * Запрос списка товаров v3
 * Get product list v3 request
 */
export interface GetProductListV3Request {
  /** Фильтр */
  filter?: {
    /** Идентификаторы товаров в системе продавца */
    offer_id?: string[];
    /** Идентификаторы товаров в системе Ozon */
    product_id?: ProductId[];
    /** Статус товара */
    visibility?:
      | "ALL"
      | "VISIBLE"
      | "INVISIBLE"
      | "EMPTY_STOCK"
      | "NOT_MODERATED"
      | "MODERATED"
      | "DISABLED"
      | "STATE_FAILED_MODERATION"
      | "READY_TO_SUPPLY"
      | "VALIDATION_STATE_PENDING"
      | "VALIDATION_STATE_FAIL"
      | "VALIDATION_STATE_SUCCESS"
      | "TO_SUPPLY"
      | "IN_SALE"
      | "REMOVED_FROM_SALE"
      | "BANNED"
      | "OVERPRICED"
      | "CRITICALLY_OVERPRICED"
      | "EMPTY_BARCODE"
      | "BARCODE_EXISTS"
      | "QUARANTINE"
      | "ARCHIVED"
      | "OVERPRICED_WITH_STOCK"
      | "PARTIAL_APPROVED"
      | "IMAGE_ABSENT"
      | "MODERATION_BLOCK";
  };
  /** Идентификатор последней записи на странице (для пагинации) */
  last_id?: string;
  /** Количество записей в ответе (максимум 1000) */
  limit?: number;
  readonly [key: string]: unknown;
}

/**
 * Запрос получения лимитов на ассортимент
 * Get upload quota request
 */
export interface GetUploadQuotaRequest {
  readonly [key: string]: unknown;
}
