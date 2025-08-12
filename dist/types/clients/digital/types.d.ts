export interface DigitalPosting {
    posting_number: string;
    order_id?: number;
    order_number?: string;
    status: PostingStatus;
    created_at: string;
    in_process_at?: string;
    digital_items: DigitalItem[];
}
export interface DigitalItem {
    sku: string;
    product_id?: number;
    product_name?: string;
    quantity: number;
    required_qty_for_digital_code: number;
    uploaded_codes_count?: number;
    codes_upload_deadline?: string;
    exemplars?: DigitalExemplar[];
}
export interface DigitalExemplar {
    exemplar_key: string;
    uploaded_at?: string;
    status: ExemplarStatus;
}
export interface DigitalStockItem {
    sku: string;
    stock_count: number;
    reserved_count?: number;
    available_count?: number;
}
export type PostingStatus = 'awaiting_deliver' | 'delivered' | 'cancelled' | 'delivering';
export type ExemplarStatus = 'uploaded' | 'delivered' | 'failed';
export type SortDirection = 'asc' | 'desc';
export interface UploadPostingCodesRequest {
    posting_number: string;
    exemplars_by_sku: ExemplarBySku[];
}
export interface ExemplarBySku {
    sku: string;
    exemplar_qty: number;
    not_available_exemplar_qty: number;
    exemplar_keys: string[];
}
export interface ListPostingCodesRequest {
    dir?: SortDirection;
    filter?: PostingFilter;
    limit?: number;
    offset?: number;
    with?: string[];
}
export interface PostingFilter {
    since?: string;
    to?: string;
    statuses?: PostingStatus[];
}
export interface DigitalStocksImportRequest {
    stocks: DigitalStockUpdate[];
}
export interface DigitalStockUpdate {
    sku: string;
    stock: number;
}
export interface UploadPostingCodesResponse {
    exemplars_by_sku: ExemplarUploadResult[];
}
export interface ExemplarUploadResult {
    sku: string;
    uploaded_count: number;
    not_uploaded_count: number;
    errors?: ExemplarError[];
}
export interface ExemplarError {
    exemplar_key: string;
    error: string;
    error_code?: string;
}
export interface ListPostingCodesResponse {
    result: DigitalPosting[];
    has_next: boolean;
    total?: number;
}
export interface DigitalStocksImportResponse {
    result: StockImportResult[];
}
export interface StockImportResult {
    sku: string;
    updated: boolean;
    errors?: string[];
    stock?: number;
}
export interface DigitalAnalytics {
    total_postings: number;
    pending_code_uploads: number;
    delivered_postings: number;
    failed_uploads: number;
    codes_uploaded_today: number;
    average_upload_time_hours: number;
    stock_levels: {
        total_skus: number;
        low_stock_count: number;
        out_of_stock_count: number;
    };
}
export interface CodeUploadStats {
    posting_number: string;
    total_codes_required: number;
    codes_uploaded: number;
    codes_remaining: number;
    deadline: string;
    hours_remaining: number;
    is_urgent: boolean;
}
