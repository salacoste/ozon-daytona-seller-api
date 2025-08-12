/**
 * FBO Core operations - posting management endpoints (1-3)
 * 
 * Handles basic FBO posting operations:
 * - Order listing with pagination
 * - Order details retrieval
 * - Cancellation reasons
 */

import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type {
  IPostingGetFboPostingListRequest,
  IV2FboPostingListResponse,
  IPostingGetFboPostingRequest,
  IV2FboPostingResponse,
  IV1CancelReasonListResponse,
} from '../../types/generated/fbo';

/**
 * FBO Core operations class
 */
export class FBOCore {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Get FBO order list with pagination (endpoint 1)
   * @param params - Query parameters
   * @example const orders = await client.fbo.list({ filter: { since: '2024-01-01', to: '2024-01-31' }, limit: 100 });
   */
  async list(
    params: IPostingGetFboPostingListRequest
  ): Promise<IHttpResponse<IV2FboPostingListResponse>> {
    return this.httpClient.post('/v2/posting/fbo/list', params);
  }

  /**
   * Get FBO order details (endpoint 2)
   * @param params - Request parameters with posting number
   * @example const order = await client.fbo.get({ posting_number: 'POST-123456', with: { analytics_data: true } });
   */
  async get(
    params: IPostingGetFboPostingRequest
  ): Promise<IHttpResponse<IV2FboPostingResponse>> {
    return this.httpClient.post('/v2/posting/fbo/get', params);
  }

  /**
   * Get FBO cancellation reasons list (endpoint 3)
   * @example const reasons = await client.fbo.getCancelReasons();
   */
  async getCancelReasons(): Promise<IHttpResponse<IV1CancelReasonListResponse>> {
    return this.httpClient.post('/v1/posting/fbo/cancel-reason/list', {});
  }

  /**
   * Iterate through FBO orders with automatic pagination
   * @param params - Query parameters
   * @param config - Pagination configuration
   * @example for await (const page of client.fbo.iterateOrders({ filter: { since: '2024-01-01', to: '2024-01-31' } })) { ... }
   */
  async *iterateOrders(
    params: Partial<IPostingGetFboPostingListRequest> = {},
    config: { maxPages?: number; delayBetweenPages?: number } = {}
  ) {
    const { maxPages = 100, delayBetweenPages = 0 } = config;
    let pageNumber = 1;
    let offset = params.offset || 0;
    const limit = params.limit || 100;

    // Ensure required parameters have defaults
    const baseParams = {
      filter: { since: '', to: '' },
      limit,
      offset: 0,
      ...params
    };

    while (pageNumber <= maxPages) {
      const pageParams = { ...baseParams, offset, limit };
      const response = await this.list(pageParams);
      
      yield {
        value: response,
        pageNumber,
        totalFetched: pageNumber,
        done: false,
      };

      // Check if we should continue (simplified logic for now)
      if (!response.data.result || response.data.result.length < limit) {
        break;
      }

      offset += limit;
      pageNumber++;

      if (delayBetweenPages > 0) {
        await new Promise(resolve => setTimeout(resolve, delayBetweenPages));
      }
    }
  }
}