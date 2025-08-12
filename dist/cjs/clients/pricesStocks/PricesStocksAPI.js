"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PricesStocksAPI = void 0;
const stocks_1 = require("./stocks");
const prices_1 = require("./prices");
const special_1 = require("./special");
const iterators_1 = require("./iterators");
class PricesStocksAPI {
    constructor(httpClient) {
        this.stockOps = new stocks_1.PricesStocksStockOps(httpClient);
        this.priceOps = new prices_1.PricesStocksPriceOps(httpClient);
        this.specialOps = new special_1.PricesStocksSpecialOps(httpClient);
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
        return (0, iterators_1.iterateStockInfo)(this.stockOps, params);
    }
    iteratePriceInfo(params) {
        return (0, iterators_1.iteratePriceInfo)(this.priceOps, params);
    }
}
exports.PricesStocksAPI = PricesStocksAPI;
