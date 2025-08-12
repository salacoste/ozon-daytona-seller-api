export class CancellationAPI {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    async getConditionalCancellationV1(params) {
        return this.httpClient.post('/v1/conditional-cancellation/get', params);
    }
    async listConditionalCancellationsV1(params) {
        return this.httpClient.post('/v1/conditional-cancellation/list', params);
    }
    async listConditionalCancellationsV2(params) {
        return this.httpClient.post('/v2/conditional-cancellation/list', params);
    }
    async approveConditionalCancellationV1(params) {
        return this.httpClient.post('/v1/conditional-cancellation/approve', params);
    }
    async approveConditionalCancellationV2(params) {
        return this.httpClient.post('/v2/conditional-cancellation/approve', params);
    }
    async rejectConditionalCancellationV1(params) {
        return this.httpClient.post('/v1/conditional-cancellation/reject', params);
    }
    async rejectConditionalCancellationV2(params) {
        return this.httpClient.post('/v2/conditional-cancellation/reject', params);
    }
}
