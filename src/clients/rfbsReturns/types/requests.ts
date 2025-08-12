/**
 * RFBSReturnsAPI request types
 */

import type { TimeRange, ReturnGroupState, ReturnAction, MoneyAmount } from './base';

/**
 * List returns filter
 */
export interface ReturnsListFilter {
  /** Product offer ID filter */
  offer_id?: string;
  /** Posting number filter */
  posting_number?: string;
  /** Return group states to include */
  group_state?: ReturnGroupState[];
  /** Creation date range */
  created_at?: TimeRange;
}

/**
 * List returns request V2
 */
export interface ListReturnsV2Request {
  /** Filtering parameters */
  filter?: ReturnsListFilter;
  /** Last ID for pagination */
  last_id?: number;
  /** Maximum number of returns to fetch (1-1000) */
  limit?: number;
}

/**
 * Get return details request V2
 */
export interface GetReturnV2Request {
  /** Return ID */
  return_id: string;
}

/**
 * Reject return request V2 (deprecated)
 */
export interface RejectReturnV2Request {
  /** Return ID */
  return_id: string;
  /** Rejection comment */
  comment?: string;
}

/**
 * Compensate return request V2 (deprecated)
 */
export interface CompensateReturnV2Request {
  /** Return ID */
  return_id: string;
  /** Compensation amount */
  compensation_amount: MoneyAmount;
  /** Compensation comment */
  comment?: string;
}

/**
 * Verify/approve return request V2 (deprecated)
 */
export interface VerifyReturnV2Request {
  /** Return ID */
  return_id: string;
  /** Approval comment */
  comment?: string;
}

/**
 * Receive return request V2
 */
export interface ReceiveReturnV2Request {
  /** Return ID */
  return_id: string;
  /** Items received */
  items?: ReceivedItem[];
  /** Receipt comment */
  comment?: string;
}

/**
 * Received item details
 */
export interface ReceivedItem {
  /** Product offer ID */
  offer_id: string;
  /** Quantity received */
  quantity: number;
  /** Item condition assessment */
  condition?: ItemCondition;
  /** Comments about item condition */
  condition_comment?: string;
}

/**
 * Item condition assessment
 */
export type ItemCondition = 
  | 'PERFECT'     // Item in perfect condition
  | 'GOOD'        // Item in good condition 
  | 'DAMAGED'     // Item has damage
  | 'UNUSABLE';   // Item cannot be resold

/**
 * Return money request V2
 */
export interface ReturnMoneyV2Request {
  /** Return ID */
  return_id: string;
  /** Refund amount */
  refund_amount: MoneyAmount;
  /** Refund comment */
  comment?: string;
}

/**
 * Set return action request (new API)
 */
export interface SetReturnActionRequest {
  /** Return ID */
  return_id: string;
  /** Action to perform */
  action: ReturnAction;
  /** Action parameters */
  parameters?: ActionParameters;
}

/**
 * Action parameters for different return actions
 */
export interface ActionParameters {
  /** Compensation amount (for COMPENSATE action) */
  compensation_amount?: MoneyAmount;
  /** Refund amount (for REFUND action) */
  refund_amount?: MoneyAmount;
  /** Received items (for RECEIVE action) */
  received_items?: ReceivedItem[];
  /** Comment for any action */
  comment?: string;
}