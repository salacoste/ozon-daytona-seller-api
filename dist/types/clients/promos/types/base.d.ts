export interface PromoAction {
    id?: number;
    title?: string;
    action_type?: string;
    description?: string;
    date_start?: string;
    date_end?: string;
    freeze_date?: string;
    potential_products_count?: number;
    participating_products_count?: number;
    is_participating?: boolean;
    is_voucher_action?: boolean;
    banned_products_count?: number;
    with_targeting?: boolean;
    order_amount?: number;
    discount_type?: string;
    discount_value?: number;
}
export interface PromoProduct {
    id?: number;
    price?: number;
    action_price?: number;
    alert_max_action_price_failed?: boolean;
    alert_max_action_price?: number;
    max_action_price?: number;
    add_mode?: string;
    min_stock?: number;
    stock?: number;
}
export interface PromoProductPrice {
    product_id: number;
    action_price: number;
    stock?: number;
}
export interface RejectedProduct {
    product_id?: number;
    reason?: string;
}
export type DiscountTaskStatus = 'NEW' | 'SEEN' | 'APPROVED' | 'PARTLY_APPROVED' | 'DECLINED' | 'AUTO_DECLINED' | 'DECLINED_BY_USER' | 'COUPON' | 'PURCHASED';
export interface DiscountTask {
    id?: number;
    created_at?: string;
    end_at?: string;
    edited_till?: string;
    status?: string;
    customer_name?: string;
    sku?: number;
    offer_id?: string;
    user_comment?: string;
    seller_comment?: string;
    requested_price?: number;
    approved_price?: number;
    original_price?: number;
    base_price?: number;
    min_auto_price?: number;
    discount?: number;
    discount_percent?: number;
    approved_discount?: number;
    approved_discount_percent?: number;
    is_damaged?: boolean;
    is_purchased?: boolean;
    is_auto_moderated?: boolean;
    moderated_at?: string;
    prev_task_id?: number;
    email?: string;
    last_name?: string;
    first_name?: string;
    patronymic?: string;
    approved_quantity_min?: number;
    approved_quantity_max?: number;
    requested_quantity_min?: number;
    requested_quantity_max?: number;
    requested_price_with_fee?: number;
    approved_price_with_fee?: number;
    approved_price_fee_percent?: number;
}
export interface DiscountTaskApproval {
    id: number;
    approved_price: number;
    seller_comment?: string;
    approved_quantity_min: number;
    approved_quantity_max: number;
}
export interface DiscountTaskDecline {
    id: number;
    seller_comment?: string;
}
export interface FailedTaskDetail {
    task_id?: number;
    error_for_user?: string;
}
