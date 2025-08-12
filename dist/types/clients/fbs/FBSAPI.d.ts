import type { HttpClient } from '../../http/HttpClient';
import { FBSCore } from './core';
import { FBSExtended } from './extended';
import { FBSManagement } from './management';
import { FBSLegacy } from './legacy';
import { FBSIterators } from './iterators';
export type { IPostingv3GetFbsPostingUnfulfilledListRequest, IPostingv3GetFbsPostingUnfulfilledListResponse, IPostingv3GetFbsPostingListRequest, IV3GetFbsPostingListResponseV3, IPostingv3GetFbsPostingRequest, IV3GetFbsPostingResponseV3, IPostingGetFbsPostingByBarcodeRequest, IV2FbsPostingResponse, IPostingv3PostingMultiBoxQtySetV3Request, IPostingv3PostingMultiBoxQtySetV3Response, IPostingPostingProductChangeRequest, IPostingPostingProductChangeResponse, IPostingCancelReasonRequest, IPostingCancelReasonResponse, IPostingCancelReasonListResponse, IPostingPostingProductCancelRequest, IPostingPostingProductCancelResponse, IPostingCancelFbsPostingRequest, IPostingMovePostingRequest, IV2MovePostingToAwaitingDeliveryRequest, IV1PostingFBSPickupCodeVerifyRequest, IV1PostingFBSPickupCodeVerifyResponse, IV1GetEtgbRequest, IV1GetEtgbResponse, IV1PostingUnpaidLegalProductListRequest, IV1PostingUnpaidLegalProductListResponse, } from '../../types/generated/fbs';
export type { IV2FbsPostingProductCountryListRequest, IV2FbsPostingProductCountryListResponse, IV2FbsPostingProductCountrySetRequest, IV2FbsPostingProductCountrySetResponse, IV1GetRestrictionsRequest, IV1GetRestrictionsResponse, IPostingFBSPackageLabelRequest, IPostingFBSPackageLabelResponse, IV1CreateLabelBatchRequest, IV1CreateLabelBatchResponse, IV2CreateLabelBatchRequest, IV2CreateLabelBatchResponse, IV1GetLabelBatchRequest, IV1GetLabelBatchResponse, IPostingCancelReasonListRequest, } from '../../types/generated/fbs-part2';
export declare class FBSAPI {
    private readonly httpClient;
    private core;
    private extended;
    private management;
    private legacy;
    readonly iterators: FBSIterators;
    constructor(httpClient: HttpClient);
    getUnfulfilledV3(params: Parameters<FBSCore['getUnfulfilledV3']>[0]): Promise<import("../..").IHttpResponse<import("../../types/generated/fbs").IPostingv3GetFbsPostingUnfulfilledListResponse>>;
    listV3(params: Parameters<FBSCore['listV3']>[0]): Promise<import("../..").IHttpResponse<import("../../types/generated/fbs").IV3GetFbsPostingListResponseV3>>;
    getV3(params: Parameters<FBSCore['getV3']>[0]): Promise<import("../..").IHttpResponse<import("../../types/generated/fbs").IV3GetFbsPostingResponseV3>>;
    getByBarcode(params: Parameters<FBSCore['getByBarcode']>[0]): Promise<import("../..").IHttpResponse<import("../../types/generated/fbs").IV2FbsPostingResponse>>;
    setMultiBoxQuantity(params: Parameters<FBSCore['setMultiBoxQuantity']>[0]): Promise<import("../..").IHttpResponse<import("../../types/generated/fbs").IPostingv3PostingMultiBoxQtySetV3Response>>;
    changeProduct(params: Parameters<FBSCore['changeProduct']>[0]): Promise<import("../..").IHttpResponse<import("../../types/generated/fbs").IPostingPostingProductChangeResponse>>;
    listProductCountryV2(params?: Parameters<FBSExtended['listProductCountryV2']>[0]): Promise<import("../..").IHttpResponse<import("../../types/generated/fbs-part2").IV2FbsPostingProductCountryListResponse>>;
    setProductCountryV2(params: Parameters<FBSExtended['setProductCountryV2']>[0]): Promise<import("../..").IHttpResponse<import("../../types/generated/fbs-part2").IV2FbsPostingProductCountrySetResponse>>;
    getRestrictionsV1(params: Parameters<FBSExtended['getRestrictionsV1']>[0]): Promise<import("../..").IHttpResponse<import("../../types/generated/fbs-part2").IV1GetRestrictionsResponse>>;
    getPackageLabelPdfV2(params: Parameters<FBSExtended['getPackageLabelPdfV2']>[0]): Promise<import("../..").IHttpResponse<import("../../types/generated/fbs-part2").IPostingFBSPackageLabelResponse>>;
    createLabelBatchV1(params: Parameters<FBSExtended['createLabelBatchV1']>[0]): Promise<import("../..").IHttpResponse<import("../../types/generated/fbs-part2").IV1CreateLabelBatchResponse>>;
    createLabelBatchV2(params: Parameters<FBSExtended['createLabelBatchV2']>[0]): Promise<import("../..").IHttpResponse<import("../../types/generated/fbs-part2").IV2CreateLabelBatchResponse>>;
    getLabelBatchV1(params: Parameters<FBSExtended['getLabelBatchV1']>[0]): Promise<import("../..").IHttpResponse<import("../../types/generated/fbs-part2").IV1GetLabelBatchResponse>>;
    getCancelReasonV1(params: Parameters<FBSExtended['getCancelReasonV1']>[0]): Promise<import("../..").IHttpResponse<import("../../types/generated/fbs-part2").IPostingCancelReasonResponse>>;
    getCancelReasonListV2(params?: Parameters<FBSExtended['getCancelReasonListV2']>[0]): Promise<import("../..").IHttpResponse<import("../../types/generated/fbs-part2").IPostingCancelReasonListResponse>>;
    cancelPostingProductV2(params: Parameters<FBSManagement['cancelPostingProducts']>[0]): Promise<import("../..").IHttpResponse<import("../../types/generated/fbs").IPostingPostingProductCancelResponse>>;
    cancelPostingV2(params: Parameters<FBSManagement['cancelPosting']>[0]): Promise<import("../..").IHttpResponse<any>>;
    moveToArbitrationV2(params: Parameters<FBSManagement['moveToArbitration']>[0]): Promise<import("../..").IHttpResponse<any>>;
    moveToAwaitingDeliveryV2(params: Parameters<FBSManagement['moveToAwaitingDelivery']>[0]): Promise<import("../..").IHttpResponse<any>>;
    verifyPickupCodeV1(params: Parameters<FBSManagement['verifyPickupCode']>[0]): Promise<import("../..").IHttpResponse<import("../../types/generated/fbs").IV1PostingFBSPickupCodeVerifyResponse>>;
    getEtgbV1(params: Parameters<FBSManagement['getETGB']>[0]): Promise<import("../..").IHttpResponse<import("../../types/generated/fbs").IV1GetEtgbResponse>>;
    getUnpaidLegalProductListV1(params: Parameters<FBSManagement['getUnpaidLegalProducts']>[0]): Promise<import("../..").IHttpResponse<import("../../types/generated/fbs").IV1PostingUnpaidLegalProductListResponse>>;
    getCountryList(params?: Parameters<FBSExtended['listProductCountryV2']>[0]): Promise<import("../..").IHttpResponse<import("../../types/generated/fbs-part2").IV2FbsPostingProductCountryListResponse>>;
    setProductCountry(params: Parameters<FBSExtended['setProductCountryV2']>[0]): Promise<import("../..").IHttpResponse<import("../../types/generated/fbs-part2").IV2FbsPostingProductCountrySetResponse>>;
    getRestrictions(params: Parameters<FBSExtended['getRestrictionsV1']>[0]): Promise<import("../..").IHttpResponse<import("../../types/generated/fbs-part2").IV1GetRestrictionsResponse>>;
    getPackageLabelsV2(params: Parameters<FBSExtended['getPackageLabelPdfV2']>[0]): Promise<import("../..").IHttpResponse<import("../../types/generated/fbs-part2").IPostingFBSPackageLabelResponse>>;
    createLabelBatch(params: Parameters<FBSExtended['createLabelBatchV1']>[0]): Promise<import("../..").IHttpResponse<import("../../types/generated/fbs-part2").IV1CreateLabelBatchResponse>>;
    getLabelBatch(params: Parameters<FBSExtended['getLabelBatchV1']>[0]): Promise<import("../..").IHttpResponse<import("../../types/generated/fbs-part2").IV1GetLabelBatchResponse>>;
    getCancelReasonById(params: Parameters<FBSExtended['getCancelReasonV1']>[0]): Promise<import("../..").IHttpResponse<import("../../types/generated/fbs-part2").IPostingCancelReasonResponse>>;
    getCancelReasonsList(params?: Parameters<FBSExtended['getCancelReasonListV2']>[0]): Promise<import("../..").IHttpResponse<import("../../types/generated/fbs-part2").IPostingCancelReasonListResponse>>;
    cancelPostingProducts(params: Parameters<FBSManagement['cancelPostingProducts']>[0]): Promise<import("../..").IHttpResponse<import("../../types/generated/fbs").IPostingPostingProductCancelResponse>>;
    cancelPosting(params: Parameters<FBSManagement['cancelPosting']>[0]): Promise<import("../..").IHttpResponse<any>>;
    moveToArbitration(params: Parameters<FBSManagement['moveToArbitration']>[0]): Promise<import("../..").IHttpResponse<any>>;
    moveToAwaitingDelivery(params: Parameters<FBSManagement['moveToAwaitingDelivery']>[0]): Promise<import("../..").IHttpResponse<any>>;
    verifyPickupCode(params: Parameters<FBSManagement['verifyPickupCode']>[0]): Promise<import("../..").IHttpResponse<import("../../types/generated/fbs").IV1PostingFBSPickupCodeVerifyResponse>>;
    getETGB(params: Parameters<FBSManagement['getETGB']>[0]): Promise<import("../..").IHttpResponse<import("../../types/generated/fbs").IV1GetEtgbResponse>>;
    getUnpaidLegalProducts(params: Parameters<FBSManagement['getUnpaidLegalProducts']>[0]): Promise<import("../..").IHttpResponse<import("../../types/generated/fbs").IV1PostingUnpaidLegalProductListResponse>>;
    list(params: Parameters<FBSCore['listV3']>[0]): Promise<import("../..").IHttpResponse<import("../../types/generated/fbs").IV3GetFbsPostingListResponseV3>>;
    get(postingNumber: string, withOptions?: {
        analytics_data?: boolean;
        barcodes?: boolean;
        financial_data?: boolean;
    }): Promise<import("../..").IHttpResponse<import("../../types/generated/fbs").IV3GetFbsPostingResponseV3>>;
    ship(params: {
        posting_number: string[];
        packages: Array<{
            products: Array<{
                product_id: number;
                quantity: number;
            }>;
        }>;
    }): Promise<import("../..").IHttpResponse<{
        result: Array<{
            posting_number: string;
            status: string;
        }>;
    }>>;
    iterateUnfulfilled(params: Parameters<FBSCore['getUnfulfilledV3']>[0] & {
        limit: number;
    }): AsyncGenerator<import("../..").IPaginationIteratorResult<import("../..").IOffsetPageResult<import("../../types/generated/fbs").IV3FbsPosting[]>>, void, unknown>;
    iterateList(params: Parameters<FBSCore['listV3']>[0] & {
        limit: number;
    }): AsyncGenerator<import("../..").IPaginationIteratorResult<import("../..").IOffsetPageResult<import("../../types/generated/fbs").IV3FbsPosting[]>>, void, unknown>;
    get managementMethods(): FBSManagement;
    get legacyMethods(): FBSLegacy;
}
