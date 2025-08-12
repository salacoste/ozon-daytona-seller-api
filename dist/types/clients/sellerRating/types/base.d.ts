export type RatingDirection = 'UNKNOWN_DIRECTION' | 'NEUTRAL' | 'HIGHER_IS_BETTER' | 'LOWER_IS_BETTER';
export type RatingStatus = 'UNKNOWN_STATUS' | 'OK' | 'WARNING' | 'CRITICAL';
export type ValueType = 'UNKNOWN_VALUE' | 'INDEX' | 'PERCENT' | 'TIME' | 'RATIO' | 'REVIEW_SCORE' | 'COUNT';
export type ChangeDirection = 'DIRECTION_UNKNOWN' | 'DIRECTION_NONE' | 'DIRECTION_RISE' | 'DIRECTION_FALL';
export type ChangeMeaning = 'MEANING_UNKNOWN' | 'MEANING_NONE' | 'MEANING_GOOD' | 'MEANING_BAD';
export type RatingType = 'rating_on_time' | 'rating_review_avg_score_total' | 'rating_price' | 'rating_order_cancellation' | 'rating_shipment_delay' | 'rating_ssl' | 'rating_on_time_supply_delivery' | 'rating_order_accuracy' | 'rating_on_time_supply_cancellation' | 'rating_reaction_time' | 'rating_average_response_time' | 'rating_replied_dialogs_ratio';
export interface RatingChange {
    direction?: ChangeDirection;
    meaning?: ChangeMeaning;
}
export interface RatingItem {
    change?: RatingChange;
    current_value?: number;
    name?: string;
    past_value?: number;
    rating?: string;
    rating_direction?: RatingDirection;
    status?: RatingStatus;
    value_type?: ValueType;
}
export interface RatingGroup {
    group_name?: string;
    items?: RatingItem[];
}
export interface LocalizationIndex {
    calculation_date?: string;
    localization_percentage?: number;
}
export interface RatingStatusFlags {
    danger?: boolean;
    premium?: boolean;
    warning?: boolean;
}
export interface HistoricalRatingValue {
    date_from?: string;
    date_to?: string;
    status?: RatingStatusFlags;
    value?: number;
}
export interface HistoricalRating {
    danger_threshold?: number;
    premium_threshold?: number;
    rating?: string;
    values?: HistoricalRatingValue[];
    warning_threshold?: number;
}
export interface PremiumScore {
    date?: string;
    rating_value?: number;
    value?: number;
}
export interface RatingPremiumScores {
    rating?: string;
    scores?: PremiumScore[];
}
