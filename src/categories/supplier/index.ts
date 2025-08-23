/**
 * SupplierAPI implementation
 * Supplier integration and management
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
 * // Upload invoice file
 * const uploadResult = await api.supplier.uploadInvoiceFile({
 *   file: 'base64EncodedPdfContent',
 *   file_name: 'invoice_001.pdf',
 *   document_type: 'invoice'
 * });
 * 
 * // Create or update invoice
 * const invoice = await api.supplier.createOrUpdateInvoice({
 *   invoice_number: 'INV-2024-001',
 *   invoice_date: '2024-01-15',
 *   file_id: uploadResult.file_id,
 *   total_amount: 10000.00,
 *   currency: 'RUB',
 *   vat_amount: 1000.00,
 *   items: [
 *     {
 *       sku: 'SKU123',
 *       name: 'Product Name',
 *       quantity: 10,
 *       unit_price: 900.00,
 *       total_price: 9000.00,
 *       vat_rate: 20
 *     }
 *   ]
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
   *   invoice_id: 'invoice_123'
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
   *   file: 'base64EncodedPdfContent',
   *   file_name: 'invoice_001.pdf',
   *   document_type: 'invoice'
   * });
   * console.log('File ID:', result.file_id);
   * console.log('Upload status:', result.status);
   * console.log('File URL:', result.file_url);
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
   * // Create new invoice
   * const newInvoice = await api.supplier.createOrUpdateInvoice({
   *   invoice_number: 'INV-2024-001',
   *   invoice_date: '2024-01-15',
   *   file_id: 'uploaded_file_id',
   *   total_amount: 10000.00,
   *   currency: 'RUB',
   *   vat_amount: 1000.00,
   *   items: [
   *     {
   *       sku: 'SKU123',
   *       name: 'Product Name',
   *       quantity: 10,
   *       unit_price: 900.00,
   *       total_price: 9000.00,
   *       vat_rate: 20
   *     }
   *   ]
   * });
   * 
   * // Update existing invoice
   * const updatedInvoice = await api.supplier.createOrUpdateInvoice({
   *   invoice_id: 'existing_invoice_id',
   *   invoice_number: 'INV-2024-001-UPDATED',
   *   total_amount: 12000.00,
   *   vat_amount: 1200.00
   * });
   * 
   * console.log('Invoice ID:', newInvoice.invoice?.invoice_id);
   * console.log('Status:', newInvoice.invoice?.status);
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
   *   invoice_id: 'invoice_123'
   * });
   * 
   * const invoice = invoiceInfo.invoice;
   * console.log('Invoice number:', invoice?.invoice_number);
   * console.log('Status:', invoice?.status);
   * console.log('Total amount:', invoice?.total_amount, invoice?.currency);
   * console.log('Items count:', invoice?.items?.length);
   * 
   * invoice?.items?.forEach(item => {
   *   console.log(`${item.name}: ${item.quantity} x ${item.unit_price} = ${item.total_price}`);
   * });
   * 
   * if (invoice?.status === 'rejected') {
   *   console.log('Rejection reason:', invoice.rejection_reason);
   * }
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