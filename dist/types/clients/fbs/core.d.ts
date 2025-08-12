import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type { IPostingv3GetFbsPostingUnfulfilledListRequest, IPostingv3GetFbsPostingUnfulfilledListResponse, IPostingv3GetFbsPostingListRequest, IV3GetFbsPostingListResponseV3, IPostingv3GetFbsPostingRequest, IV3GetFbsPostingResponseV3, IPostingGetFbsPostingByBarcodeRequest, IV2FbsPostingResponse, IPostingv3PostingMultiBoxQtySetV3Request, IPostingv3PostingMultiBoxQtySetV3Response, IPostingPostingProductChangeRequest, IPostingPostingProductChangeResponse } from '../../types/generated/fbs';
export declare class FBSCore {
    private readonly httpClient;
    constructor(httpClient: HttpClient);
    getUnfulfilledV3(params: IPostingv3GetFbsPostingUnfulfilledListRequest): Promise<IHttpResponse<IPostingv3GetFbsPostingUnfulfilledListResponse>>;
    listV3(params: IPostingv3GetFbsPostingListRequest): Promise<IHttpResponse<IV3GetFbsPostingListResponseV3>>;
    getV3(params: IPostingv3GetFbsPostingRequest): Promise<IHttpResponse<IV3GetFbsPostingResponseV3>>;
    getByBarcode(params: IPostingGetFbsPostingByBarcodeRequest): Promise<IHttpResponse<IV2FbsPostingResponse>>;
    setMultiBoxQuantity(params: IPostingv3PostingMultiBoxQtySetV3Request): Promise<IHttpResponse<IPostingv3PostingMultiBoxQtySetV3Response>>;
    changeProduct(params: IPostingPostingProductChangeRequest): Promise<IHttpResponse<IPostingPostingProductChangeResponse>>;
}
