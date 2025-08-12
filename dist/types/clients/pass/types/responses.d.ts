import type { ArrivalPass } from './base';
export interface ListPassesResponse {
    arrival_passes?: ArrivalPass[];
    cursor?: string;
}
export interface CreateCarriagePassResponse {
    arrival_pass_ids?: string[];
}
export interface UpdateCarriagePassResponse {
}
export interface DeleteCarriagePassResponse {
}
export interface CreateReturnPassResponse {
    arrival_pass_ids?: string[];
}
export interface UpdateReturnPassResponse {
}
export interface DeleteReturnPassResponse {
}
