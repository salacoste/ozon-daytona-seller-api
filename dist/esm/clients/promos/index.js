export class PromosAPI {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    async getPromoActions(params = {}) {
        return this.httpClient.get('/v1/actions');
    }
    async getPromoCandidates(params) {
        return this.httpClient.post('/v1/actions/candidates', params);
    }
    async getPromoProducts(params) {
        return this.httpClient.post('/v1/actions/products', params);
    }
    async activatePromoProducts(params) {
        return this.httpClient.post('/v1/actions/products/activate', params);
    }
    async deactivatePromoProducts(params) {
        return this.httpClient.post('/v1/actions/products/deactivate', params);
    }
    async getDiscountTasks(params) {
        return this.httpClient.post('/v1/actions/discounts-task/list', params);
    }
    async approveDiscountTasks(params) {
        return this.httpClient.post('/v1/actions/discounts-task/approve', params);
    }
    async declineDiscountTasks(params) {
        return this.httpClient.post('/v1/actions/discounts-task/decline', params);
    }
    async *iteratePromoCandidates(params) {
        let lastId;
        let hasNext = true;
        while (hasNext) {
            const response = await this.getPromoCandidates({
                ...params,
                ...(lastId && { last_id: lastId })
            });
            const products = response.data.result?.products || [];
            if (products.length === 0) {
                hasNext = false;
            }
            else {
                yield products;
                lastId = response.data.result?.next_offset;
                hasNext = !!lastId;
            }
        }
    }
    async *iteratePromoProducts(params) {
        let lastId;
        let hasNext = true;
        while (hasNext) {
            const response = await this.getPromoProducts({
                ...params,
                ...(lastId && { last_id: lastId })
            });
            const products = response.data.result?.products || [];
            if (products.length === 0) {
                hasNext = false;
            }
            else {
                yield products;
                lastId = response.data.result?.next_offset;
                hasNext = !!lastId;
            }
        }
    }
    async *iterateDiscountTasks(params) {
        let page = 1;
        let hasNext = true;
        while (hasNext) {
            const response = await this.getDiscountTasks({
                ...params,
                page
            });
            const tasks = response.data.result || [];
            if (tasks.length === 0) {
                hasNext = false;
            }
            else {
                yield tasks;
                hasNext = tasks.length === (params.limit || 100);
                page++;
            }
        }
    }
}
