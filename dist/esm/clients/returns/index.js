export class ReturnsAPI {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    async getReturnsListV1(params) {
        return this.httpClient.post('/v1/returns/list', params);
    }
    async *iterateReturnsListV1(params) {
        let lastId;
        let hasNext = true;
        while (hasNext) {
            const response = await this.getReturnsListV1({
                ...params,
                ...(lastId && { last_id: lastId }),
                limit: params.limit || 100
            });
            const returns = response.data.returns || [];
            if (returns.length === 0) {
                hasNext = false;
            }
            else {
                yield returns;
                lastId = returns.slice(-1)[0]?.id ? Number(returns.slice(-1)[0]?.id) : undefined;
                hasNext = response.data.has_next || false;
            }
        }
    }
}
