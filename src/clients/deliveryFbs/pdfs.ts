/**
 * DeliveryFBS PDF and Document Management
 * 
 * Handles PDF generation, document retrieval, and act listing
 * operations for FBS shipments.
 */

import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import { iterateByOffset } from '../../pagination/iterateByOffset';
import type {
  GetActPDFRequest,
  GetFBSActsListRequest,
  GetDigitalActPDFRequest,
  GetActPDFResponse,
  GetFBSActsListResponse,
  GetDigitalActPDFResponse,
  ActInfo
} from './types';

/**
 * PDF and Document Management operations for FBS deliveries
 */
export class DeliveryFbsPdfsManager {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Get PDF with documents
   * 
   * Returns PDF with documents:
   * - For Russian sellers: shipment list and shipping waybill
   * - For CIS sellers: act and shipping waybill
   * 
   * @param params - Act PDF request parameters
   * @returns PDF document
   * 
   * @example
   * ```typescript
   * const result = await pdfsManager.getActPDF({
   *   id: 789
   * });
   * 
   * if (result.data.file) {
   *   // Save result.data.file (base64) to PDF file
   *   console.log(`Document type: ${result.data.type}`);
   * }
   * ```
   */
  async getActPDF(
    params: GetActPDFRequest
  ): Promise<IHttpResponse<GetActPDFResponse>> {
    return this.httpClient.post('/v2/posting/fbs/act/get-pdf', params);
  }

  /**
   * Get FBS acts list
   * 
   * Returns list of shipment acts with filtering by period, status, 
   * and integration type.
   * 
   * @param params - FBS acts list parameters
   * @returns Acts list with pagination
   * 
   * @example
   * ```typescript
   * const result = await pdfsManager.getFBSActsList({
   *   filter: {
   *     date: {
   *       time_from: '2024-01-01T00:00:00Z',
   *       time_to: '2024-01-31T23:59:59Z'
   *     },
   *     status: 'FORMED',
   *     integration_type: 'API'
   *   },
   *   limit: 100,
   *   offset: 0
   * });
   * 
   * console.log(`Total acts: ${result.data.total}`);
   * result.data.acts?.forEach(act => {
   *   console.log(`Act ${act.act_id}: ${act.status} (${act.integration_type})`);
   * });
   * ```
   */
  async getFBSActsList(
    params: GetFBSActsListRequest
  ): Promise<IHttpResponse<GetFBSActsListResponse>> {
    return this.httpClient.post('/v2/posting/fbs/act/list', params);
  }

  /**
   * Iterate through FBS acts list with automatic pagination
   * 
   * @param params - FBS acts list parameters (without pagination)
   * @returns Async generator yielding pages of acts
   * 
   * @example
   * ```typescript
   * for await (const actsPage of pdfsManager.iterateFBSActsList({
   *   filter: {
   *     date: {
   *       time_from: '2024-01-01T00:00:00Z',
   *       time_to: '2024-12-31T23:59:59Z'
   *     },
   *     integration_type: 'API'
   *   },
   *   limit: 500
   * })) {
   *   console.log(`Processing ${actsPage.length} acts...`);
   *   
   *   for (const act of actsPage) {
   *     if (act.status === 'FORMED') {
   *       console.log(`Act ${act.act_id} is ready for processing`);
   *     }
   *   }
   * }
   * ```
   */
  async *iterateFBSActsList(
    params: Omit<GetFBSActsListRequest, 'offset'>
  ): AsyncGenerator<ActInfo[], void, unknown> {
    let offset = 0;
    const limit = params.limit || 100;
    let hasNext = true;
    
    while (hasNext) {
      const response = await this.getFBSActsList({
        ...params,
        offset
      });
      
      const acts = response.data.acts || [];
      if (acts.length === 0) {
        hasNext = false;
      } else {
        yield acts;
        hasNext = response.data.has_next || false;
        offset += limit;
      }
    }
  }

  /**
   * Get digital act PDF by carriage
   * 
   * Returns shipment list PDF for the carriage. You can get documents if
   * /v2/posting/fbs/digital/act/check-status returned one of these statuses:
   * - FORMED: carriage formed successfully
   * - CONFIRMED: carriage confirmed by Ozon
   * - CONFIRMED_WITH_MISMATCH: carriage accepted by Ozon with discrepancies
   * 
   * @param params - Digital act PDF request parameters
   * @returns Digital act PDF
   * 
   * @example
   * ```typescript
   * // First check if documents are ready
   * const statusResult = await labelsManager.checkDigitalActStatus({
   *   carriage_id: 456
   * });
   * 
   * if (['FORMED', 'CONFIRMED', 'CONFIRMED_WITH_MISMATCH'].includes(statusResult.data.status!)) {
   *   const result = await pdfsManager.getDigitalActPDF({
   *     carriage_id: 456
   *   });
   *   
   *   if (result.data.file) {
   *     // Save result.data.file (base64) to PDF file
   *     console.log(`Digital act type: ${result.data.type}`);
   *   }
   * }
   * ```
   */
  async getDigitalActPDF(
    params: GetDigitalActPDFRequest
  ): Promise<IHttpResponse<GetDigitalActPDFResponse>> {
    return this.httpClient.post('/v2/posting/fbs/digital/act/get-pdf', params);
  }
}