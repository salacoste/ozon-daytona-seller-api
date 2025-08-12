import type { ReturnRequest } from './base';
export interface ListReturnsV2Response {
    returns?: ReturnRequest[];
    has_next?: boolean;
    last_id?: number;
}
export interface GetReturnV2Response {
    return?: ReturnRequest;
}
export interface EmptyResponse {
}
export interface RejectReturnV2Response extends EmptyResponse {
}
export interface CompensateReturnV2Response extends EmptyResponse {
}
export interface VerifyReturnV2Response extends EmptyResponse {
}
export interface ReceiveReturnV2Response extends EmptyResponse {
}
export interface ReturnMoneyV2Response extends EmptyResponse {
}
export interface SetReturnActionResponse extends EmptyResponse {
}
