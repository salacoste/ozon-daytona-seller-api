import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type { IV1DraftSupplyCreateRequest, IV1DraftSupplyCreateResponse, IV1DraftSupplyCreateStatusRequest, IV1DraftSupplyCreateStatusResponse } from '../../types/generated/fbosupplyrequest';
export declare class FboSupplyRequestSupply {
    private readonly httpClient;
    constructor(httpClient: HttpClient);
    createSupply(params: IV1DraftSupplyCreateRequest): Promise<IHttpResponse<IV1DraftSupplyCreateResponse>>;
    getSupplyCreateStatus(params: IV1DraftSupplyCreateStatusRequest): Promise<IHttpResponse<IV1DraftSupplyCreateStatusResponse>>;
}
