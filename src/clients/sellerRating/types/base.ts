/**
 * SellerRating API base types
 */

/**
 * Rating direction indicating how the rating should be interpreted
 */
export type RatingDirection = 
  | 'UNKNOWN_DIRECTION'  // Direction not determined
  | 'NEUTRAL'            // Direction doesn't matter
  | 'HIGHER_IS_BETTER'   // Higher values are better
  | 'LOWER_IS_BETTER';   // Lower values are better

/**
 * Rating status indicating current performance
 */
export type RatingStatus = 
  | 'UNKNOWN_STATUS'     // Status not determined
  | 'OK'                 // Everything is good
  | 'WARNING'            // Performance needs attention
  | 'CRITICAL';          // Critical rating level

/**
 * Value type for rating measurements
 */
export type ValueType = 
  | 'UNKNOWN_VALUE'      // Type not determined
  | 'INDEX'              // Index value
  | 'PERCENT'            // Percentage value
  | 'TIME'               // Time measurement
  | 'RATIO'              // Ratio/coefficient
  | 'REVIEW_SCORE'       // Review score
  | 'COUNT';             // Count/quantity

/**
 * Change direction for rating values
 */
export type ChangeDirection = 
  | 'DIRECTION_UNKNOWN'  // Direction not determined
  | 'DIRECTION_NONE'     // No change
  | 'DIRECTION_RISE'     // Value increased
  | 'DIRECTION_FALL';    // Value decreased

/**
 * Change meaning for rating interpretation
 */
export type ChangeMeaning = 
  | 'MEANING_UNKNOWN'    // Meaning unknown
  | 'MEANING_NONE'       // Neutral change
  | 'MEANING_GOOD'       // Positive change (improving)
  | 'MEANING_BAD';       // Negative change (needs action)

/**
 * Available rating types for filtering
 */
export type RatingType = 
  | 'rating_on_time'                      // On-time delivery percentage (30 days)
  | 'rating_review_avg_score_total'       // Average product review score
  | 'rating_price'                        // Price index comparison
  | 'rating_order_cancellation'           // FBS cancellation rate (7 days)
  | 'rating_shipment_delay'               // FBS shipment delay rate (7 days)
  | 'rating_ssl'                          // FBO performance score
  | 'rating_on_time_supply_delivery'      // Supply delivery timeliness (60 days)
  | 'rating_order_accuracy'               // Supply accuracy without defects (60 days)
  | 'rating_on_time_supply_cancellation'  // Supply cancellation timeliness (60 days)
  | 'rating_reaction_time'                // First response time in chat (30 days)
  | 'rating_average_response_time'        // Average response time in chat (30 days)
  | 'rating_replied_dialogs_ratio';       // Chat response rate within 24h (30 days)

/**
 * Rating change information
 */
export interface RatingChange {
  /** How the rating value changed */
  direction?: ChangeDirection;
  /** What the change means (positive/negative) */
  meaning?: ChangeMeaning;
}

/**
 * Individual rating item
 */
export interface RatingItem {
  /** Rating change information */
  change?: RatingChange;
  /** Current rating value */
  current_value?: number;
  /** Display name of the rating */
  name?: string;
  /** Previous rating value */
  past_value?: number;
  /** System name of the rating */
  rating?: string;
  /** Direction preference for this rating */
  rating_direction?: RatingDirection;
  /** Current rating status */
  status?: RatingStatus;
  /** Type of value measurement */
  value_type?: ValueType;
}

/**
 * Rating group containing related ratings
 */
export interface RatingGroup {
  /** Name of the rating group */
  group_name?: string;
  /** List of ratings in this group */
  items?: RatingItem[];
}

/**
 * Localization index information
 */
export interface LocalizationIndex {
  /** Date when index was calculated */
  calculation_date?: string;
  /** Localization percentage value */
  localization_percentage?: number;
}

/**
 * Rating status flags
 */
export interface RatingStatusFlags {
  /** Whether danger threshold is exceeded (sales block) */
  danger?: boolean;
  /** Whether premium threshold is reached */
  premium?: boolean;
  /** Whether warning threshold is exceeded */
  warning?: boolean;
}

/**
 * Historical rating value
 */
export interface HistoricalRatingValue {
  /** Start date for rating calculation */
  date_from?: string;
  /** End date for rating calculation */
  date_to?: string;
  /** Rating status flags */
  status?: RatingStatusFlags;
  /** Rating value */
  value?: number;
}

/**
 * Rating with historical data
 */
export interface HistoricalRating {
  /** Danger threshold value (sales block) */
  danger_threshold?: number;
  /** Premium program threshold value */
  premium_threshold?: number;
  /** System name of the rating */
  rating?: string;
  /** List of rating values over time */
  values?: HistoricalRatingValue[];
  /** Warning threshold value */
  warning_threshold?: number;
}

/**
 * Premium program penalty score
 */
export interface PremiumScore {
  /** Date when penalty points were assigned */
  date?: string;
  /** Rating value that caused the penalty */
  rating_value?: number;
  /** Number of penalty points assigned */
  value?: number;
}

/**
 * Premium scores for a specific rating
 */
export interface RatingPremiumScores {
  /** Rating name */
  rating?: string;
  /** List of penalty scores */
  scores?: PremiumScore[];
}