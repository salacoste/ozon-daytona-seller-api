## Section 30 — P0 Group: DeliveryFBS (Part 2 of 2)

Scope: Implement act generation/listing and label/barcode/PDF endpoints from `methods/04-deliveryfbs.json`.

References:
- PRD §6 (P0 groups), Appendix A.1 (DeliveryFBS)
- File: `api-doc/ozon-api-documentation/methods/04-deliveryfbs.json`

Endpoints covered (acts, labels, barcodes):
1) POST `/v2/posting/fbs/act/create` (operationId: `PostingAPI_PostingFBSActCreate`)
2) POST `/v2/posting/fbs/act/get-postings` (operationId: `PostingAPI_ActPostingList`)
3) POST `/v2/posting/fbs/act/get-container-labels` (operationId: `PostingAPI_PostingFBSGetContainerLabels`)
4) POST `/v2/posting/fbs/act/get-barcode` (operationId: `PostingAPI_PostingFBSGetBarcode`)
5) POST `/v2/posting/fbs/act/get-barcode/text` (operationId: `PostingAPI_PostingFBSGetBarcodeText`)
6) POST `/v2/posting/fbs/act/get-pdf` (operationId: `PostingAPI_PostingFBSGetActPdf`)
7) POST `/v2/posting/fbs/act/list` (operationId: `PostingAPI_PostingFBSActList`)
8) POST `/v2/posting/fbs/act/check-status` (operationId: `PostingAPI_PostingFBSActCheckStatus`)
9) POST `/v2/posting/fbs/digital/act/get-pdf` (operationId: `PostingAPI_PostingFBSDigitalGetActPdf`)
10) POST `/v2/posting/fbs/digital/act/check-status` (operationId: `PostingAPI_PostingFBSDigitalActCheckStatus`)

Naming guideline (SDK):
- Namespace: `client.deliveryFbs`
- Methods: `createActV2`, `getActPostingsV2`, `getContainerLabelsV2`, `getBarcodeV2`, `getBarcodeTextV2`, `getActPdfV2`, `listActsV2`, `checkActStatusV2`, `getDigitalActPdfV2`, `checkDigitalActStatusV2`

### T-760: Types for DeliveryFBS Part 2 models
- Description: Define/generate types for act and label endpoints.
- Models (at minimum): request/response schemas for each endpoint above (use exact IDs from file) including binary/PDF payload metadata where relevant.
- Deliverables: `src/types/delivery-fbs.part2.ts` (≤ 200 LOC; split if needed).

### T-761: Implement client.deliveryFbs.createActV2
- Description: Call POST `/v2/posting/fbs/act/create`; returns act info/id.
- File: `src/apis/delivery-fbs.ts`.

### T-762: Implement client.deliveryFbs.getActPostingsV2
- Description: Call POST `/v2/posting/fbs/act/get-postings` to list postings in act.
- File: `src/apis/delivery-fbs.ts`.

### T-763: Implement client.deliveryFbs.getContainerLabelsV2
- Description: Call POST `/v2/posting/fbs/act/get-container-labels` to obtain labels; PDF/PNG handling.
- Transport: use `src/http/binary.ts` for binary downloads where applicable.
- File: `src/apis/delivery-fbs.ts`.

### T-764: Implement client.deliveryFbs.getBarcodeV2 and getBarcodeTextV2
- Description: PDFs/images vs. text representation; both endpoints supported.
- File: `src/apis/delivery-fbs.ts`.

### T-765: Implement client.deliveryFbs.getActPdfV2 and getDigitalActPdfV2
- Description: Download PDFs for physical and digital acts.
- Transport: binary download helper; return Buffer/stream or save file.
- File: `src/apis/delivery-fbs.ts`.

### T-766: Implement client.deliveryFbs.listActsV2 and checkActStatusV2 (+ digital)
- Description: List acts; poll status until ready; expose small polling helper with backoff.
- File: `src/apis/delivery-fbs.ts`; helper in `src/helpers/delivery-fbs.ts` (≤ 200 LOC).

### T-767: Unit tests — DeliveryFBS Part 2 happy-path
- Add MSW/nock mocks for endpoints; verify headers/payloads; binary downloads; polling logic.
- File: `tests/delivery-fbs.part2.spec.ts` (≤ 200 LOC; split if needed).

### T-768: Unit tests — validations and edge cases
- Validate act creation inputs; polling terminal/error states; binary corruption handling.
- Map 4xx/5xx to `OzonApiError`.

### T-769: Documentation
- Extend `docs/groups/delivery-fbs.md` (part 2) with examples for acts, labels, barcodes, PDFs, and polling.

### T-770: Usage examples (repo)
- `examples/delivery-fbs/create-act-v2.ts`
- `examples/delivery-fbs/get-act-postings-v2.ts`
- `examples/delivery-fbs/get-container-labels-v2.ts`
- `examples/delivery-fbs/get-barcode-v2.ts`
- `examples/delivery-fbs/get-barcode-text-v2.ts`
- `examples/delivery-fbs/get-act-pdf-v2.ts`
- `examples/delivery-fbs/get-digital-act-pdf-v2.ts`
- `examples/delivery-fbs/list-acts-v2.ts`
- `examples/delivery-fbs/check-act-status-v2.ts`

### T-771: QA and Coverage
- Target ≥ 80% for newly added files.
- Manual smoke harness with env-guard (skipped in CI).

---
