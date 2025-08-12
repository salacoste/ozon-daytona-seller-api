export class SupplierAPI {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    async invoiceCreateOrUpdateV2(params) {
        return this.httpClient.post('/v2/invoice/create-or-update', params);
    }
    async invoiceFileUploadV1(params) {
        return this.httpClient.post('/v1/invoice/file/upload', params);
    }
    async invoiceGetV2(params) {
        return this.httpClient.post('/v2/invoice/get', params);
    }
    async invoiceDeleteV1(params) {
        return this.httpClient.post('/v1/invoice/delete', params);
    }
}
