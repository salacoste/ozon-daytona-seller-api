/**
 * CancellationAPI get types
 */

import type { CancellationInitiator, CancellationReason, CancellationStateDetails } from './base';

/**
 * Get conditional cancellation V1 request
 */
export interface GetConditionalCancellationV1Request {
  /** Cancellation request ID */
  cancellation_id: number;
}

/**
 * Conditional cancellation details
 */
export interface ConditionalCancellation {
  /** Cancellation request ID */
  cancellation_id?: number;
  /** Posting number */
  posting_number?: string;
  /** Cancellation reason */
  cancellation_reason?: CancellationReason;
  /** Date when cancellation request was created */
  cancelled_at?: string;
  /** Manual comment by cancellation initiator */
  cancellation_reason_message?: string;
  /** Delivery service integration type */
  tpl_integration_type?: string;
  /** Cancellation state */
  state?: CancellationStateDetails;
  /** Who initiated the cancellation */
  cancellation_initiator?: CancellationInitiator;
  /** Order creation date */
  order_date?: string;
  /** Comment left when approving/rejecting */
  approve_comment?: string;
  /** Date when request was approved/rejected */
  approve_date?: string;
  /** Date after which request will be auto-approved */
  auto_approve_date?: string;
}

/**
 * Get conditional cancellation V1 response
 */
export interface GetConditionalCancellationV1Response {
  /** Cancellation details */
  result?: ConditionalCancellation;
}