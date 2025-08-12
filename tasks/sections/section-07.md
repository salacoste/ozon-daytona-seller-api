## Section 7 — P0 Group: FBO (Part 2 of 3)

Scope: Implement timeslot and pass endpoints from `methods/06-fbo.json`.

References:
- PRD §6 (P0 groups), Appendix A.1 (FBO)
- File: `api-doc/ozon-api-documentation/methods/06-fbo.json`

Endpoints covered (this batch):
6) POST `/v1/supply-order/timeslot/get` (operationId: `SupplyOrderAPI_GetSupplyOrderTimeslots`)
7) POST `/v1/supply-order/timeslot/update` (operationId: `SupplyOrderAPI_UpdateSupplyOrderTimeslot`)
8) POST `/v1/supply-order/timeslot/status` (operationId: `SupplyOrderAPI_GetSupplyOrderTimeslotStatus`)
9) POST `/v1/supply-order/pass/create` (operationId: `SupplyOrderAPI_SupplyOrderPassCreate`)
10) POST `/v1/supply-order/pass/status` (operationId: `SupplyOrderAPI_SupplyOrderPassStatus`)

Naming guideline (SDK):
- Namespace: `client.fbo`
- Methods: `getSupplyOrderTimeslotsV1`, `updateSupplyOrderTimeslotV1`, `getSupplyOrderTimeslotStatusV1`, `supplyOrderPassCreateV1`, `getSupplyOrderPassStatusV1`

### T-220: Types for FBO Part 2 models
- Description: Define/generate types for timeslot and pass operations.
- Models (at minimum):
  - timeslot: `v1GetSupplyOrderTimeslotsRequest`, `v1GetSupplyOrderTimeslotsResponse`, `v1SupplyOrderTimeslot`, `v1Timezone`.
  - timeslot update/status: `v1UpdateSupplyOrderTimeslotRequest`, `v1UpdateSupplyOrderTimeslotResponse`, `v1GetSupplyOrderTimeslotStatusRequest`, `v1GetSupplyOrderTimeslotStatusResponse`.
  - pass: `v1SupplyOrderPassCreateRequest`, `v1SupplyOrderPassCreateResponse`, `v1SupplyOrderPassStatusRequest`, `v1SupplyOrderPassStatusResponse`, `v2OrderVehicle`, `v2VehicleInfo`.
- Deliverables: `src/types/fbo.v1.timeslot-pass.ts` (≤ 200 LOC; split if needed).

### T-221: Implement client.fbo.getSupplyOrderTimeslotsV1
- Description: Call POST `/v1/supply-order/timeslot/get`; typed response with `timeslots[]` and `timezone`.
- Validation: require `supply_order_id`.
- File: `src/apis/fbo.ts`.

### T-222: Implement client.fbo.updateSupplyOrderTimeslotV1
- Description: Call POST `/v1/supply-order/timeslot/update`; typed request/response.
- Validation: required fields per schema; guard null/invalid inputs.
- File: `src/apis/fbo.ts`.

### T-223: Implement client.fbo.getSupplyOrderTimeslotStatusV1
- Description: Call POST `/v1/supply-order/timeslot/status`; typed request/response.
- File: `src/apis/fbo.ts`.

### T-224: Implement client.fbo.supplyOrderPassCreateV1
- Description: Call POST `/v1/supply-order/pass/create`; typed request with driver/vehicle data; typed response.
- Validation: require driver_name, driver_phone, vehicle_model, vehicle_number.
- File: `src/apis/fbo.ts`.

### T-225: Implement client.fbo.getSupplyOrderPassStatusV1
- Description: Call POST `/v1/supply-order/pass/status`; typed request/response.
- File: `src/apis/fbo.ts`.

### T-226: Unit tests — FBO Part 2 happy-path
- Add MSW/nock mocks for the 5 endpoints; verify headers `Client-Id`/`Api-Key` and payloads.
- Ensure date-time fields parse as strings and are not mutated.
- File: `tests/fbo.part2.spec.ts` (≤ 200 LOC; split if needed).

### T-227: Unit tests — errors and validations
- 400/403/404/409/500 → `OzonApiError`.
- Missing required inputs → `ValidationError` before HTTP.
- Retries trigger on 5xx and network errors per policy.

### T-228: Documentation
- Add examples to `docs/groups/fbo.md` for: timeslots get/update/status and pass create/status.
- Mention common pitfalls (permissions, invalid supply_order_id, timezone awareness).

### T-229: Usage examples (repo)
- `examples/fbo/get-timeslots-v1.ts`
- `examples/fbo/update-timeslot-v1.ts`
- `examples/fbo/get-timeslot-status-v1.ts`
- `examples/fbo/pass-create-v1.ts`
- `examples/fbo/pass-status-v1.ts`

### T-230: QA and Coverage
- Target ≥ 80% for newly added FBO methods.
- Manual smoke harness guarded by env vars (skipped in CI).

---
