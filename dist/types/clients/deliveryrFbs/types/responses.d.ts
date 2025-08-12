import type { StatusChangeResult, DeliveryInterval } from './base';
export interface SetTrackingNumbersResponse {
    result?: StatusChangeResult[];
}
export interface SetSentBySellerResponse {
    result?: StatusChangeResult[];
}
export interface SetDeliveringResponse {
    result?: StatusChangeResult[];
}
export interface SetLastMileResponse {
    result?: StatusChangeResult[];
}
export interface SetDeliveredResponse {
    result?: StatusChangeResult[];
}
export interface GetTimeslotChangeRestrictionsResponse {
    delivery_interval?: DeliveryInterval;
    remaining_changes_count?: number;
}
export interface SetTimeslotResponse {
    result?: boolean;
}
export interface SetCutoffResponse {
    result?: boolean;
}
