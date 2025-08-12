"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PricesStocksSpecialOps = void 0;
class PricesStocksSpecialOps {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    async updateActionTimer(params) {
        return this.httpClient.post('/v1/product/action/timer/update', params);
    }
    async getActionTimerStatus(params) {
        return this.httpClient.post('/v1/product/action/timer/status', params);
    }
    async getDiscountedInfo(params) {
        return this.httpClient.post('/v1/product/info/discounted', params);
    }
    async updateDiscount(params) {
        return this.httpClient.post('/v1/product/update/discount', params);
    }
}
exports.PricesStocksSpecialOps = PricesStocksSpecialOps;
