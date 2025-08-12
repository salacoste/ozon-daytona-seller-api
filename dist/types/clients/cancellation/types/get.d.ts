import type { CancellationInitiator, CancellationReason, CancellationStateDetails } from './base';
export interface GetConditionalCancellationV1Request {
    cancellation_id: number;
}
export interface ConditionalCancellation {
    cancellation_id?: number;
    posting_number?: string;
    cancellation_reason?: CancellationReason;
    cancelled_at?: string;
    cancellation_reason_message?: string;
    tpl_integration_type?: string;
    state?: CancellationStateDetails;
    cancellation_initiator?: CancellationInitiator;
    order_date?: string;
    approve_comment?: string;
    approve_date?: string;
    auto_approve_date?: string;
}
export interface GetConditionalCancellationV1Response {
    result?: ConditionalCancellation;
}
