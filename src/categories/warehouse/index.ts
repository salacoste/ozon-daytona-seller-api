/**
 * WarehouseAPI implementation
 * Warehouse management operations
 * 
 * @example
 * ```typescript
 * import { OzonSellerAPI } from 'bmad-ozon-seller-api';
 * 
 * const api = new OzonSellerAPI({
 *   clientId: 'your-client-id',
 *   apiKey: 'your-api-key'
 * });
 * 
 * // Get warehouses list
 * const warehouses = await api.warehouse.getWarehousesList();
 * console.log('Available warehouses:', warehouses.warehouses?.length);
 * 
 * // Get delivery methods for specific warehouse
 * const deliveryMethods = await api.warehouse.getDeliveryMethods({
 *   warehouse_id: 123,
 *   delivery_type: 'courier'
 * });
 * console.log('Delivery methods:', deliveryMethods.delivery_methods?.length);
 * ```
 */

import { HttpClient } from '../../core/http.js';
import type { RequestOptions } from '../../core/types.js';

// Request types
import {
  WarehouseDeliveryMethodListRequest,
  WarehouseListRequest,
} from '../../types/requests/warehouse';

// Response types
import {
  WarehouseDeliveryMethodListResponse,
  WarehouseListResponse,
} from '../../types/responses/warehouse';

/**
 * WarehouseAPI class
 * Handles warehouse management operations
 */
export class WarehouseApi {
  constructor(private readonly httpClient: HttpClient) {}
  /**
   * Получить список методов доставки склада
   * Get warehouse delivery methods list
   * 
   * @param request - Delivery methods request
   * @param options - Request options
   * @returns Promise with delivery methods list
   * 
   * @example
   * ```typescript
   * const methods = await api.warehouse.getDeliveryMethods({
   *   warehouse_id: 123,
   *   delivery_type: 'courier'
   * });
   * methods.delivery_methods?.forEach(method => {
   *   console.log(`${method.name}: ${method.cost} ${method.currency}`);
   *   console.log(`Delivery time: ${method.delivery_days} days`);
   * });
   * ```
   */
  async getDeliveryMethods(
    request: WarehouseDeliveryMethodListRequest,
    options?: RequestOptions
  ): Promise<WarehouseDeliveryMethodListResponse> {
    return this.httpClient.request<
      WarehouseDeliveryMethodListRequest,
      WarehouseDeliveryMethodListResponse
    >(
      'POST',
      '/v1/delivery-method/list',
      request,
      options
    );
  }

  /**
   * Получить список складов
   * Get warehouses list
   * 
   * @param request - Warehouses list request
   * @param options - Request options
   * @returns Promise with warehouses list
   * 
   * @example
   * ```typescript
   * const warehouses = await api.warehouse.getWarehousesList();
   * console.log('Total warehouses:', warehouses.total);
   * warehouses.warehouses?.forEach(warehouse => {
   *   console.log(`${warehouse.name} (${warehouse.type})`);
   *   console.log(`Address: ${warehouse.address}, ${warehouse.city}`);
   *   console.log(`Active: ${warehouse.is_active}`);
   *   if (warehouse.working_hours) {
   *     console.log('Working hours:');
   *     warehouse.working_hours.forEach(hours => {
   *       if (hours.is_day_off) {
   *         console.log(`  ${hours.day}: Day off`);
   *       } else {
   *         console.log(`  ${hours.day}: ${hours.open_time} - ${hours.close_time}`);
   *       }
   *     });
   *   }
   * });
   * ```
   */
  async getWarehousesList(
    request: WarehouseListRequest = {},
    options?: RequestOptions
  ): Promise<WarehouseListResponse> {
    return this.httpClient.request<
      WarehouseListRequest,
      WarehouseListResponse
    >(
      'POST',
      '/v1/warehouse/list',
      request,
      options
    );
  }
}