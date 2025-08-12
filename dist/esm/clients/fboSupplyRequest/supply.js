export class FboSupplyRequestSupply {
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
