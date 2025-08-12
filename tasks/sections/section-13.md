## Section 13 — P0 Group: ProductAPI (Part 2 of 4)

Scope: Implement product list, product info list, and product attributes v4 from `methods/03-productapi.json`.

References:
- PRD §6 (P0 groups), Appendix A.1 (ProductAPI)
- File: `api-doc/ozon-api-documentation/methods/03-productapi.json`

Endpoints covered (this batch):
6) POST `/v3/product/list` (operationId: `ProductAPI_GetProductList`) — last_id pagination
7) POST `/v3/product/info/list` (operationId: `ProductAPI_GetProductInfoList`) — by identifiers
8) POST `/v4/product/info/attributes` (operationId: `ProductAPI_GetProductAttributesV4`) — attributes by identifiers/visibility

Naming guideline (SDK):
- Namespace: `client.product`
- Methods: `getProductListV3`, `getProductInfoListV3`, `getProductAttributesV4`

### T-420: Types for ProductAPI Part 2 models
- Description: Define/generate types for the 3 endpoints.
- Models (at minimum):
  - list v3: `productv3GetProductListRequest`, `productv3GetProductListResponse` (+ item shape with `archived`, stocks flags, `quants[]`, and `last_id`).
  - info list v3: `v3GetProductInfoListRequest`, `v3GetProductInfoListResponse`.
  - attributes v4: `productv4GetProductAttributesV4Request`, `productv4GetProductAttributesV4Response` (+ item shapes including dimensions, images, attributes, `attributes_with_defaults`).
- Deliverables: `src/types/product.part2.ts` (≤ 200 LOC; split if needed).

### T-421: Implement client.product.getProductListV3 + iterator
- Description: Call POST `/v3/product/list` with filters or with `limit` and `last_id`; typed response.
- Iterator: `iterateProductListV3(params)` advancing by `last_id` until empty.
- File: `src/apis/product.ts`, `src/pagination/product-list.v3.ts`.

### T-422: Implement client.product.getProductInfoListV3
- Description: Call POST `/v3/product/info/list` with up to 1000 identifiers (sum of `offer_id[]`, `product_id[]`, `sku[]`).
- Validation: enforce single identifier type per request; limit total ≤ 1000.
- File: `src/apis/product.ts`.

### T-423: Implement client.product.getProductAttributesV4
- Description: Call POST `/v4/product/info/attributes` with filter/limit/sort_dir; typed response with full attribute description.
- Pagination: support `limit`; if API returns paging token later, align iterator in a subsequent task (not required now).
- File: `src/apis/product.ts`.

### T-424: Unit tests — ProductAPI Part 2 happy-path
- Add MSW/nock mocks for the 3 endpoints; verify headers and payloads; decode responses.
- Cover iterator behavior for product list (multiple pages via `last_id`).
- File: `tests/product.part2.spec.ts` (≤ 200 LOC; split if needed).

### T-425: Unit tests — validations and edge cases
- product list: invalid `limit`; ensure `last_id` loop terminates.
- info list: mixing identifier types rejected; >1000 rejected.
- attributes v4: empty filter rejected; large limits clamped to API max.
- Map 4xx/5xx to `OzonApiError`.

### T-426: Documentation
- Add examples to `docs/groups/product.md` for product list (with iterator), info list by identifiers, and attributes v4.

### T-427: Usage examples (repo)
- `examples/product/get-product-list-v3.ts`
- `examples/product/get-product-info-list-v3.ts`
- `examples/product/get-product-attributes-v4.ts`

### T-428: QA and Coverage
- Target ≥ 80% for newly added files.
- Manual smoke harness with env-guard (skipped in CI).

---
