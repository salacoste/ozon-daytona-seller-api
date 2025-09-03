/**
 * @spacechemical/ozon-seller-api
 * 
 * Comprehensive TypeScript SDK for Ozon Seller API with full type safety
 * and category-based organization covering all 33 API categories.
 */

// Core exports
export { OzonSellerApiClient } from './core/client.js';
export { HttpClient } from './core/http.js';
export { AuthManager } from './core/auth.js';

// Types
export type {
  OzonConfig,
  ApiKey,
  ClientId,
  RequestId,
  IdempotencyKey,
  BaseRequest,
  BaseResponse,
  ApiErrorResponse,
  PaginationParams,
  PaginatedResponse,
  RequestOptions,
  EndpointConfig,
  HttpMethod,
  OperationStatus,
  NonEmptyArray,
  Optional,
  RequiredFields,
} from './core/types.js';

export { 
  Language,
  Currency,
  createApiKey,
  createClientId,
  createRequestId,
  createIdempotencyKey,
} from './core/types.js';

// Error exports
export {
  OzonError,
  ApiError,
  BadRequestError,
  AuthenticationError,
  PermissionError,
  NotFoundError,
  ValidationError,
  RateLimitError,
  InternalServerError,
  ConnectionError,
  TimeoutError,
  ConfigurationError,
  SDKError,
  isRetryableError,
  getRetryDelay,
} from './core/errors.js';

// API Category exports
export { ProductApi } from './categories/product/index.js';
export { FinanceApi } from './categories/finance/index.js';
export { AnalyticsApi } from './categories/analytics/index.js';
export { PricingStrategyApi } from './categories/pricing-strategy/index.js';
export { ReturnsApi } from './categories/returns/index.js';
export { ReturnApi } from './categories/return/index.js';
export { QuantsApi } from './categories/quants/index.js';
export { ReviewApi } from './categories/review/index.js';
export { ChatApi } from './categories/chat/index.js';
export { QuestionsAnswersApi } from './categories/questions-answers/index.js';
export { CertificationApi } from './categories/certification/index.js';
export { BrandApi } from './categories/brand/index.js';
export { FbsApi } from './categories/fbs/index.js';
export { DeliveryFbsApi } from './categories/delivery-fbs/index.js';
export { FboSupplyRequestApi } from './categories/fbo-supply-request/index.js';
export { FbsRfbsMarksApi } from './categories/fbs-rfbs-marks/index.js';
export { FboApi } from './categories/fbo/index.js';
export { DeliveryRfbsApi } from './categories/delivery-rfbs/index.js';
export { RfbsReturnsApi } from './categories/rfbs-returns/index.js';
export { WarehouseApi } from './categories/warehouse/index.js';
export { SupplierApi } from './categories/supplier/index.js';
// Story 1.7 API categories
export { ReportApi } from './categories/report/index.js';
export { PremiumApi } from './categories/premium/index.js';
export { PricesStocksApi } from './categories/prices-stocks/index.js';
export { BetaMethodApi } from './categories/beta-method/index.js';
export { PromosApi } from './categories/promos/index.js';
export { PassApi } from './categories/pass/index.js';
export { CancellationApi } from './categories/cancellation/index.js';
export { CategoryApi } from './categories/category/index.js';
export { DigitalApi } from './categories/digital/index.js';
export { BarcodeApi } from './categories/barcode/index.js';
export { PolygonApi } from './categories/polygon/index.js';
export { SellerRatingApi } from './categories/seller-rating/index.js';

// Re-export types for convenience function
import type { OzonConfig } from './core/types.js';
import { OzonSellerApiClient } from './core/client.js';

// Convenience function to create SDK instance
export const createOzonSellerApiClient = (config: OzonConfig): OzonSellerApiClient => {
  return new OzonSellerApiClient(config);
};

// Default export
export default OzonSellerApiClient;

// Product API types are exported in the main Product exports section

// Analytics API types
export type {
  AnalyticsTurnoverStocksRequest,
  AnalyticsStockOnWarehouseRequest,
  AnalyticsWarehouseType,
} from './types/requests/analytics.js';

export type {
  AnalyticsTurnoverStocksResponse,
  AnalyticsStockOnWarehouseResponse,
  AnalyticsTurnoverStocksResponseItem,
  AnalyticsStockOnWarehouseResponseResult,
} from './types/responses/analytics.js';

// Finance API types
export type {
  GetCompensationReportRequest,
  GetDecompensationReportRequest,
  CreateDocumentB2BSalesReportRequest,
  CreateDocumentB2BSalesJSONReportRequest,
  CreateMutualSettlementReportRequest,
  GetFinanceProductsBuyoutRequest,
  GetRealizationReportPostingRequest,
  GetRealizationReportV2Request,
  FinanceTransactionListV3Request,
  FinanceTransactionTotalsV3Request,
  TransactionType,
  CompensationReportLanguage,
  CommonLanguage,
} from './types/requests/finance.js';

export type {
  CreateReportResponse,
  CommonCreateReportResponse,
  CreateDocumentB2BSalesJSONReportResponse,
  GetFinanceProductsBuyoutResponse,
  GetRealizationReportPostingResponse,
  GetRealizationReportV2Response,
  FinanceTransactionListV3Response,
  FinanceTransactionTotalsV3Response,
  FinanceTransactionOperation,
  B2BLegalSaleInvoice,
} from './types/responses/finance.js';

// Pricing Strategy API types
export type {
  GetCompetitorsRequest,
  CreatePricingStrategyRequest,
  DeletePricingStrategyRequest,
  GetStrategyInfoRequest,
  GetStrategyListRequest,
  GetStrategyItemInfoRequest,
  AddStrategyItemsRequest,
  DeleteStrategyItemsRequest,
  GetStrategyItemsRequest,
  UpdateStatusStrategyRequest,
  GetStrategyIDsByItemIDsRequest,
  UpdatePricingStrategyRequest,
  PricingStrategyCompetitor,
} from './types/requests/pricing-strategy.js';

export type {
  GetCompetitorsResponse,
  CreatePricingStrategyResponse,
  GetStrategyResponse,
  GetStrategyListResponse,
  GetStrategyItemInfoResponse,
  AddStrategyItemsResponse,
  DeleteStrategyItemsResponse,
  GetStrategyItemsResponse,
  GetStrategyIDsByItemIDsResponse,
  PricingStrategy,
  StrategyItemInfo,
  CompetitorInfo,
} from './types/responses/pricing-strategy.js';

// Returns API types
export type {
  GetReturnsListRequest,
  GetReturnsListRequestFilter,
} from './types/requests/returns.js';

export type {
  GetReturnsListResponse,
  GetReturnsListResponseReturnsItem,
} from './types/responses/returns.js';

// Return API types
export type {
  GiveoutInfoRequest,
  GiveoutListRequest,
  ReturnsCompanyFbsInfoRequest,
  EmptyRequest,
} from './types/requests/return.js';

export type {
  GiveoutGetBarcodeResponse,
  GiveoutBarcodeResetResponse,
  GiveoutGetPDFResponse,
  GiveoutGetPNGResponse,
  GiveoutInfoResponse,
  GiveoutInfoResponseItem,
  GiveoutIsEnabledResponse,
  GiveoutListResponse,
  GiveoutListResponseItem,
  ReturnsCompanyFbsInfoResponse,
  ReturnsCompanyFbsInfoResponseItem,
} from './types/responses/return.js';

// Quants API types
export type {
  QuantInfoRequest,
  QuantListRequest,
} from './types/requests/quants.js';

export type {
  QuantInfoResponse,
  QuantInfoResponseItem,
  QuantListResponse,
  QuantListResponseProduct,
} from './types/responses/quants.js';

// Review API types
export type {
  ReviewChangeStatusRequest,
  CommentCreateRequest,
  CommentDeleteRequest,
  CommentListRequest,
  ReviewCountRequest,
  ReviewInfoRequest,
  ReviewListRequest,
  CommentSort,
  ReviewStatus,
  ReviewSortDirection,
} from './types/requests/review.js';

export type {
  ReviewChangeStatusResponse,
  CommentCreateResponse,
  CommentDeleteResponse,
  CommentListResponse,
  ReviewCountResponse,
  ReviewInfoResponse,
  ReviewListResponse,
  ReviewPhoto,
  ReviewVideo,
  ReviewComment,
  ReviewListItem,
  ReviewInfo,
  ReviewOrderStatus,
  ReviewProcessingStatus,
} from './types/responses/review.js';

// Chat API types
export type {
  ChatStartRequest,
  ChatSendMessageRequest,
  ChatSendFileRequest,
  ChatReadRequest,
  ChatHistoryV2Request,
  ChatHistoryV3Request,
  ChatListV2Request,
  ChatListV3Request,
  ChatDirection,
} from './types/requests/chat.js';

export type {
  ChatStartResponse,
  ChatSendMessageResponse,
  ChatSendFileResponse,
  ChatReadResponse,
  ChatHistoryV2Response,
  ChatHistoryV3Response,
  ChatListV2Response,
  ChatListV3Response,
  ChatInfoV2,
  ChatInfoV3,
  ChatMessageV2,
  ChatMessageV3,
} from './types/responses/chat.js';

// Questions & Answers API types
export type {
  QuestionAnswerCreateRequest,
  QuestionAnswerDeleteRequest,
  QuestionAnswerListRequest,
  QuestionChangeStatusRequest,
  QuestionCountRequest,
  QuestionInfoRequest,
  QuestionListRequest,
  QuestionTopSkuRequest,
} from './types/requests/questions-answers.js';

export type {
  QuestionAnswerCreateResponse,
  QuestionAnswerDeleteResponse,
  QuestionAnswerListResponse,
  QuestionChangeStatusResponse,
  QuestionCountResponse,
  QuestionInfoResponse,
  QuestionListResponse,
  QuestionTopSkuResponse,
  QuestionStatusEnum,
  QuestionAnswerInfo,
  QuestionListItem,
  QuestionDetailedInfo,
} from './types/responses/questions-answers.js';

// Certification API types
export type {
  CertificateListRequest,
  CertificateBindRequest,
  CertificateCreateRequest,
  CertificateDeleteRequest,
  CertificateRejectionReasonsListRequest,
  CertificateStatusListRequest,
  CertificateUnbindRequest,
  ProductCertificationListRequest,
  ProductCertificationListV2Request,
} from './types/requests/certification.js';

export type {
  CertificateListResponse,
  CertificateBindResponse,
  CertificateCreateResponse,
  CertificateDeleteResponse,
  CertificateRejectionReasonsListResponse,
  CertificateStatusListResponse,
  ProductCertificateTypesResponse,
  CertificateUnbindResponse,
  ProductCertificationListResponse,
  CertificateAccordanceTypesResponse,
  ProductCertificationListV2Response,
  CertificateInfo,
  CertificateType,
  ProductCertificationInfo,
  ProductCertificationInfoV2,
} from './types/responses/certification.js';

// Brand API types
export type {
  BrandCertificationListRequest,
} from './types/requests/brand.js';

export type {
  BrandCertificationListResponse,
  BrandCertificationInfo,
  BrandCertificationListResult,
} from './types/responses/brand.js';

// FBS API types
export type {
  FbsCancelReasonRequest,
  FbsCreateLabelBatchRequest,
  FbsGetLabelBatchRequest,
  FbsPickupCodeVerifyRequest,
  FbsGetRestrictionsRequest,
  FbsMovePostingRequest,
  FbsCancelPostingRequest,
  FbsGetPostingByBarcodeRequest,
  FbsPackageLabelRequest,
  FbsProductCancelRequest,
  FbsProductChangeRequest,
  FbsProductCountryListRequest,
  FbsProductCountrySetRequest,
  FbsGetPostingV3Request,
  FbsGetPostingListV3Request,
  FbsGetUnfulfilledListV3Request,
  FbsMultiBoxQtySetV3Request,
  FbsGetEtgbRequest,
  FbsUnpaidLegalProductListRequest,
  FbsPostingFilter,
} from './types/requests/fbs.js';

export type {
  FbsCancelReasonResponse,
  FbsCancelReasonListResponse,
  FbsCreateLabelBatchResponse,
  FbsGetLabelBatchResponse,
  FbsPickupCodeVerifyResponse,
  FbsGetRestrictionsResponse,
  FbsBooleanResponse,
  FbsPostingResponse,
  FbsPackageLabelResponse,
  FbsProductCancelResponse,
  FbsProductChangeResponse,
  FbsProductCountryListResponse,
  FbsProductCountrySetResponse,
  FbsGetPostingV3Response,
  FbsGetPostingListV3Response,
  FbsGetUnfulfilledListV3Response,
  FbsMultiBoxQtySetV3Response,
  FbsGetEtgbResponse,
  FbsUnpaidLegalProductListResponse,
  FbsCancelReason,
  FbsRelatedCancelReason,
  FbsCreateLabelBatchResult,
  FbsGetLabelBatchResult,
  FbsRestrictions,
  FbsPostingProduct,
  FbsPosting,
  FbsProductCancelResult,
  FbsProductChangeResult,
  FbsProductCountry,
  FbsProductCountrySetResult,
  FbsEtgbDeclaration,
  FbsUnpaidLegalProduct,
} from './types/responses/fbs.js';

// DeliveryFBS API types
export type {
  DeliveryFbsCarriageApproveRequest,
  DeliveryFbsCarriageCancelRequest,
  DeliveryFbsCarriageCreateRequest,
  DeliveryFbsCarriageDeliveryListRequest,
  DeliveryFbsCarriageGetRequest,
  DeliveryFbsSetPostingsRequest,
  DeliveryFbsCarriageAvailableListRequest,
  DeliveryFbsPostingSplitRequest,
  DeliveryFbsActCheckStatusRequest,
  DeliveryFbsActCreateRequest,
  DeliveryFbsGetBarcodeRequest,
  DeliveryFbsGetContainerLabelsRequest,
  DeliveryFbsGetActRequest,
  DeliveryFbsActGetPostingsRequest,
  DeliveryFbsActListRequest,
  DeliveryFbsDigitalActCheckStatusRequest,
  DeliveryFbsGetDigitalActRequest,
} from './types/requests/delivery-fbs';

export type {
  DeliveryFbsCarriageApproveResponse,
  DeliveryFbsCarriageCancelResponse,
  DeliveryFbsCarriageCreateResponse,
  DeliveryFbsCarriageDeliveryListResponse,
  DeliveryFbsCarriageGetResponse,
  DeliveryFbsSetPostingsResponse,
  DeliveryFbsCarriageAvailableListResponse,
  DeliveryFbsPostingSplitResponse,
  DeliveryFbsActCheckStatusResponse,
  DeliveryFbsActCreateResponse,
  DeliveryFbsGetBarcodeResponse,
  DeliveryFbsGetBarcodeTextResponse,
  DeliveryFbsGetContainerLabelsResponse,
  DeliveryFbsGetActResponse,
  DeliveryFbsActGetPostingsResponse,
  DeliveryFbsActListResponse,
  DeliveryFbsDigitalActCheckStatusResponse,
  DeliveryFbsGetDigitalActResponse,
  DeliveryFbsCarriageInfo,
  DeliveryFbsDeliveryMethod,
  DeliveryFbsAvailableCarriage,
  DeliveryFbsDocumentStatus,
  DeliveryFbsActPosting,
  DeliveryFbsAct,
} from './types/responses/delivery-fbs';

// FBOSupplyRequest API types
export type {
  FboSupplyRequestCargoesLabelCreateRequest,
  FboSupplyRequestCargoesLabelGetRequest,
  FboSupplyRequestCargoesCreateRequest,
  FboSupplyRequestCargoesCreateInfoRequest,
  FboSupplyRequestCargoesDeleteRequest,
  FboSupplyRequestCargoesDeleteStatusRequest,
  FboSupplyRequestCargoesRulesGetRequest,
  FboSupplyRequestClusterListRequest,
  FboSupplyRequestDraftCreateRequest,
  FboSupplyRequestDraftCreateInfoRequest,
  FboSupplyRequestDraftSupplyCreateRequest,
  FboSupplyRequestDraftSupplyCreateStatusRequest,
  FboSupplyRequestDraftTimeslotInfoRequest,
  FboSupplyRequestSupplyOrderCancelRequest,
  FboSupplyRequestSupplyOrderCancelStatusRequest,
  FboSupplyRequestSupplyOrderContentUpdateRequest,
  FboSupplyRequestSupplyOrderContentUpdateStatusRequest,
  FboSupplyRequestWarehouseFboListRequest,
} from './types/requests/fbo-supply-request';

export type {
  FboSupplyRequestCargoesLabelCreateResponse,
  FboSupplyRequestCargoesLabelGetResponse,
  FboSupplyRequestCargo,
  FboSupplyRequestCargoesCreateResponse,
  FboSupplyRequestCargoesCreateInfoResponse,
  FboSupplyRequestCargoesDeleteResponse,
  FboSupplyRequestCargoesDeleteStatusResponse,
  FboSupplyRequestCargoRule,
  FboSupplyRequestCargoesRulesGetResponse,
  FboSupplyRequestWarehouse,
  FboSupplyRequestCluster,
  FboSupplyRequestClusterListResponse,
  FboSupplyRequestDraft,
  FboSupplyRequestDraftCreateResponse,
  FboSupplyRequestDraftCreateInfoResponse,
  FboSupplyRequestDraftSupplyCreateResponse,
  FboSupplyRequestDraftSupplyCreateStatusResponse,
  FboSupplyRequestTimeslot,
  FboSupplyRequestDraftTimeslotInfoResponse,
  FboSupplyRequestSupplyOrderCancelResponse,
  FboSupplyRequestSupplyOrderCancelStatusResponse,
  FboSupplyRequestSupplyOrderContentUpdateResponse,
  FboSupplyRequestSupplyOrderContentUpdateStatusResponse,
  FboSupplyRequestWarehouseFboListResponse,
} from './types/responses/fbo-supply-request';

// FBS&rFBSMarks API types
export type {
  FbsRfbsMarksProductExemplarUpdateRequest,
  FbsRfbsMarksProductExemplarSetV4Request,
  FbsRfbsMarksPostingShipV4Request,
  FbsRfbsMarksProductExemplarCreateOrGetV5Request,
  FbsRfbsMarksProductExemplarSetV6Request,
  FbsRfbsMarksPostingCodesUploadStatusRequest,
  FbsRfbsMarksPostingCodesValidateRequest,
  FbsRfbsMarksPostingCodesValidateStatusRequest,
  FbsRfbsMarksPostingCodesInfoRequest,
  FbsRfbsMarksPostingListRequest,
} from './types/requests/fbs-rfbs-marks';

export type {
  FbsRfbsMarksProductExemplarSetV4Response,
  FbsRfbsMarksPostingShipV4Response,
  FbsRfbsMarksProductExemplarCreateOrGetV5Response,
  FbsRfbsMarksProductExemplarSetV6Response,
  FbsRfbsMarksPostingCodesUploadStatusResponse,
  FbsRfbsMarksPostingCodesValidateResponse,
  FbsRfbsMarksPostingCodesValidateStatusResponse,
  FbsRfbsMarksPostingCodesInfoResponse,
  FbsRfbsMarksPosting,
  FbsRfbsMarksPostingListResponse,
} from './types/responses/fbs-rfbs-marks';

// FBO API types
export type {
  FboCancelReasonListRequest,
  FboWarehouseAvailabilityRequest,
  FboSupplyOrderBundleRequest,
  FboSupplyOrderPassCreateRequest,
  FboSupplyOrderPassStatusRequest,
  FboSupplyOrderStatusCounterRequest,
  FboSupplyOrderTimeslotGetRequest,
  FboSupplyOrderTimeslotStatusRequest,
  FboSupplyOrderTimeslotUpdateRequest,
  FboPostingGetRequest,
  FboPostingListRequest,
  FboSupplyOrderGetRequest,
  FboSupplyOrderListRequest,
} from './types/requests/fbo';

export type {
  FboCancelReason,
  FboCancelReasonListResponse,
  FboWarehouseAvailability,
  FboWarehouseAvailabilityResponse,
  FboSupplyOrderProduct,
  FboSupplyOrderBundleResponse,
  FboSupplyOrderPassCreateResponse,
  FboSupplyOrderPassStatusResponse,
  FboSupplyOrderStatusCounter,
  FboSupplyOrderStatusCounterResponse,
  FboSupplyOrderTimeslot,
  FboSupplyOrderTimeslotGetResponse,
  FboSupplyOrderTimeslotStatusResponse,
  FboSupplyOrderTimeslotUpdateResponse,
  FboPostingProduct,
  FboPosting,
  FboPostingGetResponse,
  FboPostingListResponse,
  FboSupplyOrder,
  FboSupplyOrderGetResponse,
  FboSupplyOrderListResponse,
} from './types/responses/fbo';

// DeliveryrFBS API types
export type {
  DeliveryRfbsSetCutoffRequest,
  DeliveryRfbsTimeslotChangeRestrictionsRequest,
  DeliveryRfbsTimeslotSetRequest,
  DeliveryRfbsPostingDeliveredRequest,
  DeliveryRfbsPostingDeliveringRequest,
  DeliveryRfbsPostingLastMileRequest,
  DeliveryRfbsPostingSentBySellerRequest,
  DeliveryRfbsTrackingNumberSetRequest,
} from './types/requests/delivery-rfbs';

export type {
  DeliveryRfbsSetCutoffResponse,
  DeliveryRfbsTimeslotChangeRestrictions,
  DeliveryRfbsTimeslotChangeRestrictionsResponse,
  DeliveryRfbsTimeslotSetResponse,
  DeliveryRfbsPostingMoveStatusResponse,
  DeliveryRfbsPostingDeliveredResponse,
  DeliveryRfbsPostingDeliveringResponse,
  DeliveryRfbsPostingLastMileResponse,
  DeliveryRfbsPostingSentBySellerResponse,
  DeliveryRfbsTrackingNumberResult,
  DeliveryRfbsTrackingNumberSetResponse,
} from './types/responses/delivery-rfbs';

// RFBSReturnsAPI types
export type {
  RfbsReturnsActionSetRequest,
  RfbsReturnsCompensateRequest,
  RfbsReturnsGetRequest,
  RfbsReturnsListRequest,
  RfbsReturnsReceiveReturnRequest,
  RfbsReturnsRejectRequest,
  RfbsReturnsReturnMoneyRequest,
  RfbsReturnsVerifyRequest,
} from './types/requests/rfbs-returns';

export type {
  RfbsReturnsActionSetResponse,
  RfbsReturnsEmptyResponse,
  RfbsReturnProduct,
  RfbsReturn,
  RfbsReturnsGetResponse,
  RfbsReturnsListResponse,
} from './types/responses/rfbs-returns';

// WarehouseAPI types
export type {
  WarehouseDeliveryMethodListRequest,
  WarehouseListRequest,
} from './types/requests/warehouse';

export type {
  WarehouseDeliveryMethod,
  WarehouseDeliveryMethodListResponse,
  Warehouse,
  WarehouseListResponse,
} from './types/responses/warehouse';

// SupplierAPI types
export type {
  SupplierInvoiceDeleteRequest,
  SupplierInvoiceFileUploadRequest,
  SupplierInvoiceCreateOrUpdateRequest,
  SupplierInvoiceGetRequest,
} from './types/requests/supplier';

export type {
  SupplierInvoiceDeleteResponse,
  SupplierInvoiceFileUploadResponse,
  SupplierInvoiceItem,
  SupplierInvoice,
  SupplierInvoiceCreateOrUpdateResponse,
  SupplierInvoiceGetResponse,
} from './types/responses/supplier';

// Utility exports
export * from './utils/index.js';

// Common types
export type {
  ProductBooleanResponse,
  ProductId,
  OfferId,
  CategoryId,
  ProductStatus,
  VisibilityStatus,
  CurrencyCode,
  // New shared types
  ReturnId,
  GiveoutId,
  QuantCode,
  ReturnStatus,
  GiveoutStatus,
  ProductVisibilityState,
  BasicProductInfo,
  PaginationRequest,
  CursorPaginationRequest,
  PaginationResponse,
  CursorPaginationResponse,
  DateString,
} from './types/common/base.js';

// Helper functions - these are actual functions, not types
export {
  createProductId,
  createOfferId,
  createCategoryId,
  createReturnId,
  createGiveoutId,
  createQuantCode,
} from './types/common/base.js';