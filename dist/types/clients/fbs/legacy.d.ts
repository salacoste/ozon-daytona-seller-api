import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
export declare class FBSLegacy {
    private readonly httpClient;
    private core;
    private extended;
    private management;
    constructor(httpClient: HttpClient);
    list(params?: {
        readonly dir?: 'ASC' | 'DESC';
        readonly filter?: {
            readonly since?: string;
            readonly to?: string;
            readonly status?: string;
            readonly delivery_method_id?: number[];
            readonly provider_id?: number[];
            readonly warehouse_id?: number[];
        };
        readonly limit?: number;
        readonly offset?: number;
    }): Promise<IHttpResponse<any>>;
    get(postingNumber: string): Promise<IHttpResponse<any>>;
    getUnfulfilled(params?: {
        readonly cutoff_from?: string;
        readonly cutoff_to?: string;
        readonly limit?: number;
        readonly offset?: number;
    }): Promise<IHttpResponse<any>>;
    getPackageLabel(postingNumbers: string[]): Promise<IHttpResponse<{
        result: string;
    }>>;
    ship(params: {
        readonly posting_number: string[];
        readonly packages: Array<{
            readonly products: Array<{
                readonly product_id: number;
                readonly quantity: number;
            }>;
        }>;
    }): Promise<IHttpResponse<{
        result: Array<{
            posting_number: string;
            status: string;
        }>;
    }>>;
    cancel(postingNumber: string, cancelReasonId: number): Promise<IHttpResponse<any>>;
    getDeliveryMethods(): Promise<IHttpResponse<any>>;
    getCancelReasons(): Promise<IHttpResponse<any>>;
    createDigitalCodes(params: any): Promise<IHttpResponse<any>>;
    cancelPostingProducts(params: any): Promise<IHttpResponse<any>>;
    cancelPosting(params: any): Promise<IHttpResponse<any>>;
    moveToArbitration(params: any): Promise<IHttpResponse<any>>;
    moveToAwaitingDelivery(params: any): Promise<IHttpResponse<any>>;
    verifyPickupCode(params: any): Promise<IHttpResponse<any>>;
    getETGB(params: any): Promise<IHttpResponse<any>>;
}
