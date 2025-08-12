import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type { QuantListRequest, QuantInfoRequest, QuantListResponse, QuantInfoResponse, QuantProduct, QuantAnalytics, QuantPriceAnalysis, ProductVisibility } from './types';
export declare class QuantsAPI {
    private readonly httpClient;
    constructor(httpClient: HttpClient);
    listProducts(params?: QuantListRequest): Promise<IHttpResponse<QuantListResponse>>;
    getQuantInfo(params: QuantInfoRequest): Promise<IHttpResponse<QuantInfoResponse>>;
    iterateProducts(params: Omit<QuantListRequest, 'cursor'>): AsyncGenerator<QuantProduct[], void, unknown>;
    getQuantAnalytics(): Promise<QuantAnalytics>;
    analyzePricing(quantCodes: string[]): Promise<QuantPriceAnalysis[]>;
    getProductsByVisibility(visibility: ProductVisibility, limit?: number): Promise<QuantProduct[]>;
    getProductsRequiringAttention(): Promise<{
        overpriced: QuantProduct[];
        empty_stock: QuantProduct[];
        validation_failed: QuantProduct[];
        quarantined: QuantProduct[];
    }>;
}
export type * from './types';
