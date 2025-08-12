/**
 * WarehouseAPI client - Warehouse and delivery method management
 * 
 * Provides access to warehouse information and delivery method configuration
 * for FBS and rFBS warehouses.
 * 
 * Features:
 * - Get list of available warehouses
 * - Get delivery methods with filtering and pagination
 */

import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type {
  IWarehouseListResponse,
  IWarehouseDeliveryMethodListRequest,
  IWarehouseDeliveryMethodListResponse,
  IDeliveryMethodListResponseDeliveryMethod,
} from '../../types/generated/warehouseapi';
import { iterateDeliveryMethods } from './iterators';

/**
 * WarehouseAPI client for warehouse and delivery method operations
 * 
 * @example
 * ```typescript
 * import { OzonClient } from '@ozon/sdk';
 * 
 * const client = new OzonClient({ clientId, apiKey });
 * 
 * // Get all warehouses
 * const warehouses = await client.warehouse.getWarehouseList();
 * 
 * // Get delivery methods for specific warehouse
 * const deliveryMethods = await client.warehouse.getDeliveryMethodList({
 *   filter: {
 *     warehouse_id: 15588127982000,
 *     status: 'ACTIVE'
 *   },
 *   limit: 50
 * });
 * ```
 */
export class WarehouseAPI {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Get list of FBS and rFBS warehouses
   * 
   * Returns information about available warehouses including their configuration,
   * capabilities, and working status. To get FBO warehouses, use separate cluster API.
   * 
   * @returns Warehouse list response
   * 
   * @example
   * ```typescript
   * const response = await client.warehouse.getWarehouseList();
   * 
   * for (const warehouse of response.data.result || []) {
   *   console.log(`Warehouse: ${warehouse.name} (ID: ${warehouse.warehouse_id})`);
   *   console.log(`Status: ${warehouse.status}`);
   *   console.log(`rFBS: ${warehouse.is_rfbs ? 'Yes' : 'No'}`);
   *   console.log(`Economy products: ${warehouse.is_economy ? 'Yes' : 'No'}`);
   *   
   *   if (warehouse.working_days) {
   *     console.log(`Working days: ${warehouse.working_days.join(', ')}`);
   *   }
   *   
   *   if (warehouse.postings_limit && warehouse.postings_limit > 0) {
   *     console.log(`Posting limit: ${warehouse.postings_limit} orders`);
   *   }
   * }
   * ```
   */
  async getWarehouseList(): Promise<IHttpResponse<IWarehouseListResponse>> {
    return this.httpClient.post('/v1/warehouse/list', {});
  }

  /**
   * Get delivery methods with filtering and pagination
   * 
   * Returns list of available delivery methods for warehouses with detailed
   * configuration including cutoff times, SLA, and provider information.
   * Supports offset-based pagination.
   * 
   * @param params - Request parameters with filtering and pagination
   * @returns Delivery methods list response with pagination info
   * 
   * @example
   * ```typescript
   * // Get active delivery methods for specific warehouse
   * const response = await client.warehouse.getDeliveryMethodList({
   *   filter: {
   *     warehouse_id: 15588127982000,
   *     status: 'ACTIVE',
   *     provider_id: 24  // Ozon Logistics
   *   },
   *   limit: 25,
   *   offset: 0
   * });
   * 
   * console.log(`Found ${response.data.result?.length} delivery methods`);
   * console.log(`Has more: ${response.data.has_next}`);
   * 
   * for (const method of response.data.result || []) {
   *   console.log(`Method: ${method.name}`);
   *   console.log(`Cutoff: ${method.cutoff}`);
   *   console.log(`SLA: ${method.sla_cut_in} minutes`);
   *   console.log(`Provider: ${method.provider_id}`);
   *   console.log(`Status: ${method.status}`);
   * }
   * ```
   * 
   * @example
   * ```typescript
   * // Get all delivery methods with pagination
   * let offset = 0;
   * const limit = 50;
   * let hasMore = true;
   * 
   * while (hasMore) {
   *   const response = await client.warehouse.getDeliveryMethodList({
   *     filter: { status: 'ACTIVE' },
   *     limit,
   *     offset
   *   });
   *   
   *   // Process methods
   *   for (const method of response.data.result || []) {
   *     console.log(`Processing method: ${method.name}`);
   *   }
   *   
   *   hasMore = response.data.has_next || false;
   *   offset += limit;
   * }
   * ```
   */
  async getDeliveryMethodList(
    params: IWarehouseDeliveryMethodListRequest
  ): Promise<IHttpResponse<IWarehouseDeliveryMethodListResponse>> {
    return this.httpClient.post('/v1/delivery-method/list', params);
  }

  /**
   * Iterate through all delivery methods with automatic pagination
   * 
   * This is a convenience method that automatically handles pagination
   * and yields individual delivery method items.
   * 
   * @param params - Request parameters (offset will be managed automatically)
   * @returns AsyncGenerator that yields delivery method items
   * 
   * @example
   * ```typescript
   * // Iterate through all active delivery methods for a warehouse
   * for await (const method of client.warehouse.iterateDeliveryMethods({
   *   filter: {
   *     warehouse_id: 15588127982000,
   *     status: 'ACTIVE'
   *   },
   *   limit: 50
   * })) {
   *   console.log(`Method: ${method.name} (ID: ${method.id})`);
   *   console.log(`Provider: ${method.provider_id}`);
   *   console.log(`Cutoff: ${method.cutoff}`);
   *   console.log(`SLA: ${method.sla_cut_in} minutes`);
   * }
   * ```
   */
  iterateDeliveryMethods(
    params: Omit<IWarehouseDeliveryMethodListRequest, 'offset'>
  ): AsyncGenerator<IDeliveryMethodListResponseDeliveryMethod, void, unknown> {
    return iterateDeliveryMethods(this, params);
  }
}