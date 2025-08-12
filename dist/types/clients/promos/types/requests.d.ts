import type { PromoProductPrice, DiscountTaskStatus, DiscountTaskApproval, DiscountTaskDecline } from './base';
export interface GetPromoActionsRequest {
}
export interface GetPromoProductsRequest {
    action_id: number;
    limit?: number;
    offset?: number;
    last_id?: number;
}
export interface ActivatePromoProductsRequest {
    action_id: number;
    products: PromoProductPrice[];
}
export interface DeactivatePromoProductsRequest {
    action_id: number;
    product_ids: number[];
}
export interface GetDiscountTasksRequest {
    status: DiscountTaskStatus;
    page?: number;
    limit: number;
}
export interface ApproveDiscountTasksRequest {
    tasks: DiscountTaskApproval[];
}
export interface DeclineDiscountTasksRequest {
    tasks: DiscountTaskDecline[];
}
