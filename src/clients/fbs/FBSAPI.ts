/**
 * FBSAPI client for Ozon Seller API
 * 
 * Handles Fulfillment by Seller (FBS) operations:
 * - Order management and fulfillment
 * - Shipment creation and tracking
 * - Returns processing
 * - Labels and documentation
 */

import type { HttpClient } from '../../http/HttpClient';
import { FBSCore } from './core';
import { FBSExtended } from './extended';
import { FBSManagement } from './management';
import { FBSLegacy } from './legacy';
import { FBSIterators } from './iterators';

// Re-export core types from FBS modules
export type {
  IPostingv3GetFbsPostingUnfulfilledListRequest,
  IPostingv3GetFbsPostingUnfulfilledListResponse,
  IPostingv3GetFbsPostingListRequest,
  IV3GetFbsPostingListResponseV3,
  IPostingv3GetFbsPostingRequest,
  IV3GetFbsPostingResponseV3,
  IPostingGetFbsPostingByBarcodeRequest,
  IV2FbsPostingResponse,
  IPostingv3PostingMultiBoxQtySetV3Request,
  IPostingv3PostingMultiBoxQtySetV3Response,
  IPostingPostingProductChangeRequest,
  IPostingPostingProductChangeResponse,
  IPostingCancelReasonRequest,
  IPostingCancelReasonResponse,
  IPostingCancelReasonListResponse,
  IPostingPostingProductCancelRequest,
  IPostingPostingProductCancelResponse,
  IPostingCancelFbsPostingRequest,
  IPostingMovePostingRequest,
  IV2MovePostingToAwaitingDeliveryRequest,
  IV1PostingFBSPickupCodeVerifyRequest,
  IV1PostingFBSPickupCodeVerifyResponse,
  IV1GetEtgbRequest,
  IV1GetEtgbResponse,
  IV1PostingUnpaidLegalProductListRequest,
  IV1PostingUnpaidLegalProductListResponse,
} from '../../types/generated/fbs';

// Re-export Part 2 types from FBS modules
export type {
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
  IPostingCancelReasonListRequest,
} from '../../types/generated/fbs-part2';

/**
 * FBSAPI client
 */
export class FBSAPI {
  private core: FBSCore;
  private extended: FBSExtended;
  private management: FBSManagement;
  private legacy: FBSLegacy;
  public readonly iterators: FBSIterators;

  constructor(private readonly httpClient: HttpClient) {
    this.core = new FBSCore(httpClient);
    this.extended = new FBSExtended(httpClient);
    this.management = new FBSManagement(httpClient);
    this.legacy = new FBSLegacy(httpClient);
    this.iterators = new FBSIterators(this);
  }

  // ======= PART 1 ENDPOINTS (1-6) - Core Operations =======

  /** @see FBSCore.getUnfulfilledV3 */
  async getUnfulfilledV3(params: Parameters<FBSCore['getUnfulfilledV3']>[0]) {
    return this.core.getUnfulfilledV3(params);
  }

  /** @see FBSCore.listV3 */
  async listV3(params: Parameters<FBSCore['listV3']>[0]) {
    return this.core.listV3(params);
  }

  /** @see FBSCore.getV3 */
  async getV3(params: Parameters<FBSCore['getV3']>[0]) {
    return this.core.getV3(params);
  }

  /** @see FBSCore.getByBarcode */
  async getByBarcode(params: Parameters<FBSCore['getByBarcode']>[0]) {
    return this.core.getByBarcode(params);
  }

  /** @see FBSCore.setMultiBoxQuantity */
  async setMultiBoxQuantity(params: Parameters<FBSCore['setMultiBoxQuantity']>[0]) {
    return this.core.setMultiBoxQuantity(params);
  }

  /** @see FBSCore.changeProduct */
  async changeProduct(params: Parameters<FBSCore['changeProduct']>[0]) {
    return this.core.changeProduct(params);
  }

  // ======= PART 2 ENDPOINTS (7-15) - Extended Operations =======

  /** @see FBSExtended.listProductCountryV2 */
  async listProductCountryV2(params?: Parameters<FBSExtended['listProductCountryV2']>[0]) {
    return this.extended.listProductCountryV2(params);
  }

  /** @see FBSExtended.setProductCountryV2 */
  async setProductCountryV2(params: Parameters<FBSExtended['setProductCountryV2']>[0]) {
    return this.extended.setProductCountryV2(params);
  }

  /** @see FBSExtended.getRestrictionsV1 */
  async getRestrictionsV1(params: Parameters<FBSExtended['getRestrictionsV1']>[0]) {
    return this.extended.getRestrictionsV1(params);
  }

  /** @see FBSExtended.getPackageLabelPdfV2 */
  async getPackageLabelPdfV2(params: Parameters<FBSExtended['getPackageLabelPdfV2']>[0]) {
    return this.extended.getPackageLabelPdfV2(params);
  }

  /** @see FBSExtended.createLabelBatchV1 */
  async createLabelBatchV1(params: Parameters<FBSExtended['createLabelBatchV1']>[0]) {
    return this.extended.createLabelBatchV1(params);
  }

  /** @see FBSExtended.createLabelBatchV2 */
  async createLabelBatchV2(params: Parameters<FBSExtended['createLabelBatchV2']>[0]) {
    return this.extended.createLabelBatchV2(params);
  }

  /** @see FBSExtended.getLabelBatchV1 */
  async getLabelBatchV1(params: Parameters<FBSExtended['getLabelBatchV1']>[0]) {
    return this.extended.getLabelBatchV1(params);
  }

  /** @see FBSExtended.getCancelReasonV1 */
  async getCancelReasonV1(params: Parameters<FBSExtended['getCancelReasonV1']>[0]) {
    return this.extended.getCancelReasonV1(params);
  }

  /** @see FBSExtended.getCancelReasonListV2 */
  async getCancelReasonListV2(params?: Parameters<FBSExtended['getCancelReasonListV2']>[0]) {
    return this.extended.getCancelReasonListV2(params);
  }

  // ======= PART 3 ENDPOINTS - Posting Management =======

  /** @see FBSManagement.cancelPostingProducts */
  async cancelPostingProductV2(params: Parameters<FBSManagement['cancelPostingProducts']>[0]) {
    return this.management.cancelPostingProducts(params);
  }

  /** @see FBSManagement.cancelPosting */
  async cancelPostingV2(params: Parameters<FBSManagement['cancelPosting']>[0]) {
    return this.management.cancelPosting(params);
  }

  /** @see FBSManagement.moveToArbitration */
  async moveToArbitrationV2(params: Parameters<FBSManagement['moveToArbitration']>[0]) {
    return this.management.moveToArbitration(params);
  }

  /** @see FBSManagement.moveToAwaitingDelivery */
  async moveToAwaitingDeliveryV2(params: Parameters<FBSManagement['moveToAwaitingDelivery']>[0]) {
    return this.management.moveToAwaitingDelivery(params);
  }

  /** @see FBSManagement.verifyPickupCode */
  async verifyPickupCodeV1(params: Parameters<FBSManagement['verifyPickupCode']>[0]) {
    return this.management.verifyPickupCode(params);
  }

  /** @see FBSManagement.getETGB */
  async getEtgbV1(params: Parameters<FBSManagement['getETGB']>[0]) {
    return this.management.getETGB(params);
  }

  // ======= PART 4 ENDPOINT (22) - Unpaid Legal Products =======

  /** @see FBSManagement.getUnpaidLegalProducts */
  async getUnpaidLegalProductListV1(params: Parameters<FBSManagement['getUnpaidLegalProducts']>[0]) {
    return this.management.getUnpaidLegalProducts(params);
  }

  // ======= LEGACY METHOD ALIASES =======

  // Part 2 Legacy Aliases
  async getCountryList(params?: Parameters<FBSExtended['listProductCountryV2']>[0]) {
    return this.listProductCountryV2(params);
  }

  async setProductCountry(params: Parameters<FBSExtended['setProductCountryV2']>[0]) {
    return this.setProductCountryV2(params);
  }

  async getRestrictions(params: Parameters<FBSExtended['getRestrictionsV1']>[0]) {
    return this.getRestrictionsV1(params);
  }

  async getPackageLabelsV2(params: Parameters<FBSExtended['getPackageLabelPdfV2']>[0]) {
    return this.getPackageLabelPdfV2(params);
  }

  async createLabelBatch(params: Parameters<FBSExtended['createLabelBatchV1']>[0]) {
    return this.createLabelBatchV1(params);
  }

  async getLabelBatch(params: Parameters<FBSExtended['getLabelBatchV1']>[0]) {
    return this.getLabelBatchV1(params);
  }

  async getCancelReasonById(params: Parameters<FBSExtended['getCancelReasonV1']>[0]) {
    return this.getCancelReasonV1(params);
  }

  async getCancelReasonsList(params?: Parameters<FBSExtended['getCancelReasonListV2']>[0]) {
    return this.getCancelReasonListV2(params);
  }

  // Part 3 Legacy Aliases
  async cancelPostingProducts(params: Parameters<FBSManagement['cancelPostingProducts']>[0]) {
    return this.cancelPostingProductV2(params);
  }

  async cancelPosting(params: Parameters<FBSManagement['cancelPosting']>[0]) {
    return this.cancelPostingV2(params);
  }

  async moveToArbitration(params: Parameters<FBSManagement['moveToArbitration']>[0]) {
    return this.moveToArbitrationV2(params);
  }

  async moveToAwaitingDelivery(params: Parameters<FBSManagement['moveToAwaitingDelivery']>[0]) {
    return this.moveToAwaitingDeliveryV2(params);
  }

  async verifyPickupCode(params: Parameters<FBSManagement['verifyPickupCode']>[0]) {
    return this.verifyPickupCodeV1(params);
  }

  async getETGB(params: Parameters<FBSManagement['getETGB']>[0]) {
    return this.getEtgbV1(params);
  }

  // Part 4 Legacy Aliases
  async getUnpaidLegalProducts(params: Parameters<FBSManagement['getUnpaidLegalProducts']>[0]) {
    return this.getUnpaidLegalProductListV1(params);
  }

  // ======= LEGACY CORE METHODS =======

  async list(params: Parameters<FBSCore['listV3']>[0]) {
    return this.listV3(params);
  }

  async get(postingNumber: string, withOptions?: { analytics_data?: boolean; barcodes?: boolean; financial_data?: boolean }) {
    return this.getV3({
      posting_number: postingNumber,
      with: {
        analytics_data: withOptions?.analytics_data ?? true,
        barcodes: withOptions?.barcodes ?? true,
        financial_data: withOptions?.financial_data ?? false,
      },
    });
  }

  async ship(params: { posting_number: string[]; packages: Array<{ products: Array<{ product_id: number; quantity: number }> }> }) {
    return this.legacy.ship(params);
  }

  // ======= PAGINATION ITERATORS =======

  iterateUnfulfilled(params: Parameters<FBSCore['getUnfulfilledV3']>[0] & { limit: number }) {
    return this.iterators.iterateUnfulfilled(params);
  }

  iterateList(params: Parameters<FBSCore['listV3']>[0] & { limit: number }) {
    return this.iterators.iterateList(params);
  }

  // ======= SPECIALIZED ACCESS =======
  /** Access to management operations (cancellation, arbitration, etc.) */
  public get managementMethods() { return this.management; }
  /** Access to legacy/deprecated methods for backward compatibility */
  public get legacyMethods() { return this.legacy; }
}