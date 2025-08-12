export class FBSManagement {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    async getCancelReasonById(params) {
        return this.httpClient.post('/v1/posting/fbs/cancel-reason', params);
    }
    async getCancelReasonsList() {
        return this.httpClient.post('/v2/posting/fbs/cancel-reason/list', {});
    }
    async cancelPostingProducts(params) {
        return this.httpClient.post('/v2/posting/fbs/product/cancel', params);
    }
    async cancelPosting(params) {
        return this.httpClient.post('/v2/posting/fbs/cancel', params);
    }
    async moveToArbitration(params) {
        return this.httpClient.post('/v2/posting/fbs/arbitration', params);
    }
    async moveToAwaitingDelivery(params) {
        return this.httpClient.post('/v2/posting/fbs/awaiting-delivery', params);
    }
    async verifyPickupCode(params) {
        return this.httpClient.post('/v1/posting/fbs/pick-up-code/verify', params);
    }
    async getETGB(params) {
        return this.httpClient.post('/v1/posting/global/etgb', params);
    }
    async getUnpaidLegalProductListV1(params = {}) {
        return this.httpClient.post('/v1/posting/unpaid-legal/product/list', params);
    }
    async getUnpaidLegalProducts(params) {
        return this.getUnpaidLegalProductListV1(params);
    }
}
