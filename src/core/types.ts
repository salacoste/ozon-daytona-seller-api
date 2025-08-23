/**
 * Core types for the Ozon Seller API SDK
 */

// Branded types for better type safety
export type ApiKey = string & { readonly __brand: "ApiKey" };
export type ClientId = string & { readonly __brand: "ClientId" };
export type RequestId = string & { readonly __brand: "RequestId" };
export type IdempotencyKey = string & { readonly __brand: "IdempotencyKey" };

// Configuration types
export interface OzonConfig {
  readonly apiKey: ApiKey;
  readonly clientId: ClientId;
  readonly baseUrl?: string;
  readonly timeout?: number;
  readonly retries?: number;
  readonly userAgent?: string;
}

// HTTP method types
export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

// Request/Response base types
export interface BaseRequest {
  readonly [key: string]: unknown;
}

export interface BaseResponse {
  readonly [key: string]: unknown;
}

export interface ApiErrorResponse {
  readonly code?: string;
  readonly message: string;
  readonly details?: readonly unknown[];
}

// Pagination types
export interface PaginationParams {
  readonly limit?: number;
  readonly last_id?: string;
  readonly since?: string;
  readonly to?: string;
}

export interface PaginatedResponse<T> extends BaseResponse {
  readonly result: {
    readonly items: readonly T[];
    readonly has_next: boolean;
    readonly last_id?: string;
  };
}

// Request options
export interface RequestOptions {
  readonly timeout?: number;
  readonly retries?: number;
  readonly headers?: Record<string, string>;
  readonly signal?: AbortSignal;
  readonly idempotencyKey?: IdempotencyKey;
}

// API endpoint configuration
export interface EndpointConfig {
  readonly method: HttpMethod;
  readonly path: string;
  readonly requiresAuth: boolean;
}

// Utility types
export type NonEmptyArray<T> = readonly [T, ...T[]];
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Status types
export type OperationStatus = "pending" | "in_progress" | "completed" | "failed" | "cancelled";

// Common enums
export enum Language {
  RU = "ru",
  EN = "en",
}

export enum Currency {
  RUB = "RUB",
  USD = "USD",
  EUR = "EUR",
}

// Helper function to create branded types
export const createApiKey = (key: string): ApiKey => key as ApiKey;
export const createClientId = (id: string): ClientId => id as ClientId;
export const createRequestId = (): RequestId => `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}` as RequestId;
export const createIdempotencyKey = (): IdempotencyKey => `idem_${Date.now()}_${Math.random().toString(36).substr(2, 9)}` as IdempotencyKey;
