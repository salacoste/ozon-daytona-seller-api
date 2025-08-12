/**
 * FboSupplyRequest Draft operations - endpoints (1-5)
 * 
 * Handles draft supply request management:
 * - Cluster information retrieval
 * - Warehouse search and listing
 * - Draft creation and information
 * - Timeslot information management
 */

import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type {
  IV1DraftClusterListRequest,
  IV1DraftClusterListResponse,
  IV1DraftGetWarehouseFboListRequest,
  IV1DraftGetWarehouseFboListResponse,
  IV1DraftCreateRequest,
  IV1DraftCreateResponse,
  IV1DraftCreateInfoRequest,
  IV1DraftCreateInfoResponse,
  IV1DraftTimeslotInfoRequest,
  IV1DraftTimeslotInfoResponse,
} from '../../types/generated/fbosupplyrequest';

/**
 * FboSupplyRequest Draft operations class
 */
export class FboSupplyRequestDrafts {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Get cluster and warehouse information (endpoint 1)
   * @param params - Request parameters
   * @example const clusters = await client.fboSupplyRequest.getClusterList({ cluster_type: 'CLUSTER_TYPE_OZON' });
   */
  async getClusterList(
    params: IV1DraftClusterListRequest
  ): Promise<IHttpResponse<IV1DraftClusterListResponse>> {
    return this.httpClient.post('/v1/cluster/list', params);
  }

  /**
   * Search warehouse FBO list (endpoint 2)
   * @param params - Request parameters
   * @example const warehouses = await client.fboSupplyRequest.getWarehouseFboList({ filter_by_supply_type: ['CREATE_TYPE_CROSSDOCK'], search: 'Moscow' });
   */
  async getWarehouseFboList(
    params: IV1DraftGetWarehouseFboListRequest
  ): Promise<IHttpResponse<IV1DraftGetWarehouseFboListResponse>> {
    return this.httpClient.post('/v1/warehouse/fbo/list', params);
  }

  /**
   * Create supply request draft (endpoint 3)
   * @param params - Request parameters
   * @example const draft = await client.fboSupplyRequest.createDraft({ warehouse_id: 22204339479000, cluster_id: '1', supply_type: 'CREATE_TYPE_CROSSDOCK' });
   */
  async createDraft(
    params: IV1DraftCreateRequest
  ): Promise<IHttpResponse<IV1DraftCreateResponse>> {
    return this.httpClient.post('/v1/draft/create', params);
  }

  /**
   * Get draft creation information (endpoint 4)
   * @param params - Request parameters
   * @example const info = await client.fboSupplyRequest.getDraftCreateInfo({ draft_id: 'draft-123' });
   */
  async getDraftCreateInfo(
    params: IV1DraftCreateInfoRequest
  ): Promise<IHttpResponse<IV1DraftCreateInfoResponse>> {
    return this.httpClient.post('/v1/draft/create/info', params);
  }

  /**
   * Get draft timeslot information (endpoint 5)
   * @param params - Request parameters
   * @example const timeslots = await client.fboSupplyRequest.getDraftTimeslotInfo({ draft_id: 'draft-123' });
   */
  async getDraftTimeslotInfo(
    params: IV1DraftTimeslotInfoRequest
  ): Promise<IHttpResponse<IV1DraftTimeslotInfoResponse>> {
    return this.httpClient.post('/v1/draft/timeslot/info', params);
  }
}