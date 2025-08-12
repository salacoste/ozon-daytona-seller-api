## Section 34 — P0 Group: SellerRating (Part 1 of 1)

Scope: Implement seller rating endpoints from `methods/25-sellerrating.json`.

References:
- PRD §6 (P0 groups), Appendix A.1 (SellerRating)
- File: `api-doc/ozon-api-documentation/methods/25-sellerrating.json`

Endpoints covered:
1) POST `/v1/rating/summary`
2) POST `/v1/rating/history`

Naming guideline (SDK):
- Namespace: `client.sellerRating`
- Methods: `getSummaryV1`, `getHistoryV1`

### T-810: Types, implementation, tests, docs, examples
- Types: `src/types/seller-rating.part1.ts`.
- API: `src/apis/seller-rating.ts`.
- Tests: `tests/seller-rating.part1.spec.ts`.
- Docs: `docs/groups/seller-rating.md`.
- Examples: `examples/seller-rating/get-summary-v1.ts`, `examples/seller-rating/get-history-v1.ts`.
- Coverage ≥ 80%.

---
