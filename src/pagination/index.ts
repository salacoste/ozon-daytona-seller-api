/**
 * Pagination utilities for Ozon Seller API
 */

// Types and interfaces
export type {
  IPageResult,
  ILastIdPaginationParams,
  ILastIdPageResult,
  ICursorPaginationParams,
  ICursorPageResult,
  IOffsetPaginationParams,
  IOffsetPageResult,
  LastIdPageFetcher,
  CursorPageFetcher,
  OffsetPageFetcher,
  IPaginationConfig,
  IPaginationIteratorResult,
} from './types';

// Last ID pagination
export {
  iterateByLastId,
  collectByLastId,
  collectItemsByLastId,
} from './iterateByLastId';

// Cursor pagination
export {
  iterateByCursor,
  collectByCursor,
  collectItemsByCursor,
} from './iterateByCursor';

// Offset pagination
export {
  iterateByOffset,
  collectByOffset,
  collectItemsByOffset,
} from './iterateByOffset';