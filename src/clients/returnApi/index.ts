/**
 * ReturnAPI client for Ozon Seller API
 * 
 * Implements return shipment management from /methods/14-returnapi.json:
 * - Get FBS returns information and drop-off points
 * - Check return giveout access permissions
 * - List and manage return giveouts
 * - Generate and manage barcodes for return pickup
 * 
 * Handles return logistics for FBS orders with barcode-based pickup system.
 */

import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type {
  // Request types
  GetFbsReturnsInfoRequest,
  EmptyRequest,
  ListGiveoutsRequest,
  GetGiveoutInfoRequest,
  
  // Response types
  GetFbsReturnsInfoResponse,
  CheckGiveoutAccessResponse,
  ListGiveoutsResponse,
  GetGiveoutInfoResponse,
  GetBarcodeTextResponse,
  GetBarcodePdfResponse,
  GetBarcodePngResponse,
  ResetBarcodeResponse,
  
  // Base types
  DropOffPoint,
  ReturnGiveout,
  FileContent
} from './types';

/**
 * ReturnAPI client for return shipment management
 * 
 * Provides comprehensive return logistics management for FBS orders including
 * drop-off point information, giveout management, and barcode generation.
 * 
 * **Key Features:**
 * - **Drop-off Points**: Get information about return collection points
 * - **Giveout Management**: List and track return giveouts
 * - **Barcode System**: Generate pickup barcodes in PDF/PNG formats
 * - **Access Control**: Check return pickup permissions
 * 
 * @example
 * ```typescript
 * // Check if return giveout is enabled
 * const access = await client.returnApi.checkGiveoutAccess();
 * 
 * if (access.data.enabled) {
 *   console.log('✅ Return giveout access is enabled');
 *   
 *   // Get returns information for drop-off points
 *   const info = await client.returnApi.getFbsReturnsInfo({
 *     pagination: { limit: 500 }
 *   });
 *   
 *   console.log(`Found ${info.data.drop_off_points?.length} drop-off points`);
 *   
 *   // List active giveouts
 *   const giveouts = await client.returnApi.listGiveouts({
 *     limit: 100
 *   });
 *   
 *   console.log(`${giveouts.data.giveouts?.length} active giveouts`);
 * }
 * ```
 */
export class ReturnAPI {
  constructor(private readonly httpClient: HttpClient) {}

  // ============================================================================
  // Returns Information
  // ============================================================================

  /**
   * Get FBS returns company information
   * 
   * Retrieves information about FBS returns and their quantities by drop-off points.
   * Shows where returns are waiting for pickup and how many items are available.
   * 
   * @param params - Filter and pagination parameters
   * @returns Drop-off points with return information
   * 
   * @example
   * ```typescript
   * // Get all returns information
   * const returns = await client.returnApi.getFbsReturnsInfo({
   *   pagination: { limit: 500 }
   * });
   * 
   * console.log('=== RETURNS BY DROP-OFF POINTS ===');
   * returns.data.drop_off_points?.forEach(point => {
   *   console.log(`\n📦 ${point.name}`);
   *   console.log(`   Address: ${point.address}`);
   *   console.log(`   Returns: ${point.returns_count} items in ${point.box_count} boxes`);
   *   console.log(`   Warehouse ID: ${point.place_id}`);
   *   
   *   if (point.pass_info?.is_required) {
   *     console.log(`   🎫 Pass required: ${point.pass_info.pass_info}`);
   *   }
   * });
   * 
   * // Filter by specific drop-off point
   * const specificPoint = await client.returnApi.getFbsReturnsInfo({
   *   filter: { place_id: 123456 },
   *   pagination: { limit: 10 }
   * });
   * ```
   */
  async getFbsReturnsInfo(
    params: GetFbsReturnsInfoRequest
  ): Promise<IHttpResponse<GetFbsReturnsInfoResponse>> {
    return this.httpClient.post('/v1/returns/company/fbs/info', params);
  }

  // ============================================================================
  // Giveout Access Management
  // ============================================================================

  /**
   * Check return giveout access
   * 
   * Checks if you have access to return giveouts by barcode.
   * Returns true if access is enabled for your account.
   * 
   * @param params - Empty request
   * @returns Access status information
   * 
   * @example
   * ```typescript
   * const access = await client.returnApi.checkGiveoutAccess();
   * 
   * if (access.data.enabled) {
   *   console.log('✅ Return giveout access is enabled');
   *   console.log('You can use barcode-based return pickup');
   * } else {
   *   console.log('❌ Return giveout access is disabled');
   *   console.log('Contact support to enable this feature');
   * }
   * ```
   */
  async checkGiveoutAccess(
    params: EmptyRequest = {}
  ): Promise<IHttpResponse<CheckGiveoutAccessResponse>> {
    return this.httpClient.post('/v1/return/giveout/is-enabled', params);
  }

  // ============================================================================
  // Giveout Management
  // ============================================================================

  /**
   * List return giveouts
   * 
   * Gets list of active return giveouts. Return giveout becomes active after 
   * barcode scanning. After scanning the barcode second time, active giveout 
   * becomes inactive.
   * 
   * @param params - Pagination parameters
   * @returns List of active return giveouts
   * 
   * @example
   * ```typescript
   * // List recent giveouts
   * const giveouts = await client.returnApi.listGiveouts({
   *   limit: 50
   * });
   * 
   * console.log('=== ACTIVE RETURN GIVEOUTS ===');
   * giveouts.data.giveouts?.forEach(giveout => {
   *   console.log(`\n🔄 Giveout #${giveout.id}`);
   *   console.log(`   Status: ${giveout.status}`);
   *   console.log(`   Created: ${giveout.created_at}`);
   *   console.log(`   Returns: ${giveout.returns_count} items in ${giveout.boxes_count} boxes`);
   * });
   * ```
   */
  async listGiveouts(
    params: ListGiveoutsRequest
  ): Promise<IHttpResponse<ListGiveoutsResponse>> {
    return this.httpClient.post('/v1/return/giveout/list', params);
  }

  /**
   * Get giveout information
   * 
   * Gets detailed information about specific return giveout.
   * Use giveout_id from the listGiveouts response.
   * 
   * @param params - Giveout identifier
   * @returns Detailed giveout information
   */
  async getGiveoutInfo(
    params: GetGiveoutInfoRequest
  ): Promise<IHttpResponse<GetGiveoutInfoResponse>> {
    return this.httpClient.post('/v1/return/giveout/info', params);
  }

  // ============================================================================
  // Barcode Management
  // ============================================================================

  /**
   * Get barcode text value
   * 
   * Returns barcode from PNG/PDF responses in text format.
   * Use this to get the actual barcode value for processing.
   * 
   * @param params - Empty request
   * @returns Barcode text value
   * 
   * @example
   * ```typescript
   * // Get current barcode text
   * const barcode = await client.returnApi.getBarcodeText();
   * 
   * console.log(`Current barcode: ${barcode.data.barcode}`);
   * 
   * // Can be used for:
   * // - Display in mobile apps
   * // - Integration with barcode scanners
   * // - Automated pickup systems
   * ```
   */
  async getBarcodeText(
    params: EmptyRequest = {}
  ): Promise<IHttpResponse<GetBarcodeTextResponse>> {
    return this.httpClient.post('/v1/return/giveout/barcode', params);
  }

  /**
   * Get barcode as PDF
   * 
   * Returns PDF file with pickup barcode. Works only for FBS scheme.
   * Use for printing physical barcode labels.
   * 
   * @param params - Empty request
   * @returns PDF file with barcode
   * 
   * @example
   * ```typescript
   * // Download barcode as PDF
   * const pdf = await client.returnApi.getBarcodePdf();
   * 
   * if (pdf.data.file_content) {
   *   console.log(`PDF file: ${pdf.data.file_name}`);
   *   console.log(`Content type: ${pdf.data.content_type}`);
   *   
   *   // Save to file
   *   const buffer = Buffer.from(pdf.data.file_content, 'base64');
   *   // fs.writeFileSync('return-barcode.pdf', buffer);
   * }
   * ```
   */
  async getBarcodePdf(
    params: EmptyRequest = {}
  ): Promise<IHttpResponse<GetBarcodePdfResponse>> {
    return this.httpClient.post('/v1/return/giveout/get-pdf', params);
  }

  /**
   * Get barcode as PNG
   * 
   * Returns PNG file with pickup barcode.
   * Use for digital display or mobile applications.
   * 
   * @param params - Empty request
   * @returns PNG file with barcode
   * 
   * @example
   * ```typescript
   * // Download barcode as PNG
   * const png = await client.returnApi.getBarcodePng();
   * 
   * if (png.data.file_content) {
   *   console.log(`PNG file: ${png.data.file_name}`);
   *   console.log(`Content type: ${png.data.content_type}`);
   *   
   *   // Display in web app or save to file
   *   const dataUrl = `data:${png.data.content_type};base64,${png.data.file_content}`;
   *   console.log('Data URL ready for display');
   * }
   * ```
   */
  async getBarcodePng(
    params: EmptyRequest = {}
  ): Promise<IHttpResponse<GetBarcodePngResponse>> {
    return this.httpClient.post('/v1/return/giveout/get-png', params);
  }

  /**
   * Generate new barcode
   * 
   * Generates new barcode if your current barcode was compromised.
   * Returns PNG file with new barcode. After using this method, old barcodes
   * will no longer work. Use getBarcodePdf() to get new barcode in PDF format.
   * 
   * @param params - Empty request
   * @returns New PNG barcode file
   * 
   * @example
   * ```typescript
   * // Reset barcode for security
   * console.log('🔄 Generating new barcode for security...');
   * 
   * const newBarcode = await client.returnApi.resetBarcode();
   * 
   * if (newBarcode.data.file_content) {
   *   console.log('✅ New barcode generated successfully');
   *   console.log(`File: ${newBarcode.data.file_name}`);
   *   console.log('⚠️  Old barcodes are now invalid');
   *   
   *   // Update your systems with new barcode
   *   const dataUrl = `data:${newBarcode.data.content_type};base64,${newBarcode.data.file_content}`;
   *   
   *   // Get PDF version if needed
   *   const pdfBarcode = await client.returnApi.getBarcodePdf();
   * }
   * ```
   */
  async resetBarcode(
    params: EmptyRequest = {}
  ): Promise<IHttpResponse<ResetBarcodeResponse>> {
    return this.httpClient.post('/v1/return/giveout/barcode-reset', params);
  }

  // ============================================================================
  // Pagination Helpers
  // ============================================================================

  /**
   * Iterate through drop-off points with automatic pagination
   * 
   * @param params - Request parameters without pagination
   * @returns Async generator yielding pages of drop-off points
   * 
   * @example
   * ```typescript
   * // Process all drop-off points
   * for await (const page of client.returnApi.iterateDropOffPoints({})) {
   *   console.log(`Processing ${page.length} drop-off points`);
   *   
   *   page.forEach(point => {
   *     console.log(`${point.name}: ${point.returns_count} returns`);
   *   });
   * }
   * ```
   */
  async *iterateDropOffPoints(
    params: Omit<GetFbsReturnsInfoRequest, 'pagination'> & { limit?: number }
  ): AsyncGenerator<DropOffPoint[], void, unknown> {
    let lastId: number | undefined;
    let hasNext = true;
    
    while (hasNext) {
      const response = await this.getFbsReturnsInfo({
        ...params,
        pagination: {
          ...(lastId && { last_id: lastId }),
          limit: params.limit || 500
        }
      });
      
      const points = response.data.drop_off_points || [];
      if (points.length === 0) {
        hasNext = false;
      } else {
        yield points;
        lastId = points.slice(-1)[0]?.id;
        hasNext = response.data.has_next || false;
      }
    }
  }

  /**
   * Iterate through giveouts with automatic pagination
   * 
   * @param params - Request parameters without last_id
   * @returns Async generator yielding pages of giveouts
   */
  async *iterateGiveouts(
    params: Omit<ListGiveoutsRequest, 'last_id'>
  ): AsyncGenerator<ReturnGiveout[], void, unknown> {
    let lastId: number | undefined;
    let hasNext = true;
    
    while (hasNext) {
      const response = await this.listGiveouts({
        ...params,
        ...(lastId && { last_id: lastId }),
        limit: params.limit || 100
      });
      
      const giveouts = response.data.giveouts || [];
      if (giveouts.length === 0) {
        hasNext = false;
      } else {
        yield giveouts;
        lastId = giveouts.slice(-1)[0]?.id;
        hasNext = response.data.has_next || false;
      }
    }
  }

  // ============================================================================
  // Helper Methods
  // ============================================================================

  /**
   * Get return summary across all drop-off points
   * 
   * Convenience method to get aggregated return statistics.
   * 
   * @returns Summary of returns across all locations
   */
  async getReturnSummary(): Promise<{
    totalDropOffPoints: number;
    totalReturns: number;
    totalBoxes: number;
    locations: Array<{ name: string; returns: number; boxes: number }>;
  }> {
    const points: DropOffPoint[] = [];
    
    for await (const page of this.iterateDropOffPoints({ limit: 500 })) {
      points.push(...page);
    }
    
    const totalReturns = points.reduce((sum, p) => sum + (p.returns_count || 0), 0);
    const totalBoxes = points.reduce((sum, p) => sum + (p.box_count || 0), 0);
    
    return {
      totalDropOffPoints: points.length,
      totalReturns,
      totalBoxes,
      locations: points.map(p => ({
        name: p.name || 'Unknown',
        returns: p.returns_count || 0,
        boxes: p.box_count || 0
      }))
    };
  }

  /**
   * Check if returns are available for pickup
   * 
   * @returns Whether there are any returns waiting for pickup
   */
  async hasReturnsAvailable(): Promise<boolean> {
    const info = await this.getFbsReturnsInfo({
      pagination: { limit: 1 }
    });
    
    return (info.data.drop_off_points?.length || 0) > 0;
  }

  /**
   * Download barcode in both formats
   * 
   * Convenience method to get barcode in both PDF and PNG formats.
   * 
   * @returns Object with both file formats
   */
  async downloadBarcodes(): Promise<{
    pdf?: FileContent;
    png?: FileContent;
    text?: string;
  }> {
    const [pdfResponse, pngResponse, textResponse] = await Promise.all([
      this.getBarcodePdf().catch(() => ({ data: {} })),
      this.getBarcodePng().catch(() => ({ data: {} })),
      this.getBarcodeText().catch(() => ({ data: {} }))
    ]);
    
    const pdfContent = (pdfResponse.data as any).file_content ? pdfResponse.data : undefined;
    const pngContent = (pngResponse.data as any).file_content ? pngResponse.data : undefined;
    const textContent = (textResponse.data as any).barcode;
    
    return {
      ...(pdfContent && { pdf: pdfContent }),
      ...(pngContent && { png: pngContent }),
      ...(textContent && { text: textContent })
    };
  }
}

// Re-export types for convenience
export type * from './types';