export class DeliveryFbsActsManager {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    async createFBSAct(params) {
        return this.httpClient.post('/v2/posting/fbs/act/create', params);
    }
    async getAvailableCarriageList(params) {
        return this.httpClient.post('/v1/posting/carriage-available/list', params);
    }
    async *iterateAvailableCarriageList(params) {
        const response = await this.getAvailableCarriageList(params);
        if (response.data.carriages) {
            yield response.data.carriages;
        }
    }
    async splitFBSPosting(params) {
        return this.httpClient.post('/v1/posting/fbs/split', params);
    }
    async getActPostingsList(params) {
        return this.httpClient.post('/v2/posting/fbs/act/get-postings', params);
    }
}
