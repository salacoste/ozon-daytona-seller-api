"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FBSIterators = void 0;
const pagination_1 = require("../../pagination");
class FBSIterators {
    constructor(client) {
        this.client = client;
    }
    iterateUnfulfilledV3(params = {}, config) {
        const completeParams = { limit: 100, offset: 0, ...params };
        return (0, pagination_1.iterateByOffset)(async (pageParams) => {
            const response = await this.client.getUnfulfilledV3(pageParams);
            const resultData = response.data.result || {};
            const postings = resultData.postings || [];
            return {
                result: postings,
                has_next: postings.length > 0 && postings.length >= (pageParams.limit || 100)
            };
        }, completeParams, config);
    }
    iteratePostingsV3(params = {}, config) {
        const completeParams = { limit: 100, offset: 0, ...params };
        return (0, pagination_1.iterateByOffset)(async (pageParams) => {
            const response = await this.client.listV3(pageParams);
            const resultData = response.data.result || {};
            const postings = resultData.postings || [];
            return {
                result: postings,
                has_next: resultData.has_next || false
            };
        }, completeParams, config);
    }
    iterateUnpaidLegalProducts(params = {}, config) {
        const baseParams = { limit: 100, ...params };
        return (0, pagination_1.iterateByCursor)(async (pageParams) => {
            const response = await this.client.managementMethods.getUnpaidLegalProductListV1({
                ...baseParams,
                ...pageParams
            });
            return {
                result: response.data.products || [],
                hasMore: !!response.data.cursor,
                next_cursor: response.data.cursor
            };
        }, baseParams, config);
    }
    iterateUnfulfilled(params, config) {
        return this.iterateUnfulfilledV3(params, config);
    }
    iterateList(params, config) {
        return this.iteratePostingsV3(params, config);
    }
}
exports.FBSIterators = FBSIterators;
