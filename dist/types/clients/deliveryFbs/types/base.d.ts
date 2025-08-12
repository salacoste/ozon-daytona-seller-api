export interface MoneyAmount {
    currency_code?: string;
    value?: string;
}
export interface TimeRange {
    time_from?: string;
    time_to?: string;
}
export type CarriageStatus = 'new' | 'formed' | 'confirmed' | 'cancelled' | 'delivered';
export type ActStatus = 'WAIT_CREATION' | 'CREATING' | 'CREATED' | 'FAILED' | 'FORMED' | 'CONFIRMED' | 'CONFIRMED_WITH_MISMATCH';
export type IntegrationType = 'API' | 'SELLER_CABINET' | 'ALL';
export interface DeliveryMethod {
    id?: number;
    name?: string;
    warehouse_id?: number;
    warehouse_name?: string;
    company_id?: number;
    timetable?: string;
    cutoff?: string;
}
export interface CarriageInfo {
    carriage_id?: number;
    status?: CarriageStatus;
    first_mile_type?: string;
    delivery_method?: DeliveryMethod;
    delivery_method_id?: number;
    mandatory_postings_count?: number;
    optional_postings_count?: number;
    has_postings_for_carriage?: boolean;
}
export interface PostingItem {
    posting_number?: string;
    multi_box_qty?: number;
    products?: ProductInPosting[];
}
export interface ProductInPosting {
    sku?: string;
    quantity?: number;
    name?: string;
    offer_id?: string;
    price?: MoneyAmount;
}
export interface ContainerLabel {
    file?: string;
    type?: string;
}
export interface ActInfo {
    act_id?: number;
    status?: ActStatus;
    carriage_id?: number;
    integration_type?: IntegrationType;
    created_at?: string;
    updated_at?: string;
    additional_url?: string;
}
