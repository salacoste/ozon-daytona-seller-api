## Section 9 — P0 Group: Prices & Stocks (Part 1 of 3)

Scope: Implement core stocks endpoints from `methods/10-prices-stocksapi.json`.

References:
- PRD §6 (P0 groups), Appendix A.1 (Prices&StocksAPI)
- File: `api-doc/ozon-api-documentation/methods/10-prices-stocksapi.json`

Endpoints covered (this batch):
1) POST `/v2/products/stocks` (operationId: `ProductAPI_ProductsStocksV2`) — update stock levels
2) POST `/v4/product/info/stocks` (operationId: `ProductAPI_GetProductInfoStocks`) — get stocks (cursor)
3) POST `/v1/product/info/stocks-by-warehouse/fbs` (operationId: `ProductAPI_ProductStocksByWarehouseFbs`) — FBS/rFBS by-warehouse

Naming guideline (SDK):
- Namespace: `client.pricesStocks`
- Methods: `updateStocksV2`, `getStocksInfoV4`, `getStocksByWarehouseFbsV1`

### T-300: Types for Prices&Stocks Part 1 models
- Description: Define/generate types for requests/responses for the 3 endpoints.
- Models (at minimum):
  - update: `productv2ProductsStocksRequest`, `productv2ProductsStocksRequestStock`, `productv2ProductsStocksResponse`, `productv2ProductsStocksResponseResult`, `productv2ProductsStocksResponseError`.
  - info (cursor): `v4GetProductInfoStocksRequest`, `v4GetProductInfoStocksRequestFilter`, `v4Visibility`, `FilterWithQuant`, `v4GetProductInfoStocksResponse`, `v4GetProductInfoStocksResponseItem`, `GetProductInfoStocksResponseStock`, `StockShipmentType`.
  - by-warehouse: `productsv1GetProductInfoStocksByWarehouseFbsRequest`, `productsv1GetProductInfoStocksByWarehouseFbsResponse`, `productsv1GetProductInfoStocksByWarehouseFbsResponseResult`.
- Deliverables: `src/types/prices-stocks.part1.ts` (≤ 200 LOC; split if needed).

### T-301: Implement client.pricesStocks.updateStocksV2
- Description: Call POST `/v2/products/stocks` with up to 100 stock entries per request; typed response with per-item errors.
- Validation: require each stock entry to have `product_id` or `offer_id`, `stock`, `warehouse_id`; reject >100 items.
- Rate limits: note 80 req/min; do NOT auto-retry 429 with same payload within 30s for same (product, warehouse) pair.
- File: `src/apis/prices-stocks.ts`.

### T-302: Implement client.pricesStocks.getStocksInfoV4 + iterator
- Description: Call POST `/v4/product/info/stocks` with cursor+limit; typed response with `items[]` and `cursor`.
- Iterator: `iterateStocksInfoV4(params)` yielding pages until `cursor` empty; limit 1..1000.
- Filters: support `offer_id[]`, `product_id[]`, `visibility`, `with_quant`.
- Files: `src/apis/prices-stocks.ts`, `src/pagination/prices-stocks.v4.ts`.

### T-303: Implement client.pricesStocks.getStocksByWarehouseFbsV1
- Description: Call POST `/v1/product/info/stocks-by-warehouse/fbs` by `sku[]`; typed response `result[]` with warehouse breakdown.
- Validation: require non-empty `sku[]`.
- File: `src/apis/prices-stocks.ts`.

### T-304: Unit tests — Prices&Stocks Part 1 happy-path
- Add MSW/nock mocks for all 3 endpoints; verify headers and payload shapes.
- Cover iterator behavior for v4 (multiple pages).
- File: `tests/prices-stocks.part1.spec.ts` (≤ 200 LOC; split if needed).

### T-305: Unit tests — errors, limits, throttling
- Validate >100 stocks rejected client-side.
- Handle per-item `errors[]` in updateStocksV2; surface alongside successes.
- Map 4xx/5xx to `OzonApiError`; simulate 429/TOO_MANY_REQUESTS and ensure no blind retry within 30s for same pair.

### T-306: Documentation
- Add examples to `docs/groups/prices-stocks.md` for stocks update, stocks info (with iterator), and by-warehouse FBS.
- Include notes on rate limits, 30s update constraint per (product, warehouse) pair.

### T-307: Usage examples (repo)
- `examples/prices-stocks/update-stocks-v2.ts`
- `examples/prices-stocks/get-stocks-info-v4.ts`
- `examples/prices-stocks/get-stocks-by-warehouse-fbs-v1.ts`

### T-308: QA and Coverage
- Target ≥ 80% for newly added files.
- Manual smoke harness with env-guard (skipped in CI).

---
