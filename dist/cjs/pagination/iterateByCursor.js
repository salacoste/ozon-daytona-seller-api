"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iterateByCursor = iterateByCursor;
exports.collectByCursor = collectByCursor;
exports.collectItemsByCursor = collectItemsByCursor;
const DEFAULT_CONFIG = {
    defaultLimit: 100,
    maxLimit: 1000,
    maxPages: 100,
    delayBetweenPages: 0,
};
async function* iterateByCursor(fetchPage, initialParams, config = {}) {
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
    let cursor = currentParams.cursor;
    while (pageNumber <= finalConfig.maxPages) {
        const pageParams = {
            ...currentParams,
            ...(cursor !== undefined && { cursor }),
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
        const nextCursor = page.result.next_cursor;
        const hasNext = page.result.has_next === true;
        const hasValidCursor = nextCursor && nextCursor.trim().length > 0;
        if (!hasNext || !hasValidCursor) {
            break;
        }
        cursor = nextCursor;
        pageNumber++;
        if (finalConfig.delayBetweenPages > 0) {
            await new Promise(resolve => setTimeout(resolve, finalConfig.delayBetweenPages));
        }
    }
    if (pageNumber > finalConfig.maxPages) {
        throw new Error(`Pagination limit exceeded: fetched ${finalConfig.maxPages} pages`);
    }
}
async function collectByCursor(fetchPage, initialParams, config = {}) {
    const pages = [];
    for await (const page of iterateByCursor(fetchPage, initialParams, config)) {
        pages.push(page.value);
    }
    return pages;
}
async function collectItemsByCursor(fetchPage, initialParams, extractItems, config = {}) {
    const allItems = [];
    for await (const page of iterateByCursor(fetchPage, initialParams, config)) {
        const items = extractItems(page.value);
        allItems.push(...items);
    }
    return allItems;
}
