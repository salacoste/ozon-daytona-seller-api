import type { PromoAction, PromoProduct, RejectedProduct, DiscountTask, FailedTaskDetail } from './base';
export interface GetPromoActionsResponse {
    result?: PromoAction[];
}
export interface PromoProductsResult {
    products?: PromoProduct[];
    total?: number;
    last_id?: number;
}
export interface GetPromoProductsResponse {
    result?: PromoProductsResult;
}
export interface PromoProductOperationResult {
    product_ids?: number[];
    rejected?: RejectedProduct[];
}
export interface ActivatePromoProductsResponse {
    result?: PromoProductOperationResult;
}
export interface DeactivatePromoProductsResponse {
    result?: PromoProductOperationResult;
}
export interface GetDiscountTasksResponse {
    result?: DiscountTask[];
}
export interface TaskOperationResult {
    success_count?: number;
    fail_count?: number;
    fail_details?: FailedTaskDetail[];
}
export interface ApproveDiscountTasksResponse {
    result?: TaskOperationResult;
}
export interface DeclineDiscountTasksResponse {
    result?: TaskOperationResult;
}
