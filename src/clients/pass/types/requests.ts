/**
 * Pass API request types
 */

import type { ArrivalReason, PassCreateData, PassUpdateData } from './base';

/**
 * Request to list passes
 */
export interface ListPassesRequest {
  /** Cursor for fetching next data */
  cursor?: string;
  /** Filter parameters */
  filter?: ListPassesFilter;
  /** Records limit in response (max 1000, default 1000) */
  limit: number;
}

/**
 * Filter for passes list
 */
export interface ListPassesFilter {
  /** Filter by pass identifiers */
  arrival_pass_ids?: string[];
  /** Filter by arrival reason */
  arrival_reason?: ArrivalReason | string;
  /** Filter by dropoff point identifiers */
  dropoff_point_ids?: string[];
  /** Get only active passes */
  only_active_passes?: boolean;
  /** Filter by warehouse identifiers */
  warehouse_ids?: string[];
}

/**
 * Request to create carriage pass
 */
export interface CreateCarriagePassRequest {
  /** List of passes to create */
  arrival_passes: PassCreateData[];
  /** Carriage identifier */
  carriage_id: number;
}

/**
 * Request to update carriage pass
 */
export interface UpdateCarriagePassRequest {
  /** List of passes to update */
  arrival_passes: PassUpdateData[];
  /** Carriage identifier */
  carriage_id: number;
}

/**
 * Request to delete carriage pass
 */
export interface DeleteCarriagePassRequest {
  /** Pass identifiers to delete */
  arrival_pass_ids: string[];
  /** Carriage identifier */
  carriage_id: number;
}

/**
 * Request to create return pass
 */
export interface CreateReturnPassRequest {
  /** List of passes to create */
  arrival_passes: PassCreateData[];
}

/**
 * Request to update return pass
 */
export interface UpdateReturnPassRequest {
  /** List of passes to update */
  arrival_passes: PassUpdateData[];
}

/**
 * Request to delete return pass
 */
export interface DeleteReturnPassRequest {
  /** Pass identifiers to delete */
  arrival_pass_ids: string[];
}