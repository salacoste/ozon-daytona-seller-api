"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iterateByOffset = iterateByOffset;
exports.collectByOffset = collectByOffset;
exports.collectItemsByOffset = collectItemsByOffset;
const DEFAULT_CONFIG = {
    defaultLimit: 100,
    maxLimit: 1000,
    maxPages: 100,
    delayBetweenPages: 0,
};
async function* iterateByOffset(fetchPage, initialParams, config = {}) {
    const finalConfig = { ...DEFAULT_CONFIG, ...config };
    const limit = initialParams.limit ?? finalConfig.defaultLimit;
    if (limit > finalConfig.maxLimit) {
        throw new Error(`Limit ${limit} exceeds maximum allowed ${finalConfig.maxLimit}`);
    }
    let pageNumber = 1;
    let totalFetched = 0;
    let offset = initialParams.offset ?? 0;
    let totalItems;
    while (pageNumber <= finalConfig.maxPages) {
        const pageParams = {
            ...initialParams,
            limit,
            offset,
        };
        const page = await fetchPage(pageParams);
        const hasResults = page.result && typeof page.result === 'object';
        if (!hasResults) {
            break;
        }
        if (pageNumber === 1 && page.result.total !== undefined) {
            totalItems = page.result.total;
        }
        yield {
            value: page,
            pageNumber,
            totalFetched: totalFetched + 1,
            done: false,
        };
        totalFetched++;
        const hasNext = page.result.has_next === true;
        if (page.result.has_next === false) {
            break;
        }
        if (totalItems !== undefined && offset + limit >= totalItems) {
            break;
        }
        let hasItems = false;
        if (typeof page.result === 'object' && page.result !== null) {
            const arrayProperties = Object.values(page.result).filter(value => Array.isArray(value));
            if (arrayProperties.length > 0) {
                hasItems = arrayProperties.some(arr => arr.length > 0);
            }
            else {
                hasItems = hasNext !== false;
            }
        }
        if (!hasItems) {
            break;
        }
        offset += limit;
        pageNumber++;
        if (finalConfig.delayBetweenPages > 0) {
            await new Promise(resolve => setTimeout(resolve, finalConfig.delayBetweenPages));
        }
    }
    if (pageNumber > finalConfig.maxPages) {
        throw new Error(`Pagination limit exceeded: fetched ${finalConfig.maxPages} pages`);
    }
}
async function collectByOffset(fetchPage, initialParams, config = {}) {
    const pages = [];
    for await (const page of iterateByOffset(fetchPage, initialParams, config)) {
        pages.push(page.value);
    }
    return pages;
}
async function collectItemsByOffset(fetchPage, initialParams, extractItems, config = {}) {
    const allItems = [];
    for await (const page of iterateByOffset(fetchPage, initialParams, config)) {
        const items = extractItems(page.value);
        allItems.push(...items);
    }
    return allItems;
}
