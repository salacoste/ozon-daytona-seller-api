## Section 4 — P0 Group: FBS (Part 3 of 4)

Scope: Implement cancel operations, arbitration/awaiting-delivery transitions, pickup code verification, and ETGB retrieval from `methods/01-fbs.json`.

References:
- PRD §6 (P0 groups), Appendix A.1 (FBS)
- File: `api-doc/ozon-api-documentation/methods/01-fbs.json`

Endpoints covered (this batch):
16) POST `/v2/posting/fbs/product/cancel` (operationId: `PostingAPI_CancelFbsPostingProduct`)
17) POST `/v2/posting/fbs/cancel` (operationId: `PostingAPI_CancelFbsPosting`)
18) POST `/v2/posting/fbs/arbitration` (operationId: `PostingAPI_MoveFbsPostingToArbitration`)
19) POST `/v2/posting/fbs/awaiting-delivery` (operationId: `PostingAPI_MoveFbsPostingToAwaitingDelivery`)
20) POST `/v1/posting/fbs/pick-up-code/verify` (operationId: `PostingAPI_PostingFBSPickupCodeVerify`)
21) POST `/v1/posting/global/etgb` (operationId: `PostingAPI_GetEtgb`)

Naming guideline (SDK):
- Namespace: `client.fbs`
- Methods:
  - `cancelPostingProductV2`, `cancelPostingV2`, `moveToArbitrationV2`, `moveToAwaitingDeliveryV2`, `verifyPickupCodeV1`, `getEtgbV1`

### T-140: Types for FBS Part 3 models
- Description: Define/generate types for Part 3 endpoints based on referenced schemas and examples.
- Models (at minimum):
  - `postingPostingProductCancelRequest/Response`, `postingCancelFbsPostingRequest`, `postingBooleanResponse`,
  - `postingMovePostingRequest`, `v2MovePostingToAwaitingDeliveryRequest`,
  - `v1PostingFBSPickupCodeVerifyRequest/Response`,
  - `v1GetEtgbRequest/Response`.
- Deliverables: `src/types/fbs.v3.part3.ts` (≤ 200 LOC; split if needed).
- Acceptance: Public types without `any`; ESLint passes.
- Estimate: 6h

### T-141: `client.fbs.cancelPostingProductV2`
- Description: Cancel selected products within a posting; requires valid `cancel_reason_id`.
- Tests: unit (payload/headers), contract (example).
- Docs: link to obtaining reasons (Part 2) and validation note.
- Estimate: 3h

### T-142: `client.fbs.cancelPostingV2`
- Description: Cancel entire posting (`cancelled` status). Validate `cancel_reason_message` when `cancel_reason_id=402`.
- Tests: unit (conditional field), contract; negative test for missing message with id=402.
- Docs: constraints (cannot cancel conditionally delivered postings).
- Estimate: 4h

### T-143: `client.fbs.moveToArbitrationV2`
- Description: Move posting to `arbitration` if not scanned at sorting center.
- Tests: unit + contract.
- Docs: when to use, state transition note.
- Estimate: 2h

### T-144: `client.fbs.moveToAwaitingDeliveryV2`
- Description: Move postings to `awaiting_deliver` (resolve disputes to shipment).
- Tests: unit + contract.
- Docs: batch behavior and expectations.
- Estimate: 2h

### T-145: `client.fbs.verifyPickupCodeV1`
- Description: Verify courier pickup code for realFBS Express handoff.
- Tests: unit + contract.
- Docs: link to seller knowledge base; security considerations.
- Estimate: 3h

### T-146: `client.fbs.getEtgbV1`
- Description: Retrieve Elektronik Ticaret Gümrük Beyannamesi (ETGB) customs declarations (TR sellers).
- Tests: unit + contract; date range handling.
- Docs: eligibility note (Turkey), example response.
- Estimate: 3h

### T-147: FBS Part 3 Documentation
- Description: Document cancel flows, state transitions, pickup verification, and ETGB usage with concise examples.
- Acceptance: Examples compile; links to official docs included.
- Estimate: 3h

### T-148: FBS Part 3 QA & Lint
- Description: Ensure ≤200 LOC per new file, ESLint passes, coverage for new code ≥ 80% lines.
- Acceptance: CI green for build, lint, test.
- Estimate: 2h

Notes:
- All logs/comments must be ENGLISH.
- Validate business rules client-side where appropriate (e.g., reason message requirement).
- Reuse error normalization and retry/rate limits from core.

Next section to generate after completion:
- Section 5 — P0 Group: FBS (Part 4 of 4): remaining endpoints in `01-fbs.json` (finalize group, docs, and coverage).

---
