"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryAPI = void 0;
class CategoryAPI {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    async getTreeV1(params = {}) {
        return this.httpClient.post('/v1/description-category/tree', {
            language: 'DEFAULT',
            ...params
        });
    }
    async getAttributesV1(params) {
        return this.httpClient.post('/v1/description-category/attribute', {
            language: 'DEFAULT',
            ...params
        });
    }
    async getAttributeValuesV1(params) {
        return this.httpClient.post('/v1/description-category/attribute/values', {
            language: 'DEFAULT',
            ...params
        });
    }
    async searchAttributeValuesV1(params) {
        return this.httpClient.post('/v1/description-category/attribute/values/search', {
            language: 'DEFAULT',
            ...params
        });
    }
}
exports.CategoryAPI = CategoryAPI;
