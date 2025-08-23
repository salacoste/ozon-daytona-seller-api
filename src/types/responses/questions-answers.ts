/**
 * Questions & Answers API response types
 * Generated from MCP documentation: questions-answers--chunk-001.md, questions-answers--chunk-002.md
 * Ready for manual editing and enhancements
 */

import type { BaseResponse } from '../../core/types.js';

/**
 * Статус вопроса (полный список)
 * Question status (complete list)
 */
export type QuestionStatusEnum = 'NEW' | 'ALL' | 'VIEWED' | 'PROCESSED' | 'UNPROCESSED';

/**
 * Информация об ответе на вопрос
 * Question answer information
 */
export interface QuestionAnswerInfo {
  /** Идентификатор ответа */
  id: string;
  /** Идентификатор вопроса */
  question_id: string;
  /** Идентификатор товара в системе Ozon — SKU */
  sku: number;
  /** Текст ответа */
  text: string;
  /** Автор ответа */
  author_name: string;
  /** Дата публикации ответа */
  published_at: string;
}

/**
 * Информация о вопросе (краткая для списков)
 * Question list item information
 */
export interface QuestionListItem {
  /** Идентификатор вопроса */
  id: string;
  /** Идентификатор товара в системе Ozon — SKU */
  sku: number;
  /** Текст вопроса */
  text: string;
  /** Имя автора вопроса */
  author_name: string;
  /** Дата публикации вопроса */
  published_at: string;
  /** Статус вопроса */
  status: QuestionStatusEnum;
  /** Количество ответов на вопрос */
  answers_count: number;
  /** Ссылка на товар */
  product_url: string;
  /** Ссылка на вопрос */
  question_link: string;
}

/**
 * Подробная информация о вопросе
 * Detailed question information
 */
export interface QuestionDetailedInfo {
  /** Идентификатор вопроса */
  id: string;
  /** Идентификатор товара в системе Ozon — SKU */
  sku: number;
  /** Текст вопроса */
  text: string;
  /** Автор вопроса */
  author_name: string;
  /** Дата публикации вопроса */
  published_at: string;
  /** Статус вопроса */
  status: QuestionStatusEnum;
  /** Количество ответов на вопрос */
  answers_count: number;
  /** Ссылка на товар */
  product_url: string;
  /** Ссылка на вопрос */
  question_link: string;
}

/**
 * Ответ создания ответа на вопрос
 * Question answer create response
 */
export interface QuestionAnswerCreateResponse extends BaseResponse {
  /** Идентификатор ответа на вопрос */
  answer_id?: string;
  readonly [key: string]: unknown;
}

/**
 * Ответ удаления ответа на вопрос
 * Question answer delete response
 */
export interface QuestionAnswerDeleteResponse extends BaseResponse {
  /** Результат операции */
  result?: string;
  readonly [key: string]: unknown;
}

/**
 * Ответ списка ответов на вопрос
 * Question answer list response
 */
export interface QuestionAnswerListResponse extends BaseResponse {
  /** Ответы */
  answers?: QuestionAnswerInfo[];
  /** 
   * Идентификатор последнего значения на странице.
   * Чтобы получить следующие значения, передайте полученное значение в следующем запросе в параметре last_id.
   */
  last_id?: string;
  readonly [key: string]: unknown;
}

/**
 * Ответ изменения статуса вопросов
 * Question change status response
 */
export interface QuestionChangeStatusResponse extends BaseResponse {
  /** Результат операции */
  result?: string;
  readonly [key: string]: unknown;
}

/**
 * Ответ количества вопросов по статусам
 * Question count response
 */
export interface QuestionCountResponse extends BaseResponse {
  /** Всего вопросов */
  all?: number;
  /** Новые вопросы */
  new?: number;
  /** Обработанные вопросы */
  processed?: number;
  /** Необработанные вопросы */
  unprocessed?: number;
  /** Просмотренные вопросы */
  viewed?: number;
  readonly [key: string]: unknown;
}

/**
 * Ответ информации о вопросе
 * Question info response
 */
export interface QuestionInfoResponse extends BaseResponse, QuestionDetailedInfo {
  readonly [key: string]: unknown;
}

/**
 * Ответ списка вопросов
 * Question list response
 */
export interface QuestionListResponse extends BaseResponse {
  /** Вопросы */
  questions?: QuestionListItem[];
  /** 
   * Идентификатор последнего значения на странице.
   * Чтобы получить следующие значения, передайте полученное значение в следующем запросе в параметре last_id.
   */
  last_id?: string;
  readonly [key: string]: unknown;
}

/**
 * Ответ товаров с наибольшим количеством вопросов
 * Question top SKU response
 */
export interface QuestionTopSkuResponse extends BaseResponse {
  /** Список идентификаторов товаров в системе Ozon — SKU */
  sku?: string[];
  readonly [key: string]: unknown;
}