/**
 * Quants API response types
 * Generated from OZON API documentation
 */

import type { BaseResponse } from "../../core/types.js";
import type { QuantCode, BasicProductInfo, ProductStatus, ProductVisibilityState, DateString, CursorPaginationResponse } from "../common/base.js";

/**
 * Элемент информации об эконом-товаре
 */
export interface QuantInfoResponseItem extends BasicProductInfo {
  /** Код кванта */
  quant_code?: QuantCode;
  /** Количество товара */
  quantity?: number;
  /** Статус товара */
  status?: ProductStatus;
  /** Видимость товара */
  visibility?: ProductVisibilityState;
}

/**
 * Ответ на запрос информации об эконом-товаре
 */
export interface QuantInfoResponse extends BaseResponse {
  /** Эконом-товары */
  items?: QuantInfoResponseItem[];
}

/**
 * Товар в списке эконом-товаров
 */
export interface QuantListResponseProduct extends BasicProductInfo {
  /** Код кванта */
  quant_code?: QuantCode;
  /** Количество товара */
  quantity?: number;
  /** Статус товара */
  status?: ProductStatus;
  /** Видимость товара */
  visibility?: ProductVisibilityState;
  /** Дата создания */
  created_at?: DateString;
  /** Дата обновления */
  updated_at?: DateString;
}

/**
 * Ответ на запрос списка эконом-товаров
 */
export interface QuantListResponse extends BaseResponse, CursorPaginationResponse {
  /** Эконом-товары */
  products?: QuantListResponseProduct[];
  /** Общее количество товаров */
  total_items?: number;
}
