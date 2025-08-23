/**
 * Response types for SellerRating API
 * Seller performance rating
 * Ready for manual editing and enhancements
 */

/**
 * Статус рейтинга
 * Rating status
 */
export interface SellerRatingStatus {
  /** 
   * Превышено пороговое значение для блокировки
   * Danger threshold exceeded
   */
  danger?: boolean;
  
  /** 
   * Достигнуто пороговое значение для Premium
   * Premium threshold reached
   */
  premium?: boolean;
  
  /** 
   * Предупреждение о возможной блокировке
   * Warning about possible blocking
   */
  warning?: boolean;
  
  readonly [key: string]: unknown;
}

/**
 * Значение рейтинга за период
 * Rating value for period
 */
export interface SellerRatingValue {
  /** 
   * Дата начала подсчёта рейтинга
   * Rating calculation start date
   */
  date_from?: string;
  
  /** 
   * Дата конца подсчёта рейтинга
   * Rating calculation end date
   */
  date_to?: string;
  
  /** 
   * Значение рейтинга
   * Rating value
   */
  value?: number;
  
  /** 
   * Статус рейтинга
   * Rating status
   */
  status?: SellerRatingStatus;
  
  readonly [key: string]: unknown;
}

/**
 * Информация о рейтинге
 * Rating information
 */
export interface SellerRating {
  /** 
   * Системное название рейтинга
   * System rating name
   */
  rating?: string;
  
  /** 
   * Список значений рейтинга
   * Rating values list
   */
  values?: SellerRatingValue[];
  
  /** 
   * Пороговое значение для блокировки
   * Danger threshold value
   */
  danger_threshold?: number;
  
  /** 
   * Пороговое значение для Premium
   * Premium threshold value
   */
  premium_threshold?: number;
  
  /** 
   * Пороговое значение для предупреждения
   * Warning threshold value
   */
  warning_threshold?: number;
  
  readonly [key: string]: unknown;
}

/**
 * Штрафной балл Premium
 * Premium penalty score
 */
export interface SellerPremiumScore {
  /** 
   * Дата начисления штрафных баллов
   * Penalty score accrual date
   */
  date?: string;
  
  /** 
   * Значение рейтинга, за которое начислены баллы
   * Rating value that caused penalty
   */
  rating_value?: number;
  
  /** 
   * Количество начисленных штрафных баллов
   * Number of penalty points accrued
   */
  value?: number;
  
  readonly [key: string]: unknown;
}

/**
 * Информация о штрафных баллах Premium
 * Premium penalty scores information
 */
export interface SellerPremiumScores {
  /** 
   * Название рейтинга
   * Rating name
   */
  rating?: string;
  
  /** 
   * Информация о штрафных баллах
   * Penalty scores information
   */
  scores?: SellerPremiumScore[];
  
  readonly [key: string]: unknown;
}

/**
 * Ответ истории рейтингов продавца
 * Seller rating history response
 */
export interface SellerRatingHistoryResponse {
  /** 
   * Информация о рейтингах продавца
   * Seller ratings information
   */
  ratings?: SellerRating[];
  
  /** 
   * Информация о штрафных баллах Premium
   * Premium penalty scores information
   */
  premium_scores?: SellerPremiumScores[];
  
  readonly [key: string]: unknown;
}

/**
 * Изменение рейтинга
 * Rating change
 */
export interface SellerRatingChange {
  /** 
   * Направление изменения
   * Change direction
   */
  direction?: 'DIRECTION_UNKNOWN' | 'DIRECTION_NONE' | 'DIRECTION_RISE' | 'DIRECTION_FALL';
  
  /** 
   * Значение изменения
   * Change meaning
   */
  meaning?: 'MEANING_UNKNOWN' | 'MEANING_NONE' | 'MEANING_GOOD' | 'MEANING_BAD';
  
  readonly [key: string]: unknown;
}

/**
 * Элемент текущего рейтинга
 * Current rating item
 */
export interface SellerRatingItem {
  /** 
   * Системное название рейтинга
   * System rating name
   */
  rating?: string;
  
  /** 
   * Название рейтинга
   * Rating display name
   */
  name?: string;
  
  /** 
   * Текущее значение рейтинга
   * Current rating value
   */
  current_value?: number;
  
  /** 
   * Предыдущее значение рейтинга
   * Previous rating value
   */
  past_value?: number;
  
  /** 
   * Направление изменения рейтинга
   * Rating change direction
   */
  rating_direction?: 'UNKNOWN_DIRECTION' | 'NEUTRAL' | 'HIGHER_IS_BETTER' | 'LOWER_IS_BETTER';
  
  /** 
   * Статус рейтинга
   * Rating status
   */
  status?: 'UNKNOWN_STATUS' | 'OK' | 'WARNING' | 'CRITICAL';
  
  /** 
   * Тип значения
   * Value type
   */
  value_type?: 'UNKNOWN_VALUE' | 'INDEX' | 'PERCENT' | 'TIME' | 'RATIO' | 'REVIEW_SCORE' | 'COUNT';
  
  /** 
   * Изменение рейтинга
   * Rating change
   */
  change?: SellerRatingChange;
  
  readonly [key: string]: unknown;
}

/**
 * Группа рейтингов
 * Rating group
 */
export interface SellerRatingGroup {
  /** 
   * Название группы рейтингов
   * Rating group name
   */
  group_name?: string;
  
  /** 
   * Список рейтингов в группе
   * Ratings list in group
   */
  items?: SellerRatingItem[];
  
  readonly [key: string]: unknown;
}

/**
 * Индекс локализации
 * Localization index
 */
export interface SellerLocalizationIndex {
  /** 
   * Дата расчёта индекса локализации
   * Localization index calculation date
   */
  calculation_date?: string;
  
  /** 
   * Значение индекса локализации
   * Localization index value
   */
  localization_percentage?: number;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ текущих рейтингов продавца
 * Current seller ratings response
 */
export interface SellerRatingSummaryResponse {
  /** 
   * Список групп рейтингов
   * Rating groups list
   */
  groups?: SellerRatingGroup[];
  
  /** 
   * Данные по индексу локализации
   * Localization index data
   */
  localization_index?: SellerLocalizationIndex[];
  
  /** 
   * Превышен баланс штрафных баллов
   * Penalty score balance exceeded
   */
  penalty_score_exceeded?: boolean;
  
  /** 
   * Наличие подписки Premium
   * Premium subscription presence
   */
  premium?: boolean;
  
  /** 
   * Наличие подписки Premium Plus
   * Premium Plus subscription presence
   */
  premium_plus?: boolean;
  
  readonly [key: string]: unknown;
}