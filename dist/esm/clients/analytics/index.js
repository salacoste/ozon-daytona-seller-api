export class AnalyticsAPI {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    async getDataV1(params) {
        return this.httpClient.post('/v1/analytics/data', params);
    }
    async getStockOnWarehousesV2(params) {
        return this.httpClient.post('/v2/analytics/stock_on_warehouses', params);
    }
    async getStocksTurnoverV1(params) {
        return this.httpClient.post('/v1/analytics/turnover/stocks', params);
    }
    async getProductQueriesV1(params) {
        return this.httpClient.post('/v1/analytics/product-queries', params);
    }
    async getProductQueriesDetailsV1(params) {
        return this.httpClient.post('/v1/analytics/product-queries/details', params);
    }
}
