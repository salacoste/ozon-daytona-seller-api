import type { MoneyAmount, ReturnPlace, VisualStatus, ReturnSchema, ReturnType } from './base';
export interface ReturnExemplar {
    id?: string;
}
export interface ReturnStorage {
    sum?: MoneyAmount;
    tariffication_first_date?: string;
    tariffication_start_date?: string;
    arrived_moment?: string;
    days?: string;
    utilization_sum?: MoneyAmount;
    utilization_forecast_date?: string;
}
export interface ReturnProduct {
    sku?: string;
    offer_id?: string;
    name?: string;
    price?: MoneyAmount;
    price_without_commission?: MoneyAmount;
    commission_percent?: string;
    commission?: MoneyAmount;
    quantity?: number;
}
export interface ReturnLogistic {
    technical_return_moment?: string;
    final_moment?: string;
    cancelled_with_compensation_moment?: string;
    return_date?: string;
    barcode?: string;
}
export interface ReturnVisual {
    status?: VisualStatus;
    change_moment?: string;
}
export interface ReturnAdditionalInfo {
    is_opened?: boolean;
    is_super_econom?: boolean;
}
export interface ReturnItem {
    exemplars?: ReturnExemplar[];
    id?: string;
    company_id?: string;
    return_reason_name?: string;
    type?: ReturnType;
    schema?: ReturnSchema;
    order_id?: string;
    order_number?: string;
    place?: ReturnPlace;
    target_place?: ReturnPlace;
    storage?: ReturnStorage;
    product?: ReturnProduct;
    logistic?: ReturnLogistic;
    visual?: ReturnVisual;
    additional_info?: ReturnAdditionalInfo;
    source_id?: string;
    posting_number?: string;
    clearing_id?: string;
    return_clearing_id?: string | null;
}
export interface GetReturnsListV1Response {
    returns?: ReturnItem[];
    has_next?: boolean;
}
