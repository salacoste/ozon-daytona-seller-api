import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type { IPostingGetFboPostingListRequest, IV2FboPostingListResponse, IPostingGetFboPostingRequest, IV2FboPostingResponse, IV1CancelReasonListResponse } from '../../types/generated/fbo';
export declare class FBOCore {
    private readonly httpClient;
    constructor(httpClient: HttpClient);
    list(params: IPostingGetFboPostingListRequest): Promise<IHttpResponse<IV2FboPostingListResponse>>;
    get(params: IPostingGetFboPostingRequest): Promise<IHttpResponse<IV2FboPostingResponse>>;
    getCancelReasons(): Promise<IHttpResponse<IV1CancelReasonListResponse>>;
    iterateOrders(params?: Partial<IPostingGetFboPostingListRequest>, config?: {
        maxPages?: number;
        delayBetweenPages?: number;
    }): AsyncGenerator<{
        value: IHttpResponse<IV2FboPostingListResponse>;
        pageNumber: number;
        totalFetched: number;
        done: boolean;
    }, void, unknown>;
}
