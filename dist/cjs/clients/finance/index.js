"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinanceAPI = void 0;
class FinanceAPI {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    async getCashFlowStatementListV1(params) {
        return this.httpClient.post('/v1/finance/cash-flow-statement/list', params);
    }
    async getRealizationReportV2(params) {
        return this.httpClient.post('/v2/finance/realization', params);
    }
    async getRealizationReportPostingV1(params) {
        return this.httpClient.post('/v1/finance/realization/posting', params);
    }
    async getRealizationByDayV1(params) {
        return this.httpClient.post('/v1/finance/realization/by-day', params);
    }
    async getTransactionListV3(params) {
        return this.httpClient.post('/v3/finance/transaction/list', params);
    }
    async getTransactionTotalsV3(params) {
        return this.httpClient.post('/v3/finance/transaction/totals', params);
    }
    async getDocumentB2BSalesV1(params) {
        return this.httpClient.post('/v1/finance/document-b2b-sales', params);
    }
    async getDocumentB2BSalesJsonV1(params) {
        return this.httpClient.post('/v1/finance/document-b2b-sales/json', params);
    }
    async getMutualSettlementV1(params) {
        return this.httpClient.post('/v1/finance/mutual-settlement', params);
    }
    async getProductsBuyoutV1(params) {
        return this.httpClient.post('/v1/finance/products/buyout', params);
    }
    async getCompensationV1(params) {
        return this.httpClient.post('/v1/finance/compensation', params);
    }
    async getDecompensationV1(params) {
        return this.httpClient.post('/v1/finance/decompensation', params);
    }
}
exports.FinanceAPI = FinanceAPI;
