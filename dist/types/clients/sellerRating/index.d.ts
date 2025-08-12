import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type { GetRatingSummaryRequest, GetRatingHistoryRequest, GetRatingSummaryResponse, GetRatingHistoryResponse, RatingType, RatingItem } from './types';
export declare class SellerRatingAPI {
    private readonly httpClient;
    constructor(httpClient: HttpClient);
    getRatingSummary(params?: GetRatingSummaryRequest): Promise<IHttpResponse<GetRatingSummaryResponse>>;
    getRatingHistory(params: GetRatingHistoryRequest): Promise<IHttpResponse<GetRatingHistoryResponse>>;
    analyzeCurrentStatus(): Promise<{
        premiumStatus: 'premium_plus' | 'premium' | 'none';
        overallHealth: 'critical' | 'warning' | 'good' | 'excellent';
        criticalIssues: Array<RatingItem & {
            reason: string;
        }>;
        warnings: RatingItem[];
        improvements: RatingItem[];
        recommendations: string[];
    }>;
    getRatingTrends(ratingTypes: RatingType[], daysBack?: number): Promise<Array<{
        rating: RatingType;
        trend: 'improving' | 'declining' | 'stable';
        changePercent: number;
        currentValue: number;
        averageValue: number;
        bestValue: number;
        worstValue: number;
        riskLevel: 'low' | 'medium' | 'high';
        nearestThreshold?: {
            type: 'danger' | 'warning' | 'premium';
            value: number;
            distance: number;
        };
    }>>;
}
export type * from './types';
