export interface IWarehouseFirstMileType {
    readonly dropoff_point_id?: string;
    readonly dropoff_timeslot_id?: number;
    readonly first_mile_is_changing?: boolean;
    readonly first_mile_type?: 'DropOff' | 'Pickup';
}
export interface IWarehouseListResponseWarehouse {
    readonly has_entrusted_acceptance?: boolean;
    readonly is_rfbs?: boolean;
    readonly name?: string;
    readonly warehouse_id?: number;
    readonly can_print_act_in_advance?: boolean;
    readonly first_mile_type?: IWarehouseFirstMileType;
    readonly has_postings_limit?: boolean;
    readonly is_karantin?: boolean;
    readonly is_kgt?: boolean;
    readonly is_economy?: boolean;
    readonly is_timetable_editable?: boolean;
    readonly min_postings_limit?: number;
    readonly postings_limit?: number;
    readonly min_working_days?: number;
    readonly status?: string;
    readonly working_days?: string[];
}
export interface IWarehouseListResponse {
    readonly result?: IWarehouseListResponseWarehouse[];
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
export interface IDeliveryMethodListRequestFilter {
    readonly provider_id?: number;
    readonly status?: string;
    readonly warehouse_id?: number;
}
export interface IWarehouseDeliveryMethodListRequest {
    readonly filter?: IDeliveryMethodListRequestFilter;
    readonly limit: number;
    readonly offset?: number;
}
export interface IDeliveryMethodListResponseDeliveryMethod {
    readonly company_id?: number;
    readonly created_at?: string;
    readonly cutoff?: string;
    readonly id?: number;
    readonly name?: string;
    readonly provider_id?: number;
    readonly sla_cut_in?: number;
    readonly status?: string;
    readonly template_id?: number;
    readonly updated_at?: string;
    readonly warehouse_id?: number;
}
export interface IWarehouseDeliveryMethodListResponse {
    readonly has_next?: boolean;
    readonly result?: IDeliveryMethodListResponseDeliveryMethod[];
}
