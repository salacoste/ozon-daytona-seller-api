## Section 18 — P0 Group: FboSupplyRequest (Part 3 of 3)

Scope: Implement supply-order cancel/cancel-status and content update/update-status from `methods/02-fbosupplyrequest.json`. Finalize FboSupplyRequest group.

References:
- PRD §6 (P0 groups), Appendix A.1 (FboSupplyRequest)
- File: `api-doc/ozon-api-documentation/methods/02-fbosupplyrequest.json`

Endpoints covered (remaining):
16) POST `/v1/supply-order/cancel` (operationId: `SupplyOrderAPI_SupplyOrderCancel`)
17) POST `/v1/supply-order/cancel/status` (operationId: `SupplyOrderAPI_SupplyOrderCancelStatus`)
18) POST `/v1/supply-order/content/update` (operationId: `SupplyOrderAPI_SupplyOrderContentUpdate`)
19) POST `/v1/supply-order/content/update/status` (operationId: `SupplyOrderAPI_SupplyOrderContentUpdateStatus`)

Naming guideline (SDK):
- Namespace: `client.fboSupply`
- Methods: `cancelSupplyOrderV1`, `getCancelSupplyOrderStatusV1`, `updateSupplyOrderContentV1`, `getUpdateSupplyOrderContentStatusV1`

### T-540: Types for FboSupplyRequest Part 3 models
- Description: Define/generate types for cancel and content update flows.
- Models (at minimum):
  - cancel: `v1SupplyOrderCancelRequest`, `v1SupplyOrderCancelResponse`.
  - cancel status: `v1SupplyOrderCancelStatusRequest`, `v1SupplyOrderCancelStatusResponse`.
  - content update: `v1SupplyOrderContentUpdateRequest`, `v1SupplyOrderContentUpdateResponse`.
  - content update status: `v1SupplyOrderContentUpdateStatusRequest`, `v1SupplyOrderContentUpdateStatusResponse`.
- Deliverables: `src/types/fbo-supply.part3.ts` (≤ 200 LOC; split if needed).

### T-541: Implement client.fboSupply.cancelSupplyOrderV1
- Description: Call POST `/v1/supply-order/cancel` to initiate cancellation.
- Validation: require identifiers per schema; confirm irreversible action; support idempotency key if applicable.
- File: `src/apis/fbo-supply.ts`.

### T-542: Implement client.fboSupply.getCancelSupplyOrderStatusV1
- Description: Call POST `/v1/supply-order/cancel/status` to poll cancellation status.
- Validation: require identifiers/operation id; backoff-friendly polling helper (optional separate util).
- File: `src/apis/fbo-supply.ts`.

### T-543: Implement client.fboSupply.updateSupplyOrderContentV1
- Description: Call POST `/v1/supply-order/content/update` to edit bundle content for supply.
- Validation: enforce required fields and limits per schema.
- File: `src/apis/fbo-supply.ts`.

### T-544: Implement client.fboSupply.getUpdateSupplyOrderContentStatusV1
- Description: Call POST `/v1/supply-order/content/update/status` to get edit status.
- Validation: require identifiers/operation id.
- File: `src/apis/fbo-supply.ts`.

### T-545: Unit tests — FboSupplyRequest Part 3 happy-path
- Add MSW/nock mocks for 4 endpoints; verify headers/payloads; decode responses.
- File: `tests/fbo-supply.part3.spec.ts` (≤ 200 LOC; split if needed).

### T-546: Unit tests — validations and edge cases
- cancel: reject missing identifiers; ensure state handling.
- cancel status: polling behavior and terminal states.
- content update: invalid payloads rejected; status shape asserted.
- Map 4xx/5xx to `OzonApiError`.

### T-547: Documentation & Examples
- Extend `docs/groups/fbo-supply.md` with cancellation and content update flows; include polling snippets.
- Examples:
  - `examples/fbo-supply/cancel-supply-order-v1.ts`
  - `examples/fbo-supply/get-cancel-supply-order-status-v1.ts`
  - `examples/fbo-supply/update-supply-order-content-v1.ts`
  - `examples/fbo-supply/get-update-supply-order-content-status-v1.ts`

### T-548: QA and Coverage
- Target ≥ 80% for newly added files.
- Final FboSupplyRequest group checklist (headers, error mapping, binary label download tested) and green CI.

---
