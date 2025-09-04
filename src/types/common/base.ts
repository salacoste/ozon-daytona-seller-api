/**
 * Base common types for Ozon Seller API
 * Generated from common-types definitions
 */

import type { BaseRequest, BaseResponse } from "../../core/types.js";

// Empty types for methods with no request/response body
export interface EmptyRequest extends BaseRequest {}
export interface EmptyResponse extends BaseResponse {}

// Base response types
export interface ProductBooleanResponse extends BaseResponse {
  /** Результат обработки запроса. `true`, если запрос выполнен без ошибок. */
  readonly result: boolean;
}

export interface RpcStatus {
  /** Код ошибки. */
  readonly code: number;
  /** Дополнительная информация об ошибке. */
  readonly details: readonly unknown[];
  /** Описание ошибки. */
  readonly message: string;
}

// Common entity identifiers (branded types for safety)
export type ProductId = number & { readonly __brand: "ProductId" };
export type OfferId = string & { readonly __brand: "OfferId" };
export type Sku = number & { readonly __brand: "Sku" };
export type WarehouseId = number & { readonly __brand: "WarehouseId" };
export type CategoryId = number & { readonly __brand: "CategoryId" };

// Common utility types
export type DateString = string; // ISO date string
export type CurrencyCode = "RUB" | "USD" | "EUR" | "CNY" | "KZT" | "BYN" | "UZS";
export type LanguageCode = "ru" | "en";

// Common Product/Return/Quant related types
export type ReturnId = number & { readonly __brand: "ReturnId" };
export type GiveoutId = number & { readonly __brand: "GiveoutId" };
export type QuantCode = string & { readonly __brand: "QuantCode" };

// Common status types shared across categories
export enum ReturnStatus {
  NEW = "NEW",
  PROCESSING = "PROCESSING",
  RETURNED = "RETURNED",
  DECLINED = "DECLINED",
  COMPLETED = "COMPLETED",
}

export enum GiveoutStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
}

// Common product visibility states (extended from existing)
export enum ProductVisibilityState {
  ALL = "ALL",
  VISIBLE = "VISIBLE",
  INVISIBLE = "INVISIBLE",
  EMPTY_STOCK = "EMPTY_STOCK",
  NOT_MODERATED = "NOT_MODERATED",
  MODERATED = "MODERATED",
  DISABLED = "DISABLED",
  STATE_FAILED = "STATE_FAILED",
  READY_TO_SUPPLY = "READY_TO_SUPPLY",
  VALIDATION_STATE_PENDING = "VALIDATION_STATE_PENDING",
  VALIDATION_STATE_FAIL = "VALIDATION_STATE_FAIL",
  VALIDATION_STATE_SUCCESS = "VALIDATION_STATE_SUCCESS",
  TO_SUPPLY = "TO_SUPPLY",
  IN_SALE = "IN_SALE",
  REMOVED_FROM_SALE = "REMOVED_FROM_SALE",
  OVERPRICED = "OVERPRICED",
  CRITICALLY_OVERPRICED = "CRITICALLY_OVERPRICED",
  EMPTY_BARCODE = "EMPTY_BARCODE",
  BARCODE_EXISTS = "BARCODE_EXISTS",
  QUARANTINE = "QUARANTINE",
  ARCHIVED = "ARCHIVED",
  OVERPRICED_WITH_STOCK = "OVERPRICED_WITH_STOCK",
  PARTIAL_APPROVED = "PARTIAL_APPROVED",
}

// Common shared interfaces used across categories
export interface BasicProductInfo {
  /** SKU товара */
  sku?: Sku;
  /** Название товара */
  name?: string;
  /** Артикул товара в системе продавца */
  offer_id?: OfferId;
  /** Цена товара */
  price?: string;
  /** Валюта цены */
  currency_code?: CurrencyCode;
}

export interface PaginationRequest {
  /** Лимит количества элементов */
  limit?: number;
  /** Идентификатор последнего элемента для пагинации */
  last_id?: number;
}

export interface CursorPaginationRequest {
  /** Указатель для выборки следующих данных */
  cursor?: string;
  /** Максимальное количество элементов в ответе */
  limit?: number;
}

export interface PaginationResponse {
  /** Есть ли следующая страница */
  has_next?: boolean;
}

export interface CursorPaginationResponse {
  /** Указатель для выборки следующих данных */
  cursor?: string;
}

// Common enums
export enum ProductStatus {
  CREATED = "CREATED",
  MODERATED = "MODERATED",
  DECLINED = "DECLINED",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
}

export enum VisibilityStatus {
  ALL = "ALL",
  VISIBLE = "VISIBLE",
  INVISIBLE = "INVISIBLE",
  EMPTY_STOCK = "EMPTY_STOCK",
  NOT_MODERATED = "NOT_MODERATED",
  MODERATED = "MODERATED",
  DISABLED = "DISABLED",
  STATE_FAILED = "STATE_FAILED",
}

// Helper functions to create branded types
export const createProductId = (id: number): ProductId => id as ProductId;
export const createOfferId = (id: string): OfferId => id as OfferId;
export const createSku = (sku: number): Sku => sku as Sku;
export const createWarehouseId = (id: number): WarehouseId => id as WarehouseId;
export const createCategoryId = (id: number): CategoryId => id as CategoryId;
export const createReturnId = (id: number): ReturnId => id as ReturnId;
export const createGiveoutId = (id: number): GiveoutId => id as GiveoutId;
export const createQuantCode = (code: string): QuantCode => code as QuantCode;
