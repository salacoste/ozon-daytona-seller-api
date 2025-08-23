/**
 * Questions & Answers API implementation
 * Generated from MCP documentation: questions-answers--chunk-001.md, questions-answers--chunk-002.md
 * Handles product Q&A management and customer engagement
 */

import { HttpClient } from '../../core/http.js';
import type { RequestOptions } from '../../core/types.js';
import type {
  QuestionAnswerCreateRequest,
  QuestionAnswerDeleteRequest,
  QuestionAnswerListRequest,
  QuestionChangeStatusRequest,
  QuestionCountRequest,
  QuestionInfoRequest,
  QuestionListRequest,
  QuestionTopSkuRequest,
} from '../../types/requests/questions-answers.js';
import type {
  QuestionAnswerCreateResponse,
  QuestionAnswerDeleteResponse,
  QuestionAnswerListResponse,
  QuestionChangeStatusResponse,
  QuestionCountResponse,
  QuestionInfoResponse,
  QuestionListResponse,
  QuestionTopSkuResponse,
} from '../../types/responses/questions-answers.js';

/**
 * Questions & Answers API для управления вопросами и ответами
 * Questions & Answers API for questions and answers management
 * 
 * Доступно для продавцов с подпиской Premium Plus.
 * Available for sellers with Premium Plus subscription.
 * 
 * @example
 * ```typescript
 * // Получить список вопросов
 * const questions = await questionsAnswersApi.getQuestionList({
 *   filter: {
 *     status: 'NEW'
 *   }
 * });
 * 
 * // Ответить на вопрос
 * await questionsAnswersApi.createAnswer({
 *   question_id: 'question-123',
 *   sku: 123456789,
 *   text: 'Да, товар совместим с указанной моделью.'
 * });
 * ```
 */
export class QuestionsAnswersApi {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Создать ответ на вопрос
   * Create answer to question
   * 
   * Позволяет создать ответ продавца на вопрос покупателя о товаре.
   * 
   * @param request - Параметры создания ответа
   * @param options - Дополнительные опции запроса
   * @returns Результат создания ответа с идентификатором
   * 
   * @example
   * ```typescript
   * const answer = await questionsAnswersApi.createAnswer({
   *   question_id: 'question-123',
   *   sku: 123456789,
   *   text: 'Спасибо за вопрос! Да, товар полностью совместим с указанной моделью.'
   * });
   * 
   * console.log(`Ответ создан с ID: ${answer.answer_id}`);
   * ```
   */
  async createAnswer(
    request: QuestionAnswerCreateRequest,
    options?: RequestOptions
  ): Promise<QuestionAnswerCreateResponse> {
    return this.httpClient.request<QuestionAnswerCreateRequest, QuestionAnswerCreateResponse>(
      'POST',
      '/v1/question/answer/create',
      request,
      options
    );
  }

  /**
   * Удалить ответ на вопрос
   * Delete answer to question
   * 
   * Позволяет удалить ранее созданный ответ продавца на вопрос.
   * 
   * @param request - Параметры удаления ответа
   * @param options - Дополнительные опции запроса
   * @returns Результат операции удаления
   * 
   * @example
   * ```typescript
   * const result = await questionsAnswersApi.deleteAnswer({
   *   answer_id: 'answer-456',
   *   sku: 123456789
   * });
   * 
   * if (result.result === 'ok') {
   *   console.log('Ответ успешно удален');
   * }
   * ```
   */
  async deleteAnswer(
    request: QuestionAnswerDeleteRequest,
    options?: RequestOptions
  ): Promise<QuestionAnswerDeleteResponse> {
    return this.httpClient.request<QuestionAnswerDeleteRequest, QuestionAnswerDeleteResponse>(
      'POST',
      '/v1/question/answer/delete',
      request,
      options
    );
  }

  /**
   * Получить список ответов на вопрос
   * Get list of answers to question
   * 
   * Возвращает все ответы на конкретный вопрос с возможностью пагинации.
   * 
   * @param request - Параметры запроса списка ответов
   * @param options - Дополнительные опции запроса
   * @returns Список ответов на вопрос
   * 
   * @example
   * ```typescript
   * const answers = await questionsAnswersApi.getAnswerList({
   *   question_id: 'question-123',
   *   sku: 123456789
   * });
   * 
   * answers.answers?.forEach(answer => {
   *   console.log(`${answer.author_name}: ${answer.text}`);
   * });
   * 
   * // Пагинация
   * if (answers.last_id) {
   *   const nextPage = await questionsAnswersApi.getAnswerList({
   *     question_id: 'question-123',
   *     sku: 123456789,
   *     last_id: answers.last_id
   *   });
   * }
   * ```
   */
  async getAnswerList(
    request: QuestionAnswerListRequest,
    options?: RequestOptions
  ): Promise<QuestionAnswerListResponse> {
    return this.httpClient.request<QuestionAnswerListRequest, QuestionAnswerListResponse>(
      'POST',
      '/v1/question/answer/list',
      request,
      options
    );
  }

  /**
   * Изменить статус вопросов
   * Change questions status
   * 
   * Позволяет массово изменить статус нескольких вопросов.
   * 
   * @param request - Параметры изменения статуса вопросов
   * @param options - Дополнительные опции запроса
   * @returns Результат операции изменения статуса
   * 
   * @example
   * ```typescript
   * const result = await questionsAnswersApi.changeQuestionStatus({
   *   question_ids: ['question-1', 'question-2', 'question-3'],
   *   status: 'PROCESSED'
   * });
   * 
   * if (result.result === 'ok') {
   *   console.log('Статус вопросов успешно изменен');
   * }
   * ```
   */
  async changeQuestionStatus(
    request: QuestionChangeStatusRequest,
    options?: RequestOptions
  ): Promise<QuestionChangeStatusResponse> {
    return this.httpClient.request<QuestionChangeStatusRequest, QuestionChangeStatusResponse>(
      'POST',
      '/v1/question/change-status',
      request,
      options
    );
  }

  /**
   * Получить количество вопросов по статусам
   * Get questions count by status
   * 
   * Возвращает статистику по количеству вопросов в различных статусах.
   * 
   * @param request - Параметры запроса (пустой объект)
   * @param options - Дополнительные опции запроса
   * @returns Количество вопросов по статусам
   * 
   * @example
   * ```typescript
   * const counts = await questionsAnswersApi.getQuestionCount();
   * 
   * console.log(`Всего вопросов: ${counts.all}`);
   * console.log(`Новых: ${counts.new}`);
   * console.log(`Обработанных: ${counts.processed}`);
   * console.log(`Необработанных: ${counts.unprocessed}`);
   * console.log(`Просмотренных: ${counts.viewed}`);
   * ```
   */
  async getQuestionCount(
    request?: QuestionCountRequest,
    options?: RequestOptions
  ): Promise<QuestionCountResponse> {
    return this.httpClient.request<QuestionCountRequest, QuestionCountResponse>(
      'POST',
      '/v1/question/count',
      request ?? {},
      options
    );
  }

  /**
   * Получить информацию о вопросе
   * Get question information
   * 
   * Возвращает подробную информацию о конкретном вопросе.
   * 
   * @param request - Параметры запроса информации о вопросе
   * @param options - Дополнительные опции запроса
   * @returns Подробная информация о вопросе
   * 
   * @example
   * ```typescript
   * const question = await questionsAnswersApi.getQuestionInfo({
   *   question_id: 'question-123'
   * });
   * 
   * console.log(`Вопрос: ${question.text}`);
   * console.log(`Автор: ${question.author_name}`);
   * console.log(`Статус: ${question.status}`);
   * console.log(`Ответов: ${question.answers_count}`);
   * ```
   */
  async getQuestionInfo(
    request: QuestionInfoRequest,
    options?: RequestOptions
  ): Promise<QuestionInfoResponse> {
    return this.httpClient.request<QuestionInfoRequest, QuestionInfoResponse>(
      'POST',
      '/v1/question/info',
      request,
      options
    );
  }

  /**
   * Получить список вопросов
   * Get questions list
   * 
   * Возвращает список вопросов с возможностью фильтрации по статусу и дате.
   * 
   * @param request - Параметры запроса списка вопросов
   * @param options - Дополнительные опции запроса
   * @returns Список вопросов
   * 
   * @example
   * ```typescript
   * const questions = await questionsAnswersApi.getQuestionList({
   *   filter: {
   *     status: 'NEW',
   *     date_from: '2024-01-01T00:00:00Z',
   *     date_to: '2024-01-31T23:59:59Z'
   *   }
   * });
   * 
   * questions.questions?.forEach(question => {
   *   console.log(`${question.status}: ${question.text.substring(0, 100)}...`);
   *   console.log(`Ответов: ${question.answers_count}`);
   * });
   * 
   * // Пагинация
   * if (questions.last_id) {
   *   const nextPage = await questionsAnswersApi.getQuestionList({
   *     filter: { status: 'NEW' },
   *     last_id: questions.last_id
   *   });
   * }
   * ```
   */
  async getQuestionList(
    request?: QuestionListRequest,
    options?: RequestOptions
  ): Promise<QuestionListResponse> {
    return this.httpClient.request<QuestionListRequest, QuestionListResponse>(
      'POST',
      '/v1/question/list',
      request ?? {},
      options
    );
  }

  /**
   * Получить товары с наибольшим количеством вопросов
   * Get products with most questions
   * 
   * Возвращает список SKU товаров, которые получили наибольшее количество вопросов.
   * 
   * @param request - Параметры запроса топ товаров по вопросам
   * @param options - Дополнительные опции запроса
   * @returns Список SKU товаров с наибольшим количеством вопросов
   * 
   * @example
   * ```typescript
   * const topProducts = await questionsAnswersApi.getTopQuestionedProducts({
   *   limit: 10
   * });
   * 
   * console.log('Товары с наибольшим количеством вопросов:');
   * topProducts.sku?.forEach((sku, index) => {
   *   console.log(`${index + 1}. SKU: ${sku}`);
   * });
   * ```
   */
  async getTopQuestionedProducts(
    request: QuestionTopSkuRequest,
    options?: RequestOptions
  ): Promise<QuestionTopSkuResponse> {
    return this.httpClient.request<QuestionTopSkuRequest, QuestionTopSkuResponse>(
      'POST',
      '/v1/question/top-sku',
      request,
      options
    );
  }
}