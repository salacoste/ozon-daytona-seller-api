import type { HttpClient } from '../../http/HttpClient';
import { FBOCore } from './core';
import { FBOSupplyOrders } from './supplyOrders';
import { FBOTimeslots } from './timeslots';
import { FBOPasses } from './passes';
export type { IPostingGetFboPostingListRequest, IV2FboPostingListResponse, IPostingGetFboPostingRequest, IV2FboPostingResponse, IV1CancelReasonListResponse, IV1SupplyOrderStatusCounterResponse, IV1GetSupplyOrderBundleRequest, IV1GetSupplyOrderBundleResponse, IV2GetSupplyOrdersListRequest, IV2GetSupplyOrdersListResponse, IV2GetSupplyOrdersRequest, IV2GetSupplyOrdersResponse, IV1GetSupplyOrderTimeslotsRequest, IV1GetSupplyOrderTimeslotsResponse, IV1UpdateSupplyOrderTimeslotRequest, IV1UpdateSupplyOrderTimeslotResponse, IV1GetSupplyOrderTimeslotStatusRequest, IV1GetSupplyOrderTimeslotStatusResponse, IV1SupplyOrderPassCreateRequest, IV1SupplyOrderPassCreateResponse, IV1SupplyOrderPassStatusRequest, IV1SupplyOrderPassStatusResponse, IV1SupplierAvailableWarehousesResponse, } from '../../types/generated/fbo';
export declare class FBOAPI {
    private readonly httpClient;
    private core;
    private supplyOrders;
    private timeslots;
    private passes;
    constructor(httpClient: HttpClient);
    getPostingListV2(params: Parameters<FBOCore['list']>[0]): Promise<import("../..").IHttpResponse<import("../../types/generated/fbo").IV2FboPostingListResponse>>;
    getPostingV2(params: Parameters<FBOCore['get']>[0]): Promise<import("../..").IHttpResponse<import("../../types/generated/fbo").IV2FboPostingResponse>>;
    getPostingCancelReasonListV1(): Promise<import("../..").IHttpResponse<import("../../types/generated/fbo").IV1CancelReasonListResponse>>;
    getSupplyOrderStatusCounterV1(): Promise<import("../..").IHttpResponse<import("../../types/generated/fbo").IV1SupplyOrderStatusCounterResponse>>;
    getSupplyOrderBundleV1(params: Parameters<FBOSupplyOrders['getBundle']>[0]): Promise<import("../..").IHttpResponse<import("../../types/generated/fbo").IV1GetSupplyOrderBundleResponse>>;
    list(params: Parameters<FBOCore['list']>[0]): Promise<import("../..").IHttpResponse<import("../../types/generated/fbo").IV2FboPostingListResponse>>;
    get(params: Parameters<FBOCore['get']>[0]): Promise<import("../..").IHttpResponse<import("../../types/generated/fbo").IV2FboPostingResponse>>;
    getCancelReasons(): Promise<import("../..").IHttpResponse<import("../../types/generated/fbo").IV1CancelReasonListResponse>>;
    getSupplyOrderStatusCounters(): Promise<import("../..").IHttpResponse<import("../../types/generated/fbo").IV1SupplyOrderStatusCounterResponse>>;
    getSupplyOrderBundle(params: Parameters<FBOSupplyOrders['getBundle']>[0]): Promise<import("../..").IHttpResponse<import("../../types/generated/fbo").IV1GetSupplyOrderBundleResponse>>;
    getSupplyOrdersListV2(params: Parameters<FBOSupplyOrders['getList']>[0]): Promise<import("../..").IHttpResponse<import("../../types/generated/fbo").IV2GetSupplyOrdersListResponse>>;
    getSupplyOrdersV2(params: Parameters<FBOSupplyOrders['get']>[0]): Promise<import("../..").IHttpResponse<import("../../types/generated/fbo").IV2GetSupplyOrdersResponse>>;
    getSupplierAvailableWarehousesV1(): Promise<import("../..").IHttpResponse<import("../../types/generated/fbo").IV1SupplierAvailableWarehousesResponse>>;
    getSupplyOrdersList(params: Parameters<FBOSupplyOrders['getList']>[0]): Promise<import("../..").IHttpResponse<import("../../types/generated/fbo").IV2GetSupplyOrdersListResponse>>;
    getSupplyOrder(params: Parameters<FBOSupplyOrders['get']>[0]): Promise<import("../..").IHttpResponse<import("../../types/generated/fbo").IV2GetSupplyOrdersResponse>>;
    getAvailableWarehouses(): Promise<import("../..").IHttpResponse<import("../../types/generated/fbo").IV1SupplierAvailableWarehousesResponse>>;
    getSupplyOrderTimeslotsV1(params: Parameters<FBOTimeslots['get']>[0]): Promise<import("../..").IHttpResponse<import("../../types/generated/fbo").IV1GetSupplyOrderTimeslotsResponse>>;
    updateSupplyOrderTimeslotV1(params: Parameters<FBOTimeslots['update']>[0]): Promise<import("../..").IHttpResponse<import("../../types/generated/fbo").IV1UpdateSupplyOrderTimeslotResponse>>;
    getSupplyOrderTimeslotStatusV1(params: Parameters<FBOTimeslots['getStatus']>[0]): Promise<import("../..").IHttpResponse<import("../../types/generated/fbo").IV1GetSupplyOrderTimeslotStatusResponse>>;
    supplyOrderPassCreateV1(params: Parameters<FBOPasses['create']>[0]): Promise<import("../..").IHttpResponse<import("../../types/generated/fbo").IV1SupplyOrderPassCreateResponse>>;
    getSupplyOrderPassStatusV1(params: Parameters<FBOPasses['getStatus']>[0]): Promise<import("../..").IHttpResponse<import("../../types/generated/fbo").IV1SupplyOrderPassStatusResponse>>;
    getSupplyOrderTimeslots(params: Parameters<FBOTimeslots['get']>[0]): Promise<import("../..").IHttpResponse<import("../../types/generated/fbo").IV1GetSupplyOrderTimeslotsResponse>>;
    updateSupplyOrderTimeslot(params: Parameters<FBOTimeslots['update']>[0]): Promise<import("../..").IHttpResponse<import("../../types/generated/fbo").IV1UpdateSupplyOrderTimeslotResponse>>;
    getSupplyOrderTimeslotStatus(params: Parameters<FBOTimeslots['getStatus']>[0]): Promise<import("../..").IHttpResponse<import("../../types/generated/fbo").IV1GetSupplyOrderTimeslotStatusResponse>>;
    createSupplyOrderPass(params: Parameters<FBOPasses['create']>[0]): Promise<import("../..").IHttpResponse<import("../../types/generated/fbo").IV1SupplyOrderPassCreateResponse>>;
    getSupplyOrderPassStatus(params: Parameters<FBOPasses['getStatus']>[0]): Promise<import("../..").IHttpResponse<import("../../types/generated/fbo").IV1SupplyOrderPassStatusResponse>>;
    iteratePostingListV2(params?: Parameters<FBOCore['iterateOrders']>[0], config?: Parameters<FBOCore['iterateOrders']>[1]): AsyncGenerator<{
        value: import("../..").IHttpResponse<import("../../types/generated/fbo").IV2FboPostingListResponse>;
        pageNumber: number;
        totalFetched: number;
        done: boolean;
    }, void, unknown>;
    iterateSupplyOrderBundleV1(params: Parameters<FBOSupplyOrders['getBundle']>[0], config?: {
        maxPages?: number;
        delayBetweenPages?: number;
    }): AsyncGenerator<{
        value: import("../..").IHttpResponse<import("../../types/generated/fbo").IV1GetSupplyOrderBundleResponse>;
        pageNumber: number;
        totalFetched: number;
        done: boolean;
    }, void, unknown>;
    iterateSupplyOrdersListV2(params?: Parameters<FBOSupplyOrders['iterateSupplyOrders']>[0], config?: Parameters<FBOSupplyOrders['iterateSupplyOrders']>[1]): AsyncGenerator<{
        value: import("../..").IHttpResponse<import("../../types/generated/fbo").IV2GetSupplyOrdersListResponse>;
        pageNumber: number;
        totalFetched: number;
        done: boolean;
    }, void, unknown>;
    iterateSupplyOrders(params?: Parameters<FBOSupplyOrders['iterateSupplyOrders']>[0], config?: Parameters<FBOSupplyOrders['iterateSupplyOrders']>[1]): AsyncGenerator<{
        value: import("../..").IHttpResponse<import("../../types/generated/fbo").IV2GetSupplyOrdersListResponse>;
        pageNumber: number;
        totalFetched: number;
        done: boolean;
    }, void, unknown>;
    iterateOrders(params?: Parameters<FBOCore['iterateOrders']>[0], config?: Parameters<FBOCore['iterateOrders']>[1]): AsyncGenerator<{
        value: import("../..").IHttpResponse<import("../../types/generated/fbo").IV2FboPostingListResponse>;
        pageNumber: number;
        totalFetched: number;
        done: boolean;
    }, void, unknown>;
}
