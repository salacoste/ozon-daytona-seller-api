## Section 25 — P0 Group: SupplierAPI (Part 1 of 1)

Scope: Implement invoice operations from `methods/21-supplierapi.json`.

References:
- PRD §6 (P0 groups), Appendix A.1 (SupplierAPI)
- File: `api-doc/ozon-api-documentation/methods/21-supplierapi.json`

Endpoints covered:
1) POST `/v2/invoice/create-or-update` (operationId: `InvoiceAPI_InvoiceCreateOrUpdateV2`)
2) POST `/v1/invoice/file/upload` (operationId: `invoice_upload`)
3) POST `/v2/invoice/get` (operationId: `invoice_getV2`)
4) POST `/v1/invoice/delete` (operationId: `invoice_delete`)

Naming guideline (SDK):
- Namespace: `client.supplier`
- Methods: `invoiceCreateOrUpdateV2`, `invoiceFileUploadV1`, `invoiceGetV2`, `invoiceDeleteV1`

### T-680: Types for SupplierAPI models
- Description: Define/generate types for invoice operations.
- Models (at minimum): `v2InvoiceCreateOrUpdateV2Request/Response`, `v1InvoiceFileUploadRequest/Response`, `v1InvoiceGetRequest`, `v2InvoiceGetV2Response`, `v1InvoiceDeleteRequest/Response`, `v2HsCode`.
- Deliverables: `src/types/supplier.part1.ts` (≤ 200 LOC; split if needed).

### T-681: Implement client.supplier.invoiceCreateOrUpdateV2
- Description: Call POST `/v2/invoice/create-or-update`; typed request/response; supports HS codes and file URL.
- Validation: require `date`, `posting_number`, `url`; optional `number`, `price`, `price_currency`.
- File: `src/apis/supplier.ts`.

### T-682: Implement client.supplier.invoiceFileUploadV1
- Description: Call POST `/v1/invoice/file/upload`; send JPEG/PDF up to 10 MB and get URL.
- Transport: multipart or binary upload helper as required; abstract via `src/http/binary.ts`.
- File: `src/apis/supplier.ts`.

### T-683: Implement client.supplier.invoiceGetV2
- Description: Call POST `/v2/invoice/get` by identifiers; typed response.
- File: `src/apis/supplier.ts`.

### T-684: Implement client.supplier.invoiceDeleteV1
- Description: Call POST `/v1/invoice/delete` to remove file URL binding.
- File: `src/apis/supplier.ts`.

### T-685: Unit tests — SupplierAPI happy-path
- Add MSW/nock mocks for 4 endpoints; verify headers/payloads; decode responses; upload flow.
- File: `tests/supplier.part1.spec.ts` (≤ 200 LOC; split if needed).

### T-686: Unit tests — validations and edge cases
- Create/update: missing required fields; invalid currency.
- Upload: >10 MB or invalid format rejected.
- Get/Delete: invalid identifiers.
- Map 4xx/5xx to `OzonApiError`.

### T-687: Documentation
- Add `docs/groups/supplier.md` with examples for full invoice flow: upload → create/update → get → delete.

### T-688: Usage examples (repo)
- `examples/supplier/invoice-create-or-update-v2.ts`
- `examples/supplier/invoice-file-upload-v1.ts`
- `examples/supplier/invoice-get-v2.ts`
- `examples/supplier/invoice-delete-v1.ts`

### T-689: QA and Coverage
- Target ≥ 80% for newly added files.
- Manual smoke harness with env-guard (skipped in CI).

---
