## Section 14 — P0 Group: ProductAPI (Part 3 of 4)

Scope: Implement product description, upload quota (limits), update offer-id, archive, and unarchive from `methods/03-productapi.json`.

References:
- PRD §6 (P0 groups), Appendix A.1 (ProductAPI)
- File: `api-doc/ozon-api-documentation/methods/03-productapi.json`

Endpoints covered (this batch):
9) POST `/v1/product/info/description` (operationId: `ProductAPI_GetProductInfoDescription`)
10) POST `/v4/product/info/limit` (operationId: `ProductAPI_GetUploadQuota`)
11) POST `/v1/product/update/offer-id` (operationId: `ProductAPI_ProductUpdateOfferId`)
12) POST `/v1/product/archive` (operationId: `ProductAPI_ProductArchive`)
13) POST `/v1/product/unarchive` (operationId: `ProductAPI_ProductUnarchive`)

Naming guideline (SDK):
- Namespace: `client.product`
- Methods: `getProductDescriptionV1`, `getUploadQuotaV4`, `updateOfferIdV1`, `archiveV1`, `unarchiveV1`

### T-430: Types for ProductAPI Part 3 models
- Description: Define/generate types for the 5 endpoints.
- Models (at minimum):
  - description: `productGetProductInfoDescriptionRequest`, `productGetProductInfoDescriptionResponse`.
  - upload quota: `productv4GetUploadQuotaRequest` (if any) or empty body, `productv4GetUploadQuotaResponse` (fields per spec).
  - update offer-id: `v1ProductUpdateOfferIdRequest`, `v1ProductUpdateOfferIdResponse`.
  - archive/unarchive: `v1ProductArchiveRequest`, `v1ProductArchiveResponse`, `v1ProductUnarchiveRequest`, `v1ProductUnarchiveResponse`.
- Deliverables: `src/types/product.part3.ts` (≤ 200 LOC; split if needed).

### T-431: Implement client.product.getProductDescriptionV1
- Description: Call POST `/v1/product/info/description` with either `offer_id` or `product_id`; typed response.
- Validation: require exactly one identifier; reject both/none.
- File: `src/apis/product.ts`.

### T-432: Implement client.product.getUploadQuotaV4
- Description: Call POST `/v4/product/info/limit` to get current daily limits for product uploads/updates.
- Validation: empty body if required by spec.
- File: `src/apis/product.ts`.

### T-433: Implement client.product.updateOfferIdV1
- Description: Call POST `/v1/product/update/offer-id` to change product `offer_id`.
- Validation: require `product_id` and new `offer_id`; ensure no-ops prevented.
- File: `src/apis/product.ts`.

### T-434: Implement client.product.archiveV1
- Description: Call POST `/v1/product/archive` to archive products.
- Validation: require identifiers list; enforce size limits per spec.
- File: `src/apis/product.ts`.

### T-435: Implement client.product.unarchiveV1
- Description: Call POST `/v1/product/unarchive` to unarchive products.
- Validation: require identifiers list; enforce size limits per spec.
- File: `src/apis/product.ts`.

### T-436: Unit tests — ProductAPI Part 3 happy-path
- Add MSW/nock mocks for the 5 endpoints; verify headers and payloads; decode responses.
- File: `tests/product.part3.spec.ts` (≤ 200 LOC; split if needed).

### T-437: Unit tests — validations and edge cases
- description: mutually exclusive identifiers enforced.
- upload quota: shape assertions; handle default/empty body.
- update offer-id: reject missing/unchanged values.
- archive/unarchive: reject empty lists; clamp to API max.
- Map 4xx/5xx to `OzonApiError`.

### T-438: Documentation
- Add examples to `docs/groups/product.md` for description, upload quota, update offer-id, archive/unarchive (with caveats about visibility and sale state).

### T-439: Usage examples (repo)
- `examples/product/get-description-v1.ts`
- `examples/product/get-upload-quota-v4.ts`
- `examples/product/update-offer-id-v1.ts`
- `examples/product/archive-v1.ts`
- `examples/product/unarchive-v1.ts`

### T-440: QA and Coverage
- Target ≥ 80% for newly added files.
- Final ProductAPI group checklist (headers, error mapping, iterators) and green CI.

---
