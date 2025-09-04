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
 * // Update exemplar data
 * const updateResult = await api.fbsRfbsMarks.updateProductExemplar({
 *   posting_number: 'FBS-123456789',
 *   products: [{
 *     product_id: 123456,
 *     exemplars: [{
 *       exemplar_id: 'exemplar_123',
 *       marking_code: 'marking_code_123',
 *       gtd: 'GTD123456'
 *     }]
 *   }]
 * });
 *
 * // Set exemplar data (v4)
 * const setResult = await api.fbsRfbsMarks.setProductExemplarV4({
 *   posting_number: 'FBS-123456789',
 *   products: [{
 *     product_id: 123456,
 *     exemplars: [{
 *       marking_code: 'marking_code_123',
 *       gtd: 'GTD123456'
 *     }]
 *   }]
 * });
 * ```
 */

import { HttpClient } from "../../core/http.js";
import type { RequestOptions } from "../../core/types.js";

// Request types
import {
  FbsRfbsMarksProductExemplarUpdateRequest,
  FbsRfbsMarksProductExemplarSetV4Request,
  FbsRfbsMarksProductExemplarStatusV4Request,
  FbsRfbsMarksProductExemplarValidateV4Request,
  FbsRfbsMarksPostingShipV4Request,
  FbsRfbsMarksPostingShipPackageV4Request,
  FbsRfbsMarksProductExemplarCreateOrGetV5Request,
  FbsRfbsMarksProductExemplarSetV5Request,
  FbsRfbsMarksProductExemplarStatusV5Request,
  FbsRfbsMarksProductExemplarValidateV5Request,
  FbsRfbsMarksProductExemplarCreateOrGetV6Request,
  FbsRfbsMarksProductExemplarSetV6Request,
  FbsRfbsMarksPostingCodesUploadStatusRequest,
  FbsRfbsMarksPostingCodesValidateRequest,
  FbsRfbsMarksPostingCodesValidateStatusRequest,
  FbsRfbsMarksPostingCodesInfoRequest,
  FbsRfbsMarksPostingListRequest,
} from "../../types/requests/fbs-rfbs-marks.js";

// Response types
import {
  FbsRfbsMarksProductExemplarUpdateResponse,
  FbsRfbsMarksProductExemplarSetV4Response,
  FbsRfbsMarksProductExemplarStatusV4Response,
  FbsRfbsMarksProductExemplarValidateV4Response,
  FbsRfbsMarksPostingShipV4Response,
  FbsRfbsMarksPostingShipPackageV4Response,
  FbsRfbsMarksProductExemplarCreateOrGetV5Response,
  FbsRfbsMarksProductExemplarSetV5Response,
  FbsRfbsMarksProductExemplarStatusV5Response,
  FbsRfbsMarksProductExemplarValidateV5Response,
  FbsRfbsMarksProductExemplarCreateOrGetV6Response,
  FbsRfbsMarksProductExemplarSetV6Response,
  FbsRfbsMarksPostingCodesUploadStatusResponse,
  FbsRfbsMarksPostingCodesValidateResponse,
  FbsRfbsMarksPostingCodesValidateStatusResponse,
  FbsRfbsMarksPostingCodesInfoResponse,
  FbsRfbsMarksPostingListResponse,
} from "../../types/responses/fbs-rfbs-marks.js";

/**
 * FBS&rFBSMarks API class
 * Handles product marking and exemplar management operations
 */
export class FbsRfbsMarksApi {
  constructor(private readonly httpClient: HttpClient) {}

  // ============ V1 API Methods ============

  /**
   * Обновить данные экземпляров
   * Update exemplar data
   *
   * @param request - Exemplar update request
   * @param options - Request options
   * @returns Promise with operation result
   *
   * @example
   * ```typescript
   * const result = await api.fbsRfbsMarks.updateProductExemplar({
   *   posting_number: 'FBS-123456789',
   *   products: [{
   *     product_id: 123456,
   *     exemplars: [{
   *       exemplar_id: 'exemplar_123',
   *       marking_code: 'marking_code_123',
   *       gtd: 'GTD123456'
   *     }]
   *   }]
   * });
   * console.log('Update result:', result.result);
   * ```
   */
  async updateProductExemplar(request: FbsRfbsMarksProductExemplarUpdateRequest, options?: RequestOptions): Promise<FbsRfbsMarksProductExemplarUpdateResponse> {
    return this.httpClient.request<FbsRfbsMarksProductExemplarUpdateRequest, FbsRfbsMarksProductExemplarUpdateResponse>("POST", "/v1/fbs/posting/product/exemplar/update", request, options);
  }

  // ============ V4 API Methods ============

  /**
   * Проверить и сохранить данные экземпляров (v4)
   * Check and save exemplar data (v4)
   *
   * @param request - Exemplar set request v4
   * @param options - Request options
   * @returns Promise with operation result
   *
   * @deprecated В будущем метод будет отключён. Используйте /v5/fbs/posting/product/exemplar/set
   *
   * @example
   * ```typescript
   * const result = await api.fbsRfbsMarks.setProductExemplarV4({
   *   posting_number: 'FBS-123456789',
   *   products: [{
   *     product_id: 123456,
   *     exemplars: [{
   *       marking_code: 'marking_code_123',
   *       gtd: 'GTD123456',
   *       is_gtd_absent: false
   *     }]
   *   }]
   * });
   * console.log('Set result:', result.result);
   * ```
   */
  async setProductExemplarV4(request: FbsRfbsMarksProductExemplarSetV4Request, options?: RequestOptions): Promise<FbsRfbsMarksProductExemplarSetV4Response> {
    return this.httpClient.request<FbsRfbsMarksProductExemplarSetV4Request, FbsRfbsMarksProductExemplarSetV4Response>("POST", "/v4/fbs/posting/product/exemplar/set", request, options);
  }

  /**
   * Получить статус добавления экземпляров (v4)
   * Get exemplar addition status (v4)
   *
   * @param request - Exemplar status request v4
   * @param options - Request options
   * @returns Promise with exemplar status and data
   *
   * @example
   * ```typescript
   * const status = await api.fbsRfbsMarks.getProductExemplarStatusV4({
   *   posting_number: 'FBS-123456789'
   * });
   * console.log('Status:', status.status);
   * console.log('Exemplars:', status.exemplars);
   * ```
   */
  async getProductExemplarStatusV4(request: FbsRfbsMarksProductExemplarStatusV4Request, options?: RequestOptions): Promise<FbsRfbsMarksProductExemplarStatusV4Response> {
    return this.httpClient.request<FbsRfbsMarksProductExemplarStatusV4Request, FbsRfbsMarksProductExemplarStatusV4Response>("POST", "/v4/fbs/posting/product/exemplar/status", request, options);
  }

  /**
   * Валидация кодов маркировки (v4)
   * Validate marking codes (v4)
   *
   * @param request - Exemplar validate request v4
   * @param options - Request options
   * @returns Promise with validation result
   *
   * @example
   * ```typescript
   * const result = await api.fbsRfbsMarks.validateProductExemplarV4({
   *   posting_number: 'FBS-123456789',
   *   products: [{
   *     product_id: 123456,
   *     exemplars: [{
   *       marking_code: 'marking_code_123',
   *       gtd: 'GTD123456'
   *     }]
   *   }]
   * });
   * console.log('Validation result:', result.result);
   * ```
   */
  async validateProductExemplarV4(request: FbsRfbsMarksProductExemplarValidateV4Request, options?: RequestOptions): Promise<FbsRfbsMarksProductExemplarValidateV4Response> {
    return this.httpClient.request<FbsRfbsMarksProductExemplarValidateV4Request, FbsRfbsMarksProductExemplarValidateV4Response>("POST", "/v4/fbs/posting/product/exemplar/validate", request, options);
  }

  /**
   * Собрать заказ (v4)
   * Ship order (v4)
   *
   * @param request - Posting ship request v4
   * @param options - Request options
   * @returns Promise with ship result
   *
   * @example
   * ```typescript
   * const result = await api.fbsRfbsMarks.shipPostingV4({
   *   posting_number: 'FBS-123456789',
   *   packages: [{
   *     products: [{
   *       product_id: 123456,
   *       quantity: 2
   *     }]
   *   }]
   * });
   * console.log('Ship result:', result.result);
   * ```
   */
  async shipPostingV4(request: FbsRfbsMarksPostingShipV4Request, options?: RequestOptions): Promise<FbsRfbsMarksPostingShipV4Response> {
    return this.httpClient.request<FbsRfbsMarksPostingShipV4Request, FbsRfbsMarksPostingShipV4Response>("POST", "/v4/posting/fbs/ship", request, options);
  }

  /**
   * Частичная сборка отправления (v4)
   * Partial posting assembly (v4)
   *
   * @param request - Posting ship package request v4
   * @param options - Request options
   * @returns Promise with ship package result
   *
   * @example
   * ```typescript
   * const result = await api.fbsRfbsMarks.shipPostingPackageV4({
   *   posting_number: 'FBS-123456789',
   *   products: [{
   *     product_id: 123456,
   *     quantity: 1
   *   }]
   * });
   * console.log('Ship package result:', result.result);
   * ```
   */
  async shipPostingPackageV4(request: FbsRfbsMarksPostingShipPackageV4Request, options?: RequestOptions): Promise<FbsRfbsMarksPostingShipPackageV4Response> {
    return this.httpClient.request<FbsRfbsMarksPostingShipPackageV4Request, FbsRfbsMarksPostingShipPackageV4Response>("POST", "/v4/posting/fbs/ship/package", request, options);
  }

  // ============ V5 API Methods ============

  /**
   * Получить информацию об экземплярах (v5)
   * Get exemplar information (v5)
   *
   * @param request - Exemplar create or get request v5
   * @param options - Request options
   * @returns Promise with exemplar information
   *
   * @example
   * ```typescript
   * const result = await api.fbsRfbsMarks.createOrGetProductExemplarV5({
   *   posting_number: 'FBS-123456789',
   *   products: [{
   *     product_id: 123456,
   *     quantity: 2
   *   }]
   * });
   * console.log('Exemplars:', result.exemplars);
   * ```
   */
  async createOrGetProductExemplarV5(request: FbsRfbsMarksProductExemplarCreateOrGetV5Request, options?: RequestOptions): Promise<FbsRfbsMarksProductExemplarCreateOrGetV5Response> {
    return this.httpClient.request<FbsRfbsMarksProductExemplarCreateOrGetV5Request, FbsRfbsMarksProductExemplarCreateOrGetV5Response>("POST", "/v5/fbs/posting/product/exemplar/create-or-get", request, options);
  }

  /**
   * Проверить и сохранить данные экземпляров (v5)
   * Check and save exemplar data (v5)
   *
   * @param request - Exemplar set request v5
   * @param options - Request options
   * @returns Promise with operation result
   *
   * @example
   * ```typescript
   * const result = await api.fbsRfbsMarks.setProductExemplarV5({
   *   posting_number: 'FBS-123456789',
   *   products: [{
   *     product_id: 123456,
   *     exemplars: [{
   *       marking_code: 'marking_code_123',
   *       gtd: 'GTD123456',
   *       is_gtd_absent: false,
   *       additional_info: {
   *         serial_number: 'SN123',
   *         production_date: '2024-01-01',
   *         ean_code: '1234567890123'
   *       }
   *     }]
   *   }]
   * });
   * console.log('Set result:', result.result);
   * ```
   */
  async setProductExemplarV5(request: FbsRfbsMarksProductExemplarSetV5Request, options?: RequestOptions): Promise<FbsRfbsMarksProductExemplarSetV5Response> {
    return this.httpClient.request<FbsRfbsMarksProductExemplarSetV5Request, FbsRfbsMarksProductExemplarSetV5Response>("POST", "/v5/fbs/posting/product/exemplar/set", request, options);
  }

  /**
   * Получить статус добавления экземпляров (v5)
   * Get exemplar addition status (v5)
   *
   * @param request - Exemplar status request v5
   * @param options - Request options
   * @returns Promise with exemplar status and data
   *
   * @example
   * ```typescript
   * const status = await api.fbsRfbsMarks.getProductExemplarStatusV5({
   *   posting_number: 'FBS-123456789'
   * });
   * console.log('Status:', status.status);
   * console.log('Exemplars:', status.exemplars);
   * ```
   */
  async getProductExemplarStatusV5(request: FbsRfbsMarksProductExemplarStatusV5Request, options?: RequestOptions): Promise<FbsRfbsMarksProductExemplarStatusV5Response> {
    return this.httpClient.request<FbsRfbsMarksProductExemplarStatusV5Request, FbsRfbsMarksProductExemplarStatusV5Response>("POST", "/v5/fbs/posting/product/exemplar/status", request, options);
  }

  /**
   * Валидация кодов маркировки (v5)
   * Validate marking codes (v5)
   *
   * @param request - Exemplar validate request v5
   * @param options - Request options
   * @returns Promise with validation result
   *
   * @example
   * ```typescript
   * const result = await api.fbsRfbsMarks.validateProductExemplarV5({
   *   posting_number: 'FBS-123456789',
   *   products: [{
   *     product_id: 123456,
   *     exemplars: [{
   *       marking_code: 'marking_code_123',
   *       gtd: 'GTD123456',
   *       is_gtd_absent: false
   *     }]
   *   }]
   * });
   * console.log('Validation result:', result.result);
   * ```
   */
  async validateProductExemplarV5(request: FbsRfbsMarksProductExemplarValidateV5Request, options?: RequestOptions): Promise<FbsRfbsMarksProductExemplarValidateV5Response> {
    return this.httpClient.request<FbsRfbsMarksProductExemplarValidateV5Request, FbsRfbsMarksProductExemplarValidateV5Response>("POST", "/v5/fbs/posting/product/exemplar/validate", request, options);
  }

  // ============ V6 API Methods ============

  /**
   * Получить данные созданных экземпляров (v6)
   * Get created exemplar data (v6)
   *
   * @param request - Exemplar create or get request v6
   * @param options - Request options
   * @returns Promise with exemplar information
   *
   * @example
   * ```typescript
   * const result = await api.fbsRfbsMarks.createOrGetProductExemplarV6({
   *   posting_number: 'FBS-123456789',
   *   products: [{
   *     product_id: 123456,
   *     quantity: 2
   *   }]
   * });
   * console.log('Exemplars:', result.exemplars);
   * ```
   */
  async createOrGetProductExemplarV6(request: FbsRfbsMarksProductExemplarCreateOrGetV6Request, options?: RequestOptions): Promise<FbsRfbsMarksProductExemplarCreateOrGetV6Response> {
    return this.httpClient.request<FbsRfbsMarksProductExemplarCreateOrGetV6Request, FbsRfbsMarksProductExemplarCreateOrGetV6Response>("POST", "/v6/fbs/posting/product/exemplar/create-or-get", request, options);
  }

  /**
   * Проверить и сохранить данные экземпляров (v6)
   * Check and save exemplar data (v6)
   *
   * @param request - Exemplar set request v6
   * @param options - Request options
   * @returns Promise with operation result
   *
   * @example
   * ```typescript
   * const result = await api.fbsRfbsMarks.setProductExemplarV6({
   *   posting_number: 'FBS-123456789',
   *   products: [{
   *     product_id: 123456,
   *     exemplars: [{
   *       marking_code: 'marking_code_123',
   *       gtd: 'GTD123456',
   *       is_gtd_absent: false,
   *       extended_data: {
   *         serial_number: 'SN123',
   *         production_date: '2024-01-01',
   *         ean_code: '1234567890123',
   *         attributes: {
   *           custom_field: 'custom_value'
   *         }
   *       }
   *     }]
   *   }]
   * });
   * console.log('Set result:', result.result);
   * ```
   */
  async setProductExemplarV6(request: FbsRfbsMarksProductExemplarSetV6Request, options?: RequestOptions): Promise<FbsRfbsMarksProductExemplarSetV6Response> {
    return this.httpClient.request<FbsRfbsMarksProductExemplarSetV6Request, FbsRfbsMarksProductExemplarSetV6Response>("POST", "/v6/fbs/posting/product/exemplar/set", request, options);
  }

  // ============ Additional Methods (if exist) ============
  // Note: I notice from MCP docs there might be some additional methods
  // Let me check if there are any other methods I missed in the chunks

  /**
   * Получить статус загрузки кодов маркировки
   * Get marking codes upload status
   *
   * @param request - Upload status request
   * @param options - Request options
   * @returns Promise with upload status
   *
   * @example
   * ```typescript
   * const status = await api.fbsRfbsMarks.getPostingCodesUploadStatus({
   *   task_id: 'upload_task_123'
   * });
   * console.log('Upload status:', status.status);
   * ```
   */
  async getPostingCodesUploadStatus(request: FbsRfbsMarksPostingCodesUploadStatusRequest, options?: RequestOptions): Promise<FbsRfbsMarksPostingCodesUploadStatusResponse> {
    return this.httpClient.request<FbsRfbsMarksPostingCodesUploadStatusRequest, FbsRfbsMarksPostingCodesUploadStatusResponse>("POST", "/v1/posting/fbs/rfbs/upload-marking-codes/status", request, options);
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
  async validatePostingCodes(request: FbsRfbsMarksPostingCodesValidateRequest, options?: RequestOptions): Promise<FbsRfbsMarksPostingCodesValidateResponse> {
    return this.httpClient.request<FbsRfbsMarksPostingCodesValidateRequest, FbsRfbsMarksPostingCodesValidateResponse>("POST", "/v1/posting/fbs/rfbs/validate-marking-codes", request, options);
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
  async getPostingCodesValidateStatus(request: FbsRfbsMarksPostingCodesValidateStatusRequest, options?: RequestOptions): Promise<FbsRfbsMarksPostingCodesValidateStatusResponse> {
    return this.httpClient.request<FbsRfbsMarksPostingCodesValidateStatusRequest, FbsRfbsMarksPostingCodesValidateStatusResponse>("POST", "/v1/posting/fbs/rfbs/validate-marking-codes/status", request, options);
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
  async getPostingCodesInfo(request: FbsRfbsMarksPostingCodesInfoRequest, options?: RequestOptions): Promise<FbsRfbsMarksPostingCodesInfoResponse> {
    return this.httpClient.request<FbsRfbsMarksPostingCodesInfoRequest, FbsRfbsMarksPostingCodesInfoResponse>("POST", "/v1/posting/fbs/rfbs/marking-codes/info", request, options);
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
  async getPostingList(request: FbsRfbsMarksPostingListRequest, options?: RequestOptions): Promise<FbsRfbsMarksPostingListResponse> {
    return this.httpClient.request<FbsRfbsMarksPostingListRequest, FbsRfbsMarksPostingListResponse>("POST", "/v1/posting/fbs/rfbs/list", request, options);
  }
}
