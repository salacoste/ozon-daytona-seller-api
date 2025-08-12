## Section 3 — P0 Group: FBS (Part 2 of 4)

Scope: Implement next 9 endpoints from `methods/01-fbs.json` after Part 1.

References:
- PRD §6 (P0 groups), Appendix A.1 (FBS)
- File: `api-doc/ozon-api-documentation/methods/01-fbs.json`

Endpoints covered (next batch):
7) POST `/v2/posting/fbs/product/country/list` (operationId: `PostingAPI_ListCountryProductFbsPostingV2`)
8) POST `/v2/posting/fbs/product/country/set` (operationId: `PostingAPI_SetCountryProductFbsPostingV2`)
9) POST `/v1/posting/fbs/restrictions` (operationId: `PostingAPI_GetRestrictions`)
10) POST `/v2/posting/fbs/package-label` (operationId: `PostingAPI_PostingFBSPackageLabel`) → returns PDF
11) POST `/v1/posting/fbs/package-label/create` (operationId: `PostingAPI_CreateLabelBatch`) [legacy]
12) POST `/v2/posting/fbs/package-label/create` (operationId: `PostingAPI_CreateLabelBatchV2`)
13) POST `/v1/posting/fbs/package-label/get` (operationId: `PostingAPI_GetLabelBatch`)
14) POST `/v1/posting/fbs/cancel-reason` (operationId: `PostingAPI_GetPostingFbsCancelReasonV1`)
15) POST `/v2/posting/fbs/cancel-reason/list` (operationId: `PostingAPI_GetPostingFbsCancelReasonList`)

Naming guideline (SDK):
- Namespace: `client.fbs`
- Methods:
  - `listProductCountryV2`, `setProductCountryV2`, `getRestrictionsV1`,
  - `getPackageLabelPdfV2`, `createLabelBatchV1`, `createLabelBatchV2`, `getLabelBatchV1`,
  - `getCancelReasonV1`, `getCancelReasonListV2`

### T-120: Types for FBS Part 2 models
- Description: Define/generate types for Part 2 endpoints based on referenced schemas and examples.
- Models (at minimum):
  - `v2FbsPostingProductCountryListRequest/Response`, `v2FbsPostingProductCountrySetRequest/Response`,
  - `v1GetRestrictionsRequest/Response`, `postingPostingFBSPackageLabelRequest/Response` (PDF metadata),
  - `v1CreateLabelBatchRequest/Response`, `v2CreateLabelBatchResponse`, `v1GetLabelBatchRequest/Response`,
  - `postingCancelReasonRequest/Response`, `postingCancelReasonListResponse`.
- Deliverables: `src/types/fbs.v3.part2.ts` (≤ 200 LOC; split if needed).
- Acceptance: Public types without `any`; ESLint passes.
- Estimate: 8h

### T-121: `client.fbs.listProductCountryV2`
- Description: Implement country list API with optional name filter.
- Tests: unit (request), contract (example parsing).
- Docs: example usage.
- Estimate: 3h

### T-122: `client.fbs.setProductCountryV2`
- Description: Implement country set API; return payload indicates if GTD needed.
- Tests: unit + contract.
- Docs: example and GTD note.
- Estimate: 3h

### T-123: `client.fbs.getRestrictionsV1`
- Description: Implement posting pickup point restrictions by posting number.
- Tests: unit + contract.
- Docs: example mapping of dimensions/price ranges.
- Estimate: 3h

### T-124: `client.fbs.getPackageLabelPdfV2`
- Description: Implement synchronous PDF label generation for up to 20 postings.
- Requirements: Handle `application/pdf` response (binary/base64), return buffer or stream as option.
- Tests: unit (content-type handling), stub binary fixture; contract (metadata fields).
- Docs: note rFBS/rFBS Express specifics and retry guidance.
- Estimate: 6h

### T-125: `client.fbs.createLabelBatchV1`
- Description: Implement legacy label batch creation; mark as deprecated wrapper.
- Tests: unit + contract.
- Docs: advise using V2 when possible.
- Estimate: 2h

### T-126: `client.fbs.createLabelBatchV2`
- Description: Implement label batch creation V2 that may return multiple tasks (big/small labels).
- Tests: unit + contract.
- Docs: example tasks array and follow-up via `getLabelBatchV1`.
- Estimate: 3h

### T-127: `client.fbs.getLabelBatchV1`
- Description: Implement label batch retrieval returning status or file URL.
- Tests: unit + contract.
- Docs: polling guidance until `status=completed`.
- Estimate: 3h

### T-128: `client.fbs.getCancelReasonV1`
- Description: Implement cancel reasons for specific postings.
- Tests: unit + contract.
- Docs: example; how to pass to cancel operations.
- Estimate: 2h

### T-129: `client.fbs.getCancelReasonListV2`
- Description: Implement cancel reasons list for all postings.
- Tests: unit + contract.
- Docs: example; availability flag meaning.
- Estimate: 2h

### T-130: FBS Part 2 Documentation
- Description: Document Part 2 methods; include PDF handling sample and batch workflow.
- Acceptance: Examples compile; links to official docs included.
- Estimate: 3h

### T-131: FBS Part 2 QA & Lint
- Description: Ensure ≤200 LOC per new file, ESLint passes, coverage for new code ≥ 80% lines.
- Acceptance: CI green for build, lint, test.
- Estimate: 2h

Notes:
- All logs/comments must be ENGLISH.
- For PDF responses, prefer returning `Uint8Array` Buffer in Node; expose helper to save file.
- Respect retries/rate limits; map errors consistently.

Next section to generate after completion:
- Section 4 — P0 Group: FBS (Part 3 of 4): cancel product/posting, arbitration, awaiting delivery, pickup code verify, ETGB, and subsequent endpoints.

---
