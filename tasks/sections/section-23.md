## Section 23 — P0 Group: FinanceAPI (Part 2 of 2)

Scope: Implement mutual settlement, realization by day, products buyout, compensation, and decompensation from `methods/09-financeapi.json`. This completes FinanceAPI coverage.

References:
- PRD §6 (P0 groups), Appendix A.1 (FinanceAPI)
- File: `api-doc/ozon-api-documentation/methods/09-financeapi.json`

Endpoints covered (remaining):
7) POST `/v1/finance/mutual-settlement` (operationId: per spec)
8) POST `/v1/finance/realization/by-day` (operationId: per spec)
9) POST `/v1/finance/products/buyout` (operationId: per spec)
10) POST `/v1/finance/compensation` (operationId: per spec)
11) POST `/v1/finance/decompensation` (operationId: per spec)

Naming guideline (SDK):
- Namespace: `client.finance`
- Methods: `getMutualSettlementV1`, `getRealizationByDayV1`, `getProductsBuyoutV1`, `getCompensationV1`, `getDecompensationV1`

### T-640: Types for FinanceAPI Part 2 models
- Description: Define/generate types for the 5 endpoints (use exact schema IDs from the file; names below are indicative).
- Models (at minimum): `v1FinanceMutualSettlementRequest/Response`, `v1FinanceRealizationByDayRequest/Response`, `v1FinanceProductsBuyoutRequest/Response`, `v1FinanceCompensationRequest/Response`, `v1FinanceDecompensationRequest/Response`.
- Deliverables: `src/types/finance.part2.ts` (≤ 200 LOC; split if needed).

### T-641: Implement client.finance.getMutualSettlementV1
- Description: Call POST `/v1/finance/mutual-settlement`; typed response.
- File: `src/apis/finance.ts`.

### T-642: Implement client.finance.getRealizationByDayV1
- Description: Call POST `/v1/finance/realization/by-day`; typed response; daily breakdown.
- File: `src/apis/finance.ts`.

### T-643: Implement client.finance.getProductsBuyoutV1
- Description: Call POST `/v1/finance/products/buyout`; typed response.
- File: `src/apis/finance.ts`.

### T-644: Implement client.finance.getCompensationV1
- Description: Call POST `/v1/finance/compensation`; typed response.
- File: `src/apis/finance.ts`.

### T-645: Implement client.finance.getDecompensationV1
- Description: Call POST `/v1/finance/decompensation`; typed response.
- File: `src/apis/finance.ts`.

### T-646: Unit tests — FinanceAPI Part 2 happy-path
- Add MSW/nock mocks for all 5 endpoints; verify headers/payloads; decode responses.
- File: `tests/finance.part2.spec.ts` (≤ 200 LOC; split if needed).

### T-647: Unit tests — validations and edge cases
- Validate date ranges and paging where applicable.
- Ensure consistency of totals vs. per-day breakdown (sanity checks where meaningful).
- Map 4xx/5xx to `OzonApiError`.

### T-648: Documentation
- Extend `docs/groups/finance.md` with examples for mutual settlement, realization by day, buyout, compensation, decompensation.

### T-649: Usage examples (repo)
- `examples/finance/get-mutual-settlement-v1.ts`
- `examples/finance/get-realization-by-day-v1.ts`
- `examples/finance/get-products-buyout-v1.ts`
- `examples/finance/get-compensation-v1.ts`
- `examples/finance/get-decompensation-v1.ts`

### T-650: QA and Coverage
- Target ≥ 80% for newly added files.
- Manual smoke harness with env-guard (skipped in CI).

---
