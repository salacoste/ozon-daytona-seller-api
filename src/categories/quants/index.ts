/**
 * Quants API implementation
 * For product quantity and SKU management
 */

import { HttpClient } from "../../core/http.js";
import type { RequestOptions } from "../../core/types.js";
import type { QuantInfoRequest, QuantListRequest } from "../../types/requests/quants.js";
import type { QuantInfoResponse, QuantListResponse } from "../../types/responses/quants.js";

/**
 * Quants API для управления количествами и SKU товаров
 * Quants API for product quantity and SKU management
 *
 * @example
 * ```typescript
 * // Получить информацию об эконом-товарах
 * const quantInfo = await quantsApi.getInfo({
 *   quant_code: ['QUANT001', 'QUANT002']
 * });
 *
 * // Получить список эконом-товаров
 * const quantList = await quantsApi.getList({
 *   visibility: 'VISIBLE',
 *   limit: 100
 * });
 * ```
 */
export class QuantsApi {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Получить информацию об эконом-товаре
   * Get economy product info
   *
   * Метод для получения подробной информации об эконом-товарах по кодам квантов.
   *
   * @param request - Параметры запроса информации об эконом-товаре
   * @param options - Дополнительные опции запроса
   * @returns Информация об эконом-товаре
   *
   * @example
   * ```typescript
   * const quantInfo = await quantsApi.getInfo({
   *   quant_code: ['QUANT001', 'QUANT002', 'QUANT003']
   * });
   *
   * quantInfo.items?.forEach(item => {
   *   console.log(`${item.name}: ${item.quantity} шт, ${item.price} ${item.currency_code}`);
   * });
   * ```
   */
  async getInfo(request: QuantInfoRequest, options?: RequestOptions): Promise<QuantInfoResponse> {
    return this.httpClient.request<QuantInfoRequest, QuantInfoResponse>("POST", "/v1/product/quant/info", request, options);
  }

  /**
   * Получить список эконом-товаров
   * Get economy products list
   *
   * Метод для получения списка эконом-товаров с фильтрацией и пагинацией.
   *
   * @param request - Параметры запроса списка эконом-товаров
   * @param options - Дополнительные опции запроса
   * @returns Список эконом-товаров
   *
   * @example
   * ```typescript
   * const quantList = await quantsApi.getList({
   *   visibility: 'IN_SALE',
   *   limit: 50,
   *   cursor: 'next_page_cursor'
   * });
   *
   * quantList.products?.forEach(product => {
   *   console.log(`${product.name} (${product.quant_code}): ${product.status}`);
   * });
   *
   * // Для следующей страницы используйте cursor из ответа
   * if (quantList.cursor) {
   *   const nextPage = await quantsApi.getList({
   *     cursor: quantList.cursor,
   *     limit: 50
   *   });
   * }
   * ```
   */
  async getList(request?: QuantListRequest, options?: RequestOptions): Promise<QuantListResponse> {
    return this.httpClient.request<QuantListRequest, QuantListResponse>("POST", "/v1/product/quant/list", request ?? {}, options);
  }
}
