"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WarehouseAPI = void 0;
const iterators_1 = require("./iterators");
class WarehouseAPI {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    async getWarehouseList() {
        return this.httpClient.post('/v1/warehouse/list', {});
    }
    async getDeliveryMethodList(params) {
        return this.httpClient.post('/v1/delivery-method/list', params);
    }
    iterateDeliveryMethods(params) {
        return (0, iterators_1.iterateDeliveryMethods)(this, params);
    }
}
exports.WarehouseAPI = WarehouseAPI;
