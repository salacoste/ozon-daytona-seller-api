import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type { IPostingCancelReasonRequest, IPostingCancelReasonResponse, IPostingCancelReasonListResponse, IPostingPostingProductCancelRequest, IPostingPostingProductCancelResponse, IPostingCancelFbsPostingRequest, IPostingMovePostingRequest, IV2MovePostingToAwaitingDeliveryRequest, IV1PostingFBSPickupCodeVerifyRequest, IV1PostingFBSPickupCodeVerifyResponse, IV1GetEtgbRequest, IV1GetEtgbResponse, IV1PostingUnpaidLegalProductListRequest, IV1PostingUnpaidLegalProductListResponse } from '../../types/generated/fbs';
export declare class FBSManagement {
    private readonly httpClient;
    constructor(httpClient: HttpClient);
    getCancelReasonById(params: IPostingCancelReasonRequest): Promise<IHttpResponse<IPostingCancelReasonResponse>>;
    getCancelReasonsList(): Promise<IHttpResponse<IPostingCancelReasonListResponse>>;
    cancelPostingProducts(params: IPostingPostingProductCancelRequest): Promise<IHttpResponse<IPostingPostingProductCancelResponse>>;
    cancelPosting(params: IPostingCancelFbsPostingRequest): Promise<IHttpResponse<any>>;
    moveToArbitration(params: IPostingMovePostingRequest): Promise<IHttpResponse<any>>;
    moveToAwaitingDelivery(params: IV2MovePostingToAwaitingDeliveryRequest): Promise<IHttpResponse<any>>;
    verifyPickupCode(params: IV1PostingFBSPickupCodeVerifyRequest): Promise<IHttpResponse<IV1PostingFBSPickupCodeVerifyResponse>>;
    getETGB(params: IV1GetEtgbRequest): Promise<IHttpResponse<IV1GetEtgbResponse>>;
    getUnpaidLegalProductListV1(params?: IV1PostingUnpaidLegalProductListRequest): Promise<IHttpResponse<IV1PostingUnpaidLegalProductListResponse>>;
    getUnpaidLegalProducts(params: IV1PostingUnpaidLegalProductListRequest): Promise<IHttpResponse<IV1PostingUnpaidLegalProductListResponse>>;
}
