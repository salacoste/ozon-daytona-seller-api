/**
 * Product API implementation
 * Manually implemented for comprehensive product management
 */

import { HttpClient } from '../../core/http.js';
import type { RequestOptions } from '../../core/types.js';
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
  GetUploadQuotaRequest,
} from '../../types/requests/product.js';
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
  GetUploadQuotaResponse,
} from '../../types/responses/product.js';
import type { ProductBooleanResponse } from '../../types/common/base.js';

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
  async archive(
    request: ProductArchiveRequest,
    options?: RequestOptions
  ): Promise<ProductBooleanResponse> {
    return this.httpClient.request<ProductArchiveRequest, ProductBooleanResponse>(
      'POST',
      '/v1/product/archive',
      request,
      options
    );
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
  async unarchive(
    request: ProductUnarchiveRequest,
    options?: RequestOptions
  ): Promise<ProductBooleanResponse> {
    return this.httpClient.request<ProductUnarchiveRequest, ProductBooleanResponse>(
      'POST',
      '/v1/product/unarchive',
      request,
      options
    );
  }

  /**
   * Получить список товаров
   * Get product list
   * 
   * Метод для получения списка товаров с фильтрацией и пагинацией.
   * 
   * @param request - Параметры запроса списка товаров
   * @param options - Дополнительные опции запроса
   * @returns Список товаров
   * 
   * @example
   * ```typescript
   * const products = await productApi.getList({
   *   filter: {
   *     visibility: 'VISIBLE',
   *     offer_id: ['PRODUCT-001', 'PRODUCT-002']
   *   },
   *   limit: 50
   * });
   * 
   * products.result?.items?.forEach(product => {
   *   console.log(`${product.name}: ${product.price}`);
   * });
   * ```
   */
  async getList(
    request?: GetProductListRequest,
    options?: RequestOptions
  ): Promise<GetProductListResponse> {
    return this.httpClient.request<GetProductListRequest, GetProductListResponse>(
      'POST',
      '/v3/product/list',
      request ?? {},
      options
    );
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
  async updateAttributes(
    request: ProductUpdateAttributesRequest,
    options?: RequestOptions
  ): Promise<ProductBooleanResponse> {
    return this.httpClient.request<ProductUpdateAttributesRequest, ProductBooleanResponse>(
      'POST',
      '/v1/product/attributes/update',
      request,
      options
    );
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
  async importBySku(
    request: ImportProductsBySKURequest,
    options?: RequestOptions
  ): Promise<ImportProductsResponse> {
    return this.httpClient.request<ImportProductsBySKURequest, ImportProductsResponse>(
      'POST',
      '/v1/product/import-by-sku',
      request,
      options
    );
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
  async getImportInfo(
    request: GetProductInfoRequest,
    options?: RequestOptions
  ): Promise<ImportProductsStatusResponse> {
    return this.httpClient.request<GetProductInfoRequest, ImportProductsStatusResponse>(
      'POST',
      '/v1/product/import/info',
      request,
      options
    );
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
  async getInfo(
    request: GetProductInfoByIdRequest,
    options?: RequestOptions
  ): Promise<GetProductListResponse> {
    return this.httpClient.request<GetProductInfoByIdRequest, GetProductListResponse>(
      'POST',
      '/v2/product/info',
      request,
      options
    );
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
  async getStocks(
    request?: GetProductStocksRequest,
    options?: RequestOptions
  ): Promise<GetProductStocksResponse> {
    return this.httpClient.request<GetProductStocksRequest, GetProductStocksResponse>(
      'POST',
      '/v3/product/info/stocks',
      request ?? {},
      options
    );
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
  async getPrices(
    request?: GetProductPricesRequest,
    options?: RequestOptions
  ): Promise<GetProductPricesResponse> {
    return this.httpClient.request<GetProductPricesRequest, GetProductPricesResponse>(
      'POST',
      '/v4/product/info/prices',
      request ?? {},
      options
    );
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
  async getAttributes(
    request?: GetProductAttributesRequest,
    options?: RequestOptions
  ): Promise<GetProductAttributesResponse> {
    return this.httpClient.request<GetProductAttributesRequest, GetProductAttributesResponse>(
      'POST',
      '/v3/product/info/attributes',
      request ?? {},
      options
    );
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
  async getCertificateTypes(
    options?: RequestOptions
  ): Promise<GetCertificateTypesResponse> {
    return this.httpClient.request<{}, GetCertificateTypesResponse>(
      'POST',
      '/v1/product/certificate-types',
      {},
      options
    );
  }

  /**
   * Получить информацию о товарах со скидкой
   * Get discounted products info
   * 
   * Метод для получения информации о товарах, участвующих в акциях и скидках.
   * 
   * @param request - Параметры запроса товаров со скидкой
   * @param options - Дополнительные опции запроса
   * @returns Информация о товарах со скидкой
   */
  async getDiscountedInfo(
    request?: GetDiscountedProductsRequest,
    options?: RequestOptions
  ): Promise<GetDiscountedProductsResponse> {
    return this.httpClient.request<GetDiscountedProductsRequest, GetDiscountedProductsResponse>(
      'POST',
      '/v1/product/info/discounted',
      request ?? {},
      options
    );
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
  async getProductDescription(
    request: GetProductInfoDescriptionRequest,
    options?: RequestOptions
  ): Promise<GetProductInfoDescriptionResponse> {
    return this.httpClient.request<GetProductInfoDescriptionRequest, GetProductInfoDescriptionResponse>(
      'POST',
      '/v1/product/info/description',
      request,
      options
    );
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
  async getProductSubscription(
    request: GetProductInfoSubscriptionRequest,
    options?: RequestOptions
  ): Promise<GetProductInfoSubscriptionResponse> {
    return this.httpClient.request<GetProductInfoSubscriptionRequest, GetProductInfoSubscriptionResponse>(
      'POST',
      '/v1/product/info/subscription',
      request,
      options
    );
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
  async importPictures(
    request: ProductImportPicturesRequest,
    options?: RequestOptions
  ): Promise<ProductImportPicturesResponse> {
    return this.httpClient.request<ProductImportPicturesRequest, ProductImportPicturesResponse>(
      'POST',
      '/v1/product/pictures/import',
      request,
      options
    );
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
  async getPictures(
    request: GetProductPicturesRequest,
    options?: RequestOptions
  ): Promise<GetProductPicturesResponse> {
    return this.httpClient.request<GetProductPicturesRequest, GetProductPicturesResponse>(
      'POST',
      '/v1/product/pictures/info',
      request,
      options
    );
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
  async getProductRating(
    request: GetProductRatingBySkuRequest,
    options?: RequestOptions
  ): Promise<GetProductRatingBySkuResponse> {
    return this.httpClient.request<GetProductRatingBySkuRequest, GetProductRatingBySkuResponse>(
      'POST',
      '/v1/product/rating-by-sku',
      request,
      options
    );
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
  async getRelatedSKU(
    request: GetRelatedSKURequest,
    options?: RequestOptions
  ): Promise<GetRelatedSKUResponse> {
    return this.httpClient.request<GetRelatedSKURequest, GetRelatedSKUResponse>(
      'POST',
      '/v1/product/related-sku',
      request,
      options
    );
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
  async updateOfferID(
    request: UpdateOfferIdRequest,
    options?: RequestOptions
  ): Promise<UpdateOfferIdResponse> {
    return this.httpClient.request<UpdateOfferIdRequest, UpdateOfferIdResponse>(
      'POST',
      '/v1/product/update/offer-id',
      request,
      options
    );
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
  async deleteProducts(
    request: DeleteProductsRequest,
    options?: RequestOptions
  ): Promise<DeleteProductsResponse> {
    return this.httpClient.request<DeleteProductsRequest, DeleteProductsResponse>(
      'POST',
      '/v1/product/delete',
      request,
      options
    );
  }

  /**
   * Создать или обновить товар v3
   * Create or update product v3
   * 
   * Основной метод для создания и обновления товаров с полным набором атрибутов.
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
   *     images: ['https://example.com/image1.jpg']
   *   }]
   * });
   * ```
   */
  async importProducts(
    request: ImportProductsV3Request,
    options?: RequestOptions
  ): Promise<ImportProductsV3Response> {
    return this.httpClient.request<ImportProductsV3Request, ImportProductsV3Response>(
      'POST',
      '/v3/product/import',
      request,
      options
    );
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
  async getProductInfoListV3(
    request: GetProductInfoListV3Request,
    options?: RequestOptions
  ): Promise<GetProductInfoListV3Response> {
    return this.httpClient.request<GetProductInfoListV3Request, GetProductInfoListV3Response>(
      'POST',
      '/v3/product/info/list',
      request,
      options
    );
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
  async getUploadQuota(
    request?: GetUploadQuotaRequest,
    options?: RequestOptions
  ): Promise<GetUploadQuotaResponse> {
    return this.httpClient.request<GetUploadQuotaRequest, GetUploadQuotaResponse>(
      'POST',
      '/v1/product/info/upload-quota',
      request ?? {},
      options
    );
  }
}
