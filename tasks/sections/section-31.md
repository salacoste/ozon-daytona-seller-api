## Section 31 — P0 Group: BarcodeAPI (Part 1 of 1)

Scope: Implement barcode add and generate from `methods/22-barcodeapi.json`.

References:
- PRD §6 (P0 groups), Appendix A.1 (BarcodeAPI)
- File: `api-doc/ozon-api-documentation/methods/22-barcodeapi.json`

Endpoints covered:
1) POST `/v1/barcode/add`
2) POST `/v1/barcode/generate`

Naming guideline (SDK):
- Namespace: `client.barcode`
- Methods: `addBarcodeV1`, `generateBarcodeV1`

### T-780: Types for BarcodeAPI models
- Description: Define/generate types for add/generate operations.
- Deliverables: `src/types/barcode.part1.ts` (≤ 200 LOC).

### T-781: Implement client.barcode.addBarcodeV1
- Description: Add a barcode for product(s) per request schema.
- File: `src/apis/barcode.ts`.

### T-782: Implement client.barcode.generateBarcodeV1
- Description: Generate barcode(s) and return identifiers/content (per spec).
- File: `src/apis/barcode.ts`.

### T-783: Unit tests, docs, examples, QA
- Tests: `tests/barcode.part1.spec.ts`
- Docs: `docs/groups/barcode.md`
- Examples: `examples/barcode/add-barcode-v1.ts`, `examples/barcode/generate-barcode-v1.ts`
- Coverage ≥ 80%.

---
