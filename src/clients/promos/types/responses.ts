/**
 * Promos API response types
 */

import type { 
  PromoAction, 
  PromoProduct, 
  RejectedProduct, 
  DiscountTask, 
  FailedTaskDetail 
} from './base';

/**
 * Get promotional actions response
 */
export interface GetPromoActionsResponse {
  /** List of available promotional actions */
  result?: PromoAction[];
}

/**
 * Promo products result container
 */
export interface PromoProductsResult {
  /** List of products */
  products?: PromoProduct[];
  /** Total number of products available */
  total?: number;
  /** Last ID for pagination */
  last_id?: number;
}

/**
 * Get promo products response (candidates or participating)
 */
export interface GetPromoProductsResponse {
  /** Products result */
  result?: PromoProductsResult;
}

/**
 * Product operation result
 */
export interface PromoProductOperationResult {
  /** Successfully processed product IDs */
  product_ids?: number[];
  /** Products that failed to process */
  rejected?: RejectedProduct[];
}

/**
 * Activate products response
 */
export interface ActivatePromoProductsResponse {
  /** Operation result */
  result?: PromoProductOperationResult;
}

/**
 * Deactivate products response
 */
export interface DeactivatePromoProductsResponse {
  /** Operation result */
  result?: PromoProductOperationResult;
}

/**
 * Get discount tasks response
 */
export interface GetDiscountTasksResponse {
  /** List of discount tasks */
  result?: DiscountTask[];
}

/**
 * Task operation result
 */
export interface TaskOperationResult {
  /** Number of successfully processed tasks */
  success_count?: number;
  /** Number of failed tasks */
  fail_count?: number;
  /** Details about failed tasks */
  fail_details?: FailedTaskDetail[];
}

/**
 * Approve discount tasks response
 */
export interface ApproveDiscountTasksResponse {
  /** Operation result */
  result?: TaskOperationResult;
}

/**
 * Decline discount tasks response
 */
export interface DeclineDiscountTasksResponse {
  /** Operation result */
  result?: TaskOperationResult;
}