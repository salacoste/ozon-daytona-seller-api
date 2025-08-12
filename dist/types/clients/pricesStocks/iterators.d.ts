import type { IV4GetProductInfoStocksRequest, IV4GetProductInfoStocksResponseItem, IProductv5GetProductInfoPricesV5Request } from '../../types/generated/prices&stocksapi';
import type { PricesStocksStockOps } from './stocks';
import type { PricesStocksPriceOps } from './prices';
export declare function iterateStockInfo(stockOps: PricesStocksStockOps, params: Omit<IV4GetProductInfoStocksRequest, 'cursor'>): AsyncGenerator<IV4GetProductInfoStocksResponseItem, void, unknown>;
export declare function iteratePriceInfo(priceOps: PricesStocksPriceOps, params: Omit<IProductv5GetProductInfoPricesV5Request, 'cursor'>): AsyncGenerator<any, void, unknown>;
