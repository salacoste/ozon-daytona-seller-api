import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type { IProductv2ProductsStocksRequest, IProductv2ProductsStocksResponse, IV4GetProductInfoStocksRequest, IV4GetProductInfoStocksResponse, IProductsv1GetProductInfoStocksByWarehouseFbsRequest, IProductsv1GetProductInfoStocksByWarehouseFbsResponse } from '../../types/generated/prices&stocksapi';
export declare class PricesStocksStockOps {
    private readonly httpClient;
    constructor(httpClient: HttpClient);
    updateStocks(params: IProductv2ProductsStocksRequest): Promise<IHttpResponse<IProductv2ProductsStocksResponse>>;
    getStockInfo(params: IV4GetProductInfoStocksRequest): Promise<IHttpResponse<IV4GetProductInfoStocksResponse>>;
    getStocksByWarehouse(params: IProductsv1GetProductInfoStocksByWarehouseFbsRequest): Promise<IHttpResponse<IProductsv1GetProductInfoStocksByWarehouseFbsResponse>>;
}
