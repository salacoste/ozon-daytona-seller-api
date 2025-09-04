/**
 * QuestionsAnswersApi unit tests
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import { QuestionsAnswersApi } from "../../../../src/categories/questions-answers/index.js";
import { HttpClient } from "../../../../src/core/http.js";
import type { QuestionAnswerCreateRequest, QuestionAnswerDeleteRequest, QuestionAnswerListRequest, QuestionChangeStatusRequest, QuestionCountRequest, QuestionInfoRequest, QuestionListRequest, QuestionTopSkuRequest } from "../../../../src/types/requests/questions-answers.js";

// Mock HttpClient
const mockHttpClient = {
  request: vi.fn(),
} as unknown as HttpClient;

describe("QuestionsAnswersApi", () => {
  let questionsAnswersApi: QuestionsAnswersApi;

  beforeEach(() => {
    questionsAnswersApi = new QuestionsAnswersApi(mockHttpClient);
    vi.clearAllMocks();
  });

  describe("createAnswer", () => {
    it("should create answer successfully", async () => {
      const request: QuestionAnswerCreateRequest = {
        question_id: "question-123",
        sku: 123456789,
        text: "Да, товар полностью совместим с указанной моделью.",
      };

      const expectedResponse = {
        answer_id: "answer-456",
      };

      (mockHttpClient.request as any).mockResolvedValue(expectedResponse);

      const result = await questionsAnswersApi.createAnswer(request);

      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v1/question/answer/create", request, undefined);
      expect(result).toEqual(expectedResponse);
    });

    it("should create detailed answer", async () => {
      const request: QuestionAnswerCreateRequest = {
        question_id: "question-789",
        sku: 987654321,
        text: "Спасибо за вопрос! Размер данной модели соответствует стандартной размерной сетке. Рекомендуем ориентироваться на ваш обычный размер.",
      };

      const expectedResponse = {
        answer_id: "answer-789",
      };

      (mockHttpClient.request as any).mockResolvedValue(expectedResponse);

      const result = await questionsAnswersApi.createAnswer(request);

      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v1/question/answer/create", request, undefined);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe("deleteAnswer", () => {
    it("should delete answer successfully", async () => {
      const request: QuestionAnswerDeleteRequest = {
        answer_id: "answer-456",
        sku: 123456789,
      };

      const expectedResponse = {
        result: "ok",
      };

      (mockHttpClient.request as any).mockResolvedValue(expectedResponse);

      const result = await questionsAnswersApi.deleteAnswer(request);

      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v1/question/answer/delete", request, undefined);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe("getAnswerList", () => {
    it("should get answer list successfully", async () => {
      const request: QuestionAnswerListRequest = {
        question_id: "question-123",
        sku: 123456789,
      };

      const expectedResponse = {
        answers: [
          {
            id: "answer-1",
            question_id: "question-123",
            sku: 123456789,
            text: "Первый ответ на вопрос",
            author_name: "Продавец",
            published_at: "2024-01-15T10:00:00Z",
          },
          {
            id: "answer-2",
            question_id: "question-123",
            sku: 123456789,
            text: "Дополнительная информация",
            author_name: "Продавец",
            published_at: "2024-01-15T11:00:00Z",
          },
        ],
        last_id: "answer-2",
      };

      (mockHttpClient.request as any).mockResolvedValue(expectedResponse);

      const result = await questionsAnswersApi.getAnswerList(request);

      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v1/question/answer/list", request, undefined);
      expect(result).toEqual(expectedResponse);
    });

    it("should get answer list with pagination", async () => {
      const request: QuestionAnswerListRequest = {
        question_id: "question-123",
        sku: 123456789,
        last_id: "answer-2",
        limit: 10,
      };

      const expectedResponse = {
        answers: [],
        last_id: undefined,
      };

      (mockHttpClient.request as any).mockResolvedValue(expectedResponse);

      const result = await questionsAnswersApi.getAnswerList(request);

      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v1/question/answer/list", request, undefined);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe("changeQuestionStatus", () => {
    it("should change question status successfully", async () => {
      const request: QuestionChangeStatusRequest = {
        question_ids: ["question-1", "question-2", "question-3"],
        status: "PROCESSED",
      };

      const expectedResponse = {
        result: "ok",
      };

      (mockHttpClient.request as any).mockResolvedValue(expectedResponse);

      const result = await questionsAnswersApi.changeQuestionStatus(request);

      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v1/question/change-status", request, undefined);
      expect(result).toEqual(expectedResponse);
    });

    it("should change single question status", async () => {
      const request: QuestionChangeStatusRequest = {
        question_ids: ["question-123"],
        status: "VIEWED",
      };

      const expectedResponse = {
        result: "ok",
      };

      (mockHttpClient.request as any).mockResolvedValue(expectedResponse);

      const result = await questionsAnswersApi.changeQuestionStatus(request);

      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v1/question/change-status", request, undefined);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe("getQuestionCount", () => {
    it("should get question count successfully", async () => {
      const expectedResponse = {
        all: 150,
        new: 15,
        processed: 100,
        unprocessed: 35,
        viewed: 120,
      };

      (mockHttpClient.request as any).mockResolvedValue(expectedResponse);

      const result = await questionsAnswersApi.getQuestionCount();

      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v1/question/count", {}, undefined);
      expect(result).toEqual(expectedResponse);
    });

    it("should get question count with empty request", async () => {
      const request: QuestionCountRequest = {};

      const expectedResponse = {
        all: 0,
        new: 0,
        processed: 0,
        unprocessed: 0,
        viewed: 0,
      };

      (mockHttpClient.request as any).mockResolvedValue(expectedResponse);

      const result = await questionsAnswersApi.getQuestionCount(request);

      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v1/question/count", request, undefined);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe("getQuestionInfo", () => {
    it("should get question info successfully", async () => {
      const request: QuestionInfoRequest = {
        question_id: "question-123",
      };

      const expectedResponse = {
        id: "question-123",
        sku: 123456789,
        text: "Подойдет ли этот товар для использования на улице?",
        author_name: "Покупатель",
        published_at: "2024-01-15T09:00:00Z",
        status: "NEW",
        answers_count: 2,
        product_url: "https://ozon.ru/product/123456789",
        question_link: "https://seller.ozon.ru/questions/question-123",
      };

      (mockHttpClient.request as any).mockResolvedValue(expectedResponse);

      const result = await questionsAnswersApi.getQuestionInfo(request);

      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v1/question/info", request, undefined);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe("getQuestionList", () => {
    it("should get question list successfully", async () => {
      const expectedResponse = {
        questions: [
          {
            id: "question-1",
            sku: 123456789,
            text: "Какой размер лучше выбрать?",
            author_name: "Покупатель А",
            published_at: "2024-01-15T09:00:00Z",
            status: "NEW",
            answers_count: 0,
            product_url: "https://ozon.ru/product/123456789",
            question_link: "https://seller.ozon.ru/questions/question-1",
          },
          {
            id: "question-2",
            sku: 987654321,
            text: "Есть ли гарантия на товар?",
            author_name: "Покупатель Б",
            published_at: "2024-01-15T10:00:00Z",
            status: "PROCESSED",
            answers_count: 1,
            product_url: "https://ozon.ru/product/987654321",
            question_link: "https://seller.ozon.ru/questions/question-2",
          },
        ],
        last_id: "question-2",
      };

      (mockHttpClient.request as any).mockResolvedValue(expectedResponse);

      const result = await questionsAnswersApi.getQuestionList();

      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v1/question/list", {}, undefined);
      expect(result).toEqual(expectedResponse);
    });

    it("should get question list with filters", async () => {
      const request: QuestionListRequest = {
        filter: {
          status: "NEW",
          date_from: "2024-01-01T00:00:00Z",
          date_to: "2024-01-31T23:59:59Z",
        },
        limit: 50,
      };

      const expectedResponse = {
        questions: [
          {
            id: "question-new",
            sku: 555666777,
            text: "Новый вопрос о товаре",
            author_name: "Покупатель В",
            published_at: "2024-01-20T12:00:00Z",
            status: "NEW",
            answers_count: 0,
            product_url: "https://ozon.ru/product/555666777",
            question_link: "https://seller.ozon.ru/questions/question-new",
          },
        ],
        last_id: "question-new",
      };

      (mockHttpClient.request as any).mockResolvedValue(expectedResponse);

      const result = await questionsAnswersApi.getQuestionList(request);

      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v1/question/list", request, undefined);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe("getTopQuestionedProducts", () => {
    it("should get top questioned products successfully", async () => {
      const request: QuestionTopSkuRequest = {
        limit: 10,
      };

      const expectedResponse = {
        sku: ["123456789", "987654321", "555666777", "111222333"],
      };

      (mockHttpClient.request as any).mockResolvedValue(expectedResponse);

      const result = await questionsAnswersApi.getTopQuestionedProducts(request);

      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v1/question/top-sku", request, undefined);
      expect(result).toEqual(expectedResponse);
    });

    it("should get top questioned products with different limits", async () => {
      const request: QuestionTopSkuRequest = {
        limit: 5,
      };

      const expectedResponse = {
        sku: ["123456789", "987654321", "555666777"],
      };

      (mockHttpClient.request as any).mockResolvedValue(expectedResponse);

      const result = await questionsAnswersApi.getTopQuestionedProducts(request);

      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v1/question/top-sku", request, undefined);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe("error handling", () => {
    it("should handle API errors", async () => {
      const request: QuestionAnswerCreateRequest = {
        question_id: "invalid-question",
        sku: 123456789,
        text: "Test answer",
      };

      const error = new Error("Question not found");
      (mockHttpClient.request as any).mockRejectedValue(error);

      await expect(questionsAnswersApi.createAnswer(request)).rejects.toThrow("Question not found");
    });

    it("should handle validation errors", async () => {
      const request: QuestionAnswerCreateRequest = {
        question_id: "question-123",
        sku: 123456789,
        text: "", // Empty text should cause validation error
      };

      const error = new Error("Answer text is required");
      (mockHttpClient.request as any).mockRejectedValue(error);

      await expect(questionsAnswersApi.createAnswer(request)).rejects.toThrow("Answer text is required");
    });

    it("should handle network errors", async () => {
      const request: QuestionListRequest = {};

      const error = new Error("Network timeout");
      (mockHttpClient.request as any).mockRejectedValue(error);

      await expect(questionsAnswersApi.getQuestionList(request)).rejects.toThrow("Network timeout");
    });
  });

  describe("request options", () => {
    it("should pass custom request options", async () => {
      const request: QuestionInfoRequest = {
        question_id: "question-123",
      };

      const options = {
        timeout: 10000,
        retries: 3,
      };

      const expectedResponse = {
        id: "question-123",
        text: "Test question",
        status: "NEW",
        answers_count: 0,
      };

      (mockHttpClient.request as any).mockResolvedValue(expectedResponse);

      const result = await questionsAnswersApi.getQuestionInfo(request, options);

      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v1/question/info", request, options);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe("Premium Plus subscription requirements", () => {
    it("should work with Premium Plus subscription", async () => {
      // Premium Plus subscription allows access to Q&A features
      const request: QuestionListRequest = {
        filter: {
          status: "ALL",
        },
      };

      const expectedResponse = {
        questions: [
          {
            id: "question-premium",
            sku: 123456789,
            text: "Premium question",
            author_name: "Premium Customer",
            published_at: "2024-01-15T09:00:00Z",
            status: "NEW",
            answers_count: 0,
            product_url: "https://ozon.ru/product/123456789",
            question_link: "https://seller.ozon.ru/questions/question-premium",
          },
        ],
      };

      (mockHttpClient.request as any).mockResolvedValue(expectedResponse);

      const result = await questionsAnswersApi.getQuestionList(request);

      expect(result).toEqual(expectedResponse);
    });

    it("should handle subscription restriction errors", async () => {
      const request: QuestionListRequest = {};

      const error = new Error("Premium Plus subscription required");
      (mockHttpClient.request as any).mockRejectedValue(error);

      await expect(questionsAnswersApi.getQuestionList(request)).rejects.toThrow("Premium Plus subscription required");
    });
  });
});
