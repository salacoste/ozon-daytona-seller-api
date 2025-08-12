import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type { IV1DraftClusterListRequest, IV1DraftClusterListResponse, IV1DraftGetWarehouseFboListRequest, IV1DraftGetWarehouseFboListResponse, IV1DraftCreateRequest, IV1DraftCreateResponse, IV1DraftCreateInfoRequest, IV1DraftCreateInfoResponse, IV1DraftTimeslotInfoRequest, IV1DraftTimeslotInfoResponse } from '../../types/generated/fbosupplyrequest';
export declare class FboSupplyRequestDrafts {
    private readonly httpClient;
    constructor(httpClient: HttpClient);
    getClusterList(params: IV1DraftClusterListRequest): Promise<IHttpResponse<IV1DraftClusterListResponse>>;
    getWarehouseFboList(params: IV1DraftGetWarehouseFboListRequest): Promise<IHttpResponse<IV1DraftGetWarehouseFboListResponse>>;
    createDraft(params: IV1DraftCreateRequest): Promise<IHttpResponse<IV1DraftCreateResponse>>;
    getDraftCreateInfo(params: IV1DraftCreateInfoRequest): Promise<IHttpResponse<IV1DraftCreateInfoResponse>>;
    getDraftTimeslotInfo(params: IV1DraftTimeslotInfoRequest): Promise<IHttpResponse<IV1DraftTimeslotInfoResponse>>;
}
