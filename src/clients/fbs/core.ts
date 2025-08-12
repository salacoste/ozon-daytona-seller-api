/**
 * Core FBS operations - Part 1 endpoints (1-6)
 * 
 * Handles basic FBS order management operations:
 * - Order retrieval and filtering
 * - Order details and status
 * - Multi-box quantity management
 * - Product modifications
 */

import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type {
  IPostingv3GetFbsPostingUnfulfilledListRequest,
  IPostingv3GetFbsPostingUnfulfilledListResponse,
  IPostingv3GetFbsPostingListRequest,
  IV3GetFbsPostingListResponseV3,
  IPostingv3GetFbsPostingRequest,
  IV3GetFbsPostingResponseV3,
  IPostingGetFbsPostingByBarcodeRequest,
  IV2FbsPostingResponse,
  IPostingv3PostingMultiBoxQtySetV3Request,
  IPostingv3PostingMultiBoxQtySetV3Response,
  IPostingPostingProductChangeRequest,
  IPostingPostingProductChangeResponse,
} from '../../types/generated/fbs';

/**
 * Core FBS operations class
 */
export class FBSCore {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Get unfulfilled FBS orders (endpoint 1)
   * 
   * Returns a list of unfulfilled orders for the specified time period - maximum of one year.
   * 
   * @param params - Query parameters with filters and pagination
   * @returns Unfulfilled FBS orders list
   * 
   * @example
   * ```typescript
   * const unfulfilled = await client.fbs.getUnfulfilledV3({
   *   dir: 'ASC',
   *   filter: {
   *     cutoff_from: '2024-01-01T00:00:00.000Z',
   *     cutoff_to: '2024-01-31T23:59:59.999Z',
   *     status: 'awaiting_packaging'
   *   },
   *   limit: 100,
   *   offset: 0,
   *   with: {
   *     analytics_data: true,
   *     barcodes: true,
   *     financial_data: true
   *   }
   * });
   * ```
   */
  async getUnfulfilledV3(
    params: IPostingv3GetFbsPostingUnfulfilledListRequest
  ): Promise<IHttpResponse<IPostingv3GetFbsPostingUnfulfilledListResponse>> {
    return this.httpClient.post('/v3/posting/fbs/unfulfilled/list', params);
  }

  /**
   * Get FBS orders list (endpoint 2)
   * 
   * Returns a paginated list of FBS orders with detailed information.
   * 
   * @param params - Query parameters with filters and pagination
   * @returns FBS orders list
   * 
   * @example
   * ```typescript
   * const orders = await client.fbs.listV3({
   *   dir: 'ASC',
   *   filter: {
   *     since: '2024-01-01T00:00:00.000Z',
   *     to: '2024-01-31T23:59:59.999Z',
   *     status: 'awaiting_packaging'
   *   },
   *   limit: 100,
   *   offset: 0
   * });
   * ```
   */
  async listV3(
    params: IPostingv3GetFbsPostingListRequest
  ): Promise<IHttpResponse<IV3GetFbsPostingListResponseV3>> {
    return this.httpClient.post('/v3/posting/fbs/list', params);
  }

  /**
   * Get FBS order details (endpoint 3)
   * 
   * Returns detailed information about a specific FBS order.
   * 
   * @param params - Request parameters with posting number
   * @returns Detailed order information
   * 
   * @example
   * ```typescript
   * const orderDetails = await client.fbs.getV3({
   *   posting_number: 'POST-123456',
   *   with: {
   *     analytics_data: true,
   *     barcodes: true,
   *     financial_data: true
   *   }
   * });
   * ```
   */
  async getV3(
    params: IPostingv3GetFbsPostingRequest
  ): Promise<IHttpResponse<IV3GetFbsPostingResponseV3>> {
    return this.httpClient.post('/v3/posting/fbs/get', params);
  }

  /**
   * Get FBS order by barcode (endpoint 4)
   * 
   * Returns order information by barcode.
   * 
   * @param params - Request parameters with barcode
   * @returns Order information
   * 
   * @example
   * ```typescript
   * const orderByBarcode = await client.fbs.getByBarcode({
   *   barcode: '123456789'
   * });
   * ```
   */
  async getByBarcode(
    params: IPostingGetFbsPostingByBarcodeRequest
  ): Promise<IHttpResponse<IV2FbsPostingResponse>> {
    return this.httpClient.post('/v2/posting/fbs/get-by-barcode', params);
  }

  /**
   * Set multi-box quantity (endpoint 5)
   * 
   * Sets the quantity of boxes for multi-box orders.
   * 
   * @param params - Request parameters with posting numbers and box quantities
   * @returns Operation result
   * 
   * @example
   * ```typescript
   * const result = await client.fbs.setMultiBoxQuantity({
   *   postings: [
   *     {
   *       posting_number: 'POST-123456',
   *       multi_box_qty: 2
   *     }
   *   ]
   * });
   * ```
   */
  async setMultiBoxQuantity(
    params: IPostingv3PostingMultiBoxQtySetV3Request
  ): Promise<IHttpResponse<IPostingv3PostingMultiBoxQtySetV3Response>> {
    return this.httpClient.post('/v3/posting/multiboxqty/set', params);
  }

  /**
   * Change FBS product details (endpoint 6)
   * 
   * Modifies product details in an FBS order.
   * 
   * @param params - Request parameters with posting number and product changes
   * @returns Operation result
   * 
   * @example
   * ```typescript
   * const result = await client.fbs.changeProduct({
   *   posting_number: 'POST-123456',
   *   products: [
   *     {
   *       product_id: 12345,
   *       quantity: 2
   *     }
   *   ]
   * });
   * ```
   */
  async changeProduct(
    params: IPostingPostingProductChangeRequest
  ): Promise<IHttpResponse<IPostingPostingProductChangeResponse>> {
    return this.httpClient.post('/v2/posting/fbs/product/change', params);
  }
}