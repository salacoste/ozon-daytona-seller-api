export interface IV3ImportProductsRequestDictionaryValue {
    readonly dictionary_value_id?: number;
    readonly value?: string;
}
export interface IV3ImportProductsRequestAttribute {
    readonly complex_id?: number;
    readonly id?: number;
    readonly values?: IV3ImportProductsRequestDictionaryValue[];
}
export interface IV3ImportProductsRequestComplexAttribute {
    readonly attributes?: IV3ImportProductsRequestAttribute[];
}
export interface IImportProductsRequestPdfList {
    readonly index?: number;
    readonly name?: string;
    readonly src_url?: string;
}
export interface IImportProductRequestPromotion {
    readonly operation?: 'UNKNOWN' | 'ENABLE' | 'DISABLE';
    readonly type?: 'REVIEWS_PROMO';
}
export type IV3ServiceType = 'IS_CODE_SERVICE' | 'IS_NO_CODE_SERVICE';
export interface IV3ImportProductsRequestItem {
    readonly attributes?: IV3ImportProductsRequestAttribute[];
    readonly barcode?: string;
    readonly color_image?: string;
    readonly complex_attributes?: IV3ImportProductsRequestComplexAttribute[];
    readonly currency_code?: string;
    readonly depth?: number;
    readonly description_category_id: number;
    readonly new_description_category_id?: number;
    readonly dimension_unit?: string;
    readonly geo_names?: string[];
    readonly height?: number;
    readonly images?: string[];
    readonly images360?: string[];
    readonly name?: string;
    readonly offer_id?: string;
    readonly old_price?: string;
    readonly pdf_list?: IImportProductsRequestPdfList[];
    readonly price?: string;
    readonly primary_image?: string;
    readonly promotions?: IImportProductRequestPromotion[];
    readonly service_type?: IV3ServiceType;
    readonly type_id: number;
    readonly vat?: string;
    readonly weight?: number;
    readonly weight_unit?: string;
    readonly width?: number;
}
export interface IV3ImportProductsRequest {
    readonly items?: IV3ImportProductsRequestItem[];
}
export interface IV3ImportProductsResponseResult {
    readonly task_id?: number;
}
export interface IV3ImportProductsResponse {
    readonly result?: IV3ImportProductsResponseResult;
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
export interface IProductGetImportProductsInfoRequest {
    readonly task_id: number;
}
export interface IV1ItemError {
    readonly code?: string;
    readonly message?: string;
    readonly state?: string;
    readonly level?: string;
    readonly description?: string;
    readonly field?: string;
    readonly attribute_id?: number;
    readonly attribute_name?: string;
}
export interface IGetImportProductsInfoResponseResultItem {
    readonly offer_id?: string;
    readonly product_id?: number;
    readonly status?: string;
    readonly errors?: IV1ItemError[];
}
export interface IProductGetImportProductsInfoResponseResult {
    readonly items?: IGetImportProductsInfoResponseResultItem[];
    readonly total?: number;
}
export interface IProductGetImportProductsInfoResponse {
    readonly result?: IProductGetImportProductsInfoResponseResult;
}
export interface IProductImportProductsBySKURequestItem {
    readonly name?: string;
    readonly offer_id?: string;
    readonly old_price?: string;
    readonly price?: string;
    readonly sku: number;
    readonly vat?: string;
    readonly currency_code?: string;
}
export interface IProductImportProductsBySKURequest {
    readonly items?: IProductImportProductsBySKURequestItem[];
}
export interface IProductImportProductsBySKUResponseResult {
    readonly task_id?: number;
    readonly unmatched_sku_list?: number[];
}
export interface IProductImportProductsBySKUResponse {
    readonly result?: IProductImportProductsBySKUResponseResult;
}
export interface IV1ProductUpdateAttributesRequestValue {
    readonly dictionary_value_id?: number;
    readonly value?: string;
}
export interface IV1ProductUpdateAttributesRequestAttribute {
    readonly complex_id?: number;
    readonly id?: number;
    readonly values?: unknown;
}
export interface IV1ProductUpdateAttributesRequestItem {
    readonly attributes?: unknown;
    readonly offer_id: string;
}
export interface IV1ProductUpdateAttributesRequest {
    readonly items?: unknown;
}
export interface IV1ProductUpdateAttributesResponse {
    readonly task_id?: number;
}
export interface IProductv1ProductImportPicturesRequest {
    readonly color_image?: string;
    readonly images?: unknown;
    readonly images360?: unknown;
    readonly product_id: number;
}
export interface IProductProductInfoPicturesResponsePicture {
    readonly is_360?: boolean;
    readonly is_color?: boolean;
    readonly is_primary?: boolean;
    readonly product_id?: number;
    readonly state?: string;
    readonly url?: string;
}
export interface IProductv1ProductInfoPicturesResponseResult {
    readonly pictures?: unknown;
}
export interface IProductv1ProductInfoPicturesResponse {
    readonly result?: IProductv1ProductInfoPicturesResponseResult;
}
export type IProductv3GetProductListRequestFilterFilterVisibility = 'ALL' | 'VISIBLE' | 'INVISIBLE' | 'EMPTY_STOCK' | 'NOT_MODERATED' | 'MODERATED' | 'DISABLED' | 'STATE_FAILED' | 'READY_TO_SUPPLY' | 'VALIDATION_STATE_PENDING' | 'VALIDATION_STATE_FAIL' | 'VALIDATION_STATE_SUCCESS' | 'TO_SUPPLY' | 'IN_SALE' | 'REMOVED_FROM_SALE' | 'OVERPRICED' | 'CRITICALLY_OVERPRICED' | 'EMPTY_BARCODE' | 'BARCODE_EXISTS' | 'QUARANTINE' | 'ARCHIVED' | 'OVERPRICED_WITH_STOCK' | 'PARTIAL_APPROVED';
export interface IProductv3GetProductListRequestFilter {
    readonly offer_id?: unknown;
    readonly product_id?: unknown;
    readonly visibility?: IProductv3GetProductListRequestFilterFilterVisibility;
}
export interface IProductv3GetProductListRequest {
    readonly filter?: IProductv3GetProductListRequestFilter;
    readonly last_id?: string;
    readonly limit?: number;
}
export interface IProductv3GetProductListResponseItemQuant {
    readonly quant_code?: string;
    readonly quant_size?: number;
}
export interface IProductv3GetProductListResponseItem {
    readonly archived?: boolean;
    readonly has_fbo_stocks?: boolean;
    readonly has_fbs_stocks?: boolean;
    readonly is_discounted?: boolean;
    readonly offer_id?: string;
    readonly product_id?: number;
    readonly quants?: IProductv3GetProductListResponseItemQuant;
}
export interface IProductv3GetProductListResponseResult {
    readonly items?: unknown;
    readonly last_id?: string;
    readonly total?: number;
}
export interface IProductv3GetProductListResponse {
    readonly result?: IProductv3GetProductListResponseResult;
}
export interface IV1GetProductRatingBySkuRequest {
    readonly skus: unknown;
}
export interface IGetProductRatingBySkuResponseRatingCondition {
    readonly cost?: number;
    readonly description?: string;
    readonly fulfilled?: boolean;
    readonly key?: string;
}
export interface IGetProductRatingBySkuResponseRatingImproveAttribute {
    readonly id?: number;
    readonly name?: string;
}
export interface IGetProductRatingBySkuResponseRatingGroup {
    readonly conditions?: unknown;
    readonly improve_at_least?: number;
    readonly improve_attributes?: unknown;
    readonly key?: string;
    readonly name?: string;
    readonly rating?: number;
    readonly weight?: number;
}
export interface IGetProductRatingBySkuResponseProductRating {
    readonly sku?: number;
    readonly rating?: number;
    readonly groups?: unknown;
}
export interface IV1GetProductRatingBySkuResponse {
    readonly products?: unknown;
}
export interface IV3GetProductInfoListRequest {
    readonly offer_id?: string[];
    readonly product_id?: string[];
    readonly sku?: string[];
}
export interface IGetProductInfoListResponseCommission {
    readonly delivery_amount?: number;
    readonly percent?: number;
    readonly return_amount?: number;
    readonly sale_schema?: string;
    readonly value?: number;
}
export type IErrorErrorLevel = 'ERROR_LEVEL_UNSPECIFIED' | 'ERROR_LEVEL_ERROR' | 'ERROR_LEVEL_WARNING' | 'ERROR_LEVEL_INTERNAL';
export interface IHumanTextsParam {
    readonly name?: string;
    readonly value?: string;
}
export interface IErrorHumanTexts {
    readonly attribute_name?: string;
    readonly description?: string;
    readonly hint_code?: string;
    readonly message?: string;
    readonly params?: IHumanTextsParam[];
    readonly short_description?: string;
}
export interface IGetProductInfoListResponseError {
    readonly attribute_id?: number;
    readonly code?: string;
    readonly field?: string;
    readonly level?: IErrorErrorLevel;
    readonly state?: string;
    readonly texts?: IErrorHumanTexts;
}
export interface IGetProductInfoListResponseModelInfo {
    readonly count?: number;
    readonly model_id?: number;
}
export type IPriceIndexesColorIndex = 'COLOR_INDEX_UNSPECIFIED' | 'COLOR_INDEX_WITHOUT_INDEX' | 'COLOR_INDEX_GREEN' | 'COLOR_INDEX_YELLOW' | 'COLOR_INDEX_RED';
export interface IPriceIndexesIndexDataExternal {
    readonly minimal_price?: string;
    readonly minimal_price_currency?: string;
    readonly price_index_value?: number;
}
export interface IPriceIndexesIndexDataOzon {
    readonly minimal_price?: string;
    readonly minimal_price_currency?: string;
    readonly price_index_value?: number;
}
export interface IPriceIndexesIndexDataSelf {
    readonly minimal_price?: string;
    readonly minimal_price_currency?: string;
    readonly price_index_value?: number;
}
export interface IGetProductInfoListResponsePriceIndexes {
    readonly color_index?: IPriceIndexesColorIndex;
    readonly external_index_data?: IPriceIndexesIndexDataExternal;
    readonly ozon_index_data?: IPriceIndexesIndexDataOzon;
    readonly self_marketplaces_index_data?: IPriceIndexesIndexDataSelf;
}
export type ISourceShipmentType = 'SHIPMENT_TYPE_UNSPECIFIED' | 'SHIPMENT_TYPE_GENERAL' | 'SHIPMENT_TYPE_BOX' | 'SHIPMENT_TYPE_PALLET';
export interface IGetProductInfoListResponseSource {
    readonly created_at?: string;
    readonly quant_code?: string;
    readonly shipment_type?: ISourceShipmentType;
    readonly sku?: number;
    readonly source?: string;
}
export interface IGetProductInfoListResponseStatuses {
    readonly is_created?: boolean;
    readonly moderate_status?: string;
    readonly status?: string;
    readonly status_description?: string;
    readonly status_failed?: string;
    readonly status_name?: string;
    readonly status_tooltip?: string;
    readonly status_updated_at?: string;
    readonly validation_status?: string;
}
export interface IGetProductInfoListResponseStocksStock {
    readonly present?: number;
    readonly reserved?: number;
    readonly sku?: number;
    readonly source?: string;
}
export interface IGetProductInfoListResponseStocks {
    readonly has_stock?: boolean;
    readonly stocks?: IGetProductInfoListResponseStocksStock[];
}
export interface IGetProductInfoListResponseVisibilityDetails {
    readonly has_price?: boolean;
    readonly has_stock?: boolean;
}
export interface IV3GetProductInfoListResponseItem {
    readonly barcodes?: string[];
    readonly color_image?: string[];
    readonly commissions?: IGetProductInfoListResponseCommission[];
    readonly created_at?: string;
    readonly currency_code?: string;
    readonly description_category_id?: number;
    readonly discounted_fbo_stocks?: number;
    readonly errors?: IGetProductInfoListResponseError[];
    readonly has_discounted_fbo_item?: boolean;
    readonly id?: number;
    readonly images?: string[];
    readonly images360?: string[];
    readonly is_archived?: boolean;
    readonly is_autoarchived?: boolean;
    readonly is_discounted?: boolean;
    readonly is_kgt?: boolean;
    readonly is_prepayment_allowed?: boolean;
    readonly is_super?: boolean;
    readonly marketing_price?: string;
    readonly min_price?: string;
    readonly model_info?: IGetProductInfoListResponseModelInfo;
    readonly name?: string;
    readonly offer_id?: string;
    readonly old_price?: string;
    readonly price?: string;
    readonly price_indexes?: IGetProductInfoListResponsePriceIndexes;
    readonly primary_image?: string[];
    readonly sources?: IGetProductInfoListResponseSource[];
    readonly statuses?: IGetProductInfoListResponseStatuses;
    readonly stocks?: IGetProductInfoListResponseStocks;
    readonly type_id?: number;
    readonly updated_at?: string;
    readonly vat?: string;
    readonly visibility_details?: IGetProductInfoListResponseVisibilityDetails;
    readonly volume_weight?: number;
}
export interface IV3GetProductInfoListResponse {
    readonly items?: IV3GetProductInfoListResponseItem[];
}
export type IProductv2GetProductListRequestFilterFilterVisibility = 'ALL' | 'VISIBLE' | 'INVISIBLE' | 'EMPTY_STOCK' | 'NOT_MODERATED' | 'MODERATED' | 'DISABLED' | 'STATE_FAILED' | 'READY_TO_SUPPLY' | 'VALIDATION_STATE_PENDING' | 'VALIDATION_STATE_FAIL' | 'VALIDATION_STATE_SUCCESS' | 'TO_SUPPLY' | 'IN_SALE' | 'REMOVED_FROM_SALE' | 'OVERPRICED' | 'CRITICALLY_OVERPRICED' | 'EMPTY_BARCODE' | 'BARCODE_EXISTS' | 'QUARANTINE' | 'ARCHIVED' | 'OVERPRICED_WITH_STOCK' | 'PARTIAL_APPROVED';
export interface IProductv4Filter {
    readonly offer_id?: unknown;
    readonly product_id?: unknown;
    readonly sku?: string[];
    readonly visibility?: IProductv2GetProductListRequestFilterFilterVisibility;
}
export interface IProductv4GetProductAttributesV4Request {
    readonly filter?: IProductv4Filter;
    readonly last_id?: string;
    readonly limit?: number;
    readonly sort_by?: string;
    readonly sort_dir?: string;
}
export interface IProductGetProductAttributesV3ResponseDictionaryValue {
    readonly dictionary_value_id?: number;
    readonly value?: string;
}
export interface IProductGetProductAttributesV4ResponseAttribute {
    readonly id?: number;
    readonly complex_id?: number;
    readonly values?: IProductGetProductAttributesV3ResponseDictionaryValue[];
}
export interface IGetProductAttributesV3ResponseDictionaryValue {
    readonly dictionaryValueId?: number;
    readonly value?: string;
}
export interface IGetProductAttributesV4ResponseAttribute {
    readonly id?: number;
    readonly complex_id?: number;
    readonly values?: IGetProductAttributesV3ResponseDictionaryValue[];
}
export interface IGetProductAttributesResponseImage {
    readonly default?: boolean;
    readonly file_name?: string;
    readonly index?: number;
}
export interface IV4GetProductAttributesResponseModelInfo {
    readonly model_id?: number;
    readonly count?: number;
}
export interface IV4GetProductAttributesResponsePdf {
    readonly file_name?: string;
    readonly name?: string;
}
export interface IProductv4GetProductAttributesV4ResponseResult {
    readonly attributes?: IProductGetProductAttributesV4ResponseAttribute[];
    readonly attributes_with_defaults?: number[];
    readonly barcode?: string;
    readonly barcodes?: unknown;
    readonly description_category_id?: number;
    readonly color_image?: string;
    readonly complex_attributes?: IGetProductAttributesV4ResponseAttribute[];
    readonly depth?: number;
    readonly dimension_unit?: string;
    readonly height?: number;
    readonly id?: number;
    readonly images?: unknown;
    readonly model_info?: IV4GetProductAttributesResponseModelInfo;
    readonly name?: string;
    readonly offer_id?: string;
    readonly pdf_list?: IV4GetProductAttributesResponsePdf[];
    readonly primary_image?: string;
    readonly sku?: string;
    readonly type_id?: number;
    readonly weight?: number;
    readonly weight_unit?: string;
    readonly width?: number;
}
export interface IProductv4GetProductAttributesV4Response {
    readonly result?: IProductv4GetProductAttributesV4ResponseResult[];
    readonly last_id?: string;
    readonly total?: string;
}
export interface IProductGetProductInfoDescriptionRequest {
    readonly offer_id?: string;
    readonly product_id?: number;
}
export interface IProductGetProductInfoDescriptionResponseProduct {
    readonly description?: string;
    readonly id?: number;
    readonly name?: string;
    readonly offer_id?: string;
}
export interface IProductGetProductInfoDescriptionResponse {
    readonly result?: IProductGetProductInfoDescriptionResponseProduct;
}
export type IV1Empty = Record<string, unknown>;
export interface IGetUploadQuotaResponseDailyCreate {
    readonly limit?: number;
    readonly reset_at?: string;
    readonly usage?: number;
}
export interface IGetUploadQuotaResponseDailyUpdate {
    readonly limit?: number;
    readonly reset_at?: string;
    readonly usage?: number;
}
export interface IGetUploadQuotaResponseTotal {
    readonly limit?: number;
    readonly usage?: number;
}
export interface IV4GetUploadQuotaResponse {
    readonly daily_create?: IGetUploadQuotaResponseDailyCreate;
    readonly daily_update?: IGetUploadQuotaResponseDailyUpdate;
    readonly total?: IGetUploadQuotaResponseTotal;
}
export interface IProductUpdateOfferIdRequestUpdateOfferId {
    readonly new_offer_id: string;
    readonly offer_id: string;
}
export interface IV1ProductUpdateOfferIdRequest {
    readonly update_offer_id: unknown;
}
export interface IV1ProductUpdateOfferIdResponseError {
    readonly message?: string;
    readonly offer_id?: string;
}
export interface IV1ProductUpdateOfferIdResponse {
    readonly errors?: unknown;
}
export interface IProductProductArchiveRequest {
    readonly product_id: number[];
}
export interface IProductBooleanResponse {
    readonly result?: boolean;
}
export interface IProductProductUnarchiveRequest {
    readonly product_id: number[];
}
export interface IDeleteProductsRequestProduct {
    readonly offer_id: string;
}
export interface IProductv2DeleteProductsRequest {
    readonly products: IDeleteProductsRequestProduct[];
}
export interface IDeleteProductsResponseDeleteStatus {
    readonly error?: string;
    readonly is_deleted?: boolean;
    readonly offer_id?: string;
}
export interface IProductv2DeleteProductsResponse {
    readonly status?: IDeleteProductsResponseDeleteStatus[];
}
export interface IV1GetProductInfoSubscriptionRequest {
    readonly skus: string[];
}
export interface IV1GetProductInfoSubscriptionResponseResult {
    readonly count?: number;
    readonly sku?: number;
}
export interface IV1GetProductInfoSubscriptionResponse {
    readonly result?: IV1GetProductInfoSubscriptionResponseResult[];
}
export interface IV1ProductGetRelatedSKURequest {
    readonly sku: unknown;
}
export interface IV1ProductGetRelatedSKUResponseItem {
    readonly availability?: string;
    readonly deleted_at?: string;
    readonly delivery_schema?: string;
    readonly product_id?: number;
    readonly sku?: number;
}
export interface IV1ProductGetRelatedSKUResponseError {
    readonly code?: string;
    readonly sku?: number;
    readonly message?: string;
}
export interface IV1ProductGetRelatedSKUResponse {
    readonly items?: unknown;
    readonly errors?: unknown;
}
export interface IV2ProductInfoPicturesRequest {
    readonly product_id: unknown;
}
export interface IV2ProductInfoPicturesResponseError {
    readonly message?: string;
    readonly url?: string;
}
export interface IV2ProductInfoPicturesResponseItem {
    readonly product_id?: number;
    readonly primary_photo?: string[];
    readonly photo?: string[];
    readonly color_photo?: string[];
    readonly photo_360?: string[];
    readonly errors?: IV2ProductInfoPicturesResponseError[];
}
export interface IV2ProductInfoPicturesResponse {
    readonly items?: IV2ProductInfoPicturesResponseItem[];
}
