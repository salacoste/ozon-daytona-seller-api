/**
 * CancellationAPI action types (approve/reject)
 */

/**
 * Approve/Reject conditional cancellation V1 request
 */
export interface ConditionalCancellationActionV1Request {
  /** Cancellation request ID */
  cancellation_id: number;
  /** Comment for the action (required for reject) */
  comment?: string;
}

/**
 * Approve/Reject conditional cancellation V2 request
 */
export interface ConditionalCancellationActionV2Request {
  /** Cancellation request ID */
  cancellation_id: number;
  /** Comment for the action (required for reject) */
  comment?: string;
}

/**
 * Empty response for successful operations
 */
export interface EmptyResponse {
  // Empty object
}

/**
 * Approve conditional cancellation V1 response
 */
export interface ApproveConditionalCancellationV1Response extends EmptyResponse {}

/**
 * Approve conditional cancellation V2 response
 */
export interface ApproveConditionalCancellationV2Response extends EmptyResponse {}

/**
 * Reject conditional cancellation V1 response
 */
export interface RejectConditionalCancellationV1Response extends EmptyResponse {}

/**
 * Reject conditional cancellation V2 response
 */
export interface RejectConditionalCancellationV2Response extends EmptyResponse {}