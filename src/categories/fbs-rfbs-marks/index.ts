/**
 * FBS&rFBSMarks API implementation
 * Product marking and exemplar management
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
 * // Upload marking exemplar
 * const uploadResult = await api.fbsRfbsMarks.createProductExemplar({
 *   product_id: 123456,
 *   file: 'base64EncodedPdfContent',
 *   file_name: 'marking_exemplar.pdf'
 * });
 * 
 * // Upload marking codes for posting
 * const codesResult = await api.fbsRfbsMarks.uploadPostingCodes({
 *   posting_number: 'FBS-123456789',
 *   codes: [
 *     { sku: 'SKU123', gtd: 'marking_code_1', quantity: 1 },
 *     { sku: 'SKU456', gtd: 'marking_code_2', quantity: 2 }
 *   ]
 * });
 * ```
 */

import { HttpClient } from '../../core/http.js';
import type { RequestOptions } from '../../core/types.js';

// Request types
import {
  FbsRfbsMarksProductExemplarCreateRequest,
  FbsRfbsMarksProductExemplarInfoRequest,
  FbsRfbsMarksProductExemplarListRequest,
  FbsRfbsMarksProductExemplarDeleteRequest,
  FbsRfbsMarksProductExemplarDeleteStatusRequest,
  FbsRfbsMarksProductExemplarValidateRequest,
  FbsRfbsMarksProductExemplarValidateStatusRequest,
  FbsRfbsMarksPostingCodesUploadRequest,
  FbsRfbsMarksPostingCodesUploadStatusRequest,
  FbsRfbsMarksPostingCodesValidateRequest,
  FbsRfbsMarksPostingCodesValidateStatusRequest,
  FbsRfbsMarksPostingCodesInfoRequest,
  FbsRfbsMarksPostingListRequest,
} from '../../types/requests/fbs-rfbs-marks';

// Response types
import {
  FbsRfbsMarksProductExemplarCreateResponse,
  FbsRfbsMarksProductExemplarInfoResponse,
  FbsRfbsMarksProductExemplarListResponse,
  FbsRfbsMarksProductExemplarDeleteResponse,
  FbsRfbsMarksProductExemplarDeleteStatusResponse,
  FbsRfbsMarksProductExemplarValidateResponse,
  FbsRfbsMarksProductExemplarValidateStatusResponse,
  FbsRfbsMarksPostingCodesUploadResponse,
  FbsRfbsMarksPostingCodesUploadStatusResponse,
  FbsRfbsMarksPostingCodesValidateResponse,
  FbsRfbsMarksPostingCodesValidateStatusResponse,
  FbsRfbsMarksPostingCodesInfoResponse,
  FbsRfbsMarksPostingListResponse,
} from '../../types/responses/fbs-rfbs-marks';

/**
 * FBS&rFBSMarks API class
 * Handles product marking and exemplar management operations
 */
export class FbsRfbsMarksApi {
  constructor(private readonly httpClient: HttpClient) {}
  /**
   * Загрузить образец маркировки товара
   * Upload product marking exemplar
   * 
   * @param request - Product exemplar upload request
   * @param options - Request options
   * @returns Promise with upload task information
   * 
   * @example
   * ```typescript
   * const result = await api.fbsRfbsMarks.createProductExemplar({
   *   product_id: 123456,
   *   file: 'base64EncodedPdfContent',
   *   file_name: 'marking_exemplar.pdf'
   * });
   * console.log('Upload task ID:', result.task_id);
   * ```
   */
  async createProductExemplar(
    request: FbsRfbsMarksProductExemplarCreateRequest,
    options?: RequestOptions
  ): Promise<FbsRfbsMarksProductExemplarCreateResponse> {
    return this.httpClient.request<
      FbsRfbsMarksProductExemplarCreateRequest,
      FbsRfbsMarksProductExemplarCreateResponse
    >(
      'POST',
      '/v1/product/exemplar/create',
      request,
      options
    );
  }

  /**
   * Получить информацию о загруженном образце маркировки
   * Get uploaded marking exemplar information
   * 
   * @param request - Exemplar info request
   * @param options - Request options
   * @returns Promise with exemplar information
   * 
   * @example
   * ```typescript
   * const info = await api.fbsRfbsMarks.getProductExemplarInfo({
   *   task_id: 'upload_task_123'
   * });
   * console.log('Exemplar status:', info.status);
   * ```
   */
  async getProductExemplarInfo(
    request: FbsRfbsMarksProductExemplarInfoRequest,
    options?: RequestOptions
  ): Promise<FbsRfbsMarksProductExemplarInfoResponse> {
    return this.httpClient.request<
      FbsRfbsMarksProductExemplarInfoRequest,
      FbsRfbsMarksProductExemplarInfoResponse
    >(
      'POST',
      '/v1/product/exemplar/info',
      request,
      options
    );
  }

  /**
   * Получить список образцов маркировки товара
   * Get product marking exemplars list
   * 
   * @param request - Exemplars list request
   * @param options - Request options
   * @returns Promise with exemplars list
   * 
   * @example
   * ```typescript
   * const exemplars = await api.fbsRfbsMarks.getProductExemplarList({
   *   product_id: 123456,
   *   limit: 20,
   *   offset: 0
   * });
   * console.log('Found exemplars:', exemplars.total);
   * ```
   */
  async getProductExemplarList(
    request: FbsRfbsMarksProductExemplarListRequest,
    options?: RequestOptions
  ): Promise<FbsRfbsMarksProductExemplarListResponse> {
    return this.httpClient.request<
      FbsRfbsMarksProductExemplarListRequest,
      FbsRfbsMarksProductExemplarListResponse
    >(
      'POST',
      '/v1/product/exemplar/list',
      request,
      options
    );
  }

  /**
   * Удалить образец маркировки
   * Delete marking exemplar
   * 
   * @param request - Exemplar deletion request
   * @param options - Request options
   * @returns Promise with deletion task information
   * 
   * @example
   * ```typescript
   * const result = await api.fbsRfbsMarks.deleteProductExemplar({
   *   exemplar_id: 'exemplar_123'
   * });
   * console.log('Deletion task ID:', result.task_id);
   * ```
   */
  async deleteProductExemplar(
    request: FbsRfbsMarksProductExemplarDeleteRequest,
    options?: RequestOptions
  ): Promise<FbsRfbsMarksProductExemplarDeleteResponse> {
    return this.httpClient.request<
      FbsRfbsMarksProductExemplarDeleteRequest,
      FbsRfbsMarksProductExemplarDeleteResponse
    >(
      'POST',
      '/v1/product/exemplar/delete',
      request,
      options
    );
  }

  /**
   * Получить статус удаления образца маркировки
   * Get marking exemplar deletion status
   * 
   * @param request - Deletion status request
   * @param options - Request options
   * @returns Promise with deletion status
   * 
   * @example
   * ```typescript
   * const status = await api.fbsRfbsMarks.getProductExemplarDeleteStatus({
   *   task_id: 'deletion_task_123'
   * });
   * console.log('Deletion completed:', status.success);
   * ```
   */
  async getProductExemplarDeleteStatus(
    request: FbsRfbsMarksProductExemplarDeleteStatusRequest,
    options?: RequestOptions
  ): Promise<FbsRfbsMarksProductExemplarDeleteStatusResponse> {
    return this.httpClient.request<
      FbsRfbsMarksProductExemplarDeleteStatusRequest,
      FbsRfbsMarksProductExemplarDeleteStatusResponse
    >(
      'POST',
      '/v1/product/exemplar/delete/status',
      request,
      options
    );
  }

  /**
   * Валидировать образец маркировки
   * Validate marking exemplar
   * 
   * @param request - Exemplar validation request
   * @param options - Request options
   * @returns Promise with validation task information
   * 
   * @example
   * ```typescript
   * const result = await api.fbsRfbsMarks.validateProductExemplar({
   *   exemplar_id: 'exemplar_123'
   * });
   * console.log('Validation task ID:', result.task_id);
   * ```
   */
  async validateProductExemplar(
    request: FbsRfbsMarksProductExemplarValidateRequest,
    options?: RequestOptions
  ): Promise<FbsRfbsMarksProductExemplarValidateResponse> {
    return this.httpClient.request<
      FbsRfbsMarksProductExemplarValidateRequest,
      FbsRfbsMarksProductExemplarValidateResponse
    >(
      'POST',
      '/v1/product/exemplar/validate',
      request,
      options
    );
  }

  /**
   * Получить статус валидации образца маркировки
   * Get marking exemplar validation status
   * 
   * @param request - Validation status request
   * @param options - Request options
   * @returns Promise with validation status and details
   * 
   * @example
   * ```typescript
   * const status = await api.fbsRfbsMarks.getProductExemplarValidateStatus({
   *   task_id: 'validation_task_123'
   * });
   * console.log('Is valid:', status.is_valid);
   * console.log('Quality check:', status.validation_details?.quality_valid);
   * ```
   */
  async getProductExemplarValidateStatus(
    request: FbsRfbsMarksProductExemplarValidateStatusRequest,
    options?: RequestOptions
  ): Promise<FbsRfbsMarksProductExemplarValidateStatusResponse> {
    return this.httpClient.request<
      FbsRfbsMarksProductExemplarValidateStatusRequest,
      FbsRfbsMarksProductExemplarValidateStatusResponse
    >(
      'POST',
      '/v1/product/exemplar/validate/status',
      request,
      options
    );
  }

  /**
   * Загрузить коды маркировки для отправления
   * Upload marking codes for posting
   * 
   * @param request - Codes upload request
   * @param options - Request options
   * @returns Promise with upload task information
   * 
   * @example
   * ```typescript
   * const result = await api.fbsRfbsMarks.uploadPostingCodes({
   *   posting_number: 'FBS-123456789',
   *   codes: [
   *     { sku: 'SKU123', gtd: 'marking_code_1', quantity: 1 },
   *     { sku: 'SKU456', gtd: 'marking_code_2', quantity: 2 }
   *   ]
   * });
   * console.log('Upload task ID:', result.task_id);
   * ```
   */
  async uploadPostingCodes(
    request: FbsRfbsMarksPostingCodesUploadRequest,
    options?: RequestOptions
  ): Promise<FbsRfbsMarksPostingCodesUploadResponse> {
    return this.httpClient.request<
      FbsRfbsMarksPostingCodesUploadRequest,
      FbsRfbsMarksPostingCodesUploadResponse
    >(
      'POST',
      '/v1/posting/fbs/rfbs/upload-marking-codes',
      request,
      options
    );
  }

  /**
   * Получить статус загрузки кодов маркировки
   * Get marking codes upload status
   * 
   * @param request - Upload status request
   * @param options - Request options
   * @returns Promise with upload status and results
   * 
   * @example
   * ```typescript
   * const status = await api.fbsRfbsMarks.getPostingCodesUploadStatus({
   *   task_id: 'upload_task_123'
   * });
   * console.log('Valid codes:', status.upload_result?.valid_codes);
   * console.log('Invalid codes:', status.upload_result?.invalid_codes);
   * ```
   */
  async getPostingCodesUploadStatus(
    request: FbsRfbsMarksPostingCodesUploadStatusRequest,
    options?: RequestOptions
  ): Promise<FbsRfbsMarksPostingCodesUploadStatusResponse> {
    return this.httpClient.request<
      FbsRfbsMarksPostingCodesUploadStatusRequest,
      FbsRfbsMarksPostingCodesUploadStatusResponse
    >(
      'POST',
      '/v1/posting/fbs/rfbs/upload-marking-codes/status',
      request,
      options
    );
  }

  /**
   * Проверить коды маркировки отправления
   * Validate posting marking codes
   * 
   * @param request - Codes validation request
   * @param options - Request options
   * @returns Promise with validation task information
   * 
   * @example
   * ```typescript
   * const result = await api.fbsRfbsMarks.validatePostingCodes({
   *   posting_number: 'FBS-123456789'
   * });
   * console.log('Validation task ID:', result.task_id);
   * ```
   */
  async validatePostingCodes(
    request: FbsRfbsMarksPostingCodesValidateRequest,
    options?: RequestOptions
  ): Promise<FbsRfbsMarksPostingCodesValidateResponse> {
    return this.httpClient.request<
      FbsRfbsMarksPostingCodesValidateRequest,
      FbsRfbsMarksPostingCodesValidateResponse
    >(
      'POST',
      '/v1/posting/fbs/rfbs/validate-marking-codes',
      request,
      options
    );
  }

  /**
   * Получить статус проверки кодов маркировки
   * Get marking codes validation status
   * 
   * @param request - Validation status request
   * @param options - Request options
   * @returns Promise with validation status and detailed results
   * 
   * @example
   * ```typescript
   * const status = await api.fbsRfbsMarks.getPostingCodesValidateStatus({
   *   task_id: 'validation_task_123'
   * });
   * console.log('All valid:', status.validation_result?.all_valid);
   * console.log('Valid percentage:', status.validation_result?.valid_percentage);
   * ```
   */
  async getPostingCodesValidateStatus(
    request: FbsRfbsMarksPostingCodesValidateStatusRequest,
    options?: RequestOptions
  ): Promise<FbsRfbsMarksPostingCodesValidateStatusResponse> {
    return this.httpClient.request<
      FbsRfbsMarksPostingCodesValidateStatusRequest,
      FbsRfbsMarksPostingCodesValidateStatusResponse
    >(
      'POST',
      '/v1/posting/fbs/rfbs/validate-marking-codes/status',
      request,
      options
    );
  }

  /**
   * Получить информацию о кодах маркировки отправления
   * Get posting marking codes information
   * 
   * @param request - Codes info request
   * @param options - Request options
   * @returns Promise with detailed codes information
   * 
   * @example
   * ```typescript
   * const info = await api.fbsRfbsMarks.getPostingCodesInfo({
   *   posting_number: 'FBS-123456789'
   * });
   * console.log('Marking required:', info.marking_required);
   * console.log('Products with codes:', info.summary?.products_with_codes);
   * ```
   */
  async getPostingCodesInfo(
    request: FbsRfbsMarksPostingCodesInfoRequest,
    options?: RequestOptions
  ): Promise<FbsRfbsMarksPostingCodesInfoResponse> {
    return this.httpClient.request<
      FbsRfbsMarksPostingCodesInfoRequest,
      FbsRfbsMarksPostingCodesInfoResponse
    >(
      'POST',
      '/v1/posting/fbs/rfbs/marking-codes/info',
      request,
      options
    );
  }

  /**
   * Получить список отправлений с обязательной маркировкой
   * Get postings with mandatory marking list
   * 
   * @param request - Postings list request
   * @param options - Request options
   * @returns Promise with postings list that require marking
   * 
   * @example
   * ```typescript
   * const postings = await api.fbsRfbsMarks.getPostingList({
   *   status: 'awaiting_codes',
   *   date_from: '2024-01-01T00:00:00Z',
   *   date_to: '2024-01-31T23:59:59Z',
   *   limit: 50
   * });
   * console.log('Postings awaiting codes:', postings.total);
   * ```
   */
  async getPostingList(
    request: FbsRfbsMarksPostingListRequest,
    options?: RequestOptions
  ): Promise<FbsRfbsMarksPostingListResponse> {
    return this.httpClient.request<
      FbsRfbsMarksPostingListRequest,
      FbsRfbsMarksPostingListResponse
    >(
      'POST',
      '/v1/posting/fbs/rfbs/list',
      request,
      options
    );
  }
}