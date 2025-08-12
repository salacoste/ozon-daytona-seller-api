## Section 36 — P0 Group: Promos (Part 1 of 1)

Scope: Implement promotions endpoints from `methods/11-promos.json` (8 endpoints).

References: PRD §6; file `api-doc/ozon-api-documentation/methods/11-promos.json`.

Endpoints:
1) POST `/v1/actions` — list
2) POST `/v1/actions/candidates`
3) POST `/v1/actions/products`
4) POST `/v1/actions/products/activate`
5) POST `/v1/actions/products/deactivate`
6) POST `/v1/actions/discounts-task/list`
7) POST `/v1/actions/discounts-task/approve`
8) POST `/v1/actions/discounts-task/decline`

SDK namespace: `client.promos` → methods: `listV1`, `candidatesV1`, `productsV1`, `activateProductsV1`, `deactivateProductsV1`, `listDiscountTasksV1`, `approveDiscountTaskV1`, `declineDiscountTaskV1`.

Tasks: types (`src/types/promos.part1.ts`), API (`src/apis/promos.ts`), tests (`tests/promos.part1.spec.ts`), docs (`docs/groups/promos.md`), examples (`examples/promos/*.ts`), coverage ≥ 80%.

---
