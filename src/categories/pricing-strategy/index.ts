/**
 * Pricing Strategy API implementation
 * Manually implemented for comprehensive pricing strategy management
 */

import { HttpClient } from '../../core/http.js';
import type { RequestOptions } from '../../core/types.js';
import type {
  GetCompetitorsRequest,
  CreatePricingStrategyRequest,
  DeletePricingStrategyRequest,
  GetStrategyInfoRequest,
  GetStrategyListRequest,
  GetStrategyItemInfoRequest,
  AddStrategyItemsRequest,
  DeleteStrategyItemsRequest,
  GetStrategyItemsRequest,
  UpdateStatusStrategyRequest,
  GetStrategyIDsByItemIDsRequest,
  UpdatePricingStrategyRequest
} from '../../types/requests/pricing-strategy.js';
import type {
  GetCompetitorsResponse,
  CreatePricingStrategyResponse,
  EmptyResponse,
  GetStrategyResponse,
  GetStrategyListResponse,
  GetStrategyItemInfoResponse,
  AddStrategyItemsResponse,
  DeleteStrategyItemsResponse,
  GetStrategyItemsResponse,
  GetStrategyIDsByItemIDsResponse
} from '../../types/responses/pricing-strategy.js';

/**
 * Pricing Strategy API для динамических стратегий ценообразования и оптимизации
 * Pricing Strategy API for dynamic pricing strategies and optimization
 * 
 * @example
 * ```typescript
 * // Создать новую стратегию ценообразования
 * const strategy = await pricingApi.createStrategy({
 *   name: 'Конкурентная стратегия',
 *   description: 'Автоматическое ценообразование на основе цен конкурентов',
 *   strategy_type: 'COMPETITIVE'
 * });
 * 
 * // Добавить товары в стратегию
 * await pricingApi.addItemsToStrategy({
 *   strategy_id: strategy.result.strategy_id,
 *   items: [{ sku: '123456789' }, { sku: '987654321' }]
 * });
 * 
 * // Получить список конкурентов
 * const competitors = await pricingApi.getCompetitors({
 *   sku: ['123456789'],
 *   limit: 10
 * });
 * ```
 */
export class PricingStrategyApi {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Список конкурентов
   * Get competitors list
   * 
   * Метод для получения списка конкурентов — продавцов с похожими товарами 
   * в других интернет-магазинах и маркетплейсах.
   * 
   * @param request - Параметры запроса списка конкурентов
   * @param options - Дополнительные опции запроса
   * @returns Список конкурентов
   * 
   * @example
   * ```typescript
   * const competitors = await pricingApi.getCompetitors({
   *   sku: ['123456789', '987654321'],
   *   limit: 20
   * });
   * 
   * competitors.competitors?.forEach(competitor => {
   *   console.log(`${competitor.name}: ${competitor.price} ${competitor.currency}`);
   * });
   * ```
   */
  async getCompetitors(
    request: GetCompetitorsRequest,
    options?: RequestOptions
  ): Promise<GetCompetitorsResponse> {
    return this.httpClient.request<GetCompetitorsRequest, GetCompetitorsResponse>(
      'POST',
      '/v1/pricing-strategy/competitors/list',
      request,
      options
    );
  }

  /**
   * Создать стратегию
   * Create pricing strategy
   * 
   * Создание новой стратегии ценообразования с указанными параметрами.
   * 
   * @param request - Параметры создания стратегии
   * @param options - Дополнительные опции запроса
   * @returns Результат создания стратегии
   * 
   * @example
   * ```typescript
   * const strategy = await pricingApi.createStrategy({
   *   name: 'Премиум стратегия',
   *   description: 'Стратегия для товаров премиум сегмента',
   *   strategy_type: 'PREMIUM_PRICING',
   *   settings: {
   *     margin_min: 0.15,
   *     margin_max: 0.35,
   *     update_frequency: 'daily'
   *   }
   * });
   * ```
   */
  async createStrategy(
    request: CreatePricingStrategyRequest,
    options?: RequestOptions
  ): Promise<CreatePricingStrategyResponse> {
    return this.httpClient.request<CreatePricingStrategyRequest, CreatePricingStrategyResponse>(
      'POST',
      '/v1/pricing-strategy/create',
      request,
      options
    );
  }

  /**
   * Удалить стратегию
   * Delete pricing strategy
   * 
   * Можно удалить любую стратегию кроме системной.
   * 
   * @param request - Параметры удаления стратегии
   * @param options - Дополнительные опции запроса
   * @returns Результат удаления
   */
  async deleteStrategy(
    request: DeletePricingStrategyRequest,
    options?: RequestOptions
  ): Promise<EmptyResponse> {
    return this.httpClient.request<DeletePricingStrategyRequest, EmptyResponse>(
      'POST',
      '/v1/pricing-strategy/delete',
      request,
      options
    );
  }

  /**
   * Информация о стратегии
   * Get strategy information
   * 
   * Получение подробной информации о конкретной стратегии ценообразования.
   * 
   * @param request - Параметры запроса информации о стратегии
   * @param options - Дополнительные опции запроса
   * @returns Информация о стратегии
   */
  async getStrategyInfo(
    request: GetStrategyInfoRequest,
    options?: RequestOptions
  ): Promise<GetStrategyResponse> {
    return this.httpClient.request<GetStrategyInfoRequest, GetStrategyResponse>(
      'POST',
      '/v1/pricing-strategy/info',
      request,
      options
    );
  }

  /**
   * Список стратегий
   * Get strategies list
   * 
   * Получение списка всех доступных стратегий ценообразования.
   * 
   * @param request - Параметры запроса списка стратегий
   * @param options - Дополнительные опции запроса
   * @returns Список стратегий
   * 
   * @example
   * ```typescript
   * const strategies = await pricingApi.getStrategiesList({
   *   limit: 50,
   *   offset: 0
   * });
   * 
   * strategies.strategies?.forEach(strategy => {
   *   console.log(`${strategy.name} (${strategy.status}): ${strategy.description}`);
   * });
   * ```
   */
  async getStrategiesList(
    request: GetStrategyListRequest,
    options?: RequestOptions
  ): Promise<GetStrategyListResponse> {
    return this.httpClient.request<GetStrategyListRequest, GetStrategyListResponse>(
      'POST',
      '/v1/pricing-strategy/list',
      request,
      options
    );
  }

  /**
   * Цена товара у конкурента
   * Get product competitor price
   * 
   * Если вы добавили товар в стратегию ценообразования, метод вернёт цену и ссылку на товар у конкурента.
   * 
   * @param request - Параметры запроса цены конкурента
   * @param options - Дополнительные опции запроса
   * @returns Информация о цене товара у конкурента
   */
  async getStrategyItemInfo(
    request: GetStrategyItemInfoRequest,
    options?: RequestOptions
  ): Promise<GetStrategyItemInfoResponse> {
    return this.httpClient.request<GetStrategyItemInfoRequest, GetStrategyItemInfoResponse>(
      'POST',
      '/v1/pricing-strategy/product/info',
      request,
      options
    );
  }

  /**
   * Добавить товары в стратегию
   * Add products to strategy
   * 
   * Добавление товаров в существующую стратегию ценообразования.
   * 
   * @param request - Параметры добавления товаров в стратегию
   * @param options - Дополнительные опции запроса
   * @returns Результат добавления товаров
   * 
   * @example
   * ```typescript
   * const result = await pricingApi.addItemsToStrategy({
   *   strategy_id: 'strategy_123',
   *   items: [
   *     { sku: '123456789', settings: { min_price: 1000 } },
   *     { sku: '987654321', settings: { min_price: 500 } }
   *   ]
   * });
   * ```
   */
  async addItemsToStrategy(
    request: AddStrategyItemsRequest,
    options?: RequestOptions
  ): Promise<AddStrategyItemsResponse> {
    return this.httpClient.request<AddStrategyItemsRequest, AddStrategyItemsResponse>(
      'POST',
      '/v1/pricing-strategy/products/add',
      request,
      options
    );
  }

  /**
   * Удалить товары из стратегии
   * Remove products from strategy
   * 
   * Удаление товаров из существующей стратегии ценообразования.
   * 
   * @param request - Параметры удаления товаров из стратегии
   * @param options - Дополнительные опции запроса
   * @returns Результат удаления товаров
   */
  async removeItemsFromStrategy(
    request: DeleteStrategyItemsRequest,
    options?: RequestOptions
  ): Promise<DeleteStrategyItemsResponse> {
    return this.httpClient.request<DeleteStrategyItemsRequest, DeleteStrategyItemsResponse>(
      'POST',
      '/v1/pricing-strategy/products/delete',
      request,
      options
    );
  }

  /**
   * Список товаров в стратегии
   * Get strategy products list
   * 
   * Получение списка всех товаров, включённых в конкретную стратегию.
   * 
   * @param request - Параметры запроса списка товаров в стратегии
   * @param options - Дополнительные опции запроса
   * @returns Список товаров в стратегии
   */
  async getStrategyItems(
    request: GetStrategyItemsRequest,
    options?: RequestOptions
  ): Promise<GetStrategyItemsResponse> {
    return this.httpClient.request<GetStrategyItemsRequest, GetStrategyItemsResponse>(
      'POST',
      '/v1/pricing-strategy/products/list',
      request,
      options
    );
  }

  /**
   * Изменить статус стратегии
   * Update strategy status
   * 
   * Можно изменить статус любой стратегии кроме системной.
   * 
   * @param request - Параметры изменения статуса стратегии
   * @param options - Дополнительные опции запроса
   * @returns Результат изменения статуса
   */
  async updateStrategyStatus(
    request: UpdateStatusStrategyRequest,
    options?: RequestOptions
  ): Promise<EmptyResponse> {
    return this.httpClient.request<UpdateStatusStrategyRequest, EmptyResponse>(
      'POST',
      '/v1/pricing-strategy/status',
      request,
      options
    );
  }

  /**
   * Список идентификаторов стратегий
   * Get strategy IDs by product IDs
   * 
   * Получение списка идентификаторов стратегий, к которым привязаны указанные товары.
   * 
   * @param request - Параметры запроса идентификаторов стратегий
   * @param options - Дополнительные опции запроса
   * @returns Список идентификаторов стратегий по товарам
   */
  async getStrategyIDsByItemIDs(
    request: GetStrategyIDsByItemIDsRequest,
    options?: RequestOptions
  ): Promise<GetStrategyIDsByItemIDsResponse> {
    return this.httpClient.request<GetStrategyIDsByItemIDsRequest, GetStrategyIDsByItemIDsResponse>(
      'POST',
      '/v1/pricing-strategy/strategy-ids-by-product-ids',
      request,
      options
    );
  }

  /**
   * Обновить стратегию
   * Update pricing strategy
   * 
   * Можно обновить все стратегии кроме системной.
   * 
   * @param request - Параметры обновления стратегии
   * @param options - Дополнительные опции запроса
   * @returns Результат обновления
   */
  async updateStrategy(
    request: UpdatePricingStrategyRequest,
    options?: RequestOptions
  ): Promise<EmptyResponse> {
    return this.httpClient.request<UpdatePricingStrategyRequest, EmptyResponse>(
      'POST',
      '/v1/pricing-strategy/update',
      request,
      options
    );
  }
}