## Section 6 — P0 Group: FBO (Part 1 of 3)

Scope: Implement first 5 endpoints from `methods/06-fbo.json` (total 13). Next parts will continue the group.

References:
- PRD §6 (P0 groups), Appendix A.1 (FBO)
- File: `api-doc/ozon-api-documentation/methods/06-fbo.json`

Endpoints covered (first 5):
1) POST `/v2/posting/fbo/list` (operationId: `PostingAPI_GetFboPostingList`)
2) POST `/v2/posting/fbo/get` (operationId: `PostingAPI_GetFboPosting`)
3) POST `/v1/posting/fbo/cancel-reason/list` (operationId: `PostingAPI_GetPostingFboCancelReasonList`)
4) POST `/v1/supply-order/status/counter` (operationId: `SupplyOrderAPI_SupplyOrderStatusCounter`)
5) POST `/v1/supply-order/bundle` (operationId: `SupplyOrderBundle`)

Naming guideline (SDK):
- Namespace: `client.fbo`
- Methods: `getPostingListV2`, `getPostingV2`, `getPostingCancelReasonListV1`, `getSupplyOrderStatusCounterV1`, `getSupplyOrderBundleV1`

### T-200: Types for FBO Part 1 models
- Description: Define/generate types for requests/responses used by the 5 endpoints.
- Models (at minimum):
  - listing: `postingGetFboPostingListRequest`, `postingGetFboPostingListRequestFilter`, `postingFboPostingWithParams`, `v2FboPostingListResponse`, `v2FboPosting`, `v2PostingProduct`, `v2PostingFinancialData`, `FboPostingFboPostingAnalyticsData`, `v2FboSinglePostingLegalInfo`.
  - single: `postingGetFboPostingRequest`, `v2FboPostingResponse`.
  - cancel reasons: `v1CancelReasonListResponse`, `CancelReasonListResponseCancelReason`.
  - status counter: `commonEmpty`, `v1SupplyOrderStatusCounterResponse`, `v1SupplyOrderStatusCounterResponseItem`, `v1OrderState`.
  - bundle: `v1GetSupplyOrderBundleRequest`, `v1GetSupplyOrderBundleResponse`, `v1ItemResponse`, `GetSupplyOrderBundleRequestItemTagsCalculation`, `v1ItemSortField`.
- Deliverables: `src/types/fbo.v2.part1.ts` (≤ 200 LOC; split into `fbo.v2.part1.a.ts`/`b.ts` if needed).

### T-201: Implement client.fbo.getPostingListV2
- Description: Call POST `/v2/posting/fbo/list` with typed request/response, include optional `with.analytics_data`, `with.financial_data`, `with.legal_info`.
- Validation: require `filter.since`, `filter.to`, `limit` (1..1000), offset ≤ 20000.
- Pagination helper: create `iteratePostingListV2(params)` async iterator using `offset/limit` until empty page.
- Files: `src/apis/fbo.ts` (method), `src/pagination/fboPostingListV2.ts` (iterator; ≤ 200 LOC each).

### T-202: Implement client.fbo.getPostingV2
- Description: Call POST `/v2/posting/fbo/get` by `posting_number`, typed response.
- Validation: require `posting_number` non-empty; support `with` flags.
- File: `src/apis/fbo.ts` (same module, separate exported function).

### T-203: Implement client.fbo.getPostingCancelReasonListV1
- Description: Call POST `/v1/posting/fbo/cancel-reason/list`; no body; typed response array.
- File: `src/apis/fbo.ts`.

### T-204: Implement client.fbo.getSupplyOrderStatusCounterV1
- Description: Call POST `/v1/supply-order/status/counter` with empty body; typed response items with `order_state`, `count`.
- File: `src/apis/fbo.ts`.

### T-205: Implement client.fbo.getSupplyOrderBundleV1 + last_id iterator
- Description: Call POST `/v1/supply-order/bundle` with `bundle_ids`, `limit`, optional `query`, `is_asc`, `sort_field`.
- Iterator: `iterateSupplyOrderBundleV1(request)` using `last_id` until `has_next=false`.
- Files: `src/apis/fbo.ts`, `src/pagination/supplyOrderBundleV1.ts`.

### T-206: Unit tests — FBO Part 1 happy-path
- Add MSW/nock mocks for all 5 endpoints; verify request shape, headers `Client-Id`/`Api-Key`, and response decoding.
- Cover iterator behavior for listing and bundle (multiple pages).
- Files: `tests/fbo.part1.spec.ts` (≤ 200 LOC; split if needed).

### T-207: Unit tests — errors and edge cases
- 400/403/404/409/500 mapped to `OzonApiError` with `rpcStatus` shape where applicable.
- Validation guards (missing required fields) throw `ValidationError` before HTTP.
- Rate-limit and retry behavior verified via injected transport.

### T-208: Documentation
- Add examples to `docs/groups/fbo.md` for: posting list (with pagination), get posting (with flags), cancel reasons, status counter, bundle (with last_id iterator).
- Link from main README P0 overview.

### T-209: Usage examples (repo)
- `examples/fbo/posting-list-v2.ts`
- `examples/fbo/get-posting-v2.ts`
- `examples/fbo/cancel-reason-list-v1.ts`
- `examples/fbo/supply-order-status-counter-v1.ts`
- `examples/fbo/supply-order-bundle-v1.ts`

### T-210: QA and Coverage
- Target ≥ 80% lines/branches for `src/apis/fbo.ts` and iterators in this part.
- Smoke test real-call harness behind env-guard (skipped in CI).

---
