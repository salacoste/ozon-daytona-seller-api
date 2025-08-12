/**
 * ReturnsAPI base types
 */

/**
 * Time range filter for returns
 */
export interface TimeRange {
  /** Start of the period */
  time_from?: string;
  /** End of the period */
  time_to?: string;
}

/**
 * Money amount with currency
 */
export interface MoneyAmount {
  /** Currency code (e.g., "RUB") */
  currency_code?: string;
  /** Amount as string */
  price?: string;
}

/**
 * Return place information
 */
export interface ReturnPlace {
  /** Place identifier */
  id?: string;
  /** Place name */
  name?: string;
  /** Place address */
  address?: string;
}

/**
 * Visual status information
 */
export interface VisualStatus {
  /** Status identifier */
  id?: number;
  /** Display name */
  display_name?: string;
  /** System name */
  sys_name?: string;
}

/**
 * Return schema types
 */
export type ReturnSchema = 'FBO' | 'FBS';

/**
 * Return types
 */
export type ReturnType = 'FullReturn' | 'PartialReturn';

/**
 * Visual status names enum
 */
export type VisualStatusName = 
  | 'DisputeOpened'
  | 'OnSellerApproval'
  | 'ArrivedAtReturnPlace'
  | 'OnSellerClarification'
  | 'OnSellerClarificationAfterPartialCompensation'
  | 'OfferedPartialCompensation'
  | 'ReturnMoneyApproved'
  | 'PartialCompensationReturned'
  | 'CancelledDisputeNotOpen'
  | 'Rejected'
  | 'CrmRejected'
  | 'Cancelled'
  | 'Approved'
  | 'ApprovedByOzon'
  | 'ReceivedBySeller'
  | 'MovingToSeller'
  | 'ReturnCompensated'
  | 'ReturningToSellerByCourier'
  | 'Utilizing'
  | 'Utilized'
  | 'MoneyReturned'
  | 'PartialCompensationInProcess'
  | 'DisputeYouOpened'
  | 'CompensationRejected'
  | 'DisputeOpening'
  | 'CompensationOffered'
  | 'WaitingCompensation'
  | 'SendingError'
  | 'CompensationRejectedBySla'
  | 'CompensationRejectedBySeller'
  | 'MovingToOzon'
  | 'ReturnedToOzon'
  | 'MoneyReturnedBySystem'
  | 'WaitingShipment';