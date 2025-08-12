/**
 * CancellationAPI list types
 */

import type { 
  CancellationInitiator, 
  CancellationStateFilter, 
  CancellationReason, 
  CancellationStateDetails 
} from './base';
import type { ConditionalCancellation } from './get';

/**
 * List filters V1
 */
export interface ConditionalCancellationFiltersV1 {
  /** Filter by cancellation initiator */
  cancellation_initiator?: CancellationInitiator[];
  /** Filter by posting numbers */
  posting_number?: string[];
  /** Filter by state */
  state?: CancellationStateFilter;
}

/**
 * List filters V2
 */
export interface ConditionalCancellationFiltersV2 {
  /** Filter by cancellation initiator */
  cancellation_initiator?: CancellationInitiator[];
  /** Filter by posting numbers */
  posting_number?: string[];
  /** Filter by state */
  state?: CancellationStateFilter;
}

/**
 * Additional options V1
 */
export interface ConditionalCancellationWithV1 {
  /** Include counters in response */
  counters?: boolean;
}

/**
 * Additional options V2
 */
export interface ConditionalCancellationWithV2 {
  /** Include counter for ON_APPROVAL status */
  counter?: boolean;
}

/**
 * List conditional cancellations V1 request
 */
export interface ListConditionalCancellationsV1Request {
  /** Filters */
  filters?: ConditionalCancellationFiltersV1;
  /** Number of results to return */
  limit: number;
  /** Number of elements to skip */
  offset?: number;
  /** Additional information to include */
  with?: ConditionalCancellationWithV1;
}

/**
 * List conditional cancellations V2 request
 */
export interface ListConditionalCancellationsV2Request {
  /** Filters */
  filters?: ConditionalCancellationFiltersV2;
  /** Number of results to return (max 500) */
  limit: number;
  /** Last ID from previous page for pagination */
  last_id?: number;
  /** Additional information to include */
  with?: ConditionalCancellationWithV2;
}

/**
 * Counters for different states V1
 */
export interface ConditionalCancellationCounters {
  /** Number of requests awaiting approval */
  on_approval?: number;
  /** Number of approved requests */
  approved?: number;
  /** Number of rejected requests */
  rejected?: number;
}

/**
 * List conditional cancellations V1 response
 */
export interface ListConditionalCancellationsV1Response {
  /** List of cancellation requests */
  result?: ConditionalCancellation[];
  /** Total number of requests matching filters */
  total?: number;
  /** Counters for different states */
  counters?: ConditionalCancellationCounters;
}

/**
 * Conditional cancellation V2 details
 */
export interface ConditionalCancellationV2 {
  /** Comment left when approving/rejecting */
  approve_comment?: string;
  /** Date when request was approved/rejected */
  approve_date?: string;
  /** Date after which request will be auto-approved */
  auto_approve_date?: string;
  /** Cancellation request ID */
  cancellation_id?: number;
  /** Who initiated the cancellation */
  cancellation_initiator?: CancellationInitiator;
  /** Cancellation reason */
  cancellation_reason?: CancellationReason;
  /** Manual comment by cancellation initiator */
  cancellation_reason_message?: string;
  /** Date when cancellation request was created */
  cancelled_at?: string;
  /** Order creation date */
  order_date?: string;
  /** Posting number */
  posting_number?: string;
  /** Previous cancellation ID for backward compatibility */
  source_id?: number;
  /** Cancellation state */
  state?: CancellationStateDetails;
  /** Delivery service integration type */
  tpl_integration_type?: string;
}

/**
 * List conditional cancellations V2 response
 */
export interface ListConditionalCancellationsV2Response {
  /** Counter for ON_APPROVAL status */
  counter?: number;
  /** Last ID for pagination */
  last_id?: number;
  /** List of cancellation requests */
  result?: ConditionalCancellationV2[];
}