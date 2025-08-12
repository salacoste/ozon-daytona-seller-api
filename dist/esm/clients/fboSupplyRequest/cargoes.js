export class FboSupplyRequestCargoes {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    async createCargoes(params) {
        return this.httpClient.post('/v1/cargoes/create', params);
    }
    async getCargoesCreateInfo(params) {
        return this.httpClient.post('/v1/cargoes/create/info', params);
    }
    async deleteCargoes(params) {
        return this.httpClient.post('/v1/cargoes/delete', params);
    }
    async getCargoesDeleteStatus(params) {
        return this.httpClient.post('/v1/cargoes/delete/status', params);
    }
    async getCargoesRules(params) {
        return this.httpClient.post('/v1/cargoes/rules/get', params);
    }
    async createCargoesLabel(params) {
        return this.httpClient.post('/v1/cargoes-label/create', params);
    }
    async getCargoesLabel(params) {
        return this.httpClient.post('/v1/cargoes-label/get', params);
    }
    async getCargoesLabelFile(file_guid) {
        return this.httpClient.get(`/v1/cargoes-label/file/${file_guid}`);
    }
}
