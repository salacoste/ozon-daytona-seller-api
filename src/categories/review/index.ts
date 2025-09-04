/**
 * Review API implementation
 * Generated from MCP documentation: reviewapi--chunk-001.md, reviewapi--chunk-002.md
 * Handles customer review management and seller responses
 */

import { HttpClient } from "../../core/http.js";
import type { RequestOptions } from "../../core/types.js";
import type { ReviewChangeStatusRequest, CommentCreateRequest, CommentDeleteRequest, CommentListRequest, ReviewCountRequest, ReviewInfoRequest, ReviewListRequest } from "../../types/requests/review.js";
import type { ReviewChangeStatusResponse, CommentCreateResponse, CommentDeleteResponse, CommentListResponse, ReviewCountResponse, ReviewInfoResponse, ReviewListResponse } from "../../types/responses/review.js";

/**
 * Review API для управления отзывами и комментариями
 * Review API for review and comment management
 *
 * Доступно для продавцов с подпиской Premium Plus.
 * Available for sellers with Premium Plus subscription.
 *
 * @example
 * ```typescript
 * // Получить список отзывов
 * const reviews = await reviewApi.getList({
 *   limit: 50,
 *   status: 'UNPROCESSED'
 * });
 *
 * // Ответить на отзыв
 * await reviewApi.createComment({
 *   review_id: 'review-123',
 *   text: 'Спасибо за отзыв!',
 *   mark_review_as_processed: true
 * });
 * ```
 */
export class ReviewApi {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Изменить статус отзывов
   * Change review status
   *
   * Метод позволяет изменить статус отзывов на обработанный или необработанный.
   *
   * @param request - Параметры изменения статуса отзывов
   * @param options - Дополнительные опции запроса
   * @returns Результат операции изменения статуса
   *
   * @example
   * ```typescript
   * const result = await reviewApi.changeStatus({
   *   review_ids: ['review-123', 'review-456'],
   *   status: 'PROCESSED'
   * });
   *
   * if (result.result === 'ok') {
   *   console.log('Статус отзывов успешно изменен');
   * }
   * ```
   */
  async changeStatus(request: ReviewChangeStatusRequest, options?: RequestOptions): Promise<ReviewChangeStatusResponse> {
    return this.httpClient.request<ReviewChangeStatusRequest, ReviewChangeStatusResponse>("POST", "/v1/review/change-status", request, options);
  }

  /**
   * Оставить комментарий на отзыв
   * Create comment on review
   *
   * Метод позволяет оставить комментарий продавца на отзыв покупателя.
   *
   * @param request - Параметры создания комментария
   * @param options - Дополнительные опции запроса
   * @returns Результат создания комментария с его идентификатором
   *
   * @example
   * ```typescript
   * const comment = await reviewApi.createComment({
   *   review_id: 'review-123',
   *   text: 'Спасибо за ваш отзыв! Мы учтем ваши замечания.',
   *   mark_review_as_processed: true
   * });
   *
   * console.log(`Комментарий создан с ID: ${comment.comment_id}`);
   * ```
   */
  async createComment(request: CommentCreateRequest, options?: RequestOptions): Promise<CommentCreateResponse> {
    return this.httpClient.request<CommentCreateRequest, CommentCreateResponse>("POST", "/v1/review/comment/create", request, options);
  }

  /**
   * Удалить комментарий на отзыв
   * Delete comment on review
   *
   * Метод позволяет удалить ранее оставленный комментарий продавца.
   *
   * @param request - Параметры удаления комментария
   * @param options - Дополнительные опции запроса
   * @returns Результат операции удаления
   *
   * @example
   * ```typescript
   * const result = await reviewApi.deleteComment({
   *   comment_id: 'comment-123'
   * });
   *
   * if (result.result === 'ok') {
   *   console.log('Комментарий успешно удален');
   * }
   * ```
   */
  async deleteComment(request: CommentDeleteRequest, options?: RequestOptions): Promise<CommentDeleteResponse> {
    return this.httpClient.request<CommentDeleteRequest, CommentDeleteResponse>("POST", "/v1/review/comment/delete", request, options);
  }

  /**
   * Получить список комментариев на отзыв
   * Get list of comments on review
   *
   * Метод возвращает информацию по комментариям на отзывы, которые прошли модерацию.
   *
   * @param request - Параметры запроса списка комментариев
   * @param options - Дополнительные опции запроса
   * @returns Список комментариев к отзыву
   *
   * @example
   * ```typescript
   * const comments = await reviewApi.getCommentList({
   *   review_id: 'review-123',
   *   limit: 50,
   *   sort_dir: 'DESC'
   * });
   *
   * comments.comments?.forEach(comment => {
   *   console.log(`${comment.is_owner ? 'Продавец' : 'Покупатель'}: ${comment.text}`);
   * });
   * ```
   */
  async getCommentList(request: CommentListRequest, options?: RequestOptions): Promise<CommentListResponse> {
    return this.httpClient.request<CommentListRequest, CommentListResponse>("POST", "/v1/review/comment/list", request, options);
  }

  /**
   * Получить количество отзывов по статусам
   * Get review count by status
   *
   * Метод возвращает количество отзывов по различным статусам обработки.
   *
   * @param request - Параметры запроса (пустой объект)
   * @param options - Дополнительные опции запроса
   * @returns Количество отзывов по статусам
   *
   * @example
   * ```typescript
   * const counts = await reviewApi.getCount();
   *
   * console.log(`Всего отзывов: ${counts.total}`);
   * console.log(`Обработанных: ${counts.processed}`);
   * console.log(`Необработанных: ${counts.unprocessed}`);
   * ```
   */
  async getCount(request?: ReviewCountRequest, options?: RequestOptions): Promise<ReviewCountResponse> {
    return this.httpClient.request<ReviewCountRequest, ReviewCountResponse>("POST", "/v1/review/count", request ?? {}, options);
  }

  /**
   * Получить информацию об отзыве
   * Get review information
   *
   * Метод возвращает подробную информацию об отзыве, включая фото и видео.
   *
   * @param request - Параметры запроса информации об отзыве
   * @param options - Дополнительные опции запроса
   * @returns Подробная информация об отзыве
   *
   * @example
   * ```typescript
   * const review = await reviewApi.getInfo({
   *   review_id: 'review-123'
   * });
   *
   * console.log(`Отзыв: ${review.text}`);
   * console.log(`Рейтинг: ${review.rating}`);
   * console.log(`Фото: ${review.photos_amount}, Видео: ${review.videos_amount}`);
   * ```
   */
  async getInfo(request: ReviewInfoRequest, options?: RequestOptions): Promise<ReviewInfoResponse> {
    return this.httpClient.request<ReviewInfoRequest, ReviewInfoResponse>("POST", "/v1/review/info", request, options);
  }

  /**
   * Получить список отзывов
   * Get review list
   *
   * Метод возвращает список отзывов с возможностью фильтрации по статусу и пагинацией.
   * Не возвращает параметры «Достоинства» и «Недостатки», если они есть в отзывах.
   *
   * @param request - Параметры запроса списка отзывов
   * @param options - Дополнительные опции запроса
   * @returns Список отзывов
   *
   * @example
   * ```typescript
   * const reviews = await reviewApi.getList({
   *   limit: 100,
   *   status: 'UNPROCESSED',
   *   sort_dir: 'DESC'
   * });
   *
   * reviews.reviews?.forEach(review => {
   *   console.log(`${review.rating}⭐ ${review.text.substring(0, 100)}...`);
   * });
   *
   * // Пагинация
   * if (reviews.has_next) {
   *   const nextPage = await reviewApi.getList({
   *     limit: 100,
   *     last_id: reviews.last_id,
   *     status: 'UNPROCESSED'
   *   });
   * }
   * ```
   */
  async getList(request?: ReviewListRequest, options?: RequestOptions): Promise<ReviewListResponse> {
    return this.httpClient.request<ReviewListRequest, ReviewListResponse>("POST", "/v1/review/list", request ?? { limit: 20 }, options);
  }
}
