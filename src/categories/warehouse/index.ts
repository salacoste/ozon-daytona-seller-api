/**
 * WarehouseAPI implementation
 * Warehouse management operations
 *
 * 🏪 **Управление складами FBS и rFBS**
 * 🏪 **FBS and rFBS warehouse management**
 *
 * ⚠️ **Для получения списка складов FBO используйте метод /v1/cluster/list**
 * ⚠️ **For FBO warehouses list use /v1/cluster/list method**
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
 * // Get warehouses list (FBS and rFBS only)
 * const warehouses = await api.warehouse.getWarehousesList();
 * console.log('Available warehouses:', warehouses.result?.length);
 *
 * // Get delivery methods for specific warehouse
 * const deliveryMethods = await api.warehouse.getDeliveryMethods({
 *   limit: 10,
 *   filter: {
 *     warehouse_id: 123,
 *     status: 'ACTIVE'
 *   }
 * });
 * console.log('Delivery methods:', deliveryMethods.result?.length);
 * ```
 */

import { HttpClient } from "../../core/http.js";
import type { RequestOptions } from "../../core/types.js";

// Request types
import { WarehouseDeliveryMethodListRequest, WarehouseListRequest } from "../../types/requests/warehouse";

// Response types
import { WarehouseDeliveryMethodListResponse, WarehouseListResponse } from "../../types/responses/warehouse";

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
   *   limit: 20,
   *   offset: 0,
   *   filter: {
   *     warehouse_id: 123,
   *     status: 'ACTIVE',
   *     provider_id: 456
   *   }
   * });
   *
   * console.log(`Found ${methods.result?.length} methods`);
   * if (methods.has_next) {
   *   console.log('More methods available, use offset for pagination');
   * }
   *
   * methods.result?.forEach(method => {
   *   console.log(`ID: ${method.id}, Name: ${method.name}`);
   *   console.log(`Status: ${method.status}, Cutoff: ${method.cutoff}`);
   *   console.log(`Created: ${method.created_at}, Updated: ${method.updated_at}`);
   * });
   * ```
   */
  async getDeliveryMethods(request: WarehouseDeliveryMethodListRequest, options?: RequestOptions): Promise<WarehouseDeliveryMethodListResponse> {
    return this.httpClient.request<WarehouseDeliveryMethodListRequest, WarehouseDeliveryMethodListResponse>("POST", "/v1/delivery-method/list", request, options);
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
   * console.log('Total warehouses:', warehouses.result?.length);
   *
   * warehouses.result?.forEach(warehouse => {
   *   console.log(`${warehouse.name} (ID: ${warehouse.warehouse_id})`);
   *   console.log(`Status: ${warehouse.status}`);
   *   console.log(`rFBS: ${warehouse.is_rfbs ? 'Yes' : 'No'}`);
   *   console.log(`Economy goods: ${warehouse.is_economy ? 'Yes' : 'No'}`);
   *   console.log(`Large goods (KGT): ${warehouse.is_kgt ? 'Yes' : 'No'}`);
   *
   *   if (warehouse.has_postings_limit) {
   *     console.log(`Postings limit: ${warehouse.postings_limit} (min: ${warehouse.min_postings_limit})`);
   *   }
   *
   *   if (warehouse.working_days?.length) {
   *     const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
   *     const workingDayNames = warehouse.working_days.map(day => dayNames[parseInt(day) - 1]);
   *     console.log(`Working days: ${workingDayNames.join(', ')}`);
   *   }
   *
   *   if (warehouse.first_mile_type) {
   *     console.log(`First mile: ${warehouse.first_mile_type.first_mile_type}`);
   *     if (warehouse.first_mile_type.first_mile_is_changing) {
   *       console.log('Settings are being updated');
   *     }
   *   }
   * });
   * ```
   */
  async getWarehousesList(request: WarehouseListRequest = {}, options?: RequestOptions): Promise<WarehouseListResponse> {
    return this.httpClient.request<WarehouseListRequest, WarehouseListResponse>("POST", "/v1/warehouse/list", request, options);
  }
}
