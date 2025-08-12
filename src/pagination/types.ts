/**
 * Pagination types and interfaces for Ozon Seller API
 */

/**
 * Generic page result interface
 */
export interface IPageResult<T> {
  readonly result: T;
  readonly hasMore?: boolean;
}

/**
 * Last ID pagination parameters
 */
export interface ILastIdPaginationParams {
  readonly limit?: number;
  readonly last_id?: string;
}

/**
 * Last ID page result
 */
export interface ILastIdPageResult<T> extends IPageResult<T> {
  readonly result: T & {
    readonly last_id?: string;
    readonly has_next?: boolean;
  };
}

/**
 * Cursor pagination parameters
 */
export interface ICursorPaginationParams {
  readonly limit?: number;
  readonly cursor?: string;
}

/**
 * Cursor page result
 */
export interface ICursorPageResult<T> extends IPageResult<T> {
  readonly result: T & {
    readonly next_cursor?: string;
    readonly has_next?: boolean;
  };
}

/**
 * Offset pagination parameters
 */
export interface IOffsetPaginationParams {
  readonly limit?: number;
  readonly offset?: number;
}

/**
 * Offset page result
 */
export interface IOffsetPageResult<T> extends IPageResult<T> {
  readonly result: T & {
    readonly total?: number;
    readonly has_next?: boolean;
  };
}

/**
 * Page fetcher function type for last_id pagination
 */
export type LastIdPageFetcher<TParams extends ILastIdPaginationParams, TResult> = (
  params: TParams
) => Promise<ILastIdPageResult<TResult>>;

/**
 * Page fetcher function type for cursor pagination
 */
export type CursorPageFetcher<TParams extends ICursorPaginationParams, TResult> = (
  params: TParams
) => Promise<ICursorPageResult<TResult>>;

/**
 * Page fetcher function type for offset pagination
 */
export type OffsetPageFetcher<TParams extends IOffsetPaginationParams, TResult> = (
  params: TParams
) => Promise<IOffsetPageResult<TResult>>;

/**
 * Pagination iterator configuration
 */
export interface IPaginationConfig {
  readonly defaultLimit?: number;
  readonly maxLimit?: number;
  readonly maxPages?: number;
  readonly delayBetweenPages?: number;
}

/**
 * Pagination iterator result
 */
export interface IPaginationIteratorResult<T> {
  readonly value: T;
  readonly pageNumber: number;
  readonly totalFetched: number;
  readonly done: boolean;
}