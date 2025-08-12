"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryFbsPdfsManager = void 0;
class DeliveryFbsPdfsManager {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    async getActPDF(params) {
        return this.httpClient.post('/v2/posting/fbs/act/get-pdf', params);
    }
    async getFBSActsList(params) {
        return this.httpClient.post('/v2/posting/fbs/act/list', params);
    }
    async *iterateFBSActsList(params) {
        let offset = 0;
        const limit = params.limit || 100;
        let hasNext = true;
        while (hasNext) {
            const response = await this.getFBSActsList({
                ...params,
                offset
            });
            const acts = response.data.acts || [];
            if (acts.length === 0) {
                hasNext = false;
            }
            else {
                yield acts;
                hasNext = response.data.has_next || false;
                offset += limit;
            }
        }
    }
    async getDigitalActPDF(params) {
        return this.httpClient.post('/v2/posting/fbs/digital/act/get-pdf', params);
    }
}
exports.DeliveryFbsPdfsManager = DeliveryFbsPdfsManager;
