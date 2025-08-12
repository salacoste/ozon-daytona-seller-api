import type { TrackingNumberAssignment, NewTimeslot } from './base';
export interface SetTrackingNumbersRequest {
    tracking_numbers: TrackingNumberAssignment[];
}
export interface SetSentBySellerRequest {
    posting_number: string[];
}
export interface SetDeliveringRequest {
    posting_number: string[];
}
export interface SetLastMileRequest {
    posting_number: string[];
}
export interface SetDeliveredRequest {
    posting_number: string[];
}
export interface GetTimeslotChangeRestrictionsRequest {
    posting_number: string;
}
export interface SetTimeslotRequest {
    new_timeslot: NewTimeslot;
    posting_number: string;
}
export interface SetCutoffRequest {
    new_cutoff_date: string;
    posting_number: string;
}
