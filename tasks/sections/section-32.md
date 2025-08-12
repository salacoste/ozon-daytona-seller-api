## Section 32 — P0 Group: PolygonAPI (Part 1 of 1)

Scope: Implement polygon creation and binding endpoints from `methods/24-polygonapi.json`.

References:
- PRD §6 (P0 groups), Appendix A.1 (PolygonAPI)
- File: `api-doc/ozon-api-documentation/methods/24-polygonapi.json`

Endpoints covered:
1) POST `/v1/polygon/create`
2) POST `/v1/polygon/bind`

Naming guideline (SDK):
- Namespace: `client.polygon`
- Methods: `createPolygonV1`, `bindPolygonV1`

### T-790: Types for PolygonAPI models
- Description: Define/generate types for create/bind operations.
- Deliverables: `src/types/polygon.part1.ts` (≤ 200 LOC).

### T-791: Implement client.polygon.createPolygonV1
- Description: Create a polygon with coordinates and metadata per schema.
- File: `src/apis/polygon.ts`.

### T-792: Implement client.polygon.bindPolygonV1
- Description: Bind polygon to entity per spec.
- File: `src/apis/polygon.ts`.

### T-793: Unit tests, docs, examples, QA
- Tests: `tests/polygon.part1.spec.ts`
- Docs: `docs/groups/polygon.md`
- Examples: `examples/polygon/create-polygon-v1.ts`, `examples/polygon/bind-polygon-v1.ts`
- Coverage ≥ 80%.

---
