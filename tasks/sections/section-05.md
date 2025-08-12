## Section 5 — P0 Group: FBS (Part 4 of 4)

Scope: Implement remaining endpoint(s) and finalize FBS group (docs, iterators, QA, coverage).

References:
- PRD §6 (P0 groups), Appendix A.1 (FBS)
- File: `api-doc/ozon-api-documentation/methods/01-fbs.json`

Endpoints covered (remaining):
22) POST `/v1/posting/unpaid-legal/product/list` (operationId: `PostingAPI_UnpaidLegalProductList`)

Naming guideline (SDK):
- Namespace: `client.fbs`
- Method: `getUnpaidLegalProductListV1`

### T-160: Types for FBS Part 4 models
- Description: Define/generate types for unpaid legal product list with cursor pagination.
- Models (at minimum): `v1PostingUnpaidLegalProductListRequest/Response`.
- Deliverables: `src/types/fbs.v3.part4.ts` (≤ 200 LOC).
- Acceptance: Public types without `any`; ESLint passes.
- Estimate: 2h

### T-161: `client.fbs.getUnpaidLegalProductListV1`
- Description: Implement cursor-based paginator for unpaid legal products.
- Extras: Provide iterator `iterateUnpaidLegalProducts(params)` using `iterateByCursor`.
- Tests: unit (request, cursor handling), contract (example parsing).
- Docs: usage with cursor; note legal-entity context.
- Estimate: 4h

### T-162: FBS Documentation consolidation
- Description: Consolidate FBS docs across Parts 1–4:
  - Overview table (method → path → SDK name)
  - Pagination patterns (offset/has_next/cursor)
  - PDF handling patterns and batch flow
  - Cancel flow and reason acquisition
- Acceptance: Examples compile; links to docs and operationIds included.
- Estimate: 3h

### T-163: FBS Iterators review
- Description: Ensure all exposed iterators exist and are tested:
  - `iterateUnfulfilledV3`, `iterateListV3`, `iterateUnpaidLegalProducts`
- Acceptance: Unit tests green; edge cases covered (empty pages, final page).
- Estimate: 2h

### T-164: FBS QA & Coverage
- Description: Ensure ≤200 LOC/file, lint/type-check green, and coverage ≥ 80% for FBS code.
- Acceptance: CI status green; coverage report meets threshold.
- Estimate: 2h

Notes:
- All logs/comments must be ENGLISH.
- Reuse core error handling and rate/retry policies.
- For iterators, document backoff guidance if rate-limited.

---
