## Section 27 — P0 Group: CancellationAPI (Part 1 of 1)

Scope: Implement conditional cancellation endpoints from `methods/18-cancellationapi.json`.

References:
- PRD §6 (P0 groups), Appendix A.1 (CancellationAPI)
- File: `api-doc/ozon-api-documentation/methods/18-cancellationapi.json`

Endpoints covered:
1) POST `/v1/conditional-cancellation/get` (operationId: per spec)
2) POST `/v2/conditional-cancellation/list` (operationId: per spec)
3) POST `/v1/conditional-cancellation/list` (operationId: per spec)
4) POST `/v2/conditional-cancellation/approve` (operationId: per spec)
5) POST `/v1/conditional-cancellation/approve` (operationId: per spec)
6) POST `/v2/conditional-cancellation/reject` (operationId: per spec)
7) POST `/v1/conditional-cancellation/reject` (operationId: per spec)

Naming guideline (SDK):
- Namespace: `client.cancellation`
- Methods: `getConditionalCancellationV1`, `listConditionalCancellationsV2`, `listConditionalCancellationsV1`, `approveConditionalCancellationV2`, `approveConditionalCancellationV1`, `rejectConditionalCancellationV2`, `rejectConditionalCancellationV1`

### T-720: Types for CancellationAPI models
- Description: Define/generate types for get/list/approve/reject (v1/v2) per file.
- Models (indicative): `v1ConditionalCancellationGetRequest/Response`, `v2ConditionalCancellationListRequest/Response`, `v1ConditionalCancellationListRequest/Response`, `v2ConditionalCancellationApproveRequest/Response`, `v1ConditionalCancellationApproveRequest/Response`, `v2ConditionalCancellationRejectRequest/Response`, `v1ConditionalCancellationRejectRequest/Response`.
- Deliverables: `src/types/cancellation.part1.ts` (≤ 200 LOC; split if needed).

### T-721: Implement client.cancellation.getConditionalCancellationV1
- Description: Call POST `/v1/conditional-cancellation/get` to retrieve specific conditional cancellation details.
- Validation: require identifiers per schema.
- File: `src/apis/cancellation.ts`.

### T-722: Implement client.cancellation.listConditionalCancellationsV2 and listConditionalCancellationsV1
- Description: Call POST `/v2/conditional-cancellation/list` and `/v1/conditional-cancellation/list`; prefer V2 in examples.
- File: `src/apis/cancellation.ts`.

### T-723: Implement client.cancellation.approveConditionalCancellationV2 and approveConditionalCancellationV1
- Description: Call POST `/v2/conditional-cancellation/approve` and `/v1/conditional-cancellation/approve`.
- Validation: require reason/ids per schema; ensure idempotency where applicable.
- File: `src/apis/cancellation.ts`.

### T-724: Implement client.cancellation.rejectConditionalCancellationV2 and rejectConditionalCancellationV1
- Description: Call POST `/v2/conditional-cancellation/reject` and `/v1/conditional-cancellation/reject`.
- File: `src/apis/cancellation.ts`.

### T-725: Unit tests — CancellationAPI happy-path
- Add MSW/nock mocks for all 7 endpoints; verify headers/payloads; decode responses.
- File: `tests/cancellation.part1.spec.ts` (≤ 200 LOC; split if needed).

### T-726: Unit tests — validations and edge cases
- Get/list: invalid identifiers or filters.
- Approve/reject: missing reason/ids; verify state transitions.
- Map 4xx/5xx to `OzonApiError`.

### T-727: Documentation
- Add `docs/groups/cancellation.md` with examples for get/list (prefer V2) and approve/reject flows.

### T-728: Usage examples (repo)
- `examples/cancellation/get-conditional-cancellation-v1.ts`
- `examples/cancellation/list-conditional-cancellations-v2.ts`
- `examples/cancellation/approve-conditional-cancellation-v2.ts`
- `examples/cancellation/reject-conditional-cancellation-v2.ts`

### T-729: QA and Coverage
- Target ≥ 80% for newly added files.
- Manual smoke harness with env-guard (skipped in CI).

---
