/**
 * RFBSReturnsAPI implementation
 * RFBS return processing
 *
 * @example
 * ```typescript
 * import { OzonSellerAPI } from 'bmad-ozon-seller-api';
 *
 * const api = new OzonSellerAPI({
 *   clientId: 'your-client-id',
 *   apiKey: 'your-api-key'
 * });
 *
 * // Get returns list
 * const returns = await api.rfbsReturns.getReturnsList({
 *   filter: {
 *     status: ['awaiting_approve', 'awaiting_return'],
 *     created_since: '2024-01-01T00:00:00Z'
 *   },
 *   limit: 50
 * });
 *
 * // Approve return
 * await api.rfbsReturns.setAction({
 *   return_id: 123456,
 *   action: 'approve',
 *   comment: 'Return approved for inspection'
 * });
 *
 * // Return money to customer
 * await api.rfbsReturns.returnMoney({
 *   return_id: 123456,
 *   full_amount: true,
 *   compensate_shipping: true
 * });
 * ```
 */

import { HttpClient } from "../../core/http.js";
import type { RequestOptions } from "../../core/types.js";

// Request types
import { RfbsReturnsActionSetRequest, RfbsReturnsCompensateRequest, RfbsReturnsGetRequest, RfbsReturnsListRequest, RfbsReturnsReceiveReturnRequest, RfbsReturnsRejectRequest, RfbsReturnsReturnMoneyRequest, RfbsReturnsVerifyRequest } from "../../types/requests/rfbs-returns";

// Response types
import { RfbsReturnsActionSetResponse, RfbsReturnsEmptyResponse, RfbsReturnsGetResponse, RfbsReturnsListResponse } from "../../types/responses/rfbs-returns";

/**
 * RFBSReturnsAPI class
 * Handles RFBS return processing operations
 */
export class RfbsReturnsApi {
  constructor(private readonly httpClient: HttpClient) {}
  /**
   * Передать доступные действия для rFBS возвратов
   * Set available actions for rFBS returns
   *
   * @param request - Action set request
   * @param options - Request options
   * @returns Promise with operation result
   *
   * @example
   * ```typescript
   * const result = await api.rfbsReturns.setAction({
   *   return_id: 123456,
   *   action: 'approve',
   *   comment: 'Return approved for inspection'
   * });
   * console.log('Action result:', result.result);
   * ```
   */
  async setAction(request: RfbsReturnsActionSetRequest, options?: RequestOptions): Promise<RfbsReturnsActionSetResponse> {
    return this.httpClient.request<RfbsReturnsActionSetRequest, RfbsReturnsActionSetResponse>("POST", "/v1/returns/rfbs/action/set", request, options);
  }

  /**
   * Вернуть часть стоимости товара (устаревший метод)
   * Return part of product cost (deprecated method)
   *
   * @deprecated Use setAction with 'compensate' action instead
   * @param request - Compensation request
   * @param options - Request options
   * @returns Promise with empty response
   *
   * @example
   * ```typescript
   * // Deprecated - use setAction instead
   * await api.rfbsReturns.compensate({
   *   return_id: 123456,
   *   compensation_amount: 500.00,
   *   reason: 'Partial compensation for minor defect'
   * });
   * ```
   */
  async compensate(request: RfbsReturnsCompensateRequest, options?: RequestOptions): Promise<RfbsReturnsEmptyResponse> {
    return this.httpClient.request<RfbsReturnsCompensateRequest, RfbsReturnsEmptyResponse>("POST", "/v2/returns/rfbs/compensate", request, options);
  }

  /**
   * Получить информацию о заявке на возврат
   * Get return application information
   *
   * @param request - Return info request
   * @param options - Request options
   * @returns Promise with return information
   *
   * @example
   * ```typescript
   * const returnInfo = await api.rfbsReturns.getReturn({
   *   return_id: 123456
   * });
   * console.log('Return status:', returnInfo.return?.status);
   * console.log('Customer reason:', returnInfo.return?.customer_reason);
   * console.log('Products:', returnInfo.return?.products?.length);
   * ```
   */
  async getReturn(request: RfbsReturnsGetRequest, options?: RequestOptions): Promise<RfbsReturnsGetResponse> {
    return this.httpClient.request<RfbsReturnsGetRequest, RfbsReturnsGetResponse>("POST", "/v2/returns/rfbs/get", request, options);
  }

  /**
   * Получить список заявок на возврат
   * Get returns list
   *
   * @param request - Returns list request
   * @param options - Request options
   * @returns Promise with returns list
   *
   * @example
   * ```typescript
   * const returns = await api.rfbsReturns.getReturnsList({
   *   filter: {
   *     status: ['awaiting_approve', 'awaiting_return'],
   *     created_since: '2024-01-01T00:00:00Z',
   *     created_to: '2024-01-31T23:59:59Z'
   *   },
   *   limit: 100,
   *   offset: 0
   * });
   * console.log('Found returns:', returns.total);
   * returns.returns?.forEach(ret => {
   *   console.log(`Return ${ret.return_id}: ${ret.status}`);
   * });
   * ```
   */
  async getReturnsList(request: RfbsReturnsListRequest, options?: RequestOptions): Promise<RfbsReturnsListResponse> {
    return this.httpClient.request<RfbsReturnsListRequest, RfbsReturnsListResponse>("POST", "/v2/returns/rfbs/list", request, options);
  }

  /**
   * Подтвердить получение товара на проверку (устаревший метод)
   * Confirm product receipt for inspection (deprecated method)
   *
   * @deprecated Use setAction with 'receive_return' action instead
   * @param request - Receive return request
   * @param options - Request options
   * @returns Promise with empty response
   *
   * @example
   * ```typescript
   * // Deprecated - use setAction instead
   * await api.rfbsReturns.receiveReturn({
   *   return_id: 123456,
   *   received_at: '2024-01-20T10:00:00Z'
   * });
   * ```
   */
  async receiveReturn(request: RfbsReturnsReceiveReturnRequest, options?: RequestOptions): Promise<RfbsReturnsEmptyResponse> {
    return this.httpClient.request<RfbsReturnsReceiveReturnRequest, RfbsReturnsEmptyResponse>("POST", "/v2/returns/rfbs/receive-return", request, options);
  }

  /**
   * Отклонить заявку на возврат (устаревший метод)
   * Reject return application (deprecated method)
   *
   * @deprecated Use setAction with 'reject' action instead
   * @param request - Reject request
   * @param options - Request options
   * @returns Promise with empty response
   *
   * @example
   * ```typescript
   * // Deprecated - use setAction instead
   * await api.rfbsReturns.reject({
   *   return_id: 123456,
   *   comment: 'Return does not meet our return policy criteria'
   * });
   * ```
   */
  async reject(request: RfbsReturnsRejectRequest, options?: RequestOptions): Promise<RfbsReturnsEmptyResponse> {
    return this.httpClient.request<RfbsReturnsRejectRequest, RfbsReturnsEmptyResponse>("POST", "/v2/returns/rfbs/reject", request, options);
  }

  /**
   * Вернуть деньги покупателю (устаревший метод)
   * Return money to customer (deprecated method)
   *
   * @deprecated Use setAction with 'return_money' action instead
   * @param request - Return money request
   * @param options - Request options
   * @returns Promise with empty response
   *
   * @example
   * ```typescript
   * // Deprecated - use setAction instead
   * await api.rfbsReturns.returnMoney({
   *   return_id: 123456,
   *   full_amount: true,
   *   compensate_shipping: true
   * });
   * ```
   */
  async returnMoney(request: RfbsReturnsReturnMoneyRequest, options?: RequestOptions): Promise<RfbsReturnsEmptyResponse> {
    return this.httpClient.request<RfbsReturnsReturnMoneyRequest, RfbsReturnsEmptyResponse>("POST", "/v2/returns/rfbs/return-money", request, options);
  }

  /**
   * Одобрить заявку на возврат (устаревший метод)
   * Approve return application (deprecated method)
   *
   * @deprecated Use setAction with 'approve' action instead
   * @param request - Verify request
   * @param options - Request options
   * @returns Promise with empty response
   *
   * @example
   * ```typescript
   * // Deprecated - use setAction instead
   * await api.rfbsReturns.verify({
   *   return_id: 123456,
   *   comment: 'Return approved for inspection'
   * });
   * ```
   */
  async verify(request: RfbsReturnsVerifyRequest, options?: RequestOptions): Promise<RfbsReturnsEmptyResponse> {
    return this.httpClient.request<RfbsReturnsVerifyRequest, RfbsReturnsEmptyResponse>("POST", "/v2/returns/rfbs/verify", request, options);
  }
}
