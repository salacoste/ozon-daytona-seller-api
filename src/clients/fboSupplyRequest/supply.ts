/**
 * FboSupplyRequest Supply operations - endpoints (6-7)
 * 
 * Handles supply creation and status management:
 * - Supply creation from drafts
 * - Supply creation status monitoring
 */

import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type {
  IV1DraftSupplyCreateRequest,
  IV1DraftSupplyCreateResponse,
  IV1DraftSupplyCreateStatusRequest,
  IV1DraftSupplyCreateStatusResponse,
} from '../../types/generated/fbosupplyrequest';

/**
 * FboSupplyRequest Supply operations class
 */
export class FboSupplyRequestSupply {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Create supply from draft (endpoint 6)
   * @param params - Request parameters
   * @example const supply = await client.fboSupplyRequest.createSupply({ draft_id: 'draft-123', timeslot_id: 'slot-456' });
   */
  async createSupply(
    params: IV1DraftSupplyCreateRequest
  ): Promise<IHttpResponse<IV1DraftSupplyCreateResponse>> {
    return this.httpClient.post('/v1/draft/supply/create', params);
  }

  /**
   * Get supply creation status (endpoint 7)
   * @param params - Request parameters
   * @example const status = await client.fboSupplyRequest.getSupplyCreateStatus({ request_id: 'req-123' });
   */
  async getSupplyCreateStatus(
    params: IV1DraftSupplyCreateStatusRequest
  ): Promise<IHttpResponse<IV1DraftSupplyCreateStatusResponse>> {
    return this.httpClient.post('/v1/draft/supply/create/status', params);
  }
}