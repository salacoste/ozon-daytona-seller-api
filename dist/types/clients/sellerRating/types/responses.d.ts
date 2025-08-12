import type { RatingGroup, LocalizationIndex, HistoricalRating, RatingPremiumScores } from './base';
export interface GetRatingSummaryResponse {
    groups?: RatingGroup[];
    localization_index?: LocalizationIndex[];
    penalty_score_exceeded?: boolean;
    premium?: boolean;
    premium_plus?: boolean;
}
export interface GetRatingHistoryResponse {
    ratings?: HistoricalRating[];
    premium_scores?: RatingPremiumScores[];
}
