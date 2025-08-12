export interface TimeRange {
    from?: string;
    to?: string;
}
export interface MoneyAmount {
    currency_code?: string;
    value?: string;
}
export type ReturnGroupState = 'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED' | 'COMPENSATED' | 'RETURNED';
export type ReturnAction = 'APPROVE' | 'REJECT' | 'COMPENSATE' | 'RECEIVE' | 'REFUND';
export type ReturnStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'RECEIVED' | 'COMPENSATED' | 'REFUNDED';
export interface ReturnItem {
    id?: string;
    return_number?: string;
    posting_number?: string;
    offer_id?: string;
    sku?: string;
    product_name?: string;
    quantity?: number;
    reason?: string;
    status?: ReturnStatus;
    created_at?: string;
    updated_at?: string;
    price?: MoneyAmount;
    compensation_amount?: MoneyAmount;
    comment?: string;
    customer_comment?: string;
}
export interface ReturnRequest {
    id?: string;
    items?: ReturnItem[];
    total_compensation?: MoneyAmount;
    status?: ReturnStatus;
    created_at?: string;
    customer_info?: CustomerInfo;
}
export interface CustomerInfo {
    customer_id?: string;
    name?: string;
    contact?: string;
}
