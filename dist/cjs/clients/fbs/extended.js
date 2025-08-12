"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FBSExtended = void 0;
class FBSExtended {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    async listProductCountryV2(params = {}) {
        return this.httpClient.post('/v2/posting/fbs/product/country/list', params);
    }
    async setProductCountryV2(params) {
        return this.httpClient.post('/v2/posting/fbs/product/country/set', params);
    }
    async getRestrictionsV1(params) {
        return this.httpClient.post('/v1/posting/fbs/restrictions', params);
    }
    async getPackageLabelPdfV2(params) {
        return this.httpClient.post('/v2/posting/fbs/package-label', params);
    }
    async createLabelBatchV1(params) {
        return this.httpClient.post('/v1/posting/fbs/package-label/create', params);
    }
    async createLabelBatchV2(params) {
        return this.httpClient.post('/v2/posting/fbs/package-label/create', params);
    }
    async getLabelBatchV1(params) {
        return this.httpClient.post('/v1/posting/fbs/package-label/get', params);
    }
    async getCancelReasonV1(params) {
        return this.httpClient.post('/v1/posting/fbs/cancel-reason', params);
    }
    async getCancelReasonListV2(params = {}) {
        return this.httpClient.post('/v2/posting/fbs/cancel-reason/list', params);
    }
}
exports.FBSExtended = FBSExtended;
