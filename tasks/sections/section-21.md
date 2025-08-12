## Section 21 — P0 Group: ReportAPI (Part 1 of 1)

Scope: Implement report creation/list/info endpoints and finance cash-flow list from `methods/16-reportapi.json`.

References:
- PRD §6 (P0 groups), Appendix A.1 (ReportAPI)
- File: `api-doc/ozon-api-documentation/methods/16-reportapi.json`

Endpoints covered:
1) POST `/v1/report/info` (operationId: `ReportAPI_ReportInfo`)
2) POST `/v1/report/list` (operationId: `ReportAPI_ReportList`)
3) POST `/v1/report/products/create` (operationId: `ReportAPI_CreateCompanyProductsReport`)
4) POST `/v2/report/returns/create` (operationId: `ReportAPI_ReportReturnsCreate`)
5) POST `/v1/report/postings/create` (operationId: `ReportAPI_CreateCompanyPostingsReport`)
6) POST `/v1/finance/cash-flow-statement/list` (operationId: `FinanceAPI_FinanceCashFlowStatementList`)
7) POST `/v1/report/discounted/create` (operationId: `ReportAPI_CreateDiscountedReport`)
8) POST `/v1/report/warehouse/stock` (operationId: `ReportAPI_CreateStockByWarehouseReport`)

Naming guideline (SDK):
- Namespaces:
  - `client.reports`: `getReportInfoV1`, `getReportListV1`, `createProductsReportV1`, `createReturnsReportV2`, `createPostingsReportV1`, `createDiscountedReportV1`, `createStockByWarehouseReportV1`
  - `client.finance`: `getCashFlowStatementListV1`

### T-600: Types for ReportAPI models
- Description: Define/generate types for requests/responses.
- Models (at minimum):
  - report info/list: `reportReportInfoRequest/Response`, `reportReportListRequest/Response`.
  - products/postings: `reportCreateCompanyProductsReportRequest`, `reportCreateCompanyPostingsReportRequest`, `reportCreateReportResponse`.
  - returns: `v2ReportReturnsCreateRequest/Response`.
  - discounted: `reportCreateDiscountedRequest/Response`.
  - stock by warehouse: `v1CreateStockByWarehouseReportRequest`, `commonCreateReportResponse`.
  - finance cash-flow: `v3FinanceCashFlowStatementListRequest/Response`.
- Deliverables: `src/types/report.part1.ts`, `src/types/finance.part1.ts` (each ≤ 200 LOC; split if needed).

### T-601: Implement client.reports.getReportInfoV1
- Description: Call POST `/v1/report/info` by `code`; returns status and `file` URL when ready.
- File: `src/apis/reports.ts`.

### T-602: Implement client.reports.getReportListV1
- Description: Call POST `/v1/report/list` with paging and optional `report_type`.
- File: `src/apis/reports.ts`.

### T-603: Implement client.reports.createProductsReportV1
- Description: Call POST `/v1/report/products/create` to start generation; returns report `code`.
- File: `src/apis/reports.ts`.

### T-604: Implement client.reports.createReturnsReportV2
- Description: Call POST `/v2/report/returns/create` with filter (schema/date/status); returns report `code`.
- File: `src/apis/reports.ts`.

### T-605: Implement client.reports.createPostingsReportV1
- Description: Call POST `/v1/report/postings/create` with filter; returns `code`.
- File: `src/apis/reports.ts`.

### T-606: Implement client.finance.getCashFlowStatementListV1
- Description: Call POST `/v1/finance/cash-flow-statement/list` for period reports; supports `with_details`, paging.
- File: `src/apis/finance.ts`.

### T-607: Implement client.reports.createDiscountedReportV1
- Description: Call POST `/v1/report/discounted/create`; returns `code`.
- File: `src/apis/reports.ts`.

### T-608: Implement client.reports.createStockByWarehouseReportV1
- Description: Call POST `/v1/report/warehouse/stock`; returns `code`.
- File: `src/apis/reports.ts`.

### T-609: Helper — pollAndDownloadReport
- Description: Provide helper that polls `getReportInfoV1(code)` until `status=success|error` with backoff, then downloads `file` (CSV) to disk or returns Buffer/stream.
- Files: `src/helpers/reports.ts` (≤ 200 LOC), reuse `src/http/binary.ts` for download.

### T-610: Unit tests — ReportAPI happy-path
- Mocks: create report → report info with `status=success` and `file` URL; verify polling and binary download.
- Cover products, postings, returns, discounted, stock-by-warehouse; list/info endpoints.
- File: `tests/reports.part1.spec.ts` (≤ 200 LOC; split if needed).

### T-611: Unit tests — validations and edge cases
- Invalid codes; timeouts; error status from report info; network failures on download.
- Finance: invalid date ranges; paging.
- Map 4xx/5xx to `OzonApiError`.

### T-612: Documentation
- Add `docs/groups/reports.md` with examples: create → poll → download for each report type; include limits (e.g., 1 req/min for discounted).
- Add `docs/groups/finance.md` with cash-flow list examples.

### T-613: Usage examples (repo)
- `examples/reports/create-products-report-v1.ts`
- `examples/reports/create-returns-report-v2.ts`
- `examples/reports/create-postings-report-v1.ts`
- `examples/reports/create-discounted-report-v1.ts`
- `examples/reports/create-stock-by-warehouse-report-v1.ts`
- `examples/reports/poll-and-download-report.ts`
- `examples/finance/get-cash-flow-statement-list-v1.ts`

### T-614: QA and Coverage
- Target ≥ 80% for newly added files.
- Manual smoke harness with env-guard (skipped in CI).

---
