/**
 * Questions&Answers API types for customer Q&A management
 * 
 * Beta API - Customer question and answer management system
 * Handles question listing, answering, status management, and analytics
 */

// Base types
export interface Question {
  question_id: string;
  sku: number;
  text: string;
  status: QuestionStatus;
  created_at: string;
  updated_at?: string;
  author: string;
  is_answered: boolean;
  answers_count: number;
}

export interface Answer {
  answer_id: string;
  question_id: string;
  sku: number;
  text: string;
  created_at: string;
  updated_at?: string;
  author: string;
  is_seller_answer: boolean;
}

export interface QuestionCount {
  status: QuestionStatus;
  count: number;
}

export interface TopSkuQuestion {
  sku: number;
  questions_count: number;
  product_name?: string;
  offer_id?: string;
}

// Enums
export type QuestionStatus = 'NEW' | 'ANSWERED' | 'CLOSED' | 'ARCHIVED' | 'PENDING_MODERATION';
export type SortOrder = 'ASC' | 'DESC';
export type SortBy = 'created_at' | 'updated_at' | 'questions_count';

// Request types
export interface QuestionAnswerCreateRequest {
  question_id: string;
  sku: number;
  text: string;
}

export interface QuestionAnswerDeleteRequest {
  answer_id: string;
  sku: number;
}

export interface QuestionAnswerListRequest {
  question_id: string;
  sku: number;
  last_id?: string;
  limit?: number;
}

export interface QuestionChangeStatusRequest {
  question_id: string[];
  sku: number;
  status: QuestionStatus;
}

export interface QuestionCountRequest {
  sku?: number[];
  date_from?: string;
  date_to?: string;
}

export interface QuestionInfoRequest {
  question_id: string;
  sku: number;
}

export interface QuestionListRequest {
  sku?: number[];
  status?: QuestionStatus[];
  date_from?: string;
  date_to?: string;
  limit?: number;
  last_id?: string;
  sort_by?: SortBy;
  sort_order?: SortOrder;
}

export interface QuestionTopSkuRequest {
  limit: number;
  date_from?: string;
  date_to?: string;
  min_questions_count?: number;
}

// Response types
export interface QuestionAnswerCreateResponse {
  answer_id: string;
}

export interface QuestionAnswerDeleteResponse {
  success: boolean;
}

export interface QuestionAnswerListResponse {
  answers: Answer[];
  last_id?: string;
  has_next: boolean;
  total_count: number;
}

export interface QuestionChangeStatusResponse {
  updated_count: number;
  failed_questions: {
    question_id: string;
    error: string;
  }[];
}

export interface QuestionCountResponse {
  counts: QuestionCount[];
  total_questions: number;
}

export interface QuestionInfoResponse {
  question: Question;
  answers: Answer[];
}

export interface QuestionListResponse {
  questions: Question[];
  last_id?: string;
  has_next: boolean;
  total_count: number;
}

export interface QuestionTopSkuResponse {
  sku: TopSkuQuestion[];
  total_analyzed_products: number;
}

// Analytics types
export interface QuestionsAnalytics {
  question_metrics: {
    total_questions: number;
    new_questions: number;
    answered_questions: number;
    pending_questions: number;
    answer_rate_percent: number;
  };
  response_performance: {
    average_response_time_hours: number;
    questions_answered_today: number;
    questions_answered_week: number;
    fastest_response_time_hours: number;
    slowest_response_time_hours: number;
  };
  product_insights: {
    most_questioned_products: TopSkuQuestion[];
    products_needing_attention: TopSkuQuestion[];
    categories_with_most_questions: string[];
  };
  engagement_metrics: {
    questions_per_product_avg: number;
    repeat_customers_asking: number;
    question_quality_score: number;
  };
}

export interface QuestionInsight {
  sku: number;
  question_id: string;
  insight_type: 'frequent_concern' | 'product_issue' | 'information_gap' | 'positive_feedback';
  description: string;
  suggested_action: string;
  priority: 'high' | 'medium' | 'low';
  estimated_impact: string;
}