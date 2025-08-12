/**
 * Promos API request types
 */

import type { 
  PromoProductPrice, 
  DiscountTaskStatus, 
  DiscountTaskApproval, 
  DiscountTaskDecline 
} from './base';

/**
 * Get promotional actions request
 * No parameters - returns all available promotions
 */
export interface GetPromoActionsRequest {
  // Empty - no parameters required
}

/**
 * Get promo candidates/participating products request
 */
export interface GetPromoProductsRequest {
  /** Promotional action identifier */
  action_id: number;
  /** Number of items per page (default: 100) */
  limit?: number;
  /** 
   * @deprecated Use last_id instead. Will be disabled May 5, 2025
   * Number of items to skip
   */
  offset?: number;
  /** 
   * Last ID from previous page for pagination.
   * Leave empty for first request.
   */
  last_id?: number;
}

/**
 * Activate products in promotion request
 */
export interface ActivatePromoProductsRequest {
  /** Promotional action identifier */
  action_id: number;
  /** List of products to add with pricing */
  products: PromoProductPrice[];
}

/**
 * Deactivate products from promotion request
 */
export interface DeactivatePromoProductsRequest {
  /** Promotional action identifier */
  action_id: number;
  /** List of product IDs to remove from promotion */
  product_ids: number[];
}

/**
 * Get discount tasks list request
 */
export interface GetDiscountTasksRequest {
  /** Filter by task status */
  status: DiscountTaskStatus;
  /** Page number (starts from 1) */
  page?: number;
  /** Maximum number of tasks per page */
  limit: number;
}

/**
 * Approve discount tasks request
 */
export interface ApproveDiscountTasksRequest {
  /** List of tasks to approve with details */
  tasks: DiscountTaskApproval[];
}

/**
 * Decline discount tasks request
 */
export interface DeclineDiscountTasksRequest {
  /** List of tasks to decline with reasons */
  tasks: DiscountTaskDecline[];
}