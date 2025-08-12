/**
 * ReturnsAPI request types
 */

import type { TimeRange, ReturnSchema, VisualStatusName } from './base';

/**
 * Returns list request filter
 * 
 * ⚠️ **Important**: Use only one date filter in the request: `logistic_return_date`, 
 * `storage_tariffication_start_date` OR `visual_status_change_moment`, otherwise error will be returned.
 */
export interface GetReturnsListRequestFilter {
  /** Filter by return creation date */
  logistic_return_date?: TimeRange;
  /** Filter by tariffication start date */
  storage_tariffication_start_date?: TimeRange;
  /** Filter by status change date */
  visual_status_change_moment?: TimeRange;
  /** Filter by order identifier */
  order_id?: number;
  /** Filter by posting numbers (max 50 postings) */
  posting_numbers?: string[];
  /** Filter by product name */
  product_name?: string;
  /** Filter by product offer ID */
  offer_id?: string;
  /** Filter by return visual status */
  visual_status_name?: VisualStatusName;
  /** Filter by warehouse ID (use /v1/warehouse/list to get IDs) */
  warehouse_id?: number;
  /** Filter by return label barcode */
  barcode?: string;
  /** Filter by delivery schema: FBS or FBO */
  return_schema?: ReturnSchema;
}

/**
 * Get returns list request
 */
export interface GetReturnsListV1Request {
  /** Filters (use only one date filter) */
  filter?: GetReturnsListRequestFilter;
  /** Number of returns to load (max 500) */
  limit: number;
  /** ID of last loaded return for pagination */
  last_id?: number;
}