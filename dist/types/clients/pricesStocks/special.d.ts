import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type { IV1ProductActionTimerUpdateRequest, IV1ProductActionTimerUpdateResponse, IV1ProductActionTimerStatusRequest, IV1ProductActionTimerStatusResponse, IV1GetProductInfoDiscountedRequest, IV1GetProductInfoDiscountedResponse, IV1ProductUpdateDiscountRequest, IV1ProductUpdateDiscountResponse } from '../../types/generated/prices&stocksapi';
export declare class PricesStocksSpecialOps {
    private readonly httpClient;
    constructor(httpClient: HttpClient);
    updateActionTimer(params: IV1ProductActionTimerUpdateRequest): Promise<IHttpResponse<IV1ProductActionTimerUpdateResponse>>;
    getActionTimerStatus(params: IV1ProductActionTimerStatusRequest): Promise<IHttpResponse<IV1ProductActionTimerStatusResponse>>;
    getDiscountedInfo(params: IV1GetProductInfoDiscountedRequest): Promise<IHttpResponse<IV1GetProductInfoDiscountedResponse>>;
    updateDiscount(params: IV1ProductUpdateDiscountRequest): Promise<IHttpResponse<IV1ProductUpdateDiscountResponse>>;
}
