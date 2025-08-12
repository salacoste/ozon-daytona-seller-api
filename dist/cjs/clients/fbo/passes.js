"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FBOPasses = void 0;
class FBOPasses {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    async create(params) {
        return this.httpClient.post('/v1/supply-order/pass/create', params);
    }
    async getStatus(params) {
        return this.httpClient.post('/v1/supply-order/pass/status', params);
    }
}
exports.FBOPasses = FBOPasses;
