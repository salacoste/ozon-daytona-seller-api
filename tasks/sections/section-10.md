## Section 10 — P0 Group: Prices & Stocks (Part 2 of 3)

Scope: Implement prices import, action timer (update/status), and price info v5 from `methods/10-prices-stocksapi.json`.

References:
- PRD §6 (P0 groups), Appendix A.1 (Prices&StocksAPI)
- File: `api-doc/ozon-api-documentation/methods/10-prices-stocksapi.json`

Endpoints covered (this batch):
4) POST `/v1/product/import/prices` (operationId: `ProductAPI_ImportProductsPrices`)
5) POST `/v1/product/action/timer/update` (operationId: `ProductAPI_ActionTimerUpdate`)
6) POST `/v1/product/action/timer/status` (operationId: `ProductAPI_ActionTimerStatus`)
7) POST `/v5/product/info/prices` (operationId: `ProductAPI_GetProductInfoPrices`)

Naming guideline (SDK):
- Namespace: `client.pricesStocks`
- Methods: `importPricesV1`, `updateActionTimerV1`, `getActionTimerStatusV1`, `getPriceInfoV5`

### T-320: Types for Prices&Stocks Part 2 models
- Description: Define/generate types for requests/responses for the 4 endpoints.
- Models (at minimum):
  - import prices: `productImportProductsPricesRequest`, `productImportProductsPricesRequestPrice`, `productImportProductsPricesResponse`, `productImportProductsPricesResponseProcessResult`, `productImportProductsPricesResponseError`.
  - action timer: `v1ProductActionTimerUpdateRequest`, `v1ProductActionTimerUpdateResponse`, `v1ProductActionTimerStatusRequest`, `v1ProductActionTimerStatusResponse`, `v1ProductActionTimerStatusResponseStatuses`.
  - price info v5 (cursor): `productv5GetProductInfoPricesV5Request`, `productv5Filter`, `productv5GetProductListRequestFilterFilterVisibility`, `productv5GetProductInfoPricesV5Response` (+ nested pricing/commissions models).
- Deliverables: `src/types/prices-stocks.part2.ts` (≤ 200 LOC; split if needed).

### T-321: Implement client.pricesStocks.importPricesV1
- Description: Call POST `/v1/product/import/prices` with up to 1000 `prices[]`; typed per-item result with `errors[]`.
- Validation: each price item must include either `offer_id` or `product_id`, plus `price` or `old_price` rules; enforce delta rules between `price` and `old_price` per docs.
- Flags: support `auto_action_enabled`, `auto_add_to_ozon_actions_list_enabled`, `price_strategy_enabled`, `min_price`, `vat`.
- File: `src/apis/prices-stocks.ts`.

### T-322: Implement client.pricesStocks.updateActionTimerV1
- Description: Call POST `/v1/product/action/timer/update`; typed response.
- Validation: require non-empty `product_ids[]`.
- File: `src/apis/prices-stocks.ts`.

### T-323: Implement client.pricesStocks.getActionTimerStatusV1
- Description: Call POST `/v1/product/action/timer/status`; typed response with `statuses[]` including `expired_at` and `min_price_for_auto_actions_enabled`.
- Validation: require non-empty `product_ids[]`.
- File: `src/apis/prices-stocks.ts`.

### T-324: Implement client.pricesStocks.getPriceInfoV5 + iterator
- Description: Call POST `/v5/product/info/prices` with cursor+limit; typed response with pricing, commissions, indexes.
- Iterator: `iteratePriceInfoV5(params)` paginating by `cursor` until empty; limit 1..1000.
- Filters: support `offer_id[]`, `product_id[]`, `visibility`.
- Files: `src/apis/prices-stocks.ts`, `src/pagination/prices.v5.ts`.

### T-325: Unit tests — Prices&Stocks Part 2 happy-path
- Add MSW/nock mocks for all 4 endpoints; verify headers and payloads.
- Cover iterator behavior for v5 (multiple pages).
- File: `tests/prices-stocks.part2.spec.ts` (≤ 200 LOC; split if needed).

### T-326: Unit tests — validations and edge cases
- Import: validate delta rules (`price` vs `old_price`), VAT values, min price constraints.
- Action timer: empty `product_ids[]` rejected.
- Map 4xx/5xx to `OzonApiError`; handle per-item `errors[]` in import.

### T-327: Documentation
- Add examples to `docs/groups/prices-stocks.md` for prices import, action timer update/status, and price info v5 (with iterator).
- Include pricing delta rules table and common failure reasons.

### T-328: Usage examples (repo)
- `examples/prices-stocks/import-prices-v1.ts`
- `examples/prices-stocks/update-action-timer-v1.ts`
- `examples/prices-stocks/get-action-timer-status-v1.ts`
- `examples/prices-stocks/get-price-info-v5.ts`

### T-329: QA and Coverage
- Target ≥ 80% for newly added files.
- Manual smoke harness with env-guard (skipped in CI).

---
