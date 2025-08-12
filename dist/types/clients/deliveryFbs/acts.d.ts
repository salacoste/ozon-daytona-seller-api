import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type { CreateFBSActRequest, GetAvailableCarriageListRequest, SplitFBSPostingRequest, GetActPostingsListRequest, CreateFBSActResponse, GetAvailableCarriageListResponse, SplitFBSPostingResponse, GetActPostingsListResponse, AvailableCarriage } from './types';
export declare class DeliveryFbsActsManager {
    private readonly httpClient;
    constructor(httpClient: HttpClient);
    createFBSAct(params: CreateFBSActRequest): Promise<IHttpResponse<CreateFBSActResponse>>;
    getAvailableCarriageList(params: GetAvailableCarriageListRequest): Promise<IHttpResponse<GetAvailableCarriageListResponse>>;
    iterateAvailableCarriageList(params: GetAvailableCarriageListRequest): AsyncGenerator<AvailableCarriage[], void, unknown>;
    splitFBSPosting(params: SplitFBSPostingRequest): Promise<IHttpResponse<SplitFBSPostingResponse>>;
    getActPostingsList(params: GetActPostingsListRequest): Promise<IHttpResponse<GetActPostingsListResponse>>;
}
