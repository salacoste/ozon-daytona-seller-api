import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type { GetFbsReturnsInfoRequest, EmptyRequest, ListGiveoutsRequest, GetGiveoutInfoRequest, GetFbsReturnsInfoResponse, CheckGiveoutAccessResponse, ListGiveoutsResponse, GetGiveoutInfoResponse, GetBarcodeTextResponse, GetBarcodePdfResponse, GetBarcodePngResponse, ResetBarcodeResponse, DropOffPoint, ReturnGiveout, FileContent } from './types';
export declare class ReturnAPI {
    private readonly httpClient;
    constructor(httpClient: HttpClient);
    getFbsReturnsInfo(params: GetFbsReturnsInfoRequest): Promise<IHttpResponse<GetFbsReturnsInfoResponse>>;
    checkGiveoutAccess(params?: EmptyRequest): Promise<IHttpResponse<CheckGiveoutAccessResponse>>;
    listGiveouts(params: ListGiveoutsRequest): Promise<IHttpResponse<ListGiveoutsResponse>>;
    getGiveoutInfo(params: GetGiveoutInfoRequest): Promise<IHttpResponse<GetGiveoutInfoResponse>>;
    getBarcodeText(params?: EmptyRequest): Promise<IHttpResponse<GetBarcodeTextResponse>>;
    getBarcodePdf(params?: EmptyRequest): Promise<IHttpResponse<GetBarcodePdfResponse>>;
    getBarcodePng(params?: EmptyRequest): Promise<IHttpResponse<GetBarcodePngResponse>>;
    resetBarcode(params?: EmptyRequest): Promise<IHttpResponse<ResetBarcodeResponse>>;
    iterateDropOffPoints(params: Omit<GetFbsReturnsInfoRequest, 'pagination'> & {
        limit?: number;
    }): AsyncGenerator<DropOffPoint[], void, unknown>;
    iterateGiveouts(params: Omit<ListGiveoutsRequest, 'last_id'>): AsyncGenerator<ReturnGiveout[], void, unknown>;
    getReturnSummary(): Promise<{
        totalDropOffPoints: number;
        totalReturns: number;
        totalBoxes: number;
        locations: Array<{
            name: string;
            returns: number;
            boxes: number;
        }>;
    }>;
    hasReturnsAvailable(): Promise<boolean>;
    downloadBarcodes(): Promise<{
        pdf?: FileContent;
        png?: FileContent;
        text?: string;
    }>;
}
export type * from './types';
