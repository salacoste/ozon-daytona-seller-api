## Section 8 — P0 Group: FBO (Part 3 of 3)

Scope: Implement remaining supply-order list/get and available warehouses endpoints from `methods/06-fbo.json` and finalize FBO group.

References:
- PRD §6 (P0 groups), Appendix A.1 (FBO)
- File: `api-doc/ozon-api-documentation/methods/06-fbo.json`

Endpoints covered (remaining):
11) POST `/v2/supply-order/list` (operationId: `SupplyOrderAPI_GetSupplyOrdersListV2`)
12) POST `/v2/supply-order/get` (operationId: `SupplyOrderAPI_GetSupplyOrdersV2`)
13) GET `/v1/supplier/available_warehouses` (operationId: `SupplierAPI_SupplierAvailableWarehouses`)

Naming guideline (SDK):
- Namespace: `client.fbo`
- Methods: `getSupplyOrdersListV2`, `getSupplyOrdersV2`, `getSupplierAvailableWarehousesV1`

### T-240: Types for FBO Part 3 models
- Description: Define/generate types for supply-order list/get and available warehouses.
- Models (at minimum): `v2GetSupplyOrdersListRequest`, `GetSupplyOrdersListRequestFilter`, `GetSupplyOrdersListRequestPaging`, `v2GetSupplyOrdersListResponse`, `v2GetSupplyOrdersRequest`, `v2GetSupplyOrdersResponse`, `v2Order`, `v2State`, `v2OrderSupply`, `v2Supply_state`, `v2OrderTimeslot`, `v2TimeslotZonedMessage`, `v2Timeslot`, `v2Timezone`, `v2OrderVehicle`, `v2VehicleInfo`, `v2Warehouse`, `v1SupplierAvailableWarehousesResponse`.
- Deliverables: `src/types/fbo.v2.part3.ts` (≤ 200 LOC; split if needed).

### T-241: Implement client.fbo.getSupplyOrdersListV2 + iterator
- Description: Call POST `/v2/supply-order/list` with `filter.states[]` and `paging.from_supply_order_id/limit`.
- Iterator: `iterateSupplyOrdersListV2(params)` using `last_supply_order_id` to advance until no new ids.
- Files: `src/apis/fbo.ts`, `src/pagination/supplyOrdersListV2.ts` (≤ 200 LOC each).

### T-242: Implement client.fbo.getSupplyOrdersV2
- Description: Call POST `/v2/supply-order/get` by `order_ids[]`; return detailed `orders[]` and `warehouses[]`.
- Validation: require non-empty `order_ids`.
- File: `src/apis/fbo.ts`.

### T-243: Implement client.fbo.getSupplierAvailableWarehousesV1
- Description: Call GET `/v1/supplier/available_warehouses`; typed response with load info.
- File: `src/apis/fbo.ts`.

### T-244: Unit tests — FBO Part 3 happy-path
- Add MSW/nock mocks for 3 endpoints; verify headers and request/response mapping.
- Cover iterator behavior for list (multiple pages).
- File: `tests/fbo.part3.spec.ts` (≤ 200 LOC; split if needed).

### T-245: Unit tests — errors and validations
- 4xx/5xx mapping to `OzonApiError`.
- Validation guards: empty `order_ids`, invalid paging.
- Retry policy assertions on 5xx/network errors.

### T-246: Documentation
- Extend `docs/groups/fbo.md` with examples for list (with iterator), get (details), and available warehouses.
- Link to P0 overview and cross-reference timeslots/pass sections.

### T-247: Usage examples (repo)
- `examples/fbo/get-supply-orders-list-v2.ts`
- `examples/fbo/get-supply-orders-v2.ts`
- `examples/fbo/get-available-warehouses-v1.ts`

### T-248: QA and Coverage
- Target ≥ 80% for newly added methods.
- Final FBO group sanity checklist (headers, error mapping, iterators) and green CI.

---
