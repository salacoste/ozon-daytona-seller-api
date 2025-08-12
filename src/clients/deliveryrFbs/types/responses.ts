/**
 * DeliveryrFBS API response types
 */

import type { StatusChangeResult, DeliveryInterval } from './base';

/**
 * Response for tracking number assignment operations
 */
export interface SetTrackingNumbersResponse {
  /** Results of tracking number assignment operations */
  result?: StatusChangeResult[];
}

/**
 * Response for "Sent by seller" status change
 */
export interface SetSentBySellerResponse {
  /** Results of status change operations */
  result?: StatusChangeResult[];
}

/**
 * Response for "Delivering" status change
 */
export interface SetDeliveringResponse {
  /** Results of status change operations */
  result?: StatusChangeResult[];
}

/**
 * Response for "Last mile" status change
 */
export interface SetLastMileResponse {
  /** Results of status change operations */
  result?: StatusChangeResult[];
}

/**
 * Response for "Delivered" status change
 */
export interface SetDeliveredResponse {
  /** Results of status change operations */
  result?: StatusChangeResult[];
}

/**
 * Response with available delivery reschedule restrictions
 */
export interface GetTimeslotChangeRestrictionsResponse {
  /** Available date interval for rescheduling */
  delivery_interval?: DeliveryInterval;
  /** Number of remaining reschedule attempts */
  remaining_changes_count?: number;
}

/**
 * Response for timeslot rescheduling operation
 */
export interface SetTimeslotResponse {
  /** True if delivery date was successfully changed */
  result?: boolean;
}

/**
 * Response for cutoff date setting operation
 */
export interface SetCutoffResponse {
  /** True if new cutoff date was successfully set */
  result?: boolean;
}