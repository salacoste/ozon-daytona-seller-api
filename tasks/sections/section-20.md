## Section 20 — P0 Group: AnalyticsAPI (Part 1 of 1)

Scope: Implement analytics endpoints from `methods/19-analyticsapi.json`.

References:
- PRD §6 (P0 groups), Appendix A.1 (AnalyticsAPI)
- File: `api-doc/ozon-api-documentation/methods/19-analyticsapi.json`

Endpoints covered:
1) POST `/v1/analytics/data` (operationId: `AnalyticsAPI_AnalyticsGetData`)
2) POST `/v2/analytics/stock_on_warehouses` (operationId: `AnalyticsAPI_AnalyticsGetStockOnWarehousesV2`) — deprecated in favor of `/v1/analytics/stocks`
3) POST `/v1/analytics/turnover/stocks` (operationId: `AnalyticsAPI_StocksTurnover`)
4) POST `/v1/analytics/product-queries` (operationId: `AnalyticsAPI_AnalyticsProductQueries`)
5) POST `/v1/analytics/product-queries/details` (operationId: `AnalyticsAPI_AnalyticsProductQueriesDetails`)

Naming guideline (SDK):
- Namespace: `client.analytics`
- Methods: `getDataV1`, `getStockOnWarehousesV2`, `getStocksTurnoverV1`, `getProductQueriesV1`, `getProductQueriesDetailsV1`

### T-580: Types for AnalyticsAPI models
- Description: Define/generate types for the 5 endpoints per schemas in file.
- Models (at minimum): `analyticsAnalyticsGetDataRequest/Response` (+ data row/dimensions), `analyticsStockOnWarehouseRequest/Response`, `v1AnalyticsTurnoverStocksRequest/Response`, `v1AnalyticsProductQueriesRequest/Response`, `v1AnalyticsProductQueriesDetailsRequest/Response`.
- Deliverables: `src/types/analytics.part1.ts` (≤ 200 LOC; split if needed).

### T-581: Implement client.analytics.getDataV1
- Description: Call POST `/v1/analytics/data` with dimensions, metrics, filters, sort, limit/offset.
- Validation: enforce limit 1..1000; metrics up to 14; handle Premium/Premium Plus constraints in docs (SDK does not gate).
- File: `src/apis/analytics.ts`.

### T-582: Implement client.analytics.getStockOnWarehousesV2
- Description: Call POST `/v2/analytics/stock_on_warehouses`; mark as deprecated in docs; provide migration tip to `/v1/analytics/stocks` when available.
- File: `src/apis/analytics.ts`.

### T-583: Implement client.analytics.getStocksTurnoverV1
- Description: Call POST `/v1/analytics/turnover/stocks`; typed response.
- Rate limit: 1 request/min per Client-Id (documented; SDK can optionally throttle with limiter hook).
- File: `src/apis/analytics.ts`.

### T-584: Implement client.analytics.getProductQueriesV1
- Description: Call POST `/v1/analytics/product-queries`; supports date ranges, skus, paging/sorting.
- File: `src/apis/analytics.ts`.

### T-585: Implement client.analytics.getProductQueriesDetailsV1
- Description: Call POST `/v1/analytics/product-queries/details`; typed response; supports `limit_by_sku`, paging, sorting.
- File: `src/apis/analytics.ts`.

### T-586: Unit tests — AnalyticsAPI happy-path
- Add MSW/nock mocks for 5 endpoints; verify headers/payloads; decode responses.
- File: `tests/analytics.part1.spec.ts` (≤ 200 LOC; split if needed).

### T-587: Unit tests — validations and edge cases
- getData: >14 metrics rejected; invalid limit rejected.
- stock_on_warehouses: note deprecation; still functional.
- turnover: ensure 1/minute guard in docs/tests via fake limiter.
- Map 4xx/5xx to `OzonApiError`.

### T-588: Documentation
- Add `docs/groups/analytics.md` with examples for each method, limits, and subscription caveats.

### T-589: Usage examples (repo)
- `examples/analytics/get-data-v1.ts`
- `examples/analytics/get-stock-on-warehouses-v2.ts`
- `examples/analytics/get-stocks-turnover-v1.ts`
- `examples/analytics/get-product-queries-v1.ts`
- `examples/analytics/get-product-queries-details-v1.ts`

### T-590: QA and Coverage
- Target ≥ 80% for newly added files.
- Manual smoke harness with env-guard (skipped in CI).

---
