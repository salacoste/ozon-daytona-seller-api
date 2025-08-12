## Section 29 — P0 Group: DeliveryFBS (Part 1 of 2)

Scope: Implement carriage lifecycle and availability endpoints from `methods/04-deliveryfbs.json`.

References:
- PRD §6 (P0 groups), Appendix A.1 (DeliveryFBS)
- File: `api-doc/ozon-api-documentation/methods/04-deliveryfbs.json`

Endpoints covered (carriage lifecycle):
1) POST `/v1/carriage/create` (operationId: `CarriageAPI_CarriageCreate`)
2) POST `/v1/carriage/approve` (operationId: `CarriageAPI_CarriageApprove`)
3) POST `/v1/carriage/set-postings` (operationId: `CarriageAPI_SetPostings`)
4) POST `/v1/carriage/cancel` (operationId: `CarriageAPI_CarriageCancel`)
5) POST `/v1/carriage/get` (operationId: `CarriageAPI_CarriageGet`)
6) POST `/v1/posting/carriage-available/list` (operationId: `PostingAPI_PostingFBSCarriageAvailableList`)
7) POST `/v1/carriage/delivery/list` (operationId: `CarriageAPI_CarriageDeliveryList`)
8) POST `/v1/posting/fbs/split` (operationId: `PostingAPI_PostingFBSSplit`)

Naming guideline (SDK):
- Namespace: `client.deliveryFbs`
- Methods: `carriageCreateV1`, `carriageApproveV1`, `carriageSetPostingsV1`, `carriageCancelV1`, `carriageGetV1`, `listCarriageAvailablePostingsV1`, `listCarriageDeliveryV1`, `splitPostingFbsV1`

### T-740: Types for DeliveryFBS Part 1 models
- Description: Define/generate types for carriage lifecycle and availability endpoints.
- Models (at minimum): `v1CarriageCreateRequest/Response`, `v1CarriageApproveRequest/Response`, `v1CarriageSetPostingsRequest/Response`, `v1CarriageCancelRequest/Response`, `v1CarriageGetRequest/Response`, `v1PostingCarriageAvailableListRequest/Response`, `v1CarriageDeliveryListRequest/Response`, `v1PostingFBSSplitRequest/Response` (exact IDs per file).
- Deliverables: `src/types/delivery-fbs.part1.ts` (≤ 200 LOC; split if needed).

### T-741: Implement client.deliveryFbs.carriageCreateV1
- Description: Call POST `/v1/carriage/create`; creates first shipment with all ready postings; returns carriage info (status `new`).
- File: `src/apis/delivery-fbs.ts`.

### T-742: Implement client.deliveryFbs.carriageApproveV1
- Description: Call POST `/v1/carriage/approve`; confirms shipment; after this, acts/barcodes can be requested.
- File: `src/apis/delivery-fbs.ts`.

### T-743: Implement client.deliveryFbs.carriageSetPostingsV1
- Description: Call POST `/v1/carriage/set-postings` to rewrite postings for `new` carriage.
- File: `src/apis/delivery-fbs.ts`.

### T-744: Implement client.deliveryFbs.carriageCancelV1
- Description: Call POST `/v1/carriage/cancel` to cancel shipment.
- File: `src/apis/delivery-fbs.ts`.

### T-745: Implement client.deliveryFbs.carriageGetV1
- Description: Call POST `/v1/carriage/get` to get carriage details.
- File: `src/apis/delivery-fbs.ts`.

### T-746: Implement client.deliveryFbs.listCarriageAvailablePostingsV1
- Description: Call POST `/v1/posting/carriage-available/list` to list postings available for carriage.
- File: `src/apis/delivery-fbs.ts`.

### T-747: Implement client.deliveryFbs.listCarriageDeliveryV1
- Description: Call POST `/v1/carriage/delivery/list` to list deliveries.
- File: `src/apis/delivery-fbs.ts`.

### T-748: Implement client.deliveryFbs.splitPostingFbsV1
- Description: Call POST `/v1/posting/fbs/split` to split posting per schema rules.
- File: `src/apis/delivery-fbs.ts`.

### T-749: Unit tests — DeliveryFBS Part 1 happy-path
- Add MSW/nock mocks for endpoints; verify headers/payloads; decode responses.
- File: `tests/delivery-fbs.part1.spec.ts` (≤ 200 LOC; split if needed).

### T-750: Unit tests — validations and edge cases
- Create: ensure status `new`; Set-postings: only for `new`; Cancel flow; Split constraints.
- Map 4xx/5xx to `OzonApiError`.

### T-751: Documentation
- Add `docs/groups/delivery-fbs.md` (part 1) with examples: create → set-postings → approve → get; available postings; delivery list; split posting.

### T-752: Usage examples (repo)
- `examples/delivery-fbs/carriage-create-v1.ts`
- `examples/delivery-fbs/carriage-approve-v1.ts`
- `examples/delivery-fbs/carriage-set-postings-v1.ts`
- `examples/delivery-fbs/carriage-cancel-v1.ts`
- `examples/delivery-fbs/carriage-get-v1.ts`
- `examples/delivery-fbs/carriage-available-list-v1.ts`
- `examples/delivery-fbs/carriage-delivery-list-v1.ts`
- `examples/delivery-fbs/split-posting-fbs-v1.ts`

### T-753: QA and Coverage
- Target ≥ 80% for newly added files.
- Manual smoke harness with env-guard (skipped in CI).

---
