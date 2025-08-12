import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type { InvoiceCreateOrUpdateRequest, InvoiceCreateOrUpdateResponse, InvoiceFileUploadRequest, InvoiceFileUploadResponse, InvoiceGetRequest, InvoiceGetResponse, InvoiceDeleteRequest, InvoiceDeleteResponse } from './types';
export declare class SupplierAPI {
    private readonly httpClient;
    constructor(httpClient: HttpClient);
    invoiceCreateOrUpdateV2(params: InvoiceCreateOrUpdateRequest): Promise<IHttpResponse<InvoiceCreateOrUpdateResponse>>;
    invoiceFileUploadV1(params: InvoiceFileUploadRequest): Promise<IHttpResponse<InvoiceFileUploadResponse>>;
    invoiceGetV2(params: InvoiceGetRequest): Promise<IHttpResponse<InvoiceGetResponse>>;
    invoiceDeleteV1(params: InvoiceDeleteRequest): Promise<IHttpResponse<InvoiceDeleteResponse>>;
}
