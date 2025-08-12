"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FBSCore = void 0;
class FBSCore {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    async getUnfulfilledV3(params) {
        return this.httpClient.post('/v3/posting/fbs/unfulfilled/list', params);
    }
    async listV3(params) {
        return this.httpClient.post('/v3/posting/fbs/list', params);
    }
    async getV3(params) {
        return this.httpClient.post('/v3/posting/fbs/get', params);
    }
    async getByBarcode(params) {
        return this.httpClient.post('/v2/posting/fbs/get-by-barcode', params);
    }
    async setMultiBoxQuantity(params) {
        return this.httpClient.post('/v3/posting/multiboxqty/set', params);
    }
    async changeProduct(params) {
        return this.httpClient.post('/v2/posting/fbs/product/change', params);
    }
}
exports.FBSCore = FBSCore;
