/**
 * DeliveryrFBSAPI client for Ozon Seller API
 * 
 * Implements delivery status management for rFBS from /methods/12-deliveryrfbs.json:
 * - Track-номер management for shipments
 * - Delivery status updates (sent, delivering, last mile, delivered)  
 * - Delivery timeslot rescheduling
 * - Shipment cutoff date management
 * 
 * Handles rFBS delivery lifecycle from shipment tracking to final delivery confirmation.
 */

import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type {
  // Request types
  SetTrackingNumbersRequest,
  SetSentBySellerRequest,
  SetDeliveringRequest,
  SetLastMileRequest,
  SetDeliveredRequest,
  GetTimeslotChangeRestrictionsRequest,
  SetTimeslotRequest,
  SetCutoffRequest,
  
  // Response types
  SetTrackingNumbersResponse,
  SetSentBySellerResponse,
  SetDeliveringResponse,
  SetLastMileResponse,
  SetDeliveredResponse,
  GetTimeslotChangeRestrictionsResponse,
  SetTimeslotResponse,
  SetCutoffResponse,
  
  // Base types  
  StatusChangeResult
} from './types';

/**
 * DeliveryrFBSAPI client for rFBS delivery status management
 * 
 * Provides comprehensive delivery lifecycle management for rFBS orders including
 * tracking number assignment, status transitions, and delivery rescheduling.
 * 
 * **Key Features:**
 * - **Tracking Management**: Assign and manage tracking numbers (up to 20 per request)
 * - **Status Updates**: Progress orders through delivery pipeline  
 * - **Delivery Scheduling**: Reschedule delivery dates and manage timeslots
 * - **International Support**: Special handling for cross-border sellers
 * 
 * **Delivery Status Flow:**
 * 1. `setTrackingNumbers()` - Assign tracking numbers to postings
 * 2. `setSentBySeller()` - Mark as shipped (international sellers)
 * 3. `setDelivering()` - Update to delivering status  
 * 4. `setLastMile()` - Enter final delivery phase
 * 5. `setDelivered()` - Confirm final delivery
 * 
 * @example
 * ```typescript
 * // Track a shipment through delivery lifecycle
 * const postingNumber = "48173252-0033-2";
 * 
 * // 1. Assign tracking number
 * await client.deliveryrFbs.setTrackingNumbers({
 *   tracking_numbers: [{ 
 *     posting_number: postingNumber, 
 *     tracking_number: "123456789" 
 *   }]
 * });
 * 
 * // 2. Mark as sent by seller (for international)
 * await client.deliveryrFbs.setSentBySeller({
 *   posting_number: [postingNumber]
 * });
 * 
 * // 3. Progress through delivery statuses
 * await client.deliveryrFbs.setDelivering({
 *   posting_number: [postingNumber]
 * });
 * 
 * await client.deliveryrFbs.setLastMile({
 *   posting_number: [postingNumber]
 * });
 * 
 * // 4. Confirm delivery
 * await client.deliveryrFbs.setDelivered({
 *   posting_number: [postingNumber]
 * });
 * ```
 * 
 * @example
 * ```typescript
 * // Reschedule delivery date
 * const postingNumber = "48173252-0033-2";
 * 
 * // Check available reschedule dates
 * const restrictions = await client.deliveryrFbs.getTimeslotChangeRestrictions({
 *   posting_number: postingNumber
 * });
 * 
 * console.log(`Available period: ${restrictions.data.delivery_interval?.begin} to ${restrictions.data.delivery_interval?.end}`);
 * console.log(`Remaining changes: ${restrictions.data.remaining_changes_count}`);
 * 
 * // Reschedule if changes available
 * if (restrictions.data.remaining_changes_count && restrictions.data.remaining_changes_count > 0) {
 *   const tomorrow = new Date();
 *   tomorrow.setDate(tomorrow.getDate() + 1);
 *   
 *   const result = await client.deliveryrFbs.setTimeslot({
 *     posting_number: postingNumber,
 *     new_timeslot: {
 *       from: tomorrow.toISOString(),
 *       to: new Date(tomorrow.getTime() + 4 * 60 * 60 * 1000).toISOString() // +4 hours
 *     }
 *   });
 *   
 *   console.log(`Reschedule result: ${result.data.result ? 'Success' : 'Failed'}`);
 * }
 * ```
 */
export class DeliveryrFBSAPI {
  constructor(private readonly httpClient: HttpClient) {}

  // ============================================================================
  // Tracking Number Management
  // ============================================================================

  /**
   * Assign tracking numbers to postings
   * 
   * Assigns tracking numbers to rFBS shipments. You can assign up to 20 tracking
   * numbers per request. Essential for shipment tracking and customer notifications.
   * 
   * @param params - Tracking number assignments (max 20 per request)
   * @returns Results of tracking number assignment operations
   * 
   * @example
   * ```typescript
   * const result = await client.deliveryrFbs.setTrackingNumbers({
   *   tracking_numbers: [
   *     { posting_number: "48173252-0033-2", tracking_number: "123456789" },
   *     { posting_number: "48173252-0034-1", tracking_number: "987654321" }
   *   ]
   * });
   * 
   * console.log('=== TRACKING NUMBER ASSIGNMENT ===');
   * result.data.result?.forEach(item => {
   *   const status = item.result ? '✅ Success' : '❌ Failed';
   *   console.log(`${item.posting_number}: ${status}`);
   *   if (item.error) {
   *     console.log(`  Error: ${item.error}`);
   *   }
   * });
   * ```
   */
  async setTrackingNumbers(
    params: SetTrackingNumbersRequest
  ): Promise<IHttpResponse<SetTrackingNumbersResponse>> {
    return this.httpClient.post('/v2/fbs/posting/tracking-number/set', params);
  }

  // ============================================================================
  // Delivery Status Management
  // ============================================================================

  /**
   * Change status to "Sent by seller"
   * 
   * Updates posting status to "Sent by seller". This status is only available
   * for sellers with first-mile delivery selling from abroad (international sellers).
   * 
   * @param params - List of posting identifiers to update
   * @returns Results of status change operations
   * 
   * @example
   * ```typescript
   * // For international sellers only
   * const result = await client.deliveryrFbs.setSentBySeller({
   *   posting_number: ["47173252-0073-1", "47173252-0074-1"]
   * });
   * 
   * console.log('=== SENT BY SELLER STATUS ===');
   * result.data.result?.forEach(item => {
   *   const status = item.result ? '✅ Marked as sent' : '❌ Failed';
   *   console.log(`${item.posting_number}: ${status}`);
   *   if (item.error) {
   *     console.log(`  Error: ${item.error}`);
   *   }
   * });
   * ```
   */
  async setSentBySeller(
    params: SetSentBySellerRequest
  ): Promise<IHttpResponse<SetSentBySellerResponse>> {
    return this.httpClient.post('/v2/fbs/posting/sent-by-seller', params);
  }

  /**
   * Change status to "Delivering"
   * 
   * Updates posting status to "Delivering" when using third-party delivery service.
   * Indicates the package is in transit to the customer.
   * 
   * @param params - List of posting identifiers to update
   * @returns Results of status change operations
   */
  async setDelivering(
    params: SetDeliveringRequest
  ): Promise<IHttpResponse<SetDeliveringResponse>> {
    return this.httpClient.post('/v2/fbs/posting/delivering', params);
  }

  /**
   * Change status to "Last mile"
   * 
   * Updates posting status to "Last mile" when using third-party delivery service.
   * Indicates the package is in the final delivery phase.
   * 
   * @param params - List of posting identifiers to update
   * @returns Results of status change operations
   */
  async setLastMile(
    params: SetLastMileRequest
  ): Promise<IHttpResponse<SetLastMileResponse>> {
    return this.httpClient.post('/v2/fbs/posting/last-mile', params);
  }

  /**
   * Change status to "Delivered"
   * 
   * Updates posting status to "Delivered" when using third-party delivery service.
   * Final status indicating successful delivery to customer.
   * 
   * @param params - List of posting identifiers to update
   * @returns Results of status change operations
   */
  async setDelivered(
    params: SetDeliveredRequest
  ): Promise<IHttpResponse<SetDeliveredResponse>> {
    return this.httpClient.post('/v2/fbs/posting/delivered', params);
  }

  // ============================================================================
  // Delivery Scheduling Management
  // ============================================================================

  /**
   * Get available delivery reschedule dates
   * 
   * Retrieves available date range for delivery rescheduling and number of 
   * remaining reschedule attempts. You can change delivery date up to 2 times.
   * 
   * @param params - Posting identifier
   * @returns Available reschedule restrictions and remaining changes
   * 
   * @example
   * ```typescript
   * const restrictions = await client.deliveryrFbs.getTimeslotChangeRestrictions({
   *   posting_number: "48173252-0033-2"
   * });
   * 
   * const { delivery_interval, remaining_changes_count } = restrictions.data;
   * 
   * console.log('=== DELIVERY RESCHEDULE OPTIONS ===');
   * console.log(`Available period: ${delivery_interval?.begin} to ${delivery_interval?.end}`);
   * console.log(`Remaining changes: ${remaining_changes_count}/2`);
   * 
   * if (remaining_changes_count && remaining_changes_count > 0) {
   *   console.log('✅ Can reschedule delivery');
   * } else {
   *   console.log('❌ No more reschedule attempts available');
   * }
   * ```
   */
  async getTimeslotChangeRestrictions(
    params: GetTimeslotChangeRestrictionsRequest
  ): Promise<IHttpResponse<GetTimeslotChangeRestrictionsResponse>> {
    return this.httpClient.post('/v1/posting/fbs/timeslot/change-restrictions', params);
  }

  /**
   * Reschedule delivery date
   * 
   * Changes delivery date within the allowed time window. You can change
   * delivery date maximum 2 times per posting.
   * 
   * @param params - New timeslot and posting identifier
   * @returns Success status of rescheduling operation
   * 
   * @example
   * ```typescript
   * const tomorrow = new Date();
   * tomorrow.setDate(tomorrow.getDate() + 1);
   * const endTime = new Date(tomorrow.getTime() + 4 * 60 * 60 * 1000); // +4 hours
   * 
   * const result = await client.deliveryrFbs.setTimeslot({
   *   posting_number: "48173252-0033-2",
   *   new_timeslot: {
   *     from: tomorrow.toISOString(),
   *     to: endTime.toISOString()
   *   }
   * });
   * 
   * console.log('=== DELIVERY RESCHEDULE ===');
   * if (result.data.result) {
   *   console.log('✅ Delivery successfully rescheduled');
   *   console.log(`New window: ${tomorrow.toISOString()} to ${endTime.toISOString()}`);
   * } else {
   *   console.log('❌ Failed to reschedule delivery');
   * }
   * ```
   */
  async setTimeslot(
    params: SetTimeslotRequest
  ): Promise<IHttpResponse<SetTimeslotResponse>> {
    return this.httpClient.post('/v1/posting/fbs/timeslot/set', params);
  }

  // ============================================================================
  // Shipment Management
  // ============================================================================

  /**
   * Set posting cutoff date
   * 
   * Updates cutoff date for shipment. Used for postings delivered by seller
   * or non-integrated carriers to specify actual shipment timing.
   * 
   * @param params - New cutoff date and posting identifier
   * @returns Success status of cutoff date update
   * 
   * @example
   * ```typescript
   * const cutoffDate = new Date();
   * cutoffDate.setDate(cutoffDate.getDate() + 1); // Tomorrow
   * 
   * const result = await client.deliveryrFbs.setCutoff({
   *   posting_number: "48173252-0033-2", 
   *   new_cutoff_date: cutoffDate.toISOString()
   * });
   * 
   * console.log('=== CUTOFF DATE UPDATE ===');
   * if (result.data.result) {
   *   console.log('✅ Cutoff date updated successfully');
   *   console.log(`New cutoff: ${cutoffDate.toISOString()}`);
   * } else {
   *   console.log('❌ Failed to update cutoff date');
   * }
   * ```
   */
  async setCutoff(
    params: SetCutoffRequest
  ): Promise<IHttpResponse<SetCutoffResponse>> {
    return this.httpClient.post('/v1/posting/cutoff/set', params);
  }

  // ============================================================================
  // Helper Methods
  // ============================================================================

  /**
   * Batch update delivery status with error handling
   * 
   * Convenience method to update multiple postings to a specific status
   * with comprehensive error reporting and retry logic.
   * 
   * @param postingNumbers - List of posting identifiers
   * @param status - Target delivery status
   * @returns Summary of successful and failed updates
   */
  async batchUpdateStatus(
    postingNumbers: string[],
    status: 'sent' | 'delivering' | 'last_mile' | 'delivered'
  ): Promise<{
    successful: string[];
    failed: Array<{ posting_number: string; error: string }>;
    total: number;
  }> {
    let response: IHttpResponse<any>;
    
    switch (status) {
      case 'sent':
        response = await this.setSentBySeller({ posting_number: postingNumbers });
        break;
      case 'delivering':
        response = await this.setDelivering({ posting_number: postingNumbers });
        break;
      case 'last_mile':
        response = await this.setLastMile({ posting_number: postingNumbers });
        break;
      case 'delivered':
        response = await this.setDelivered({ posting_number: postingNumbers });
        break;
    }

    const results = response.data.result || [];
    const successful: string[] = [];
    const failed: Array<{ posting_number: string; error: string }> = [];

    results.forEach((result: StatusChangeResult) => {
      if (result.result && result.posting_number) {
        successful.push(result.posting_number);
      } else if (result.posting_number) {
        failed.push({
          posting_number: result.posting_number,
          error: result.error || 'Unknown error'
        });
      }
    });

    return {
      successful,
      failed,
      total: postingNumbers.length
    };
  }

  /**
   * Check if delivery can be rescheduled
   * 
   * Convenience method to quickly check reschedule availability
   * 
   * @param postingNumber - Posting identifier
   * @returns Reschedule availability information
   */
  async canRescheduleDelivery(postingNumber: string): Promise<{
    canReschedule: boolean;
    remainingChanges: number;
    availablePeriod?: { begin: string; end: string } | undefined;
  }> {
    const restrictions = await this.getTimeslotChangeRestrictions({
      posting_number: postingNumber
    });

    const remainingChanges = restrictions.data.remaining_changes_count || 0;
    const canReschedule = remainingChanges > 0;
    
    return {
      canReschedule,
      remainingChanges,
      availablePeriod: restrictions.data.delivery_interval ? {
        begin: restrictions.data.delivery_interval.begin || '',
        end: restrictions.data.delivery_interval.end || ''
      } : undefined
    };
  }
}

// Re-export types for convenience
export type * from './types';