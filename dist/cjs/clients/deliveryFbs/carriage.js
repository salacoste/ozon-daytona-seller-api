"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryFbsCarriageManager = void 0;
class DeliveryFbsCarriageManager {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    async createCarriage(params) {
        return this.httpClient.post('/v1/carriage/create', params);
    }
    async approveCarriage(params) {
        return this.httpClient.post('/v1/carriage/approve', params);
    }
    async setPostings(params) {
        return this.httpClient.post('/v1/carriage/set-postings', params);
    }
    async cancelCarriage(params) {
        return this.httpClient.post('/v1/carriage/cancel', params);
    }
    async getCarriageDeliveryList(params) {
        return this.httpClient.post('/v1/carriage/delivery/list', params);
    }
    async getCarriage(params) {
        return this.httpClient.post('/v1/carriage/get', params);
    }
}
exports.DeliveryFbsCarriageManager = DeliveryFbsCarriageManager;
