/**
 * DeliveryFBS Carriage Management
 * 
 * Handles carriage (shipment) lifecycle operations including creation,
 * approval, modification, and cancellation for FBS deliveries.
 */

import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type {
  CreateCarriageRequest,
  ApproveCarriageRequest,
  SetPostingsRequest,
  CancelCarriageRequest,
  GetCarriageDeliveryListRequest,
  GetCarriageRequest,
  CreateCarriageResponse,
  ApproveCarriageResponse,
  SetPostingsResponse,
  CancelCarriageResponse,
  GetCarriageDeliveryListResponse,
  GetCarriageResponse
} from './types';

/**
 * Carriage Management operations for FBS deliveries
 */
export class DeliveryFbsCarriageManager {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Create carriage (shipment)
   * 
   * Creates the first FBS shipment that includes all postings with 
   * "Ready for shipment" status. The created carriage gets 'new' status.
   * 
   * ⚠️ **For non-Russian sellers**: Check availability of recommended time 
   * in your seller cabinet. If unavailable, use /v2/posting/fbs/act/create instead.
   * 
   * @param params - Carriage creation parameters
   * @returns Created carriage information
   * 
   * @example
   * ```typescript
   * const result = await carriageManager.createCarriage({
   *   delivery_method_id: 123,
   *   departure_date: '2024-01-15T10:00:00Z'
   * });
   * 
   * console.log(`Created carriage ${result.data.carriage?.carriage_id}`);
   * console.log(`Status: ${result.data.carriage?.status}`); // 'new'
   * ```
   */
  async createCarriage(
    params: CreateCarriageRequest
  ): Promise<IHttpResponse<CreateCarriageResponse>> {
    return this.httpClient.post('/v1/carriage/create', params);
  }

  /**
   * Approve carriage
   * 
   * Confirms the carriage after creation. After approval, the carriage 
   * transitions to "Formed" status.
   * 
   * After approval you can get shipment documents using:
   * - /v2/posting/fbs/digital/act/get-pdf (shipment list)
   * - /v2/posting/fbs/act/get-barcode (shipment barcode)
   * 
   * @param params - Carriage approval parameters
   * @returns Approval result
   * 
   * @example
   * ```typescript
   * await carriageManager.approveCarriage({
   *   carriage_id: 456
   * });
   * 
   * console.log('Carriage approved and moved to "Formed" status');
   * ```
   */
  async approveCarriage(
    params: ApproveCarriageRequest
  ): Promise<IHttpResponse<ApproveCarriageResponse>> {
    return this.httpClient.post('/v1/carriage/approve', params);
  }

  /**
   * Set postings for carriage
   * 
   * ⚠️ **Not available for CIS sellers**
   * 
   * Completely overwrites the list of orders in the carriage. Only pass orders
   * that are in "Awaiting shipment" status and you're ready to ship.
   * 
   * @param params - Postings assignment parameters
   * @returns Assignment result
   * 
   * @example
   * ```typescript
   * await carriageManager.setPostings({
   *   carriage_id: 456,
   *   posting_number: ['58544282-0057-1', '58544282-0058-1']
   * });
   * ```
   */
  async setPostings(
    params: SetPostingsRequest
  ): Promise<IHttpResponse<SetPostingsResponse>> {
    return this.httpClient.post('/v1/carriage/set-postings', params);
  }

  /**
   * Cancel carriage
   * 
   * Deletes the carriage. Use this method to return to the original order list
   * and create a new carriage.
   * 
   * @param params - Carriage cancellation parameters
   * @returns Cancellation result
   * 
   * @example
   * ```typescript
   * await carriageManager.cancelCarriage({
   *   carriage_id: 456
   * });
   * ```
   */
  async cancelCarriage(
    params: CancelCarriageRequest
  ): Promise<IHttpResponse<CancelCarriageResponse>> {
    return this.httpClient.post('/v1/carriage/cancel', params);
  }

  /**
   * Get delivery methods and carriages list
   * 
   * Returns list of created carriages for delivery methods and their statuses.
   * 
   * @param params - List parameters with optional filters
   * @returns Delivery methods with carriages
   * 
   * @example
   * ```typescript
   * const result = await carriageManager.getCarriageDeliveryList({
   *   delivery_method_id: 123,
   *   date_from: '2024-01-01',
   *   date_to: '2024-01-31'
   * });
   * 
   * result.data.methods?.forEach(method => {
   *   console.log(`Method: ${method.delivery_method?.name}`);
   *   method.carriages?.forEach(carriage => {
   *     console.log(`  Carriage ${carriage.carriage_id}: ${carriage.status}`);
   *   });
   * });
   * ```
   */
  async getCarriageDeliveryList(
    params: GetCarriageDeliveryListRequest
  ): Promise<IHttpResponse<GetCarriageDeliveryListResponse>> {
    return this.httpClient.post('/v1/carriage/delivery/list', params);
  }

  /**
   * Get carriage information
   * 
   * Returns detailed information about a specific carriage.
   * 
   * @param params - Carriage information request
   * @returns Detailed carriage information
   * 
   * @example
   * ```typescript
   * const result = await carriageManager.getCarriage({
   *   carriage_id: 456
   * });
   * 
   * const carriage = result.data.carriage;
   * console.log(`Carriage ${carriage?.carriage_id}`);
   * console.log(`Status: ${carriage?.status}`);
   * console.log(`Created: ${carriage?.created_at}`);
   * ```
   */
  async getCarriage(
    params: GetCarriageRequest
  ): Promise<IHttpResponse<GetCarriageResponse>> {
    return this.httpClient.post('/v1/carriage/get', params);
  }
}