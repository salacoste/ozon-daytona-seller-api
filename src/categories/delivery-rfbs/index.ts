/**
 * DeliveryrFBS API implementation
 * Return FBS delivery operations
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
 * // Set posting cutoff date
 * await api.deliveryRfbs.setCutoff({
 *   posting_number: 'FBS-123456789',
 *   cutoff_at: '2024-01-15T10:00:00Z'
 * });
 *
 * // Add tracking numbers
 * await api.deliveryRfbs.setTrackingNumbers({
 *   tracking_numbers: [
 *     {
 *       posting_number: 'FBS-123456789',
 *       tracking_number: 'TRACK123456',
 *       delivery_service: 'CDEK'
 *     }
 *   ]
 * });
 *
 * // Change status to delivered
 * await api.deliveryRfbs.setDelivered({
 *   posting_number: 'FBS-123456789',
 *   delivered_at: '2024-01-20T15:30:00Z'
 * });
 * ```
 */

import { HttpClient } from "../../core/http.js";
import type { RequestOptions } from "../../core/types.js";

// Request types
import {
  DeliveryRfbsSetCutoffRequest,
  DeliveryRfbsTimeslotChangeRestrictionsRequest,
  DeliveryRfbsTimeslotSetRequest,
  DeliveryRfbsPostingDeliveredRequest,
  DeliveryRfbsPostingDeliveringRequest,
  DeliveryRfbsPostingLastMileRequest,
  DeliveryRfbsPostingSentBySellerRequest,
  DeliveryRfbsTrackingNumberSetRequest,
} from "../../types/requests/delivery-rfbs";

// Response types
import {
  DeliveryRfbsSetCutoffResponse,
  DeliveryRfbsTimeslotChangeRestrictionsResponse,
  DeliveryRfbsTimeslotSetResponse,
  DeliveryRfbsPostingDeliveredResponse,
  DeliveryRfbsPostingDeliveringResponse,
  DeliveryRfbsPostingLastMileResponse,
  DeliveryRfbsPostingSentBySellerResponse,
  DeliveryRfbsTrackingNumberSetResponse,
} from "../../types/responses/delivery-rfbs";

/**
 * DeliveryrFBS API class
 * Handles return FBS delivery operations
 */
export class DeliveryRfbsApi {
  constructor(private readonly httpClient: HttpClient) {}
  /**
   * Уточнить дату отгрузки отправления
   * Set posting shipment cutoff date
   *
   * @param request - Cutoff date request
   * @param options - Request options
   * @returns Promise with operation result
   *
   * @example
   * ```typescript
   * const result = await api.deliveryRfbs.setCutoff({
   *   posting_number: 'FBS-123456789',
   *   cutoff_at: '2024-01-15T10:00:00Z'
   * });
   * console.log('Cutoff set:', result.result);
   * ```
   */
  async setCutoff(request: DeliveryRfbsSetCutoffRequest, options?: RequestOptions): Promise<DeliveryRfbsSetCutoffResponse> {
    return this.httpClient.request<DeliveryRfbsSetCutoffRequest, DeliveryRfbsSetCutoffResponse>("POST", "/v1/posting/cutoff/set", request, options);
  }

  /**
   * Получить доступные даты для переноса доставки
   * Get available dates for delivery rescheduling
   *
   * @param request - Timeslot change restrictions request
   * @param options - Request options
   * @returns Promise with available rescheduling dates
   *
   * @example
   * ```typescript
   * const restrictions = await api.deliveryRfbs.getTimeslotChangeRestrictions({
   *   posting_number: 'FBS-123456789'
   * });
   * console.log('Available dates:', restrictions.restrictions?.available_dates);
   * console.log('Remaining reschedules:', restrictions.restrictions?.available_reschedules);
   * ```
   */
  async getTimeslotChangeRestrictions(request: DeliveryRfbsTimeslotChangeRestrictionsRequest, options?: RequestOptions): Promise<DeliveryRfbsTimeslotChangeRestrictionsResponse> {
    return this.httpClient.request<DeliveryRfbsTimeslotChangeRestrictionsRequest, DeliveryRfbsTimeslotChangeRestrictionsResponse>("POST", "/v1/posting/fbs/timeslot/change-restrictions", request, options);
  }

  /**
   * Перенести дату доставки
   * Reschedule delivery date
   *
   * @param request - Timeslot set request
   * @param options - Request options
   * @returns Promise with rescheduling result
   *
   * @example
   * ```typescript
   * const result = await api.deliveryRfbs.setTimeslot({
   *   posting_number: 'FBS-123456789',
   *   timeslot_date: '2024-01-25'
   * });
   * console.log('New delivery date:', result.new_timeslot_date);
   * ```
   */
  async setTimeslot(request: DeliveryRfbsTimeslotSetRequest, options?: RequestOptions): Promise<DeliveryRfbsTimeslotSetResponse> {
    return this.httpClient.request<DeliveryRfbsTimeslotSetRequest, DeliveryRfbsTimeslotSetResponse>("POST", "/v1/posting/fbs/timeslot/set", request, options);
  }

  /**
   * Изменить статус на "Доставлено"
   * Change status to "Delivered"
   *
   * @param request - Delivered status request
   * @param options - Request options
   * @returns Promise with status change result
   *
   * @example
   * ```typescript
   * const result = await api.deliveryRfbs.setDelivered({
   *   posting_number: 'FBS-123456789',
   *   delivered_at: '2024-01-20T15:30:00Z'
   * });
   * console.log('Status changed:', result.status);
   * ```
   */
  async setDelivered(request: DeliveryRfbsPostingDeliveredRequest, options?: RequestOptions): Promise<DeliveryRfbsPostingDeliveredResponse> {
    return this.httpClient.request<DeliveryRfbsPostingDeliveredRequest, DeliveryRfbsPostingDeliveredResponse>("POST", "/v2/fbs/posting/delivered", request, options);
  }

  /**
   * Изменить статус на "Доставляется"
   * Change status to "Delivering"
   *
   * @param request - Delivering status request
   * @param options - Request options
   * @returns Promise with status change result
   *
   * @example
   * ```typescript
   * const result = await api.deliveryRfbs.setDelivering({
   *   posting_number: 'FBS-123456789',
   *   delivering_at: '2024-01-18T09:00:00Z'
   * });
   * console.log('Status changed to delivering:', result.status);
   * ```
   */
  async setDelivering(request: DeliveryRfbsPostingDeliveringRequest, options?: RequestOptions): Promise<DeliveryRfbsPostingDeliveringResponse> {
    return this.httpClient.request<DeliveryRfbsPostingDeliveringRequest, DeliveryRfbsPostingDeliveringResponse>("POST", "/v2/fbs/posting/delivering", request, options);
  }

  /**
   * Изменить статус на "Последняя миля"
   * Change status to "Last mile"
   *
   * @param request - Last mile status request
   * @param options - Request options
   * @returns Promise with status change result
   *
   * @example
   * ```typescript
   * const result = await api.deliveryRfbs.setLastMile({
   *   posting_number: 'FBS-123456789',
   *   last_mile_at: '2024-01-19T14:00:00Z'
   * });
   * console.log('Last mile started:', result.status);
   * ```
   */
  async setLastMile(request: DeliveryRfbsPostingLastMileRequest, options?: RequestOptions): Promise<DeliveryRfbsPostingLastMileResponse> {
    return this.httpClient.request<DeliveryRfbsPostingLastMileRequest, DeliveryRfbsPostingLastMileResponse>("POST", "/v2/fbs/posting/last-mile", request, options);
  }

  /**
   * Изменить статус на "Отправлено продавцом"
   * Change status to "Sent by seller"
   *
   * @param request - Sent by seller status request
   * @param options - Request options
   * @returns Promise with status change result
   *
   * @example
   * ```typescript
   * const result = await api.deliveryRfbs.setSentBySeller({
   *   posting_number: 'FBS-123456789',
   *   sent_by_seller_at: '2024-01-15T12:00:00Z'
   * });
   * console.log('Sent by seller:', result.posting_number);
   * ```
   */
  async setSentBySeller(request: DeliveryRfbsPostingSentBySellerRequest, options?: RequestOptions): Promise<DeliveryRfbsPostingSentBySellerResponse> {
    return this.httpClient.request<DeliveryRfbsPostingSentBySellerRequest, DeliveryRfbsPostingSentBySellerResponse>("POST", "/v2/fbs/posting/sent-by-seller", request, options);
  }

  /**
   * Добавить трек-номера к отправлениям
   * Add tracking numbers to postings
   *
   * @param request - Tracking numbers request
   * @param options - Request options
   * @returns Promise with tracking numbers addition results
   *
   * @example
   * ```typescript
   * const result = await api.deliveryRfbs.setTrackingNumbers({
   *   tracking_numbers: [
   *     {
   *       posting_number: 'FBS-123456789',
   *       tracking_number: 'TRACK123456',
   *       delivery_service: 'CDEK'
   *     },
   *     {
   *       posting_number: 'FBS-987654321',
   *       tracking_number: 'TRACK789012',
   *       delivery_service: 'Russian Post'
   *     }
   *   ]
   * });
   * result.results?.forEach(res => {
   *   console.log(`${res.posting_number}: ${res.result}`);
   * });
   * ```
   */
  async setTrackingNumbers(request: DeliveryRfbsTrackingNumberSetRequest, options?: RequestOptions): Promise<DeliveryRfbsTrackingNumberSetResponse> {
    return this.httpClient.request<DeliveryRfbsTrackingNumberSetRequest, DeliveryRfbsTrackingNumberSetResponse>("POST", "/v2/fbs/posting/tracking-number/set", request, options);
  }
}
