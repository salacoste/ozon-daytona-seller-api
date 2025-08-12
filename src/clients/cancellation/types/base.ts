/**
 * CancellationAPI base types
 */

/**
 * Cancellation initiator type
 */
export type CancellationInitiator = 
  | 'OZON'      // Ozon platform
  | 'SELLER'    // Seller
  | 'CLIENT'    // Customer/buyer  
  | 'SYSTEM'    // System
  | 'DELIVERY'; // Delivery service

/**
 * Cancellation state for filtering
 */
export type CancellationStateFilter = 
  | 'ALL'         // All states
  | 'ON_APPROVAL' // Awaiting approval
  | 'APPROVED'    // Approved
  | 'REJECTED';   // Rejected

/**
 * Cancellation state enum
 */
export type CancellationState = 
  | 'ON_APPROVAL' // Awaiting approval
  | 'APPROVED'    // Approved
  | 'REJECTED';   // Rejected

/**
 * Cancellation reason details
 */
export interface CancellationReason {
  /** Cancellation reason ID */
  id?: number;
  /** Cancellation reason name */
  name?: string;
}

/**
 * Cancellation state details
 */
export interface CancellationStateDetails {
  /** State ID */
  id?: number;
  /** State name */
  name?: string;
  /** State enum value */
  state?: CancellationState;
}