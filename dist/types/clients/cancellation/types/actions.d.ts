export interface ConditionalCancellationActionV1Request {
    cancellation_id: number;
    comment?: string;
}
export interface ConditionalCancellationActionV2Request {
    cancellation_id: number;
    comment?: string;
}
export interface EmptyResponse {
}
export interface ApproveConditionalCancellationV1Response extends EmptyResponse {
}
export interface ApproveConditionalCancellationV2Response extends EmptyResponse {
}
export interface RejectConditionalCancellationV1Response extends EmptyResponse {
}
export interface RejectConditionalCancellationV2Response extends EmptyResponse {
}
