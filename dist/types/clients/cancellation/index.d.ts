import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type { GetConditionalCancellationV1Request, GetConditionalCancellationV1Response, ListConditionalCancellationsV1Request, ListConditionalCancellationsV1Response, ListConditionalCancellationsV2Request, ListConditionalCancellationsV2Response, ConditionalCancellationActionV1Request, ConditionalCancellationActionV2Request, ApproveConditionalCancellationV1Response, ApproveConditionalCancellationV2Response, RejectConditionalCancellationV1Response, RejectConditionalCancellationV2Response } from './types';
export declare class CancellationAPI {
    private readonly httpClient;
    constructor(httpClient: HttpClient);
    getConditionalCancellationV1(params: GetConditionalCancellationV1Request): Promise<IHttpResponse<GetConditionalCancellationV1Response>>;
    listConditionalCancellationsV1(params: ListConditionalCancellationsV1Request): Promise<IHttpResponse<ListConditionalCancellationsV1Response>>;
    listConditionalCancellationsV2(params: ListConditionalCancellationsV2Request): Promise<IHttpResponse<ListConditionalCancellationsV2Response>>;
    approveConditionalCancellationV1(params: ConditionalCancellationActionV1Request): Promise<IHttpResponse<ApproveConditionalCancellationV1Response>>;
    approveConditionalCancellationV2(params: ConditionalCancellationActionV2Request): Promise<IHttpResponse<ApproveConditionalCancellationV2Response>>;
    rejectConditionalCancellationV1(params: ConditionalCancellationActionV1Request): Promise<IHttpResponse<RejectConditionalCancellationV1Response>>;
    rejectConditionalCancellationV2(params: ConditionalCancellationActionV2Request): Promise<IHttpResponse<RejectConditionalCancellationV2Response>>;
}
export type * from './types';
