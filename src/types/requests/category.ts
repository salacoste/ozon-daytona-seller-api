/**
 * Request types for CategoryAPI
 * Product category tree management
 * Ready for manual editing and enhancements
 */

/**
 * Язык ответа
 * Response language
 */
export type CategoryLanguage = 
  | 'DEFAULT'
  | 'RU'
  | 'EN'
  | 'TR'
  | 'ZH_HANS';

/**
 * Запрос дерева категорий
 * Category tree request
 */
export interface CategoryGetTreeRequest {
  /** 
   * Язык в ответе (по умолчанию русский)
   * Response language (Russian by default)
   */
  language?: CategoryLanguage;
  
  readonly [key: string]: unknown;
}

/**
 * Запрос характеристик категории
 * Category attributes request
 */
export interface CategoryGetAttributesRequest {
  /** 
   * Идентификатор категории
   * Category identifier
   */
  description_category_id: number;
  
  /** 
   * Идентификатор типа товара
   * Product type identifier
   */
  type_id: number;
  
  /** 
   * Язык в ответе (по умолчанию русский)
   * Response language (Russian by default)
   */
  language?: CategoryLanguage;
  
  readonly [key: string]: unknown;
}

/**
 * Запрос значений характеристики
 * Attribute values request
 */
export interface CategoryGetAttributeValuesRequest {
  /** 
   * Идентификатор характеристики
   * Attribute identifier
   */
  attribute_id: number;
  
  /** 
   * Идентификатор категории
   * Category identifier
   */
  description_category_id: number;
  
  /** 
   * Идентификатор типа товара
   * Product type identifier
   */
  type_id: number;
  
  /** 
   * Количество значений в ответе (1-2000)
   * Number of values in response (1-2000)
   */
  limit: number;
  
  /** 
   * Язык в ответе (по умолчанию русский)
   * Response language (Russian by default)
   */
  language?: CategoryLanguage;
  
  /** 
   * Идентификатор для пагинации
   * Pagination identifier
   */
  last_value_id?: number;
  
  readonly [key: string]: unknown;
}

/**
 * Запрос поиска значений характеристики
 * Search attribute values request
 */
export interface CategorySearchAttributeValuesRequest {
  /** 
   * Идентификатор характеристики
   * Attribute identifier
   */
  attribute_id: number;
  
  /** 
   * Идентификатор категории
   * Category identifier
   */
  description_category_id: number;
  
  /** 
   * Идентификатор типа товара
   * Product type identifier
   */
  type_id: number;
  
  /** 
   * Значение для поиска (минимум 2 символа)
   * Search value (minimum 2 characters)
   */
  value: string;
  
  /** 
   * Количество значений в ответе (1-100)
   * Number of values in response (1-100)
   */
  limit: number;
  
  readonly [key: string]: unknown;
}