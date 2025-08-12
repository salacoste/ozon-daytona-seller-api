/**
 * Special operations for PricesStocksAPI
 * 
 * Handles action timers and discount management features
 */

import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type {
  IV1ProductActionTimerUpdateRequest,
  IV1ProductActionTimerUpdateResponse,
  IV1ProductActionTimerStatusRequest,
  IV1ProductActionTimerStatusResponse,
  IV1GetProductInfoDiscountedRequest,
  IV1GetProductInfoDiscountedResponse,
  IV1ProductUpdateDiscountRequest,
  IV1ProductUpdateDiscountResponse,
} from '../../types/generated/prices&stocksapi';

/**
 * Special operations for action timers and discounts
 */
export class PricesStocksSpecialOps {
  constructor(private readonly httpClient: HttpClient) {}

  // ========== ACTION TIMER OPERATIONS ==========

  /**
   * Update minimum price action timer (v1)
   * 
   * Updates the relevance timer for minimum price actions on specified products.
   * This helps maintain pricing strategy effectiveness.
   * 
   * @param params - Request with product IDs to update
   * @returns Update confirmation
   * 
   * @example
   * ```typescript
   * await specialOps.updateActionTimer({
   *   product_ids: ["123456", "789012"]
   * });
   * ```
   */
  async updateActionTimer(
    params: IV1ProductActionTimerUpdateRequest
  ): Promise<IHttpResponse<IV1ProductActionTimerUpdateResponse>> {
    return this.httpClient.post('/v1/product/action/timer/update', params);
  }

  /**
   * Get action timer status (v1)
   * 
   * Returns the status of minimum price action timers for specified products.
   * Shows expiration time and whether minimum price consideration is enabled.
   * 
   * @param params - Request with product IDs to check
   * @returns Timer status information
   * 
   * @example
   * ```typescript
   * const status = await specialOps.getActionTimerStatus({
   *   product_ids: ["123456", "789012"]
   * });
   * 
   * for (const stat of status.data.statuses || []) {
   *   console.log(`Product ${stat.product_id}:`);
   *   console.log(`  Expires: ${stat.expired_at}`);
   *   console.log(`  Min price enabled: ${stat.min_price_for_auto_actions_enabled}`);
   * }
   * ```
   */
  async getActionTimerStatus(
    params: IV1ProductActionTimerStatusRequest
  ): Promise<IHttpResponse<IV1ProductActionTimerStatusResponse>> {
    return this.httpClient.post('/v1/product/action/timer/status', params);
  }

  // ========== DISCOUNT OPERATIONS ==========

  /**
   * Get discounted product information (v1)
   * 
   * Returns information about discounted products and their condition details.
   * Works only with FBO discounted products. Provides original product SKU
   * and detailed damage/condition information.
   * 
   * @param params - Request with discounted SKUs to lookup
   * @returns Discount and condition information
   * 
   * @example
   * ```typescript
   * const discountedInfo = await specialOps.getDiscountedInfo({
   *   discounted_skus: ["635548518", "789012345"]
   * });
   * 
   * for (const item of discountedInfo.data.items || []) {
   *   console.log(`Discounted SKU ${item.discounted_sku}:`);
   *   console.log(`  Original SKU: ${item.sku}`);
   *   console.log(`  Condition: ${item.condition_estimation}/7`);
   *   console.log(`  Reason: ${item.reason_damaged}`);
   * }
   * ```
   */
  async getDiscountedInfo(
    params: IV1GetProductInfoDiscountedRequest
  ): Promise<IHttpResponse<IV1GetProductInfoDiscountedResponse>> {
    return this.httpClient.post('/v1/product/info/discounted', params);
  }

  /**
   * Set discount on discounted product (v1)
   * 
   * Sets the discount percentage for discounted products sold via FBS scheme.
   * Discount must be between 3% and 99%.
   * 
   * @param params - Request with product ID and discount percentage
   * @returns Operation success confirmation
   * 
   * @example
   * ```typescript
   * const result = await specialOps.updateDiscount({
   *   product_id: 123456,
   *   discount: 25 // 25% discount
   * });
   * 
   * console.log('Discount updated:', result.data.result);
   * ```
   */
  async updateDiscount(
    params: IV1ProductUpdateDiscountRequest
  ): Promise<IHttpResponse<IV1ProductUpdateDiscountResponse>> {
    return this.httpClient.post('/v1/product/update/discount', params);
  }
}