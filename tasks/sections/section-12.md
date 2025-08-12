## Section 12 — P0 Group: ProductAPI (Part 1 of 4)

Scope: Implement import flows (create/update), import status, import-by-sku, attributes update, and pictures import from `methods/03-productapi.json`.

References:
- PRD §6 (P0 groups), Appendix A.1 (ProductAPI)
- File: `api-doc/ozon-api-documentation/methods/03-productapi.json`

Endpoints covered (this batch):
1) POST `/v3/product/import` (operationId: `ProductAPI_ImportProductsV3`)
2) POST `/v1/product/import/info` (operationId: `ProductAPI_GetImportProductsInfo`)
3) POST `/v1/product/import-by-sku` (operationId: `ProductAPI_ImportProductsBySKU`)
4) POST `/v1/product/attributes/update` (operationId: `ProductAPI_ProductUpdateAttributes`)
5) POST `/v1/product/pictures/import` (operationId: `ProductAPI_ProductImportPictures`)

Naming guideline (SDK):
- Namespace: `client.product`
- Methods: `importProductsV3`, `getImportInfoV1`, `importBySkuV1`, `updateAttributesV1`, `importPicturesV1`

### T-400: Types for ProductAPI Part 1 models
- Description: Define/generate types for the 5 endpoints.
- Models (at minimum):
  - import v3: `v3ImportProductsRequest`, `v3ImportProductsResponse`.
  - import info: `productGetImportProductsInfoRequest`, `productGetImportProductsInfoResponse` (+ result item shape with `status`, `errors[]`).
  - import by SKU: `productImportProductsBySKURequest`, `productImportProductsBySKUResponse`.
  - update attributes: `v1ProductUpdateAttributesRequest`, `v1ProductUpdateAttributesResponse`.
  - pictures import: `productv1ProductImportPicturesRequest`, `productv1ProductInfoPicturesResponse`.
- Deliverables: `src/types/product.part1.ts` (≤ 200 LOC; split if needed).

### T-401: Implement client.product.importProductsV3
- Description: Call POST `/v3/product/import` with up to 100 items; returns `task_id`.
- Validation: enforce required fields per category where possible; validate dimensions (`depth`, `width`, `height`, `weight`) > 0; currency per account.
- Note: include support for `complex_attributes` (video), `images`, `images360`, `color_image`, `pdf_list`, `promotions`.
- File: `src/apis/product.ts`.

### T-402: Implement client.product.getImportInfoV1
- Description: Call POST `/v1/product/import/info` with `task_id`; returns `items[]` and `total`.
- File: `src/apis/product.ts`.

### T-403: Implement client.product.importBySkuV1
- Description: Call POST `/v1/product/import-by-sku` to create product copy by SKU.
- Validation: accept only creation (no update via this endpoint); enforce item fields (`sku`, `offer_id` or price fields as needed).
- File: `src/apis/product.ts`.

### T-404: Implement client.product.updateAttributesV1
- Description: Call POST `/v1/product/attributes/update`; creates task to update product attributes.
- Validation: ensure identifiers and attribute payload format.
- File: `src/apis/product.ts`.

### T-405: Implement client.product.importPicturesV1
- Description: Call POST `/v1/product/pictures/import` to set full images set; replaces previous images.
- Validation: enforce JPG/PNG URLs; up to 15 images; order preserved; support `images360`, `color_image`.
- File: `src/apis/product.ts`.

### T-406: Unit tests — ProductAPI Part 1 happy-path
- Add MSW/nock mocks for 5 endpoints; verify headers and payloads; decode responses.
- Ensure import v3 accepts media/video fields and returns `task_id`.
- File: `tests/product.part1.spec.ts` (≤ 200 LOC; split if needed).

### T-407: Unit tests — validations and edge cases
- import v3: >100 items rejected; zero/negative dimensions rejected; currency mismatch simulation.
- import-by-sku: only creation; reject updates; handle `unmatched_sku_list`.
- pictures import: rejects invalid URLs or >15 images; order preserved.
- Map 4xx/5xx to `OzonApiError`.

### T-408: Documentation
- Add examples to `docs/groups/product.md` for import v3 (with media), import status, import-by-sku, update attributes, pictures import (callouts: full replace).

### T-409: Usage examples (repo)
- `examples/product/import-v3.ts`
- `examples/product/get-import-info-v1.ts`
- `examples/product/import-by-sku-v1.ts`
- `examples/product/update-attributes-v1.ts`
- `examples/product/import-pictures-v1.ts`

### T-410: QA and Coverage
- Target ≥ 80% for newly added files.
- Manual smoke harness with env-guard (skipped in CI).

---
