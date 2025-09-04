/**
 * Product API implementation
 * Manually implemented for comprehensive product management
 */

import { HttpClient } from "../../core/http.js";
import type { RequestOptions } from "../../core/types.js";
import type {
  ProductArchiveRequest,
  ProductUnarchiveRequest,
  GetProductListRequest,
  ProductUpdateAttributesRequest,
  ImportProductsBySKURequest,
  GetProductInfoRequest,
  GetProductInfoByIdRequest,
  GetProductStocksRequest,
  GetProductPricesRequest,
  GetProductAttributesRequest,
  GetDiscountedProductsRequest,
  // Новые типы запросов
  GetProductInfoDescriptionRequest,
  GetProductInfoSubscriptionRequest,
  ProductImportPicturesRequest,
  GetProductPicturesRequest,
  GetProductRatingBySkuRequest,
  GetRelatedSKURequest,
  UpdateOfferIdRequest,
  DeleteProductsRequest,
  ImportProductsV3Request,
  GetProductInfoListV3Request,
  GetProductListV3Request,
  GetUploadQuotaRequest,
} from "../../types/requests/product.js";
import type {
  GetProductListResponse,
  GetProductStocksResponse,
  GetProductPricesResponse,
  GetProductAttributesResponse,
  ImportProductsResponse,
  ImportProductsStatusResponse,
  GetCertificateTypesResponse,
  GetDiscountedProductsResponse,
  // Новые типы ответов
  GetProductInfoDescriptionResponse,
  GetProductInfoSubscriptionResponse,
  ProductImportPicturesResponse,
  GetProductPicturesResponse,
  GetProductRatingBySkuResponse,
  GetRelatedSKUResponse,
  UpdateOfferIdResponse,
  DeleteProductsResponse,
  ImportProductsV3Response,
  GetProductInfoListV3Response,
  GetProductListV3Response,
  GetUploadQuotaResponse,
} from "../../types/responses/product.js";
import type { ProductBooleanResponse } from "../../types/common/base.js";

/**
 * Product API для управления товарами и их характеристиками
 * Product API for product and attributes management
 *
 * @example
 * ```typescript
 * // Получить список товаров
 * const products = await productApi.getList({
 *   filter: {
 *     visibility: 'VISIBLE'
 *   },
 *   limit: 100
 * });
 *
 * // Архивировать товары
 * await productApi.archive({
 *   product_id: [123, 456]
 * });
 * ```
 */
export class ProductApi {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Архивировать товары
   * Archive products
   *
   * Метод переносит товары в архив. Архивные товары не участвуют в поиске и продажах.
   *
   * @param request - Параметры архивирования товаров
   * @param options - Дополнительные опции запроса
   * @returns Результат операции архивирования
   *
   * @example
   * ```typescript
   * const result = await productApi.archive({
   *   product_id: [123, 456, 789]
   * });
   *
   * if (result.result) {
   *   console.log('Товары успешно архивированы');
   * }
   * ```
   */
  async archive(request: ProductArchiveRequest, options?: RequestOptions): Promise<ProductBooleanResponse> {
    return this.httpClient.request<ProductArchiveRequest, ProductBooleanResponse>("POST", "/v1/product/archive", request, options);
  }

  /**
   * Разархивировать товары
   * Unarchive products
   *
   * Метод восстанавливает товары из архива.
   *
   * @param request - Параметры разархивирования товаров
   * @param options - Дополнительные опции запроса
   * @returns Результат операции разархивирования
   */
  async unarchive(request: ProductUnarchiveRequest, options?: RequestOptions): Promise<ProductBooleanResponse> {
    return this.httpClient.request<ProductUnarchiveRequest, ProductBooleanResponse>("POST", "/v1/product/unarchive", request, options);
  }

  /**
   * Получить список товаров
   * Get product list
   *
   * Метод для получения списка всех товаров.
   *
   * Если вы используете фильтр по идентификатору offer_id или product_id,
   * остальные параметры заполнять не обязательно.
   * За один раз вы можете использовать только одну группу идентификаторов, не больше 1000 товаров.
   *
   * Если вы не используете для отображения идентификаторы, укажите limit и last_id в следующих запросах.
   *
   * @param request - Параметры запроса списка товаров
   * @param options - Дополнительные опции запроса
   * @returns Список товаров
   *
   * @example
   * ```typescript
   * // Получить список товаров с фильтрацией
   * const products = await productApi.getList({
   *   filter: {
   *     visibility: 'ALL',
   *     offer_id: ['136748']
   *   },
   *   limit: 100
   * });
   *
   * // Получить все товары с пагинацией
   * const allProducts = await productApi.getList({
   *   limit: 100,
   *   last_id: ""  // При первом запросе пустое значение
   * });
   *
   * products.result?.items?.forEach(product => {
   *   console.log(`${product.name}: ${product.price}`);
   * });
   * ```
   */
  async getList(request: GetProductListRequest = {}, options?: RequestOptions): Promise<GetProductListResponse> {
    // Валидация согласно API документации
    if (request.filter?.offer_id && request.filter.offer_id.length > 1000) {
      throw new Error("Maximum 1000 offer_id items allowed");
    }

    if (request.filter?.product_id && request.filter.product_id.length > 1000) {
      throw new Error("Maximum 1000 product_id items allowed");
    }

    if (request.limit && (request.limit < 1 || request.limit > 1000)) {
      throw new Error("Limit must be between 1 and 1000");
    }

    return this.httpClient.request<GetProductListRequest, GetProductListResponse>("POST", "/v3/product/list", request, options);
  }

  /**
   * Обновить атрибуты товаров
   * Update product attributes
   *
   * Метод для обновления характеристик товаров.
   *
   * @param request - Параметры обновления атрибутов
   * @param options - Дополнительные опции запроса
   * @returns Результат операции обновления
   */
  async updateAttributes(request: ProductUpdateAttributesRequest, options?: RequestOptions): Promise<ProductBooleanResponse> {
    return this.httpClient.request<ProductUpdateAttributesRequest, ProductBooleanResponse>("POST", "/v1/product/attributes/update", request, options);
  }

  /**
   * Создать товар по SKU
   * Import product by SKU
   *
   * Метод создаёт копию карточки товара с указанным SKU.
   *
   * @param request - Параметры создания товара по SKU
   * @param options - Дополнительные опции запроса
   * @returns Результат создания товара
   */
  async importBySku(request: ImportProductsBySKURequest, options?: RequestOptions): Promise<ImportProductsResponse> {
    return this.httpClient.request<ImportProductsBySKURequest, ImportProductsResponse>("POST", "/v1/product/import-by-sku", request, options);
  }

  /**
   * Получить статус импорта товара
   * Get import info
   *
   * Позволяет получить статус создания или обновления карточки товара.
   *
   * @param request - Параметры запроса статуса импорта
   * @param options - Дополнительные опции запроса
   * @returns Статус импорта товара
   */
  async getImportInfo(request: GetProductInfoRequest, options?: RequestOptions): Promise<ImportProductsStatusResponse> {
    return this.httpClient.request<GetProductInfoRequest, ImportProductsStatusResponse>("POST", "/v1/product/import/info", request, options);
  }

  /**
   * Получить информацию о товаре
   * Get product info
   *
   * Метод для получения подробной информации о товаре.
   *
   * @param request - Параметры запроса информации о товаре
   * @param options - Дополнительные опции запроса
   * @returns Информация о товаре
   */
  async getInfo(request: GetProductInfoByIdRequest, options?: RequestOptions): Promise<GetProductListResponse> {
    return this.httpClient.request<GetProductInfoByIdRequest, GetProductListResponse>("POST", "/v2/product/info", request, options);
  }

  /**
   * Получить остатки товаров
   * Get product stocks
   *
   * Метод для получения информации об остатках товаров на складах.
   *
   * @param request - Параметры запроса остатков
   * @param options - Дополнительные опции запроса
   * @returns Остатки товаров
   */
  async getStocks(request?: GetProductStocksRequest, options?: RequestOptions): Promise<GetProductStocksResponse> {
    return this.httpClient.request<GetProductStocksRequest, GetProductStocksResponse>("POST", "/v3/product/info/stocks", request ?? {}, options);
  }

  /**
   * Получить цены товаров
   * Get product prices
   *
   * Метод для получения информации о ценах товаров.
   *
   * @param request - Параметры запроса цен
   * @param options - Дополнительные опции запроса
   * @returns Цены товаров
   */
  async getPrices(request?: GetProductPricesRequest, options?: RequestOptions): Promise<GetProductPricesResponse> {
    return this.httpClient.request<GetProductPricesRequest, GetProductPricesResponse>("POST", "/v4/product/info/prices", request ?? {}, options);
  }

  /**
   * Получить атрибуты товаров
   * Get product attributes
   *
   * Метод для получения характеристик товаров.
   *
   * @param request - Параметры запроса атрибутов
   * @param options - Дополнительные опции запроса
   * @returns Атрибуты товаров
   */
  async getAttributes(request?: GetProductAttributesRequest, options?: RequestOptions): Promise<GetProductAttributesResponse> {
    return this.httpClient.request<GetProductAttributesRequest, GetProductAttributesResponse>("POST", "/v4/product/info/attributes", request ?? {}, options);
  }

  /**
   * Получить типы сертификатов
   * Get certificate types
   *
   * Метод для получения списка типов сертификатов.
   *
   * @param options - Дополнительные опции запроса
   * @returns Типы сертификатов
   */
  async getCertificateTypes(options?: RequestOptions): Promise<GetCertificateTypesResponse> {
    return this.httpClient.request<{}, GetCertificateTypesResponse>("POST", "/v1/product/certificate-types", {}, options);
  }

  /**
   * Получить информацию об уценке и основном товаре по SKU уценённого товара
   * Get discounted products info
   *
   * Метод для получения информации об уценке и основном товаре по SKU уценённого товара.
   *
   * @param request - Параметры запроса товаров со скидкой
   * @param options - Дополнительные опции запроса
   * @returns Информация о товарах со скидкой
   *
   * @example
   * ```typescript
   * const discountedInfo = await productApi.getDiscountedInfo({
   *   discounted_skus: ['123456789', '987654321']
   * });
   * ```
   */
  async getDiscountedInfo(request: GetDiscountedProductsRequest, options?: RequestOptions): Promise<GetDiscountedProductsResponse> {
    return this.httpClient.request<GetDiscountedProductsRequest, GetDiscountedProductsResponse>("POST", "/v1/product/info/discounted", request, options);
  }

  /**
   * Получить описание товара
   * Get product description
   *
   * Метод для получения подробного описания товара.
   *
   * @param request - Параметры запроса описания товара
   * @param options - Дополнительные опции запроса
   * @returns Описание товара
   */
  async getProductDescription(request: GetProductInfoDescriptionRequest, options?: RequestOptions): Promise<GetProductInfoDescriptionResponse> {
    return this.httpClient.request<GetProductInfoDescriptionRequest, GetProductInfoDescriptionResponse>("POST", "/v1/product/info/description", request, options);
  }

  /**
   * Получить количество подписавшихся на товар
   * Get product subscription info
   *
   * Метод для получения информации о количестве пользователей, подписавшихся на товар.
   *
   * @param request - Параметры запроса подписок на товар
   * @param options - Дополнительные опции запроса
   * @returns Информация о подписках на товар
   */
  async getProductSubscription(request: GetProductInfoSubscriptionRequest, options?: RequestOptions): Promise<GetProductInfoSubscriptionResponse> {
    return this.httpClient.request<GetProductInfoSubscriptionRequest, GetProductInfoSubscriptionResponse>("POST", "/v1/product/info/subscription", request, options);
  }

  /**
   * Импорт изображений товара
   * Import product pictures
   *
   * Метод для загрузки изображений товара.
   *
   * @param request - Параметры импорта изображений
   * @param options - Дополнительные опции запроса
   * @returns Результат импорта изображений
   */
  async importPictures(request: ProductImportPicturesRequest, options?: RequestOptions): Promise<ProductImportPicturesResponse> {
    return this.httpClient.request<ProductImportPicturesRequest, ProductImportPicturesResponse>("POST", "/v1/product/pictures/import", request, options);
  }

  /**
   * Получить изображения товаров
   * Get product pictures
   *
   * Метод для получения списка изображений товаров.
   *
   * @param request - Параметры запроса изображений
   * @param options - Дополнительные опции запроса
   * @returns Изображения товаров
   */
  async getPictures(request: GetProductPicturesRequest, options?: RequestOptions): Promise<GetProductPicturesResponse> {
    return this.httpClient.request<GetProductPicturesRequest, GetProductPicturesResponse>("POST", "/v2/product/pictures/info", request, options);
  }

  /**
   * Получить контент-рейтинг товаров по SKU
   * Get product rating by SKU
   *
   * Метод для получения контент-рейтинга товаров.
   *
   * @param request - Параметры запроса рейтинга
   * @param options - Дополнительные опции запроса
   * @returns Контент-рейтинг товаров
   */
  async getProductRating(request: GetProductRatingBySkuRequest, options?: RequestOptions): Promise<GetProductRatingBySkuResponse> {
    return this.httpClient.request<GetProductRatingBySkuRequest, GetProductRatingBySkuResponse>("POST", "/v1/product/rating-by-sku", request, options);
  }

  /**
   * Получить связанные SKU
   * Get related SKU
   *
   * Метод для получения связанных SKU товаров.
   *
   * @param request - Параметры запроса связанных SKU
   * @param options - Дополнительные опции запроса
   * @returns Связанные SKU
   */
  async getRelatedSKU(request: GetRelatedSKURequest, options?: RequestOptions): Promise<GetRelatedSKUResponse> {
    return this.httpClient.request<GetRelatedSKURequest, GetRelatedSKUResponse>("POST", "/v1/product/related-sku/get", request, options);
  }

  /**
   * Обновить артикулы товаров
   * Update offer IDs
   *
   * Метод для изменения артикулов товаров.
   *
   * @param request - Параметры обновления артикулов
   * @param options - Дополнительные опции запроса
   * @returns Результат обновления артикулов
   */
  async updateOfferID(request: UpdateOfferIdRequest, options?: RequestOptions): Promise<UpdateOfferIdResponse> {
    return this.httpClient.request<UpdateOfferIdRequest, UpdateOfferIdResponse>("POST", "/v1/product/update/offer-id", request, options);
  }

  /**
   * Удалить товары без SKU
   * Delete products without SKU
   *
   * Метод для удаления товаров, у которых нет SKU.
   *
   * @param request - Параметры удаления товаров
   * @param options - Дополнительные опции запроса
   * @returns Результат удаления товаров
   */
  async deleteProducts(request: DeleteProductsRequest, options?: RequestOptions): Promise<DeleteProductsResponse> {
    return this.httpClient.request<DeleteProductsRequest, DeleteProductsResponse>("POST", "/v2/products/delete", request, options);
  }

  /**
   * Создать или обновить товар v3
   * Create or update product v3
   *
   * Основной метод для создания и обновления товаров с полным набором атрибутов.
   * Поддерживает загрузку изображений, видео, видеообложек и таблиц размеров.
   * В сутки есть лимит на количество создаваемых/обновляемых товаров.
   * В одном запросе можно передать до 100 товаров.
   *
   * Особенности:
   * - Загрузка до 15 изображений (включая главное)
   * - Поддержка видео через complex_attributes
   * - Добавление таблиц размеров в формате JSON
   * - Указанная валюта должна совпадать с настройками личного кабинета
   *
   * @param request - Параметры создания/обновления товара
   * @param options - Дополнительные опции запроса
   * @returns Результат создания/обновления товара
   *
   * @example
   * ```typescript
   * const result = await productApi.importProducts({
   *   items: [{
   *     offer_id: 'PRODUCT-001',
   *     name: 'Название товара',
   *     description: 'Описание товара',
   *     category_id: 123,
   *     price: '1000.00',
   *     currency_code: 'RUB',
   *     images: ['https://example.com/image1.jpg'],
   *     primary_image: 'https://example.com/main.jpg',
   *     attributes: [{
   *       id: 4180,
   *       values: [{ value: 'Красный' }]
   *     }]
   *   }]
   * });
   * ```
   */
  async importProducts(request: ImportProductsV3Request, options?: RequestOptions): Promise<ImportProductsV3Response> {
    return this.httpClient.request<ImportProductsV3Request, ImportProductsV3Response>("POST", "/v3/product/import", request, options);
  }

  /**
   * Получить информацию о товарах v3
   * Get product info list v3
   *
   * Метод для получения расширенной информации о товарах.
   *
   * @param request - Параметры запроса информации о товарах
   * @param options - Дополнительные опции запроса
   * @returns Расширенная информация о товарах
   */
  async getProductInfoListV3(request: GetProductInfoListV3Request, options?: RequestOptions): Promise<GetProductInfoListV3Response> {
    return this.httpClient.request<GetProductInfoListV3Request, GetProductInfoListV3Response>("POST", "/v3/product/info/list", request, options);
  }

  /**
   * Получить список товаров v3
   * Get product list v3
   *
   * Метод для получения списка всех товаров с расширенной информацией.
   * Поддерживает фильтрацию и пагинацию. До 1000 товаров в одном запросе.
   *
   * @param request - Параметры запроса списка товаров
   * @param options - Дополнительные опции запроса
   * @returns Список товаров с расширенной информацией
   */
  async getListV3(request?: GetProductListV3Request, options?: RequestOptions): Promise<GetProductListV3Response> {
    return this.httpClient.request<GetProductListV3Request, GetProductListV3Response>("POST", "/v3/product/list", request ?? {}, options);
  }

  /**
   * Получить лимиты на ассортимент
   * Get upload quota
   *
   * Метод для получения информации о лимитах на создание и обновление товаров.
   *
   * @param request - Параметры запроса лимитов
   * @param options - Дополнительные опции запроса
   * @returns Информация о лимитах
   */
  async getUploadQuota(request?: GetUploadQuotaRequest, options?: RequestOptions): Promise<GetUploadQuotaResponse> {
    return this.httpClient.request<GetUploadQuotaRequest, GetUploadQuotaResponse>("POST", "/v4/product/info/limit", request ?? {}, options);
  }

  /**
   * Получить описание товара
   * Get product description
   *
   * Метод для получения подробного описания товара по его идентификатору.
   * Возвращает расширенное описание товара, которое используется на странице товара.
   *
   * ⚠️ Отличается от getInfo тем, что возвращает именно описание товара,
   * а не общую информацию о карточке товара.
   *
   * @param request - Параметры запроса описания товара (offer_id ИЛИ product_id)
   * @param options - Дополнительные опции запроса
   * @returns Описание товара
   *
   * @example
   * ```typescript
   * // Получить описание по артикулу
   * const description = await productApi.getDescription({
   *   offer_id: 'ITEM001'
   * });
   *
   * // Получить описание по product_id
   * const description = await productApi.getDescription({
   *   product_id: 123456
   * });
   *
   * console.log('Описание:', description.result?.description);
   * console.log('Rich content:', description.result?.rich_text_description);
   * ```
   */
  async getDescription(request: GetProductInfoDescriptionRequest, options?: RequestOptions): Promise<GetProductInfoDescriptionResponse> {
    return this.httpClient.request<GetProductInfoDescriptionRequest, GetProductInfoDescriptionResponse>("POST", "/v1/product/info/description", request, options);
  }

  /**
   * Количество подписавшихся на товар пользователей
   * Get product subscription count
   *
   * Метод для получения количества пользователей, которые нажали "Узнать о поступлении"
   * на странице товара. Полезно для понимания спроса на товары, которых нет в наличии.
   *
   * Вы можете передать несколько товаров в одном запросе для массовой проверки.
   *
   * ⚠️ Работает только с товарами, у которых есть функция "Узнать о поступлении".
   *
   * @param request - Параметры запроса подписок (список SKU)
   * @param options - Дополнительные опции запроса
   * @returns Количество подписавшихся пользователей по каждому SKU
   *
   * @example
   * ```typescript
   * const subscriptions = await productApi.getSubscription({
   *   skus: ['123456789', '987654321', '555444333']
   * });
   *
   * subscriptions.result?.forEach(item => {
   *   console.log(`SKU ${item.sku}: ${item.count} подписчиков`);
   *   if (item.count > 0) {
   *     console.log('Высокий спрос! Рекомендуем пополнить остатки.');
   *   }
   * });
   * ```
   */
  async getSubscription(request: GetProductInfoSubscriptionRequest, options?: RequestOptions): Promise<GetProductInfoSubscriptionResponse> {
    return this.httpClient.request<GetProductInfoSubscriptionRequest, GetProductInfoSubscriptionResponse>("POST", "/v1/product/info/subscription", request, options);
  }
}
