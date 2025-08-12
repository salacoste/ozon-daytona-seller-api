export class DeliveryFbsLabelsManager {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    async getContainerLabels(params) {
        return this.httpClient.post('/v2/posting/fbs/act/get-container-labels', params);
    }
    async getBarcode(params) {
        return this.httpClient.post('/v2/posting/fbs/act/get-barcode', params);
    }
    async getBarcodeText(params) {
        return this.httpClient.post('/v2/posting/fbs/act/get-barcode/text', params);
    }
    async checkDigitalActStatus(params) {
        return this.httpClient.post('/v2/posting/fbs/digital/act/check-status', params);
    }
    async checkActStatus(params) {
        return this.httpClient.post('/v2/posting/fbs/act/check-status', params);
    }
}
