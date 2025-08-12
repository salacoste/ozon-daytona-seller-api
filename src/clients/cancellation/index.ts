/**
 * CancellationAPI client for Ozon Seller API
 * 
 * Implements conditional cancellation endpoints from /methods/18-cancellationapi.json:
 * - Get cancellation details (V1, deprecated)
 * - List cancellations with filters (V1/V2 versions)
 * - Approve cancellation requests (V1/V2 versions)
 * - Reject cancellation requests (V1/V2 versions)
 */

import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type {
  GetConditionalCancellationV1Request,
  GetConditionalCancellationV1Response,
  ListConditionalCancellationsV1Request,
  ListConditionalCancellationsV1Response,
  ListConditionalCancellationsV2Request,
  ListConditionalCancellationsV2Response,
  ConditionalCancellationActionV1Request,
  ConditionalCancellationActionV2Request,
  ApproveConditionalCancellationV1Response,
  ApproveConditionalCancellationV2Response,
  RejectConditionalCancellationV1Response,
  RejectConditionalCancellationV2Response
} from './types';

/**
 * CancellationAPI client for managing conditional order cancellations
 * 
 * Used for rFBS order cancellation management - allows sellers to approve
 * or reject customer cancellation requests with proper state tracking.
 * 
 * @example
 * ```typescript
 * // List pending cancellation requests
 * const pending = await client.cancellation.listConditionalCancellationsV2({
 *   filters: { state: 'ON_APPROVAL' },
 *   limit: 100
 * });
 * 
 * // Approve a cancellation request
 * await client.cancellation.approveConditionalCancellationV2({
 *   cancellation_id: 90066344,
 *   comment: 'Approved due to customer request'
 * });
 * 
 * // Reject a cancellation request
 * await client.cancellation.rejectConditionalCancellationV2({
 *   cancellation_id: 90066344,
 *   comment: 'Order already shipped, cannot cancel'
 * });
 * ```
 */
export class CancellationAPI {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Get conditional cancellation V1 (Deprecated)
   * 
   * ⚠️ **Will be discontinued August 3, 2025**: Use listConditionalCancellationsV2 instead.
   * 
   * Retrieves details for a specific cancellation request.
   * 
   * @param params - Get cancellation parameters
   * @returns Cancellation details
   */
  async getConditionalCancellationV1(
    params: GetConditionalCancellationV1Request
  ): Promise<IHttpResponse<GetConditionalCancellationV1Response>> {
    return this.httpClient.post('/v1/conditional-cancellation/get', params);
  }

  /**
   * List conditional cancellations V1 (Deprecated)
   * 
   * ⚠️ **Will be discontinued August 3, 2025**: Use listConditionalCancellationsV2 instead.
   * 
   * Returns list of cancellation requests with offset-based pagination.
   * 
   * @param params - List parameters
   * @returns List of cancellation requests
   */
  async listConditionalCancellationsV1(
    params: ListConditionalCancellationsV1Request
  ): Promise<IHttpResponse<ListConditionalCancellationsV1Response>> {
    return this.httpClient.post('/v1/conditional-cancellation/list', params);
  }

  /**
   * List conditional cancellations V2
   * 
   * Returns list of cancellation requests with last_id pagination.
   * Recommended over V1 for new integrations.
   * 
   * @param params - List parameters
   * @returns List of cancellation requests
   * 
   * @example
   * ```typescript
   * const result = await client.cancellation.listConditionalCancellationsV2({
   *   filters: {
   *     state: 'ON_APPROVAL',
   *     cancellation_initiator: ['CLIENT']
   *   },
   *   limit: 100,
   *   with: { counter: true }
   * });
   * 
   * result.data.result?.forEach(cancellation => {
   *   console.log(`Request ${cancellation.cancellation_id}: ${cancellation.posting_number}`);
   * });
   * 
   * // Handle pagination
   * if (result.data.last_id) {
   *   const nextPage = await client.cancellation.listConditionalCancellationsV2({
   *     ...params,
   *     last_id: result.data.last_id
   *   });
   * }
   * ```
   */
  async listConditionalCancellationsV2(
    params: ListConditionalCancellationsV2Request
  ): Promise<IHttpResponse<ListConditionalCancellationsV2Response>> {
    return this.httpClient.post('/v2/conditional-cancellation/list', params);
  }

  /**
   * Approve conditional cancellation V1 (Deprecated)
   * 
   * ⚠️ **Will be discontinued August 3, 2025**: Use approveConditionalCancellationV2 instead.
   * 
   * Approves a cancellation request. Order will be cancelled and money refunded.
   * 
   * @param params - Approval parameters
   * @returns Empty response on success
   */
  async approveConditionalCancellationV1(
    params: ConditionalCancellationActionV1Request
  ): Promise<IHttpResponse<ApproveConditionalCancellationV1Response>> {
    return this.httpClient.post('/v1/conditional-cancellation/approve', params);
  }

  /**
   * Approve conditional cancellation V2
   * 
   * Approves a cancellation request in ON_APPROVAL status.
   * Order will be cancelled and money refunded to customer.
   * 
   * @param params - Approval parameters
   * @returns Empty response on success
   * 
   * @example
   * ```typescript
   * await client.cancellation.approveConditionalCancellationV2({
   *   cancellation_id: 90066344,
   *   comment: 'Customer request approved - item not yet shipped'
   * });
   * ```
   */
  async approveConditionalCancellationV2(
    params: ConditionalCancellationActionV2Request
  ): Promise<IHttpResponse<ApproveConditionalCancellationV2Response>> {
    return this.httpClient.post('/v2/conditional-cancellation/approve', params);
  }

  /**
   * Reject conditional cancellation V1 (Deprecated)
   * 
   * ⚠️ **Will be discontinued August 3, 2025**: Use rejectConditionalCancellationV2 instead.
   * 
   * Rejects a cancellation request. Order remains in same status and must be delivered.
   * 
   * @param params - Rejection parameters
   * @returns Empty response on success
   */
  async rejectConditionalCancellationV1(
    params: ConditionalCancellationActionV1Request
  ): Promise<IHttpResponse<RejectConditionalCancellationV1Response>> {
    return this.httpClient.post('/v1/conditional-cancellation/reject', params);
  }

  /**
   * Reject conditional cancellation V2
   * 
   * Rejects a cancellation request in ON_APPROVAL status.
   * Order remains in same status and must be delivered to customer.
   * 
   * @param params - Rejection parameters (comment required)
   * @returns Empty response on success
   * 
   * @example
   * ```typescript
   * await client.cancellation.rejectConditionalCancellationV2({
   *   cancellation_id: 90066344,
   *   comment: 'Order has already been shipped and cannot be cancelled'
   * });
   * ```
   */
  async rejectConditionalCancellationV2(
    params: ConditionalCancellationActionV2Request
  ): Promise<IHttpResponse<RejectConditionalCancellationV2Response>> {
    return this.httpClient.post('/v2/conditional-cancellation/reject', params);
  }
}

// Re-export types for convenience
export type * from './types';