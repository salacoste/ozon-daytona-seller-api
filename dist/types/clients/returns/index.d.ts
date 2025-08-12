import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type { GetReturnsListV1Request, GetReturnsListV1Response, ReturnItem } from './types';
export declare class ReturnsAPI {
    private readonly httpClient;
    constructor(httpClient: HttpClient);
    getReturnsListV1(params: GetReturnsListV1Request): Promise<IHttpResponse<GetReturnsListV1Response>>;
    iterateReturnsListV1(params: Omit<GetReturnsListV1Request, 'last_id'>): AsyncGenerator<ReturnItem[], void, unknown>;
}
export type * from './types';
