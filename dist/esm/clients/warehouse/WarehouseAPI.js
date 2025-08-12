import { iterateDeliveryMethods } from './iterators';
export class WarehouseAPI {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    async getWarehouseList() {
        return this.httpClient.post('/v1/warehouse/list', {});
    }
    async getDeliveryMethodList(params) {
        return this.httpClient.post('/v1/delivery-method/list', params);
    }
    iterateDeliveryMethods(params) {
        return iterateDeliveryMethods(this, params);
    }
}
