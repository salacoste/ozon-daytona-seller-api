import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type { ListReturnsV2Request, GetReturnV2Request, RejectReturnV2Request, CompensateReturnV2Request, VerifyReturnV2Request, ReceiveReturnV2Request, ReturnMoneyV2Request, SetReturnActionRequest, ListReturnsV2Response, GetReturnV2Response, RejectReturnV2Response, CompensateReturnV2Response, VerifyReturnV2Response, ReceiveReturnV2Response, ReturnMoneyV2Response, SetReturnActionResponse, ReturnRequest, ReturnAction } from './types';
export declare class RFBSReturnsAPI {
    private readonly httpClient;
    constructor(httpClient: HttpClient);
    listReturnsV2(params: ListReturnsV2Request): Promise<IHttpResponse<ListReturnsV2Response>>;
    iterateReturnsV2(params: Omit<ListReturnsV2Request, 'last_id'>): AsyncGenerator<ReturnRequest[], void, unknown>;
    getReturnV2(params: GetReturnV2Request): Promise<IHttpResponse<GetReturnV2Response>>;
    setReturnAction(params: SetReturnActionRequest): Promise<IHttpResponse<SetReturnActionResponse>>;
    rejectReturnV2(params: RejectReturnV2Request): Promise<IHttpResponse<RejectReturnV2Response>>;
    compensateReturnV2(params: CompensateReturnV2Request): Promise<IHttpResponse<CompensateReturnV2Response>>;
    verifyReturnV2(params: VerifyReturnV2Request): Promise<IHttpResponse<VerifyReturnV2Response>>;
    receiveReturnV2(params: ReceiveReturnV2Request): Promise<IHttpResponse<ReceiveReturnV2Response>>;
    returnMoneyV2(params: ReturnMoneyV2Request): Promise<IHttpResponse<ReturnMoneyV2Response>>;
    processBatch(returnIds: string[], action: ReturnAction, actionParams?: any, batchSize?: number): Promise<{
        successful: string[];
        failed: Array<{
            returnId: string;
            error: string;
        }>;
    }>;
}
export type * from './types';
