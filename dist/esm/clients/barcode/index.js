export class BarcodeAPI {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    async addBarcode(params) {
        return this.httpClient.post('/v1/barcode/add', params);
    }
    async generateBarcode(params) {
        return this.httpClient.post('/v1/barcode/generate', params);
    }
    async processBarcodesBatch(items, batchSize = 100, delayMs = 3000, processor) {
        const results = [];
        for (let i = 0; i < items.length; i += batchSize) {
            const batch = items.slice(i, i + batchSize);
            const batchResults = await processor(batch);
            results.push(...batchResults);
            if (i + batchSize < items.length && delayMs > 0) {
                await new Promise(resolve => setTimeout(resolve, delayMs));
            }
        }
        return results;
    }
}
