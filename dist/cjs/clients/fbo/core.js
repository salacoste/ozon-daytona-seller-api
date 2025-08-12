"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FBOCore = void 0;
class FBOCore {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    async list(params) {
        return this.httpClient.post('/v2/posting/fbo/list', params);
    }
    async get(params) {
        return this.httpClient.post('/v2/posting/fbo/get', params);
    }
    async getCancelReasons() {
        return this.httpClient.post('/v1/posting/fbo/cancel-reason/list', {});
    }
    async *iterateOrders(params = {}, config = {}) {
        const { maxPages = 100, delayBetweenPages = 0 } = config;
        let pageNumber = 1;
        let offset = params.offset || 0;
        const limit = params.limit || 100;
        const baseParams = {
            filter: { since: '', to: '' },
            limit,
            offset: 0,
            ...params
        };
        while (pageNumber <= maxPages) {
            const pageParams = { ...baseParams, offset, limit };
            const response = await this.list(pageParams);
            yield {
                value: response,
                pageNumber,
                totalFetched: pageNumber,
                done: false,
            };
            if (!response.data.result || response.data.result.length < limit) {
                break;
            }
            offset += limit;
            pageNumber++;
            if (delayBetweenPages > 0) {
                await new Promise(resolve => setTimeout(resolve, delayBetweenPages));
            }
        }
    }
}
exports.FBOCore = FBOCore;
