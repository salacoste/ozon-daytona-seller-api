/**
 * PromosAPI client for Ozon Seller API
 * 
 * Implements promotional campaigns and discount management from /methods/11-promos.json:
 * - List available promotional actions
 * - Manage product participation in promotions
 * - Handle customer discount requests
 * - Process approval/decline workflows for discount tasks
 * 
 * Handles Ozon promotional system for increasing sales through discounts and campaigns.
 */

import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type {
  // Request types
  GetPromoActionsRequest,
  GetPromoProductsRequest,
  ActivatePromoProductsRequest,
  DeactivatePromoProductsRequest,
  GetDiscountTasksRequest,
  ApproveDiscountTasksRequest,
  DeclineDiscountTasksRequest,
  
  // Response types
  GetPromoActionsResponse,
  GetPromoProductsResponse,
  ActivatePromoProductsResponse,
  DeactivatePromoProductsResponse,
  GetDiscountTasksResponse,
  ApproveDiscountTasksResponse,
  DeclineDiscountTasksResponse,
  
  // Base types
  PromoAction,
  PromoProduct,
  PromoProductPrice,
  DiscountTask,
  DiscountTaskStatus
} from './types';

/**
 * PromosAPI client for managing promotional campaigns and discounts
 * 
 * Provides comprehensive promotion management including campaign participation,
 * product enrollment, pricing optimization, and customer discount request handling.
 * 
 * **Key Features:**
 * - **Campaign Management**: Discover and join promotional campaigns
 * - **Product Participation**: Add/remove products from promotions with pricing
 * - **Discount Requests**: Handle customer requests for product discounts
 * - **Automated Workflows**: Batch operations and approval processes
 * 
 * @example
 * ```typescript
 * // Get available promotions
 * const actions = await client.promos.getPromoActions();
 * 
 * console.log(`Found ${actions.data.result?.length} available promotions`);
 * 
 * // Join a promotion with products
 * const activePromo = actions.data.result?.find(p => p.is_participating);
 * if (activePromo) {
 *   const candidates = await client.promos.getPromoCandidates({
 *     action_id: activePromo.id!,
 *     limit: 50
 *   });
 *   
 *   // Add products to promotion
 *   const productsToAdd = candidates.data.result?.products
 *     ?.slice(0, 10)
 *     .map(p => ({
 *       product_id: p.id!,
 *       action_price: p.price! * 0.85, // 15% discount
 *       stock: 100
 *     }));
 *   
 *   if (productsToAdd?.length) {
 *     await client.promos.activatePromoProducts({
 *       action_id: activePromo.id!,
 *       products: productsToAdd
 *     });
 *   }
 * }
 * ```
 */
export class PromosAPI {
  constructor(private readonly httpClient: HttpClient) {}

  // ============================================================================
  // Promotional Actions Management
  // ============================================================================

  /**
   * Get available promotional actions
   * 
   * Retrieves list of all promotional campaigns you can participate in.
   * Shows active, upcoming, and past promotions with participation status.
   * 
   * @param params - Empty request object
   * @returns List of promotional actions
   * 
   * @example
   * ```typescript
   * const result = await client.promos.getPromoActions();
   * 
   * console.log('=== AVAILABLE PROMOTIONS ===');
   * 
   * result.data.result?.forEach(action => {
   *   const status = action.is_participating ? '✅ Participating' : '⏳ Available';
   *   const type = action.is_voucher_action ? '🎫 Voucher' : '💰 Direct';
   *   
   *   console.log(`\n${action.title} (${type})`);
   *   console.log(`  Status: ${status}`);
   *   console.log(`  Period: ${action.date_start} to ${action.date_end}`);
   *   console.log(`  Products: ${action.participating_products_count}/${action.potential_products_count}`);
   *   
   *   if (action.freeze_date) {
   *     console.log(`  🔒 Freeze date: ${action.freeze_date}`);
   *   }
   *   
   *   if (action.discount_value) {
   *     console.log(`  💸 Discount: ${action.discount_value}${action.discount_type === 'PERCENT' ? '%' : ' RUB'}`);
   *   }
   * });
   * ```
   */
  async getPromoActions(
    params: GetPromoActionsRequest = {}
  ): Promise<IHttpResponse<GetPromoActionsResponse>> {
    return this.httpClient.get('/v1/actions');
  }

  /**
   * Get products available for promotion
   * 
   * Lists products that can participate in a specific promotional campaign.
   * Shows pricing constraints and availability information.
   * 
   * @param params - Action and pagination parameters
   * @returns List of candidate products
   */
  async getPromoCandidates(
    params: GetPromoProductsRequest
  ): Promise<IHttpResponse<GetPromoProductsResponse>> {
    return this.httpClient.post('/v1/actions/candidates', params);
  }

  /**
   * Get products participating in promotion
   * 
   * Lists products currently enrolled in a promotional campaign.
   * Shows current promotional pricing and performance.
   * 
   * @param params - Action and pagination parameters
   * @returns List of participating products
   */
  async getPromoProducts(
    params: GetPromoProductsRequest
  ): Promise<IHttpResponse<GetPromoProductsResponse>> {
    return this.httpClient.post('/v1/actions/products', params);
  }

  // ============================================================================
  // Product Participation Management
  // ============================================================================

  /**
   * Add products to promotion
   * 
   * Enrolls products in a promotional campaign with specified pricing.
   * Validates pricing constraints and stock requirements.
   * 
   * @param params - Action ID and products with pricing
   * @returns Operation result with successful and rejected products
   */
  async activatePromoProducts(
    params: ActivatePromoProductsRequest
  ): Promise<IHttpResponse<ActivatePromoProductsResponse>> {
    return this.httpClient.post('/v1/actions/products/activate', params);
  }

  /**
   * Remove products from promotion
   * 
   * Withdraws products from a promotional campaign.
   * Products return to regular pricing after removal.
   * 
   * @param params - Action ID and product IDs to remove
   * @returns Operation result with successful and rejected removals
   */
  async deactivatePromoProducts(
    params: DeactivatePromoProductsRequest
  ): Promise<IHttpResponse<DeactivatePromoProductsResponse>> {
    return this.httpClient.post('/v1/actions/products/deactivate', params);
  }

  // ============================================================================
  // Customer Discount Requests
  // ============================================================================

  /**
   * Get customer discount requests
   * 
   * Retrieves list of discount requests from customers.
   * Filter by status to focus on actionable items.
   * 
   * @param params - Status filter and pagination
   * @returns List of discount tasks
   */
  async getDiscountTasks(
    params: GetDiscountTasksRequest
  ): Promise<IHttpResponse<GetDiscountTasksResponse>> {
    return this.httpClient.post('/v1/actions/discounts-task/list', params);
  }

  /**
   * Approve customer discount requests
   * 
   * Approves discount requests with specified terms.
   * Can approve partially with different pricing/quantities.
   * 
   * @param params - Tasks to approve with terms
   * @returns Operation result with success/failure counts
   */
  async approveDiscountTasks(
    params: ApproveDiscountTasksRequest
  ): Promise<IHttpResponse<ApproveDiscountTasksResponse>> {
    return this.httpClient.post('/v1/actions/discounts-task/approve', params);
  }

  /**
   * Decline customer discount requests
   * 
   * Declines discount requests with optional comments.
   * Provides feedback to customers about decline reasons.
   * 
   * @param params - Tasks to decline with reasons
   * @returns Operation result with success/failure counts
   */
  async declineDiscountTasks(
    params: DeclineDiscountTasksRequest
  ): Promise<IHttpResponse<DeclineDiscountTasksResponse>> {
    return this.httpClient.post('/v1/actions/discounts-task/decline', params);
  }

  // ============================================================================
  // Pagination Helpers
  // ============================================================================

  /**
   * Iterate through promo candidates with automatic pagination
   * 
   * @param params - Request parameters without pagination
   * @returns Async generator yielding pages of products
   */
  async *iteratePromoCandidates(
    params: Omit<GetPromoProductsRequest, 'last_id' | 'offset'>
  ): AsyncGenerator<PromoProduct[], void, unknown> {
    let lastId: number | undefined;
    let hasNext = true;
    
    while (hasNext) {
      const response = await this.getPromoCandidates({
        ...params,
        ...(lastId && { last_id: lastId })
      });
      
      const products = response.data.result?.products || [];
      if (products.length === 0) {
        hasNext = false;
      } else {
        yield products;
        lastId = (response.data.result as any)?.next_offset;
        hasNext = !!lastId;
      }
    }
  }

  /**
   * Iterate through participating promo products with automatic pagination
   * 
   * @param params - Request parameters without pagination
   * @returns Async generator yielding pages of products
   */
  async *iteratePromoProducts(
    params: Omit<GetPromoProductsRequest, 'last_id' | 'offset'>
  ): AsyncGenerator<PromoProduct[], void, unknown> {
    let lastId: number | undefined;
    let hasNext = true;
    
    while (hasNext) {
      const response = await this.getPromoProducts({
        ...params,
        ...(lastId && { last_id: lastId })
      });
      
      const products = response.data.result?.products || [];
      if (products.length === 0) {
        hasNext = false;
      } else {
        yield products;
        lastId = (response.data.result as any)?.next_offset;
        hasNext = !!lastId;
      }
    }
  }

  /**
   * Iterate through discount tasks with automatic pagination
   * 
   * @param params - Request parameters without page number
   * @returns Async generator yielding pages of tasks
   */
  async *iterateDiscountTasks(
    params: Omit<GetDiscountTasksRequest, 'page'>
  ): AsyncGenerator<DiscountTask[], void, unknown> {
    let page = 1;
    let hasNext = true;
    
    while (hasNext) {
      const response = await this.getDiscountTasks({
        ...params,
        page
      });
      
      const tasks = response.data.result || [];
      if (tasks.length === 0) {
        hasNext = false;
      } else {
        yield tasks;
        hasNext = tasks.length === (params.limit || 100);
        page++;
      }
    }
  }
}

// Re-export types for convenience
export type * from './types';