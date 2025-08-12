/**
 * RFBSReturnsAPI client for Ozon Seller API
 * 
 * Implements rFBS returns management endpoints from /methods/13-rfbsreturnsapi.json:
 * - List and retrieve return requests
 * - Approve, reject, or compensate return requests  
 * - Receive returned items and issue refunds
 * - New unified action API for return management
 * 
 * Handles rFBS (Fulfillment by Seller with Returns) return workflows.
 */

import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type {
  // Request types
  ListReturnsV2Request,
  GetReturnV2Request,
  RejectReturnV2Request,
  CompensateReturnV2Request,
  VerifyReturnV2Request,
  ReceiveReturnV2Request,
  ReturnMoneyV2Request,
  SetReturnActionRequest,
  
  // Response types
  ListReturnsV2Response,
  GetReturnV2Response,
  RejectReturnV2Response,
  CompensateReturnV2Response,
  VerifyReturnV2Response,
  ReceiveReturnV2Response,
  ReturnMoneyV2Response,
  SetReturnActionResponse,
  
  // Base types
  ReturnRequest,
  ReturnAction,
  ReturnGroupState,
  MoneyAmount,
  ReceivedItem
} from './types';

/**
 * RFBSReturnsAPI client for managing rFBS return requests
 * 
 * Provides comprehensive rFBS return management including approval workflows,
 * compensation handling, item receipt confirmation, and refund processing.
 * 
 * **Migration Notice:** Several methods are deprecated and will be replaced
 * by the new unified `/v1/returns/rfbs/action/set` endpoint.
 * 
 * @example
 * ```typescript
 * // List pending return requests
 * const returns = await client.rfbsReturns.listReturnsV2({
 *   filter: {
 *     group_state: ['PENDING'],
 *     created_at: {
 *       from: '2024-01-01T00:00:00Z',
 *       to: '2024-01-31T23:59:59Z'
 *     }
 *   },
 *   limit: 100
 * });
 * 
 * // Process each return using the new action API
 * for (const returnRequest of returns.data.returns || []) {
 *   // Approve return
 *   await client.rfbsReturns.setReturnAction({
 *     return_id: returnRequest.id!,
 *     action: 'APPROVE',
 *     parameters: {
 *       comment: 'Return approved, please send item back'
 *     }
 *   });
 * }
 * ```
 */
export class RFBSReturnsAPI {
  constructor(private readonly httpClient: HttpClient) {}

  // ============================================================================
  // Return Listing and Information
  // ============================================================================

  /**
   * List return requests V2
   * 
   * Retrieves a list of rFBS return requests with filtering options.
   * Supports pagination using last_id.
   * 
   * @param params - Return list parameters
   * @returns List of return requests
   * 
   * @example
   * ```typescript
   * // Get all pending returns
   * const result = await client.rfbsReturns.listReturnsV2({
   *   filter: {
   *     group_state: ['PENDING'],
   *     created_at: {
   *       from: '2024-01-01T00:00:00Z',
   *       to: '2024-01-31T23:59:59Z'
   *     }
   *   },
   *   limit: 100
   * });
   * 
   * // Filter by specific posting
   * const postingReturns = await client.rfbsReturns.listReturnsV2({
   *   filter: {
   *     posting_number: '58544282-0057-1'
   *   },
   *   limit: 50
   * });
   * 
   * // Filter by offer ID
   * const offerReturns = await client.rfbsReturns.listReturnsV2({
   *   filter: {
   *     offer_id: 'OFFER-123'
   *   },
   *   limit: 50
   * });
   * ```
   */
  async listReturnsV2(
    params: ListReturnsV2Request
  ): Promise<IHttpResponse<ListReturnsV2Response>> {
    return this.httpClient.post('/v2/returns/rfbs/list', params);
  }

  /**
   * Iterate through returns with automatic pagination
   * 
   * @param params - Return list parameters (without last_id)
   * @returns Async generator yielding pages of returns
   * 
   * @example
   * ```typescript
   * // Process all approved returns
   * for await (const returnsPage of client.rfbsReturns.iterateReturnsV2({
   *   filter: {
   *     group_state: ['APPROVED'],
   *     created_at: {
   *       from: '2024-01-01T00:00:00Z',
   *       to: '2024-12-31T23:59:59Z'
   *     }
   *   },
   *   limit: 500
   * })) {
   *   console.log(`Processing ${returnsPage.length} returns...`);
   *   
   *   for (const returnRequest of returnsPage) {
   *     console.log(`Return ${returnRequest.id}: ${returnRequest.status}`);
   *     
   *     // Process approved returns
   *     if (returnRequest.status === 'APPROVED') {
   *       console.log(`Ready to receive: ${returnRequest.items?.length} items`);
   *     }
   *   }
   * }
   * ```
   */
  async *iterateReturnsV2(
    params: Omit<ListReturnsV2Request, 'last_id'>
  ): AsyncGenerator<ReturnRequest[], void, unknown> {
    let lastId: number | undefined;
    let hasNext = true;
    
    while (hasNext) {
      const response = await this.listReturnsV2({
        ...params,
        ...(lastId && { last_id: lastId }),
        limit: params.limit || 100
      });
      
      const returns = response.data.returns || [];
      if (returns.length === 0) {
        hasNext = false;
      } else {
        yield returns;
        lastId = response.data.last_id;
        hasNext = response.data.has_next || false;
      }
    }
  }

  /**
   * Get return details V2
   * 
   * Retrieves detailed information about a specific return request.
   * 
   * @param params - Return details request parameters
   * @returns Return request details
   * 
   * @example
   * ```typescript
   * const result = await client.rfbsReturns.getReturnV2({
   *   return_id: 'RET-123456'
   * });
   * 
   * const returnRequest = result.data.return;
   * console.log(`Return ${returnRequest?.id}:`);
   * console.log(`  Status: ${returnRequest?.status}`);
   * console.log(`  Items: ${returnRequest?.items?.length}`);
   * console.log(`  Created: ${returnRequest?.created_at}`);
   * 
   * // Process return items
   * returnRequest?.items?.forEach(item => {
   *   console.log(`  - ${item.product_name} (${item.offer_id}): ${item.quantity}`);
   *   console.log(`    Reason: ${item.reason}`);
   *   console.log(`    Status: ${item.status}`);
   * });
   * ```
   */
  async getReturnV2(
    params: GetReturnV2Request
  ): Promise<IHttpResponse<GetReturnV2Response>> {
    return this.httpClient.post('/v2/returns/rfbs/get', params);
  }

  // ============================================================================
  // New Unified Action API (Recommended)
  // ============================================================================

  /**
   * Set return action (New API)
   * 
   * **Recommended**: Use this method instead of the deprecated V2 action methods.
   * Provides a unified interface for all return actions.
   * 
   * @param params - Return action parameters
   * @returns Action confirmation
   * 
   * @example
   * ```typescript
   * // Approve return request
   * await client.rfbsReturns.setReturnAction({
   *   return_id: 'RET-123456',
   *   action: 'APPROVE',
   *   parameters: {
   *     comment: 'Return approved, please send the item back'
   *   }
   * });
   * 
   * // Reject return request
   * await client.rfbsReturns.setReturnAction({
   *   return_id: 'RET-123456',
   *   action: 'REJECT',
   *   parameters: {
   *     comment: 'Item shows no signs of defect'
   *   }
   * });
   * 
   * // Provide partial compensation
   * await client.rfbsReturns.setReturnAction({
   *   return_id: 'RET-123456',
   *   action: 'COMPENSATE',
   *   parameters: {
   *     compensation_amount: {
   *       currency_code: 'RUB',
   *       value: '500.00'
   *     },
   *     comment: 'Partial refund for minor defect'
   *   }
   * });
   * 
   * // Confirm receipt of returned items
   * await client.rfbsReturns.setReturnAction({
   *   return_id: 'RET-123456',
   *   action: 'RECEIVE',
   *   parameters: {
   *     received_items: [
   *       {
   *         offer_id: 'OFFER-123',
   *         quantity: 1,
   *         condition: 'GOOD',
   *         condition_comment: 'Item received in good condition'
   *       }
   *     ],
   *     comment: 'All items received and inspected'
   *   }
   * });
   * 
   * // Issue full refund
   * await client.rfbsReturns.setReturnAction({
   *   return_id: 'RET-123456',
   *   action: 'REFUND',
   *   parameters: {
   *     refund_amount: {
   *       currency_code: 'RUB',
   *       value: '1500.00'
   *     },
   *     comment: 'Full refund processed'
   *   }
   * });
   * ```
   */
  async setReturnAction(
    params: SetReturnActionRequest
  ): Promise<IHttpResponse<SetReturnActionResponse>> {
    return this.httpClient.post('/v1/returns/rfbs/action/set', params);
  }

  // ============================================================================
  // Deprecated V2 Action Methods (Legacy Support)
  // ============================================================================

  /**
   * Reject return request V2
   * 
   * ⚠️ **Deprecated**: This method will be discontinued. 
   * Use `setReturnAction()` with action 'REJECT' instead.
   * 
   * @param params - Reject return parameters
   * @returns Rejection confirmation
   * @deprecated Use setReturnAction() instead
   * 
   * @example
   * ```typescript
   * // Deprecated approach
   * await client.rfbsReturns.rejectReturnV2({
   *   return_id: 'RET-123456',
   *   comment: 'Item shows no defect'
   * });
   * 
   * // Recommended approach
   * await client.rfbsReturns.setReturnAction({
   *   return_id: 'RET-123456',
   *   action: 'REJECT',
   *   parameters: {
   *     comment: 'Item shows no defect'
   *   }
   * });
   * ```
   */
  async rejectReturnV2(
    params: RejectReturnV2Request
  ): Promise<IHttpResponse<RejectReturnV2Response>> {
    return this.httpClient.post('/v2/returns/rfbs/reject', params);
  }

  /**
   * Compensate return request V2
   * 
   * ⚠️ **Deprecated**: This method will be discontinued.
   * Use `setReturnAction()` with action 'COMPENSATE' instead.
   * 
   * Provides partial compensation: customer keeps the item but gets partial refund.
   * 
   * @param params - Compensate return parameters
   * @returns Compensation confirmation
   * @deprecated Use setReturnAction() instead
   * 
   * @example
   * ```typescript
   * // Deprecated approach
   * await client.rfbsReturns.compensateReturnV2({
   *   return_id: 'RET-123456',
   *   compensation_amount: {
   *     currency_code: 'RUB',
   *     value: '300.00'
   *   },
   *   comment: 'Partial compensation for minor defect'
   * });
   * 
   * // Recommended approach
   * await client.rfbsReturns.setReturnAction({
   *   return_id: 'RET-123456',
   *   action: 'COMPENSATE',
   *   parameters: {
   *     compensation_amount: {
   *       currency_code: 'RUB',
   *       value: '300.00'
   *     },
   *     comment: 'Partial compensation for minor defect'
   *   }
   * });
   * ```
   */
  async compensateReturnV2(
    params: CompensateReturnV2Request
  ): Promise<IHttpResponse<CompensateReturnV2Response>> {
    return this.httpClient.post('/v2/returns/rfbs/compensate', params);
  }

  /**
   * Verify/approve return request V2
   * 
   * ⚠️ **Deprecated**: This method will be discontinued.
   * Use `setReturnAction()` with action 'APPROVE' instead.
   * 
   * Approves the return request and agrees to receive the item for verification.
   * Use `receiveReturnV2()` to confirm receipt of the returned item.
   * 
   * @param params - Verify return parameters
   * @returns Verification confirmation
   * @deprecated Use setReturnAction() instead
   * 
   * @example
   * ```typescript
   * // Deprecated approach
   * await client.rfbsReturns.verifyReturnV2({
   *   return_id: 'RET-123456',
   *   comment: 'Return approved, please send item back'
   * });
   * 
   * // Recommended approach
   * await client.rfbsReturns.setReturnAction({
   *   return_id: 'RET-123456',
   *   action: 'APPROVE',
   *   parameters: {
   *     comment: 'Return approved, please send item back'
   *   }
   * });
   * ```
   */
  async verifyReturnV2(
    params: VerifyReturnV2Request
  ): Promise<IHttpResponse<VerifyReturnV2Response>> {
    return this.httpClient.post('/v2/returns/rfbs/verify', params);
  }

  /**
   * Receive return V2
   * 
   * Confirms receipt of returned items from customer.
   * Use after approving return with `verifyReturnV2()` or `setReturnAction()`.
   * 
   * @param params - Receive return parameters
   * @returns Receipt confirmation
   * 
   * @example
   * ```typescript
   * await client.rfbsReturns.receiveReturnV2({
   *   return_id: 'RET-123456',
   *   items: [
   *     {
   *       offer_id: 'OFFER-123',
   *       quantity: 1,
   *       condition: 'DAMAGED',
   *       condition_comment: 'Item has visible scratches on surface'
   *     }
   *   ],
   *   comment: 'Item received with damage as described'
   * });
   * 
   * // Can also use the new unified API
   * await client.rfbsReturns.setReturnAction({
   *   return_id: 'RET-123456',
   *   action: 'RECEIVE',
   *   parameters: {
   *     received_items: [
   *       {
   *         offer_id: 'OFFER-123',
   *         quantity: 1,
   *         condition: 'DAMAGED',
   *         condition_comment: 'Item has visible scratches'
   *       }
   *     ],
   *     comment: 'Item received with damage'
   *   }
   * });
   * ```
   */
  async receiveReturnV2(
    params: ReceiveReturnV2Request
  ): Promise<IHttpResponse<ReceiveReturnV2Response>> {
    return this.httpClient.post('/v2/returns/rfbs/receive-return', params);
  }

  /**
   * Return money V2
   * 
   * Issues a refund to the customer after receiving and verifying the returned item.
   * Use after confirming receipt with `receiveReturnV2()`.
   * 
   * @param params - Return money parameters
   * @returns Refund confirmation
   * 
   * @example
   * ```typescript
   * await client.rfbsReturns.returnMoneyV2({
   *   return_id: 'RET-123456',
   *   refund_amount: {
   *     currency_code: 'RUB',
   *     value: '1500.00'
   *   },
   *   comment: 'Full refund for returned item'
   * });
   * 
   * // Can also use the new unified API
   * await client.rfbsReturns.setReturnAction({
   *   return_id: 'RET-123456',
   *   action: 'REFUND',
   *   parameters: {
   *     refund_amount: {
   *       currency_code: 'RUB',
   *       value: '1500.00'
   *     },
   *     comment: 'Full refund for returned item'
   *   }
   * });
   * ```
   */
  async returnMoneyV2(
    params: ReturnMoneyV2Request
  ): Promise<IHttpResponse<ReturnMoneyV2Response>> {
    return this.httpClient.post('/v2/returns/rfbs/return-money', params);
  }

  // ============================================================================
  // Helper Methods
  // ============================================================================

  /**
   * Helper method to process returns in batches
   * 
   * Processes multiple returns with the same action efficiently.
   * Includes error handling and progress tracking.
   * 
   * @param returnIds - Array of return IDs to process
   * @param action - Action to perform on all returns
   * @param actionParams - Common parameters for the action
   * @param batchSize - Number of returns to process in parallel (default: 10)
   * @returns Results for each return ID
   * 
   * @example
   * ```typescript
   * // Approve multiple returns
   * const results = await client.rfbsReturns.processBatch(
   *   ['RET-001', 'RET-002', 'RET-003'],
   *   'APPROVE',
   *   { comment: 'Batch approval for valid returns' },
   *   5
   * );
   * 
   * console.log(`Successfully processed: ${results.successful.length}`);
   * console.log(`Failed: ${results.failed.length}`);
   * 
   * results.failed.forEach(failure => {
   *   console.error(`Failed ${failure.returnId}: ${failure.error}`);
   * });
   * ```
   */
  async processBatch(
    returnIds: string[],
    action: ReturnAction,
    actionParams: any = {},
    batchSize: number = 10
  ): Promise<{
    successful: string[];
    failed: Array<{ returnId: string; error: string }>;
  }> {
    const successful: string[] = [];
    const failed: Array<{ returnId: string; error: string }> = [];

    // Process in batches to avoid overwhelming the API
    for (let i = 0; i < returnIds.length; i += batchSize) {
      const batch = returnIds.slice(i, i + batchSize);
      
      const batchPromises = batch.map(async (returnId) => {
        try {
          await this.setReturnAction({
            return_id: returnId,
            action,
            parameters: actionParams
          });
          return { returnId, success: true };
        } catch (error) {
          return { 
            returnId, 
            success: false, 
            error: error instanceof Error ? error.message : 'Unknown error'
          };
        }
      });

      const batchResults = await Promise.all(batchPromises);
      
      for (const result of batchResults) {
        if (result.success) {
          successful.push(result.returnId);
        } else {
          failed.push({ 
            returnId: result.returnId, 
            error: result.error || 'Unknown error' 
          });
        }
      }

      // Small delay between batches to be respectful to the API
      if (i + batchSize < returnIds.length) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }

    return { successful, failed };
  }
}

// Re-export types for convenience
export type * from './types';