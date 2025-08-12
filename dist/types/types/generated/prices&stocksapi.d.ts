export interface IProductv2ProductsStocksRequestStock {
    readonly offer_id?: string;
    readonly product_id: number;
    readonly stock: number;
    readonly warehouse_id: number;
}
export interface IProductv2ProductsStocksRequest {
    readonly stocks: IProductv2ProductsStocksRequestStock[];
}
export interface IProductv2ProductsStocksResponseError {
    readonly code?: string;
    readonly message?: string;
}
export interface IProductv2ProductsStocksResponseResult {
    readonly errors?: IProductv2ProductsStocksResponseError[];
    readonly offer_id?: string;
    readonly product_id?: number;
    readonly updated?: boolean;
    readonly warehouse_id?: number;
}
export interface IProductv2ProductsStocksResponse {
    readonly result?: IProductv2ProductsStocksResponseResult[];
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
export type IV4Visibility = 'ALL' | 'VISIBLE' | 'INVISIBLE' | 'EMPTY_STOCK' | 'NOT_MODERATED' | 'MODERATED' | 'DISABLED' | 'STATE_FAILED' | 'READY_TO_SUPPLY' | 'VALIDATION_STATE_PENDING' | 'VALIDATION_STATE_FAIL' | 'VALIDATION_STATE_SUCCESS' | 'TO_SUPPLY' | 'IN_SALE' | 'REMOVED_FROM_SALE' | 'BANNED' | 'OVERPRICED' | 'CRITICALLY_OVERPRICED' | 'EMPTY_BARCODE' | 'BARCODE_EXISTS' | 'QUARANTINE' | 'ARCHIVED' | 'OVERPRICED_WITH_STOCK' | 'PARTIAL_APPROVED';
export interface IFilterWithQuant {
    readonly created?: boolean;
    readonly exists?: boolean;
}
export interface IV4GetProductInfoStocksRequestFilter {
    readonly offer_id?: string[];
    readonly product_id?: string[];
    readonly visibility?: IV4Visibility;
    readonly with_quant?: IFilterWithQuant;
}
export interface IV4GetProductInfoStocksRequest {
    readonly cursor?: string;
    readonly filter: IV4GetProductInfoStocksRequestFilter;
    readonly limit: number;
}
export type IStockShipmentType = 'SHIPMENT_TYPE_GENERAL' | 'SHIPMENT_TYPE_BOX' | 'SHIPMENT_TYPE_PALLET';
export interface IGetProductInfoStocksResponseStock {
    readonly present?: number;
    readonly reserved?: number;
    readonly shipment_type?: IStockShipmentType;
    readonly sku?: number;
    readonly type?: string;
    readonly warehouse_ids?: string[];
}
export interface IV4GetProductInfoStocksResponseItem {
    readonly offer_id?: string;
    readonly product_id?: number;
    readonly stocks?: IGetProductInfoStocksResponseStock[];
}
export interface IV4GetProductInfoStocksResponse {
    readonly cursor?: string;
    readonly items?: IV4GetProductInfoStocksResponseItem[];
    readonly total?: number;
}
export interface IProductsv1GetProductInfoStocksByWarehouseFbsRequest {
    readonly sku: unknown;
}
export interface IProductsv1GetProductInfoStocksByWarehouseFbsResponseResult {
    readonly sku?: number;
    readonly present?: number;
    readonly product_id?: number;
    readonly reserved?: number;
    readonly warehouse_id?: number;
    readonly warehouse_name?: string;
}
export interface IProductsv1GetProductInfoStocksByWarehouseFbsResponse {
    readonly result?: unknown;
}
export interface IProductImportProductsPricesRequestPrice {
    readonly auto_action_enabled?: 'UNKNOWN' | 'ENABLED' | 'DISABLED';
    readonly auto_add_to_ozon_actions_list_enabled?: 'UNKNOWN' | 'ENABLED' | 'DISABLED';
    readonly currency_code?: string;
    readonly min_price?: string;
    readonly min_price_for_auto_actions_enabled?: boolean;
    readonly net_price?: string;
    readonly offer_id?: string;
    readonly old_price?: string;
    readonly price?: string;
    readonly price_strategy_enabled?: 'UNKNOWN' | 'ENABLED' | 'DISABLED';
    readonly product_id?: number;
    readonly quant_size?: number;
    readonly vat?: string;
}
export interface IProductImportProductsPricesRequest {
    readonly prices?: IProductImportProductsPricesRequestPrice[];
}
export interface IProductImportProductsPricesResponseError {
    readonly code?: string;
    readonly message?: string;
}
export interface IProductImportProductsPricesResponseProcessResult {
    readonly errors?: IProductImportProductsPricesResponseError[];
    readonly offer_id?: string;
    readonly product_id?: number;
    readonly updated?: boolean;
}
export interface IProductImportProductsPricesResponse {
    readonly result?: IProductImportProductsPricesResponseProcessResult[];
}
export interface IV1ProductActionTimerUpdateRequest {
    readonly product_ids?: unknown;
}
export type IV1ProductActionTimerUpdateResponse = Record<string, unknown>;
export interface IV1ProductActionTimerStatusRequest {
    readonly product_ids?: unknown;
}
export interface IV1ProductActionTimerStatusResponseStatuses {
    readonly expired_at?: string;
    readonly min_price_for_auto_actions_enabled?: boolean;
    readonly product_id?: number;
}
export interface IV1ProductActionTimerStatusResponse {
    readonly statuses?: unknown;
}
export type IProductv5GetProductListRequestFilterFilterVisibility = 'ALL' | 'VISIBLE' | 'INVISIBLE' | 'EMPTY_STOCK' | 'NOT_MODERATED' | 'MODERATED' | 'DISABLED' | 'STATE_FAILED' | 'READY_TO_SUPPLY' | 'VALIDATION_STATE_PENDING' | 'VALIDATION_STATE_FAIL' | 'VALIDATION_STATE_SUCCESS' | 'TO_SUPPLY' | 'IN_SALE' | 'REMOVED_FROM_SALE' | 'OVERPRICED' | 'CRITICALLY_OVERPRICED' | 'EMPTY_BARCODE' | 'BARCODE_EXISTS' | 'QUARANTINE' | 'ARCHIVED' | 'OVERPRICED_WITH_STOCK' | 'PARTIAL_APPROVED';
export interface IProductv5Filter {
    readonly offer_id?: unknown;
    readonly product_id?: unknown;
    readonly visibility?: IProductv5GetProductListRequestFilterFilterVisibility;
}
export interface IProductv5GetProductInfoPricesV5Request {
    readonly cursor?: string;
    readonly filter: IProductv5Filter;
    readonly limit: number;
}
export interface IItemCommissionsv5 {
    readonly fbo_deliv_to_customer_amount?: number;
    readonly fbo_direct_flow_trans_max_amount?: number;
    readonly fbo_direct_flow_trans_min_amount?: number;
    readonly fbo_return_flow_amount?: number;
    readonly fbs_deliv_to_customer_amount?: number;
    readonly fbs_direct_flow_trans_max_amount?: number;
    readonly fbs_direct_flow_trans_min_amount?: number;
    readonly fbs_first_mile_max_amount?: number;
    readonly fbs_first_mile_min_amount?: number;
    readonly fbs_return_flow_amount?: number;
    readonly sales_percent_fbo?: number;
    readonly sales_percent_fbs?: number;
}
export interface IMarketingAction {
    readonly date_from?: string;
    readonly date_to?: string;
    readonly title?: string;
    readonly value?: string;
}
export interface IItemMarketing {
    readonly actions?: IMarketingAction[];
    readonly current_period_from?: string;
    readonly current_period_to?: string;
    readonly ozon_actions_exist?: boolean;
}
export interface IItemPricev5 {
    readonly auto_action_enabled?: boolean;
    readonly auto_add_to_ozon_actions_list_enabled?: boolean;
    readonly currency_code?: string;
    readonly marketing_price?: number;
    readonly marketing_seller_price?: number;
    readonly min_price?: number;
    readonly net_price?: number;
    readonly old_price?: number;
    readonly price?: number;
    readonly retail_price?: number;
    readonly vat?: number;
}
export interface IPriceIndexesIndexExternalData {
    readonly min_price?: string;
    readonly min_price_currency?: string;
    readonly price_index_value?: number;
}
export interface IPriceIndexesIndexOzonData {
    readonly min_price?: string;
    readonly min_price_currency?: string;
    readonly price_index_value?: number;
}
export interface IPriceIndexesIndexSelfData {
    readonly min_price?: string;
    readonly min_price_currency?: string;
    readonly price_index_value?: number;
}
export interface IGetProductInfoPricesResponseItemPriceIndexes {
    readonly color_index?: 'WITHOUT_INDEX' | 'GREEN' | 'YELLOW' | 'RED';
    readonly external_index_data?: IPriceIndexesIndexExternalData;
    readonly ozon_index_data?: IPriceIndexesIndexOzonData;
    readonly self_marketplaces_index_data?: IPriceIndexesIndexSelfData;
}
export interface IProductGetProductInfoPricesV5ResponseItem {
    readonly acquiring?: number;
    readonly commissions?: IItemCommissionsv5;
    readonly marketing_actions?: IItemMarketing;
    readonly offer_id?: string;
    readonly price?: IItemPricev5;
    readonly price_indexes?: IGetProductInfoPricesResponseItemPriceIndexes;
    readonly product_id?: number;
    readonly volume_weight?: number;
}
export interface IProductv5GetProductInfoPricesV5Response {
    readonly cursor?: string;
    readonly items?: unknown;
    readonly total?: number;
}
export interface IV1GetProductInfoDiscountedRequest {
    readonly discounted_skus: unknown;
}
export interface IV1GetProductInfoDiscountedResponseItem {
    readonly comment_reason_damaged?: string;
    readonly condition?: string;
    readonly condition_estimation?: string;
    readonly defects?: string;
    readonly discounted_sku?: number;
    readonly mechanical_damage?: string;
    readonly package_damage?: string;
    readonly packaging_violation?: string;
    readonly reason_damaged?: string;
    readonly repair?: string;
    readonly shortage?: string;
    readonly sku?: number;
    readonly warranty_type?: string;
}
export interface IV1GetProductInfoDiscountedResponse {
    readonly items?: unknown;
}
export interface IV1ProductUpdateDiscountRequest {
    readonly discount: number;
    readonly product_id: number;
}
export interface IV1ProductUpdateDiscountResponse {
    readonly result?: boolean;
}
