/**
 * RFBSReturnsAPI base types
 */

/**
 * Time range filter
 */
export interface TimeRange {
  /** Start time (ISO 8601) */
  from?: string;
  /** End time (ISO 8601) */
  to?: string;
}

/**
 * Money amount with currency
 */
export interface MoneyAmount {
  /** Currency code (e.g., "RUB") */
  currency_code?: string;
  /** Amount value */
  value?: string;
}

/**
 * Return group state for filtering
 */
export type ReturnGroupState = 
  | 'ALL'
  | 'PENDING'
  | 'APPROVED'
  | 'REJECTED'
  | 'COMPENSATED'
  | 'RETURNED';

/**
 * Return action type for the new action API
 */
export type ReturnAction = 
  | 'APPROVE'    // Approve return request
  | 'REJECT'     // Reject return request
  | 'COMPENSATE' // Provide partial compensation
  | 'RECEIVE'    // Confirm receipt of returned item
  | 'REFUND';    // Issue full refund

/**
 * Return item status
 */
export type ReturnStatus = 
  | 'PENDING'
  | 'APPROVED'
  | 'REJECTED'
  | 'RECEIVED'
  | 'COMPENSATED'
  | 'REFUNDED';

/**
 * Return item information
 */
export interface ReturnItem {
  /** Return ID */
  id?: string;
  /** Return number */
  return_number?: string;
  /** Posting number */
  posting_number?: string;
  /** Product offer ID */
  offer_id?: string;
  /** Product SKU */
  sku?: string;
  /** Product name */
  product_name?: string;
  /** Return quantity */
  quantity?: number;
  /** Return reason */
  reason?: string;
  /** Return status */
  status?: ReturnStatus;
  /** Creation timestamp */
  created_at?: string;
  /** Last update timestamp */
  updated_at?: string;
  /** Product price */
  price?: MoneyAmount;
  /** Compensation amount */
  compensation_amount?: MoneyAmount;
  /** Seller comment */
  comment?: string;
  /** Customer comment/reason */
  customer_comment?: string;
}

/**
 * Return request details
 */
export interface ReturnRequest {
  /** Return request ID */
  id?: string;
  /** Return items */
  items?: ReturnItem[];
  /** Total compensation amount */
  total_compensation?: MoneyAmount;
  /** Request status */
  status?: ReturnStatus;
  /** Creation timestamp */
  created_at?: string;
  /** Customer information */
  customer_info?: CustomerInfo;
}

/**
 * Customer information for returns
 */
export interface CustomerInfo {
  /** Customer ID */
  customer_id?: string;
  /** Customer name */
  name?: string;
  /** Contact information */
  contact?: string;
}