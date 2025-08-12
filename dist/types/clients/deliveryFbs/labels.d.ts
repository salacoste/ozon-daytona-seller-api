import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type { GetContainerLabelsRequest, GetBarcodeRequest, GetBarcodeTextRequest, CheckDigitalActStatusRequest, CheckActStatusRequest, GetContainerLabelsResponse, GetBarcodeResponse, GetBarcodeTextResponse, CheckDigitalActStatusResponse, CheckActStatusResponse } from './types';
export declare class DeliveryFbsLabelsManager {
    private readonly httpClient;
    constructor(httpClient: HttpClient);
    getContainerLabels(params: GetContainerLabelsRequest): Promise<IHttpResponse<GetContainerLabelsResponse>>;
    getBarcode(params: GetBarcodeRequest): Promise<IHttpResponse<GetBarcodeResponse>>;
    getBarcodeText(params: GetBarcodeTextRequest): Promise<IHttpResponse<GetBarcodeTextResponse>>;
    checkDigitalActStatus(params: CheckDigitalActStatusRequest): Promise<IHttpResponse<CheckDigitalActStatusResponse>>;
    checkActStatus(params: CheckActStatusRequest): Promise<IHttpResponse<CheckActStatusResponse>>;
}
