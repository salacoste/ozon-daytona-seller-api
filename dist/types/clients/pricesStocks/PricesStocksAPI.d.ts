import type { HttpClient } from '../../http/HttpClient';
import { PricesStocksStockOps } from './stocks';
import { PricesStocksPriceOps } from './prices';
import { PricesStocksSpecialOps } from './special';
import { iterateStockInfo, iteratePriceInfo } from './iterators';
export type { IProductv2ProductsStocksRequest, IProductv2ProductsStocksResponse, IV4GetProductInfoStocksRequest, IV4GetProductInfoStocksResponse, IProductsv1GetProductInfoStocksByWarehouseFbsRequest, IProductsv1GetProductInfoStocksByWarehouseFbsResponse, IProductImportProductsPricesRequest, IProductImportProductsPricesResponse, IProductv5GetProductInfoPricesV5Request, IProductv5GetProductInfoPricesV5Response, IV1ProductActionTimerUpdateRequest, IV1ProductActionTimerUpdateResponse, IV1ProductActionTimerStatusRequest, IV1ProductActionTimerStatusResponse, IV1GetProductInfoDiscountedRequest, IV1GetProductInfoDiscountedResponse, IV1ProductUpdateDiscountRequest, IV1ProductUpdateDiscountResponse, } from '../../types/generated/prices&stocksapi';
export declare class PricesStocksAPI {
    private readonly stockOps;
    private readonly priceOps;
    private readonly specialOps;
    constructor(httpClient: HttpClient);
    updateStocksV2(params: Parameters<PricesStocksStockOps['updateStocks']>[0]): Promise<import("../..").IHttpResponse<import("../../types/generated/prices&stocksapi").IProductv2ProductsStocksResponse>>;
    getStocksInfoV4(params: Parameters<PricesStocksStockOps['getStockInfo']>[0]): Promise<import("../..").IHttpResponse<import("../../types/generated/prices&stocksapi").IV4GetProductInfoStocksResponse>>;
    getStocksByWarehouseFbsV1(params: Parameters<PricesStocksStockOps['getStocksByWarehouse']>[0]): Promise<import("../..").IHttpResponse<import("../../types/generated/prices&stocksapi").IProductsv1GetProductInfoStocksByWarehouseFbsResponse>>;
    updateStocks(params: Parameters<PricesStocksStockOps['updateStocks']>[0]): Promise<import("../..").IHttpResponse<import("../../types/generated/prices&stocksapi").IProductv2ProductsStocksResponse>>;
    getStockInfo(params: Parameters<PricesStocksStockOps['getStockInfo']>[0]): Promise<import("../..").IHttpResponse<import("../../types/generated/prices&stocksapi").IV4GetProductInfoStocksResponse>>;
    getStocksByWarehouse(params: Parameters<PricesStocksStockOps['getStocksByWarehouse']>[0]): Promise<import("../..").IHttpResponse<import("../../types/generated/prices&stocksapi").IProductsv1GetProductInfoStocksByWarehouseFbsResponse>>;
    updatePrices(params: Parameters<PricesStocksPriceOps['updatePrices']>[0]): Promise<import("../..").IHttpResponse<import("../../types/generated/prices&stocksapi").IProductImportProductsPricesResponse>>;
    getPriceInfo(params: Parameters<PricesStocksPriceOps['getPriceInfo']>[0]): Promise<import("../..").IHttpResponse<import("../../types/generated/prices&stocksapi").IProductv5GetProductInfoPricesV5Response>>;
    updateActionTimer(params: Parameters<PricesStocksSpecialOps['updateActionTimer']>[0]): Promise<import("../..").IHttpResponse<import("../../types/generated/prices&stocksapi").IV1ProductActionTimerUpdateResponse>>;
    getActionTimerStatus(params: Parameters<PricesStocksSpecialOps['getActionTimerStatus']>[0]): Promise<import("../..").IHttpResponse<import("../../types/generated/prices&stocksapi").IV1ProductActionTimerStatusResponse>>;
    getDiscountedInfo(params: Parameters<PricesStocksSpecialOps['getDiscountedInfo']>[0]): Promise<import("../..").IHttpResponse<import("../../types/generated/prices&stocksapi").IV1GetProductInfoDiscountedResponse>>;
    updateDiscount(params: Parameters<PricesStocksSpecialOps['updateDiscount']>[0]): Promise<import("../..").IHttpResponse<import("../../types/generated/prices&stocksapi").IV1ProductUpdateDiscountResponse>>;
    iterateStockInfo(params: Parameters<typeof iterateStockInfo>[1]): AsyncGenerator<import("../../types/generated/prices&stocksapi").IV4GetProductInfoStocksResponseItem, void, unknown>;
    iteratePriceInfo(params: Parameters<typeof iteratePriceInfo>[1]): AsyncGenerator<any, void, unknown>;
}
