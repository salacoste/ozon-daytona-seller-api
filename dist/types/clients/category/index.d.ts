import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type { GetTreeRequest, GetTreeResponse, GetAttributesRequest, GetAttributesResponse, GetAttributeValuesRequest, GetAttributeValuesResponse, SearchAttributeValuesRequest, SearchAttributeValuesResponse } from './types';
export declare class CategoryAPI {
    private readonly httpClient;
    constructor(httpClient: HttpClient);
    getTreeV1(params?: GetTreeRequest): Promise<IHttpResponse<GetTreeResponse>>;
    getAttributesV1(params: GetAttributesRequest): Promise<IHttpResponse<GetAttributesResponse>>;
    getAttributeValuesV1(params: GetAttributeValuesRequest): Promise<IHttpResponse<GetAttributeValuesResponse>>;
    searchAttributeValuesV1(params: SearchAttributeValuesRequest): Promise<IHttpResponse<SearchAttributeValuesResponse>>;
}
