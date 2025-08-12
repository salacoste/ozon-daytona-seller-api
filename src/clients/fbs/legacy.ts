/**
 * Legacy FBS operations - convenience methods and backward compatibility
 * 
 * Handles backward compatibility and additional utility methods:
 * - Deprecated convenience wrappers
 * - Legacy method signatures
 * - Basic utility operations
 */

import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type {
  IPostingv3GetFbsPostingListRequest,
} from '../../types/generated/fbs';
import { FBSCore } from './core';
import { FBSExtended } from './extended';
import { FBSManagement } from './management';

/**
 * Legacy FBS operations class
 */
export class FBSLegacy {
  private core: FBSCore;
  private extended: FBSExtended;
  private management: FBSManagement;

  constructor(private readonly httpClient: HttpClient) {
    this.core = new FBSCore(httpClient);
    this.extended = new FBSExtended(httpClient);
    this.management = new FBSManagement(httpClient);
  }

  /**
   * Get FBS orders list (convenience method)
   * 
   * @deprecated Use `listV3()` for the latest version with full type safety
   * @param params - Simplified query parameters 
   * @returns FBS orders list
   */
  async list(params: {
    readonly dir?: 'ASC' | 'DESC';
    readonly filter?: {
      readonly since?: string;
      readonly to?: string;
      readonly status?: string;
      readonly delivery_method_id?: number[];
      readonly provider_id?: number[];
      readonly warehouse_id?: number[];
    };
    readonly limit?: number;
    readonly offset?: number;
  } = {}): Promise<IHttpResponse<any>> {
    // Convert to v3 format
    const v3Params: IPostingv3GetFbsPostingListRequest = {
      dir: params.dir || 'ASC',
      filter: params.filter ? {
        since: params.filter.since || '',
        to: params.filter.to || '',
        ...(params.filter.status && { status: params.filter.status }),
        ...(params.filter.delivery_method_id && { delivery_method_id: params.filter.delivery_method_id }),
        ...(params.filter.provider_id && { provider_id: params.filter.provider_id }),
        ...(params.filter.warehouse_id && { warehouse_id: params.filter.warehouse_id.map(String) }),
      } : {
        since: '',
        to: ''
      },
      limit: params.limit ?? 100,
      offset: params.offset ?? 0,
    };

    return this.core.listV3(v3Params);
  }

  /**
   * Get FBS order details (convenience method)
   * 
   * @deprecated Use `getV3()` for the latest version with full type safety
   * @param postingNumber - Posting number
   * @returns Order details
   */
  async get(postingNumber: string): Promise<IHttpResponse<any>> {
    return this.core.getV3({
      posting_number: postingNumber,
      with: {
        analytics_data: true,
        barcodes: true,
        financial_data: false,
      }
    });
  }

  /**
   * Get unfulfilled FBS orders (convenience method)
   * 
   * @deprecated Use `getUnfulfilledV3()` for the latest version with full type safety
   * @param params - Query parameters
   * @returns Unfulfilled orders
   */
  async getUnfulfilled(params: {
    readonly cutoff_from?: string;
    readonly cutoff_to?: string;
    readonly limit?: number;
    readonly offset?: number;
  } = {}): Promise<IHttpResponse<any>> {
    return this.core.getUnfulfilledV3({
      dir: 'ASC',
      filter: {
        cutoff_from: params.cutoff_from || '',
        cutoff_to: params.cutoff_to || '',
      },
      limit: params.limit ?? 100,
      offset: params.offset ?? 0,
    });
  }

  /**
   * Get package labels (convenience method)
   * 
   * @deprecated Use `getPackageLabelPdfV2()` for the latest version with full type safety
   * @param postingNumbers - Array of posting numbers
   * @returns Label PDF data
   */
  async getPackageLabel(postingNumbers: string[]): Promise<IHttpResponse<{
    result: string; // Base64 encoded PDF
  }>> {
    const response = await this.extended.getPackageLabelPdfV2({
      posting_number: postingNumbers,
    });
    
    // Convert to legacy format - convert Uint8Array to base64 string
    const contentString = response.data.content instanceof Uint8Array 
      ? Buffer.from(response.data.content).toString('base64')
      : String(response.data.content || '');
    
    return {
      ...response,
      data: {
        result: contentString
      }
    };
  }

  /**
   * Create FBS shipment
   * 
   * @param params - Shipment parameters  
   * @returns Shipment creation result
   */
  async ship(params: {
    readonly posting_number: string[];
    readonly packages: Array<{
      readonly products: Array<{
        readonly product_id: number;
        readonly quantity: number;
      }>;
    }>;
  }): Promise<IHttpResponse<{
    result: Array<{
      posting_number: string;
      status: string;
    }>;
  }>> {
    return this.httpClient.post('/v2/posting/fbs/ship', params);
  }

  /**
   * Cancel FBS order (convenience method)
   * 
   * @deprecated Use `cancelPosting()` for the latest version with full type safety
   * @param postingNumber - Posting number
   * @param cancelReasonId - Cancellation reason ID
   * @returns Cancellation result
   */
  async cancel(
    postingNumber: string, 
    cancelReasonId: number
  ): Promise<IHttpResponse<any>> {
    return this.management.cancelPosting({
      posting_number: postingNumber,
      cancel_reason_id: cancelReasonId,
    });
  }

  /**
   * Get available delivery methods for FBS
   * 
   * @returns Available delivery methods
   */
  async getDeliveryMethods(): Promise<IHttpResponse<any>> {
    return this.httpClient.post('/v1/delivery-method/list', {});
  }

  /**
   * Get cancellation reasons (convenience method)
   * 
   * @deprecated Use `getCancelReasonsList()` for the latest version with full type safety
   * @returns Available cancellation reasons
   */
  async getCancelReasons(): Promise<IHttpResponse<any>> {
    return this.management.getCancelReasonsList();
  }

  /**
   * Create digital codes for products
   * 
   * @param params - Digital codes creation parameters
   * @returns Operation result
   */
  async createDigitalCodes(params: any): Promise<IHttpResponse<any>> {
    return this.httpClient.post('/v1/posting/fbs/digital/codes', params);
  }

  // ======= BACKWARD COMPATIBILITY ALIASES FOR PART 3 METHODS =======

  /** @deprecated Use cancelPostingProductV2() from main client instead */
  async cancelPostingProducts(params: any): Promise<IHttpResponse<any>> {
    return this.management.cancelPostingProducts(params);
  }

  /** @deprecated Use cancelPostingV2() from main client instead */
  async cancelPosting(params: any): Promise<IHttpResponse<any>> {
    return this.management.cancelPosting(params);
  }

  /** @deprecated Use moveToArbitrationV2() from main client instead */
  async moveToArbitration(params: any): Promise<IHttpResponse<any>> {
    return this.management.moveToArbitration(params);
  }

  /** @deprecated Use moveToAwaitingDeliveryV2() from main client instead */
  async moveToAwaitingDelivery(params: any): Promise<IHttpResponse<any>> {
    return this.management.moveToAwaitingDelivery(params);
  }

  /** @deprecated Use verifyPickupCodeV1() from main client instead */
  async verifyPickupCode(params: any): Promise<IHttpResponse<any>> {
    return this.management.verifyPickupCode(params);
  }

  /** @deprecated Use getEtgbV1() from main client instead */
  async getETGB(params: any): Promise<IHttpResponse<any>> {
    return this.management.getETGB(params);
  }
}