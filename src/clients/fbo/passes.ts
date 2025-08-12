/**
 * FBO Passes operations - endpoints (11-12)
 * 
 * Handles driver and vehicle pass management:
 * - Creating passes with driver/vehicle data
 * - Checking pass status
 */

import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type {
  IV1SupplyOrderPassCreateRequest,
  IV1SupplyOrderPassCreateResponse,
  IV1SupplyOrderPassStatusRequest,
  IV1SupplyOrderPassStatusResponse,
} from '../../types/generated/fbo';

/**
 * FBO Passes operations class
 */
export class FBOPasses {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Create supply order pass with driver and vehicle data (endpoint 11)
   * @param params - Request parameters
   * @example await client.fbo.createSupplyOrderPass({ supply_order_id: 123456, driver_name: 'John Doe', vehicle_number: 'ABC123' });
   */
  async create(
    params: IV1SupplyOrderPassCreateRequest
  ): Promise<IHttpResponse<IV1SupplyOrderPassCreateResponse>> {
    return this.httpClient.post('/v1/supply-order/pass/create', params);
  }

  /**
   * Get supply order pass status (endpoint 12)
   * @param params - Request parameters
   * @example const status = await client.fbo.getSupplyOrderPassStatus({ supply_order_id: 123456 });
   */
  async getStatus(
    params: IV1SupplyOrderPassStatusRequest
  ): Promise<IHttpResponse<IV1SupplyOrderPassStatusResponse>> {
    return this.httpClient.post('/v1/supply-order/pass/status', params);
  }
}