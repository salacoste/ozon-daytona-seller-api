import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type { IWarehouseListResponse, IWarehouseDeliveryMethodListRequest, IWarehouseDeliveryMethodListResponse, IDeliveryMethodListResponseDeliveryMethod } from '../../types/generated/warehouseapi';
export declare class WarehouseAPI {
    private readonly httpClient;
    constructor(httpClient: HttpClient);
    getWarehouseList(): Promise<IHttpResponse<IWarehouseListResponse>>;
    getDeliveryMethodList(params: IWarehouseDeliveryMethodListRequest): Promise<IHttpResponse<IWarehouseDeliveryMethodListResponse>>;
    iterateDeliveryMethods(params: Omit<IWarehouseDeliveryMethodListRequest, 'offset'>): AsyncGenerator<IDeliveryMethodListResponseDeliveryMethod, void, unknown>;
}
