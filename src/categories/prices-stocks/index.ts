/**
 * Prices&StocksAPI implementation
 * Price and inventory management
 */

import { HttpClient } from '../../core/http.js';
import type { RequestOptions } from '../../core/types.js';
import type { EmptyResponse } from '../../types/common/base.js';
import type { 
  PricesStocksActionTimerStatusRequest,
  PricesStocksActionTimerUpdateRequest,
  PricesStocksImportPricesRequest,
  PricesStocksGetDiscountedInfoRequest,
  PricesStocksGetStocksByWarehouseFbsRequest,
  PricesStocksUpdateDiscountRequest,
  PricesStocksUpdateStocksRequest,
  PricesStocksGetStocksRequest,
  PricesStocksGetPricesRequest
} from '../../types/requests/prices-stocks.js';
import type { 
  PricesStocksActionTimerStatusResponse,
  PricesStocksImportPricesResponse,
  PricesStocksGetDiscountedInfoResponse,
  PricesStocksGetStocksByWarehouseFbsResponse,
  PricesStocksUpdateDiscountResponse,
  PricesStocksUpdateStocksResponse,
  PricesStocksGetStocksResponse,
  PricesStocksGetPricesResponse
} from '../../types/responses/prices-stocks.js';

/**
 * Prices&StocksAPI для управления ценами и остатками товаров
 * Prices&StocksAPI for price and inventory management
 * 
 * @example
 * ```typescript
 * // Обновить цены товаров
 * const priceUpdate = await pricesStocksApi.updatePrices({
 *   prices: [{
 *     offer_id: 'ITEM001',
 *     price: '1000',
 *     old_price: '1200',
 *     currency_code: 'RUB'
 *   }]
 * });
 * 
 * // Обновить остатки товаров
 * const stockUpdate = await pricesStocksApi.updateStocks({
 *   stocks: [{
 *     offer_id: 'ITEM001',
 *     stock: 50,
 *     warehouse_id: 12345
 *   }]
 * });
 * 
 * // Получить информацию о ценах
 * const prices = await pricesStocksApi.getPrices({
 *   filter: { offer_id: ['ITEM001', 'ITEM002'] },
 *   limit: 100
 * });
 * ```
 */
export class PricesStocksApi {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Получить статус установленного таймера
   * Get action timer status
   * 
   * Получает статус таймера актуальности минимальной цены для товаров.
   * 
   * @param request - Параметры запроса статуса таймера
   * @param options - Дополнительные опции запроса
   * @returns Статус таймеров для товаров
   * 
   * @example
   * ```typescript
   * const timerStatus = await pricesStocksApi.getActionTimerStatus({
   *   product_ids: ['123456', '789012']
   * });
   * 
   * timerStatus.statuses?.forEach(status => {
   *   console.log(`Товар ${status.product_id}: таймер ${status.is_timer_enabled ? 'включен' : 'выключен'}`);
   * });
   * ```
   */
  async getActionTimerStatus(
    request: PricesStocksActionTimerStatusRequest,
    options?: RequestOptions
  ): Promise<PricesStocksActionTimerStatusResponse> {
    return this.httpClient.request<PricesStocksActionTimerStatusRequest, PricesStocksActionTimerStatusResponse>(
      'POST',
      '/v1/product/action/timer/status',
      request,
      options
    );
  }

  /**
   * Обновление таймера актуальности минимальной цены
   * Update action timer
   * 
   * Обновляет таймер актуальности минимальной цены для товаров.
   * 
   * @param request - Параметры запроса обновления таймера
   * @param options - Дополнительные опции запроса
   * @returns Результат обновления таймера
   * 
   * @example
   * ```typescript
   * await pricesStocksApi.updateActionTimer({
   *   product_ids: ['123456', '789012']
   * });
   * 
   * console.log('Таймер обновлён');
   * ```
   */
  async updateActionTimer(
    request: PricesStocksActionTimerUpdateRequest,
    options?: RequestOptions
  ): Promise<void> {
    await this.httpClient.request<PricesStocksActionTimerUpdateRequest, EmptyResponse>(
      'POST',
      '/v1/product/action/timer/update',
      request,
      options
    );
  }

  /**
   * Обновить цену товаров
   * Update product prices
   * 
   * Позволяет изменить цену одного или нескольких товаров.
   * Цену каждого товара можно обновлять не больше 10 раз в час.
   * Чтобы сбросить old_price, поставьте 0 у этого параметра.
   * 
   * @param request - Параметры запроса обновления цен
   * @param options - Дополнительные опции запроса
   * @returns Результаты обновления цен
   * 
   * @example
   * ```typescript
   * const result = await pricesStocksApi.updatePrices({
   *   prices: [{
   *     offer_id: 'ITEM001',
   *     price: '1500',
   *     old_price: '2000',
   *     premium_price: '1400',
   *     currency_code: 'RUB'
   *   }, {
   *     product_id: 123456,
   *     price: '999',
   *     currency_code: 'RUB'
   *   }]
   * });
   * 
   * result.result?.forEach(item => {
   *   if (item.updated) {
   *     console.log(`Цена товара ${item.offer_id || item.product_id} обновлена`);
   *   } else {
   *     console.log(`Ошибки: ${item.errors?.join(', ')}`);
   *   }
   * });
   * ```
   */
  async updatePrices(
    request: PricesStocksImportPricesRequest,
    options?: RequestOptions
  ): Promise<PricesStocksImportPricesResponse> {
    return this.httpClient.request<PricesStocksImportPricesRequest, PricesStocksImportPricesResponse>(
      'POST',
      '/v1/product/import/prices',
      request,
      options
    );
  }

  /**
   * Узнать информацию об уценке и основном товаре по SKU уценённого товара
   * Get discounted product information
   * 
   * Метод для получения информации о состоянии и дефектах уценённого товара по его SKU.
   * Работает только с уценёнными товарами по схеме FBO. Также метод возвращает SKU основного товара.
   * 
   * @param request - Параметры запроса информации об уценённом товаре
   * @param options - Дополнительные опции запроса
   * @returns Информация об уценённом товаре
   * 
   * @example
   * ```typescript
   * const discountedInfo = await pricesStocksApi.getDiscountedProductInfo({
   *   discounted_skus: ['987654321', '123456789']
   * });
   * 
   * discountedInfo.items?.forEach(item => {
   *   console.log(`Уценённый SKU: ${item.discounted_sku}, основной SKU: ${item.original_sku}`);
   *   console.log(`Состояние: ${item.condition}, скидка: ${item.discount_percentage}%`);
   * });
   * ```
   */
  async getDiscountedProductInfo(
    request: PricesStocksGetDiscountedInfoRequest,
    options?: RequestOptions
  ): Promise<PricesStocksGetDiscountedInfoResponse> {
    return this.httpClient.request<PricesStocksGetDiscountedInfoRequest, PricesStocksGetDiscountedInfoResponse>(
      'POST',
      '/v1/product/info/discounted',
      request,
      options
    );
  }

  /**
   * Информация об остатках на складах продавца (FBS и rFBS)
   * Get FBS warehouse stocks information
   * 
   * Получает информацию об остатках товаров на складах продавца по схемам FBS и rFBS.
   * 
   * @param request - Параметры запроса информации об остатках
   * @param options - Дополнительные опции запроса
   * @returns Информация об остатках на складах
   * 
   * @example
   * ```typescript
   * const stockInfo = await pricesStocksApi.getStocksByWarehouseFbs({
   *   sku: ['123456789', '987654321']
   * });
   * 
   * stockInfo.result?.forEach(product => {
   *   console.log(`SKU: ${product.sku}`);
   *   product.stocks?.forEach(stock => {
   *     console.log(`  Склад ${stock.warehouse_name}: ${stock.present} в наличии, ${stock.reserved} зарезервировано`);
   *   });
   * });
   * ```
   */
  async getStocksByWarehouseFbs(
    request: PricesStocksGetStocksByWarehouseFbsRequest,
    options?: RequestOptions
  ): Promise<PricesStocksGetStocksByWarehouseFbsResponse> {
    return this.httpClient.request<PricesStocksGetStocksByWarehouseFbsRequest, PricesStocksGetStocksByWarehouseFbsResponse>(
      'POST',
      '/v1/product/info/stocks-by-warehouse/fbs',
      request,
      options
    );
  }

  /**
   * Установить скидку на уценённый товар
   * Update discounted product discount
   * 
   * Метод для установки размера скидки на уценённые товары, продающиеся по схеме FBS.
   * 
   * @param request - Параметры запроса установки скидки
   * @param options - Дополнительные опции запроса
   * @returns Результат установки скидки
   * 
   * @example
   * ```typescript
   * const result = await pricesStocksApi.updateDiscountedProductDiscount({
   *   product_id: 123456,
   *   discount: 25
   * });
   * 
   * if (result.result) {
   *   console.log('Скидка успешно установлена');
   * } else {
   *   console.log('Ошибка при установке скидки');
   * }
   * ```
   */
  async updateDiscountedProductDiscount(
    request: PricesStocksUpdateDiscountRequest,
    options?: RequestOptions
  ): Promise<PricesStocksUpdateDiscountResponse> {
    return this.httpClient.request<PricesStocksUpdateDiscountRequest, PricesStocksUpdateDiscountResponse>(
      'POST',
      '/v1/product/update/discount',
      request,
      options
    );
  }

  /**
   * Обновить количество товаров на складах
   * Update product stocks
   * 
   * Позволяет изменить информацию о количестве товара в наличии.
   * За один запрос можно изменить наличие для 100 пар товар-склад.
   * С одного аккаунта продавца можно отправить до 80 запросов в минуту.
   * 
   * @param request - Параметры запроса обновления остатков
   * @param options - Дополнительные опции запроса
   * @returns Результаты обновления остатков
   * 
   * @example
   * ```typescript
   * const result = await pricesStocksApi.updateStocks({
   *   stocks: [{
   *     offer_id: 'ITEM001',
   *     stock: 100,
   *     warehouse_id: 12345
   *   }, {
   *     product_id: 987654,
   *     stock: 50,
   *     warehouse_id: 67890
   *   }]
   * });
   * 
   * result.result?.forEach(item => {
   *   if (item.updated) {
   *     console.log(`Остатки товара ${item.offer_id || item.product_id} обновлены`);
   *   } else {
   *     console.log(`Ошибки: ${item.errors?.join(', ')}`);
   *   }
   * });
   * ```
   */
  async updateStocks(
    request: PricesStocksUpdateStocksRequest,
    options?: RequestOptions
  ): Promise<PricesStocksUpdateStocksResponse> {
    return this.httpClient.request<PricesStocksUpdateStocksRequest, PricesStocksUpdateStocksResponse>(
      'POST',
      '/v2/products/stocks',
      request,
      options
    );
  }

  /**
   * Информация о количестве товаров
   * Get product stocks information
   * 
   * Возвращает информацию о количестве товаров по схемам FBS и rFBS:
   * сколько единиц есть в наличии, сколько зарезервировано покупателями.
   * 
   * @param request - Параметры запроса информации о количестве товаров
   * @param options - Дополнительные опции запроса
   * @returns Информация о количестве товаров
   * 
   * @example
   * ```typescript
   * const stocks = await pricesStocksApi.getStocks({
   *   filter: {
   *     offer_id: ['ITEM001', 'ITEM002'],
   *     visibility: 'VISIBLE'
   *   },
   *   limit: 100
   * });
   * 
   * stocks.items?.forEach(item => {
   *   console.log(`Товар ${item.offer_id} (SKU: ${item.sku})`);
   *   item.stocks?.forEach(stock => {
   *     console.log(`  Склад ${stock.warehouse_id}: ${stock.present} в наличии`);
   *   });
   * });
   * ```
   */
  async getStocks(
    request: PricesStocksGetStocksRequest,
    options?: RequestOptions
  ): Promise<PricesStocksGetStocksResponse> {
    return this.httpClient.request<PricesStocksGetStocksRequest, PricesStocksGetStocksResponse>(
      'POST',
      '/v4/product/info/stocks',
      request,
      options
    );
  }

  /**
   * Получить информацию о цене товара
   * Get product price information
   * 
   * Возвращает информацию о ценах товаров.
   * 
   * @param request - Параметры запроса информации о ценах
   * @param options - Дополнительные опции запроса
   * @returns Информация о ценах товаров
   * 
   * @example
   * ```typescript
   * const prices = await pricesStocksApi.getPrices({
   *   filter: {
   *     offer_id: ['ITEM001', 'ITEM002'],
   *     visibility: 'VISIBLE'
   *   },
   *   limit: 100
   * });
   * 
   * prices.items?.forEach(item => {
   *   console.log(`Товар ${item.offer_id}: цена ${item.price} ${item.currency_code}`);
   *   if (item.old_price) {
   *     console.log(`  Старая цена: ${item.old_price}`);
   *   }
   *   if (item.premium_price) {
   *     console.log(`  Premium цена: ${item.premium_price}`);
   *   }
   * });
   * ```
   */
  async getPrices(
    request: PricesStocksGetPricesRequest,
    options?: RequestOptions
  ): Promise<PricesStocksGetPricesResponse> {
    return this.httpClient.request<PricesStocksGetPricesRequest, PricesStocksGetPricesResponse>(
      'POST',
      '/v5/product/info/prices',
      request,
      options
    );
  }
}