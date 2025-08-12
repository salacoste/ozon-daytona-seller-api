/**
 * SellerRating API response types
 */

import type { 
  RatingGroup, 
  LocalizationIndex, 
  HistoricalRating, 
  RatingPremiumScores 
} from './base';

/**
 * Get rating summary response
 * 
 * Contains current seller ratings organized by groups, localization index,
 * and premium program information.
 */
export interface GetRatingSummaryResponse {
  /** 
   * List of rating groups containing current seller ratings.
   * Each group contains related ratings (e.g., delivery, quality, communication).
   */
  groups?: RatingGroup[];
  
  /** 
   * Localization index information.
   * Empty if no sales in the last 14 days.
   */
  localization_index?: LocalizationIndex[];
  
  /** 
   * Whether penalty score balance is exceeded.
   * Indicates if seller is at risk of restrictions due to penalty points.
   */
  penalty_score_exceeded?: boolean;
  
  /** 
   * Whether seller has Premium subscription.
   * Premium subscription provides additional benefits and rating thresholds.
   */
  premium?: boolean;
  
  /** 
   * Whether seller has Premium Plus subscription.
   * Premium Plus provides enhanced benefits beyond regular Premium.
   */
  premium_plus?: boolean;
}

/**
 * Get rating history response
 * 
 * Contains historical rating data and premium program penalty scores
 * for the requested time period.
 */
export interface GetRatingHistoryResponse {
  /** 
   * Historical rating information for requested rating types.
   * Contains rating values over time with threshold information.
   */
  ratings?: HistoricalRating[];
  
  /** 
   * Premium program penalty score information.
   * Only included if `with_premium_scores=true` in request and applicable
   * for `rating_on_time` and `rating_review_avg_score_total`.
   */
  premium_scores?: RatingPremiumScores[];
}