/**
 * FBO API implementation
 * Fulfillment by OZON operations
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
 * // Get warehouse availability
 * const warehouses = await api.fbo.getWarehouseAvailability();
 * console.log('Available warehouses:', warehouses.warehouses);
 *
 * // Get posting information
 * const posting = await api.fbo.getPosting({
 *   posting_number: 'FBO-123456789',
 *   with: { analytics_data: true, financial_data: true }
 * });
 *
 * // Get supply orders list
 * const orders = await api.fbo.getSupplyOrdersList({
 *   since: '2024-01-01T00:00:00Z',
 *   to: '2024-01-31T23:59:59Z',
 *   filter: { status: ['created', 'confirmed'] }
 * });
 * ```
 */

import { HttpClient } from "../../core/http.js";
import type { RequestOptions } from "../../core/types.js";

// Request types
import {
  FboCancelReasonListRequest,
  FboWarehouseAvailabilityRequest,
  FboSupplyOrderBundleRequest,
  FboSupplyOrderPassCreateRequest,
  FboSupplyOrderPassStatusRequest,
  FboSupplyOrderStatusCounterRequest,
  FboSupplyOrderTimeslotGetRequest,
  FboSupplyOrderTimeslotStatusRequest,
  FboSupplyOrderTimeslotUpdateRequest,
  FboPostingGetRequest,
  FboPostingListRequest,
  FboSupplyOrderGetRequest,
  FboSupplyOrderListRequest,
} from "../../types/requests/fbo";

// Response types
import {
  FboCancelReasonListResponse,
  FboWarehouseAvailabilityResponse,
  FboSupplyOrderBundleResponse,
  FboSupplyOrderPassCreateResponse,
  FboSupplyOrderPassStatusResponse,
  FboSupplyOrderStatusCounterResponse,
  FboSupplyOrderTimeslotGetResponse,
  FboSupplyOrderTimeslotStatusResponse,
  FboSupplyOrderTimeslotUpdateResponse,
  FboPostingGetResponse,
  FboPostingListResponse,
  FboSupplyOrderGetResponse,
  FboSupplyOrderListResponse,
} from "../../types/responses/fbo";

/**
 * FBO API class
 * Handles Fulfillment by OZON operations
 */
export class FboApi {
  constructor(private readonly httpClient: HttpClient) {}
  /**
   * Получить список причин отмены отправлений FBO
   * Get FBO posting cancel reasons list
   *
   * @param request - Cancel reasons request
   * @param options - Request options
   * @returns Promise with cancel reasons list
   *
   * @example
   * ```typescript
   * const reasons = await api.fbo.getCancelReasons();
   * console.log('Available cancel reasons:', reasons.cancel_reasons);
   * ```
   */
  async getCancelReasons(request: FboCancelReasonListRequest = {}, options?: RequestOptions): Promise<FboCancelReasonListResponse> {
    return this.httpClient.request<FboCancelReasonListRequest, FboCancelReasonListResponse>("POST", "/v1/posting/fbo/cancel-reason/list", request, options);
  }

  /**
   * Получить информацию о загруженности складов Ozon
   * Get Ozon warehouse availability information
   *
   * @param request - Warehouse availability request
   * @param options - Request options
   * @returns Promise with warehouse availability data
   *
   * @example
   * ```typescript
   * const availability = await api.fbo.getWarehouseAvailability();
   * availability.warehouses?.forEach(warehouse => {
   *   console.log(`${warehouse.name}: ${warehouse.capacity_utilization}% utilized`);
   * });
   * ```
   */
  async getWarehouseAvailability(request: FboWarehouseAvailabilityRequest = {}, options?: RequestOptions): Promise<FboWarehouseAvailabilityResponse> {
    return this.httpClient.request<FboWarehouseAvailabilityRequest, FboWarehouseAvailabilityResponse>("GET", "/v1/supplier/available_warehouses", request, options);
  }

  /**
   * Получить состав поставки или заявки на поставку
   * Get supply order bundle composition
   *
   * @param request - Supply order bundle request
   * @param options - Request options
   * @returns Promise with supply order bundle information
   *
   * @example
   * ```typescript
   * const bundle = await api.fbo.getSupplyOrderBundle({
   *   supply_order_id: 123456
   * });
   * console.log('Products in order:', bundle.products?.length);
   * console.log('Total amount:', bundle.total_amount);
   * ```
   */
  async getSupplyOrderBundle(request: FboSupplyOrderBundleRequest, options?: RequestOptions): Promise<FboSupplyOrderBundleResponse> {
    return this.httpClient.request<FboSupplyOrderBundleRequest, FboSupplyOrderBundleResponse>("POST", "/v1/supply-order/bundle", request, options);
  }

  /**
   * Указать данные о водителе и автомобиле
   * Set driver and vehicle data
   *
   * @param request - Driver and vehicle data request
   * @param options - Request options
   * @returns Promise with creation task information
   *
   * @example
   * ```typescript
   * const result = await api.fbo.createSupplyOrderPass({
   *   supply_order_id: 123456,
   *   driver: {
   *     name: 'Иванов Иван Иванович',
   *     phone: '+7 (999) 123-45-67',
   *     passport: '1234 567890'
   *   },
   *   vehicle: {
   *     model: 'ГАЗель NEXT',
   *     license_plate: 'А123БВ777',
   *     color: 'белый'
   *   }
   * });
   * console.log('Task ID:', result.task_id);
   * ```
   */
  async createSupplyOrderPass(request: FboSupplyOrderPassCreateRequest, options?: RequestOptions): Promise<FboSupplyOrderPassCreateResponse> {
    return this.httpClient.request<FboSupplyOrderPassCreateRequest, FboSupplyOrderPassCreateResponse>("POST", "/v1/supply-order/pass/create", request, options);
  }

  /**
   * Получить статус ввода данных о водителе и автомобиле
   * Get driver and vehicle data status
   *
   * @param request - Pass status request
   * @param options - Request options
   * @returns Promise with pass data status
   *
   * @example
   * ```typescript
   * const status = await api.fbo.getSupplyOrderPassStatus({
   *   supply_order_id: 123456
   * });
   * console.log('Pass status:', status.status);
   * if (status.status === 'rejected') {
   *   console.log('Rejection reason:', status.rejection_reason);
   * }
   * ```
   */
  async getSupplyOrderPassStatus(request: FboSupplyOrderPassStatusRequest, options?: RequestOptions): Promise<FboSupplyOrderPassStatusResponse> {
    return this.httpClient.request<FboSupplyOrderPassStatusRequest, FboSupplyOrderPassStatusResponse>("POST", "/v1/supply-order/pass/status", request, options);
  }

  /**
   * Получить количество заявок по статусам
   * Get supply orders count by statuses
   *
   * @param request - Status counter request
   * @param options - Request options
   * @returns Promise with orders count by status
   *
   * @example
   * ```typescript
   * const counters = await api.fbo.getSupplyOrderStatusCounter();
   * counters.counters?.forEach(counter => {
   *   console.log(`Status ${counter.status}: ${counter.count} orders`);
   * });
   * console.log('Total orders:', counters.total);
   * ```
   */
  async getSupplyOrderStatusCounter(request: FboSupplyOrderStatusCounterRequest = {}, options?: RequestOptions): Promise<FboSupplyOrderStatusCounterResponse> {
    return this.httpClient.request<FboSupplyOrderStatusCounterRequest, FboSupplyOrderStatusCounterResponse>("POST", "/v1/supply-order/status/counter", request, options);
  }

  /**
   * Получить интервалы поставки
   * Get supply order timeslots
   *
   * @param request - Timeslots request
   * @param options - Request options
   * @returns Promise with available timeslots
   *
   * @example
   * ```typescript
   * const timeslots = await api.fbo.getSupplyOrderTimeslots({
   *   warehouse_id: 123,
   *   date_from: '2024-01-01T00:00:00Z',
   *   date_to: '2024-01-31T23:59:59Z'
   * });
   * timeslots.timeslots?.forEach(slot => {
   *   console.log(`Timeslot ${slot.timeslot_id}: ${slot.start_time} - ${slot.end_time}`);
   *   console.log(`Available: ${slot.is_available}, Max pallets: ${slot.max_pallets}`);
   * });
   * ```
   */
  async getSupplyOrderTimeslots(request: FboSupplyOrderTimeslotGetRequest, options?: RequestOptions): Promise<FboSupplyOrderTimeslotGetResponse> {
    return this.httpClient.request<FboSupplyOrderTimeslotGetRequest, FboSupplyOrderTimeslotGetResponse>("POST", "/v1/supply-order/timeslot/get", request, options);
  }

  /**
   * Получить статус интервала поставки
   * Get supply order timeslot status
   *
   * @param request - Timeslot status request
   * @param options - Request options
   * @returns Promise with timeslot status
   *
   * @example
   * ```typescript
   * const status = await api.fbo.getSupplyOrderTimeslotStatus({
   *   timeslot_id: 'timeslot_123'
   * });
   * console.log('Booking status:', status.booking_status);
   * console.log('Current occupancy:', status.timeslot?.current_occupancy);
   * ```
   */
  async getSupplyOrderTimeslotStatus(request: FboSupplyOrderTimeslotStatusRequest, options?: RequestOptions): Promise<FboSupplyOrderTimeslotStatusResponse> {
    return this.httpClient.request<FboSupplyOrderTimeslotStatusRequest, FboSupplyOrderTimeslotStatusResponse>("POST", "/v1/supply-order/timeslot/status", request, options);
  }

  /**
   * Обновить интервал поставки
   * Update supply order timeslot
   *
   * @param request - Timeslot update request
   * @param options - Request options
   * @returns Promise with update task information
   *
   * @example
   * ```typescript
   * const result = await api.fbo.updateSupplyOrderTimeslot({
   *   supply_order_id: 123456,
   *   timeslot_id: 'new_timeslot_789'
   * });
   * console.log('Update task ID:', result.task_id);
   * ```
   */
  async updateSupplyOrderTimeslot(request: FboSupplyOrderTimeslotUpdateRequest, options?: RequestOptions): Promise<FboSupplyOrderTimeslotUpdateResponse> {
    return this.httpClient.request<FboSupplyOrderTimeslotUpdateRequest, FboSupplyOrderTimeslotUpdateResponse>("POST", "/v1/supply-order/timeslot/update", request, options);
  }

  /**
   * Получить информацию об отправлении FBO
   * Get FBO posting information
   *
   * @param request - FBO posting request
   * @param options - Request options
   * @returns Promise with posting information
   *
   * @example
   * ```typescript
   * const posting = await api.fbo.getPosting({
   *   posting_number: 'FBO-123456789',
   *   with: {
   *     analytics_data: true,
   *     products: true,
   *     financial_data: true
   *   }
   * });
   * console.log('Posting status:', posting.posting?.status);
   * console.log('Products:', posting.posting?.products?.length);
   * console.log('Payout amount:', posting.posting?.financial_data?.payout_amount);
   * ```
   */
  async getPosting(request: FboPostingGetRequest, options?: RequestOptions): Promise<FboPostingGetResponse> {
    return this.httpClient.request<FboPostingGetRequest, FboPostingGetResponse>("POST", "/v2/posting/fbo/get", request, options);
  }

  /**
   * Получить список отправлений FBO
   * Get FBO postings list
   *
   * @param request - FBO postings list request
   * @param options - Request options
   * @returns Promise with postings list
   *
   * @example
   * ```typescript
   * const postings = await api.fbo.getPostingsList({
   *   since: '2024-01-01T00:00:00Z',
   *   to: '2024-01-31T23:59:59Z',
   *   filter: {
   *     status: ['shipped', 'delivered'],
   *     warehouse_id: [123, 456]
   *   },
   *   with: { analytics_data: true },
   *   limit: 100
   * });
   * console.log('Found postings:', postings.total);
   * postings.postings?.forEach(posting => {
   *   console.log(`${posting.posting_number}: ${posting.status}`);
   * });
   * ```
   */
  async getPostingsList(request: FboPostingListRequest, options?: RequestOptions): Promise<FboPostingListResponse> {
    return this.httpClient.request<FboPostingListRequest, FboPostingListResponse>("POST", "/v2/posting/fbo/list", request, options);
  }

  /**
   * Получить информацию о заявке на поставку
   * Get supply order information
   *
   * @param request - Supply order request
   * @param options - Request options
   * @returns Promise with supply order information
   *
   * @example
   * ```typescript
   * const order = await api.fbo.getSupplyOrder({
   *   supply_order_id: 123456
   * });
   * console.log('Order status:', order.supply_order?.status);
   * console.log('Planned delivery:', order.supply_order?.planned_delivery_date);
   * console.log('Total products:', order.supply_order?.total_products);
   * ```
   */
  async getSupplyOrder(request: FboSupplyOrderGetRequest, options?: RequestOptions): Promise<FboSupplyOrderGetResponse> {
    return this.httpClient.request<FboSupplyOrderGetRequest, FboSupplyOrderGetResponse>("POST", "/v2/supply-order/get", request, options);
  }

  /**
   * Получить список заявок на поставку
   * Get supply orders list
   *
   * @param request - Supply orders list request
   * @param options - Request options
   * @returns Promise with supply orders list
   *
   * @example
   * ```typescript
   * const orders = await api.fbo.getSupplyOrdersList({
   *   since: '2024-01-01T00:00:00Z',
   *   to: '2024-01-31T23:59:59Z',
   *   filter: {
   *     status: ['created', 'confirmed', 'shipped'],
   *     warehouse_id: [123]
   *   },
   *   limit: 50
   * });
   * console.log('Found orders:', orders.total);
   * orders.supply_orders?.forEach(order => {
   *   console.log(`Order ${order.supply_order_id}: ${order.status}`);
   * });
   * ```
   */
  async getSupplyOrdersList(request: FboSupplyOrderListRequest, options?: RequestOptions): Promise<FboSupplyOrderListResponse> {
    return this.httpClient.request<FboSupplyOrderListRequest, FboSupplyOrderListResponse>("POST", "/v2/supply-order/list", request, options);
  }
}
