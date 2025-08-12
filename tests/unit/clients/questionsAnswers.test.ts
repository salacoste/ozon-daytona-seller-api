/**
 * @fileoverview Unit tests for QuestionsAnswersAPI client
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { MockInstance } from 'vitest';
import { QuestionsAnswersAPI } from '../../../src/clients/questionsAnswers';
import type { HttpClient } from '../../../src/http/HttpClient';
import type { IHttpResponse } from '../../../src/http/types';
import type {
  QuestionAnswerCreateResponse,
  QuestionAnswerListResponse,
  QuestionListResponse,
  QuestionCountResponse,
  QuestionTopSkuResponse,
  Question,
  Answer,
  QuestionCount,
  TopSkuQuestion,
  QuestionStatus
} from '../../../src/clients/questionsAnswers/types';

describe('QuestionsAnswersAPI', () => {
  let questionsAnswersAPI: QuestionsAnswersAPI;
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

    questionsAnswersAPI = new QuestionsAnswersAPI(mockHttpClient as unknown as HttpClient);
  });

  describe('Answer Management', () => {
    it('should create an answer to a question successfully', async () => {
      const mockResponse: IHttpResponse<QuestionAnswerCreateResponse> = {
        status: 200,
        statusText: 'OK',
        headers: {},
        url: '/v1/question/answer/create',
        data: {
          answer_id: 'ans_12345'
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const result = await questionsAnswersAPI.createAnswer({
        question_id: 'q_67890',
        sku: 123456789,
        text: 'Yes, this product is compatible with all iPhone models from iPhone 12 and newer.'
      });

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/question/answer/create', {
        question_id: 'q_67890',
        sku: 123456789,
        text: 'Yes, this product is compatible with all iPhone models from iPhone 12 and newer.'
      });

      expect(result.data.answer_id).toBe('ans_12345');
    });

    it('should delete an answer successfully', async () => {
      const mockResponse: IHttpResponse<{ success: boolean }> = {
        status: 200,
        statusText: 'OK',
        headers: {},
        url: '/v1/question/answer/delete',
        data: {
          success: true
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const result = await questionsAnswersAPI.deleteAnswer({
        answer_id: 'ans_12345',
        sku: 123456789
      });

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/question/answer/delete', {
        answer_id: 'ans_12345',
        sku: 123456789
      });

      expect(result.data.success).toBe(true);
    });

    it('should list answers for a question', async () => {
      const mockAnswers: Answer[] = [
        {
          answer_id: 'ans_001',
          question_id: 'q_12345',
          sku: 123456789,
          text: 'Yes, this product includes a warranty.',
          created_at: '2024-01-15T10:30:00Z',
          author: 'Seller Support',
          is_seller_answer: true
        },
        {
          answer_id: 'ans_002',
          question_id: 'q_12345',
          sku: 123456789,
          text: 'The warranty period is 2 years.',
          created_at: '2024-01-15T11:00:00Z',
          author: 'Customer Service',
          is_seller_answer: true
        }
      ];

      const mockResponse: IHttpResponse<QuestionAnswerListResponse> = {
        status: 200,
        statusText: 'OK',
        headers: {},
        url: '/v1/question/answer/list',
        data: {
          answers: mockAnswers,
          has_next: false,
          total_count: 2
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const result = await questionsAnswersAPI.listAnswers({
        question_id: 'q_12345',
        sku: 123456789,
        limit: 10
      });

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/question/answer/list', {
        question_id: 'q_12345',
        sku: 123456789,
        limit: 10
      });

      expect(result.data.answers).toHaveLength(2);
      expect(result.data.answers[0].is_seller_answer).toBe(true);
      expect(result.data.total_count).toBe(2);
    });
  });

  describe('Question Management', () => {
    it('should change question status successfully', async () => {
      const mockResponse: IHttpResponse<{ updated_count: number; failed_questions: any[] }> = {
        status: 200,
        statusText: 'OK',
        headers: {},
        url: '/v1/question/change-status',
        data: {
          updated_count: 3,
          failed_questions: []
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const result = await questionsAnswersAPI.changeQuestionStatus({
        question_id: ['q_001', 'q_002', 'q_003'],
        sku: 123456789,
        status: 'ANSWERED'
      });

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/question/change-status', {
        question_id: ['q_001', 'q_002', 'q_003'],
        sku: 123456789,
        status: 'ANSWERED'
      });

      expect(result.data.updated_count).toBe(3);
      expect(result.data.failed_questions).toHaveLength(0);
    });

    it('should get question counts by status', async () => {
      const mockCounts: QuestionCount[] = [
        { status: 'NEW', count: 15 },
        { status: 'ANSWERED', count: 45 },
        { status: 'CLOSED', count: 8 },
        { status: 'PENDING_MODERATION', count: 3 }
      ];

      const mockResponse: IHttpResponse<QuestionCountResponse> = {
        status: 200,
        statusText: 'OK',
        headers: {},
        url: '/v1/question/count',
        data: {
          counts: mockCounts,
          total_questions: 71
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const result = await questionsAnswersAPI.getQuestionCounts({
        date_from: '2024-01-01',
        date_to: '2024-01-31'
      });

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/question/count', {
        date_from: '2024-01-01',
        date_to: '2024-01-31'
      });

      expect(result.data.counts).toHaveLength(4);
      expect(result.data.total_questions).toBe(71);
      expect(result.data.counts.find(c => c.status === 'NEW')?.count).toBe(15);
    });

    it('should list questions with filters', async () => {
      const mockQuestions: Question[] = [
        {
          question_id: 'q_001',
          sku: 123456789,
          text: 'Is this product waterproof?',
          status: 'NEW',
          created_at: '2024-01-15T09:00:00Z',
          author: 'John Customer',
          is_answered: false,
          answers_count: 0
        },
        {
          question_id: 'q_002',
          sku: 123456789,
          text: 'What is the warranty period?',
          status: 'ANSWERED',
          created_at: '2024-01-14T14:30:00Z',
          updated_at: '2024-01-14T16:45:00Z',
          author: 'Jane Buyer',
          is_answered: true,
          answers_count: 2
        }
      ];

      const mockResponse: IHttpResponse<QuestionListResponse> = {
        status: 200,
        statusText: 'OK',
        headers: {},
        url: '/v1/question/list',
        data: {
          questions: mockQuestions,
          has_next: false,
          total_count: 2
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const result = await questionsAnswersAPI.listQuestions({
        status: ['NEW', 'ANSWERED'],
        sku: [123456789],
        limit: 50,
        sort_by: 'created_at',
        sort_order: 'DESC'
      });

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/question/list', {
        status: ['NEW', 'ANSWERED'],
        sku: [123456789],
        limit: 50,
        sort_by: 'created_at',
        sort_order: 'DESC'
      });

      expect(result.data.questions).toHaveLength(2);
      expect(result.data.questions[0].status).toBe('NEW');
      expect(result.data.questions[1].is_answered).toBe(true);
    });

    it('should get top SKUs by question count', async () => {
      const mockTopSkus: TopSkuQuestion[] = [
        {
          sku: 123456789,
          questions_count: 25,
          product_name: 'Wireless Headphones Pro',
          offer_id: 'HEADPHONES_001'
        },
        {
          sku: 987654321,
          questions_count: 18,
          product_name: 'Smart Watch Elite',
          offer_id: 'WATCH_002'
        },
        {
          sku: 456789123,
          questions_count: 12,
          product_name: 'Bluetooth Speaker',
          offer_id: 'SPEAKER_003'
        }
      ];

      const mockResponse: IHttpResponse<QuestionTopSkuResponse> = {
        status: 200,
        statusText: 'OK',
        headers: {},
        url: '/v1/question/top-sku',
        data: {
          sku: mockTopSkus,
          total_analyzed_products: 150
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const result = await questionsAnswersAPI.getTopSkuByQuestions({
        limit: 10,
        date_from: '2024-01-01',
        min_questions_count: 5
      });

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/question/top-sku', {
        limit: 10,
        date_from: '2024-01-01',
        min_questions_count: 5
      });

      expect(result.data.sku).toHaveLength(3);
      expect(result.data.sku[0].questions_count).toBe(25);
      expect(result.data.sku[0].product_name).toBe('Wireless Headphones Pro');
      expect(result.data.total_analyzed_products).toBe(150);
    });
  });

  describe('Pagination', () => {
    it('should iterate through questions with pagination', async () => {
      const page1Questions: Question[] = [
        {
          question_id: 'q_001',
          sku: 123,
          text: 'Question 1',
          status: 'NEW',
          created_at: '2024-01-01T10:00:00Z',
          author: 'Customer 1',
          is_answered: false,
          answers_count: 0
        }
      ];

      const page2Questions: Question[] = [
        {
          question_id: 'q_002',
          sku: 124,
          text: 'Question 2',
          status: 'ANSWERED',
          created_at: '2024-01-02T10:00:00Z',
          author: 'Customer 2',
          is_answered: true,
          answers_count: 1
        }
      ];

      const page1Response: IHttpResponse<QuestionListResponse> = {
        status: 200,
        statusText: 'OK',
        headers: {},
        url: '/v1/question/list',
        data: {
          questions: page1Questions,
          last_id: 'page2_token',
          has_next: true,
          total_count: 2
        }
      };

      const page2Response: IHttpResponse<QuestionListResponse> = {
        status: 200,
        statusText: 'OK',
        headers: {},
        url: '/v1/question/list',
        data: {
          questions: page2Questions,
          has_next: false,
          total_count: 2
        }
      };

      mockHttpClient.post
        .mockResolvedValueOnce(page1Response)
        .mockResolvedValueOnce(page2Response);

      const allQuestions = [];
      for await (const page of questionsAnswersAPI.iterateQuestions({ limit: 1 })) {
        allQuestions.push(...page);
      }

      expect(allQuestions).toHaveLength(2);
      expect(allQuestions[0].question_id).toBe('q_001');
      expect(allQuestions[1].question_id).toBe('q_002');
      expect(mockHttpClient.post).toHaveBeenCalledTimes(2);
    });

    it('should iterate through answers with pagination', async () => {
      const page1Answers: Answer[] = [
        {
          answer_id: 'ans_001',
          question_id: 'q_123',
          sku: 123,
          text: 'Answer 1',
          created_at: '2024-01-01T10:00:00Z',
          author: 'Seller',
          is_seller_answer: true
        }
      ];

      const page1Response: IHttpResponse<QuestionAnswerListResponse> = {
        status: 200,
        statusText: 'OK',
        headers: {},
        url: '/v1/question/answer/list',
        data: {
          answers: page1Answers,
          has_next: false,
          total_count: 1
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(page1Response);

      const allAnswers = [];
      for await (const page of questionsAnswersAPI.iterateAnswers({ 
        question_id: 'q_123', 
        sku: 123, 
        limit: 1 
      })) {
        allAnswers.push(...page);
      }

      expect(allAnswers).toHaveLength(1);
      expect(allAnswers[0].answer_id).toBe('ans_001');
      expect(mockHttpClient.post).toHaveBeenCalledTimes(1);
    });
  });

  describe('Analytics Methods', () => {
    it('should generate comprehensive Q&A analytics', async () => {
      const mockCounts: QuestionCount[] = [
        { status: 'NEW', count: 10 },
        { status: 'ANSWERED', count: 40 },
        { status: 'PENDING_MODERATION', count: 5 }
      ];

      const mockQuestions: Question[] = [
        {
          question_id: 'q_001',
          sku: 123,
          text: 'Recent question 1',
          status: 'ANSWERED',
          created_at: '2024-01-15T10:00:00Z',
          updated_at: '2024-01-15T12:00:00Z',
          author: 'Customer 1',
          is_answered: true,
          answers_count: 1
        },
        {
          question_id: 'q_002',
          sku: 124,
          text: 'Recent question 2',
          status: 'NEW',
          created_at: '2024-01-15T08:00:00Z',
          author: 'Customer 2',
          is_answered: false,
          answers_count: 0
        }
      ];

      const mockTopProducts: TopSkuQuestion[] = [
        { sku: 123, questions_count: 15 },
        { sku: 124, questions_count: 8 },
        { sku: 125, questions_count: 5 }
      ];

      const countsResponse: IHttpResponse<QuestionCountResponse> = {
        status: 200, statusText: 'OK', headers: {}, url: '/v1/question/count',
        data: { counts: mockCounts, total_questions: 55 }
      };

      const questionsResponse: IHttpResponse<QuestionListResponse> = {
        status: 200, statusText: 'OK', headers: {}, url: '/v1/question/list',
        data: { questions: mockQuestions, has_next: false, total_count: 2 }
      };

      const topProductsResponse: IHttpResponse<QuestionTopSkuResponse> = {
        status: 200, statusText: 'OK', headers: {}, url: '/v1/question/top-sku',
        data: { sku: mockTopProducts, total_analyzed_products: 100 }
      };

      mockHttpClient.post
        .mockResolvedValueOnce(countsResponse)
        .mockResolvedValueOnce(questionsResponse)
        .mockResolvedValueOnce(topProductsResponse);

      const analytics = await questionsAnswersAPI.getQuestionsAnalytics();

      expect(analytics.question_metrics.total_questions).toBe(55);
      expect(analytics.question_metrics.new_questions).toBe(10);
      expect(analytics.question_metrics.answered_questions).toBe(40);
      expect(analytics.question_metrics.answer_rate_percent).toBeCloseTo(72.7, 1); // 40/55 * 100
      
      expect(analytics.response_performance.average_response_time_hours).toBe(2); // 2 hours for the answered question
      
      expect(analytics.product_insights.most_questioned_products).toHaveLength(3);
      expect(analytics.product_insights.most_questioned_products[0].sku).toBe(123);
      
      expect(analytics.engagement_metrics.questions_per_product_avg).toBeCloseTo(9.33, 1); // (15+8+5)/3
    });

    it('should generate product insights for improvement', async () => {
      const mockTopProducts: TopSkuQuestion[] = [
        { sku: 123, questions_count: 25 }, // High volume - should get high priority insight
        { sku: 124, questions_count: 15 }, // Moderate volume - should get medium priority insight
        { sku: 125, questions_count: 8 }   // Low volume - should get medium priority insight
      ];

      const mockQuestionsForSku123: Question[] = [
        {
          question_id: 'q_001', sku: 123, text: 'Question for SKU 123',
          status: 'NEW', created_at: '2024-01-01T10:00:00Z',
          author: 'Customer', is_answered: false, answers_count: 0
        }
      ];

      const mockQuestionsForSku124: Question[] = [
        {
          question_id: 'q_002', sku: 124, text: 'Question for SKU 124',
          status: 'ANSWERED', created_at: '2024-01-01T10:00:00Z',
          author: 'Customer', is_answered: true, answers_count: 1
        }
      ];

      const mockQuestionsForSku125: Question[] = [
        {
          question_id: 'q_003', sku: 125, text: 'Question for SKU 125',
          status: 'NEW', created_at: '2024-01-01T10:00:00Z',
          author: 'Customer', is_answered: false, answers_count: 0
        }
      ];

      mockHttpClient.post
        .mockResolvedValueOnce({
          status: 200, statusText: 'OK', headers: {}, url: '/v1/question/top-sku',
          data: { sku: mockTopProducts, total_analyzed_products: 100 }
        })
        .mockResolvedValueOnce({
          status: 200, statusText: 'OK', headers: {}, url: '/v1/question/list',
          data: { questions: mockQuestionsForSku123, has_next: false, total_count: 1 }
        })
        .mockResolvedValueOnce({
          status: 200, statusText: 'OK', headers: {}, url: '/v1/question/list',
          data: { questions: mockQuestionsForSku124, has_next: false, total_count: 1 }
        })
        .mockResolvedValueOnce({
          status: 200, statusText: 'OK', headers: {}, url: '/v1/question/list',
          data: { questions: mockQuestionsForSku125, has_next: false, total_count: 1 }
        });

      const insights = await questionsAnswersAPI.getProductInsights();

      expect(insights).toHaveLength(3);
      
      const highPriorityInsight = insights.find(i => i.priority === 'high')!;
      expect(highPriorityInsight.sku).toBe(123);
      expect(highPriorityInsight.insight_type).toBe('frequent_concern');
      expect(highPriorityInsight.description).toContain('25 questions');
      
      const mediumPriorityInsights = insights.filter(i => i.priority === 'medium');
      expect(mediumPriorityInsights).toHaveLength(2);
    });

    it('should get questions pending response', async () => {
      const oldDate = new Date(Date.now() - 25 * 60 * 60 * 1000); // 25 hours ago
      const recentDate = new Date(Date.now() - 1 * 60 * 60 * 1000); // 1 hour ago

      const mockUrgentQuestions: Question[] = [
        {
          question_id: 'q_urgent_001',
          sku: 123,
          text: 'Urgent question from 25 hours ago',
          status: 'NEW',
          created_at: oldDate.toISOString(),
          author: 'Customer',
          is_answered: false,
          answers_count: 0
        }
      ];

      const mockRecentQuestions: Question[] = [
        {
          question_id: 'q_recent_001',
          sku: 124,
          text: 'Recent question from 1 hour ago',
          status: 'NEW',
          created_at: recentDate.toISOString(),
          author: 'Customer',
          is_answered: false,
          answers_count: 0
        }
      ];

      const page1Response: IHttpResponse<QuestionListResponse> = {
        status: 200, statusText: 'OK', headers: {}, url: '/v1/question/list',
        data: { questions: [...mockUrgentQuestions, ...mockRecentQuestions], has_next: false, total_count: 2 }
      };

      mockHttpClient.post.mockResolvedValueOnce(page1Response);

      const pendingQuestions = await questionsAnswersAPI.getQuestionsPendingResponse();

      expect(pendingQuestions).toHaveLength(1);
      expect(pendingQuestions[0].question_id).toBe('q_urgent_001');
      expect(pendingQuestions[0].text).toContain('25 hours ago');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty responses gracefully', async () => {
      const mockResponse: IHttpResponse<QuestionListResponse> = {
        status: 200,
        statusText: 'OK',
        headers: {},
        url: '/v1/question/list',
        data: {
          questions: [],
          has_next: false,
          total_count: 0
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const result = await questionsAnswersAPI.listQuestions({ status: ['NEW'] });

      expect(result.data.questions).toHaveLength(0);
      expect(result.data.total_count).toBe(0);
    });

    it('should handle analytics with no data', async () => {
      const emptyCounts: QuestionCount[] = [];
      const emptyQuestions: Question[] = [];
      const emptyProducts: TopSkuQuestion[] = [];

      mockHttpClient.post
        .mockResolvedValueOnce({
          status: 200, statusText: 'OK', headers: {}, url: '/v1/question/count',
          data: { counts: emptyCounts, total_questions: 0 }
        })
        .mockResolvedValueOnce({
          status: 200, statusText: 'OK', headers: {}, url: '/v1/question/list',
          data: { questions: emptyQuestions, has_next: false, total_count: 0 }
        })
        .mockResolvedValueOnce({
          status: 200, statusText: 'OK', headers: {}, url: '/v1/question/top-sku',
          data: { sku: emptyProducts, total_analyzed_products: 0 }
        });

      const analytics = await questionsAnswersAPI.getQuestionsAnalytics();

      expect(analytics.question_metrics.total_questions).toBe(0);
      expect(analytics.question_metrics.answer_rate_percent).toBe(0);
      expect(analytics.response_performance.average_response_time_hours).toBe(0);
      expect(analytics.product_insights.most_questioned_products).toHaveLength(0);
      expect(analytics.engagement_metrics.questions_per_product_avg).toBe(0);
    });

    it('should handle API errors gracefully', async () => {
      mockHttpClient.post.mockRejectedValueOnce(new Error('Network error'));

      await expect(questionsAnswersAPI.listQuestions()).rejects.toThrow('Network error');
    });

    it('should handle invalid question status changes', async () => {
      const mockResponse: IHttpResponse<{ updated_count: number; failed_questions: any[] }> = {
        status: 200,
        statusText: 'OK',
        headers: {},
        url: '/v1/question/change-status',
        data: {
          updated_count: 1,
          failed_questions: [
            {
              question_id: 'q_invalid',
              error: 'Question not found'
            }
          ]
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const result = await questionsAnswersAPI.changeQuestionStatus({
        question_id: ['q_valid', 'q_invalid'],
        sku: 123456789,
        status: 'ANSWERED'
      });

      expect(result.data.updated_count).toBe(1);
      expect(result.data.failed_questions).toHaveLength(1);
      expect(result.data.failed_questions[0].question_id).toBe('q_invalid');
    });
  });
});