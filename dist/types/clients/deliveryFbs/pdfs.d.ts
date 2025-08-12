import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type { GetActPDFRequest, GetFBSActsListRequest, GetDigitalActPDFRequest, GetActPDFResponse, GetFBSActsListResponse, GetDigitalActPDFResponse, ActInfo } from './types';
export declare class DeliveryFbsPdfsManager {
    private readonly httpClient;
    constructor(httpClient: HttpClient);
    getActPDF(params: GetActPDFRequest): Promise<IHttpResponse<GetActPDFResponse>>;
    getFBSActsList(params: GetFBSActsListRequest): Promise<IHttpResponse<GetFBSActsListResponse>>;
    iterateFBSActsList(params: Omit<GetFBSActsListRequest, 'offset'>): AsyncGenerator<ActInfo[], void, unknown>;
    getDigitalActPDF(params: GetDigitalActPDFRequest): Promise<IHttpResponse<GetDigitalActPDFResponse>>;
}
