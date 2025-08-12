/**
 * DeliveryFBS Acts and Document Management
 * 
 * Handles FBS act creation, document generation, and carriage availability
 * for document processing operations.
 */

import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type {
  CreateFBSActRequest,
  GetAvailableCarriageListRequest,
  SplitFBSPostingRequest,
  GetActPostingsListRequest,
  CreateFBSActResponse,
  GetAvailableCarriageListResponse,
  SplitFBSPostingResponse,
  GetActPostingsListResponse,
  AvailableCarriage
} from './types';

/**
 * FBS Acts and Document Management operations
 */
export class DeliveryFbsActsManager {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Create FBS act and generate documents
   * 
   * Confirms the shipment and starts generation of shipping waybill and barcode.
   * For Russian sellers, also generates shipment list. For CIS sellers, 
   * generates acceptance-transfer act.
   * 
   * To generate and receive documents, move posting to 'awaiting_deliver' status.
   * 
   * @param params - FBS act creation parameters
   * @returns Created acts information
   * 
   * @example
   * ```typescript
   * const result = await actsManager.createFBSAct({
   *   containers: [
   *     { container_number: 'CONT-001' }
   *   ],
   *   departure_date: '2024-01-15T10:00:00Z'
   * });
   * 
   * result.data.acts?.forEach(act => {
   *   console.log(`Created act ${act.id} for carriage ${act.carriage_id}`);
   * });
   * ```
   */
  async createFBSAct(
    params: CreateFBSActRequest
  ): Promise<IHttpResponse<CreateFBSActResponse>> {
    return this.httpClient.post('/v2/posting/fbs/act/create', params);
  }

  /**
   * Get available carriages list
   * 
   * Returns carriages that need barcode and document printing:
   * - For Russian sellers: shipment list and shipping waybill
   * - For CIS sellers: act and shipping waybill
   * 
   * @param params - Available carriage list parameters
   * @returns Available carriages for document generation
   * 
   * @example
   * ```typescript
   * const result = await actsManager.getAvailableCarriageList({
   *   date: {
   *     time_from: '2024-01-01T00:00:00Z',
   *     time_to: '2024-01-31T23:59:59Z'
   *   }
   * });
   * 
   * result.data.carriages?.forEach(carriage => {
   *   console.log(`Carriage ${carriage.carriage_id} ready for documents`);
   *   console.log(`Method: ${carriage.delivery_method_name}`);
   *   console.log(`Status: ${carriage.status}`);
   * });
   * ```
   */
  async getAvailableCarriageList(
    params: GetAvailableCarriageListRequest
  ): Promise<IHttpResponse<GetAvailableCarriageListResponse>> {
    return this.httpClient.post('/v1/posting/carriage-available/list', params);
  }

  /**
   * Iterate through available carriages with automatic pagination
   * 
   * @param params - Available carriage list parameters (without pagination)
   * @returns Async generator yielding pages of available carriages
   * 
   * @example
   * ```typescript
   * for await (const carriagesPage of actsManager.iterateAvailableCarriageList({
   *   date: {
   *     time_from: '2024-01-01T00:00:00Z',
   *     time_to: '2024-12-31T23:59:59Z'
   *   }
   * })) {
   *   console.log(`Processing ${carriagesPage.length} carriages...`);
   *   
   *   for (const carriage of carriagesPage) {
   *     if (carriage.status === 'formed') {
   *       console.log(`Carriage ${carriage.carriage_id} is ready for shipment`);
   *     }
   *   }
   * }
   * ```
   */
  async *iterateAvailableCarriageList(
    params: GetAvailableCarriageListRequest
  ): AsyncGenerator<AvailableCarriage[], void, unknown> {
    // Note: This endpoint may not support pagination, but we provide the iterator interface for consistency
    const response = await this.getAvailableCarriageList(params);
    if (response.data.carriages) {
      yield response.data.carriages;
    }
  }

  /**
   * Split FBS posting
   * 
   * Divides order into postings without assembly.
   * 
   * @param params - Split posting parameters
   * @returns Split operation results
   * 
   * @example
   * ```typescript
   * const result = await actsManager.splitFBSPosting({
   *   posting_number: ['58544282-0057-1', '58544282-0058-1']
   * });
   * 
   * console.log(`Successfully split: ${result.data.successful_postings?.join(', ')}`);
   * result.data.failed_postings?.forEach(failed => {
   *   console.error(`Failed to split ${failed.posting_number}: ${failed.error}`);
   * });
   * ```
   */
  async splitFBSPosting(
    params: SplitFBSPostingRequest
  ): Promise<IHttpResponse<SplitFBSPostingResponse>> {
    return this.httpClient.post('/v1/posting/fbs/split', params);
  }

  /**
   * Get postings list in act
   * 
   * Returns list of postings in an act by its identifier.
   * 
   * @param params - Act postings list parameters
   * @returns Postings in the act
   * 
   * @example
   * ```typescript
   * const result = await actsManager.getActPostingsList({
   *   id: 789
   * });
   * 
   * result.data.postings?.forEach(posting => {
   *   console.log(`Posting ${posting.posting_number}`);
   *   posting.products?.forEach(product => {
   *     console.log(`  ${product.name} (${product.sku}): ${product.quantity}`);
   *   });
   * });
   * ```
   */
  async getActPostingsList(
    params: GetActPostingsListRequest
  ): Promise<IHttpResponse<GetActPostingsListResponse>> {
    return this.httpClient.post('/v2/posting/fbs/act/get-postings', params);
  }
}