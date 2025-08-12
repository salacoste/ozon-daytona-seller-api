/**
 * Extended FBS operations - Part 2 endpoints (7-13)
 * 
 * Handles country management, restrictions, and label operations:
 * - Country list and product country assignment
 * - Pickup point restrictions
 * - Package label generation
 * - Label batch processing
 */

import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type {
  IV2FbsPostingProductCountryListRequest,
  IV2FbsPostingProductCountryListResponse,
  IV2FbsPostingProductCountrySetRequest,
  IV2FbsPostingProductCountrySetResponse,
  IV1GetRestrictionsRequest,
  IV1GetRestrictionsResponse,
  IPostingFBSPackageLabelRequest,
  IPostingFBSPackageLabelResponse,
  IV1CreateLabelBatchRequest,
  IV1CreateLabelBatchResponse,
  IV2CreateLabelBatchRequest,
  IV2CreateLabelBatchResponse,
  IV1GetLabelBatchRequest,
  IV1GetLabelBatchResponse,
  IPostingCancelReasonRequest,
  IPostingCancelReasonResponse,
  IPostingCancelReasonListRequest,
  IPostingCancelReasonListResponse,
} from '../../types/generated/fbs-part2';

/**
 * Extended FBS operations class
 */
export class FBSExtended {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * List available product countries (endpoint 7)
   * 
   * Returns list of available manufacturing countries and their ISO codes.
   * Can filter by country name.
   * 
   * @param params - Request parameters with optional name filter
   * @returns Available countries list with ISO codes
   * 
   * @example
   * ```typescript
   * const countries = await client.fbs.listProductCountryV2({
   *   name_search: 'Россия'
   * });
   * console.log('Available countries:', countries.data.result);
   * ```
   */
  async listProductCountryV2(
    params: IV2FbsPostingProductCountryListRequest = {}
  ): Promise<IHttpResponse<IV2FbsPostingProductCountryListResponse>> {
    return this.httpClient.post('/v2/posting/fbs/product/country/list', params);
  }

  /**
   * Set product manufacturing country (endpoint 8)
   * 
   * Adds manufacturing country attribute to products that don't have it specified.
   * Returns information whether GTD (customs declaration) is needed.
   * 
   * @param params - Request parameters with posting number, product ID and country ISO code
   * @returns Operation result with GTD requirement flag
   * 
   * @example
   * ```typescript
   * const result = await client.fbs.setProductCountryV2({
   *   posting_number: '57195475-0050-3',
   *   product_id: 180550365,
   *   country_iso_code: 'NO'
   * });
   * 
   * if (result.data.is_gtd_needed) {
   *   console.log('GTD (customs declaration) is required for this product');
   * }
   * ```
   */
  async setProductCountryV2(
    params: IV2FbsPostingProductCountrySetRequest
  ): Promise<IHttpResponse<IV2FbsPostingProductCountrySetResponse>> {
    return this.httpClient.post('/v2/posting/fbs/product/country/set', params);
  }

  /**
   * Get pickup point restrictions (endpoint 9)
   * 
   * Returns dimensional, weight, and other restrictions for pickup point by posting number.
   * Only applicable for FBS fulfillment scheme.
   * 
   * @param params - Request parameters for restrictions
   * @returns Pickup point restrictions
   * 
   * @example
   * ```typescript
   * const restrictions = await client.fbs.getRestrictionsV1({
   *   posting_number: '76673629-0020-1'
   * });
   * 
   * console.log('Weight limits:', restrictions.data.result?.min_posting_weight, '-', restrictions.data.result?.max_posting_weight);
   * console.log('Dimensions:', restrictions.data.result?.width, 'x', restrictions.data.result?.height, 'x', restrictions.data.result?.length);
   * ```
   */
  async getRestrictionsV1(
    params: IV1GetRestrictionsRequest
  ): Promise<IHttpResponse<IV1GetRestrictionsResponse>> {
    return this.httpClient.post('/v1/posting/fbs/restrictions', params);
  }

  /**
   * Get FBS package labels PDF (endpoint 10)
   * 
   * Synchronous PDF label generation for up to 20 postings.
   * Returns package labels as PDF binary data.
   * Supports rFBS and rFBS Express postings.
   * 
   * @param params - Request parameters with posting numbers (up to 20)
   * @returns Package labels in PDF format as binary data
   * 
   * @example
   * ```typescript
   * const labels = await client.fbs.getPackageLabelPdfV2({
   *   posting_number: ['POST-123456', 'POST-789012']
   * });
   * 
   * // Save PDF to file
   * if (labels.data.content) {
   *   const fs = require('fs');
   *   fs.writeFileSync('labels.pdf', labels.data.content);
   * }
   * ```
   */
  async getPackageLabelPdfV2(
    params: IPostingFBSPackageLabelRequest
  ): Promise<IHttpResponse<IPostingFBSPackageLabelResponse>> {
    return this.httpClient.post('/v2/posting/fbs/package-label', params);
  }

  /**
   * Create label batch V1 (endpoint 11) - Legacy
   * 
   * Creates a batch for generating multiple labels.
   * Legacy method - consider using V2 when possible.
   * 
   * @param params - Request parameters for label batch creation
   * @returns Label batch creation result with single task ID
   * 
   * @example
   * ```typescript
   * const batch = await client.fbs.createLabelBatchV1({
   *   posting_number: ['POST-123456', 'POST-789012']
   * });
   * console.log('Task ID:', batch.data.task_id);
   * ```
   */
  async createLabelBatchV1(
    params: IV1CreateLabelBatchRequest
  ): Promise<IHttpResponse<IV1CreateLabelBatchResponse>> {
    return this.httpClient.post('/v1/posting/fbs/package-label/create', params);
  }

  /**
   * Create label batch V2 (endpoint 12)
   * 
   * Creates a batch for generating multiple labels with enhanced features.
   * May return multiple tasks for different label sizes (big/small labels).
   * 
   * @param params - Request parameters for label batch creation
   * @returns Label batch creation result with task details array
   * 
   * @example
   * ```typescript
   * const batch = await client.fbs.createLabelBatchV2({
   *   posting_number: ['POST-123456', 'POST-789012']
   * });
   * console.log('Tasks created:', batch.data.tasks?.length);
   * 
   * // Follow up with getLabelBatchV1 for each task
   * for (const task of batch.data.tasks || []) {
   *   const status = await client.fbs.getLabelBatchV1({ task_id: task.task_id });
   *   console.log(`Task ${task.task_id} (${task.task_type}):`, status.data.result?.status);
   * }
   * ```
   */
  async createLabelBatchV2(
    params: IV2CreateLabelBatchRequest
  ): Promise<IHttpResponse<IV2CreateLabelBatchResponse>> {
    return this.httpClient.post('/v2/posting/fbs/package-label/create', params);
  }

  /**
   * Get label batch status and download (endpoint 13)
   * 
   * Gets the status of a label batch and downloads the labels when ready.
   * Use for polling until status becomes "completed".
   * 
   * @param params - Request parameters with task ID
   * @returns Label batch status and download information
   * 
   * @example
   * ```typescript
   * const batchStatus = await client.fbs.getLabelBatchV1({
   *   task_id: 123456
   * });
   * 
   * if (batchStatus.data.result?.status === 'completed') {
   *   console.log('Labels ready:', batchStatus.data.result.file_url);
   * } else {
   *   console.log('Status:', batchStatus.data.result?.status);
   * }
   * ```
   */
  async getLabelBatchV1(
    params: IV1GetLabelBatchRequest
  ): Promise<IHttpResponse<IV1GetLabelBatchResponse>> {
    return this.httpClient.post('/v1/posting/fbs/package-label/get', params);
  }

  /**
   * Get cancel reasons for specific posting (endpoint 14)
   * 
   * Returns available cancel reasons for a specific FBS posting.
   * 
   * @param params - Request parameters with posting number
   * @returns Available cancel reasons for the posting
   * 
   * @example
   * ```typescript
   * const reasons = await client.fbs.getCancelReasonV1({
   *   posting_number: 'POST-123456'
   * });
   * 
   * console.log('Available cancel reasons:');
   * for (const reason of reasons.data.reasons || []) {
   *   console.log(`${reason.id}: ${reason.name} (available: ${reason.is_available})`);
   * }
   * ```
   */
  async getCancelReasonV1(
    params: IPostingCancelReasonRequest
  ): Promise<IHttpResponse<IPostingCancelReasonResponse>> {
    return this.httpClient.post('/v1/posting/fbs/cancel-reason', params);
  }

  /**
   * Get all cancel reasons list (endpoint 15)
   * 
   * Returns list of all available cancel reasons for FBS postings.
   * 
   * @param params - Optional request parameters with filters
   * @returns Complete list of cancel reasons
   * 
   * @example
   * ```typescript
   * const allReasons = await client.fbs.getCancelReasonListV2({
   *   filter: { is_available: true }
   * });
   * 
   * console.log('All cancel reasons:');
   * for (const reason of allReasons.data.result || []) {
   *   console.log(`${reason.id}: ${reason.name} (${reason.type})`);
   * }
   * ```
   */
  async getCancelReasonListV2(
    params: IPostingCancelReasonListRequest = {}
  ): Promise<IHttpResponse<IPostingCancelReasonListResponse>> {
    return this.httpClient.post('/v2/posting/fbs/cancel-reason/list', params);
  }
}