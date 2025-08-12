/**
 * Pass API response types
 */

import type { ArrivalPass } from './base';

/**
 * Response for passes list
 */
export interface ListPassesResponse {
  /** List of passes */
  arrival_passes?: ArrivalPass[];
  /** Cursor for fetching next data. Empty if no more data */
  cursor?: string;
}

/**
 * Response for carriage pass creation
 */
export interface CreateCarriagePassResponse {
  /** Created pass identifiers */
  arrival_pass_ids?: string[];
}

/**
 * Response for carriage pass update
 */
export interface UpdateCarriagePassResponse {
  // Empty response object
}

/**
 * Response for carriage pass deletion
 */
export interface DeleteCarriagePassResponse {
  // Empty response object
}

/**
 * Response for return pass creation
 */
export interface CreateReturnPassResponse {
  /** Created pass identifiers */
  arrival_pass_ids?: string[];
}

/**
 * Response for return pass update
 */
export interface UpdateReturnPassResponse {
  // Empty response object
}

/**
 * Response for return pass deletion
 */
export interface DeleteReturnPassResponse {
  // Empty response object
}