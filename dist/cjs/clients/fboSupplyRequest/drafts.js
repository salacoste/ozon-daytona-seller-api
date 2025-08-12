"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FboSupplyRequestDrafts = void 0;
class FboSupplyRequestDrafts {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    async getClusterList(params) {
        return this.httpClient.post('/v1/cluster/list', params);
    }
    async getWarehouseFboList(params) {
        return this.httpClient.post('/v1/warehouse/fbo/list', params);
    }
    async createDraft(params) {
        return this.httpClient.post('/v1/draft/create', params);
    }
    async getDraftCreateInfo(params) {
        return this.httpClient.post('/v1/draft/create/info', params);
    }
    async getDraftTimeslotInfo(params) {
        return this.httpClient.post('/v1/draft/timeslot/info', params);
    }
}
exports.FboSupplyRequestDrafts = FboSupplyRequestDrafts;
