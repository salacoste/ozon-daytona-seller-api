/**
 * PassAPI client for Ozon Seller API
 * 
 * Implements warehouse access pass management from /methods/17-pass.json:
 * - List passes with filtering
 * - Create/update/delete carriage passes
 * - Create/update/delete return passes
 * 
 * Handles access control for warehouse deliveries and returns pickup.
 */

import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import { iterateByCursor } from '../../pagination/iterateByCursor';
import type {
  // Request types
  ListPassesRequest,
  CreateCarriagePassRequest,
  UpdateCarriagePassRequest,
  DeleteCarriagePassRequest,
  CreateReturnPassRequest,
  UpdateReturnPassRequest,
  DeleteReturnPassRequest,
  
  // Response types
  ListPassesResponse,
  CreateCarriagePassResponse,
  UpdateCarriagePassResponse,
  DeleteCarriagePassResponse,
  CreateReturnPassResponse,
  UpdateReturnPassResponse,
  DeleteReturnPassResponse,
  
  // Base types
  ArrivalPass,
  ArrivalReason,
  PassCreateData,
  PassUpdateData
} from './types';

/**
 * PassAPI client for warehouse access pass management
 * 
 * Provides comprehensive pass management for warehouse access control including
 * carriage passes for deliveries and return passes for returns pickup.
 * 
 * **Key Features:**
 * - **Pass Management**: Create, update, delete passes for drivers
 * - **Carriage Passes**: Access for delivery operations
 * - **Return Passes**: Access for returns pickup operations
 * - **Filtering**: Advanced filtering by warehouse, status, and purpose
 * 
 * @example
 * ```typescript
 * // List active passes for a warehouse
 * const passes = await client.pass.listPasses({
 *   limit: 100,
 *   filter: {
 *     warehouse_ids: ['123456'],
 *     only_active_passes: true
 *   }
 * });
 * 
 * console.log(`Found ${passes.data.arrival_passes?.length} active passes`);
 * 
 * // Create a carriage pass for delivery
 * const newPass = await client.pass.createCarriagePass({
 *   carriage_id: 789,
 *   arrival_passes: [{
 *     driver_name: 'John Doe',
 *     driver_phone: '+79991234567',
 *     vehicle_license_plate: 'A123BC77',
 *     vehicle_model: 'Volvo FH',
 *     with_returns: true // Will also pickup returns
 *   }]
 * });
 * 
 * console.log(`Created pass: ${newPass.data.arrival_pass_ids?.[0]}`);
 * ```
 */
export class PassAPI {
  constructor(private readonly httpClient: HttpClient) {}

  // ============================================================================
  // Pass Listing
  // ============================================================================

  /**
   * Get list of passes
   * 
   * Retrieves passes with optional filtering by warehouse, status, and purpose.
   * Supports pagination via cursor for large result sets.
   * 
   * @param params - List parameters with filters and pagination
   * @returns List of passes with cursor for next page
   * 
   * @example
   * ```typescript
   * // Get all active passes
   * const activePasses = await client.pass.listPasses({
   *   limit: 1000,
   *   filter: {
   *     only_active_passes: true
   *   }
   * });
   * 
   * console.log('=== ACTIVE PASSES ===');
   * activePasses.data.arrival_passes?.forEach(pass => {
   *   console.log(`\nPass #${pass.arrival_pass_id}`);
   *   console.log(`  Driver: ${pass.driver_name} (${pass.driver_phone})`);
   *   console.log(`  Vehicle: ${pass.vehicle_model} - ${pass.vehicle_license_plate}`);
   *   console.log(`  Arrival: ${pass.arrival_time}`);
   *   console.log(`  Warehouse: ${pass.warehouse_id}`);
   *   console.log(`  Reasons: ${pass.arrival_reasons?.join(', ')}`);
   * });
   * 
   * // Get passes for specific warehouses
   * const warehousePasses = await client.pass.listPasses({
   *   limit: 100,
   *   filter: {
   *     warehouse_ids: ['123', '456'],
   *     arrival_reason: 'FBS_DELIVERY'
   *   }
   * });
   * ```
   */
  async listPasses(
    params: ListPassesRequest
  ): Promise<IHttpResponse<ListPassesResponse>> {
    return this.httpClient.post('/v1/pass/list', params);
  }

  // ============================================================================
  // Carriage Pass Management
  // ============================================================================

  /**
   * Create carriage pass
   * 
   * Creates access passes for delivery carriage. Pass ID will be linked to the carriage.
   * Multiple passes can be created for the same carriage (multiple drivers/vehicles).
   * 
   * @param params - Carriage ID and pass details
   * @returns Created pass identifiers
   * 
   * @example
   * ```typescript
   * // Create passes for a carriage with multiple vehicles
   * const result = await client.pass.createCarriagePass({
   *   carriage_id: 12345,
   *   arrival_passes: [
   *     {
   *       driver_name: 'John Doe',
   *       driver_phone: '+79991234567',
   *       vehicle_license_plate: 'A123BC77',
   *       vehicle_model: 'Volvo FH',
   *       with_returns: false // Delivery only
   *     },
   *     {
   *       driver_name: 'Jane Smith',
   *       driver_phone: '+79997654321',
   *       vehicle_license_plate: 'B456CD99',
   *       vehicle_model: 'MAN TGX',
   *       with_returns: true // Will also pickup returns
   *     }
   *   ]
   * });
   * 
   * console.log('=== CREATED CARRIAGE PASSES ===');
   * result.data.arrival_pass_ids?.forEach((id, index) => {
   *   console.log(`Pass ${index + 1}: ${id}`);
   * });
   * ```
   */
  async createCarriagePass(
    params: CreateCarriagePassRequest
  ): Promise<IHttpResponse<CreateCarriagePassResponse>> {
    return this.httpClient.post('/v1/carriage/pass/create', params);
  }

  /**
   * Update carriage pass
   * 
   * Updates existing carriage pass details such as driver or vehicle information.
   * All fields must be provided even if not changing.
   * 
   * @param params - Carriage ID and updated pass details
   * @returns Empty response on success
   */
  async updateCarriagePass(
    params: UpdateCarriagePassRequest
  ): Promise<IHttpResponse<UpdateCarriagePassResponse>> {
    return this.httpClient.post('/v1/carriage/pass/update', params);
  }

  /**
   * Delete carriage pass
   * 
   * Deletes one or more carriage passes. Deleted passes cannot be used for access.
   * 
   * @param params - Carriage ID and pass IDs to delete
   * @returns Empty response on success
   */
  async deleteCarriagePass(
    params: DeleteCarriagePassRequest
  ): Promise<IHttpResponse<DeleteCarriagePassResponse>> {
    return this.httpClient.post('/v1/carriage/pass/delete', params);
  }

  // ============================================================================
  // Return Pass Management
  // ============================================================================

  /**
   * Create return pass
   * 
   * Creates access passes for returns pickup. Used when drivers need to
   * collect returns from the warehouse.
   * 
   * @param params - Pass details for returns pickup
   * @returns Created pass identifiers
   * 
   * @example
   * ```typescript
   * // Create a pass for returns pickup
   * const returnPass = await client.pass.createReturnPass({
   *   arrival_passes: [{
   *     driver_name: 'Bob Wilson',
   *     driver_phone: '+79995551234',
   *     vehicle_license_plate: 'C789DE88',
   *     vehicle_model: 'Scania R',
   *     with_returns: true // Always true for return passes
   *   }]
   * });
   * 
   * console.log(`Return pass created: ${returnPass.data.arrival_pass_ids?.[0]}`);
   * ```
   */
  async createReturnPass(
    params: CreateReturnPassRequest
  ): Promise<IHttpResponse<CreateReturnPassResponse>> {
    return this.httpClient.post('/v1/return/pass/create', params);
  }

  /**
   * Update return pass
   * 
   * Updates existing return pass details.
   * 
   * @param params - Updated pass details
   * @returns Empty response on success
   */
  async updateReturnPass(
    params: UpdateReturnPassRequest
  ): Promise<IHttpResponse<UpdateReturnPassResponse>> {
    return this.httpClient.post('/v1/return/pass/update', params);
  }

  /**
   * Delete return pass
   * 
   * Deletes one or more return passes.
   * 
   * @param params - Pass IDs to delete
   * @returns Empty response on success
   */
  async deleteReturnPass(
    params: DeleteReturnPassRequest
  ): Promise<IHttpResponse<DeleteReturnPassResponse>> {
    return this.httpClient.post('/v1/return/pass/delete', params);
  }

  // ============================================================================
  // Pagination Helpers
  // ============================================================================

  /**
   * Iterate through passes with automatic pagination
   * 
   * @param params - Request parameters without cursor
   * @returns Async generator yielding pages of passes
   * 
   * @example
   * ```typescript
   * // Process all passes for a warehouse
   * for await (const page of client.pass.iteratePasses({
   *   limit: 100,
   *   filter: { warehouse_ids: ['123456'] }
   * })) {
   *   console.log(`Processing ${page.length} passes`);
   *   
   *   page.forEach(pass => {
   *     console.log(`Pass ${pass.arrival_pass_id}: ${pass.driver_name}`);
   *   });
   * }
   * ```
   */
  async *iteratePasses(
    params: Omit<ListPassesRequest, 'cursor'>
  ): AsyncGenerator<ArrivalPass[], void, unknown> {
    let cursor: string | undefined;
    let hasNext = true;
    
    while (hasNext) {
      const response = await this.listPasses({
        ...params,
        ...(cursor && { cursor })
      });
      
      const passes = response.data.arrival_passes || [];
      if (passes.length === 0) {
        hasNext = false;
      } else {
        yield passes;
        cursor = response.data.cursor;
        hasNext = !!cursor;
      }
    }
  }

  // ============================================================================
  // Helper Methods
  // ============================================================================

  /**
   * Get active passes for a warehouse
   * 
   * Convenience method to get only active passes for specific warehouses.
   * 
   * @param warehouseIds - Warehouse identifiers
   * @returns Active passes for the warehouses
   */
  async getActivePassesForWarehouses(
    warehouseIds: string[]
  ): Promise<ArrivalPass[]> {
    const response = await this.listPasses({
      limit: 1000,
      filter: {
        warehouse_ids: warehouseIds,
        only_active_passes: true
      }
    });
    
    return response.data.arrival_passes || [];
  }

  /**
   * Check if a pass exists and is active
   * 
   * @param passId - Pass identifier
   * @returns Pass information if exists and active, null otherwise
   */
  async checkPassStatus(passId: string): Promise<ArrivalPass | null> {
    const response = await this.listPasses({
      limit: 1,
      filter: {
        arrival_pass_ids: [passId]
      }
    });
    
    const pass = response.data.arrival_passes?.[0];
    return pass?.is_active ? pass : null;
  }

  /**
   * Create pass with validation
   * 
   * Creates a pass with phone number format validation.
   * 
   * @param passData - Pass data to validate and create
   * @param carriageId - Optional carriage ID (creates carriage pass if provided)
   * @returns Created pass ID or error
   */
  async createPassWithValidation(
    passData: PassCreateData,
    carriageId?: number
  ): Promise<{ success: boolean; passId?: string; error?: string }> {
    // Validate phone number format
    const phoneRegex = /^\+7\d{10}$/;
    if (!phoneRegex.test(passData.driver_phone)) {
      return {
        success: false,
        error: 'Invalid phone format. Use +7XXXXXXXXXX'
      };
    }

    // Validate license plate (basic check)
    if (!passData.vehicle_license_plate || passData.vehicle_license_plate.length < 6) {
      return {
        success: false,
        error: 'Invalid license plate format'
      };
    }

    try {
      if (carriageId) {
        const response = await this.createCarriagePass({
          carriage_id: carriageId,
          arrival_passes: [passData]
        });
        
        const passId = response.data.arrival_pass_ids?.[0];
        return {
          success: true,
          ...(passId && { passId })
        };
      } else {
        const response = await this.createReturnPass({
          arrival_passes: [passData]
        });
        
        const passId = response.data.arrival_pass_ids?.[0];
        return {
          success: true,
          ...(passId && { passId })
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}

// Re-export types for convenience
export type * from './types';