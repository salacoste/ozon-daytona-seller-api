export interface IPostingv3GetFbsPostingUnfulfilledListRequestFilter {
    readonly cutoff_from: string;
    readonly cutoff_to: string;
    readonly delivering_date_from?: string;
    readonly delivering_date_to?: string;
    readonly delivery_method_id?: number[];
    readonly is_quantum?: boolean;
    readonly provider_id?: number[];
    readonly status?: string;
    readonly warehouse_id?: number[];
}
export interface IPostingv3FbsPostingWithParams {
    readonly analytics_data?: boolean;
    readonly barcodes?: boolean;
    readonly financial_data?: boolean;
    readonly legal_info?: boolean;
    readonly translit?: boolean;
}
export interface IPostingv3GetFbsPostingUnfulfilledListRequest {
    readonly dir?: string;
    readonly filter: IPostingv3GetFbsPostingUnfulfilledListRequestFilter;
    readonly limit: number;
    readonly offset: number;
    readonly with?: IPostingv3FbsPostingWithParams;
}
export interface IV3AddresseeFbsLists {
    readonly name?: string;
    readonly phone?: string;
}
export interface IV3FbsPostingAnalyticsData {
    readonly city?: string;
    readonly delivery_date_begin?: string;
    readonly delivery_date_end?: string;
    readonly delivery_type?: string;
    readonly is_legal?: boolean;
    readonly is_premium?: boolean;
    readonly payment_type_group_name?: string;
    readonly region?: string;
    readonly tpl_provider?: string;
    readonly tpl_provider_id?: number;
    readonly warehouse?: string;
    readonly warehouse_id?: number;
}
export interface IV3Barcodes {
    readonly lower_barcode?: string;
    readonly upper_barcode?: string;
}
export interface IV3Cancellation {
    readonly affect_cancellation_rating?: boolean;
    readonly cancel_reason?: string;
    readonly cancel_reason_id?: number;
    readonly cancellation_initiator?: string;
    readonly cancellation_type?: string;
    readonly cancelled_after_ship?: boolean;
}
export interface IV3Address {
    readonly address_tail?: string;
    readonly city?: string;
    readonly comment?: string;
    readonly country?: string;
    readonly district?: string;
    readonly latitude?: number;
    readonly longitude?: number;
    readonly provider_pvz_code?: string;
    readonly pvz_code?: number;
    readonly region?: string;
    readonly zip_code?: string;
}
export interface IV3CustomerFbsLists {
    readonly address?: IV3Address;
    readonly customer_id?: number;
    readonly name?: string;
    readonly phone?: string;
}
export interface IV3DeliveryMethod {
    readonly id?: number;
    readonly name?: string;
    readonly tpl_provider?: string;
    readonly tpl_provider_id?: number;
    readonly warehouse?: string;
    readonly warehouse_id?: number;
}
export interface IPostingFinancialDataProduct {
    readonly actions?: string[];
    readonly currency_code?: string;
    readonly commission_amount?: number;
    readonly commission_percent?: number;
    readonly commissions_currency_code?: string;
    readonly old_price?: number;
    readonly payout?: number;
    readonly price?: number;
    readonly product_id?: number;
    readonly quantity?: number;
    readonly total_discount_percent?: number;
    readonly total_discount_value?: number;
}
export interface IV3PostingFinancialData {
    readonly cluster_from?: string;
    readonly cluster_to?: string;
    readonly products?: IPostingFinancialDataProduct[];
}
export interface IV2FboSinglePostingLegalInfo {
    readonly company_name?: string;
    readonly inn?: string;
    readonly kpp?: string;
}
export interface IV3FbsPostingDetailOptional {
    readonly products_with_possible_mandatory_mark?: unknown[];
}
export interface IV3FbsPostingProduct {
    readonly name?: string;
    readonly offer_id?: string;
    readonly price?: string;
    readonly quantity?: number;
    readonly sku?: number;
    readonly currency_code?: string;
    readonly is_blr_traceable?: boolean;
    readonly is_marketplace_buyout?: boolean;
}
export interface IV3FbsPostingRequirementsV3 {
    readonly products_requiring_change_country?: string[];
    readonly products_requiring_gtd?: string[];
    readonly products_requiring_country?: string[];
    readonly products_requiring_mandatory_mark?: string[];
    readonly products_requiring_jw_uin?: string[];
    readonly products_requiring_rnpt?: string[];
}
export type IV3FbsTariffication = unknown;
export interface IV3FbsPosting {
    readonly addressee?: IV3AddresseeFbsLists;
    readonly analytics_data?: IV3FbsPostingAnalyticsData;
    readonly available_actions?: unknown;
    readonly barcodes?: IV3Barcodes;
    readonly cancellation?: IV3Cancellation;
    readonly customer?: IV3CustomerFbsLists;
    readonly delivering_date?: string;
    readonly delivery_method?: IV3DeliveryMethod;
    readonly financial_data?: IV3PostingFinancialData;
    readonly in_process_at?: string;
    readonly is_express?: boolean;
    readonly is_multibox?: boolean;
    readonly legal_info?: IV2FboSinglePostingLegalInfo;
    readonly multi_box_qty?: number;
    readonly optional?: IV3FbsPostingDetailOptional;
    readonly order_id?: number;
    readonly order_number?: string;
    readonly parent_posting_number?: string;
    readonly pickup_code_verified_at?: string;
    readonly posting_number?: string;
    readonly products?: IV3FbsPostingProduct[];
    readonly prr_option?: string;
    readonly quantum_id?: number;
    readonly requirements?: IV3FbsPostingRequirementsV3;
    readonly shipment_date?: string;
    readonly status?: string;
    readonly substatus?: string;
    readonly tpl_integration_type?: string;
    readonly tracking_number?: string;
    readonly tariffication?: IV3FbsTariffication[];
}
export interface IPostingv3GetFbsPostingUnfulfilledListResponseResult {
    readonly count?: number;
    readonly postings?: IV3FbsPosting[];
}
export interface IPostingv3GetFbsPostingUnfulfilledListResponse {
    readonly result?: IPostingv3GetFbsPostingUnfulfilledListResponseResult;
}
export interface IProtobufAny {
    readonly typeUrl?: string;
    readonly value?: string;
}
export interface IRpcStatus {
    readonly code?: number;
    readonly details?: IProtobufAny[];
    readonly message?: string;
}
export interface IPostinglistV3status {
    readonly from?: string;
    readonly to?: string;
}
export interface IPostingv3GetFbsPostingListRequestFilter {
    readonly delivery_method_id?: number[];
    readonly is_quantum?: boolean;
    readonly order_id?: number;
    readonly provider_id?: number[];
    readonly since: string;
    readonly to: string;
    readonly status?: string;
    readonly warehouse_id?: string[];
    readonly last_changed_status_date?: IPostinglistV3status;
}
export interface IPostingv3GetFbsPostingListRequest {
    readonly dir?: string;
    readonly filter: IPostingv3GetFbsPostingListRequestFilter;
    readonly limit: number;
    readonly offset: number;
    readonly with?: IPostingv3FbsPostingWithParams;
}
export interface IV3GetFbsPostingListResponseV3Result {
    readonly has_next?: boolean;
    readonly postings?: IV3FbsPosting[];
}
export interface IV3GetFbsPostingListResponseV3 {
    readonly result?: IV3GetFbsPostingListResponseV3Result;
}
export interface IPostingv3FbsPostingWithParamsExamplars {
    readonly analytics_data?: boolean;
    readonly barcodes?: boolean;
    readonly financial_data?: boolean;
    readonly legal_info?: boolean;
    readonly product_exemplars?: boolean;
    readonly related_postings?: boolean;
    readonly translit?: boolean;
}
export interface IPostingv3GetFbsPostingRequest {
    readonly posting_number: string;
    readonly with?: IPostingv3FbsPostingWithParamsExamplars;
}
export interface IV3AdditionalDataItem {
    readonly key?: string;
    readonly value?: string;
}
export interface IV3Addressee {
    readonly name?: string;
    readonly phone?: string;
}
export interface IFbsPostingDetailCourier {
    readonly car_model?: string;
    readonly car_number?: string;
    readonly name?: string;
    readonly phone?: string;
}
export interface IV3Customer {
    readonly address?: IV3Address;
    readonly customer_id?: number;
    readonly name?: string;
    readonly phone?: string;
}
export interface IV3FbsPostingProductExemplarInfoV3 {
    readonly exemplar_id?: number;
    readonly mandatory_mark?: string;
    readonly gtd?: string;
    readonly is_gtd_absent?: boolean;
    readonly rnpt?: string;
    readonly is_rnpt_absent?: boolean;
}
export interface IV3FbsPostingExemplarProductV3 {
    readonly exemplars?: IV3FbsPostingProductExemplarInfoV3[];
    readonly sku?: number;
}
export interface IV3FbsPostingProductExemplarsV3 {
    readonly products?: IV3FbsPostingExemplarProductV3[];
}
export interface IV3Dimensions {
    readonly height?: string;
    readonly length?: string;
    readonly weight?: string;
    readonly width?: string;
}
export interface IV3PostingProductDetail {
    readonly dimensions?: IV3Dimensions;
    readonly mandatory_mark?: string[];
    readonly name?: string;
    readonly offer_id?: string;
    readonly price?: string;
    readonly jw_uin?: unknown;
    readonly currency_code?: string;
    readonly is_blr_traceable?: boolean;
    readonly is_marketplace_buyout?: boolean;
    readonly quantity?: number;
    readonly sku?: number;
}
export interface IFbsPostingDetailPrrOption {
    readonly code?: string;
    readonly price?: string;
    readonly currency_code?: string;
    readonly floor?: string;
}
export interface IV3FbsPostingDetailRelatedPostings {
    readonly related_posting_numbers?: unknown;
}
export interface IV3FbsPostingDetail {
    readonly additional_data?: IV3AdditionalDataItem[];
    readonly addressee?: IV3Addressee;
    readonly analytics_data?: IV3FbsPostingAnalyticsData;
    readonly available_actions?: unknown;
    readonly barcodes?: IV3Barcodes;
    readonly cancellation?: IV3Cancellation;
    readonly courier?: IFbsPostingDetailCourier;
    readonly customer?: IV3Customer;
    readonly delivering_date?: string;
    readonly delivery_method?: IV3DeliveryMethod;
    readonly delivery_price?: string;
    readonly financial_data?: IV3PostingFinancialData;
    readonly in_process_at?: string;
    readonly is_express?: boolean;
    readonly is_multibox?: boolean;
    readonly legal_info?: IV2FboSinglePostingLegalInfo;
    readonly multi_box_qty?: number;
    readonly optional?: IV3FbsPostingDetailOptional;
    readonly order_id?: number;
    readonly order_number?: string;
    readonly parent_posting_number?: string;
    readonly pickup_code_verified_at?: string;
    readonly posting_number?: string;
    readonly product_exemplars?: IV3FbsPostingProductExemplarsV3;
    readonly products?: IV3PostingProductDetail[];
    readonly provider_status?: string;
    readonly prr_option?: IFbsPostingDetailPrrOption;
    readonly related_postings?: IV3FbsPostingDetailRelatedPostings;
    readonly requirements?: IV3FbsPostingRequirementsV3;
    readonly shipment_date?: string;
    readonly status?: string;
    readonly substatus?: string;
    readonly previous_substatus?: string;
    readonly tpl_integration_type?: string;
    readonly tracking_number?: string;
    readonly tariffication?: IV3FbsTariffication[];
}
export interface IV3GetFbsPostingResponseV3 {
    readonly result?: IV3FbsPostingDetail;
}
export interface IPostingGetFbsPostingByBarcodeRequest {
    readonly barcode?: string;
}
export interface IFbsPostingFbsPostingAnalyticsData {
    readonly city?: string;
    readonly delivery_type?: string;
    readonly is_legal?: boolean;
    readonly is_premium?: boolean;
    readonly payment_type_group_name?: string;
    readonly region?: string;
}
export interface IFbsPostingBarcodes {
    readonly lower_barcode?: string;
    readonly upper_barcode?: string;
}
export interface IV2PostingFinancialData {
    readonly cluster_from?: string;
    readonly cluster_to?: string;
    readonly products?: IPostingFinancialDataProduct[];
}
export interface IV2FbsPostingProduct {
    readonly name?: string;
    readonly offer_id?: string;
    readonly price?: string;
    readonly quantity?: number;
    readonly sku?: number;
}
export interface IV2FbsPosting {
    readonly analytics_data?: IFbsPostingFbsPostingAnalyticsData;
    readonly barcodes?: IFbsPostingBarcodes;
    readonly cancel_reason_id?: number;
    readonly created_at?: string;
    readonly financial_data?: IV2PostingFinancialData;
    readonly in_process_at?: string;
    readonly order_id?: number;
    readonly order_number?: string;
    readonly posting_number?: string;
    readonly products?: IV2FbsPostingProduct[];
    readonly shipment_date?: string;
    readonly status?: string;
}
export interface IV2FbsPostingResponse {
    readonly result?: IV2FbsPosting;
}
export interface IPostingv3PostingMultiBoxQtySetV3Request {
    readonly posting_number: string;
    readonly multi_box_qty: number;
}
export interface IPostingv3PostingMultiBoxQtySetV3ResponseResult {
    readonly result?: boolean;
}
export interface IPostingv3PostingMultiBoxQtySetV3Response {
    readonly result?: IPostingv3PostingMultiBoxQtySetV3ResponseResult;
}
export interface IPostingProductChangeRequestItem {
    readonly sku: number;
    readonly weightReal: number[];
}
export interface IPostingPostingProductChangeRequest {
    readonly items: IPostingProductChangeRequestItem[];
    readonly posting_number: string;
}
export interface IPostingPostingProductChangeResponse {
    readonly result?: string;
}
export interface IV2FbsPostingProductCountryListRequest {
    readonly name_search?: string;
}
export interface IV2FbsPostingProductCountryListResponseResult {
    readonly name?: string;
    readonly country_iso_code?: string;
}
export interface IV2FbsPostingProductCountryListResponse {
    readonly result?: IV2FbsPostingProductCountryListResponseResult[];
}
export interface IGooglerpcStatus {
    readonly code?: number;
    readonly details?: IProtobufAny[];
    readonly message?: string;
}
export interface IV2FbsPostingProductCountrySetRequest {
    readonly posting_number: string;
    readonly product_id: number;
    readonly country_iso_code: string;
}
export interface IV2FbsPostingProductCountrySetResponse {
    readonly product_id?: number;
    readonly is_gtd_needed?: boolean;
}
export interface IV1GetRestrictionsRequest {
    readonly posting_number: string;
}
export interface IV1Restriction {
    readonly posting_number?: string;
    readonly max_posting_weight?: number;
    readonly min_posting_weight?: number;
    readonly width?: number;
    readonly length?: number;
    readonly height?: number;
    readonly max_posting_price?: number;
    readonly min_posting_price?: number;
}
export interface IV1GetRestrictionsResponse {
    readonly result?: IV1Restriction;
}
export interface IPostingPostingFBSPackageLabelRequest {
    readonly posting_number: string[];
}
export interface IPostingPostingFBSPackageLabelResponse {
    readonly file_content?: string;
    readonly file_name?: string;
    readonly content_type?: string;
}
export interface IV1CreateLabelBatchRequest {
    readonly posting_number: unknown;
}
export interface IV1CreateLabelBatchResponseResult {
    readonly task_id?: number;
}
export interface IV1CreateLabelBatchResponse {
    readonly result?: IV1CreateLabelBatchResponseResult;
}
export interface IV2CreateLabelBatchResponseResultTasks {
    readonly task_id?: number;
    readonly task_type?: string;
}
export interface IV2CreateLabelBatchResponseResult {
    readonly tasks?: IV2CreateLabelBatchResponseResultTasks[];
}
export interface IV2CreateLabelBatchResponse {
    readonly result?: IV2CreateLabelBatchResponseResult;
}
export interface IV1GetLabelBatchRequest {
    readonly task_id: number;
}
export interface IV1GetLabelBatchResponseResult {
    readonly error?: string;
    readonly file_url?: string;
    readonly status?: string;
}
export interface IV1GetLabelBatchResponse {
    readonly result?: IV1GetLabelBatchResponseResult;
}
export interface IPostingCancelReasonRequest {
    readonly related_posting_numbers: string[];
}
export interface IRelatedPostingCancelReasons {
    readonly id?: number;
    readonly title?: string;
    readonly type_id?: string;
}
export interface IRelatedPostingCancelReason {
    readonly posting_number?: string;
    readonly reasons?: IRelatedPostingCancelReasons[];
}
export interface IPostingCancelReasonResponse {
    readonly result?: IRelatedPostingCancelReason[];
}
export interface IPostingCancelReason {
    readonly id?: number;
    readonly is_available_for_cancellation?: boolean;
    readonly title?: string;
    readonly type_id?: string;
}
export interface IPostingCancelReasonListResponse {
    readonly result?: IPostingCancelReason[];
}
export interface IPostingProductCancelRequestItem {
    readonly quantity: number;
    readonly sku: number;
}
export interface IPostingPostingProductCancelRequest {
    readonly cancel_reason_id: number;
    readonly cancel_reason_message: string;
    readonly items: IPostingProductCancelRequestItem[];
    readonly posting_number: string;
}
export interface IPostingPostingProductCancelResponse {
    readonly result?: string;
}
export interface IPostingCancelFbsPostingRequest {
    readonly cancel_reason_id?: number;
    readonly cancel_reason_message?: string;
    readonly posting_number?: string;
}
export interface IPostingBooleanResponse {
    readonly result?: boolean;
}
export interface IPostingMovePostingRequest {
    readonly posting_number: string[];
}
export interface IV2MovePostingToAwaitingDeliveryRequest {
    readonly posting_number: string[];
}
export interface IV1PostingFBSPickupCodeVerifyRequest {
    readonly pickup_code: string;
    readonly posting_number: string;
}
export interface IV1PostingFBSPickupCodeVerifyResponse {
    readonly valid?: boolean;
}
export interface IGetEtgbRequestDate {
    readonly from: string;
    readonly to: string;
}
export interface IV1GetEtgbRequest {
    readonly date: IGetEtgbRequestDate;
}
export interface IGetEtgbResponseResultEtgb {
    readonly number?: string;
    readonly date?: string;
    readonly url?: string;
}
export interface IGetEtgbResponseResult {
    readonly posting_number?: string;
    readonly etgb?: IGetEtgbResponseResultEtgb;
}
export interface IV1GetEtgbResponse {
    readonly result?: IGetEtgbResponseResult[];
}
export interface IV1PostingUnpaidLegalProductListRequest {
    readonly cursor?: string;
    readonly limit?: number;
}
export interface IV1PostingUnpaidLegalProductListResponseProducts {
    readonly product_id?: number;
    readonly offer_id?: string;
    readonly quantity?: number;
    readonly name?: string;
    readonly image_url?: string;
}
export interface IV1PostingUnpaidLegalProductListResponse {
    readonly products?: IV1PostingUnpaidLegalProductListResponseProducts[];
    readonly cursor?: string;
}
