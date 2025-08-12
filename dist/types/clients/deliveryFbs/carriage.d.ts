import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type { CreateCarriageRequest, ApproveCarriageRequest, SetPostingsRequest, CancelCarriageRequest, GetCarriageDeliveryListRequest, GetCarriageRequest, CreateCarriageResponse, ApproveCarriageResponse, SetPostingsResponse, CancelCarriageResponse, GetCarriageDeliveryListResponse, GetCarriageResponse } from './types';
export declare class DeliveryFbsCarriageManager {
    private readonly httpClient;
    constructor(httpClient: HttpClient);
    createCarriage(params: CreateCarriageRequest): Promise<IHttpResponse<CreateCarriageResponse>>;
    approveCarriage(params: ApproveCarriageRequest): Promise<IHttpResponse<ApproveCarriageResponse>>;
    setPostings(params: SetPostingsRequest): Promise<IHttpResponse<SetPostingsResponse>>;
    cancelCarriage(params: CancelCarriageRequest): Promise<IHttpResponse<CancelCarriageResponse>>;
    getCarriageDeliveryList(params: GetCarriageDeliveryListRequest): Promise<IHttpResponse<GetCarriageDeliveryListResponse>>;
    getCarriage(params: GetCarriageRequest): Promise<IHttpResponse<GetCarriageResponse>>;
}
