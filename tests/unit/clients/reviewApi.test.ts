/**
 * @fileoverview Unit tests for ReviewAPI client
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { MockInstance } from 'vitest';
import { ReviewAPI } from '../../../src/clients/reviewApi';
import type { HttpClient } from '../../../src/http/HttpClient';
import type { IHttpResponse } from '../../../src/http/types';
import type {
  ReviewListResponse,
  ReviewInfoResponse,
  ReviewCountResponse,
  CommentCreateResponse,
  CommentListResponse,
  CommentDeleteResponse,
  ReviewChangeStatusResponse
} from '../../../src/clients/reviewApi/types';

describe('ReviewAPI', () => {
  let reviewAPI: ReviewAPI;
  let mockHttpClient: {
    get: MockInstance;
    post: MockInstance;
    put: MockInstance;
    delete: MockInstance;
  };

  beforeEach(() => {
    mockHttpClient = {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
    };

    reviewAPI = new ReviewAPI(mockHttpClient as unknown as HttpClient);
  });

  describe('Review Management', () => {
    it('should list reviews with filters', async () => {
      const mockResponse: IHttpResponse<ReviewListResponse> = {
        status: 200,
        statusText: 'OK',
        headers: {},
        url: '/v1/review/list',
        data: {
          reviews: [
            {
              review_id: 'rev_123',
              product_id: 12345,
              rating: 4,
              text: 'Great product!',
              created_at: '2024-01-01T00:00:00Z',
              status: 'NEW',
              can_be_processed: true,
              processed: false
            }
          ],
          total: 1,
          has_next: false
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const result = await reviewAPI.listReviews({
        limit: 10,
        filter: {
          rating: [4, 5],
          status: ['NEW']
        }
      });

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/review/list', {
        limit: 10,
        filter: {
          rating: [4, 5],
          status: ['NEW']
        }
      });
      expect(result.data.reviews).toHaveLength(1);
      expect(result.data.reviews[0].rating).toBe(4);
    });

    it('should get detailed review information', async () => {
      const mockResponse: IHttpResponse<ReviewInfoResponse> = {
        status: 200,
        statusText: 'OK',
        headers: {},
        url: '/v1/review/info',
        data: {
          review: {
            review_id: 'rev_123',
            product_id: 12345,
            rating: 3,
            text: 'Average product',
            created_at: '2024-01-01T00:00:00Z',
            status: 'NEW',
            can_be_processed: true,
            processed: false,
            photos: [
              {
                photo_id: 'photo_1',
                url: 'https://example.com/photo1.jpg'
              }
            ]
          },
          comments_amount: 2
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const result = await reviewAPI.getReviewInfo({
        review_id: 'rev_123'
      });

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/review/info', {
        review_id: 'rev_123'
      });
      expect(result.data.review.review_id).toBe('rev_123');
      expect(result.data.comments_amount).toBe(2);
      expect(result.data.review.photos).toHaveLength(1);
    });

    it('should change review status', async () => {
      const mockResponse: IHttpResponse<ReviewChangeStatusResponse> = {
        status: 200,
        statusText: 'OK',
        headers: {},
        url: '/v1/review/change-status',
        data: {
          updated_count: 2,
          errors: [
            {
              review_id: 'rev_error',
              error: 'Review already processed'
            }
          ]
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const result = await reviewAPI.changeReviewStatus({
        review_ids: ['rev_123', 'rev_456', 'rev_error'],
        status: 'PROCESSED'
      });

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/review/change-status', {
        review_ids: ['rev_123', 'rev_456', 'rev_error'],
        status: 'PROCESSED'
      });
      expect(result.data.updated_count).toBe(2);
      expect(result.data.errors).toHaveLength(1);
    });

    it('should get review counts', async () => {
      const mockResponse: IHttpResponse<ReviewCountResponse> = {
        status: 200,
        statusText: 'OK',
        headers: {},
        url: '/v1/review/count',
        data: {
          processed: 150,
          new: 25,
          requires_attention: 5,
          total: 180
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const result = await reviewAPI.getReviewCount();

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/review/count', {});
      expect(result.data.total).toBe(180);
      expect(result.data.processed).toBe(150);
      expect(result.data.new).toBe(25);
    });
  });

  describe('Comment Management', () => {
    it('should create comment on review', async () => {
      const mockResponse: IHttpResponse<CommentCreateResponse> = {
        status: 200,
        statusText: 'OK',
        headers: {},
        url: '/v1/review/comment/create',
        data: {
          comment_id: 'comment_123',
          success: true
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const result = await reviewAPI.createComment({
        review_id: 'rev_123',
        text: 'Thank you for your feedback!',
        mark_review_as_processed: true
      });

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/review/comment/create', {
        review_id: 'rev_123',
        text: 'Thank you for your feedback!',
        mark_review_as_processed: true
      });
      expect(result.data.comment_id).toBe('comment_123');
      expect(result.data.success).toBe(true);
    });

    it('should list comments for review', async () => {
      const mockResponse: IHttpResponse<CommentListResponse> = {
        status: 200,
        statusText: 'OK',
        headers: {},
        url: '/v1/review/comment/list',
        data: {
          comments: [
            {
              comment_id: 'comment_1',
              review_id: 'rev_123',
              text: 'Thank you for your review!',
              created_at: '2024-01-02T00:00:00Z',
              author: {
                type: 'SELLER',
                name: 'Store Owner'
              }
            },
            {
              comment_id: 'comment_2',
              review_id: 'rev_123',
              text: 'You are welcome!',
              created_at: '2024-01-03T00:00:00Z',
              author: {
                type: 'CUSTOMER'
              }
            }
          ],
          total: 2,
          has_next: false
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const result = await reviewAPI.listComments({
        review_id: 'rev_123',
        limit: 10,
        sort: 'ASC'
      });

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/review/comment/list', {
        review_id: 'rev_123',
        limit: 10,
        sort: 'ASC'
      });
      expect(result.data.comments).toHaveLength(2);
      expect(result.data.comments[0].author.type).toBe('SELLER');
      expect(result.data.comments[1].author.type).toBe('CUSTOMER');
    });

    it('should delete comment', async () => {
      const mockResponse: IHttpResponse<CommentDeleteResponse> = {
        status: 200,
        statusText: 'OK',
        headers: {},
        url: '/v1/review/comment/delete',
        data: {
          success: true
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const result = await reviewAPI.deleteComment({
        comment_id: 'comment_123'
      });

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/review/comment/delete', {
        comment_id: 'comment_123'
      });
      expect(result.data.success).toBe(true);
    });
  });

  describe('Pagination', () => {
    it('should iterate through reviews with pagination', async () => {
      const page1Response: IHttpResponse<ReviewListResponse> = {
        status: 200,
        statusText: 'OK',
        headers: {},
        url: '/v1/review/list',
        data: {
          reviews: [
            { review_id: 'rev_1', product_id: 1, rating: 5, created_at: '2024-01-01T00:00:00Z', status: 'NEW', can_be_processed: true, processed: false },
            { review_id: 'rev_2', product_id: 2, rating: 4, created_at: '2024-01-02T00:00:00Z', status: 'NEW', can_be_processed: true, processed: false }
          ],
          total: 3,
          has_next: true
        }
      };

      const page2Response: IHttpResponse<ReviewListResponse> = {
        status: 200,
        statusText: 'OK',
        headers: {},
        url: '/v1/review/list',
        data: {
          reviews: [
            { review_id: 'rev_3', product_id: 3, rating: 3, created_at: '2024-01-03T00:00:00Z', status: 'NEW', can_be_processed: true, processed: false }
          ],
          total: 3,
          has_next: false
        }
      };

      mockHttpClient.post
        .mockResolvedValueOnce(page1Response)
        .mockResolvedValueOnce(page2Response);

      const allReviews = [];
      for await (const page of reviewAPI.iterateReviews({ limit: 2 })) {
        allReviews.push(...page);
      }

      expect(allReviews).toHaveLength(3);
      expect(allReviews[0].review_id).toBe('rev_1');
      expect(allReviews[2].review_id).toBe('rev_3');
      expect(mockHttpClient.post).toHaveBeenCalledTimes(2);
    });
  });

  describe('Analytics Methods', () => {
    it('should calculate review analytics', async () => {
      // Mock review count
      const countResponse: IHttpResponse<ReviewCountResponse> = {
        status: 200,
        statusText: 'OK',
        headers: {},
        url: '/v1/review/count',
        data: {
          processed: 80,
          new: 15,
          requires_attention: 5,
          total: 100
        }
      };

      // Mock recent reviews sample
      const reviewsResponse: IHttpResponse<ReviewListResponse> = {
        status: 200,
        statusText: 'OK',
        headers: {},
        url: '/v1/review/list',
        data: {
          reviews: [
            { review_id: 'r1', product_id: 1, rating: 5, created_at: '2024-01-01T00:00:00Z', status: 'PROCESSED', can_be_processed: true, processed: true },
            { review_id: 'r2', product_id: 2, rating: 4, created_at: '2024-01-02T00:00:00Z', status: 'PROCESSED', can_be_processed: true, processed: true },
            { review_id: 'r3', product_id: 3, rating: 3, created_at: '2024-01-03T00:00:00Z', status: 'NEW', can_be_processed: true, processed: false },
            { review_id: 'r4', product_id: 4, rating: 2, created_at: '2024-01-04T00:00:00Z', status: 'NEW', can_be_processed: true, processed: false },
            { review_id: 'r5', product_id: 5, rating: 1, created_at: '2024-01-05T00:00:00Z', status: 'REQUIRES_ATTENTION', can_be_processed: true, processed: false }
          ],
          total: 5,
          has_next: false
        }
      };

      mockHttpClient.post
        .mockResolvedValueOnce(countResponse)
        .mockResolvedValueOnce(reviewsResponse);

      const analytics = await reviewAPI.getReviewAnalytics();

      expect(analytics.total_reviews).toBe(100);
      expect(analytics.average_rating).toBe(3); // (5+4+3+2+1)/5
      expect(analytics.rating_distribution[5]).toBe(1);
      expect(analytics.rating_distribution[1]).toBe(1);
      expect(analytics.processing_stats.processed).toBe(80);
      expect(analytics.processing_stats.pending).toBe(15);
      expect(analytics.processing_stats.requires_attention).toBe(5);
    });

    it('should get reviews needing attention', async () => {
      const mockResponse: IHttpResponse<ReviewListResponse> = {
        status: 200,
        statusText: 'OK',
        headers: {},
        url: '/v1/review/list',
        data: {
          reviews: [
            {
              review_id: 'urgent_1',
              product_id: 123,
              rating: 2,
              text: 'Product broke after one day',
              created_at: '2024-01-01T00:00:00Z',
              status: 'NEW',
              can_be_processed: true,
              processed: false
            },
            {
              review_id: 'urgent_2',
              product_id: 456,
              rating: 1,
              text: 'Worst purchase ever',
              created_at: '2024-01-02T00:00:00Z',
              status: 'REQUIRES_ATTENTION',
              can_be_processed: true,
              processed: false
            }
          ],
          total: 2,
          has_next: false
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const urgentReviews = await reviewAPI.getReviewsNeedingAttention(7);

      expect(urgentReviews).toHaveLength(2);
      expect(urgentReviews[0].rating).toBe(2);
      expect(urgentReviews[1].rating).toBe(1);
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/review/list', 
        expect.objectContaining({
          filter: expect.objectContaining({
            rating: [1, 2, 3],
            status: ['NEW', 'REQUIRES_ATTENTION']
          })
        })
      );
    });

    it('should auto-respond to positive reviews', async () => {
      const listResponse: IHttpResponse<ReviewListResponse> = {
        status: 200,
        statusText: 'OK',
        headers: {},
        url: '/v1/review/list',
        data: {
          reviews: [
            { review_id: 'pos_1', product_id: 1, rating: 5, created_at: '2024-01-01T00:00:00Z', status: 'NEW', can_be_processed: true, processed: false },
            { review_id: 'pos_2', product_id: 2, rating: 4, created_at: '2024-01-02T00:00:00Z', status: 'NEW', can_be_processed: true, processed: false }
          ],
          total: 2,
          has_next: false
        }
      };

      const commentResponse: IHttpResponse<CommentCreateResponse> = {
        status: 200,
        statusText: 'OK',
        headers: {},
        url: '/v1/review/comment/create',
        data: {
          comment_id: 'auto_comment',
          success: true
        }
      };

      mockHttpClient.post
        .mockResolvedValueOnce(listResponse)
        .mockResolvedValueOnce(commentResponse)
        .mockResolvedValueOnce(commentResponse);

      const responseCount = await reviewAPI.autoRespondToPositiveReviews(
        'Thank you for the great review!'
      );

      expect(responseCount).toBe(2);
      expect(mockHttpClient.post).toHaveBeenCalledTimes(3); // 1 list + 2 comments
    });
  });
});