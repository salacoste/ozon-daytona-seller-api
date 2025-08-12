/**
 * ReviewAPI client for Ozon Seller API
 * 
 * Implements review management endpoints from /beta/03-reviewapi.json:
 * - List and filter customer reviews with advanced search
 * - Get detailed review information with analytics
 * - Create, list, and delete seller comments on reviews
 * - Change review processing status for workflow management
 * - Get review counts by status for dashboard insights
 * 
 * **Beta API**: Available only for Premium Plus sellers.
 * Handles customer review interactions and seller response management.
 */

import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type {
  // Request types
  CommentCreateRequest,
  CommentDeleteRequest,
  CommentListRequest,
  ReviewChangeStatusRequest,
  ReviewCountRequest,
  ReviewInfoRequest,
  ReviewListRequest,
  
  // Response types
  CommentCreateResponse,
  CommentDeleteResponse,
  CommentListResponse,
  ReviewChangeStatusResponse,
  ReviewCountResponse,
  ReviewInfoResponse,
  ReviewListResponse,
  
  // Base types
  Review,
  Comment,
  ReviewAnalytics,
  ReviewStatus
} from './types';

/**
 * ReviewAPI client for managing product reviews and seller responses
 * 
 * **Beta Feature**: Available only for Premium Plus subscription.
 * Provides comprehensive review management including customer feedback handling,
 * seller response capabilities, and review processing workflows.
 * 
 * **Key Features:**
 * - **Review Management**: List, filter, and process customer reviews
 * - **Comment System**: Respond to reviews with seller comments
 * - **Status Tracking**: Manage review processing workflow
 * - **Analytics**: Get insights on review performance and response rates
 * 
 * @example
 * ```typescript
 * // Get unprocessed reviews
 * const unprocessedReviews = await client.reviewApi.listReviews({
 *   limit: 50,
 *   filter: {
 *     status: ['NEW'],
 *     rating: [1, 2, 3] // Focus on lower ratings
 *   }
 * });
 * 
 * console.log(`Found ${unprocessedReviews.data.total} unprocessed reviews`);
 * 
 * // Respond to a review
 * if (unprocessedReviews.data.reviews.length > 0) {
 *   const review = unprocessedReviews.data.reviews[0];
 *   
 *   const comment = await client.reviewApi.createComment({
 *     review_id: review.review_id,
 *     text: "Thank you for your feedback! We're working to improve this.",
 *     mark_review_as_processed: true
 *   });
 *   
 *   console.log(`Created comment: ${comment.data.comment_id}`);
 * }
 * 
 * // Get review analytics
 * const analytics = await client.reviewApi.getReviewAnalytics();
 * console.log(`Average rating: ${analytics.average_rating}`);
 * ```
 */
export class ReviewAPI {
  constructor(private readonly httpClient: HttpClient) {}

  // ============================================================================
  // Review Management
  // ============================================================================

  /**
   * Get list of reviews
   * 
   * Retrieves customer reviews with advanced filtering and sorting options.
   * Supports pagination for processing large review volumes.
   * 
   * @param params - List parameters with filters and sorting
   * @returns Paginated list of reviews
   * 
   * @example
   * ```typescript
   * // Get recent low-rating reviews that need attention
   * const criticalReviews = await client.reviewApi.listReviews({
   *   limit: 20,
   *   filter: {
   *     rating: [1, 2],
   *     status: ['NEW', 'REQUIRES_ATTENTION'],
   *     date_from: '2024-01-01T00:00:00Z'
   *   },
   *   sort: {
   *     field: 'created_at',
   *     direction: 'DESC'
   *   }
   * });
   * 
   * console.log('=== CRITICAL REVIEWS REQUIRING ATTENTION ===');
   * criticalReviews.data.reviews.forEach(review => {
   *   console.log(`\\nReview ${review.review_id}`);
   *   console.log(`  Product: ${review.product_id}`);
   *   console.log(`  Rating: ${review.rating}/5 ⭐`);
   *   console.log(`  Status: ${review.status}`);
   *   console.log(`  Text: ${review.text?.substring(0, 100)}...`);
   *   
   *   if (review.photos && review.photos.length > 0) {
   *     console.log(`  📸 ${review.photos.length} photos attached`);
   *   }
   * });
   * ```
   */
  async listReviews(
    params: ReviewListRequest = {}
  ): Promise<IHttpResponse<ReviewListResponse>> {
    return this.httpClient.post('/v1/review/list', params);
  }

  /**
   * Get detailed review information
   * 
   * Retrieves comprehensive information about a specific review including
   * associated comments and processing status.
   * 
   * @param params - Review identifier
   * @returns Detailed review information
   * 
   * @example
   * ```typescript
   * // Get full review details with comment count
   * const reviewInfo = await client.reviewApi.getReviewInfo({
   *   review_id: 'rev_123456789'
   * });
   * 
   * const review = reviewInfo.data.review;
   * console.log(`\\n=== REVIEW DETAILS ===`);
   * console.log(`Review ID: ${review.review_id}`);
   * console.log(`Product: ${review.product_id}`);
   * console.log(`Rating: ${review.rating}/5`);
   * console.log(`Customer: ${review.customer_id || 'Anonymous'}`);
   * console.log(`Created: ${review.created_at}`);
   * console.log(`Status: ${review.status}`);
   * console.log(`Comments: ${reviewInfo.data.comments_amount}`);
   * 
   * if (review.text) {
   *   console.log(`\\nReview Text:`);
   *   console.log(`"${review.text}"`);
   * }
   * 
   * if (review.plus_comment) {
   *   console.log(`\\nPositives: ${review.plus_comment}`);
   * }
   * 
   * if (review.minus_comment) {
   *   console.log(`Negatives: ${review.minus_comment}`);
   * }
   * ```
   */
  async getReviewInfo(
    params: ReviewInfoRequest
  ): Promise<IHttpResponse<ReviewInfoResponse>> {
    return this.httpClient.post('/v1/review/info', params);
  }

  /**
   * Change review status
   * 
   * Updates the processing status of multiple reviews for workflow management.
   * Useful for marking reviews as processed or requiring attention.
   * 
   * @param params - Review IDs and new status
   * @returns Update results with error details
   * 
   * @example
   * ```typescript
   * // Mark reviews as processed after handling
   * const statusUpdate = await client.reviewApi.changeReviewStatus({
   *   review_ids: ['rev_123', 'rev_456', 'rev_789'],
   *   status: 'PROCESSED'
   * });
   * 
   * console.log(`Updated ${statusUpdate.data.updated_count} reviews`);
   * 
   * if (statusUpdate.data.errors && statusUpdate.data.errors.length > 0) {
   *   console.log('\\nErrors encountered:');
   *   statusUpdate.data.errors.forEach(error => {
   *     console.log(`  Review ${error.review_id}: ${error.error}`);
   *   });
   * }
   * 
   * // Mark problematic reviews for attention
   * await client.reviewApi.changeReviewStatus({
   *   review_ids: ['rev_problem1', 'rev_problem2'],
   *   status: 'REQUIRES_ATTENTION'
   * });
   * ```
   */
  async changeReviewStatus(
    params: ReviewChangeStatusRequest
  ): Promise<IHttpResponse<ReviewChangeStatusResponse>> {
    return this.httpClient.post('/v1/review/change-status', params);
  }

  /**
   * Get review counts by status
   * 
   * Returns count statistics for reviews grouped by processing status.
   * Useful for dashboard widgets and workload planning.
   * 
   * @param params - Empty request object
   * @returns Review count statistics
   * 
   * @example
   * ```typescript
   * // Get review processing dashboard data
   * const counts = await client.reviewApi.getReviewCount();
   * 
   * console.log('=== REVIEW PROCESSING DASHBOARD ===');
   * console.log(`📊 Total Reviews: ${counts.data.total}`);
   * console.log(`✅ Processed: ${counts.data.processed}`);
   * console.log(`🆕 New/Unprocessed: ${counts.data.new}`);
   * console.log(`⚠️  Requires Attention: ${counts.data.requires_attention}`);
   * 
   * // Calculate processing rate
   * const processingRate = ((counts.data.processed / counts.data.total) * 100).toFixed(1);
   * console.log(`\\n📈 Processing Rate: ${processingRate}%`);
   * 
   * // Alert if too many unprocessed
   * if (counts.data.new > 50) {
   *   console.log('\\n🚨 Alert: High volume of unprocessed reviews!');
   * }
   * ```
   */
  async getReviewCount(
    params: ReviewCountRequest = {}
  ): Promise<IHttpResponse<ReviewCountResponse>> {
    return this.httpClient.post('/v1/review/count', params);
  }

  // ============================================================================
  // Comment Management
  // ============================================================================

  /**
   * Create comment on review
   * 
   * Responds to a customer review with a seller comment.
   * Optionally marks the review as processed in the same operation.
   * 
   * @param params - Comment text and review ID
   * @returns Created comment information
   * 
   * @example
   * ```typescript
   * // Respond to a negative review professionally
   * const negativeReview = await client.reviewApi.getReviewInfo({
   *   review_id: 'rev_negative_123'
   * });
   * 
   * if (negativeReview.data.review.rating <= 3) {
   *   const comment = await client.reviewApi.createComment({
   *     review_id: 'rev_negative_123',
   *     text: `Thank you for your honest feedback. We sincerely apologize for not meeting your expectations. 
   *            We have forwarded your concerns to our quality team and are implementing improvements. 
   *            Please contact our support team at support@example.com for a direct resolution.`,
   *     mark_review_as_processed: true
   *   });
   *   
   *   console.log(`Professional response added: ${comment.data.comment_id}`);
   * }
   * 
   * // Thank a positive reviewer
   * const positiveComment = await client.reviewApi.createComment({
   *   review_id: 'rev_positive_456',
   *   text: 'Thank you so much for taking the time to leave such a wonderful review! We're thrilled that you love the product.',
   *   mark_review_as_processed: true
   * });
   * ```
   */
  async createComment(
    params: CommentCreateRequest
  ): Promise<IHttpResponse<CommentCreateResponse>> {
    return this.httpClient.post('/v1/review/comment/create', params);
  }

  /**
   * Get comments for a review
   * 
   * Retrieves all seller and customer comments associated with a review.
   * Supports pagination and sorting for conversation management.
   * 
   * @param params - Review ID and pagination options
   * @returns List of comments with metadata
   * 
   * @example
   * ```typescript
   * // Get conversation history for a review
   * const comments = await client.reviewApi.listComments({
   *   review_id: 'rev_123456',
   *   limit: 50,
   *   sort: 'ASC' // Chronological order
   * });
   * 
   * console.log(`\\n=== REVIEW CONVERSATION (${comments.data.total} messages) ===`);
   * 
   * comments.data.comments.forEach((comment, index) => {
   *   const authorIcon = comment.author.type === 'SELLER' ? '🏪' : '👤';
   *   const authorName = comment.author.name || comment.author.type;
   *   
   *   console.log(`\\n${index + 1}. ${authorIcon} ${authorName} - ${comment.created_at}`);
   *   console.log(`   "${comment.text}"`);
   * });
   * 
   * if (comments.data.has_next) {
   *   console.log('\\n... more comments available');
   * }
   * ```
   */
  async listComments(
    params: CommentListRequest
  ): Promise<IHttpResponse<CommentListResponse>> {
    return this.httpClient.post('/v1/review/comment/list', params);
  }

  /**
   * Delete seller comment
   * 
   * Removes a seller comment from a review. Use carefully as this action
   * cannot be undone and may affect customer perception.
   * 
   * @param params - Comment ID to delete
   * @returns Deletion confirmation
   * 
   * @example
   * ```typescript
   * // Remove an inappropriate or outdated comment
   * const deletion = await client.reviewApi.deleteComment({
   *   comment_id: 'comment_to_remove_123'
   * });
   * 
   * if (deletion.data.success) {
   *   console.log('Comment successfully removed');
   *   
   *   // Optionally add a replacement comment
   *   await client.reviewApi.createComment({
   *     review_id: 'rev_123',
   *     text: 'Thank you for your feedback. We have updated our response based on new information.',
   *     mark_review_as_processed: false // Keep review active for follow-up
   *   });
   * }
   * ```
   */
  async deleteComment(
    params: CommentDeleteRequest
  ): Promise<IHttpResponse<CommentDeleteResponse>> {
    return this.httpClient.post('/v1/review/comment/delete', params);
  }

  // ============================================================================
  // Pagination Helpers
  // ============================================================================

  /**
   * Iterate through reviews with automatic pagination
   * 
   * @param params - Request parameters without pagination
   * @returns Async generator yielding pages of reviews
   * 
   * @example
   * ```typescript
   * // Process all unprocessed reviews
   * for await (const reviewsPage of client.reviewApi.iterateReviews({
   *   filter: { status: ['NEW'] },
   *   limit: 20
   * })) {
   *   console.log(`Processing ${reviewsPage.length} reviews...`);
   *   
   *   for (const review of reviewsPage) {
   *     // Process each review
   *     if (review.rating <= 2) {
   *       await client.reviewApi.createComment({
   *         review_id: review.review_id,
   *         text: 'We apologize for your experience and are working to improve.',
   *         mark_review_as_processed: true
   *       });
   *     }
   *   }
   * }
   * ```
   */
  async *iterateReviews(
    params: Omit<ReviewListRequest, 'offset'>
  ): AsyncGenerator<Review[], void, unknown> {
    let offset = 0;
    let hasNext = true;
    const limit = params.limit || 50;

    while (hasNext) {
      const response = await this.listReviews({
        ...params,
        offset,
        limit
      });

      const reviews = response.data.reviews || [];
      if (reviews.length === 0) {
        hasNext = false;
      } else {
        yield reviews;
        hasNext = response.data.has_next;
        offset += limit;
      }
    }
  }

  // ============================================================================
  // Analytics and Helper Methods
  // ============================================================================

  /**
   * Get comprehensive review analytics
   * 
   * Calculates review performance metrics including ratings distribution,
   * response rates, and processing statistics.
   * 
   * @returns Review analytics summary
   * 
   * @example
   * ```typescript
   * // Generate review performance report
   * const analytics = await client.reviewApi.getReviewAnalytics();
   * 
   * console.log('=== REVIEW PERFORMANCE ANALYTICS ===');
   * console.log(`📊 Total Reviews: ${analytics.total_reviews}`);
   * console.log(`⭐ Average Rating: ${analytics.average_rating.toFixed(2)}/5`);
   * console.log(`💬 Response Rate: ${(analytics.response_rate * 100).toFixed(1)}%`);
   * 
   * console.log('\\n📈 Rating Distribution:');
   * for (let rating = 5; rating >= 1; rating--) {
   *   const count = analytics.rating_distribution[rating] || 0;
   *   const percentage = ((count / analytics.total_reviews) * 100).toFixed(1);
   *   const stars = '⭐'.repeat(rating);
   *   console.log(`  ${stars} (${rating}): ${count} reviews (${percentage}%)`);
   * }
   * 
   * console.log('\\n🔄 Processing Status:');
   * console.log(`  ✅ Processed: ${analytics.processing_stats.processed}`);
   * console.log(`  🆕 Pending: ${analytics.processing_stats.pending}`);
   * console.log(`  ⚠️  Needs Attention: ${analytics.processing_stats.requires_attention}`);
   * ```
   */
  async getReviewAnalytics(): Promise<ReviewAnalytics> {
    // Get review counts
    const countsResponse = await this.getReviewCount();
    const counts = countsResponse.data;

    // Get recent reviews for rating analysis (sample)
    const reviewsResponse = await this.listReviews({
      limit: 1000 // Sample for analytics
    });
    const reviews = reviewsResponse.data.reviews;

    // Calculate analytics
    const totalReviews = counts.total;
    const averageRating = reviews.length > 0 
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length 
      : 0;

    // Rating distribution
    const ratingDistribution: Record<number, number> = {};
    for (let i = 1; i <= 5; i++) {
      ratingDistribution[i] = reviews.filter(r => r.rating === i).length;
    }

    // Response rate (reviews with seller comments)
    const reviewsWithComments = reviews.filter(r => 
      r.status === 'PROCESSED' // Assuming processed means responded to
    ).length;
    const responseRate = totalReviews > 0 ? reviewsWithComments / totalReviews : 0;

    return {
      total_reviews: totalReviews,
      average_rating: averageRating,
      rating_distribution: ratingDistribution,
      response_rate: responseRate,
      processing_stats: {
        processed: counts.processed,
        pending: counts.new,
        requires_attention: counts.requires_attention
      }
    };
  }

  /**
   * Get reviews requiring immediate attention
   * 
   * Returns low-rating reviews that haven't been responded to yet.
   * Prioritizes recent negative feedback that needs seller response.
   * 
   * @param days - Look back period in days (default: 7)
   * @returns Reviews needing attention
   */
  async getReviewsNeedingAttention(days: number = 7): Promise<Review[]> {
    const dateFrom = new Date();
    dateFrom.setDate(dateFrom.getDate() - days);

    const response = await this.listReviews({
      limit: 100,
      filter: {
        rating: [1, 2, 3], // Focus on negative/neutral reviews
        status: ['NEW', 'REQUIRES_ATTENTION'],
        date_from: dateFrom.toISOString()
      },
      sort: {
        field: 'created_at',
        direction: 'ASC' // Oldest first (most urgent)
      }
    });

    return response.data.reviews;
  }

  /**
   * Auto-respond to positive reviews
   * 
   * Automatically thanks customers for positive reviews (4-5 stars).
   * Uses template responses to maintain consistency.
   * 
   * @param templateText - Custom thank you message
   * @returns Number of responses sent
   */
  async autoRespondToPositiveReviews(
    templateText: string = "Thank you for taking the time to share your positive experience! We're delighted that you're happy with your purchase."
  ): Promise<number> {
    const positiveReviews = await this.listReviews({
      limit: 50,
      filter: {
        rating: [4, 5],
        status: ['NEW']
      }
    });

    let responseCount = 0;
    for (const review of positiveReviews.data.reviews) {
      try {
        await this.createComment({
          review_id: review.review_id,
          text: templateText,
          mark_review_as_processed: true
        });
        responseCount++;
      } catch (error) {
        console.error(`Failed to respond to review ${review.review_id}:`, error);
      }
    }

    return responseCount;
  }
}

// Re-export types for convenience
export type * from './types';