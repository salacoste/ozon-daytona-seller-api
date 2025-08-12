## Section 17 — P0 Group: FboSupplyRequest (Part 2 of 3)

Scope: Implement cargoes lifecycle and cargo labels from `methods/02-fbosupplyrequest.json`.

References:
- PRD §6 (P0 groups), Appendix A.1 (FboSupplyRequest)
- File: `api-doc/ozon-api-documentation/methods/02-fbosupplyrequest.json`

Endpoints covered (this batch):
8) POST `/v1/cargoes/create` (operationId: `CargoesAPI_CargoesCreate`)
9) POST `/v1/cargoes/create/info` (operationId: `CargoesAPI_CargoesCreateInfo`)
10) POST `/v1/cargoes/delete` (operationId: `CargoesAPI_CargoesDelete`)
11) POST `/v1/cargoes/delete/status` (operationId: `CargoesAPI_CargoesDeleteStatus`)
12) POST `/v1/cargoes/rules/get` (operationId: `CargoesAPI_CargoesRulesGet`)
13) POST `/v1/cargoes-label/create` (operationId: `CargoesAPI_CargoesLabelCreate`)
14) POST `/v1/cargoes-label/get` (operationId: `CargoesAPI_CargoesLabelGet`)
15) GET `/v1/cargoes-label/file/{file_guid}` (operationId: `CargoesAPI_CargoesLabelFile`) → PDF

Naming guideline (SDK):
- Namespace: `client.fboSupply`
- Methods: `cargoesCreateV1`, `cargoesCreateInfoV1`, `cargoesDeleteV1`, `cargoesDeleteStatusV1`, `cargoesRulesGetV1`, `cargoesLabelCreateV1`, `cargoesLabelGetV1`, `cargoesLabelFileV1`

### T-520: Types for FboSupplyRequest Part 2 models
- Description: Define/generate types for cargoes and labels operations.
- Models (at minimum): `v1CargoesCreateRequest`, `v1CargoesCreateResponse`, `v1CargoesCreateInfoRequest`, `v1CargoesCreateInfoResponse`, `v1CargoesDeleteRequest`, `v1CargoesDeleteResponse`, `v1CargoesDeleteStatusRequest`, `v1CargoesDeleteStatusResponse`, `v1CargoesRulesGetRequest`, `v1CargoesRulesGetResponse`, `v1CargoesLabelCreateRequest`, `v1CargoesLabelCreateResponse`, `v1CargoesLabelGetRequest`, `v1CargoesLabelGetResponse`.
- Deliverables: `src/types/fbo-supply.part2.ts` (≤ 200 LOC; split if needed).

### T-521: Implement client.fboSupply.cargoesCreateV1
- Description: Call POST `/v1/cargoes/create` with `supply_id`, `cargoes[]` (≤ 40 pallets or ≤ 30 boxes); optional `delete_current_version`.
- Validation: enforce quantity/type constraints; require `supply_id`.
- File: `src/apis/fbo-supply.ts`.

### T-522: Implement client.fboSupply.cargoesCreateInfoV1
- Description: Call POST `/v1/cargoes/create/info` by `supply_id` or operation parameters; typed response.
- File: `src/apis/fbo-supply.ts`.

### T-523: Implement client.fboSupply.cargoesDeleteV1
- Description: Call POST `/v1/cargoes/delete` with identifiers of cargoes to delete.
- Validation: require target cargo keys; ensure within API limits.
- File: `src/apis/fbo-supply.ts`.

### T-524: Implement client.fboSupply.cargoesDeleteStatusV1
- Description: Call POST `/v1/cargoes/delete/status` to poll deletion status.
- Validation: require identifiers/operation keys.
- File: `src/apis/fbo-supply.ts`.

### T-525: Implement client.fboSupply.cargoesRulesGetV1
- Description: Call POST `/v1/cargoes/rules/get` to fetch FBO cargo rules checklist.
- File: `src/apis/fbo-supply.ts`.

### T-526: Implement client.fboSupply.cargoesLabelCreateV1
- Description: Call POST `/v1/cargoes-label/create` to generate labels for supply cargoes.
- Validation: require supply/cargo identifiers per schema.
- File: `src/apis/fbo-supply.ts`.

### T-527: Implement client.fboSupply.cargoesLabelGetV1
- Description: Call POST `/v1/cargoes-label/get` to retrieve label generation status and file guid.
- File: `src/apis/fbo-supply.ts`.

### T-528: Implement client.fboSupply.cargoesLabelFileV1
- Description: Call GET `/v1/cargoes-label/file/{file_guid}` to download PDF.
- Transport: support binary/PDF response; expose helper to save to disk or return Buffer.
- Files: `src/apis/fbo-supply.ts`, `src/http/binary.ts` (small helper ≤ 200 LOC).

### T-529: Unit tests — FboSupplyRequest Part 2 happy-path
- Add MSW/nock mocks for 7 JSON endpoints; for `file/{file_guid}`, mock binary response.
- Verify headers/payloads; decode responses.
- File: `tests/fbo-supply.part2.spec.ts` (≤ 200 LOC; split if needed).

### T-530: Unit tests — validations and edge cases
- Create: exceed max pallets/boxes rejected; missing `supply_id` rejected.
- Delete: empty targets rejected; status polling shape.
- Labels: missing/invalid file_guid; binary download handled.
- Map 4xx/5xx to `OzonApiError`.

### T-531: Documentation & Examples
- Extend `docs/groups/fbo-supply.md` with cargoes flow and labels download; mention box/pallet constraints and PDF handling.
- Examples:
  - `examples/fbo-supply/cargoes-create-v1.ts`
  - `examples/fbo-supply/cargoes-create-info-v1.ts`
  - `examples/fbo-supply/cargoes-delete-v1.ts`
  - `examples/fbo-supply/cargoes-delete-status-v1.ts`
  - `examples/fbo-supply/cargoes-rules-get-v1.ts`
  - `examples/fbo-supply/cargoes-label-create-v1.ts`
  - `examples/fbo-supply/cargoes-label-get-v1.ts`
  - `examples/fbo-supply/cargoes-label-file-v1.ts`

### T-532: QA and Coverage
- Target ≥ 80% for newly added files.
- Smoke harness guarded by env (skipped in CI).

---
