import type { CancellationInitiator, CancellationStateFilter, CancellationReason, CancellationStateDetails } from './base';
import type { ConditionalCancellation } from './get';
export interface ConditionalCancellationFiltersV1 {
    cancellation_initiator?: CancellationInitiator[];
    posting_number?: string[];
    state?: CancellationStateFilter;
}
export interface ConditionalCancellationFiltersV2 {
    cancellation_initiator?: CancellationInitiator[];
    posting_number?: string[];
    state?: CancellationStateFilter;
}
export interface ConditionalCancellationWithV1 {
    counters?: boolean;
}
export interface ConditionalCancellationWithV2 {
    counter?: boolean;
}
export interface ListConditionalCancellationsV1Request {
    filters?: ConditionalCancellationFiltersV1;
    limit: number;
    offset?: number;
    with?: ConditionalCancellationWithV1;
}
export interface ListConditionalCancellationsV2Request {
    filters?: ConditionalCancellationFiltersV2;
    limit: number;
    last_id?: number;
    with?: ConditionalCancellationWithV2;
}
export interface ConditionalCancellationCounters {
    on_approval?: number;
    approved?: number;
    rejected?: number;
}
export interface ListConditionalCancellationsV1Response {
    result?: ConditionalCancellation[];
    total?: number;
    counters?: ConditionalCancellationCounters;
}
export interface ConditionalCancellationV2 {
    approve_comment?: string;
    approve_date?: string;
    auto_approve_date?: string;
    cancellation_id?: number;
    cancellation_initiator?: CancellationInitiator;
    cancellation_reason?: CancellationReason;
    cancellation_reason_message?: string;
    cancelled_at?: string;
    order_date?: string;
    posting_number?: string;
    source_id?: number;
    state?: CancellationStateDetails;
    tpl_integration_type?: string;
}
export interface ListConditionalCancellationsV2Response {
    counter?: number;
    last_id?: number;
    result?: ConditionalCancellationV2[];
}
