## Section 11 — P0 Group: Prices & Stocks (Part 3 of 3)

Scope: Implement discounted info and update discount endpoints from `methods/10-prices-stocksapi.json` and finalize Prices & Stocks group.

References:
- PRD §6 (P0 groups), Appendix A.1 (Prices&StocksAPI)
- File: `api-doc/ozon-api-documentation/methods/10-prices-stocksapi.json`

Endpoints covered (remaining):
8) POST `/v1/product/info/discounted` (operationId: `ProductAPI_GetProductInfoDiscounted`)
9) POST `/v1/product/update/discount` (operationId: `ProductAPI_ProductUpdateDiscount`)

Naming guideline (SDK):
- Namespace: `client.pricesStocks`
- Methods: `getDiscountedInfoV1`, `updateDiscountV1`

### T-340: Types for Prices&Stocks Part 3 models
- Description: Define/generate types for discounted info and update discount flows.
- Models (at minimum): `v1GetProductInfoDiscountedRequest`, `v1GetProductInfoDiscountedResponse` (+ item shape: `discounted_sku`, `sku`, defects/condition fields), `v1ProductUpdateDiscountRequest`, `v1ProductUpdateDiscountResponse`.
- Deliverables: `src/types/prices-stocks.part3.ts` (≤ 200 LOC; split if needed).

### T-341: Implement client.pricesStocks.getDiscountedInfoV1
- Description: Call POST `/v1/product/info/discounted` by `discounted_skus[]`; typed response of items with FBO-only constraint noted.
- Validation: require non-empty `discounted_skus[]` (SKU as numbers/strings per schema).
- File: `src/apis/prices-stocks.ts`.

### T-342: Implement client.pricesStocks.updateDiscountV1
- Description: Call POST `/v1/product/update/discount` to set discount for discounted items (FBS scheme per docs).
- Validation: ensure required fields; guard against invalid ranges per business rules if present; surface API errors.
- File: `src/apis/prices-stocks.ts`.

### T-343: Unit tests — Prices&Stocks Part 3 happy-path
- Add MSW/nock mocks for both endpoints; verify headers and payloads; decode responses.
- File: `tests/prices-stocks.part3.spec.ts` (≤ 200 LOC; split if needed).

### T-344: Unit tests — validations and edge cases
- `getDiscountedInfoV1`: empty `discounted_skus[]` rejected.
- `updateDiscountV1`: invalid payloads rejected; map 4xx/5xx to `OzonApiError`.
- Ensure we reflect scheme constraints (info: FBO-only; update: FBS-only) in docs/messages; API enforces correctness.

### T-345: Documentation
- Extend `docs/groups/prices-stocks.md` with examples for discounted info (FBO) and update discount (FBS), callouts about scheme limitations.

### T-346: Usage examples (repo)
- `examples/prices-stocks/get-discounted-info-v1.ts`
- `examples/prices-stocks/update-discount-v1.ts`

### T-347: QA and Coverage
- Target ≥ 80% for newly added files.
- Final Prices & Stocks group checklist (headers, error mapping, iterators), and green CI.

---
