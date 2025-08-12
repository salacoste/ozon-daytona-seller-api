import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type { IV1SupplyOrderCancelRequest, IV1SupplyOrderCancelResponse, IV1SupplyOrderCancelStatusRequest, IV1SupplyOrderCancelStatusResponse, IV1SupplyOrderContentUpdateRequest, IV1SupplyOrderContentUpdateResponse, IV1SupplyOrderContentUpdateStatusRequest, IV1SupplyOrderContentUpdateStatusResponse } from '../../types/generated/fbosupplyrequest';
export declare class FboSupplyRequestOrders {
    private readonly httpClient;
    constructor(httpClient: HttpClient);
    cancelSupplyOrder(params: IV1SupplyOrderCancelRequest): Promise<IHttpResponse<IV1SupplyOrderCancelResponse>>;
    getSupplyOrderCancelStatus(params: IV1SupplyOrderCancelStatusRequest): Promise<IHttpResponse<IV1SupplyOrderCancelStatusResponse>>;
    updateSupplyOrderContent(params: IV1SupplyOrderContentUpdateRequest): Promise<IHttpResponse<IV1SupplyOrderContentUpdateResponse>>;
    getSupplyOrderContentUpdateStatus(params: IV1SupplyOrderContentUpdateStatusRequest): Promise<IHttpResponse<IV1SupplyOrderContentUpdateStatusResponse>>;
}
