"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RFBSReturnsAPI = void 0;
class RFBSReturnsAPI {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    async listReturnsV2(params) {
        return this.httpClient.post('/v2/returns/rfbs/list', params);
    }
    async *iterateReturnsV2(params) {
        let lastId;
        let hasNext = true;
        while (hasNext) {
            const response = await this.listReturnsV2({
                ...params,
                ...(lastId && { last_id: lastId }),
                limit: params.limit || 100
            });
            const returns = response.data.returns || [];
            if (returns.length === 0) {
                hasNext = false;
            }
            else {
                yield returns;
                lastId = response.data.last_id;
                hasNext = response.data.has_next || false;
            }
        }
    }
    async getReturnV2(params) {
        return this.httpClient.post('/v2/returns/rfbs/get', params);
    }
    async setReturnAction(params) {
        return this.httpClient.post('/v1/returns/rfbs/action/set', params);
    }
    async rejectReturnV2(params) {
        return this.httpClient.post('/v2/returns/rfbs/reject', params);
    }
    async compensateReturnV2(params) {
        return this.httpClient.post('/v2/returns/rfbs/compensate', params);
    }
    async verifyReturnV2(params) {
        return this.httpClient.post('/v2/returns/rfbs/verify', params);
    }
    async receiveReturnV2(params) {
        return this.httpClient.post('/v2/returns/rfbs/receive-return', params);
    }
    async returnMoneyV2(params) {
        return this.httpClient.post('/v2/returns/rfbs/return-money', params);
    }
    async processBatch(returnIds, action, actionParams = {}, batchSize = 10) {
        const successful = [];
        const failed = [];
        for (let i = 0; i < returnIds.length; i += batchSize) {
            const batch = returnIds.slice(i, i + batchSize);
            const batchPromises = batch.map(async (returnId) => {
                try {
                    await this.setReturnAction({
                        return_id: returnId,
                        action,
                        parameters: actionParams
                    });
                    return { returnId, success: true };
                }
                catch (error) {
                    return {
                        returnId,
                        success: false,
                        error: error instanceof Error ? error.message : 'Unknown error'
                    };
                }
            });
            const batchResults = await Promise.all(batchPromises);
            for (const result of batchResults) {
                if (result.success) {
                    successful.push(result.returnId);
                }
                else {
                    failed.push({
                        returnId: result.returnId,
                        error: result.error || 'Unknown error'
                    });
                }
            }
            if (i + batchSize < returnIds.length) {
                await new Promise(resolve => setTimeout(resolve, 100));
            }
        }
        return { successful, failed };
    }
}
exports.RFBSReturnsAPI = RFBSReturnsAPI;
