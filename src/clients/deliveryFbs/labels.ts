/**
 * DeliveryFBS Labels and Barcode Generation
 * 
 * Handles container labels, barcode generation, and status checking
 * operations for FBS shipments.
 */

import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type {
  GetContainerLabelsRequest,
  GetBarcodeRequest,
  GetBarcodeTextRequest,
  CheckDigitalActStatusRequest,
  CheckActStatusRequest,
  GetContainerLabelsResponse,
  GetBarcodeResponse,
  GetBarcodeTextResponse,
  CheckDigitalActStatusResponse,
  CheckActStatusResponse
} from './types';

/**
 * Labels and Barcode Generation operations for FBS deliveries
 */
export class DeliveryFbsLabelsManager {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Get container labels
   * 
   * Creates labels for cargo place (container).
   * 
   * @param params - Container labels parameters
   * @returns Container labels
   * 
   * @example
   * ```typescript
   * const result = await labelsManager.getContainerLabels({
   *   container_number: 'CONT-001'
   * });
   * 
   * result.data.labels?.forEach(label => {
   *   console.log(`Label type: ${label.type}`);
   *   // Save label.file (base64) to PDF file
   * });
   * ```
   */
  async getContainerLabels(
    params: GetContainerLabelsRequest
  ): Promise<IHttpResponse<GetContainerLabelsResponse>> {
    return this.httpClient.post('/v2/posting/fbs/act/get-container-labels', params);
  }

  /**
   * Get barcode for shipment
   * 
   * Returns barcode that needs to be shown at pickup point or 
   * sorting center during shipment.
   * 
   * @param params - Barcode request parameters
   * @returns Barcode image
   * 
   * @example
   * ```typescript
   * const result = await labelsManager.getBarcode({
   *   id: 789
   * });
   * 
   * if (result.data.barcode) {
   *   // Save result.data.barcode (base64) to image file
   *   console.log(`Barcode type: ${result.data.type}`);
   * }
   * ```
   */
  async getBarcode(
    params: GetBarcodeRequest
  ): Promise<IHttpResponse<GetBarcodeResponse>> {
    return this.httpClient.post('/v2/posting/fbs/act/get-barcode', params);
  }

  /**
   * Get barcode text value
   * 
   * Returns the barcode from /v2/posting/fbs/act/get-barcode response 
   * in text format.
   * 
   * @param params - Barcode text request parameters
   * @returns Barcode as text
   * 
   * @example
   * ```typescript
   * const result = await labelsManager.getBarcodeText({
   *   id: 789
   * });
   * 
   * console.log(`Barcode value: ${result.data.barcode}`);
   * ```
   */
  async getBarcodeText(
    params: GetBarcodeTextRequest
  ): Promise<IHttpResponse<GetBarcodeTextResponse>> {
    return this.httpClient.post('/v2/posting/fbs/act/get-barcode/text', params);
  }

  /**
   * Check digital act formation status
   * 
   * Checks the status of digital act (waybill) formation.
   * 
   * @param params - Digital act status check parameters
   * @returns Act formation status
   * 
   * @example
   * ```typescript
   * const result = await labelsManager.checkDigitalActStatus({
   *   carriage_id: 456
   * });
   * 
   * console.log(`Act status: ${result.data.status}`);
   * if (result.data.message) {
   *   console.log(`Message: ${result.data.message}`);
   * }
   * ```
   */
  async checkDigitalActStatus(
    params: CheckDigitalActStatusRequest
  ): Promise<IHttpResponse<CheckDigitalActStatusResponse>> {
    return this.httpClient.post('/v2/posting/fbs/digital/act/check-status', params);
  }

  /**
   * Check act status and documents
   * 
   * Returns status of barcode generation and documents:
   * - For Russian sellers: shipping waybill and shipment list
   * - For CIS sellers: shipping waybill and acceptance-transfer act
   * 
   * @param params - Act status check parameters
   * @returns Act and documents status
   * 
   * @example
   * ```typescript
   * const result = await labelsManager.checkActStatus({
   *   id: 789
   * });
   * 
   * console.log(`Act status: ${result.data.status}`);
   * 
   * // Wait for documents to be ready
   * if (result.data.status === 'FORMED') {
   *   console.log('Documents are ready for download');
   * } else if (result.data.status === 'CREATING') {
   *   console.log('Documents are being generated...');
   * }
   * ```
   */
  async checkActStatus(
    params: CheckActStatusRequest
  ): Promise<IHttpResponse<CheckActStatusResponse>> {
    return this.httpClient.post('/v2/posting/fbs/act/check-status', params);
  }
}