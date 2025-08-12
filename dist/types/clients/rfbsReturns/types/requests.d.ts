import type { TimeRange, ReturnGroupState, ReturnAction, MoneyAmount } from './base';
export interface ReturnsListFilter {
    offer_id?: string;
    posting_number?: string;
    group_state?: ReturnGroupState[];
    created_at?: TimeRange;
}
export interface ListReturnsV2Request {
    filter?: ReturnsListFilter;
    last_id?: number;
    limit?: number;
}
export interface GetReturnV2Request {
    return_id: string;
}
export interface RejectReturnV2Request {
    return_id: string;
    comment?: string;
}
export interface CompensateReturnV2Request {
    return_id: string;
    compensation_amount: MoneyAmount;
    comment?: string;
}
export interface VerifyReturnV2Request {
    return_id: string;
    comment?: string;
}
export interface ReceiveReturnV2Request {
    return_id: string;
    items?: ReceivedItem[];
    comment?: string;
}
export interface ReceivedItem {
    offer_id: string;
    quantity: number;
    condition?: ItemCondition;
    condition_comment?: string;
}
export type ItemCondition = 'PERFECT' | 'GOOD' | 'DAMAGED' | 'UNUSABLE';
export interface ReturnMoneyV2Request {
    return_id: string;
    refund_amount: MoneyAmount;
    comment?: string;
}
export interface SetReturnActionRequest {
    return_id: string;
    action: ReturnAction;
    parameters?: ActionParameters;
}
export interface ActionParameters {
    compensation_amount?: MoneyAmount;
    refund_amount?: MoneyAmount;
    received_items?: ReceivedItem[];
    comment?: string;
}
