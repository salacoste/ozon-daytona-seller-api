export class FBOTimeslots {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    async get(params) {
        return this.httpClient.post('/v1/supply-order/timeslot/get', params);
    }
    async update(params) {
        return this.httpClient.post('/v1/supply-order/timeslot/update', params);
    }
    async getStatus(params) {
        return this.httpClient.post('/v1/supply-order/timeslot/status', params);
    }
}
