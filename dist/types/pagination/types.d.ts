export interface IPageResult<T> {
    readonly result: T;
    readonly hasMore?: boolean;
}
export interface ILastIdPaginationParams {
    readonly limit?: number;
    readonly last_id?: string;
}
export interface ILastIdPageResult<T> extends IPageResult<T> {
    readonly result: T & {
        readonly last_id?: string;
        readonly has_next?: boolean;
    };
}
export interface ICursorPaginationParams {
    readonly limit?: number;
    readonly cursor?: string;
}
export interface ICursorPageResult<T> extends IPageResult<T> {
    readonly result: T & {
        readonly next_cursor?: string;
        readonly has_next?: boolean;
    };
}
export interface IOffsetPaginationParams {
    readonly limit?: number;
    readonly offset?: number;
}
export interface IOffsetPageResult<T> extends IPageResult<T> {
    readonly result: T & {
        readonly total?: number;
        readonly has_next?: boolean;
    };
}
export type LastIdPageFetcher<TParams extends ILastIdPaginationParams, TResult> = (params: TParams) => Promise<ILastIdPageResult<TResult>>;
export type CursorPageFetcher<TParams extends ICursorPaginationParams, TResult> = (params: TParams) => Promise<ICursorPageResult<TResult>>;
export type OffsetPageFetcher<TParams extends IOffsetPaginationParams, TResult> = (params: TParams) => Promise<IOffsetPageResult<TResult>>;
export interface IPaginationConfig {
    readonly defaultLimit?: number;
    readonly maxLimit?: number;
    readonly maxPages?: number;
    readonly delayBetweenPages?: number;
}
export interface IPaginationIteratorResult<T> {
    readonly value: T;
    readonly pageNumber: number;
    readonly totalFetched: number;
    readonly done: boolean;
}
