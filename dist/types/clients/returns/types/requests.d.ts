import type { TimeRange, ReturnSchema, VisualStatusName } from './base';
export interface GetReturnsListRequestFilter {
    logistic_return_date?: TimeRange;
    storage_tariffication_start_date?: TimeRange;
    visual_status_change_moment?: TimeRange;
    order_id?: number;
    posting_numbers?: string[];
    product_name?: string;
    offer_id?: string;
    visual_status_name?: VisualStatusName;
    warehouse_id?: number;
    barcode?: string;
    return_schema?: ReturnSchema;
}
export interface GetReturnsListV1Request {
    filter?: GetReturnsListRequestFilter;
    limit: number;
    last_id?: number;
}
