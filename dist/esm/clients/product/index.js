export class ProductAPI {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    async importV3(params) {
        return this.httpClient.post('/v3/product/import', params);
    }
    async getImportInfo(params) {
        return this.httpClient.post('/v1/product/import/info', params);
    }
    async importBySku(params) {
        return this.httpClient.post('/v1/product/import-by-sku', params);
    }
    async updateAttributes(params) {
        return this.httpClient.post('/v1/product/attributes/update', params);
    }
    async importPictures(params) {
        return this.httpClient.post('/v1/product/pictures/import', params);
    }
    async getList(params) {
        return this.httpClient.post('/v3/product/list', params);
    }
    async getInfoList(params) {
        return this.httpClient.post('/v3/product/info/list', params);
    }
    async getAttributesV4(params) {
        return this.httpClient.post('/v4/product/info/attributes', params);
    }
    async getUploadQuota() {
        return this.httpClient.post('/v4/product/info/limit', {});
    }
    async archive(params) {
        return this.httpClient.post('/v1/product/archive', params);
    }
    async unarchive(params) {
        return this.httpClient.post('/v1/product/unarchive', params);
    }
    async getProductDescription(params) {
        const hasProductId = params.product_id !== undefined;
        const hasOfferId = params.offer_id !== undefined;
        if (!hasProductId && !hasOfferId) {
            throw new Error('Either product_id or offer_id must be provided');
        }
        if (hasProductId && hasOfferId) {
            throw new Error('Cannot provide both product_id and offer_id - use exactly one');
        }
        return this.httpClient.post('/v1/product/info/description', params);
    }
    async updateOfferId(params) {
        const updateItems = params.update_offer_id;
        if (!updateItems || !Array.isArray(updateItems) || updateItems.length === 0) {
            throw new Error('update_offer_id array cannot be empty');
        }
        for (const item of updateItems) {
            if (!item.product_id) {
                throw new Error('product_id is required for each update item');
            }
            if (!item.new_offer_id) {
                throw new Error('new_offer_id is required for each update item');
            }
            if (item.offer_id === item.new_offer_id) {
                throw new Error(`new_offer_id "${item.new_offer_id}" must be different from current offer_id`);
            }
        }
        return this.httpClient.post('/v1/product/update/offer-id', params);
    }
    async getProductListV3(params) {
        return this.getList(params);
    }
    async getProductInfoListV3(params) {
        return this.getInfoList(params);
    }
    async getProductAttributesV4(params) {
        return this.getAttributesV4(params);
    }
    async *iterateProductListV3(params, config = {}) {
        const { maxPages = 100, delayBetweenPages = 0 } = config;
        let pageNumber = 1;
        let lastId;
        while (pageNumber <= maxPages) {
            const pageParams = {
                ...params,
                ...(lastId ? { last_id: lastId } : {})
            };
            const response = await this.getProductListV3(pageParams);
            yield {
                value: response,
                pageNumber,
                totalFetched: pageNumber,
                done: false,
            };
            const result = response.data.result;
            if (!result?.last_id || !result.items || result.items.length === 0) {
                break;
            }
            lastId = result.last_id;
            pageNumber++;
            if (delayBetweenPages > 0) {
                await new Promise(resolve => setTimeout(resolve, delayBetweenPages));
            }
        }
    }
    async getProductDescriptionV1(params) {
        return this.getProductDescription(params);
    }
    async getUploadQuotaV4() {
        return this.getUploadQuota();
    }
    async updateOfferIdV1(params) {
        return this.updateOfferId(params);
    }
    async archiveV1(params) {
        return this.archive(params);
    }
    async unarchiveV1(params) {
        return this.unarchive(params);
    }
}
