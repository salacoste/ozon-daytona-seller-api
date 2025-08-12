/**
 * Pagination iterators for WarehouseAPI
 * 
 * Provides async iterators for paginated delivery method endpoints
 */

import type { IHttpResponse } from '../../http/types';
import type { WarehouseAPI } from './WarehouseAPI';
import type {
  IWarehouseDeliveryMethodListRequest,
  IWarehouseDeliveryMethodListResponse,
  IDeliveryMethodListResponseDeliveryMethod,
} from '../../types/generated/warehouseapi';

/**
 * Iterate through all delivery methods with automatic pagination
 * 
 * Uses offset-based pagination to automatically fetch all delivery methods
 * matching the provided filter criteria.
 * 
 * @param warehouseAPI - WarehouseAPI instance
 * @param baseParams - Base request parameters (offset will be managed automatically)
 * @yields Individual delivery method items
 * 
 * @example
 * ```typescript
 * // Iterate through all active delivery methods
 * for await (const method of iterateDeliveryMethods(client.warehouse, {
 *   filter: {
 *     status: 'ACTIVE'
 *   },
 *   limit: 50
 * })) {
 *   console.log(`Method: ${method.name} (ID: ${method.id})`);
 *   console.log(`Warehouse: ${method.warehouse_id}`);
 *   console.log(`Provider: ${method.provider_id}`);
 *   console.log(`Cutoff: ${method.cutoff}`);
 * }
 * ```
 * 
 * @example
 * ```typescript
 * // Get methods for specific warehouse with provider filtering
 * for await (const method of iterateDeliveryMethods(client.warehouse, {
 *   filter: {
 *     warehouse_id: 15588127982000,
 *     provider_id: 24, // Ozon Logistics
 *     status: 'ACTIVE'
 *   },
 *   limit: 25
 * })) {
 *   if (method.sla_cut_in && method.sla_cut_in < 1440) { // Less than 24 hours
 *     console.log(`Fast delivery: ${method.name} (${method.sla_cut_in} minutes)`);
 *   }
 * }
 * ```
 */
export async function* iterateDeliveryMethods(
  warehouseAPI: WarehouseAPI,
  baseParams: Omit<IWarehouseDeliveryMethodListRequest, 'offset'>
): AsyncGenerator<IDeliveryMethodListResponseDeliveryMethod, void, unknown> {
  let offset = 0;
  let hasMore = true;

  while (hasMore) {
    const response: IHttpResponse<IWarehouseDeliveryMethodListResponse> = await warehouseAPI.getDeliveryMethodList({
      ...baseParams,
      offset
    });

    const items = response.data.result || [];
    
    // Yield each item
    for (const item of items) {
      yield item;
    }

    // Check if there are more pages
    hasMore = response.data.has_next || false;
    offset += baseParams.limit || 50;

    // Safety check to prevent infinite loops
    if (items.length === 0) {
      break;
    }
  }
}