/**
 * ReturnAPI request types
 */

/**
 * Request to get FBS returns company information
 */
export interface GetFbsReturnsInfoRequest {
  /** Filter parameters */
  filter?: FbsReturnsInfoFilter;
  /** Pagination parameters */
  pagination: FbsReturnsInfoPagination;
}

/**
 * Filter for FBS returns info
 */
export interface FbsReturnsInfoFilter {
  /** Filter by drop-off point identifier */
  place_id?: number;
}

/**
 * Pagination for FBS returns info
 */
export interface FbsReturnsInfoPagination {
  /** Last drop-off point ID from previous page */
  last_id?: number;
  /** Number of drop-off points per page (max 500) */
  limit: number;
}

/**
 * Empty request (used for several endpoints)
 */
export interface EmptyRequest {
  // Empty request object
}

/**
 * Request to list return giveouts
 */
export interface ListGiveoutsRequest {
  /** Last giveout ID from previous page */
  last_id?: number;
  /** Number of items per page (max 500) */
  limit: number;
}

/**
 * Request to get giveout information
 */
export interface GetGiveoutInfoRequest {
  /** Giveout identifier */
  giveout_id: number;
}