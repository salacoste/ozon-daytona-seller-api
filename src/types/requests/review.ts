/**
 * Review API request types
 * Generated from MCP documentation: reviewapi--chunk-001.md, reviewapi--chunk-002.md
 * Ready for manual editing and enhancements
 */

/**
 * Запрос изменения статуса отзывов
 * Review change status request
 */
export interface ReviewChangeStatusRequest {
  /** Массив с идентификаторами отзывов от 1 до 100 */
  review_ids: string[];
  /** 
   * Статус отзыва:
   * - `PROCESSED` — обработанный,
   * - `UNPROCESSED` — необработанный.
   */
  status: 'PROCESSED' | 'UNPROCESSED';
  readonly [key: string]: unknown;
}

/**
 * Запрос создания комментария к отзыву
 * Comment create request
 */
export interface CommentCreateRequest {
  /** Идентификатор отзыва */
  review_id: string;
  /** Текст комментария */
  text: string;
  /** 
   * Обновление статуса у отзыва:
   * - `true` — статус изменится на `Processed`.
   * - `false` — статус не изменится.
   */
  mark_review_as_processed?: boolean;
  /** Идентификатор родительского комментария, на который вы отвечаете */
  parent_comment_id?: string;
  readonly [key: string]: unknown;
}

/**
 * Запрос удаления комментария к отзыву
 * Comment delete request
 */
export interface CommentDeleteRequest {
  /** Идентификатор комментария */
  comment_id: string;
  readonly [key: string]: unknown;
}

/**
 * Направление сортировки комментариев
 * Comment sort direction
 */
export type CommentSort = 'ASC' | 'DESC';

/**
 * Запрос списка комментариев к отзыву
 * Comment list request
 */
export interface CommentListRequest {
  /** Идентификатор отзыва */
  review_id: string;
  /** 
   * Ограничение значений в ответе.
   * Минимум — 20. Максимум — 100.
   */
  limit: number;
  /** 
   * Количество элементов, которое будет пропущено с начала списка в ответе. 
   * Например, если `offset = 10`, то ответ начнётся с 11-го найденного элемента.
   */
  offset?: number;
  /** Направление сортировки */
  sort_dir?: CommentSort;
  readonly [key: string]: unknown;
}

/**
 * Запрос количества отзывов по статусам
 * Review count request
 */
export interface ReviewCountRequest {
  readonly [key: string]: unknown;
}

/**
 * Запрос информации об отзыве
 * Review info request
 */
export interface ReviewInfoRequest {
  /** Идентификатор отзыва */
  review_id: string;
  readonly [key: string]: unknown;
}

/**
 * Статус отзыва для фильтрации
 * Review status filter
 */
export type ReviewStatus = 'ALL' | 'UNPROCESSED' | 'PROCESSED';

/**
 * Направление сортировки отзывов
 * Review sort direction
 */
export type ReviewSortDirection = 'ASC' | 'DESC';

/**
 * Запрос списка отзывов
 * Review list request
 */
export interface ReviewListRequest {
  /** 
   * Количество отзывов в ответе. 
   * Минимум — 20, максимум — 100.
   */
  limit: number;
  /** Идентификатор последнего отзыва на странице */
  last_id?: string;
  /** 
   * Направление сортировки:
   * - `ASC` — по возрастанию,
   * - `DESC` — по убыванию.
   */
  sort_dir?: ReviewSortDirection;
  /** 
   * Статусы отзывов:
   * - `ALL` — все,
   * - `UNPROCESSED` — необработанные,
   * - `PROCESSED` — обработанные.
   */
  status?: ReviewStatus;
  readonly [key: string]: unknown;
}