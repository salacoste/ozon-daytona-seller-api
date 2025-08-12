import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type { IV1SupplyOrderPassCreateRequest, IV1SupplyOrderPassCreateResponse, IV1SupplyOrderPassStatusRequest, IV1SupplyOrderPassStatusResponse } from '../../types/generated/fbo';
export declare class FBOPasses {
    private readonly httpClient;
    constructor(httpClient: HttpClient);
    create(params: IV1SupplyOrderPassCreateRequest): Promise<IHttpResponse<IV1SupplyOrderPassCreateResponse>>;
    getStatus(params: IV1SupplyOrderPassStatusRequest): Promise<IHttpResponse<IV1SupplyOrderPassStatusResponse>>;
}
