import type { RatingType } from './base';
export interface GetRatingSummaryRequest {
}
export interface GetRatingHistoryRequest {
    date_from: string;
    date_to: string;
    ratings: RatingType[];
    with_premium_scores?: boolean;
}
