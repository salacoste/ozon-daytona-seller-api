## Section 35 — P0 Group: BrandAPI (Part 1 of 1)

Scope: Implement brand certification list from `methods/26-brandapi.json`.

References:
- PRD §6 (P0 groups), Appendix A.1 (BrandAPI)
- File: `api-doc/ozon-api-documentation/methods/26-brandapi.json`

Endpoint covered:
1) POST `/v1/brand/company-certification/list`

Naming guideline (SDK):
- Namespace: `client.brand`
- Method: `getCompanyCertificationListV1`

### T-820: Types, implementation, tests, docs, examples
- Types: `src/types/brand.part1.ts`.
- API: `src/apis/brand.ts`.
- Tests: `tests/brand.part1.spec.ts`.
- Docs: `docs/groups/brand.md`.
- Examples: `examples/brand/get-company-certification-list-v1.ts`.
- Coverage ≥ 80%.

---
