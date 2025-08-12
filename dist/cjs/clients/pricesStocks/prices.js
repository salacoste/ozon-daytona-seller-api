"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PricesStocksPriceOps = void 0;
class PricesStocksPriceOps {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    async updatePrices(params) {
        return this.httpClient.post('/v1/product/import/prices', params);
    }
    async getPriceInfo(params) {
        return this.httpClient.post('/v5/product/info/prices', params);
    }
}
exports.PricesStocksPriceOps = PricesStocksPriceOps;
