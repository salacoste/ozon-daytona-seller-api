"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellerRatingAPI = void 0;
class SellerRatingAPI {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    async getRatingSummary(params = {}) {
        return this.httpClient.post('/v1/rating/summary', params);
    }
    async getRatingHistory(params) {
        return this.httpClient.post('/v1/rating/history', params);
    }
    async analyzeCurrentStatus() {
        const summary = await this.getRatingSummary();
        const data = summary.data;
        const premiumStatus = data.premium_plus ? 'premium_plus' :
            data.premium ? 'premium' : 'none';
        const allItems = [];
        data.groups?.forEach(group => {
            group.items?.forEach(item => allItems.push(item));
        });
        const criticalIssues = [];
        const warnings = [];
        const improvements = [];
        allItems.forEach(item => {
            if (item.status === 'CRITICAL') {
                criticalIssues.push({
                    ...item,
                    reason: 'Critical rating level reached'
                });
            }
            else if (item.status === 'WARNING') {
                warnings.push(item);
            }
            else if (item.change?.meaning === 'MEANING_GOOD') {
                improvements.push(item);
            }
        });
        if (data.penalty_score_exceeded) {
            criticalIssues.push({
                name: 'Penalty Score Balance',
                current_value: 0,
                status: 'CRITICAL',
                reason: 'Premium penalty score balance exceeded'
            });
        }
        const overallHealth = criticalIssues.length > 0 ? 'critical' :
            warnings.length > 2 ? 'warning' :
                improvements.length > warnings.length ? 'excellent' : 'good';
        const recommendations = [];
        if (criticalIssues.length > 0) {
            recommendations.push('Address critical rating issues immediately to avoid sales restrictions');
        }
        if (warnings.length > 0) {
            recommendations.push('Monitor warning-level ratings to prevent deterioration');
        }
        if (!data.premium && criticalIssues.length === 0) {
            recommendations.push('Consider Premium subscription for better rating thresholds');
        }
        if (data.localization_index?.length === 0) {
            recommendations.push('Increase sales volume to generate localization index');
        }
        if (improvements.length > 0) {
            recommendations.push('Continue current practices that are improving performance');
        }
        return {
            premiumStatus,
            overallHealth,
            criticalIssues,
            warnings,
            improvements,
            recommendations
        };
    }
    async getRatingTrends(ratingTypes, daysBack = 90) {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - daysBack);
        const history = await this.getRatingHistory({
            date_from: startDate.toISOString(),
            date_to: endDate.toISOString(),
            ratings: ratingTypes
        });
        const trends = ratingTypes.map(ratingType => {
            const ratingData = history.data.ratings?.find(r => r.rating === ratingType);
            const values = ratingData?.values?.map(v => v.value).filter(v => v !== undefined) || [];
            if (values.length === 0) {
                return {
                    rating: ratingType,
                    trend: 'stable',
                    changePercent: 0,
                    currentValue: 0,
                    averageValue: 0,
                    bestValue: 0,
                    worstValue: 0,
                    riskLevel: 'low'
                };
            }
            const currentValue = values[values.length - 1];
            const firstValue = values[0];
            const averageValue = values.reduce((sum, val) => sum + val, 0) / values.length;
            const bestValue = Math.max(...values);
            const worstValue = Math.min(...values);
            const changePercent = firstValue && firstValue !== 0 ? ((currentValue || 0) - firstValue) / firstValue * 100 : 0;
            const trend = Math.abs(changePercent) < 2 ? 'stable' :
                changePercent > 0 ? 'improving' : 'declining';
            let riskLevel = 'low';
            let nearestThreshold;
            const dangerThreshold = ratingData?.danger_threshold;
            const warningThreshold = ratingData?.warning_threshold;
            const premiumThreshold = ratingData?.premium_threshold;
            const thresholds = [
                dangerThreshold && { type: 'danger', value: dangerThreshold },
                warningThreshold && { type: 'warning', value: warningThreshold },
                premiumThreshold && { type: 'premium', value: premiumThreshold }
            ].filter(Boolean);
            if (thresholds.length > 0) {
                const thresholdsWithDistance = thresholds.map(t => ({
                    ...t,
                    distance: Math.abs((currentValue || 0) - t.value)
                }));
                thresholdsWithDistance.sort((a, b) => a.distance - b.distance);
                nearestThreshold = thresholdsWithDistance[0];
                if (nearestThreshold && nearestThreshold.type === 'danger' && nearestThreshold.distance < Math.abs((currentValue || 0) * 0.1)) {
                    riskLevel = 'high';
                }
                else if (nearestThreshold && nearestThreshold.type === 'warning' && nearestThreshold.distance < Math.abs((currentValue || 0) * 0.2)) {
                    riskLevel = 'medium';
                }
            }
            return {
                rating: ratingType,
                trend: trend,
                changePercent,
                currentValue: currentValue || 0,
                averageValue,
                bestValue,
                worstValue,
                riskLevel,
                ...(nearestThreshold && { nearestThreshold })
            };
        });
        return trends;
    }
}
exports.SellerRatingAPI = SellerRatingAPI;
