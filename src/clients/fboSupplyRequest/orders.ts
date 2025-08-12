/**
 * FboSupplyRequest Supply Order operations - endpoints (16-19)
 * 
 * Handles supply order lifecycle management:
 * - Supply order cancellation
 * - Supply order content updates
 * - Status monitoring for order operations
 */

import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type {
  IV1SupplyOrderCancelRequest,
  IV1SupplyOrderCancelResponse,
  IV1SupplyOrderCancelStatusRequest,
  IV1SupplyOrderCancelStatusResponse,
  IV1SupplyOrderContentUpdateRequest,
  IV1SupplyOrderContentUpdateResponse,
  IV1SupplyOrderContentUpdateStatusRequest,
  IV1SupplyOrderContentUpdateStatusResponse,
} from '../../types/generated/fbosupplyrequest';

/**
 * FboSupplyRequest Supply Order operations class
 */
export class FboSupplyRequestOrders {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Cancel supply order (endpoint 16)
   * @param params - Request parameters
   * @example await client.fboSupplyRequest.cancelSupplyOrder({ supply_order_id: 123456, reason: 'Changed plans' });
   */
  async cancelSupplyOrder(
    params: IV1SupplyOrderCancelRequest
  ): Promise<IHttpResponse<IV1SupplyOrderCancelResponse>> {
    return this.httpClient.post('/v1/supply-order/cancel', params);
  }

  /**
   * Get supply order cancellation status (endpoint 17)
   * @param params - Request parameters
   * @example const status = await client.fboSupplyRequest.getSupplyOrderCancelStatus({ request_id: 'req-123' });
   */
  async getSupplyOrderCancelStatus(
    params: IV1SupplyOrderCancelStatusRequest
  ): Promise<IHttpResponse<IV1SupplyOrderCancelStatusResponse>> {
    return this.httpClient.post('/v1/supply-order/cancel/status', params);
  }

  /**
   * Update supply order content (endpoint 18)
   * @param params - Request parameters
   * @example await client.fboSupplyRequest.updateSupplyOrderContent({ supply_order_id: 123456, products: [...] });
   */
  async updateSupplyOrderContent(
    params: IV1SupplyOrderContentUpdateRequest
  ): Promise<IHttpResponse<IV1SupplyOrderContentUpdateResponse>> {
    return this.httpClient.post('/v1/supply-order/content/update', params);
  }

  /**
   * Get supply order content update status (endpoint 19)
   * @param params - Request parameters
   * @example const status = await client.fboSupplyRequest.getSupplyOrderContentUpdateStatus({ request_id: 'req-123' });
   */
  async getSupplyOrderContentUpdateStatus(
    params: IV1SupplyOrderContentUpdateStatusRequest
  ): Promise<IHttpResponse<IV1SupplyOrderContentUpdateStatusResponse>> {
    return this.httpClient.post('/v1/supply-order/content/update/status', params);
  }
}