/**
 * Unit tests for ReviewApi
 * Tests all review API methods with proper type validation
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ReviewApi } from '../../../../src/categories/review/index.js';
import { HttpClient } from '../../../../src/core/http.js';
import type { 
  ReviewChangeStatusRequest,
  CommentCreateRequest,
  CommentDeleteRequest,
  CommentListRequest,
  ReviewCountRequest,
  ReviewInfoRequest,
  ReviewListRequest
} from '../../../../src/types/requests/review.js';
import type {
  ReviewChangeStatusResponse,
  CommentCreateResponse,
  CommentDeleteResponse,
  CommentListResponse,
  ReviewCountResponse,
  ReviewInfoResponse,
  ReviewListResponse
} from '../../../../src/types/responses/review.js';

// Mock HttpClient
const mockHttpClient = {
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  delete: vi.fn(),
  request: vi.fn()
} as unknown as HttpClient;

describe('ReviewApi', () => {
  let reviewApi: ReviewApi;

  beforeEach(() => {
    reviewApi = new ReviewApi(mockHttpClient);
    vi.clearAllMocks();
  });

  describe('changeStatus', () => {
    it('should change review status successfully', async () => {
      const request: ReviewChangeStatusRequest = {
        review_ids: ['review-123', 'review-456'],
        status: 'PROCESSED'
      };
      
      const expectedResponse: ReviewChangeStatusResponse = {
        result: 'ok'
      };

      vi.mocked(mockHttpClient.request).mockResolvedValueOnce(expectedResponse);

      const result = await reviewApi.changeStatus(request);

      expect(mockHttpClient.request).toHaveBeenCalledWith(
        'POST',
        '/v1/review/change-status',
        request,
        undefined
      );
      expect(result).toEqual(expectedResponse);
    });

    it('should validate review status enum', async () => {
      const request: ReviewChangeStatusRequest = {
        review_ids: ['review-123'],
        status: 'UNPROCESSED'
      };
      
      const expectedResponse: ReviewChangeStatusResponse = {
        result: 'ok'
      };

      vi.mocked(mockHttpClient.request).mockResolvedValueOnce(expectedResponse);

      const result = await reviewApi.changeStatus(request);

      expect(result).toEqual(expectedResponse);
    });
  });

  describe('createComment', () => {
    it('should create comment on review successfully', async () => {
      const request: CommentCreateRequest = {
        review_id: 'review-123',
        text: 'Спасибо за ваш отзыв!',
        mark_review_as_processed: true
      };
      
      const expectedResponse: CommentCreateResponse = {
        comment_id: 'comment-789'
      };

      vi.mocked(mockHttpClient.request).mockResolvedValueOnce(expectedResponse);

      const result = await reviewApi.createComment(request);

      expect(mockHttpClient.request).toHaveBeenCalledWith(
        'POST',
        '/v1/review/comment/create',
        request,
        undefined
      );
      expect(result).toEqual(expectedResponse);
    });

    it('should create comment with parent comment ID', async () => {
      const request: CommentCreateRequest = {
        review_id: 'review-123',
        text: 'Отвечаю на комментарий',
        parent_comment_id: 'comment-456'
      };
      
      const expectedResponse: CommentCreateResponse = {
        comment_id: 'comment-789'
      };

      vi.mocked(mockHttpClient.request).mockResolvedValueOnce(expectedResponse);

      const result = await reviewApi.createComment(request);

      expect(result).toEqual(expectedResponse);
    });
  });

  describe('deleteComment', () => {
    it('should delete comment successfully', async () => {
      const request: CommentDeleteRequest = {
        comment_id: 'comment-123'
      };
      
      const expectedResponse: CommentDeleteResponse = {
        result: 'ok'
      };

      vi.mocked(mockHttpClient.request).mockResolvedValueOnce(expectedResponse);

      const result = await reviewApi.deleteComment(request);

      expect(mockHttpClient.request).toHaveBeenCalledWith(
        'POST',
        '/v1/review/comment/delete',
        request,
        undefined
      );
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('getCommentList', () => {
    it('should get comment list with pagination', async () => {
      const request: CommentListRequest = {
        review_id: 'review-123',
        limit: 50,
        offset: 0,
        sort_dir: 'DESC'
      };
      
      const expectedResponse: CommentListResponse = {
        comments: [
          {
            id: 'comment-1',
            text: 'Первый комментарий',
            published_at: '2024-01-01T10:00:00Z',
            is_official: false,
            is_owner: true
          },
          {
            id: 'comment-2',
            text: 'Второй комментарий',
            published_at: '2024-01-01T11:00:00Z',
            is_official: false,
            is_owner: false,
            parent_comment_id: 'comment-1'
          }
        ],
        offset: 2
      };

      vi.mocked(mockHttpClient.request).mockResolvedValueOnce(expectedResponse);

      const result = await reviewApi.getCommentList(request);

      expect(mockHttpClient.request).toHaveBeenCalledWith(
        'POST',
        '/v1/review/comment/list',
        request,
        undefined
      );
      expect(result).toEqual(expectedResponse);
      expect(result.comments).toHaveLength(2);
      expect(result.comments?.[0].is_owner).toBe(true);
      expect(result.comments?.[1].parent_comment_id).toBe('comment-1');
    });
  });

  describe('getCount', () => {
    it('should get review count statistics', async () => {
      const expectedResponse: ReviewCountResponse = {
        total: 150,
        processed: 100,
        unprocessed: 50
      };

      vi.mocked(mockHttpClient.request).mockResolvedValueOnce(expectedResponse);

      const result = await reviewApi.getCount();

      expect(mockHttpClient.request).toHaveBeenCalledWith(
        'POST',
        '/v1/review/count',
        {},
        undefined
      );
      expect(result).toEqual(expectedResponse);
    });

    it('should handle empty request parameter', async () => {
      const request: ReviewCountRequest = {};
      const expectedResponse: ReviewCountResponse = {
        total: 0,
        processed: 0,
        unprocessed: 0
      };

      vi.mocked(mockHttpClient.request).mockResolvedValueOnce(expectedResponse);

      const result = await reviewApi.getCount(request);

      expect(result).toEqual(expectedResponse);
    });
  });

  describe('getInfo', () => {
    it('should get detailed review information', async () => {
      const request: ReviewInfoRequest = {
        review_id: 'review-123'
      };
      
      const expectedResponse: ReviewInfoResponse = {
        id: 'review-123',
        sku: 123456789,
        text: 'Отличный товар, рекомендую!',
        rating: 5,
        published_at: '2024-01-01T10:00:00Z',
        status: 'UNPROCESSED',
        order_status: 'DELIVERED',
        is_rating_participant: true,
        comments_amount: 2,
        likes_amount: 15,
        dislikes_amount: 1,
        photos_amount: 3,
        videos_amount: 1,
        photos: [
          {
            url: 'https://example.com/photo1.jpg',
            width: 800,
            height: 600
          }
        ],
        videos: [
          {
            url: 'https://example.com/video1.mp4',
            preview_url: 'https://example.com/preview1.jpg',
            short_video_preview_url: 'https://example.com/short1.jpg',
            width: 1920,
            height: 1080
          }
        ]
      };

      vi.mocked(mockHttpClient.request).mockResolvedValueOnce(expectedResponse);

      const result = await reviewApi.getInfo(request);

      expect(mockHttpClient.request).toHaveBeenCalledWith(
        'POST',
        '/v1/review/info',
        request,
        undefined
      );
      expect(result).toEqual(expectedResponse);
      expect(result.photos).toHaveLength(1);
      expect(result.videos).toHaveLength(1);
    });
  });

  describe('getList', () => {
    it('should get review list with default parameters', async () => {
      const expectedResponse: ReviewListResponse = {
        reviews: [
          {
            id: 'review-1',
            sku: 123456789,
            text: 'Хороший товар',
            rating: 4,
            published_at: '2024-01-01T10:00:00Z',
            status: 'UNPROCESSED',
            order_status: 'DELIVERED',
            is_rating_participant: true,
            comments_amount: 0,
            photos_amount: 1,
            videos_amount: 0
          }
        ],
        has_next: false,
        last_id: 'review-1'
      };

      vi.mocked(mockHttpClient.request).mockResolvedValueOnce(expectedResponse);

      const result = await reviewApi.getList();

      expect(mockHttpClient.request).toHaveBeenCalledWith(
        'POST',
        '/v1/review/list',
        { limit: 20 },
        undefined
      );
      expect(result).toEqual(expectedResponse);
    });

    it('should get review list with filtering and pagination', async () => {
      const request: ReviewListRequest = {
        limit: 100,
        status: 'UNPROCESSED',
        sort_dir: 'DESC',
        last_id: 'review-100'
      };
      
      const expectedResponse: ReviewListResponse = {
        reviews: [
          {
            id: 'review-99',
            sku: 123456789,
            text: 'Отзыв с фото',
            rating: 3,
            published_at: '2024-01-01T09:00:00Z',
            status: 'UNPROCESSED',
            order_status: 'DELIVERED',
            is_rating_participant: true,
            comments_amount: 1,
            photos_amount: 2,
            videos_amount: 1
          }
        ],
        has_next: true,
        last_id: 'review-99'
      };

      vi.mocked(mockHttpClient.request).mockResolvedValueOnce(expectedResponse);

      const result = await reviewApi.getList(request);

      expect(mockHttpClient.request).toHaveBeenCalledWith(
        'POST',
        '/v1/review/list',
        request,
        undefined
      );
      expect(result).toEqual(expectedResponse);
      expect(result.has_next).toBe(true);
    });

    it('should handle all review status filters', async () => {
      const statusTests: Array<'ALL' | 'PROCESSED' | 'UNPROCESSED'> = ['ALL', 'PROCESSED', 'UNPROCESSED'];
      
      for (const status of statusTests) {
        const request: ReviewListRequest = {
          limit: 50,
          status
        };
        
        const expectedResponse: ReviewListResponse = {
          reviews: [],
          has_next: false
        };

        vi.mocked(mockHttpClient.request).mockResolvedValueOnce(expectedResponse);

        const result = await reviewApi.getList(request);

        expect(mockHttpClient.request).toHaveBeenCalledWith(
          'POST',
          '/v1/review/list',
          request,
          undefined
        );
        expect(result).toEqual(expectedResponse);
      }
    });
  });

  describe('type safety', () => {
    it('should enforce correct enum values for review status', () => {
      const validStatuses: Array<'PROCESSED' | 'UNPROCESSED'> = ['PROCESSED', 'UNPROCESSED'];
      const validListStatuses: Array<'ALL' | 'PROCESSED' | 'UNPROCESSED'> = ['ALL', 'PROCESSED', 'UNPROCESSED'];
      const validSortDirections: Array<'ASC' | 'DESC'> = ['ASC', 'DESC'];

      // These should compile without errors
      expect(validStatuses).toContain('PROCESSED');
      expect(validStatuses).toContain('UNPROCESSED');
      expect(validListStatuses).toContain('ALL');
      expect(validSortDirections).toContain('ASC');
      expect(validSortDirections).toContain('DESC');
    });

    it('should enforce required fields in requests', () => {
      // Test that required fields are enforced at compile time
      const changeStatusRequest: ReviewChangeStatusRequest = {
        review_ids: ['review-1'],
        status: 'PROCESSED'
      };

      const commentCreateRequest: CommentCreateRequest = {
        review_id: 'review-1',
        text: 'Comment text'
      };

      const commentListRequest: CommentListRequest = {
        review_id: 'review-1',
        limit: 50
      };

      expect(changeStatusRequest.review_ids).toBeDefined();
      expect(commentCreateRequest.review_id).toBeDefined();
      expect(commentListRequest.limit).toBeDefined();
    });
  });
});