export class PricesStocksStockOps {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    async updateStocks(params) {
        return this.httpClient.post('/v2/products/stocks', params);
    }
    async getStockInfo(params) {
        return this.httpClient.post('/v4/product/info/stocks', params);
    }
    async getStocksByWarehouse(params) {
        return this.httpClient.post('/v1/product/info/stocks-by-warehouse/fbs', params);
    }
}
