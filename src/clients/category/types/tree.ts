/**
 * Category tree types for CategoryAPI
 */

/**
 * Request for category tree
 */
export interface GetTreeRequest {
  /** Language for category names */
  readonly language?: 'DEFAULT' | 'RU' | 'EN' | 'TR' | 'ZH_HANS';
}

/**
 * Category or type item in the tree structure
 */
export interface CategoryTreeItem {
  /** Category ID */
  description_category_id?: number;
  /** Category name */
  category_name?: string;
  /** Type ID (for leaf nodes) */
  type_id?: number;
  /** Type name (for leaf nodes) */
  type_name?: string;
  /** Whether this category/type is disabled */
  disabled: boolean;
  /** Child categories/types */
  children: CategoryTreeItem[];
}

/**
 * Response for category tree
 */
export interface GetTreeResponse {
  result: CategoryTreeItem[];
}
