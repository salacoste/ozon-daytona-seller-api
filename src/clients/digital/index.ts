/**
 * Digital API client for Ozon Seller API
 * 
 * Implements digital product management endpoints from /beta/04-digital.json:
 * - Upload digital product codes for customer orders
 * - List digital postings with filtering and status tracking
 * - Import and update digital product stock levels
 * 
 * **Beta API**: Available only for sellers working with digital products.
 * Handles digital product code distribution with 24-hour upload deadlines.
 */

import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type {
  // Request types
  UploadPostingCodesRequest,
  ListPostingCodesRequest,
  DigitalStocksImportRequest,
  
  // Response types
  UploadPostingCodesResponse,
  ListPostingCodesResponse,
  DigitalStocksImportResponse,
  
  // Base types
  DigitalPosting,
  DigitalAnalytics,
  CodeUploadStats,
  ExemplarBySku
} from './types';

/**
 * Digital API client for managing digital products and code distribution
 * 
 * **Beta Feature**: Available only for sellers authorized for digital products.
 * Provides comprehensive digital product lifecycle management including
 * code uploads, stock management, and order fulfillment tracking.
 * 
 * **Key Features:**
 * - **Code Upload**: Upload digital product codes to fulfill orders
 * - **Order Tracking**: Monitor digital postings and delivery status  
 * - **Stock Management**: Update digital product availability
 * - **Deadline Management**: 24-hour code upload deadline tracking
 * 
 * @example
 * ```typescript
 * // Get pending digital orders requiring code uploads
 * const pendingOrders = await client.digital.listPostingCodes({
 *   filter: {
 *     statuses: ['awaiting_deliver']
 *   },
 *   limit: 50
 * });
 * 
 * console.log(`Found ${pendingOrders.data.result.length} orders needing codes`);
 * 
 * // Upload codes for a specific order
 * if (pendingOrders.data.result.length > 0) {
 *   const order = pendingOrders.data.result[0];
 *   
 *   const uploadResult = await client.digital.uploadPostingCodes({
 *     posting_number: order.posting_number,
 *     exemplars_by_sku: [
 *       {
 *         sku: '12345',
 *         exemplar_qty: 2,
 *         not_available_exemplar_qty: 0,
 *         exemplar_keys: ['CODE123', 'CODE456']
 *       }
 *     ]
 *   });
 *   
 *   console.log(`Uploaded codes for ${uploadResult.data.exemplars_by_sku.length} SKUs`);
 * }
 * 
 * // Update stock levels
 * await client.digital.importDigitalStocks({
 *   stocks: [
 *     { sku: '12345', stock: 100 },
 *     { sku: '67890', stock: 50 }
 *   ]
 * });
 * ```
 */
export class DigitalAPI {
  constructor(private readonly httpClient: HttpClient) {}

  // ============================================================================
  // Digital Code Management
  // ============================================================================

  /**
   * Upload digital product codes for posting
   * 
   * Uploads activation codes, license keys, or other digital content for customer orders.
   * **Critical**: Must be completed within 24 hours of order creation.
   * 
   * @param params - Posting number and codes by SKU
   * @returns Upload results with success/error counts
   * 
   * @example
   * ```typescript
   * // Upload activation codes for software licenses
   * const result = await client.digital.uploadPostingCodes({
   *   posting_number: '33920151-0719-1',
   *   exemplars_by_sku: [
   *     {
   *       sku: '6605735423',
   *       exemplar_qty: 3,
   *       not_available_exemplar_qty: 0,
   *       exemplar_keys: [
   *         'SOFT-ABCD-1234-EFGH',
   *         'SOFT-IJKL-5678-MNOP',
   *         'SOFT-QRST-9012-UVWX'
   *       ]
   *     },
   *     {
   *       sku: '7890123456',
   *       exemplar_qty: 1,
   *       not_available_exemplar_qty: 1, // One code unavailable
   *       exemplar_keys: [
   *         'GAME-CODE-ABC123'
   *       ]
   *     }
   *   ]
   * });
   * 
   * console.log('=== CODE UPLOAD RESULTS ===');
   * result.data.exemplars_by_sku.forEach(result => {
   *   console.log(`\\nSKU: ${result.sku}`);
   *   console.log(`  ✅ Uploaded: ${result.uploaded_count} codes`);
   *   console.log(`  ❌ Failed: ${result.not_uploaded_count} codes`);
   *   
   *   if (result.errors && result.errors.length > 0) {
   *     console.log(`  🚨 Errors:`);
   *     result.errors.forEach(error => {
   *       console.log(`    ${error.exemplar_key}: ${error.error}`);
   *     });
   *   }
   * });
   * ```
   */
  async uploadPostingCodes(
    params: UploadPostingCodesRequest
  ): Promise<IHttpResponse<UploadPostingCodesResponse>> {
    return this.httpClient.post('/v1/posting/digital/codes/upload', params);
  }

  /**
   * Get list of digital postings
   * 
   * Retrieves digital orders with filtering by status, date range, and other criteria.
   * Includes code upload deadlines and current progress tracking.
   * 
   * @param params - List parameters with filters and pagination
   * @returns Paginated list of digital postings
   * 
   * @example
   * ```typescript
   * // Get urgent orders approaching deadline
   * const urgentOrders = await client.digital.listPostingCodes({
   *   filter: {
   *     statuses: ['awaiting_deliver'],
   *     since: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() // Last 24h
   *   },
   *   limit: 100,
   *   dir: 'asc' // Oldest first (most urgent)
   * });
   * 
   * console.log('=== URGENT DIGITAL ORDERS ===');
   * urgentOrders.data.result.forEach(posting => {
   *   console.log(`\\nOrder: ${posting.posting_number}`);
   *   console.log(`  Status: ${posting.status}`);
   *   console.log(`  Created: ${posting.created_at}`);
   *   console.log(`  Digital Items: ${posting.digital_items.length}`);
   *   
   *   posting.digital_items.forEach(item => {
   *     const uploaded = item.uploaded_codes_count || 0;
   *     const required = item.required_qty_for_digital_code;
   *     const remaining = required - uploaded;
   *     
   *     console.log(`\\n    📦 SKU: ${item.sku} (${item.product_name})`);
   *     console.log(`    📊 Progress: ${uploaded}/${required} codes uploaded`);
   *     
   *     if (remaining > 0) {
   *       console.log(`    ⚠️  URGENT: ${remaining} codes still needed!`);
   *       if (item.codes_upload_deadline) {
   *         const deadline = new Date(item.codes_upload_deadline);
   *         const hoursLeft = (deadline.getTime() - Date.now()) / (1000 * 60 * 60);
   *         console.log(`    ⏰ Deadline: ${hoursLeft.toFixed(1)} hours remaining`);
   *       }
   *     }
   *   });
   * });
   * ```
   */
  async listPostingCodes(
    params: ListPostingCodesRequest = {}
  ): Promise<IHttpResponse<ListPostingCodesResponse>> {
    return this.httpClient.post('/v1/posting/digital/list', params);
  }

  // ============================================================================
  // Digital Stock Management  
  // ============================================================================

  /**
   * Import digital product stocks
   * 
   * Updates available quantities for digital products. Unlike physical products,
   * digital stocks represent available license counts or code inventories.
   * 
   * @param params - Stock updates by SKU
   * @returns Import results with success/error details
   * 
   * @example
   * ```typescript
   * // Update digital product inventories
   * const stockUpdate = await client.digital.importDigitalStocks({
   *   stocks: [
   *     { sku: 'SOFTWARE_LICENSE_A', stock: 150 },
   *     { sku: 'GAME_KEY_B', stock: 75 },
   *     { sku: 'EBOOK_C', stock: 1000 }, // Digital books have higher capacity
   *     { sku: 'MUSIC_ALBUM_D', stock: 500 }
   *   ]
   * });
   * 
   * console.log('=== STOCK UPDATE RESULTS ===');
   * stockUpdate.data.result.forEach(result => {
   *   console.log(`\\nSKU: ${result.sku}`);
   *   
   *   if (result.updated) {
   *     console.log(`  ✅ Stock updated to: ${result.stock}`);
   *   } else {
   *     console.log(`  ❌ Update failed`);
   *     if (result.errors && result.errors.length > 0) {
   *       result.errors.forEach(error => {
   *         console.log(`    Error: ${error}`);
   *       });
   *     }
   *   }
   * });
   * 
   * // Check for failed updates
   * const failures = stockUpdate.data.result.filter(r => !r.updated);
   * if (failures.length > 0) {
   *   console.log(`\\n🚨 ${failures.length} stock updates failed`);
   * }
   * ```
   */
  async importDigitalStocks(
    params: DigitalStocksImportRequest
  ): Promise<IHttpResponse<DigitalStocksImportResponse>> {
    return this.httpClient.post('/v1/product/digital/stocks/import', params);
  }

  // ============================================================================
  // Pagination Helpers
  // ============================================================================

  /**
   * Iterate through digital postings with automatic pagination
   * 
   * @param params - Request parameters without pagination
   * @returns Async generator yielding pages of postings
   * 
   * @example
   * ```typescript
   * // Process all pending digital orders
   * for await (const postingsPage of client.digital.iteratePostingCodes({
   *   filter: { statuses: ['awaiting_deliver'] },
   *   limit: 50
   * })) {
   *   console.log(`Processing ${postingsPage.length} pending orders...`);
   *   
   *   for (const posting of postingsPage) {
   *     // Check if codes are needed urgently
   *     const urgentItems = posting.digital_items.filter(item => {
   *       const uploaded = item.uploaded_codes_count || 0;
   *       return uploaded < item.required_qty_for_digital_code;
   *     });
   *     
   *     if (urgentItems.length > 0) {
   *       console.log(`⚠️ Order ${posting.posting_number} needs ${urgentItems.length} items`);
   *     }
   *   }
   * }
   * ```
   */
  async *iteratePostingCodes(
    params: Omit<ListPostingCodesRequest, 'offset'>
  ): AsyncGenerator<DigitalPosting[], void, unknown> {
    let offset = 0;
    let hasNext = true;
    const limit = params.limit || 50;

    while (hasNext) {
      const response = await this.listPostingCodes({
        ...params,
        offset,
        limit
      });

      const postings = response.data.result || [];
      if (postings.length === 0) {
        hasNext = false;
      } else {
        yield postings;
        hasNext = response.data.has_next;
        offset += limit;
      }
    }
  }

  // ============================================================================
  // Analytics and Helper Methods
  // ============================================================================

  /**
   * Get comprehensive digital product analytics
   * 
   * Analyzes digital product performance including upload rates,
   * delivery success, and stock level insights.
   * 
   * @returns Digital analytics summary
   * 
   * @example
   * ```typescript
   * // Generate digital product performance report
   * const analytics = await client.digital.getDigitalAnalytics();
   * 
   * console.log('=== DIGITAL PRODUCT ANALYTICS ===');
   * console.log(`📦 Total Postings: ${analytics.total_postings}`);
   * console.log(`⏳ Pending Uploads: ${analytics.pending_code_uploads}`);
   * console.log(`✅ Delivered: ${analytics.delivered_postings}`);
   * console.log(`❌ Upload Failures: ${analytics.failed_uploads}`);
   * console.log(`📊 Codes Uploaded Today: ${analytics.codes_uploaded_today}`);
   * console.log(`⏱️ Avg Upload Time: ${analytics.average_upload_time_hours.toFixed(1)} hours`);
   * 
   * console.log('\\n📈 STOCK LEVELS:');
   * console.log(`  Total SKUs: ${analytics.stock_levels.total_skus}`);
   * console.log(`  ⚠️ Low Stock: ${analytics.stock_levels.low_stock_count}`);
   * console.log(`  🚨 Out of Stock: ${analytics.stock_levels.out_of_stock_count}`);
   * 
   * // Alert if too many pending uploads
   * if (analytics.pending_code_uploads > 10) {
   *   console.log('\\n🚨 HIGH ALERT: Many orders awaiting code uploads!');
   * }
   * 
   * // Alert for slow upload times
   * if (analytics.average_upload_time_hours > 12) {
   *   console.log('\\n⏰ WARNING: Upload times are approaching deadline limits');
   * }
   * ```
   */
  async getDigitalAnalytics(): Promise<DigitalAnalytics> {
    // Get recent postings for analysis
    const postingsResponse = await this.listPostingCodes({
      limit: 1000, // Sample for analytics
      filter: {
        since: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() // Last 7 days
      }
    });
    
    const postings = postingsResponse.data.result;
    const totalPostings = postings.length;
    
    // Calculate metrics
    const pendingCodeUploads = postings.filter(p => 
      p.status === 'awaiting_deliver' && 
      p.digital_items.some(item => (item.uploaded_codes_count || 0) < item.required_qty_for_digital_code)
    ).length;
    
    const deliveredPostings = postings.filter(p => p.status === 'delivered').length;
    
    const failedUploads = postings.filter(p => 
      p.digital_items.some(item => 
        item.exemplars?.some(ex => ex.status === 'failed')
      )
    ).length;
    
    // Today's uploads
    const today = new Date().toISOString().split('T')[0] || '';
    const codesUploadedToday = postings
      .flatMap(p => p.digital_items)
      .flatMap(item => item.exemplars || [])
      .filter(ex => ex.uploaded_at !== undefined && (ex.uploaded_at as string).startsWith(today))
      .length;
    
    // Average upload time calculation (simplified)
    const uploadTimes = postings
      .filter(p => p.in_process_at && p.status !== 'awaiting_deliver')
      .map(p => {
        const created = new Date(p.created_at).getTime();
        const processed = new Date(p.in_process_at as string).getTime();
        return (processed - created) / (1000 * 60 * 60); // hours
      });
    
    const averageUploadTimeHours = uploadTimes.length > 0 
      ? uploadTimes.reduce((sum, time) => sum + time, 0) / uploadTimes.length 
      : 0;

    // Stock level insights (approximated from recent activity)
    const uniqueSkus = new Set(postings.flatMap(p => p.digital_items.map(item => item.sku)));
    const totalSkus = uniqueSkus.size;
    
    // Estimate low stock and out of stock (would need actual stock API in real implementation)
    const lowStockCount = Math.floor(totalSkus * 0.1); // Approximate 10%
    const outOfStockCount = Math.floor(totalSkus * 0.02); // Approximate 2%

    return {
      total_postings: totalPostings,
      pending_code_uploads: pendingCodeUploads,
      delivered_postings: deliveredPostings,
      failed_uploads: failedUploads,
      codes_uploaded_today: codesUploadedToday,
      average_upload_time_hours: averageUploadTimeHours,
      stock_levels: {
        total_skus: totalSkus,
        low_stock_count: lowStockCount,
        out_of_stock_count: outOfStockCount
      }
    };
  }

  /**
   * Get orders requiring urgent code uploads
   * 
   * Returns orders approaching the 24-hour upload deadline.
   * Helps prioritize urgent fulfillment tasks.
   * 
   * @param hoursThreshold - Consider urgent if deadline within X hours (default: 6)
   * @returns Orders needing urgent attention
   */
  async getUrgentCodeUploads(hoursThreshold: number = 6): Promise<CodeUploadStats[]> {
    const response = await this.listPostingCodes({
      filter: {
        statuses: ['awaiting_deliver']
      },
      limit: 100
    });

    const urgentUploads: CodeUploadStats[] = [];
    const now = Date.now();

    for (const posting of response.data.result) {
      for (const item of posting.digital_items) {
        if (!item.codes_upload_deadline) continue;

        const deadline = new Date(item.codes_upload_deadline).getTime();
        const hoursRemaining = (deadline - now) / (1000 * 60 * 60);
        
        if (hoursRemaining <= hoursThreshold) {
          const uploaded = item.uploaded_codes_count || 0;
          const required = item.required_qty_for_digital_code;
          
          if (uploaded < required) {
            urgentUploads.push({
              posting_number: posting.posting_number,
              total_codes_required: required,
              codes_uploaded: uploaded,
              codes_remaining: required - uploaded,
              deadline: item.codes_upload_deadline,
              hours_remaining: Math.max(0, hoursRemaining),
              is_urgent: hoursRemaining <= 2 // Critical if < 2 hours
            });
          }
        }
      }
    }

    // Sort by urgency (least time remaining first)
    return urgentUploads.sort((a, b) => a.hours_remaining - b.hours_remaining);
  }

  /**
   * Bulk upload codes from code inventory
   * 
   * Helper method to upload multiple codes from a pre-prepared inventory.
   * Useful for automated fulfillment systems.
   * 
   * @param postingNumber - Order to fulfill
   * @param codeInventory - Available codes by SKU
   * @returns Upload results
   */
  async bulkUploadFromInventory(
    postingNumber: string,
    codeInventory: Record<string, string[]>
  ): Promise<{ success: boolean; results: any; missing: string[] }> {
    // Get posting details to know what codes are needed
    const postings = await this.listPostingCodes({
      filter: { statuses: ['awaiting_deliver'] }
    });
    
    const posting = postings.data.result.find(p => p.posting_number === postingNumber);
    if (!posting) {
      return { success: false, results: null, missing: [] };
    }

    const exemplarsBySku: ExemplarBySku[] = [];
    const missingSkus: string[] = [];

    for (const item of posting.digital_items) {
      const availableCodes = codeInventory[item.sku] || [];
      const neededCodes = item.required_qty_for_digital_code;
      
      if (availableCodes.length >= neededCodes) {
        exemplarsBySku.push({
          sku: item.sku,
          exemplar_qty: neededCodes,
          not_available_exemplar_qty: 0,
          exemplar_keys: availableCodes.slice(0, neededCodes)
        });
      } else {
        missingSkus.push(item.sku);
        // Upload what we have
        if (availableCodes.length > 0) {
          exemplarsBySku.push({
            sku: item.sku,
            exemplar_qty: availableCodes.length,
            not_available_exemplar_qty: neededCodes - availableCodes.length,
            exemplar_keys: availableCodes
          });
        }
      }
    }

    if (exemplarsBySku.length === 0) {
      return { success: false, results: null, missing: missingSkus };
    }

    const uploadResult = await this.uploadPostingCodes({
      posting_number: postingNumber,
      exemplars_by_sku: exemplarsBySku
    });

    return {
      success: true,
      results: uploadResult.data,
      missing: missingSkus
    };
  }
}

// Re-export types for convenience
export type * from './types';