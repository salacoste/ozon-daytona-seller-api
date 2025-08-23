/**
 * ReturnsAPI request types
 * Generated from OZON API documentation
 */

import type { BaseRequest } from '../../core/types.js';
import type { Sku, ReturnStatus, DateString, PaginationRequest } from '../common/base.js';

/**
 * Фильтр для запроса списка возвратов
 */
export interface GetReturnsListRequestFilter {
  /** Дата начала периода для фильтрации возвратов */
  created_at_from?: DateString;
  /** Дата окончания периода для фильтрации возвратов */
  created_at_to?: DateString;
  /** Идентификаторы товаров для фильтрации */
  sku?: Sku[];
  /** Статусы возвратов для фильтрации */
  status?: ReturnStatus[];
}

/**
 * Запрос списка возвратов FBO и FBS
 */
export interface GetReturnsListRequest extends BaseRequest, PaginationRequest {
  /** Фильтр для возвратов */
  filter?: GetReturnsListRequestFilter;
  /** Количество подгружаемых возвратов. Максимальное значение — 500 */
  limit: number;
}