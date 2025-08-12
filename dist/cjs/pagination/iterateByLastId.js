"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iterateByLastId = iterateByLastId;
exports.collectByLastId = collectByLastId;
exports.collectItemsByLastId = collectItemsByLastId;
const DEFAULT_CONFIG = {
    defaultLimit: 100,
    maxLimit: 1000,
    maxPages: 100,
    delayBetweenPages: 0,
};
async function* iterateByLastId(fetchPage, initialParams, config = {}) {
    const finalConfig = { ...DEFAULT_CONFIG, ...config };
    let currentParams = {
        ...initialParams,
        limit: initialParams.limit ?? finalConfig.defaultLimit,
    };
    if (currentParams.limit && currentParams.limit > finalConfig.maxLimit) {
        throw new Error(`Limit ${currentParams.limit} exceeds maximum allowed ${finalConfig.maxLimit}`);
    }
    let pageNumber = 1;
    let totalFetched = 0;
    let lastId = currentParams.last_id;
    while (pageNumber <= finalConfig.maxPages) {
        const pageParams = {
            ...currentParams,
            ...(lastId !== undefined && { last_id: lastId }),
        };
        const page = await fetchPage(pageParams);
        const hasResults = page.result && typeof page.result === 'object';
        if (!hasResults) {
            break;
        }
        yield {
            value: page,
            pageNumber,
            totalFetched: totalFetched + 1,
            done: false,
        };
        totalFetched++;
        const nextLastId = page.result.last_id;
        const hasNext = page.result.has_next === true;
        const hasValidLastId = nextLastId && nextLastId.trim().length > 0;
        if (!hasNext || !hasValidLastId) {
            break;
        }
        lastId = nextLastId;
        pageNumber++;
        if (finalConfig.delayBetweenPages > 0) {
            await new Promise(resolve => setTimeout(resolve, finalConfig.delayBetweenPages));
        }
    }
    if (pageNumber > finalConfig.maxPages) {
        throw new Error(`Pagination limit exceeded: fetched ${finalConfig.maxPages} pages`);
    }
}
async function collectByLastId(fetchPage, initialParams, config = {}) {
    const pages = [];
    for await (const page of iterateByLastId(fetchPage, initialParams, config)) {
        pages.push(page.value);
    }
    return pages;
}
async function collectItemsByLastId(fetchPage, initialParams, extractItems, config = {}) {
    const allItems = [];
    for await (const page of iterateByLastId(fetchPage, initialParams, config)) {
        const items = extractItems(page.value);
        allItems.push(...items);
    }
    return allItems;
}
