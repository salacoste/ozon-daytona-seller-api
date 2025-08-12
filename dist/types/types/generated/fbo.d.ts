export interface IPostingGetFboPostingListRequestFilter {
    readonly since: string;
    readonly status?: string;
    readonly to: string;
}
export interface IPostingFboPostingWithParams {
    readonly analytics_data?: boolean;
    readonly financial_data?: boolean;
    readonly legal_info?: boolean;
}
export interface IPostingGetFboPostingListRequest {
    readonly dir?: string;
    readonly filter: IPostingGetFboPostingListRequestFilter;
    readonly limit: number;
    readonly offset?: number;
    readonly translit?: boolean;
    readonly with?: IPostingFboPostingWithParams;
}
export interface IV2AdditionalDataItem {
    readonly key?: string;
    readonly value?: string;
}
export interface IFboPostingFboPostingAnalyticsData {
    readonly city?: string;
    readonly delivery_type?: string;
    readonly is_legal?: boolean;
    readonly is_premium?: boolean;
    readonly payment_type_group_name?: string;
    readonly warehouse_id?: number;
    readonly warehouse_name?: string;
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
export interface IV2PostingFinancialData {
    readonly cluster_from?: string;
    readonly cluster_to?: string;
    readonly products?: IPostingFinancialDataProduct[];
}
export interface IV2FboSinglePostingLegalInfo {
    readonly company_name?: string;
    readonly inn?: string;
    readonly kpp?: string;
}
export interface IV2PostingProduct {
    readonly digital_codes?: unknown;
    readonly name?: string;
    readonly offer_id?: string;
    readonly currency_code?: string;
    readonly price?: string;
    readonly is_marketplace_buyout?: boolean;
    readonly quantity?: number;
    readonly sku?: number;
}
export interface IV2FboPosting {
    readonly additional_data?: IV2AdditionalDataItem[];
    readonly analytics_data?: IFboPostingFboPostingAnalyticsData;
    readonly cancel_reason_id?: number;
    readonly created_at?: string;
    readonly financial_data?: IV2PostingFinancialData;
    readonly in_process_at?: string;
    readonly legal_info?: IV2FboSinglePostingLegalInfo;
    readonly order_id?: number;
    readonly order_number?: string;
    readonly posting_number?: string;
    readonly products?: IV2PostingProduct[];
    readonly status?: string;
}
export interface IV2FboPostingListResponse {
    readonly result?: IV2FboPosting[];
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
export interface IPostingGetFboPostingRequest {
    readonly posting_number: string;
    readonly translit?: boolean;
    readonly with?: IPostingFboPostingWithParams;
}
export interface IV2FboPostingResponse {
    readonly result?: IV2FboPosting;
}
export interface ICancelReasonListResponseCancelReason {
    readonly id?: number;
    readonly is_available_for_cancellation?: boolean;
    readonly title?: string;
    readonly type_id?: string;
}
export interface IV1CancelReasonListResponse {
    readonly result?: ICancelReasonListResponseCancelReason[];
}
export type ICommonEmpty = Record<string, unknown>;
export type IV1OrderState = 'ORDER_STATE_UNSPECIFIED' | 'ORDER_STATE_DATA_FILLING' | 'ORDER_STATE_READY_TO_SUPPLY' | 'ORDER_STATE_ACCEPTED_AT_SUPPLY_WAREHOUSE' | 'ORDER_STATE_IN_TRANSIT' | 'ORDER_STATE_ACCEPTANCE_AT_STORAGE_WAREHOUSE' | 'ORDER_STATE_REPORTS_CONFIRMATION_AWAITING' | 'ORDER_STATE_REPORT_REJECTED' | 'ORDER_STATE_COMPLETED' | 'ORDER_STATE_REJECTED_AT_SUPPLY_WAREHOUSE' | 'ORDER_STATE_CANCELLED';
export interface IV1SupplyOrderStatusCounterResponseItem {
    readonly count?: number;
    readonly order_state?: IV1OrderState;
}
export interface IV1SupplyOrderStatusCounterResponse {
    readonly items?: IV1SupplyOrderStatusCounterResponseItem[];
}
export interface IGooglerpcStatus {
    readonly code?: number;
    readonly details?: IProtobufAny[];
    readonly message?: string;
}
export interface IGetSupplyOrderBundleRequestItemTagsCalculation {
    readonly dropoff_warehouse_id: string;
    readonly storage_warehouse_ids: string[];
}
export type IV1ItemSortField = 'UNSPECIFIED' | 'SKU' | 'NAME' | 'QUANTITY' | 'TOTAL_VOLUME_IN_LITRES';
export interface IV1GetSupplyOrderBundleRequest {
    readonly bundle_ids: string[];
    readonly is_asc?: boolean;
    readonly item_tags_calculation?: IGetSupplyOrderBundleRequestItemTagsCalculation;
    readonly last_id?: string;
    readonly limit: number;
    readonly query?: string;
    readonly sort_field?: IV1ItemSortField;
}
export type IV1ItemSfboAttribute = 'ITEM_SFBO_ATTRIBUTE_NONE' | 'ITEM_SFBO_ATTRIBUTE_SUPER_FBO' | 'ITEM_SFBO_ATTRIBUTE_ANTI_FBO';
export type IV1BundleItemShipmentType = 'BUNDLE_ITEM_SHIPMENT_TYPE_GENERAL' | 'BUNDLE_ITEM_SHIPMENT_TYPE_BOX' | 'BUNDLE_ITEM_SHIPMENT_TYPE_PALLET';
export interface IV1ItemResponse {
    readonly icon_path?: string;
    readonly sku?: number;
    readonly name?: string;
    readonly quantity?: number;
    readonly barcode?: string;
    readonly product_id?: number;
    readonly quant?: number;
    readonly is_quant_editable?: boolean;
    readonly volume_in_litres?: number;
    readonly total_volume_in_litres?: number;
    readonly contractor_item_code?: string;
    readonly sfbo_attribute?: IV1ItemSfboAttribute;
    readonly shipment_type?: IV1BundleItemShipmentType;
    readonly tags?: 'EVSD_REQUIRED' | 'MARKING_REQUIRED' | 'MARKING_POSSIBLE' | 'JEWELRY' | 'TRACEABLE' | 'ETTN_REQUIRED' | 'UNDEFINED'[];
    readonly placement_zone?: 'UNSPECIFIED' | 'CLOSED_ZONE' | 'DANGEROUS_GOODS' | 'PRODUCTS' | 'SORT' | 'NON_SORT' | 'OVERSIZE' | 'JEWELRY' | 'UNRESOLVED';
}
export interface IV1GetSupplyOrderBundleResponse {
    readonly items?: IV1ItemResponse[];
    readonly total_count?: number;
    readonly has_next?: boolean;
    readonly last_id?: string;
}
export interface IGetSupplyOrdersListRequestFilter {
    readonly states?: 'ORDER_STATE_DATA_FILLING' | 'ORDER_STATE_READY_TO_SUPPLY' | 'ORDER_STATE_ACCEPTED_AT_SUPPLY_WAREHOUSE' | 'ORDER_STATE_IN_TRANSIT' | 'ORDER_STATE_ACCEPTANCE_AT_STORAGE_WAREHOUSE' | 'ORDER_STATE_REPORTS_CONFIRMATION_AWAITING' | 'ORDER_STATE_REPORT_REJECTED' | 'ORDER_STATE_COMPLETED' | 'ORDER_STATE_REJECTED_AT_SUPPLY_WAREHOUSE' | 'ORDER_STATE_CANCELLED'[];
}
export interface IGetSupplyOrdersListRequestPaging {
    readonly from_supply_order_id?: number;
    readonly limit: number;
}
export interface IV2GetSupplyOrdersListRequest {
    readonly filter?: IGetSupplyOrdersListRequestFilter;
    readonly paging: IGetSupplyOrdersListRequestPaging;
}
export interface IV2GetSupplyOrdersListResponse {
    readonly last_supply_order_id?: number;
    readonly supply_order_id?: string[];
}
export interface IV2GetSupplyOrdersRequest {
    readonly order_ids: string[];
}
export type IV2State = 'ORDER_STATE_UNSPECIFIED' | 'ORDER_STATE_DATA_FILLING' | 'ORDER_STATE_READY_TO_SUPPLY' | 'ORDER_STATE_ACCEPTED_AT_SUPPLY_WAREHOUSE' | 'ORDER_STATE_IN_TRANSIT' | 'ORDER_STATE_ACCEPTANCE_AT_STORAGE_WAREHOUSE' | 'ORDER_STATE_REPORTS_CONFIRMATION_AWAITING' | 'ORDER_STATE_REPORT_REJECTED' | 'ORDER_STATE_COMPLETED' | 'ORDER_STATE_REJECTED_AT_SUPPLY_WAREHOUSE' | 'ORDER_STATE_CANCELLED';
export type IV2SupplyState = 'SUPPLY_STATE_UNSPECIFIED' | 'SUPPLY_STATE_DATA_FILLING' | 'SUPPLY_STATE_READY_TO_SUPPLY' | 'SUPPLY_STATE_ACCEPTED_AT_SUPPLY_WAREHOUSE' | 'SUPPLY_STATE_IN_TRANSIT' | 'SUPPLY_STATE_ACCEPTANCE_AT_STORAGE_WAREHOUSE' | 'SUPPLY_STATE_REPORTS_CONFIRMATION_AWAITING' | 'SUPPLY_STATE_REPORT_REJECTED' | 'SUPPLY_STATE_COMPLETED' | 'SUPPLY_STATE_REJECTED_AT_SUPPLY_WAREHOUSE' | 'SUPPLY_STATE_CANCELLED' | 'SUPPLY_STATE_OVERDUE';
export interface IV2OrderSupplySupplyTags {
    readonly is_ettn_required?: boolean;
    readonly is_evsd_required?: boolean;
    readonly is_jewelry?: boolean;
    readonly is_marking_possible?: boolean;
    readonly is_marking_required?: boolean;
    readonly is_traceable?: boolean;
}
export interface IV2OrderSupply {
    readonly bundle_id?: string;
    readonly storage_warehouse_id?: number;
    readonly supply_id?: number;
    readonly supply_state?: IV2SupplyState;
    readonly supply_tags?: unknown;
}
export interface IV2Timeslot {
    readonly from?: string;
    readonly to?: string;
}
export interface IV2Timezone {
    readonly iana_name?: string;
    readonly offset?: string;
}
export interface IV2TimeslotZonedMessage {
    readonly timeslot?: unknown;
    readonly timezone_info?: unknown;
}
export interface IV2OrderTimeslot {
    readonly can_not_set_reasons?: string[];
    readonly can_set?: boolean;
    readonly is_required?: boolean;
    readonly value?: IV2TimeslotZonedMessage;
}
export interface IV2VehicleInfo {
    readonly driver_name?: string;
    readonly driver_phone?: string;
    readonly vehicle_model?: string;
    readonly vehicle_number?: string;
}
export interface IV2OrderVehicle {
    readonly can_not_set_reasons?: string[];
    readonly can_set?: boolean;
    readonly is_required?: boolean;
    readonly value?: unknown;
}
export interface IV2Order {
    readonly can_cancel?: boolean;
    readonly creation_date?: string;
    readonly data_filling_deadline_utc?: string;
    readonly dropoff_warehouse_id?: number;
    readonly is_econom?: boolean;
    readonly is_super_fbo?: boolean;
    readonly is_virtual?: boolean;
    readonly product_super_fbo?: boolean;
    readonly state?: IV2State;
    readonly supplies?: IV2OrderSupply[];
    readonly supply_order_id?: number;
    readonly supply_order_number?: string;
    readonly timeslot?: IV2OrderTimeslot;
    readonly vehicle?: IV2OrderVehicle;
}
export interface IV2Warehouse {
    readonly address?: string;
    readonly name?: string;
    readonly warehouse_id?: number;
}
export interface IV2GetSupplyOrdersResponse {
    readonly orders?: IV2Order[];
    readonly warehouses?: IV2Warehouse[];
}
export interface IV1GetSupplyOrderTimeslotsRequest {
    readonly supply_order_id: number;
}
export interface IV1SupplyOrderTimeslot {
    readonly from: string;
    readonly to: string;
}
export interface IV1Timezone {
    readonly iana_name?: string;
    readonly offset?: string;
}
export interface IV1GetSupplyOrderTimeslotsResponse {
    readonly timeslots?: IV1SupplyOrderTimeslot[];
    readonly timezone?: unknown;
}
export interface IV1UpdateSupplyOrderTimeslotRequest {
    readonly supply_order_id: number;
    readonly timeslot: IV1SupplyOrderTimeslot;
}
export type IV1UpdateTimeslotError = 'UPDATE_TIMESLOT_ERROR_UNSPECIFIED' | 'UPDATE_TIMESLOT_ERROR_INVALID_ORDER_STATE' | 'UPDATE_TIMESLOT_ERROR_INCOMPATIBLE_ORDER_FLOW' | 'UPDATE_TIMESLOT_ERROR_SET_TIMESLOT_DEADLINE_EXCEED' | 'UPDATE_TIMESLOT_ERROR_OUT_OF_ALLOWED_RANGE' | 'UPDATE_TIMESLOT_ERROR_ORDER_NOT_BELONG_CONTRACTOR' | 'UPDATE_TIMESLOT_ERROR_ORDER_NOT_BELONG_COMPANY';
export interface IV1UpdateSupplyOrderTimeslotResponse {
    readonly errors?: IV1UpdateTimeslotError[];
    readonly operation_id?: string;
}
export interface IV1GetSupplyOrderTimeslotStatusRequest {
    readonly operation_id: string;
}
export type IV1GetSupplyOrderTimeslotStatusResponseStatus = 'STATUS_UNSPECIFIED' | 'STATUS_ERROR' | 'STATUS_IN_PROGRESS' | 'STATUS_SUCCESS';
export interface IV1GetSupplyOrderTimeslotStatusResponse {
    readonly errors?: IV1UpdateTimeslotError[];
    readonly status?: IV1GetSupplyOrderTimeslotStatusResponseStatus;
}
export interface IV1VehicleInfo {
    readonly driver_name: string;
    readonly driver_phone: string;
    readonly vehicle_model: string;
    readonly vehicle_number: string;
}
export interface IV1SupplyOrderPassCreateRequest {
    readonly supply_order_id: number;
    readonly vehicle: IV1VehicleInfo;
}
export type IV1SetVehicleError = 'SET_VEHICLE_ERROR_UNSPECIFIED' | 'SET_VEHICLE_ERROR_INVALID_ORDER_STATE' | 'SET_VEHICLE_ERROR_VEHICLE_NOT_REQUIRED' | 'SET_VEHICLE_ERROR_ORDER_NOT_BELONG_CONTRACTOR' | 'SET_VEHICLE_ERROR_ORDER_NOT_BELONG_COMPANY';
export interface IV1SupplyOrderPassCreateResponse {
    readonly error_reasons?: IV1SetVehicleError[];
    readonly operation_id?: string;
}
export interface IV1SupplyOrderPassStatusRequest {
    readonly operation_id: string;
}
export type IV1SupplyOrderPassStatusResponseStatus = 'Unknown' | 'Success' | 'InProgress' | 'Failed';
export interface IV1SupplyOrderPassStatusResponse {
    readonly errors?: IV1SetVehicleError[];
    readonly result?: IV1SupplyOrderPassStatusResponseStatus;
}
export interface ISupplierAvailableWarehousesResponseCapacity {
    readonly start?: string;
    readonly end?: string;
    readonly value?: number;
}
export interface ISupplierAvailableWarehousesResponseSchedule {
    readonly capacity?: unknown;
    readonly date?: string;
}
export interface ISupplierAvailableWarehousesResponseWarehouse {
    readonly id?: string;
    readonly name?: string;
}
export interface ISupplierAvailableWarehousesResponseResult {
    readonly schedule?: ISupplierAvailableWarehousesResponseSchedule;
    readonly warehouse?: ISupplierAvailableWarehousesResponseWarehouse;
}
export interface IV1SupplierAvailableWarehousesResponse {
    readonly result?: unknown;
}
