/**
 * SellerRatingAPI client for Ozon Seller API
 * 
 * Implements seller rating management endpoints from /methods/25-sellerrating.json:
 * - Get current seller rating summary with all performance metrics
 * - Retrieve historical rating data with premium program penalty information
 * 
 * Handles seller performance monitoring including delivery ratings, review scores,
 * price indices, cancellation rates, and communication metrics.
 */

import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type {
  // Request types
  GetRatingSummaryRequest,
  GetRatingHistoryRequest,
  
  // Response types
  GetRatingSummaryResponse,
  GetRatingHistoryResponse,
  
  // Base types
  RatingType,
  RatingGroup,
  RatingItem,
  HistoricalRating,
  RatingPremiumScores
} from './types';

/**
 * SellerRatingAPI client for monitoring seller performance metrics
 * 
 * Provides access to seller rating information including current performance
 * metrics, historical trends, and premium program penalty tracking.
 * 
 * **Key Rating Categories:**
 * - **Delivery Performance**: On-time delivery, shipment delays
 * - **Product Quality**: Review scores, order accuracy
 * - **Customer Service**: Response times, chat engagement
 * - **Pricing**: Price competitiveness index
 * - **FBO Performance**: Supply chain efficiency
 * 
 * @example
 * ```typescript
 * // Get current rating summary
 * const summary = await client.sellerRating.getRatingSummary();
 * 
 * console.log('Premium Status:', summary.data.premium);
 * console.log('Penalty Exceeded:', summary.data.penalty_score_exceeded);
 * 
 * // Check each rating group
 * summary.data.groups?.forEach(group => {
 *   console.log(`\n${group.group_name}:`);
 *   group.items?.forEach(item => {
 *     console.log(`  ${item.name}: ${item.current_value} (${item.status})`);
 *     if (item.change?.meaning === 'MEANING_BAD') {
 *       console.warn(`    ⚠️ Rating declined: ${item.change.direction}`);
 *     }
 *   });
 * });
 * 
 * // Get historical data for specific ratings
 * const history = await client.sellerRating.getRatingHistory({
 *   date_from: '2024-01-01T00:00:00Z',
 *   date_to: '2024-01-31T23:59:59Z',
 *   ratings: ['rating_on_time', 'rating_review_avg_score_total'],
 *   with_premium_scores: true
 * });
 * 
 * // Analyze rating trends
 * history.data.ratings?.forEach(rating => {
 *   console.log(`\n${rating.rating}:`);
 *   console.log(`  Danger threshold: ${rating.danger_threshold}`);
 *   console.log(`  Warning threshold: ${rating.warning_threshold}`);
 *   console.log(`  Premium threshold: ${rating.premium_threshold}`);
 *   
 *   // Check recent values
 *   const recentValues = rating.values?.slice(-5) || [];
 *   recentValues.forEach(value => {
 *     const status = value.status?.danger ? 'DANGER' : 
 *                   value.status?.warning ? 'WARNING' : 'OK';
 *     console.log(`  ${value.date_from}: ${value.value} (${status})`);
 *   });
 * });
 * ```
 */
export class SellerRatingAPI {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Get current seller rating summary
   * 
   * Retrieves current seller performance ratings across all categories.
   * Includes localization index, premium program status, and penalty information.
   * 
   * @param params - Empty request object (required by API)
   * @returns Current seller rating summary
   * 
   * @example
   * ```typescript
   * const result = await client.sellerRating.getRatingSummary();
   * 
   * // Check overall status
   * console.log('Premium subscription:', result.data.premium);
   * console.log('Premium Plus subscription:', result.data.premium_plus);
   * console.log('Penalty score exceeded:', result.data.penalty_score_exceeded);
   * 
   * // Check localization index
   * const localization = result.data.localization_index?.[0];
   * if (localization) {
   *   console.log(`Localization: ${localization.localization_percentage}%`);
   *   console.log(`Calculated: ${localization.calculation_date}`);
   * }
   * 
   * // Process rating groups
   * result.data.groups?.forEach(group => {
   *   console.log(`\n=== ${group.group_name} ===`);
   *   
   *   group.items?.forEach(item => {
   *     const direction = item.rating_direction === 'HIGHER_IS_BETTER' ? '↑' :
   *                      item.rating_direction === 'LOWER_IS_BETTER' ? '↓' : '○';
   *     
   *     console.log(`${direction} ${item.name}:`);
   *     console.log(`    Current: ${item.current_value} (was ${item.past_value})`);
   *     console.log(`    Status: ${item.status}`);
   *     console.log(`    Type: ${item.value_type}`);
   *     
   *     // Show change information
   *     if (item.change) {
   *       const changeSymbol = item.change.direction === 'DIRECTION_RISE' ? '📈' :
   *                           item.change.direction === 'DIRECTION_FALL' ? '📉' : '➖';
   *       const meaningSymbol = item.change.meaning === 'MEANING_GOOD' ? '✅' :
   *                            item.change.meaning === 'MEANING_BAD' ? '❌' : 'ℹ️';
   *       
   *       console.log(`    Change: ${changeSymbol} ${meaningSymbol}`);
   *     }
   *   });
   * });
   * ```
   */
  async getRatingSummary(
    params: GetRatingSummaryRequest = {}
  ): Promise<IHttpResponse<GetRatingSummaryResponse>> {
    return this.httpClient.post('/v1/rating/summary', params);
  }

  /**
   * Get seller rating history
   * 
   * Retrieves historical rating data for specified rating types and time period.
   * Optionally includes premium program penalty scores for eligible ratings.
   * 
   * @param params - Rating history request parameters
   * @returns Historical rating data
   * 
   * @example
   * ```typescript
   * // Get 6-month history for key ratings
   * const result = await client.sellerRating.getRatingHistory({
   *   date_from: '2024-01-01T00:00:00Z',
   *   date_to: '2024-06-30T23:59:59Z',
   *   ratings: [
   *     'rating_on_time',
   *     'rating_review_avg_score_total', 
   *     'rating_price',
   *     'rating_order_cancellation'
   *   ],
   *   with_premium_scores: true
   * });
   * 
   * // Analyze each rating's performance
   * result.data.ratings?.forEach(rating => {
   *   console.log(`\n=== ${rating.rating?.toUpperCase()} ===`);
   *   console.log(`Thresholds:`);
   *   console.log(`  🚨 Danger (sales block): ${rating.danger_threshold}`);
   *   console.log(`  ⚠️  Warning: ${rating.warning_threshold}`);
   *   console.log(`  ⭐ Premium: ${rating.premium_threshold}`);
   *   
   *   // Show recent trend (last 10 values)
   *   const recentValues = rating.values?.slice(-10) || [];
   *   console.log(`\nRecent performance:`);
   *   
   *   recentValues.forEach(value => {
   *     const period = `${value.date_from?.split('T')[0]} to ${value.date_to?.split('T')[0]}`;
   *     let statusIcon = '✅';
   *     
   *     if (value.status?.danger) statusIcon = '🚨';
   *     else if (value.status?.warning) statusIcon = '⚠️';
   *     else if (value.status?.premium) statusIcon = '⭐';
   *     
   *     console.log(`  ${statusIcon} ${period}: ${value.value}`);
   *   });
   * });
   * 
   * // Check premium penalty scores
   * if (result.data.premium_scores?.length) {
   *   console.log('\n=== PREMIUM PENALTY SCORES ===');
   *   
   *   result.data.premium_scores.forEach(premiumScore => {
   *     console.log(`\n${premiumScore.rating}:`);
   *     
   *     premiumScore.scores?.forEach(score => {
   *       console.log(`  📅 ${score.date}: ${score.value} penalty points`);
   *       console.log(`     Rating value: ${score.rating_value}`);
   *     });
   *   });
   * }
   * ```
   */
  async getRatingHistory(
    params: GetRatingHistoryRequest
  ): Promise<IHttpResponse<GetRatingHistoryResponse>> {
    return this.httpClient.post('/v1/rating/history', params);
  }

  // ============================================================================
  // Helper Methods
  // ============================================================================

  /**
   * Analyze rating status across all current ratings
   * 
   * Provides a quick analysis of current seller performance status,
   * identifying critical issues, warnings, and positive trends.
   * 
   * @returns Rating analysis summary
   * 
   * @example
   * ```typescript
   * const analysis = await client.sellerRating.analyzeCurrentStatus();
   * 
   * console.log('=== SELLER RATING ANALYSIS ===');
   * console.log(`Premium Status: ${analysis.premiumStatus}`);
   * console.log(`Overall Health: ${analysis.overallHealth}`);
   * console.log();
   * 
   * if (analysis.criticalIssues.length > 0) {
   *   console.log('🚨 CRITICAL ISSUES:');
   *   analysis.criticalIssues.forEach(issue => {
   *     console.log(`  - ${issue.name}: ${issue.current_value} (${issue.reason})`);
   *   });
   *   console.log();
   * }
   * 
   * if (analysis.warnings.length > 0) {
   *   console.log('⚠️ WARNINGS:');
   *   analysis.warnings.forEach(warning => {
   *     console.log(`  - ${warning.name}: ${warning.current_value}`);
   *   });
   *   console.log();
   * }
   * 
   * if (analysis.improvements.length > 0) {
   *   console.log('📈 IMPROVEMENTS:');
   *   analysis.improvements.forEach(improvement => {
   *     console.log(`  - ${improvement.name}: ${improvement.current_value} (up from ${improvement.past_value})`);
   *   });
   *   console.log();
   * }
   * 
   * console.log('💡 RECOMMENDATIONS:');
   * analysis.recommendations.forEach(rec => {
   *   console.log(`  - ${rec}`);
   * });
   * ```
   */
  async analyzeCurrentStatus(): Promise<{
    premiumStatus: 'premium_plus' | 'premium' | 'none';
    overallHealth: 'critical' | 'warning' | 'good' | 'excellent';
    criticalIssues: Array<RatingItem & { reason: string }>;
    warnings: RatingItem[];
    improvements: RatingItem[];
    recommendations: string[];
  }> {
    const summary = await this.getRatingSummary();
    const data = summary.data;

    // Determine premium status
    const premiumStatus = data.premium_plus ? 'premium_plus' :
                         data.premium ? 'premium' : 'none';

    // Collect all rating items
    const allItems: RatingItem[] = [];
    data.groups?.forEach(group => {
      group.items?.forEach(item => allItems.push(item));
    });

    // Categorize issues
    const criticalIssues: Array<RatingItem & { reason: string }> = [];
    const warnings: RatingItem[] = [];
    const improvements: RatingItem[] = [];

    allItems.forEach(item => {
      if (item.status === 'CRITICAL') {
        criticalIssues.push({
          ...item,
          reason: 'Critical rating level reached'
        });
      } else if (item.status === 'WARNING') {
        warnings.push(item);
      } else if (item.change?.meaning === 'MEANING_GOOD') {
        improvements.push(item);
      }
    });

    // Add penalty score as critical issue if exceeded
    if (data.penalty_score_exceeded) {
      criticalIssues.push({
        name: 'Penalty Score Balance',
        current_value: 0,
        status: 'CRITICAL',
        reason: 'Premium penalty score balance exceeded'
      } as RatingItem & { reason: string });
    }

    // Determine overall health
    const overallHealth = criticalIssues.length > 0 ? 'critical' :
                         warnings.length > 2 ? 'warning' :
                         improvements.length > warnings.length ? 'excellent' : 'good';

    // Generate recommendations
    const recommendations: string[] = [];
    
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

  /**
   * Get rating trend analysis for specific rating types
   * 
   * Analyzes historical trends to identify improving, declining, or stable ratings.
   * Useful for understanding performance patterns over time.
   * 
   * @param ratingTypes - Rating types to analyze
   * @param daysBack - Number of days of history to analyze (default: 90)
   * @returns Trend analysis for each rating
   * 
   * @example
   * ```typescript
   * const trends = await client.sellerRating.getRatingTrends([
   *   'rating_on_time',
   *   'rating_review_avg_score_total',
   *   'rating_order_cancellation'
   * ], 60);
   * 
   * trends.forEach(trend => {
   *   console.log(`\n${trend.rating}:`);
   *   console.log(`  Trend: ${trend.trend} (${trend.changePercent > 0 ? '+' : ''}${trend.changePercent.toFixed(1)}%)`);
   *   console.log(`  Current: ${trend.currentValue}`);
   *   console.log(`  Average: ${trend.averageValue.toFixed(2)}`);
   *   console.log(`  Best: ${trend.bestValue}`);
   *   console.log(`  Worst: ${trend.worstValue}`);
   *   
   *   if (trend.riskLevel === 'high') {
   *     console.log(`  ⚠️ High risk: trending toward ${trend.nearestThreshold.type} threshold`);
   *   }
   * });
   * ```
   */
  async getRatingTrends(
    ratingTypes: RatingType[],
    daysBack: number = 90
  ): Promise<Array<{
    rating: RatingType;
    trend: 'improving' | 'declining' | 'stable';
    changePercent: number;
    currentValue: number;
    averageValue: number;
    bestValue: number;
    worstValue: number;
    riskLevel: 'low' | 'medium' | 'high';
    nearestThreshold?: { type: 'danger' | 'warning' | 'premium'; value: number; distance: number };
  }>> {
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
      const values = ratingData?.values?.map(v => v.value).filter(v => v !== undefined) as number[] || [];

      if (values.length === 0) {
        return {
          rating: ratingType,
          trend: 'stable' as const,
          changePercent: 0,
          currentValue: 0,
          averageValue: 0,
          bestValue: 0,
          worstValue: 0,
          riskLevel: 'low' as const
        };
      }

      const currentValue = values[values.length - 1];
      const firstValue = values[0];
      const averageValue = values.reduce((sum, val) => sum + val, 0) / values.length;
      const bestValue = Math.max(...values);
      const worstValue = Math.min(...values);

      // Calculate trend
      const changePercent = firstValue && firstValue !== 0 ? ((currentValue || 0) - firstValue) / firstValue * 100 : 0;
      const trend = Math.abs(changePercent) < 2 ? 'stable' :
                   changePercent > 0 ? 'improving' : 'declining';

      // Assess risk level based on thresholds
      let riskLevel: 'low' | 'medium' | 'high' = 'low';
      let nearestThreshold: { type: 'danger' | 'warning' | 'premium'; value: number; distance: number } | undefined;

      const dangerThreshold = ratingData?.danger_threshold;
      const warningThreshold = ratingData?.warning_threshold;
      const premiumThreshold = ratingData?.premium_threshold;

      const thresholds = [
        dangerThreshold && { type: 'danger' as const, value: dangerThreshold },
        warningThreshold && { type: 'warning' as const, value: warningThreshold },
        premiumThreshold && { type: 'premium' as const, value: premiumThreshold }
      ].filter(Boolean) as Array<{ type: 'danger' | 'warning' | 'premium'; value: number }>;

      if (thresholds.length > 0) {
        // Find nearest threshold
        const thresholdsWithDistance = thresholds.map(t => ({
          ...t,
          distance: Math.abs((currentValue || 0) - t.value)
        }));

        thresholdsWithDistance.sort((a, b) => a.distance - b.distance);
        nearestThreshold = thresholdsWithDistance[0];

        // Determine risk level
        if (nearestThreshold && nearestThreshold.type === 'danger' && nearestThreshold.distance < Math.abs((currentValue || 0) * 0.1)) {
          riskLevel = 'high';
        } else if (nearestThreshold && nearestThreshold.type === 'warning' && nearestThreshold.distance < Math.abs((currentValue || 0) * 0.2)) {
          riskLevel = 'medium';
        }
      }

      return {
        rating: ratingType,
        trend: trend as 'improving' | 'declining' | 'stable',
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

// Re-export types for convenience
export type * from './types';