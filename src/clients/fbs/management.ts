/**
 * FBS Posting Management operations - Part 3 endpoints (14-22)
 * 
 * Handles posting lifecycle and cancellation operations:
 * - Cancellation reasons and order cancellation
 * - Order state transitions and arbitration
 * - Pickup code verification
 * - Electronic transport documents (ETGB)
 * - Unpaid legal products management
 */

import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type {
  IPostingCancelReasonRequest,
  IPostingCancelReasonResponse,
  IPostingCancelReasonListResponse,
  IPostingPostingProductCancelRequest,
  IPostingPostingProductCancelResponse,
  IPostingCancelFbsPostingRequest,
  IPostingMovePostingRequest,
  IV2MovePostingToAwaitingDeliveryRequest,
  IV1PostingFBSPickupCodeVerifyRequest,
  IV1PostingFBSPickupCodeVerifyResponse,
  IV1GetEtgbRequest,
  IV1GetEtgbResponse,
  IV1PostingUnpaidLegalProductListRequest,
  IV1PostingUnpaidLegalProductListResponse,
} from '../../types/generated/fbs';

/**
 * FBS Posting Management operations class
 */
export class FBSManagement {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Get cancellation reason by ID (endpoint 14)
   * @param params - Request parameters with cancellation reason ID
   * @example const reason = await client.fbs.getCancelReasonById({ cancel_reason_id: 12345 });
   */
  async getCancelReasonById(
    params: IPostingCancelReasonRequest
  ): Promise<IHttpResponse<IPostingCancelReasonResponse>> {
    return this.httpClient.post('/v1/posting/fbs/cancel-reason', params);
  }

  /**
   * Get list of available cancellation reasons (endpoint 15)
   * @returns Available cancellation reasons list
   * @example const reasons = await client.fbs.getCancelReasonsList();
   */
  async getCancelReasonsList(): Promise<IHttpResponse<IPostingCancelReasonListResponse>> {
    return this.httpClient.post('/v2/posting/fbs/cancel-reason/list', {});
  }

  /**
   * Cancel FBS posting products (endpoint 16)
   * @param params - Request parameters with posting number and products to cancel
   * @example const result = await client.fbs.cancelPostingProducts({ posting_number: 'POST-123456', products: [...] });
   */
  async cancelPostingProducts(
    params: IPostingPostingProductCancelRequest
  ): Promise<IHttpResponse<IPostingPostingProductCancelResponse>> {
    return this.httpClient.post('/v2/posting/fbs/product/cancel', params);
  }

  /**
   * Cancel FBS posting completely (endpoint 17)
   * @param params - Request parameters with posting number and cancellation reason
   * @example const result = await client.fbs.cancelPosting({ cancel_reason_id: 400, posting_number: 'POST-123456' });
   */
  async cancelPosting(
    params: IPostingCancelFbsPostingRequest
  ): Promise<IHttpResponse<any>> {
    return this.httpClient.post('/v2/posting/fbs/cancel', params);
  }

  /**
   * Move FBS posting to arbitration (endpoint 18)
   * @param params - Request parameters with posting number
   * @example const result = await client.fbs.moveToArbitration({ posting_number: 'POST-123456' });
   */
  async moveToArbitration(
    params: IPostingMovePostingRequest
  ): Promise<IHttpResponse<any>> {
    return this.httpClient.post('/v2/posting/fbs/arbitration', params);
  }

  /**
   * Move FBS posting to awaiting delivery (endpoint 19)
   * 
   * Moves posting to awaiting delivery status.
   * 
   * @param params - Request parameters with posting numbers
   * @returns Operation result
   * 
   * @example
   * ```typescript
   * const result = await client.fbs.moveToAwaitingDelivery({
   *   posting_number: ['POST-123456', 'POST-789012']
   * });
   * ```
   */
  async moveToAwaitingDelivery(
    params: IV2MovePostingToAwaitingDeliveryRequest
  ): Promise<IHttpResponse<any>> {
    return this.httpClient.post('/v2/posting/fbs/awaiting-delivery', params);
  }

  /**
   * Verify FBS pickup code (endpoint 20)
   * 
   * Verifies pickup code for FBS order collection.
   * 
   * @param params - Request parameters with posting number and verification code
   * @returns Verification result
   * 
   * @example
   * ```typescript
   * const result = await client.fbs.verifyPickupCode({
   *   posting_number: 'POST-123456',
   *   verification_code: '1234'
   * });
   * 
   * if (result.verified) {
   *   console.log('Pickup code verified successfully');
   * }
   * ```
   */
  async verifyPickupCode(
    params: IV1PostingFBSPickupCodeVerifyRequest
  ): Promise<IHttpResponse<IV1PostingFBSPickupCodeVerifyResponse>> {
    return this.httpClient.post('/v1/posting/fbs/pick-up-code/verify', params);
  }

  /**
   * Get electronic transport document (ETGB) (endpoint 21)
   * 
   * Returns electronic transport document information.
   * 
   * @param params - Request parameters with date range and posting numbers
   * @returns ETGB document information
   * 
   * @example
   * ```typescript
   * const etgb = await client.fbs.getETGB({
   *   date: {
   *     from: '2024-01-01T00:00:00Z',
   *     to: '2024-01-31T23:59:59Z'
   *   },
   *   posting_number: ['POST-123456']
   * });
   * ```
   */
  async getETGB(
    params: IV1GetEtgbRequest
  ): Promise<IHttpResponse<IV1GetEtgbResponse>> {
    return this.httpClient.post('/v1/posting/global/etgb', params);
  }

  /**
   * Get list of unpaid legal products V1 (endpoint 22)
   * 
   * Returns list of unpaid products that require legal verification.
   * Uses cursor-based pagination.
   * 
   * @param params - Request parameters with cursor pagination
   * @returns List of unpaid legal products
   * 
   * @example
   * ```typescript
   * const unpaidProducts = await client.fbs.getUnpaidLegalProductListV1({
   *   limit: 100,
   *   cursor: 'cursor_string_here'
   * });
   * 
   * console.log('Unpaid products count:', unpaidProducts.products?.length);
   * ```
   */
  async getUnpaidLegalProductListV1(
    params: IV1PostingUnpaidLegalProductListRequest = {}
  ): Promise<IHttpResponse<IV1PostingUnpaidLegalProductListResponse>> {
    return this.httpClient.post('/v1/posting/unpaid-legal/product/list', params);
  }

  /** @deprecated Use getUnpaidLegalProductListV1() instead */
  async getUnpaidLegalProducts(
    params: IV1PostingUnpaidLegalProductListRequest
  ): Promise<IHttpResponse<IV1PostingUnpaidLegalProductListResponse>> {
    return this.getUnpaidLegalProductListV1(params);
  }
}