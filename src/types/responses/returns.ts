/**
 * ReturnsAPI response types
 * Generated from OZON API documentation
 */

import type { BaseResponse } from '../../core/types.js';
import type { ReturnId, BasicProductInfo, ReturnStatus, DateString, CurrencyCode, PaginationResponse } from '../common/base.js';

/**
 * Элемент возврата в списке
 */
export interface GetReturnsListResponseReturnsItem extends BasicProductInfo {
  /** Идентификатор возврата */
  id?: ReturnId;
  /** Количество возвращаемых товаров */
  quantity?: number;
  /** Причина возврата */
  reason?: string;
  /** Статус возврата */
  status?: ReturnStatus;
  /** Дата создания возврата */
  created_at?: DateString;
  /** Дата обновления возврата */
  updated_at?: DateString;
  /** Сумма возврата */
  amount?: string;
  /** Валюта возврата */
  currency_code?: CurrencyCode;
}

/**
 * Ответ на запрос списка возвратов FBO и FBS
 */
export interface GetReturnsListResponse extends BaseResponse, PaginationResponse {
  /** Информация о возвратах */
  returns?: GetReturnsListResponseReturnsItem[];
}