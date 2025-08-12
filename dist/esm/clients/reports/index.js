export class ReportsAPI {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    async getReportInfoV1(params) {
        return this.httpClient.post('/v1/report/info', params);
    }
    async getReportListV1(params = {}) {
        return this.httpClient.post('/v1/report/list', params);
    }
    async createProductsReportV1(params) {
        return this.httpClient.post('/v1/report/products/create', params);
    }
    async createReturnsReportV2(params) {
        return this.httpClient.post('/v2/report/returns/create', params);
    }
    async createPostingsReportV1(params) {
        return this.httpClient.post('/v1/report/postings/create', params);
    }
    async createDiscountedReportV1(params) {
        return this.httpClient.post('/v1/report/discounted/create', params);
    }
    async createStockByWarehouseReportV1(params = {}) {
        return this.httpClient.post('/v1/report/warehouse/stock', params);
    }
}
