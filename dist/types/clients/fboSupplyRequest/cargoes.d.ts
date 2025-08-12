import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type { IV1CargoesCreateRequest, IV1CargoesCreateResponse, IV1CargoesCreateInfoRequest, IV1CargoesCreateInfoResponse, IV1CargoesDeleteRequest, IV1CargoesDeleteResponse, IV1CargoesDeleteStatusRequest, IV1CargoesDeleteStatusResponse, IV1CargoesRulesGetRequest, IV1CargoesRulesGetResponse, IV1CargoesLabelCreateRequest, IV1CargoesLabelCreateResponse, IV1CargoesLabelGetRequest, IV1CargoesLabelGetResponse } from '../../types/generated/fbosupplyrequest';
export declare class FboSupplyRequestCargoes {
    private readonly httpClient;
    constructor(httpClient: HttpClient);
    createCargoes(params: IV1CargoesCreateRequest): Promise<IHttpResponse<IV1CargoesCreateResponse>>;
    getCargoesCreateInfo(params: IV1CargoesCreateInfoRequest): Promise<IHttpResponse<IV1CargoesCreateInfoResponse>>;
    deleteCargoes(params: IV1CargoesDeleteRequest): Promise<IHttpResponse<IV1CargoesDeleteResponse>>;
    getCargoesDeleteStatus(params: IV1CargoesDeleteStatusRequest): Promise<IHttpResponse<IV1CargoesDeleteStatusResponse>>;
    getCargoesRules(params: IV1CargoesRulesGetRequest): Promise<IHttpResponse<IV1CargoesRulesGetResponse>>;
    createCargoesLabel(params: IV1CargoesLabelCreateRequest): Promise<IHttpResponse<IV1CargoesLabelCreateResponse>>;
    getCargoesLabel(params: IV1CargoesLabelGetRequest): Promise<IHttpResponse<IV1CargoesLabelGetResponse>>;
    getCargoesLabelFile(file_guid: string): Promise<IHttpResponse<ArrayBuffer>>;
}
