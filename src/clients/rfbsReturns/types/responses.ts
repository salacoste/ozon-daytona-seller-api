/**
 * RFBSReturnsAPI response types
 */

import type { ReturnItem, ReturnRequest } from './base';

/**
 * List returns response V2
 */
export interface ListReturnsV2Response {
  /** List of return requests */
  returns?: ReturnRequest[];
  /** Indicates if there are more results */
  has_next?: boolean;
  /** Last ID for next page */
  last_id?: number;
}

/**
 * Get return details response V2
 */
export interface GetReturnV2Response {
  /** Return request details */
  return?: ReturnRequest;
}

/**
 * Empty response (success confirmation)
 */
export interface EmptyResponse {
  // Empty response indicates success
}

/**
 * Reject return response V2 (deprecated)
 */
export interface RejectReturnV2Response extends EmptyResponse {}

/**
 * Compensate return response V2 (deprecated)
 */
export interface CompensateReturnV2Response extends EmptyResponse {}

/**
 * Verify return response V2 (deprecated)
 */
export interface VerifyReturnV2Response extends EmptyResponse {}

/**
 * Receive return response V2
 */
export interface ReceiveReturnV2Response extends EmptyResponse {}

/**
 * Return money response V2
 */
export interface ReturnMoneyV2Response extends EmptyResponse {}

/**
 * Set return action response (new API)
 */
export interface SetReturnActionResponse extends EmptyResponse {}