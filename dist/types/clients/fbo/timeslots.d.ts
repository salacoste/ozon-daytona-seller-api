import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type { IV1GetSupplyOrderTimeslotsRequest, IV1GetSupplyOrderTimeslotsResponse, IV1UpdateSupplyOrderTimeslotRequest, IV1UpdateSupplyOrderTimeslotResponse, IV1GetSupplyOrderTimeslotStatusRequest, IV1GetSupplyOrderTimeslotStatusResponse } from '../../types/generated/fbo';
export declare class FBOTimeslots {
    private readonly httpClient;
    constructor(httpClient: HttpClient);
    get(params: IV1GetSupplyOrderTimeslotsRequest): Promise<IHttpResponse<IV1GetSupplyOrderTimeslotsResponse>>;
    update(params: IV1UpdateSupplyOrderTimeslotRequest): Promise<IHttpResponse<IV1UpdateSupplyOrderTimeslotResponse>>;
    getStatus(params: IV1GetSupplyOrderTimeslotStatusRequest): Promise<IHttpResponse<IV1GetSupplyOrderTimeslotStatusResponse>>;
}
