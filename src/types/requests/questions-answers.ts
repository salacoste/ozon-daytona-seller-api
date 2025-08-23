/**
 * Questions & Answers API request types
 * Generated from MCP documentation: questions-answers--chunk-001.md, questions-answers--chunk-002.md
 * Ready for manual editing and enhancements
 */

/**
 * Запрос создания ответа на вопрос
 * Question answer create request
 */
export interface QuestionAnswerCreateRequest {
  /** Идентификатор вопроса */
  question_id: string;
  /** Идентификатор товара в системе Ozon — SKU */
  sku: number;
  /** Текст ответа объёмом от 2 до 3000 символов */
  text: string;
  readonly [key: string]: unknown;
}

/**
 * Запрос удаления ответа на вопрос
 * Question answer delete request
 */
export interface QuestionAnswerDeleteRequest {
  /** Идентификатор ответа */
  answer_id: string;
  /** Идентификатор товара в системе Ozon — SKU */
  sku: number;
  readonly [key: string]: unknown;
}

/**
 * Запрос списка ответов на вопрос
 * Question answer list request
 */
export interface QuestionAnswerListRequest {
  /** Идентификатор вопроса */
  question_id: string;
  /** Идентификатор товара в системе Ozon — SKU */
  sku: number;
  /** 
   * Идентификатор последнего значения на странице.
   * Если запрос первый, оставьте поле пустым. 
   * Для следующих значений указывайте last_id из ответа предыдущего запроса.
   */
  last_id?: string;
  readonly [key: string]: unknown;
}

/**
 * Статус вопроса
 * Question status
 */
export type QuestionStatus = 'NEW' | 'VIEWED' | 'PROCESSED' | 'UNPROCESSED' | 'ALL';

/**
 * Запрос изменения статуса вопросов
 * Question change status request
 */
export interface QuestionChangeStatusRequest {
  /** Идентификаторы вопросов */
  question_ids: string[];
  /** 
   * Статусы вопросов:
   * - `NEW` — новые,
   * - `VIEWED` — просмотренные,
   * - `PROCESSED` — обработанные.
   */
  status: 'NEW' | 'VIEWED' | 'PROCESSED';
  readonly [key: string]: unknown;
}

/**
 * Запрос количества вопросов по статусам
 * Question count request
 */
export interface QuestionCountRequest {
  readonly [key: string]: unknown;
}

/**
 * Запрос информации о вопросе
 * Question info request
 */
export interface QuestionInfoRequest {
  /** Идентификатор вопроса */
  question_id: string;
  readonly [key: string]: unknown;
}

/**
 * Фильтр для списка вопросов
 * Question list filter
 */
export interface QuestionListFilter {
  /** Начало периода */
  date_from?: string;
  /** Конец периода */
  date_to?: string;
  /** 
   * Статусы вопроса:
   * - `NEW` — новый,
   * - `ALL` — все вопросы,
   * - `VIEWED` — просмотренный,
   * - `PROCESSED` — обработанный,
   * - `UNPROCESSED` — необработанный.
   */
  status?: QuestionStatus;
}

/**
 * Запрос списка вопросов
 * Question list request
 */
export interface QuestionListRequest {
  /** Фильтр для списка вопросов */
  filter?: QuestionListFilter;
  /** 
   * Идентификатор последнего значения на странице.
   * Оставьте это поле пустым при выполнении первого запроса.
   * Чтобы получить следующие значения, укажите last_id из ответа предыдущего запроса.
   */
  last_id?: string;
  readonly [key: string]: unknown;
}

/**
 * Запрос товаров с наибольшим количеством вопросов
 * Question top SKU request
 */
export interface QuestionTopSkuRequest {
  /** Количество значений в ответе: максимум — 100, минимум — 1 */
  limit: number;
  readonly [key: string]: unknown;
}