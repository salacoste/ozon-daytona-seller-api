"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iterateDeliveryMethods = iterateDeliveryMethods;
async function* iterateDeliveryMethods(warehouseAPI, baseParams) {
    let offset = 0;
    let hasMore = true;
    while (hasMore) {
        const response = await warehouseAPI.getDeliveryMethodList({
            ...baseParams,
            offset
        });
        const items = response.data.result || [];
        for (const item of items) {
            yield item;
        }
        hasMore = response.data.has_next || false;
        offset += baseParams.limit || 50;
        if (items.length === 0) {
            break;
        }
    }
}
