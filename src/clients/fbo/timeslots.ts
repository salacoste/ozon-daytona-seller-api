/**
 * FBO Timeslots operations - endpoints (8-10)
 * 
 * Handles timeslot management:
 * - Getting available timeslots
 * - Updating timeslot assignments
 * - Checking timeslot status
 */

import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type {
  IV1GetSupplyOrderTimeslotsRequest,
  IV1GetSupplyOrderTimeslotsResponse,
  IV1UpdateSupplyOrderTimeslotRequest,
  IV1UpdateSupplyOrderTimeslotResponse,
  IV1GetSupplyOrderTimeslotStatusRequest,
  IV1GetSupplyOrderTimeslotStatusResponse,
} from '../../types/generated/fbo';

/**
 * FBO Timeslots operations class
 */
export class FBOTimeslots {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Get supply order timeslots (endpoint 8)
   * @param params - Request parameters
   * @example const timeslots = await client.fbo.getSupplyOrderTimeslots({ supply_order_id: 123456 });
   */
  async get(
    params: IV1GetSupplyOrderTimeslotsRequest
  ): Promise<IHttpResponse<IV1GetSupplyOrderTimeslotsResponse>> {
    return this.httpClient.post('/v1/supply-order/timeslot/get', params);
  }

  /**
   * Update supply order timeslot (endpoint 9)
   * @param params - Request parameters
   * @example await client.fbo.updateSupplyOrderTimeslot({ supply_order_id: 123456, timeslot_id: 789 });
   */
  async update(
    params: IV1UpdateSupplyOrderTimeslotRequest
  ): Promise<IHttpResponse<IV1UpdateSupplyOrderTimeslotResponse>> {
    return this.httpClient.post('/v1/supply-order/timeslot/update', params);
  }

  /**
   * Get supply order timeslot status (endpoint 10)
   * @param params - Request parameters
   * @example const status = await client.fbo.getSupplyOrderTimeslotStatus({ supply_order_id: 123456 });
   */
  async getStatus(
    params: IV1GetSupplyOrderTimeslotStatusRequest
  ): Promise<IHttpResponse<IV1GetSupplyOrderTimeslotStatusResponse>> {
    return this.httpClient.post('/v1/supply-order/timeslot/status', params);
  }
}