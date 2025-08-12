import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type { IProductImportProductsPricesRequest, IProductImportProductsPricesResponse, IProductv5GetProductInfoPricesV5Request, IProductv5GetProductInfoPricesV5Response } from '../../types/generated/prices&stocksapi';
export declare class PricesStocksPriceOps {
    private readonly httpClient;
    constructor(httpClient: HttpClient);
    updatePrices(params: IProductImportProductsPricesRequest): Promise<IHttpResponse<IProductImportProductsPricesResponse>>;
    getPriceInfo(params: IProductv5GetProductInfoPricesV5Request): Promise<IHttpResponse<IProductv5GetProductInfoPricesV5Response>>;
}
