"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FboSupplyRequestOrders = void 0;
class FboSupplyRequestOrders {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    async cancelSupplyOrder(params) {
        return this.httpClient.post('/v1/supply-order/cancel', params);
    }
    async getSupplyOrderCancelStatus(params) {
        return this.httpClient.post('/v1/supply-order/cancel/status', params);
    }
    async updateSupplyOrderContent(params) {
        return this.httpClient.post('/v1/supply-order/content/update', params);
    }
    async getSupplyOrderContentUpdateStatus(params) {
        return this.httpClient.post('/v1/supply-order/content/update/status', params);
    }
}
exports.FboSupplyRequestOrders = FboSupplyRequestOrders;
