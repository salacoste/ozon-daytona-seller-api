async function* iterateWithCursor(fetchPage, getCursor, getItems) {
    let cursor = undefined;
    let pageCount = 0;
    const maxPages = 100;
    do {
        pageCount++;
        if (pageCount > maxPages) {
            throw new Error('Pagination safety limit exceeded (100 pages)');
        }
        const response = await fetchPage(cursor);
        const items = getItems(response.data);
        for (const item of items) {
            yield item;
        }
        cursor = getCursor(response.data);
    } while (cursor && cursor.trim().length > 0);
}
export async function* iterateStockInfo(stockOps, params) {
    yield* iterateWithCursor((cursor) => stockOps.getStockInfo({ ...params, ...(cursor && { cursor }) }), (response) => response.cursor, (response) => response.items || []);
}
export async function* iteratePriceInfo(priceOps, params) {
    yield* iterateWithCursor((cursor) => priceOps.getPriceInfo({ ...params, ...(cursor && { cursor }) }), (response) => response.cursor, (response) => response.items || []);
}
