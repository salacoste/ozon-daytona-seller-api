export interface IV2FbsPostingProductCountryListRequest {
    readonly name_search?: string;
}
export interface IV2FbsPostingProductCountryListResponseResult {
    readonly name: string;
    readonly country_iso_code: string;
}
export interface IV2FbsPostingProductCountryListResponse {
    readonly result: IV2FbsPostingProductCountryListResponseResult[];
}
export interface IV2FbsPostingProductCountrySetRequest {
    readonly posting_number: string;
    readonly product_id: number;
    readonly country_iso_code: string;
}
export interface IV2FbsPostingProductCountrySetResponse {
    readonly product_id: number;
    readonly is_gtd_needed: boolean;
}
export interface IV1GetRestrictionsRequest {
    readonly posting_number: string;
}
export interface IV1GetRestrictionsResponseResult {
    readonly posting_number: string;
    readonly max_posting_weight: number;
    readonly min_posting_weight: number;
    readonly width: number;
    readonly height: number;
    readonly length: number;
    readonly max_posting_price: number;
    readonly min_posting_price: number;
}
export interface IV1GetRestrictionsResponse {
    readonly result: IV1GetRestrictionsResponseResult;
}
export interface IPostingFBSPackageLabelRequest {
    readonly posting_number: string[];
}
export interface IPostingFBSPackageLabelResponse {
    readonly content: Uint8Array;
    readonly contentType: string;
    readonly contentLength: number;
}
export interface IV1CreateLabelBatchRequest {
    readonly posting_number: string[];
}
export interface IV1CreateLabelBatchResponse {
    readonly task_id: number;
}
export interface IV2CreateLabelBatchRequest {
    readonly posting_number: string[];
}
export interface IV2CreateLabelBatchResponseTask {
    readonly task_id: number;
    readonly task_type: string;
}
export interface IV2CreateLabelBatchResponse {
    readonly tasks: IV2CreateLabelBatchResponseTask[];
}
export interface IV1GetLabelBatchRequest {
    readonly task_id: number;
}
export interface IV1GetLabelBatchResponseResult {
    readonly status: string;
    readonly file_url?: string;
    readonly error?: string;
}
export interface IV1GetLabelBatchResponse {
    readonly result: IV1GetLabelBatchResponseResult;
}
export interface IPostingCancelReasonRequest {
    readonly posting_number: string;
}
export interface IPostingCancelReasonResponseReason {
    readonly id: number;
    readonly name: string;
    readonly is_available: boolean;
}
export interface IPostingCancelReasonResponse {
    readonly reasons: IPostingCancelReasonResponseReason[];
}
export interface IPostingCancelReasonListRequest {
    readonly filter?: {
        readonly is_available?: boolean;
    };
}
export interface IPostingCancelReasonListResponseReason {
    readonly id: number;
    readonly name: string;
    readonly is_available: boolean;
    readonly type?: string;
}
export interface IPostingCancelReasonListResponse {
    readonly result: IPostingCancelReasonListResponseReason[];
}
