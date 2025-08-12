import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
export interface AnalyticsGetDataRequest {
    readonly date_from: string;
    readonly date_to: string;
    readonly dimension: string[];
    readonly filters?: Array<{
        readonly key: string;
        readonly op: string;
        readonly value: string;
    }>;
    readonly limit?: number;
    readonly metrics: string[];
    readonly offset?: number;
    readonly sort?: Array<{
        readonly key: string;
        readonly order: 'ASC' | 'DESC';
    }>;
}
export interface AnalyticsGetDataResponse {
    result: {
        data: Array<{
            dimensions: Array<{
                id: string;
                value: string;
            }>;
            metrics: Array<{
                id: string;
                value: number;
            }>;
        }>;
        totals: Array<{
            id: string;
            value: number;
        }>;
    };
    timestamp: string;
}
export interface AnalyticsGetStockOnWarehousesRequest {
    readonly skus: number[];
    readonly warehouse_type?: string;
}
export interface AnalyticsGetStockOnWarehousesResponse {
    result: {
        rows: Array<{
            sku: number;
            warehouse_type: string;
            item_code: string;
            item_name: string;
            promised_amount: number;
            present_amount: number;
            reserved_amount: number;
        }>;
    };
}
export interface StocksTurnoverRequest {
    readonly date_from: string;
    readonly date_to: string;
    readonly skus?: number[];
    readonly limit?: number;
    readonly offset?: number;
}
export interface AnalyticsProductQueriesRequest {
    readonly date_from: string;
    readonly date_to: string;
    readonly skus?: number[];
    readonly limit?: number;
    readonly offset?: number;
    readonly sort?: Array<{
        readonly key: string;
        readonly order: 'ASC' | 'DESC';
    }>;
}
export interface AnalyticsProductQueriesDetailsRequest {
    readonly date_from: string;
    readonly date_to: string;
    readonly skus?: number[];
    readonly limit?: number;
    readonly offset?: number;
    readonly sort?: Array<{
        readonly key: string;
        readonly order: 'ASC' | 'DESC';
    }>;
    readonly limit_by_sku?: number;
}
export declare class AnalyticsAPI {
    private readonly httpClient;
    constructor(httpClient: HttpClient);
    getDataV1(params: AnalyticsGetDataRequest): Promise<IHttpResponse<AnalyticsGetDataResponse>>;
    getStockOnWarehousesV2(params: AnalyticsGetStockOnWarehousesRequest): Promise<IHttpResponse<AnalyticsGetStockOnWarehousesResponse>>;
    getStocksTurnoverV1(params: StocksTurnoverRequest): Promise<IHttpResponse<any>>;
    getProductQueriesV1(params: AnalyticsProductQueriesRequest): Promise<IHttpResponse<any>>;
    getProductQueriesDetailsV1(params: AnalyticsProductQueriesDetailsRequest): Promise<IHttpResponse<any>>;
}
