import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type { UploadPostingCodesRequest, ListPostingCodesRequest, DigitalStocksImportRequest, UploadPostingCodesResponse, ListPostingCodesResponse, DigitalStocksImportResponse, DigitalPosting, DigitalAnalytics, CodeUploadStats } from './types';
export declare class DigitalAPI {
    private readonly httpClient;
    constructor(httpClient: HttpClient);
    uploadPostingCodes(params: UploadPostingCodesRequest): Promise<IHttpResponse<UploadPostingCodesResponse>>;
    listPostingCodes(params?: ListPostingCodesRequest): Promise<IHttpResponse<ListPostingCodesResponse>>;
    importDigitalStocks(params: DigitalStocksImportRequest): Promise<IHttpResponse<DigitalStocksImportResponse>>;
    iteratePostingCodes(params: Omit<ListPostingCodesRequest, 'offset'>): AsyncGenerator<DigitalPosting[], void, unknown>;
    getDigitalAnalytics(): Promise<DigitalAnalytics>;
    getUrgentCodeUploads(hoursThreshold?: number): Promise<CodeUploadStats[]>;
    bulkUploadFromInventory(postingNumber: string, codeInventory: Record<string, string[]>): Promise<{
        success: boolean;
        results: any;
        missing: string[];
    }>;
}
export type * from './types';
