import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type { IV1SupplyOrderStatusCounterResponse, IV1GetSupplyOrderBundleRequest, IV1GetSupplyOrderBundleResponse, IV2GetSupplyOrdersListRequest, IV2GetSupplyOrdersListResponse, IV2GetSupplyOrdersRequest, IV2GetSupplyOrdersResponse, IV1SupplierAvailableWarehousesResponse } from '../../types/generated/fbo';
export declare class FBOSupplyOrders {
    private readonly httpClient;
    constructor(httpClient: HttpClient);
    getStatusCounters(): Promise<IHttpResponse<IV1SupplyOrderStatusCounterResponse>>;
    getBundle(params: IV1GetSupplyOrderBundleRequest): Promise<IHttpResponse<IV1GetSupplyOrderBundleResponse>>;
    getList(params: IV2GetSupplyOrdersListRequest): Promise<IHttpResponse<IV2GetSupplyOrdersListResponse>>;
    get(params: IV2GetSupplyOrdersRequest): Promise<IHttpResponse<IV2GetSupplyOrdersResponse>>;
    getAvailableWarehouses(): Promise<IHttpResponse<IV1SupplierAvailableWarehousesResponse>>;
    iterateBundle(params: IV1GetSupplyOrderBundleRequest, config?: {
        maxPages?: number;
        delayBetweenPages?: number;
    }): AsyncGenerator<{
        value: IHttpResponse<IV1GetSupplyOrderBundleResponse>;
        pageNumber: number;
        totalFetched: number;
        done: boolean;
    }, void, unknown>;
    iterateSupplyOrders(params?: Partial<IV2GetSupplyOrdersListRequest>, config?: {
        maxPages?: number;
        delayBetweenPages?: number;
    }): AsyncGenerator<{
        value: IHttpResponse<IV2GetSupplyOrdersListResponse>;
        pageNumber: number;
        totalFetched: number;
        done: boolean;
    }, void, unknown>;
}
