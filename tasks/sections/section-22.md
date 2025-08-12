## Section 22 — P0 Group: FinanceAPI (Part 1 of 2)

Scope: Implement realization reports, transactions list/totals, and B2B documents from `methods/09-financeapi.json`.

References:
- PRD §6 (P0 groups), Appendix A.1 (FinanceAPI)
- File: `api-doc/ozon-api-documentation/methods/09-financeapi.json`

Endpoints covered (this batch):
1) POST `/v2/finance/realization` (operationId: `FinanceAPI_GetRealizationReportV2`)
2) POST `/v1/finance/realization/posting` (operationId: `FinanceAPI_GetRealizationReportV1`)
3) POST `/v3/finance/transaction/list` (operationId: `FinanceAPI_FinanceTransactionListV3`)
4) POST `/v3/finance/transaction/totals` (operationId: `FinanceAPI_FinanceTransactionTotalsV3`)
5) POST `/v1/finance/document-b2b-sales` (operationId: as per spec)
6) POST `/v1/finance/document-b2b-sales/json` (operationId: as per spec)

Naming guideline (SDK):
- Namespace: `client.finance`
- Methods: `getRealizationReportV2`, `getRealizationReportPostingV1`, `getTransactionListV3`, `getTransactionTotalsV3`, `getDocumentB2BSalesV1`, `getDocumentB2BSalesJsonV1`

### T-620: Types for FinanceAPI Part 1 models
- Description: Define/generate types for the 6 endpoints.
- Models (at minimum):
  - realization: `v2GetRealizationReportRequestV2/Response`, `v1GetRealizationReportPostingRequest/Response`.
  - transactions: `financev3FinanceTransactionListV3Request/Response`, `financev3FinanceTransactionTotalsV3Request/Response`.
  - B2B docs: `v1FinanceDocumentB2BSalesRequest/Response`, `v1FinanceDocumentB2BSalesJsonRequest/Response` (use exact IDs from file).
- Deliverables: `src/types/finance.part1.ts` (≤ 200 LOC; split if needed).

### T-621: Implement client.finance.getRealizationReportV2
- Description: Call POST `/v2/finance/realization`; typed response; note country-specific availability caveat.
- File: `src/apis/finance.ts`.

### T-622: Implement client.finance.getRealizationReportPostingV1
- Description: Call POST `/v1/finance/realization/posting` by `month`/`year`; typed response.
- File: `src/apis/finance.ts`.

### T-623: Implement client.finance.getTransactionListV3
- Description: Call POST `/v3/finance/transaction/list` with filter (date ≤ 1 month), paging; typed response.
- File: `src/apis/finance.ts`.

### T-624: Implement client.finance.getTransactionTotalsV3
- Description: Call POST `/v3/finance/transaction/totals` with same filter to retrieve totals; typed response.
- File: `src/apis/finance.ts`.

### T-625: Implement client.finance.getDocumentB2BSalesV1 and getDocumentB2BSalesJsonV1
- Description: Call POST `/v1/finance/document-b2b-sales` (document download/link) and `/v1/finance/document-b2b-sales/json` (JSON payload).
- Transport: support binary/CSV via helper `src/http/binary.ts` when applicable.
- File: `src/apis/finance.ts`.

### T-626: Unit tests — FinanceAPI Part 1 happy-path
- Add MSW/nock mocks for all 6 endpoints; verify headers/payloads; decode responses; binary handling for B2B document where applicable.
- File: `tests/finance.part1.spec.ts` (≤ 200 LOC; split if needed).

### T-627: Unit tests — validations and edge cases
- Realization: invalid period; unavailable region handling note.
- Transactions: >1 month date range rejected; paging and totals alignment.
- B2B docs: binary download errors; JSON schema assertions.
- Map 4xx/5xx to `OzonApiError`.

### T-628: Documentation
- Add `docs/groups/finance.md` examples for realization reports, transactions list/totals, and B2B docs.

### T-629: Usage examples (repo)
- `examples/finance/get-realization-report-v2.ts`
- `examples/finance/get-realization-report-posting-v1.ts`
- `examples/finance/get-transaction-list-v3.ts`
- `examples/finance/get-transaction-totals-v3.ts`
- `examples/finance/get-document-b2b-sales-v1.ts`
- `examples/finance/get-document-b2b-sales-json-v1.ts`

### T-630: QA and Coverage
- Target ≥ 80% for newly added files.
- Manual smoke harness with env-guard (skipped in CI).

---
