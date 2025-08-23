/**
 * Returns API implementation
 * For managing FBO and FBS returns
 */

import { HttpClient } from '../../core/http.js';
import type { RequestOptions } from '../../core/types.js';
import type { GetReturnsListRequest } from '../../types/requests/returns.js';
import type { GetReturnsListResponse } from '../../types/responses/returns.js';

/**
 * Returns API для управления возвратами FBO и FBS
 * Returns API for FBO and FBS returns management
 * 
 * @example
 * ```typescript
 * // Получить список возвратов
 * const returns = await returnsApi.getList({
 *   filter: {
 *     status: ['NEW', 'PROCESSING']
 *   },
 *   limit: 50
 * });
 * ```
 */
export class ReturnsApi {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Получить список возвратов FBO и FBS
   * Get FBO and FBS returns list
   * 
   * Метод для получения информации о возвратах с фильтрацией и пагинацией.
   * 
   * @param request - Параметры запроса списка возвратов
   * @param options - Дополнительные опции запроса
   * @returns Список возвратов
   * 
   * @example
   * ```typescript
   * const returns = await returnsApi.getList({
   *   filter: {
   *     created_at_from: '2024-01-01T00:00:00Z',
   *     created_at_to: '2024-01-31T23:59:59Z',
   *     status: ['NEW', 'PROCESSING']
   *   },
   *   limit: 100
   * });
   * 
   * returns.returns?.forEach(returnItem => {
   *   console.log(`Return ${returnItem.id}: ${returnItem.name} - ${returnItem.status}`);
   * });
   * ```
   */
  async getList(
    request: GetReturnsListRequest,
    options?: RequestOptions
  ): Promise<GetReturnsListResponse> {
    return this.httpClient.request<GetReturnsListRequest, GetReturnsListResponse>(
      'POST',
      '/v1/returns/list',
      request,
      options
    );
  }
}