export type IV1ClusterType = 'CLUSTER_TYPE_OZON' | 'CLUSTER_TYPE_CIS';
export interface IV1DraftClusterListRequest {
    readonly cluster_ids?: string[];
    readonly cluster_type: IV1ClusterType;
}
export interface IV1DraftClusterListResponseWarehouse {
    readonly name?: string;
    readonly type?: 'FULL_FILLMENT' | 'EXPRESS_DARK_STORE' | 'SORTING_CENTER' | 'ORDERS_RECEIVING_POINT' | 'CROSS_DOCK' | 'DISTRIBUTION_CENTER';
    readonly warehouse_id?: number;
}
export interface IDraftClusterListResponseLogisticCluster {
    readonly warehouses?: IV1DraftClusterListResponseWarehouse[];
}
export interface IV1DraftClusterListResponseCluster {
    readonly id?: number;
    readonly logistic_clusters?: IDraftClusterListResponseLogisticCluster[];
    readonly name?: string;
    readonly type?: 'CLUSTER_TYPE_OZON' | 'CLUSTER_TYPE_CIS';
}
export interface IV1DraftClusterListResponse {
    readonly clusters?: IV1DraftClusterListResponseCluster[];
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
export type IV1CreateType = 'CREATE_TYPE_CROSSDOCK' | 'CREATE_TYPE_DIRECT';
export interface IV1DraftGetWarehouseFboListRequest {
    readonly filter_by_supply_type: IV1CreateType[];
    readonly search: string;
}
export interface IDraftGetWarehouseFboListResponseCoordinate {
    readonly latitude?: number;
    readonly longitude?: number;
}
export type IDraftGetWarehouseFboListResponseWarehouseType = 'WAREHOUSE_TYPE_DELIVERY_POINT' | 'WAREHOUSE_TYPE_ORDERS_RECEIVING_POINT' | 'WAREHOUSE_TYPE_SORTING_CENTER' | 'WAREHOUSE_TYPE_FULL_FILLMENT' | 'WAREHOUSE_TYPE_CROSS_DOCK';
export interface IDraftGetWarehouseFboListResponseSearch {
    readonly address?: string;
    readonly coordinates?: IDraftGetWarehouseFboListResponseCoordinate;
    readonly name?: string;
    readonly warehouse_id?: number;
    readonly warehouse_type?: IDraftGetWarehouseFboListResponseWarehouseType;
}
export interface IV1DraftGetWarehouseFboListResponse {
    readonly search?: IDraftGetWarehouseFboListResponseSearch[];
}
export interface IDraftCreateRequestItem {
    readonly quantity: number;
    readonly sku: number;
}
export interface IV1DraftCreateRequest {
    readonly cluster_ids?: string[];
    readonly drop_off_point_warehouse_id?: number;
    readonly items: IDraftCreateRequestItem[];
    readonly type: IV1CreateType;
}
export interface IV1DraftCreateResponse {
    readonly operation_id?: string;
}
export interface IV1DraftCreateInfoRequest {
    readonly operation_id: string;
}
export interface IV1BundleId {
    readonly bundle_id?: string;
    readonly is_docless?: boolean;
}
export type IV1WarehouseScoringInvalidReason = 'WAREHOUSE_SCORING_INVALID_REASON_PARTIAL_MATRIX_AVAILABLE' | 'WAREHOUSE_SCORING_INVALID_REASON_NOT_AVAILABLE_MATRIX' | 'WAREHOUSE_SCORING_INVALID_REASON_NOT_AVAILABLE_RANK' | 'WAREHOUSE_SCORING_INVALID_REASON_NOT_AVAILABLE_ROUTE' | 'WAREHOUSE_SCORING_INVALID_REASON_NOT_AVAILABLE_TIMESLOT_FOR_DROP_OFF_POINT' | 'WAREHOUSE_SCORING_INVALID_REASON_NOT_AVAILABLE_TIMESLOT_FOR_STORAGE_WAREHOUSE' | 'WAREHOUSE_SCORING_INVALID_REASON_NOT_AVAILABLE_TIMESLOT_FOR_BOTH_WAREHOUSE';
export type IV1WarehouseScoringStatus = 'WAREHOUSE_SCORING_STATUS_FULL_AVAILABLE' | 'WAREHOUSE_SCORING_STATUS_PARTIAL_AVAILABLE' | 'WAREHOUSE_SCORING_STATUS_NOT_AVAILABLE';
export interface IV1WarehouseStatus {
    readonly invalid_reason?: IV1WarehouseScoringInvalidReason;
    readonly is_available?: boolean;
    readonly state?: IV1WarehouseScoringStatus;
}
export interface IV1SupplyWarehouse {
    readonly address?: string;
    readonly name?: string;
    readonly warehouse_id?: number;
}
export interface IDraftv1Warehouse {
    readonly bundle_ids?: IV1BundleId[];
    readonly restricted_bundle_id?: string;
    readonly status?: IV1WarehouseStatus;
    readonly supply_warehouse?: IV1SupplyWarehouse;
    readonly total_rank?: number;
    readonly total_score?: number;
    readonly travel_time_days?: number;
}
export interface IDraftv1Cluster {
    readonly cluster_id?: number;
    readonly cluster_name?: string;
    readonly warehouses?: IDraftv1Warehouse[];
}
export interface IV1ItemsValidation {
    readonly reasons?: string[];
    readonly sku?: number;
}
export interface IV1CalculationError {
    readonly error_message?: string;
    readonly items_validation?: IV1ItemsValidation[];
    readonly unknown_cluster_ids?: string[];
}
export type IV1CalculationStatus = 'CALCULATION_STATUS_FAILED' | 'CALCULATION_STATUS_SUCCESS' | 'CALCULATION_STATUS_IN_PROGRESS' | 'CALCULATION_STATUS_EXPIRED';
export interface IV1DraftCreateInfoResponse {
    readonly clusters?: IDraftv1Cluster[];
    readonly draft_id?: number;
    readonly errors?: IV1CalculationError[];
    readonly status?: IV1CalculationStatus;
}
export interface IV1DraftTimeslotInfoRequest {
    readonly date_from: string;
    readonly date_to: string;
    readonly draft_id: number;
    readonly warehouse_ids: string[];
}
export interface IV1DayTimeSlot {
    readonly from_in_timezone?: string;
    readonly to_in_timezone?: string;
}
export interface IV1Day {
    readonly date_in_timezone?: string;
    readonly timeslots?: IV1DayTimeSlot[];
}
export interface IV1DropOffWarehouse {
    readonly current_time_in_timezone?: string;
    readonly days?: IV1Day[];
    readonly drop_off_warehouse_id?: number;
    readonly warehouse_timezone?: string;
}
export interface IV1DraftTimeslotInfoResponse {
    readonly drop_off_warehouse_timeslots?: IV1DropOffWarehouse[];
    readonly requested_date_from?: string;
    readonly requested_date_to?: string;
}
export interface IV1DraftSupplyCreateRequest {
    readonly draft_id: number;
    readonly timeslot?: IV1DayTimeSlot;
    readonly warehouse_id: number;
}
export interface IV1DraftSupplyCreateResponse {
    readonly operation_id?: string;
}
export interface IV1DraftSupplyCreateStatusRequest {
    readonly operation_id: string;
}
export interface IDraftSupplyCreateStatusResponseResult {
    readonly order_ids?: string[];
}
export type IV1DraftSupplyCreateStatus = 'DraftSupplyCreateStatusUnknown' | 'DraftSupplyCreateStatusSuccess' | 'DraftSupplyCreateStatusFailed' | 'DraftSupplyCreateStatusInProgress';
export interface IV1DraftSupplyCreateStatusResponse {
    readonly error_messages?: string[];
    readonly result?: IDraftSupplyCreateStatusResponseResult;
    readonly status?: IV1DraftSupplyCreateStatus;
}
export interface IValueItem {
    readonly barcode?: string;
    readonly expires_at?: string;
    readonly quant?: number;
    readonly quantity?: number;
}
export type IValueCargoType = 'BOX' | 'PALLET';
export interface IV1CargoesCreateRequestCargoValue {
    readonly items?: IValueItem[];
    readonly type: IValueCargoType;
}
export interface IV1CargoesCreateRequestCargo {
    readonly key: string;
    readonly value: IV1CargoesCreateRequestCargoValue;
}
export interface IV1CargoesCreateRequest {
    readonly cargoes: IV1CargoesCreateRequestCargo[];
    readonly delete_current_version?: boolean;
    readonly supply_id: number;
}
export type ICargoesCreateErrorsErrorReason = 'INVALID_STATE' | 'VALIDATION_FAILED' | 'WAREHOUSE_LIMITS_EXCEED' | 'SUPPLY_NOT_BELONG_CONTRACTOR' | 'SUPPLY_NOT_BELONG_COMPANY' | 'IS_FINALIZED' | 'SKU_DISTRIBUTION_DISABLED' | 'SUPPLY_IS_NOT_EMPTY' | 'OPERATION_NOT_FOUND' | 'OPERATION_FAILED';
export type IItemValidationErrorType = 'SUPPLY_ITEM_NOT_FOUND' | 'DUPLICATED_SUPPLY_ITEM' | 'BEFORE_DEADLINE' | 'SAME_BARCODES' | 'SAME_ARTICLES' | 'NOT_UNIQUE_SKU_BY_PRODUCT' | 'QUANTITY_NOT_DIVISIBLE_BY_QUANT' | 'NOT_SINGLE_PALLET_SKU_IN_PALLET_CARGO' | 'NOT_ONE_QUANT_PALLET_SKU' | 'NOT_ECONOM_SKU' | 'QUANTITY_LESS_ONE' | 'SUPPLY_ITEM_WITH_QUANT_NOT_FOUND';
export interface ICargoesCreateErrorsItemValidation {
    readonly barcode?: string;
    readonly cargo_key?: string;
    readonly quant?: number;
    readonly type?: IItemValidationErrorType;
}
export interface IV1CargoesCreateErrors {
    readonly error_reasons?: ICargoesCreateErrorsErrorReason[];
    readonly items_validation?: ICargoesCreateErrorsItemValidation[];
}
export interface IV1CargoesCreateResponse {
    readonly operation_id?: string;
    readonly errors?: IV1CargoesCreateErrors;
}
export interface IGooglerpcStatus {
    readonly code?: number;
    readonly details?: IProtobufAny[];
    readonly message?: string;
}
export interface IV1CargoesCreateInfoRequest {
    readonly operation_id: string;
}
export interface ICargoesCreateInfoResponseResultCargoValue {
    readonly cargo_id?: number;
}
export interface ICargoesCreateInfoResponseResultCargo {
    readonly key?: string;
    readonly value?: ICargoesCreateInfoResponseResultCargoValue;
}
export interface ICargoesCreateInfoResponseResult {
    readonly cargoes?: ICargoesCreateInfoResponseResultCargo[];
}
export type IV1CargoesCreateInfoResponseStatus = 'SUCCESS' | 'IN_PROGRESS' | 'FAILED';
export interface IV1CargoesCreateInfoResponse {
    readonly result?: ICargoesCreateInfoResponseResult;
    readonly status?: IV1CargoesCreateInfoResponseStatus;
    readonly errors?: IV1CargoesCreateErrors;
}
export interface IV1CargoesDeleteRequest {
    readonly cargo_ids?: string[];
    readonly supply_id?: number;
}
export type IV1CargoesDeleteResponseErrorCargoErrorReasonErrorReasonEnum = 'CARGO_NOT_FOUND';
export interface IV1CargoesDeleteResponseErrorCargoErrorReason {
    readonly cargo_id?: number;
    readonly error_reasons?: IV1CargoesDeleteResponseErrorCargoErrorReasonErrorReasonEnum[];
}
export type IV1CargoesDeleteResponseErrorSupplyErrorReasonEnum = 'SUPPLY_NOT_FOUND' | 'CANT_DELETE_ALL_CARGOES' | 'SUPPLY_DOES_NOT_BELONG_TO_THE_CONTRACTOR' | 'SUPPLY_DOES_NOT_BELONG_TO_THE_COMPANY' | 'SUPPLY_CARGOES_IS_FINALIZED' | 'SUPPLY_CARGOES_LOCKED' | 'OPERATION_NOT_FOUND';
export interface IV1CargoesDeleteResponseError {
    readonly cargo_error_reasons?: IV1CargoesDeleteResponseErrorCargoErrorReason[];
    readonly supply_error_reasons?: IV1CargoesDeleteResponseErrorSupplyErrorReasonEnum[];
}
export interface IV1CargoesDeleteResponse {
    readonly errors?: IV1CargoesDeleteResponseError;
    readonly operation_id?: string;
}
export interface IV1CargoesDeleteStatusRequest {
    readonly operation_id?: string;
}
export type IV1CargoesDeleteStatusResponseErrorCargoErrorReasonErrorReasonEnum = 'CARGO_NOT_FOUND';
export interface IV1CargoesDeleteStatusResponseErrorCargoErrorReason {
    readonly cargo_id?: number;
    readonly error_reasons?: IV1CargoesDeleteStatusResponseErrorCargoErrorReasonErrorReasonEnum[];
}
export type IV1CargoesDeleteStatusResponseErrorSupplyErrorReasonEnum = 'SUPPLY_NOT_FOUND' | 'CANT_DELETE_ALL_CARGOES' | 'SUPPLY_DOES_NOT_BELONG_TO_THE_CONTRACTOR' | 'SUPPLY_DOES_NOT_BELONG_TO_THE_COMPANY' | 'SUPPLY_CARGOES_IS_FINALIZED' | 'SUPPLY_CARGOES_LOCKED' | 'OPERATION_NOT_FOUND';
export interface IV1CargoesDeleteStatusResponseError {
    readonly cargo_error_reasons?: IV1CargoesDeleteStatusResponseErrorCargoErrorReason[];
    readonly supply_error_reasons?: IV1CargoesDeleteStatusResponseErrorSupplyErrorReasonEnum[];
}
export type ICargoesDeleteStatusResponseStatusEnum = 'SUCCESS' | 'IN_PROGRESS' | 'ERROR';
export interface IV1CargoesDeleteStatusResponse {
    readonly errors?: IV1CargoesDeleteStatusResponseError;
    readonly status?: ICargoesDeleteStatusResponseStatusEnum;
}
export interface IV1CargoesRulesGetRequest {
    readonly supply_ids?: string[];
}
export type ICargoesPresentRuleCargoCountPerTypeEnum = 'BOX' | 'PALLET';
export interface ICargoesPresentRuleCargoCountPerType {
    readonly count?: number;
    readonly type?: ICargoesPresentRuleCargoCountPerTypeEnum;
}
export interface ISupplyCheckCargoesPresentRule {
    readonly cargo_count_per_type?: ICargoesPresentRuleCargoCountPerType[];
    readonly count?: number;
    readonly satisfied?: boolean;
}
export interface ISupplyCheckEditDeadlineExpireRule {
    readonly is_applicable?: boolean;
    readonly is_required?: boolean;
    readonly satisfied?: boolean;
}
export interface ISupplyCheckExpireDatePresentedRule {
    readonly count_sku_with_expiration?: number;
    readonly count_sku_with_expiration_filled?: number;
    readonly is_applicable?: boolean;
    readonly is_required?: boolean;
    readonly satisfied?: boolean;
}
export interface ISupplyCheckIsValidDistributionRule {
    readonly count_distributed_sku?: number;
    readonly count_sku_total?: number;
    readonly is_applicable?: boolean;
    readonly percents_int?: number;
    readonly satisfied?: boolean;
}
export interface ISupplyCheckPackageUnitWithDistributionRule {
    readonly count_all?: number;
    readonly count_with_distribution?: number;
    readonly is_applicable?: boolean;
    readonly is_required?: boolean;
    readonly satisfied?: boolean;
}
export interface ISupplyCheckPlacementZoneRule {
    readonly count_cargoes_all?: number;
    readonly count_cargoes_with_mono_placement_zone?: number;
    readonly is_applicable?: boolean;
    readonly satisfied?: boolean;
}
export interface ICargoesRulesGetResponseSupplyCheck {
    readonly cargoes_presents_rule?: ISupplyCheckCargoesPresentRule;
    readonly edit_deadline_expire_rule?: ISupplyCheckEditDeadlineExpireRule;
    readonly expire_dates_presented_rule?: ISupplyCheckExpireDatePresentedRule;
    readonly is_valid_distribution_rule?: ISupplyCheckIsValidDistributionRule;
    readonly package_units_with_distribution_rule?: ISupplyCheckPackageUnitWithDistributionRule;
    readonly placement_zones_rule?: ISupplyCheckPlacementZoneRule;
    readonly supply_id?: number;
}
export interface IV1CargoesRulesGetResponse {
    readonly supply_check_lists?: ICargoesRulesGetResponseSupplyCheck[];
}
export interface IV1CargoesLabelCreateRequestCargo {
    readonly cargo_id?: number;
}
export interface IV1CargoesLabelCreateRequest {
    readonly cargoes?: IV1CargoesLabelCreateRequestCargo[];
    readonly supply_id: number;
}
export type IV1CargoesLabelCreateErrorsErrorReason = 'INVALID_STATE' | 'OPERATION_NOT_FOUND' | 'OPERATION_FAILED' | 'SUPPLY_NOT_BELONG_CONTRACTOR' | 'SUPPLY_NOT_BELONG_COMPANY' | 'SUPPLY_IS_EMPTY' | 'CARGOES_NOT_FOUND';
export interface IV1CargoesLabelCreateErrors {
    readonly error_reasons?: IV1CargoesLabelCreateErrorsErrorReason[];
}
export interface IV1CargoesLabelCreateResponse {
    readonly operation_id?: string;
    readonly errors?: IV1CargoesLabelCreateErrors;
}
export interface IV1CargoesLabelGetRequest {
    readonly operation_id: string;
}
export interface IV1CargoesLabelGetResponseResult {
    readonly file_guid?: string;
}
export type IV1CargoesLabelGetResponseStatus = 'SUCCESS' | 'IN_PROGRESS' | 'FAILED';
export interface IV1CargoesLabelGetResponse {
    readonly result?: IV1CargoesLabelGetResponseResult;
    readonly status?: IV1CargoesLabelGetResponseStatus;
    readonly errors?: IV1CargoesLabelCreateErrors;
}
export interface IV1SupplyOrderCancelRequest {
    readonly order_id: number;
}
export interface IV1SupplyOrderCancelResponse {
    readonly operation_id?: string;
}
export interface IV1SupplyOrderCancelStatusRequest {
    readonly operation_id: string;
}
export type ISupplyOrderCancelStatusResponseCancelOrderError = 'INVALID_ORDER_STATE' | 'ORDER_IS_VIRTUAL' | 'ORDER_DOES_NOT_BELONG_TO_CONTRACTOR' | 'ORDER_DOES_NOT_BELONG_TO_COMPANY' | 'OTHER_ASYNCHRONOUS_OPERATION_IN_PROGRESS';
export type ICancelSupplyResultsCancelSupplyError = 'INVALID_SUPPLY_STATE' | 'SUPPLY_DOES_NOT_BELONG_TO_CONTRACTOR' | 'SUPPLY_DOES_NOT_BELONG_TO_COMPANY' | 'SUPPLY_DOES_NOT_BELONG_TO_ORDER' | 'SUPPLY_BELONGS_TO_VIRTUAL_ORDER' | 'OTHER_ASYNCHRONOUS_OPERATION_IN_PROGRESS';
export interface ISupplyOrderCancelStatusResponseCancelSupplyResults {
    readonly error_reasons?: ICancelSupplyResultsCancelSupplyError[];
    readonly is_supply_cancelled?: boolean;
    readonly supply_id?: number;
}
export interface ISupplyOrderCancelStatusResponseResult {
    readonly is_order_cancelled?: boolean;
    readonly supplies?: ISupplyOrderCancelStatusResponseCancelSupplyResults[];
}
export type IV1SupplyOrderCancelStatusResponseStatus = 'SUCCESS' | 'IN_PROGRESS' | 'ERROR';
export interface IV1SupplyOrderCancelStatusResponse {
    readonly error_reasons?: ISupplyOrderCancelStatusResponseCancelOrderError[];
    readonly result?: ISupplyOrderCancelStatusResponseResult;
    readonly status?: IV1SupplyOrderCancelStatusResponseStatus;
}
export interface IV1SupplyOrderContentUpdateRequestItem {
    readonly quant?: number;
    readonly quantity?: number;
    readonly sku?: number;
}
export interface IV1SupplyOrderContentUpdateRequest {
    readonly items?: IV1SupplyOrderContentUpdateRequestItem[];
    readonly order_id?: number;
    readonly supply_id?: number;
}
export type IV1SupplyOrderContentUpdateResponseErrorEnum = 'INVALID_DRAFT_BUNDLE_ID' | 'SOME_SERVICE_ERROR' | 'HAS_UTD' | 'ORDER_SKU_LIMIT' | 'SAME_SKU' | 'SUPPLY_LOCKED' | 'INBOUND_NO_CAPACITY' | 'INBOUND_LOCK' | 'SUPPLY_CONTENT_NOT_VALID' | 'SUPPLY_BELONG_TO_ANOTHER_CONTRACTOR' | 'SUPPLY_BELONG_TO_ANOTHER_COMPANY' | 'INCORRECT_SUPPLY_STATE' | 'INCORRECT_SUPPLY_SOURCE' | 'INCORRECT_STORAGE_WAREHOUSE' | 'DEADLINE' | 'INACTIVE_CONTRACT' | 'QUANTITY_OUT_OF_RANGE_BOTTOM' | 'QUANTITY_OUT_OF_RANGE_UPPER' | 'EMPTY_CONTENT' | 'NO_SUPPLY_PRODUCT_BUNDLE_ID' | 'ONLY_DOCLESS_ALLOWED' | 'INVALID_VOLUME' | 'SUPPLY_IS_VIRTUAL' | 'ORDER_LOCKED' | 'CONTRACT_IS_NOT_FOUND' | 'COMPANY_DOES_NOT_BELONGS_TO_CONTRACTOR' | 'ORDER_IS_NOT_FOUND' | 'ORDER_DOES_NOT_BELONGS_TO_COMPANY' | 'SUPPLY_IS_NOT_FOUND' | 'SUPPLY_DOES_NOT_BELONGS_TO_ORDER' | 'UTD_IS_UPLOADED' | 'STORAGE_WAREHOUSE_IS_NOT_WMS' | 'CONTRACT_IS_NOT_VALID_FOR_HANDLING_ORDERS' | 'ORDER_DOES_NOT_BELONG_TO_CONTRACTOR';
export interface IV1SupplyOrderContentUpdateResponse {
    readonly errors?: IV1SupplyOrderContentUpdateResponseErrorEnum[];
    readonly operation_id?: string;
}
export interface IV1SupplyOrderContentUpdateStatusRequest {
    readonly operation_id?: string;
}
export type IV1SupplyOrderContentUpdateStatusResponseErrorEnum = 'INVALID_DRAFT_BUNDLE_ID' | 'SOME_SERVICE_ERROR' | 'HAS_UTD' | 'ORDER_SKU_LIMIT' | 'SAME_SKU' | 'SUPPLY_LOCKED' | 'INBOUND_NO_CAPACITY' | 'INBOUND_LOCK' | 'SUPPLY_CONTENT_NOT_VALID' | 'SUPPLY_BELONG_TO_ANOTHER_CONTRACTOR' | 'SUPPLY_BELONG_TO_ANOTHER_COMPANY' | 'INCORRECT_SUPPLY_STATE' | 'INCORRECT_SUPPLY_SOURCE' | 'INCORRECT_STORAGE_WAREHOUSE' | 'DEADLINE' | 'INACTIVE_CONTRACT' | 'QUANTITY_OUT_OF_RANGE_BOTTOM' | 'QUANTITY_OUT_OF_RANGE_UPPER' | 'EMPTY_CONTENT' | 'NO_SUPPLY_PRODUCT_BUNDLE_ID' | 'ONLY_DOCLESS_ALLOWED' | 'INVALID_VOLUME' | 'SUPPLY_IS_VIRTUAL' | 'ORDER_LOCKED';
export type ISupplyOrderContentUpdateStatusResponseStatusEnum = 'SUCCESS' | 'IN_PROGRESS' | 'ERROR';
export interface IV1SupplyOrderContentUpdateStatusResponse {
    readonly errors?: IV1SupplyOrderContentUpdateStatusResponseErrorEnum[];
    readonly status?: ISupplyOrderContentUpdateStatusResponseStatusEnum;
}
