/**
 * Review API response types
 * Generated from MCP documentation: reviewapi--chunk-001.md, reviewapi--chunk-002.md
 * Ready for manual editing and enhancements
 */

import type { BaseResponse } from "../../core/types.js";

/**
 * Информация об изображении в отзыве
 * Review photo information
 */
export interface ReviewPhoto {
  /** Ссылка на изображение */
  url: string;
  /** Ширина */
  width: number;
  /** Высота */
  height: number;
}

/**
 * Информация о видео в отзыве
 * Review video information
 */
export interface ReviewVideo {
  /** Ссылка на видео */
  url: string;
  /** Ссылка на превью видео */
  preview_url: string;
  /** Ссылка на короткое видео */
  short_video_preview_url: string;
  /** Ширина */
  width: number;
  /** Высота */
  height: number;
}

/**
 * Статус заказа в отзыве
 * Order status in review
 */
export type ReviewOrderStatus = "DELIVERED" | "CANCELLED";

/**
 * Статус отзыва
 * Review status
 */
export type ReviewProcessingStatus = "UNPROCESSED" | "PROCESSED";

/**
 * Информация о комментарии к отзыву
 * Review comment information
 */
export interface ReviewComment {
  /** Идентификатор комментария */
  id: string;
  /** Текст комментария */
  text: string;
  /** Дата публикации комментария */
  published_at: string;
  /** `true`, если комментарий оставило официальное лицо, `false` — покупатель */
  is_official: boolean;
  /** `true`, если комментарий оставил продавец, `false` — покупатель */
  is_owner: boolean;
  /** Идентификатор родительского комментария, на который нужно ответить */
  parent_comment_id?: string;
}

/**
 * Краткая информация об отзыве для списка
 * Review list item information
 */
export interface ReviewListItem {
  /** Идентификатор отзыва */
  id: string;
  /** Идентификатор товара в системе Ozon — SKU */
  sku: number;
  /** Текст отзыва */
  text: string;
  /** Оценка отзыва */
  rating: number;
  /** Дата публикации отзыва */
  published_at: string;
  /** Статус отзыва */
  status: ReviewProcessingStatus;
  /** Статус заказа, на который покупатель оставил отзыв */
  order_status: ReviewOrderStatus;
  /** `true`, если отзыв участвует в подсчёте рейтинга */
  is_rating_participant: boolean;
  /** Количество комментариев у отзыва */
  comments_amount: number;
  /** Количество изображений у отзыва */
  photos_amount: number;
  /** Количество видео у отзыва */
  videos_amount: number;
}

/**
 * Подробная информация об отзыве
 * Detailed review information
 */
export interface ReviewInfo {
  /** Идентификатор отзыва */
  id: string;
  /** Идентификатор товара в системе Ozon — SKU */
  sku: number;
  /** Текст отзыва */
  text: string;
  /** Оценка отзыва */
  rating: number;
  /** Дата публикации отзыва */
  published_at: string;
  /** Статус отзыва */
  status: ReviewProcessingStatus;
  /** Статус заказа, на который покупатель оставил отзыв */
  order_status: ReviewOrderStatus;
  /** `true`, если отзыв участвует в подсчёте рейтинга */
  is_rating_participant: boolean;
  /** Количество комментариев к отзыву */
  comments_amount: number;
  /** Количество лайков на отзыве */
  likes_amount: number;
  /** Количество дизлайков на отзыве */
  dislikes_amount: number;
  /** Количество изображений у отзыва */
  photos_amount: number;
  /** Количество видео у отзыва */
  videos_amount: number;
  /** Информация об изображениях */
  photos: ReviewPhoto[];
  /** Информация о видео */
  videos: ReviewVideo[];
}

/**
 * Ответ изменения статуса отзывов
 * Review change status response
 */
export interface ReviewChangeStatusResponse extends BaseResponse {
  /** Результат операции */
  result?: "ok";
  readonly [key: string]: unknown;
}

/**
 * Ответ создания комментария к отзыву
 * Comment create response
 */
export interface CommentCreateResponse extends BaseResponse {
  /** Идентификатор комментария */
  comment_id?: string;
  readonly [key: string]: unknown;
}

/**
 * Ответ удаления комментария к отзыву
 * Comment delete response
 */
export interface CommentDeleteResponse extends BaseResponse {
  /** Результат операции */
  result?: "ok";
  readonly [key: string]: unknown;
}

/**
 * Ответ списка комментариев к отзыву
 * Comment list response
 */
export interface CommentListResponse extends BaseResponse {
  /** Информация о комментариях */
  comments?: ReviewComment[];
  /** Количество элементов в выдаче */
  offset?: number;
  readonly [key: string]: unknown;
}

/**
 * Ответ количества отзывов по статусам
 * Review count response
 */
export interface ReviewCountResponse extends BaseResponse {
  /** Количество всех отзывов */
  total?: number;
  /** Количество обработанных отзывов */
  processed?: number;
  /** Количество необработанных отзывов */
  unprocessed?: number;
  readonly [key: string]: unknown;
}

/**
 * Ответ информации об отзыве
 * Review info response
 */
export interface ReviewInfoResponse extends BaseResponse, ReviewInfo {
  readonly [key: string]: unknown;
}

/**
 * Ответ списка отзывов
 * Review list response
 */
export interface ReviewListResponse extends BaseResponse {
  /** Информация об отзывах */
  reviews?: ReviewListItem[];
  /** `true`, если в ответе вернули не все отзывы */
  has_next?: boolean;
  /** Идентификатор последнего отзыва на странице */
  last_id?: string;
  readonly [key: string]: unknown;
}
