/**
 * FboSupplyRequest Cargoes operations - endpoints (8-15)
 * 
 * Handles cargo management and labeling:
 * - Cargo creation, deletion, and status monitoring
 * - Cargo rules and requirements
 * - Label creation and file management
 */

import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type {
  IV1CargoesCreateRequest,
  IV1CargoesCreateResponse,
  IV1CargoesCreateInfoRequest,
  IV1CargoesCreateInfoResponse,
  IV1CargoesDeleteRequest,
  IV1CargoesDeleteResponse,
  IV1CargoesDeleteStatusRequest,
  IV1CargoesDeleteStatusResponse,
  IV1CargoesRulesGetRequest,
  IV1CargoesRulesGetResponse,
  IV1CargoesLabelCreateRequest,
  IV1CargoesLabelCreateResponse,
  IV1CargoesLabelGetRequest,
  IV1CargoesLabelGetResponse,
} from '../../types/generated/fbosupplyrequest';

/**
 * FboSupplyRequest Cargoes operations class
 */
export class FboSupplyRequestCargoes {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Create cargoes for supply (endpoint 8)
   * @param params - Request parameters
   * @example const cargo = await client.fboSupplyRequest.createCargoes({ supply_id: 'supply-123', products: [...] });
   */
  async createCargoes(
    params: IV1CargoesCreateRequest
  ): Promise<IHttpResponse<IV1CargoesCreateResponse>> {
    return this.httpClient.post('/v1/cargoes/create', params);
  }

  /**
   * Get cargoes creation info (endpoint 9)
   * @param params - Request parameters
   * @example const info = await client.fboSupplyRequest.getCargoesCreateInfo({ request_id: 'req-123' });
   */
  async getCargoesCreateInfo(
    params: IV1CargoesCreateInfoRequest
  ): Promise<IHttpResponse<IV1CargoesCreateInfoResponse>> {
    return this.httpClient.post('/v1/cargoes/create/info', params);
  }

  /**
   * Delete cargoes (endpoint 10)
   * @param params - Request parameters
   * @example await client.fboSupplyRequest.deleteCargoes({ cargo_id: 'cargo-123' });
   */
  async deleteCargoes(
    params: IV1CargoesDeleteRequest
  ): Promise<IHttpResponse<IV1CargoesDeleteResponse>> {
    return this.httpClient.post('/v1/cargoes/delete', params);
  }

  /**
   * Get cargoes deletion status (endpoint 11)
   * @param params - Request parameters
   * @example const status = await client.fboSupplyRequest.getCargoesDeleteStatus({ request_id: 'req-123' });
   */
  async getCargoesDeleteStatus(
    params: IV1CargoesDeleteStatusRequest
  ): Promise<IHttpResponse<IV1CargoesDeleteStatusResponse>> {
    return this.httpClient.post('/v1/cargoes/delete/status', params);
  }

  /**
   * Get cargoes rules (endpoint 12)
   * @param params - Request parameters
   * @example const rules = await client.fboSupplyRequest.getCargoesRules({ supply_id: 'supply-123' });
   */
  async getCargoesRules(
    params: IV1CargoesRulesGetRequest
  ): Promise<IHttpResponse<IV1CargoesRulesGetResponse>> {
    return this.httpClient.post('/v1/cargoes/rules/get', params);
  }

  /**
   * Create cargoes label (endpoint 13)
   * @param params - Request parameters
   * @example const label = await client.fboSupplyRequest.createCargoesLabel({ cargo_id: 'cargo-123', label_type: 'STANDARD' });
   */
  async createCargoesLabel(
    params: IV1CargoesLabelCreateRequest
  ): Promise<IHttpResponse<IV1CargoesLabelCreateResponse>> {
    return this.httpClient.post('/v1/cargoes-label/create', params);
  }

  /**
   * Get cargoes label (endpoint 14)
   * @param params - Request parameters
   * @example const label = await client.fboSupplyRequest.getCargoesLabel({ request_id: 'req-123' });
   */
  async getCargoesLabel(
    params: IV1CargoesLabelGetRequest
  ): Promise<IHttpResponse<IV1CargoesLabelGetResponse>> {
    return this.httpClient.post('/v1/cargoes-label/get', params);
  }

  /**
   * Get cargoes label file (endpoint 15)
   * @param file_guid - File GUID to retrieve
   * @example const file = await client.fboSupplyRequest.getCargoesLabelFile('guid-123');
   */
  async getCargoesLabelFile(
    file_guid: string
  ): Promise<IHttpResponse<ArrayBuffer>> {
    return this.httpClient.get(`/v1/cargoes-label/file/${file_guid}`);
  }
}