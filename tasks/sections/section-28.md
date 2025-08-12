## Section 28 — P0 Group: ReturnsAPI (Part 1 of 1)

Scope: Implement returns list endpoint from `methods/27-returnsapi.json`.

References:
- PRD §6 (P0 groups), Appendix A.1 (ReturnsAPI)
- File: `api-doc/ozon-api-documentation/methods/27-returnsapi.json`

Endpoints covered:
1) POST `/v1/returns/list` (operationId: `returnsList`)

Naming guideline (SDK):
- Namespace: `client.returns`
- Method: `getReturnsListV1`

### T-730: Types for ReturnsAPI models
- Description: Define/generate types for request/response and nested entities.
- Models (at minimum): `v1GetReturnsListRequest`, `v1GetReturnsListResponse` (+ nested `return` item with product, logistic, storage, visual, place, totals).
- Deliverables: `src/types/returns.part1.ts` (≤ 200 LOC; split if needed).

### T-731: Implement client.returns.getReturnsListV1 + iterator
- Description: Call POST `/v1/returns/list` with filters (dates, warehouse, schema, status, posting_numbers, etc.), `limit`, `last_id`.
- Iterator: `iterateReturnsListV1(params)` using `last_id` until `has_next=false`.
- File: `src/apis/returns.ts`; iterator in `src/pagination/returns.v1.ts`.

### T-732: Unit tests — ReturnsAPI happy-path
- Add MSW/nock mocks for `/v1/returns/list`; verify headers/payloads; decode nested fields; iterate across multiple pages.
- File: `tests/returns.part1.spec.ts` (≤ 200 LOC; split if needed).

### T-733: Unit tests — validations and edge cases
- Validate date ranges and `limit` bounds; handle empty results, unknown statuses; ensure iterator stops when `has_next=false`.
- Map 4xx/5xx to `OzonApiError`.

### T-734: Documentation
- Add `docs/groups/returns.md` with examples: basic filter by date range and warehouse, pagination via iterator, parsing storage/logistic details.

### T-735: Usage examples (repo)
- `examples/returns/get-returns-list-v1.ts`
- `examples/returns/iterate-returns-list-v1.ts`

### T-736: QA and Coverage
- Target ≥ 80% for newly added files.
- Manual smoke harness with env-guard (skipped in CI).

---
