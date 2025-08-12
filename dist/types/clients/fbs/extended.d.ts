import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type { IV2FbsPostingProductCountryListRequest, IV2FbsPostingProductCountryListResponse, IV2FbsPostingProductCountrySetRequest, IV2FbsPostingProductCountrySetResponse, IV1GetRestrictionsRequest, IV1GetRestrictionsResponse, IPostingFBSPackageLabelRequest, IPostingFBSPackageLabelResponse, IV1CreateLabelBatchRequest, IV1CreateLabelBatchResponse, IV2CreateLabelBatchRequest, IV2CreateLabelBatchResponse, IV1GetLabelBatchRequest, IV1GetLabelBatchResponse, IPostingCancelReasonRequest, IPostingCancelReasonResponse, IPostingCancelReasonListRequest, IPostingCancelReasonListResponse } from '../../types/generated/fbs-part2';
export declare class FBSExtended {
    private readonly httpClient;
    constructor(httpClient: HttpClient);
    listProductCountryV2(params?: IV2FbsPostingProductCountryListRequest): Promise<IHttpResponse<IV2FbsPostingProductCountryListResponse>>;
    setProductCountryV2(params: IV2FbsPostingProductCountrySetRequest): Promise<IHttpResponse<IV2FbsPostingProductCountrySetResponse>>;
    getRestrictionsV1(params: IV1GetRestrictionsRequest): Promise<IHttpResponse<IV1GetRestrictionsResponse>>;
    getPackageLabelPdfV2(params: IPostingFBSPackageLabelRequest): Promise<IHttpResponse<IPostingFBSPackageLabelResponse>>;
    createLabelBatchV1(params: IV1CreateLabelBatchRequest): Promise<IHttpResponse<IV1CreateLabelBatchResponse>>;
    createLabelBatchV2(params: IV2CreateLabelBatchRequest): Promise<IHttpResponse<IV2CreateLabelBatchResponse>>;
    getLabelBatchV1(params: IV1GetLabelBatchRequest): Promise<IHttpResponse<IV1GetLabelBatchResponse>>;
    getCancelReasonV1(params: IPostingCancelReasonRequest): Promise<IHttpResponse<IPostingCancelReasonResponse>>;
    getCancelReasonListV2(params?: IPostingCancelReasonListRequest): Promise<IHttpResponse<IPostingCancelReasonListResponse>>;
}
