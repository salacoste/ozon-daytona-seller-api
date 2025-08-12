import { PricesStocksStockOps } from './stocks';
import { PricesStocksPriceOps } from './prices';
import { PricesStocksSpecialOps } from './special';
import { iterateStockInfo, iteratePriceInfo } from './iterators';
export class PricesStocksAPI {
    constructor(httpClient) {
        this.stockOps = new PricesStocksStockOps(httpClient);
        this.priceOps = new PricesStocksPriceOps(httpClient);
        this.specialOps = new PricesStocksSpecialOps(httpClient);
    }
    async updateStocksV2(params) {
        return this.stockOps.updateStocks(params);
    }
    async getStocksInfoV4(params) {
        return this.stockOps.getStockInfo(params);
    }
    async getStocksByWarehouseFbsV1(params) {
        return this.stockOps.getStocksByWarehouse(params);
    }
    async updateStocks(params) {
        return this.updateStocksV2(params);
    }
    async getStockInfo(params) {
        return this.getStocksInfoV4(params);
    }
    async getStocksByWarehouse(params) {
        return this.getStocksByWarehouseFbsV1(params);
    }
    async updatePrices(params) {
        return this.priceOps.updatePrices(params);
    }
    async getPriceInfo(params) {
        return this.priceOps.getPriceInfo(params);
    }
    async updateActionTimer(params) {
        return this.specialOps.updateActionTimer(params);
    }
    async getActionTimerStatus(params) {
        return this.specialOps.getActionTimerStatus(params);
    }
    async getDiscountedInfo(params) {
        return this.specialOps.getDiscountedInfo(params);
    }
    async updateDiscount(params) {
        return this.specialOps.updateDiscount(params);
    }
    iterateStockInfo(params) {
        return iterateStockInfo(this.stockOps, params);
    }
    iteratePriceInfo(params) {
        return iteratePriceInfo(this.priceOps, params);
    }
}
