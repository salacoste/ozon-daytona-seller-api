export class FBOSupplyOrders {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    async getStatusCounters() {
        return this.httpClient.post('/v1/supply-order/status/counter', {});
    }
    async getBundle(params) {
        return this.httpClient.post('/v1/supply-order/bundle', params);
    }
    async getList(params) {
        return this.httpClient.post('/v2/supply-order/list', params);
    }
    async get(params) {
        return this.httpClient.post('/v2/supply-order/get', params);
    }
    async getAvailableWarehouses() {
        return this.httpClient.post('/v1/supplier/available_warehouses', {});
    }
    async *iterateBundle(params, config = {}) {
        const { maxPages = 100, delayBetweenPages = 0 } = config;
        let pageNumber = 1;
        let lastId;
        const baseParams = {
            ...params
        };
        while (pageNumber <= maxPages) {
            const pageParams = {
                ...baseParams,
                ...(lastId ? { last_id: lastId } : {})
            };
            const response = await this.getBundle(pageParams);
            yield {
                value: response,
                pageNumber,
                totalFetched: pageNumber,
                done: false,
            };
            if (!response.data.has_next) {
                break;
            }
            lastId = response.data.last_id;
            if (!lastId) {
                break;
            }
            pageNumber++;
            if (delayBetweenPages > 0) {
                await new Promise(resolve => setTimeout(resolve, delayBetweenPages));
            }
        }
    }
    async *iterateSupplyOrders(params = {}, config = {}) {
        const { maxPages = 100, delayBetweenPages = 0 } = config;
        let pageNumber = 1;
        let fromSupplyOrderId = params.paging?.from_supply_order_id;
        const limit = params.paging?.limit || 100;
        const baseParams = {
            paging: { limit },
            ...params
        };
        while (pageNumber <= maxPages) {
            const pageParams = {
                ...baseParams,
                paging: {
                    ...baseParams.paging,
                    ...(fromSupplyOrderId ? { from_supply_order_id: fromSupplyOrderId } : {})
                }
            };
            const response = await this.getList(pageParams);
            yield {
                value: response,
                pageNumber,
                totalFetched: pageNumber,
                done: false,
            };
            if (!response.data.supply_order_id?.length) {
                break;
            }
            fromSupplyOrderId = response.data.last_supply_order_id;
            if (!fromSupplyOrderId) {
                break;
            }
            pageNumber++;
            if (delayBetweenPages > 0) {
                await new Promise(resolve => setTimeout(resolve, delayBetweenPages));
            }
        }
    }
}
