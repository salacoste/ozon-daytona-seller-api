## Section 16 — P0 Group: FboSupplyRequest (Part 1 of 3)

Scope: Implement clusters/warehouses discovery and draft creation flow from `methods/02-fbosupplyrequest.json`.

References:
- PRD §6 (P0 groups), Appendix A.1 (FboSupplyRequest)
- File: `api-doc/ozon-api-documentation/methods/02-fbosupplyrequest.json`

Endpoints covered (first batch):
1) POST `/v1/cluster/list` (operationId: `SupplyDraftAPI_DraftClusterList`)
2) POST `/v1/warehouse/fbo/list` (operationId: `SupplyDraftAPI_DraftGetWarehouseFboList`)
3) POST `/v1/draft/create` (operationId: `SupplyDraftAPI_DraftCreate`)
4) POST `/v1/draft/create/info` (operationId: `SupplyDraftAPI_DraftCreateInfo`)
5) POST `/v1/draft/timeslot/info` (operationId: `SupplyDraftAPI_DraftTimeslotInfo`)
6) POST `/v1/draft/supply/create` (operationId: `SupplyDraftAPI_DraftSupplyCreate`)
7) POST `/v1/draft/supply/create/status` (operationId: `SupplyDraftAPI_DraftSupplyCreateStatus`)

Naming guideline (SDK):
- Namespace: `client.fboSupply`
- Methods: `getClusterListV1`, `getFboWarehousesV1`, `createDraftV1`, `getDraftCreateInfoV1`, `getDraftTimeslotsV1`, `createSupplyFromDraftV1`, `getDraftSupplyCreateStatusV1`

### T-500: Types for FboSupplyRequest Part 1 models
- Description: Define/generate types for the 7 endpoints.
- Models (at minimum):
  - clusters: `v1DraftClusterListRequest`, `v1ClusterType`, `v1DraftClusterListResponse`, `v1DraftClusterListResponseCluster`, `DraftClusterListResponseLogisticCluster`, `v1DraftClusterListResponseWarehouse`.
  - warehouses: `v1DraftGetWarehouseFboListRequest`, `v1CreateType`, `v1DraftGetWarehouseFboListResponse`, `DraftGetWarehouseFboListResponseSearch`, `DraftGetWarehouseFboListResponseCoordinate`, `DraftGetWarehouseFboListResponseWarehouseType`.
  - draft create/info: `v1DraftCreateRequest`, `DraftCreateRequestItem`, `v1DraftCreateResponse`, `v1DraftCreateInfoRequest`, `v1DraftCreateInfoResponse`, `draftv1Cluster`, `draftv1Warehouse`, `v1BundleId`, `v1WarehouseStatus`, `v1WarehouseScoringInvalidReason`, `v1WarehouseScoringStatus`, `v1SupplyWarehouse`, `v1CalculationError`, `v1ItemsValidation`, `v1CalculationStatus`.
  - timeslots: `v1DraftTimeslotInfoRequest`, `v1DraftTimeslotInfoResponse`, `v1DropOffWarehouse`, `v1Day`, `v1DayTimeSlot`.
  - draft supply create/status: `v1DraftSupplyCreateRequest`, `v1DraftSupplyCreateResponse`, `v1DraftSupplyCreateStatusRequest`, `v1DraftSupplyCreateStatusResponse`, `DraftSupplyCreateStatusResponseResult`, `v1DraftSupplyCreateStatus`.
- Deliverables: `src/types/fbo-supply.part1.ts` (≤ 200 LOC; split if needed).

### T-501: Implement client.fboSupply.getClusterListV1
- Description: Call POST `/v1/cluster/list`; typed response with cluster/warehouse descriptions.
- Validation: require `cluster_type`; optional `cluster_ids[]`.
- File: `src/apis/fbo-supply.ts`.

### T-502: Implement client.fboSupply.getFboWarehousesV1
- Description: Call POST `/v1/warehouse/fbo/list`; search drop-off points by `search` and filter by `filter_by_supply_type`.
- Validation: require `search` (≥ 4 chars) and at least one `filter_by_supply_type`.
- File: `src/apis/fbo-supply.ts`.

### T-503: Implement client.fboSupply.createDraftV1
- Description: Call POST `/v1/draft/create` to create draft for DIRECT or CROSSDOCK with items.
- Validation: require `items[]` (≤ 5000) and `type`; for CROSSDOCK require `drop_off_point_warehouse_id`.
- File: `src/apis/fbo-supply.ts`.

### T-504: Implement client.fboSupply.getDraftCreateInfoV1
- Description: Call POST `/v1/draft/create/info` by `operation_id`; returns `draft_id`, clusters, errors, status.
- Validation: require `operation_id`.
- File: `src/apis/fbo-supply.ts`.

### T-505: Implement client.fboSupply.getDraftTimeslotsV1
- Description: Call POST `/v1/draft/timeslot/info` by `draft_id`, `warehouse_ids[]`, `date_from`, `date_to` (≤ 28 days span).
- Validation: require all fields; enforce 10 max `warehouse_ids`.
- File: `src/apis/fbo-supply.ts`.

### T-506: Implement client.fboSupply.createSupplyFromDraftV1
- Description: Call POST `/v1/draft/supply/create` with `draft_id`, `warehouse_id`, optional `timeslot`.
- Validation: require `draft_id`, `warehouse_id`.
- File: `src/apis/fbo-supply.ts`.

### T-507: Implement client.fboSupply.getDraftSupplyCreateStatusV1
- Description: Call POST `/v1/draft/supply/create/status` by `operation_id`; returns order_ids and status.
- Validation: require `operation_id`.
- File: `src/apis/fbo-supply.ts`.

### T-508: Unit tests — FboSupplyRequest Part 1 happy-path
- Add MSW/nock mocks for 7 endpoints; verify headers/payloads; decode responses.
- File: `tests/fbo-supply.part1.spec.ts` (≤ 200 LOC; split if needed).

### T-509: Unit tests — validations and edge cases
- clusters/warehouses: input validation; empty results handling.
- draft create: >5000 items rejected; CROSSDOCK without drop-off point rejected.
- timeslots: period > 28 days rejected; >10 warehouses rejected.
- Map 4xx/5xx to `OzonApiError`.

### T-510: Documentation & Examples
- Add `docs/groups/fbo-supply.md` with flow: discover clusters → search warehouses → create draft → check info → timeslots → create supply → check status.
- Examples:
  - `examples/fbo-supply/get-clusters-v1.ts`
  - `examples/fbo-supply/get-warehouses-v1.ts`
  - `examples/fbo-supply/create-draft-v1.ts`
  - `examples/fbo-supply/get-draft-info-v1.ts`
  - `examples/fbo-supply/get-draft-timeslots-v1.ts`
  - `examples/fbo-supply/create-supply-from-draft-v1.ts`
  - `examples/fbo-supply/get-draft-supply-status-v1.ts`

### T-511: QA and Coverage
- Target ≥ 80% for newly added files.
- Smoke harness guarded by env (skipped in CI).

---
