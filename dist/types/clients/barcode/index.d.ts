import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type { AddBarcodeRequest, AddBarcodeResponse, GenerateBarcodeRequest, GenerateBarcodeResponse } from './types';
export declare class BarcodeAPI {
    private readonly httpClient;
    constructor(httpClient: HttpClient);
    addBarcode(params: AddBarcodeRequest): Promise<IHttpResponse<AddBarcodeResponse>>;
    generateBarcode(params: GenerateBarcodeRequest): Promise<IHttpResponse<GenerateBarcodeResponse>>;
    processBarcodesBatch<T, R>(items: T[], batchSize: number | undefined, delayMs: number | undefined, processor: (batch: T[]) => Promise<R[]>): Promise<R[]>;
}
export type * from './types';
