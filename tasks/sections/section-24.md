## Section 24 — P0 Group: CategoryAPI (Part 1 of 1)

Scope: Implement category tree, attributes, attribute values, and values search from `methods/20-categoryapi.json`.

References:
- PRD §6 (P0 groups), Appendix A.1 (CategoryAPI)
- File: `api-doc/ozon-api-documentation/methods/20-categoryapi.json`

Endpoints covered:
1) POST `/v1/description-category/tree` (operationId: `DescriptionCategoryAPI_GetTree`)
2) POST `/v1/description-category/attribute` (operationId: `DescriptionCategoryAPI_GetAttributes`)
3) POST `/v1/description-category/attribute/values` (operationId: `DescriptionCategoryAPI_GetAttributeValues`)
4) POST `/v1/description-category/attribute/values/search` (operationId: `DescriptionCategoryAPI_SearchAttributeValues`)

Naming guideline (SDK):
- Namespace: `client.category`
- Methods: `getTreeV1`, `getAttributesV1`, `getAttributeValuesV1`, `searchAttributeValuesV1`

### T-660: Types for CategoryAPI models
- Description: Define/generate types for the 4 endpoints.
- Models (at minimum): `v1GetTreeRequest/Response`, `v1GetAttributesRequest/Response`, `v1GetAttributeValuesRequest/Response`, `v1SearchAttributeValuesRequest/Response`.
- Deliverables: `src/types/category.part1.ts` (≤ 200 LOC; split if needed).

### T-661: Implement client.category.getTreeV1
- Description: Call POST `/v1/description-category/tree`; typed tree structure for categories/types.
- File: `src/apis/category.ts`.

### T-662: Implement client.category.getAttributesV1
- Description: Call POST `/v1/description-category/attribute` for attributes by category/type; handle `dictionary_id` presence.
- File: `src/apis/category.ts`.

### T-663: Implement client.category.getAttributeValuesV1
- Description: Call POST `/v1/description-category/attribute/values` to fetch dictionary values with `last_value_id`/`limit` pagination.
- File: `src/apis/category.ts`.

### T-664: Implement client.category.searchAttributeValuesV1
- Description: Call POST `/v1/description-category/attribute/values/search` with `value` term; typed results.
- File: `src/apis/category.ts`.

### T-665: Unit tests — CategoryAPI happy-path
- Add MSW/nock mocks for 4 endpoints; verify headers and payloads; decode responses.
- File: `tests/category.part1.spec.ts` (≤ 200 LOC; split if needed).

### T-666: Unit tests — validations and edge cases
- Tree: language handling.
- Attributes: invalid category/type.
- Values: pagination via `last_value_id`; search term handling.
- Map 4xx/5xx to `OzonApiError`.

### T-667: Documentation
- Add `docs/groups/category.md` with examples for full flow: tree → attributes → values → values search.

### T-668: Usage examples (repo)
- `examples/category/get-tree-v1.ts`
- `examples/category/get-attributes-v1.ts`
- `examples/category/get-attribute-values-v1.ts`
- `examples/category/search-attribute-values-v1.ts`

### T-669: QA and Coverage
- Target ≥ 80% for newly added files.
- Manual smoke harness with env-guard (skipped in CI).

---
