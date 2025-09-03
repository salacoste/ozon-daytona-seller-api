/**
 * SupplierAPI implementation
 * Supplier integration and management
 * 
 * 📄 **Управление таможенными счёт-фактурами для возврата НДС продавцам из Турции**
 * 📄 **Customs invoice management for VAT refund to Turkish sellers**
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
 * // Upload invoice file (JPEG or PDF, max 10MB)
 * const uploadResult = await api.supplier.uploadInvoiceFile({
 *   base64_content: 'base64EncodedPdfContent',
 *   posting_number: '0001-1234567-0000001'
 * });
 * 
 * // Create or update invoice
 * const invoice = await api.supplier.createOrUpdateInvoice({
 *   date: '2024-01-15T10:00:00Z',
 *   posting_number: '0001-1234567-0000001',
 *   url: uploadResult.url!,
 *   number: 'INV-2024-001',
 *   price: 10000.50,
 *   price_currency: 'TRY',
 *   hs_codes: [
 *     { code: '1234567890' }
 *   ]
 * });
 * 
 * // Get invoice information
 * const invoiceInfo = await api.supplier.getInvoice({
 *   posting_number: '0001-1234567-0000001'
 * });
 * 
 * // Delete invoice reference
 * const deleteResult = await api.supplier.deleteInvoice({
 *   posting_number: '0001-1234567-0000001'
 * });
 * ```
 */

import { HttpClient } from '../../core/http.js';
import type { RequestOptions } from '../../core/types.js';

// Request types
import {
  SupplierInvoiceDeleteRequest,
  SupplierInvoiceFileUploadRequest,
  SupplierInvoiceCreateOrUpdateRequest,
  SupplierInvoiceGetRequest,
} from '../../types/requests/supplier';

// Response types
import {
  SupplierInvoiceDeleteResponse,
  SupplierInvoiceFileUploadResponse,
  SupplierInvoiceCreateOrUpdateResponse,
  SupplierInvoiceGetResponse,
} from '../../types/responses/supplier';

/**
 * SupplierAPI class
 * Handles supplier integration and management operations
 */
export class SupplierApi {
  constructor(private readonly httpClient: HttpClient) {}
  /**
   * Удалить ссылку на счёт-фактуру
   * Delete invoice reference
   * 
   * @param request - Invoice deletion request
   * @param options - Request options
   * @returns Promise with deletion result
   * 
   * @example
   * ```typescript
   * const result = await api.supplier.deleteInvoice({
   *   posting_number: '0001-1234567-0000001'
   * });
   * console.log('Deletion result:', result.result);
   * ```
   */
  async deleteInvoice(
    request: SupplierInvoiceDeleteRequest,
    options?: RequestOptions
  ): Promise<SupplierInvoiceDeleteResponse> {
    return this.httpClient.request<
      SupplierInvoiceDeleteRequest,
      SupplierInvoiceDeleteResponse
    >(
      'POST',
      '/v1/invoice/delete',
      request,
      options
    );
  }

  /**
   * Загрузить файл счёт-фактуры
   * Upload invoice file
   * 
   * @param request - Invoice file upload request
   * @param options - Request options
   * @returns Promise with upload result
   * 
   * @example
   * ```typescript
   * const result = await api.supplier.uploadInvoiceFile({
   *   base64_content: 'base64EncodedPdfContent',
   *   posting_number: '0001-1234567-0000001'
   * });
   * console.log('Invoice URL:', result.url);
   * ```
   */
  async uploadInvoiceFile(
    request: SupplierInvoiceFileUploadRequest,
    options?: RequestOptions
  ): Promise<SupplierInvoiceFileUploadResponse> {
    return this.httpClient.request<
      SupplierInvoiceFileUploadRequest,
      SupplierInvoiceFileUploadResponse
    >(
      'POST',
      '/v1/invoice/file/upload',
      request,
      options
    );
  }

  /**
   * Создать или изменить счёт-фактуру
   * Create or update invoice
   * 
   * @param request - Invoice creation/update request
   * @param options - Request options
   * @returns Promise with invoice information
   * 
   * @example
   * ```typescript
   * const result = await api.supplier.createOrUpdateInvoice({
   *   date: '2024-01-15T10:00:00Z',
   *   posting_number: '0001-1234567-0000001',
   *   url: 'https://ozon.ru/invoice/abc123',
   *   number: 'INV-2024-001',
   *   price: 10000.50,
   *   price_currency: 'USD',
   *   hs_codes: [
   *     { code: '1234567890' },
   *     { code: '0987654321' }
   *   ]
   * });
   * 
   * console.log('Creation result:', result.result);
   * ```
   */
  async createOrUpdateInvoice(
    request: SupplierInvoiceCreateOrUpdateRequest,
    options?: RequestOptions
  ): Promise<SupplierInvoiceCreateOrUpdateResponse> {
    return this.httpClient.request<
      SupplierInvoiceCreateOrUpdateRequest,
      SupplierInvoiceCreateOrUpdateResponse
    >(
      'POST',
      '/v2/invoice/create-or-update',
      request,
      options
    );
  }

  /**
   * Получить информацию о счёт-фактуре
   * Get invoice information
   * 
   * @param request - Invoice info request
   * @param options - Request options
   * @returns Promise with invoice information
   * 
   * @example
   * ```typescript
   * const invoiceInfo = await api.supplier.getInvoice({
   *   posting_number: '0001-1234567-0000001'
   * });
   * 
   * const invoice = invoiceInfo.result;
   * console.log('Invoice number:', invoice?.number);
   * console.log('Date:', invoice?.date);
   * console.log('Price:', invoice?.price, invoice?.price_currency);
   * console.log('File URL:', invoice?.file_url);
   * 
   * invoice?.hs_codes?.forEach(hsCode => {
   *   console.log('HS Code:', hsCode.code);
   * });
   * ```
   */
  async getInvoice(
    request: SupplierInvoiceGetRequest,
    options?: RequestOptions
  ): Promise<SupplierInvoiceGetResponse> {
    return this.httpClient.request<
      SupplierInvoiceGetRequest,
      SupplierInvoiceGetResponse
    >(
      'POST',
      '/v2/invoice/get',
      request,
      options
    );
  }
}