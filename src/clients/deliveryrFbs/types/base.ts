/**
 * DeliveryrFBS API base types
 */

/**
 * Tracking number assignment for posting
 */
export interface TrackingNumberAssignment {
  /** Posting identifier */
  posting_number: string;
  /** Tracking number to assign */
  tracking_number: string;
}

/**
 * Status change operation result
 */
export interface StatusChangeResult {
  /** Error message if operation failed */
  error?: string;
  /** Posting identifier */
  posting_number?: string;
  /** Whether operation was successful */
  result?: boolean;
}

/**
 * Delivery interval/timeslot
 */
export interface DeliveryInterval {
  /** Start date of the interval */
  begin?: string;
  /** End date of the interval */
  end?: string;
}

/**
 * New timeslot for delivery rescheduling
 */
export interface NewTimeslot {
  /** Start date of new delivery window */
  from: string;
  /** End date of new delivery window */
  to: string;
}