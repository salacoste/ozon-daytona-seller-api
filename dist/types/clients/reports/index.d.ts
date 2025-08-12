import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
export interface ReportInfoRequest {
    readonly code: string;
}
export interface ReportInfoResponse {
    result: {
        code: string;
        status: 'success' | 'processing' | 'failed';
        file?: string;
        error?: string;
    };
}
export interface ReportListRequest {
    readonly limit?: number;
    readonly offset?: number;
    readonly report_type?: string;
}
export interface ReportListResponse {
    result: {
        reports: Array<{
            code: string;
            name: string;
            status: 'success' | 'processing' | 'failed';
            created_at: string;
        }>;
        has_next: boolean;
    };
}
export interface CreateProductsReportRequest {
    readonly filter: {
        readonly offer_id?: string[];
        readonly product_id?: number[];
        readonly sku?: number[];
    };
}
export interface CreateReturnsReportV2Request {
    readonly date_from: string;
    readonly date_to: string;
    readonly statuses?: string[];
}
export interface CreatePostingsReportRequest {
    readonly date_from: string;
    readonly date_to: string;
    readonly language?: string;
}
export interface CreateDiscountedReportRequest {
    readonly date_from: string;
    readonly date_to: string;
}
export interface CreateStockByWarehouseReportRequest {
    readonly language?: string;
}
export interface CreateReportResponse {
    result: {
        code: string;
    };
}
export declare class ReportsAPI {
    private readonly httpClient;
    constructor(httpClient: HttpClient);
    getReportInfoV1(params: ReportInfoRequest): Promise<IHttpResponse<ReportInfoResponse>>;
    getReportListV1(params?: ReportListRequest): Promise<IHttpResponse<ReportListResponse>>;
    createProductsReportV1(params: CreateProductsReportRequest): Promise<IHttpResponse<CreateReportResponse>>;
    createReturnsReportV2(params: CreateReturnsReportV2Request): Promise<IHttpResponse<CreateReportResponse>>;
    createPostingsReportV1(params: CreatePostingsReportRequest): Promise<IHttpResponse<CreateReportResponse>>;
    createDiscountedReportV1(params: CreateDiscountedReportRequest): Promise<IHttpResponse<CreateReportResponse>>;
    createStockByWarehouseReportV1(params?: CreateStockByWarehouseReportRequest): Promise<IHttpResponse<CreateReportResponse>>;
}
