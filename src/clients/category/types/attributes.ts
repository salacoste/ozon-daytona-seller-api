/**
 * Category attributes types for CategoryAPI
 */

/**
 * Request for category attributes
 */
export interface GetAttributesRequest {
  /** Category ID */
  readonly description_category_id: number;
  /** Product type ID */
  readonly type_id: number;
  /** Language for attribute names */
  readonly language?: 'DEFAULT' | 'RU' | 'EN' | 'TR' | 'ZH_HANS';
}

/**
 * Category attribute definition
 */
export interface CategoryAttribute {
  /** Attribute ID */
  id: number;
  /** Complex attribute ID */
  attribute_complex_id: number;
  /** Attribute name */
  name: string;
  /** Attribute description */
  description: string;
  /** Attribute type */
  type: string;
  /** Whether this is a collection attribute */
  is_collection: boolean;
  /** Whether this attribute is required */
  is_required: boolean;
  /** Whether this attribute is an aspect */
  is_aspect: boolean;
  /** Maximum number of values allowed */
  max_value_count: number;
  /** Group name */
  group_name: string;
  /** Group ID */
  group_id: number;
  /** Dictionary ID (0 if no dictionary) */
  dictionary_id: number;
  /** Whether category dependent */
  category_dependent: boolean;
  /** Whether complex collection */
  complex_is_collection: boolean;
}

/**
 * Response for category attributes
 */
export interface GetAttributesResponse {
  result: CategoryAttribute[];
}
