/**
 * ReturnAPI request types
 * Generated from OZON API documentation
 */

import type { BaseRequest } from "../../core/types.js";
import type { GiveoutId, DateString, PaginationRequest } from "../common/base.js";

/**
 * Запрос информации о возвратной отгрузке
 */
export interface GiveoutInfoRequest extends BaseRequest {
  /** Идентификатор возвратной отгрузки */
  giveout_id: GiveoutId;
}

/**
 * Запрос списка возвратных отгрузок
 */
export interface GiveoutListRequest extends BaseRequest, PaginationRequest {
  // Наследует limit и last_id от PaginationRequest
}

/**
 * Запрос информации о возвратах FBS
 */
export interface ReturnsCompanyFbsInfoRequest extends BaseRequest {
  /** Дата начала периода */
  date_from?: DateString;
  /** Дата окончания периода */
  date_to?: DateString;
}

/**
 * Пустой запрос для методов без параметров
 */
export interface EmptyRequest extends BaseRequest {
  // Пустой объект для методов без входных параметров
}
