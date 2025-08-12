/**
 * ReviewAPI types for managing product reviews and comments
 * 
 * Beta API - Available only for Premium Plus sellers
 * Handles customer review interactions and seller responses
 */

// Base types
export interface Review {
  review_id: string;
  product_id: number;
  order_id?: string;
  customer_id?: string;
  rating: number;
  text?: string;
  photos?: ReviewPhoto[];
  created_at: string;
  updated_at?: string;
  status: ReviewStatus;
  plus_comment?: string;
  minus_comment?: string;
  can_be_processed: boolean;
  processed: boolean;
}

export interface ReviewPhoto {
  photo_id: string;
  url: string;
  thumbnail_url?: string;
}

export interface Comment {
  comment_id: string;
  review_id: string;
  text: string;
  created_at: string;
  updated_at?: string;
  author: CommentAuthor;
}

export interface CommentAuthor {
  type: 'SELLER' | 'CUSTOMER';
  name?: string;
}

export type ReviewStatus = 'NEW' | 'PROCESSED' | 'REQUIRES_ATTENTION';
export type CommentSort = 'ASC' | 'DESC';

// Request types
export interface CommentCreateRequest {
  review_id: string;
  text: string;
  mark_review_as_processed?: boolean;
}

export interface CommentDeleteRequest {
  comment_id: string;
}

export interface CommentListRequest {
  review_id: string;
  limit?: number;
  offset?: number;
  sort?: CommentSort;
}

export interface ReviewChangeStatusRequest {
  review_ids: string[];
  status: ReviewStatus;
}

export interface ReviewCountRequest {
  // Empty request - gets counts for all statuses
}

export interface ReviewInfoRequest {
  review_id: string;
}

export interface ReviewListRequest {
  limit?: number;
  offset?: number;
  filter?: ReviewListFilter;
  sort?: ReviewSort;
}

export interface ReviewListFilter {
  product_ids?: number[];
  rating?: number[];
  status?: ReviewStatus[];
  has_photos?: boolean;
  has_comments?: boolean;
  date_from?: string;
  date_to?: string;
}

export interface ReviewSort {
  field: 'created_at' | 'rating' | 'updated_at';
  direction: 'ASC' | 'DESC';
}

// Response types
export interface CommentCreateResponse {
  comment_id: string;
  success: boolean;
}

export interface CommentDeleteResponse {
  success: boolean;
}

export interface CommentListResponse {
  comments: Comment[];
  total: number;
  has_next: boolean;
}

export interface ReviewChangeStatusResponse {
  updated_count: number;
  errors?: ReviewStatusError[];
}

export interface ReviewStatusError {
  review_id: string;
  error: string;
}

export interface ReviewCountResponse {
  processed: number;
  new: number;
  requires_attention: number;
  total: number;
}

export interface ReviewInfoResponse {
  review: Review;
  comments_amount: number;
}

export interface ReviewListResponse {
  reviews: Review[];
  total: number;
  has_next: boolean;
  last_id?: string;
}

// Utility types for analytics
export interface ReviewAnalytics {
  total_reviews: number;
  average_rating: number;
  rating_distribution: Record<number, number>;
  response_rate: number;
  processing_stats: {
    processed: number;
    pending: number;
    requires_attention: number;
  };
}