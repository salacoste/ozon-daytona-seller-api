## Section 33 — P0 Group: RFBSReturnsAPI (Part 1 of 1)

Scope: Implement rFBS returns endpoints from `methods/13-rfbsreturnsapi.json`.

References:
- PRD §6 (P0 groups), Appendix A.1 (RFBSReturnsAPI)
- File: `api-doc/ozon-api-documentation/methods/13-rfbsreturnsapi.json`

Endpoints covered:
1) POST `/v2/returns/rfbs/list`
2) POST `/v2/returns/rfbs/get`
3) POST `/v2/returns/rfbs/reject`
4) POST `/v2/returns/rfbs/compensate`
5) POST `/v2/returns/rfbs/verify`
6) POST `/v2/returns/rfbs/receive-return`
7) POST `/v2/returns/rfbs/return-money`
8) POST `/v1/returns/rfbs/action/set`

Naming guideline (SDK):
- Namespace: `client.rfbsReturns`
- Methods: `listV2`, `getV2`, `rejectV2`, `compensateV2`, `verifyV2`, `receiveReturnV2`, `returnMoneyV2`, `setActionV1`

### T-800: Types for RFBSReturnsAPI models
- Description: Define/generate types for all 8 endpoints; include nested entities.
- Deliverables: `src/types/rfbs-returns.part1.ts` (≤ 200 LOC; split if needed).

### T-801…T-806: Implement client methods
- Implement each endpoint under `src/apis/rfbs-returns.ts` with validation and error mapping.

### T-807: Unit tests — happy-path; T-808: edge cases
- Tests: `tests/rfbs-returns.part1.spec.ts`; coverage ≥ 80%.
- Docs: `docs/groups/rfbs-returns.md`; Examples: `examples/rfbs-returns/*.ts`.

---
