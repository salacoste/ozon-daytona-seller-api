/**
 * SellerRating API request types
 */

import type { RatingType } from './base';

/**
 * Get rating summary request
 * 
 * No parameters required - returns current ratings for the seller.
 */
export interface GetRatingSummaryRequest {
  // Empty object as per v1Empty schema
}

/**
 * Get rating history request
 * 
 * Retrieves historical rating data for specified ratings and time period.
 */
export interface GetRatingHistoryRequest {
  /** Start date for the rating history period */
  date_from: string;
  /** End date for the rating history period */
  date_to: string;
  /** 
   * List of rating types to retrieve history for.
   * 
   * Available rating types:
   * - `rating_on_time` - On-time delivery percentage (30 days)
   * - `rating_review_avg_score_total` - Average product review score
   * - `rating_price` - Price index comparison
   * - `rating_order_cancellation` - FBS cancellation rate (7 days)  
   * - `rating_shipment_delay` - FBS shipment delay rate (7 days)
   * - `rating_ssl` - FBO performance score
   * - `rating_on_time_supply_delivery` - Supply delivery timeliness (60 days)
   * - `rating_order_accuracy` - Supply accuracy without defects (60 days)
   * - `rating_on_time_supply_cancellation` - Supply cancellation timeliness (60 days)
   * - `rating_reaction_time` - First response time in chat (30 days)
   * - `rating_average_response_time` - Average response time in chat (30 days)
   * - `rating_replied_dialogs_ratio` - Chat response rate within 24h (30 days)
   */
  ratings: RatingType[];
  /** 
   * Whether to include premium program penalty scores in the response.
   * Only applicable for `rating_on_time` and `rating_review_avg_score_total`.
   */
  with_premium_scores?: boolean;
}