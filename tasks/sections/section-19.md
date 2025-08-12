## Section 19 — P0 Group: WarehouseAPI (Part 1 of 1)

Scope: Implement warehouse list (FBS/rFBS) and warehouse delivery methods from `methods/23-warehouseapi.json`.

References:
- PRD §6 (P0 groups), Appendix A.1 (WarehouseAPI)
- File: `api-doc/ozon-api-documentation/methods/23-warehouseapi.json`

Endpoints covered:
1) POST `/v1/warehouse/list` (operationId: `WarehouseAPI_WarehouseList`)
2) POST `/v1/delivery-method/list` (operationId: `WarehouseAPI_DeliveryMethodList`)

Naming guideline (SDK):
- Namespace: `client.warehouse`
- Methods: `getWarehouseListV1`, `getDeliveryMethodListV1`

### T-560: Types for WarehouseAPI models
- Description: Define/generate types for the 2 endpoints.
- Models (at minimum):
  - warehouse list: `warehouseWarehouseListResponse` (per spec; response-only, empty request).
  - delivery method list: request/response per spec (adjust names to actual schema IDs in file).
- Deliverables: `src/types/warehouse.part1.ts` (≤ 200 LOC; split if needed).

### T-561: Implement client.warehouse.getWarehouseListV1
- Description: Call POST `/v1/warehouse/list`; typed response with FBS/rFBS warehouses.
- Notes: FBO warehouses fetched via `client.fboSupply.getClusterListV1` (cross-link in docs), not here.
- File: `src/apis/warehouse.ts`.

### T-562: Implement client.warehouse.getDeliveryMethodListV1
- Description: Call POST `/v1/delivery-method/list` to get delivery methods for warehouses.
- File: `src/apis/warehouse.ts`.

### T-563: Unit tests — WarehouseAPI happy-path
- Add MSW/nock mocks for both endpoints; verify headers and decode responses.
- File: `tests/warehouse.part1.spec.ts` (≤ 200 LOC; split if needed).

### T-564: Unit tests — errors and edge cases
- Map 4xx/5xx → `OzonApiError`.
- Ensure unknown/empty lists handled gracefully.

### T-565: Documentation
- Add `docs/groups/warehouse.md` with examples for warehouses list and delivery methods.
- Link to FBO discovery flow in FboSupplyRequest docs.

### T-566: Usage examples (repo)
- `examples/warehouse/get-warehouse-list-v1.ts`
- `examples/warehouse/get-delivery-method-list-v1.ts`

### T-567: QA and Coverage
- Target ≥ 80% for newly added files.
- Manual smoke harness with env-guard (skipped in CI).

---
