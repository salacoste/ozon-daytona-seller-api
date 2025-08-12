/**
 * SupplierAPI client for Ozon Seller API
 * 
 * Implements invoice operations from /methods/21-supplierapi.json:
 * - Invoice creation and updates
 * - File upload for invoices (JPEG/PDF up to 10MB)
 * - Invoice information retrieval
 * - Invoice deletion
 */

import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type {
  InvoiceCreateOrUpdateRequest,
  InvoiceCreateOrUpdateResponse,
  InvoiceFileUploadRequest,
  InvoiceFileUploadResponse,
  InvoiceGetRequest,
  InvoiceGetResponse,
  InvoiceDeleteRequest,
  InvoiceDeleteResponse
} from './types';

/**
 * Supplier API client implementing invoice operations
 */
export class SupplierAPI {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Create or update invoice V2
   * 
   * Creates or modifies customs invoice for VAT refund to Turkish sellers.
   * All required fields must be provided: date, posting_number, and url.
   * 
   * @param params - Invoice creation/update parameters
   * @returns Invoice creation/update result
   * 
   * @example
   * ```typescript
   * // First upload the invoice file
   * const uploadResult = await client.supplier.invoiceFileUploadV1({
   *   posting_number: '33920146-0252-1',
   *   base64_content: 'base64-encoded-pdf-content'
   * });
   * 
   * // Then create or update the invoice
   * const result = await client.supplier.invoiceCreateOrUpdateV2({
   *   date: '2023-08-01T12:08:44.342Z',
   *   posting_number: '33920146-0252-1',
   *   url: uploadResult.data.url!,
   *   number: '424fdsf234',
   *   price: 234.34,
   *   price_currency: 'RUB',
   *   hs_codes: [
   *     { sku: 'SKU123', code: '534758761999' },
   *     { sku: 'SKU456', code: '534758761000' }
   *   ]
   * });
   * 
   * console.log('Invoice created:', result.data.result);
   * ```
   */
  async invoiceCreateOrUpdateV2(
    params: InvoiceCreateOrUpdateRequest
  ): Promise<IHttpResponse<InvoiceCreateOrUpdateResponse>> {
    return this.httpClient.post('/v2/invoice/create-or-update', params);
  }

  /**
   * Upload invoice file V1
   * 
   * Uploads invoice file in JPEG or PDF format (up to 10 MB).
   * Returns URL that can be used in invoiceCreateOrUpdateV2.
   * 
   * @param params - File upload parameters
   * @returns Upload result with file URL
   * 
   * @example
   * ```typescript
   * import { readFileSync } from 'fs';
   * 
   * // Read and encode file
   * const fileBuffer = readFileSync('invoice.pdf');
   * const base64Content = fileBuffer.toString('base64');
   * 
   * const result = await client.supplier.invoiceFileUploadV1({
   *   posting_number: '33920146-0252-1',
   *   base64_content: base64Content
   * });
   * 
   * console.log('File uploaded:', result.data.url);
   * ```
   */
  async invoiceFileUploadV1(
    params: InvoiceFileUploadRequest
  ): Promise<IHttpResponse<InvoiceFileUploadResponse>> {
    return this.httpClient.post('/v1/invoice/file/upload', params);
  }

  /**
   * Get invoice information V2
   * 
   * Retrieves information about existing invoice by posting number.
   * 
   * @param params - Invoice retrieval parameters
   * @returns Invoice information
   * 
   * @example
   * ```typescript
   * const result = await client.supplier.invoiceGetV2({
   *   posting_number: '33920146-0252-1'
   * });
   * 
   * const invoice = result.data.result;
   * if (invoice) {
   *   console.log(`Invoice ${invoice.number} for ${invoice.price} ${invoice.price_currency}`);
   *   console.log(`File URL: ${invoice.file_url}`);
   *   console.log(`HS Codes: ${invoice.hs_codes?.length || 0} items`);
   * }
   * ```
   */
  async invoiceGetV2(
    params: InvoiceGetRequest
  ): Promise<IHttpResponse<InvoiceGetResponse>> {
    return this.httpClient.post('/v2/invoice/get', params);
  }

  /**
   * Delete invoice V1
   * 
   * Removes the file URL binding for the specified posting number.
   * 
   * @param params - Invoice deletion parameters
   * @returns Deletion result
   * 
   * @example
   * ```typescript
   * const result = await client.supplier.invoiceDeleteV1({
   *   posting_number: '33920146-0252-1'
   * });
   * 
   * console.log('Invoice deleted:', result.data.result);
   * ```
   */
  async invoiceDeleteV1(
    params: InvoiceDeleteRequest
  ): Promise<IHttpResponse<InvoiceDeleteResponse>> {
    return this.httpClient.post('/v1/invoice/delete', params);
  }
}