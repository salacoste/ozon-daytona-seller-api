/**
 * DeliveryrFBS API request types
 */

import type { TrackingNumberAssignment, NewTimeslot } from './base';

/**
 * Request to assign tracking numbers to postings
 */
export interface SetTrackingNumbersRequest {
  /** Array of posting-tracking number pairs (max 20) */
  tracking_numbers: TrackingNumberAssignment[];
}

/**
 * Request to change posting status to "Sent by seller"
 */
export interface SetSentBySellerRequest {
  /** List of posting identifiers */
  posting_number: string[];
}

/**
 * Request to change posting status to "Delivering"
 */
export interface SetDeliveringRequest {
  /** List of posting identifiers */
  posting_number: string[];
}

/**
 * Request to change posting status to "Last mile"
 */
export interface SetLastMileRequest {
  /** List of posting identifiers */
  posting_number: string[];
}

/**
 * Request to change posting status to "Delivered"
 */
export interface SetDeliveredRequest {
  /** List of posting identifiers */
  posting_number: string[];
}

/**
 * Request to get available delivery reschedule dates
 */
export interface GetTimeslotChangeRestrictionsRequest {
  /** Posting identifier */
  posting_number: string;
}

/**
 * Request to reschedule delivery timeslot
 */
export interface SetTimeslotRequest {
  /** New delivery timeslot */
  new_timeslot: NewTimeslot;
  /** Posting identifier */
  posting_number: string;
}

/**
 * Request to set posting cutoff date
 */
export interface SetCutoffRequest {
  /** New cutoff date for shipment */
  new_cutoff_date: string;
  /** Posting identifier */
  posting_number: string;
}