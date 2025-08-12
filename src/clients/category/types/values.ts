/**
 * Attribute values types for CategoryAPI
 */

/**
 * Request for attribute values
 */
export interface GetAttributeValuesRequest {
  /** Attribute ID */
  readonly attribute_id: number;
  /** Category ID */
  readonly description_category_id: number;
  /** Product type ID */
  readonly type_id: number;
  /** Language for values */
  readonly language?: 'DEFAULT' | 'RU' | 'EN' | 'TR' | 'ZH_HANS';
  /** Last value ID for pagination */
  readonly last_value_id?: number;
  /** Number of values to return (required, max 2000, min 1) */
  readonly limit: number;
}

/**
 * Attribute value definition
 */
export interface AttributeValue {
  /** Value ID */
  id: number;
  /** Value name/text */
  value: string;
  /** Information about the value */
  info?: string;
  /** Picture URL if any */
  picture?: string;
}

/**
 * Response for attribute values
 */
export interface GetAttributeValuesResponse {
  result: AttributeValue[];
  /** Whether there are more values available */
  has_next?: boolean;
}

/**
 * Request for searching attribute values
 */
export interface SearchAttributeValuesRequest {
  /** Attribute ID */
  readonly attribute_id: number;
  /** Category ID */
  readonly description_category_id: number;
  /** Product type ID */
  readonly type_id: number;
  /** Search value/term (minimum 2 characters) */
  readonly value: string;
  /** Language for search results */
  readonly language?: 'DEFAULT' | 'RU' | 'EN' | 'TR' | 'ZH_HANS';
  /** Number of results to return (required, max 100, min 1) */
  readonly limit: number;
}

/**
 * Response for searching attribute values
 */
export interface SearchAttributeValuesResponse {
  result: AttributeValue[];
}
