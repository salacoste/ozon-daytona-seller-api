"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FboSupplyRequestSupply = void 0;
class FboSupplyRequestSupply {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    async createSupply(params) {
        return this.httpClient.post('/v1/draft/supply/create', params);
    }
    async getSupplyCreateStatus(params) {
        return this.httpClient.post('/v1/draft/supply/create/status', params);
    }
}
exports.FboSupplyRequestSupply = FboSupplyRequestSupply;
