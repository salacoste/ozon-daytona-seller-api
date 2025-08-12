export class FBOPasses {
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
