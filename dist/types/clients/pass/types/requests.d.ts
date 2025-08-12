import type { ArrivalReason, PassCreateData, PassUpdateData } from './base';
export interface ListPassesRequest {
    cursor?: string;
    filter?: ListPassesFilter;
    limit: number;
}
export interface ListPassesFilter {
    arrival_pass_ids?: string[];
    arrival_reason?: ArrivalReason | string;
    dropoff_point_ids?: string[];
    only_active_passes?: boolean;
    warehouse_ids?: string[];
}
export interface CreateCarriagePassRequest {
    arrival_passes: PassCreateData[];
    carriage_id: number;
}
export interface UpdateCarriagePassRequest {
    arrival_passes: PassUpdateData[];
    carriage_id: number;
}
export interface DeleteCarriagePassRequest {
    arrival_pass_ids: string[];
    carriage_id: number;
}
export interface CreateReturnPassRequest {
    arrival_passes: PassCreateData[];
}
export interface UpdateReturnPassRequest {
    arrival_passes: PassUpdateData[];
}
export interface DeleteReturnPassRequest {
    arrival_pass_ids: string[];
}
