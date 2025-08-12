/**
 * FBS API client module
 * 
 * Exports the main FBSAPI client and related types.
 */

export { FBSAPI } from './FBSAPI';
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
  // Part 3 management types
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
} from './FBSAPI';