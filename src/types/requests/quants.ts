/**
 * Quants API request types
 * Generated from OZON API documentation
 */

import type { BaseRequest } from '../../core/types.js';
import type { QuantCode, ProductVisibilityState, CursorPaginationRequest } from '../common/base.js';

/**
 * Запрос информации об эконом-товаре
 */
export interface QuantInfoRequest extends BaseRequest {
  /** Список квантов с товарами. Минимум 1, максимум 1000 */
  quant_code: QuantCode[];
}

/**
 * Запрос списка эконом-товаров
 */
export interface QuantListRequest extends BaseRequest, CursorPaginationRequest {
  /** Фильтр по видимости товара */
  visibility?: ProductVisibilityState;
}