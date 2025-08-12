## Section 44 — Beta Group: BetaMethod (Part 1 of 1)

Scope: Implement beta `01-betamethod.json` (9 endpoints; аналитика FBO, роли токена, отчёты FBO вывоз/утилизация, некорректные ОВХ).

Endpoints:
1) POST `/v1/analytics/manage/stocks`
2) POST `/v1/analytics/stocks`
3) POST `/v1/analytics/average-delivery-time`
4) POST `/v1/analytics/average-delivery-time/details`
5) POST `/v1/analytics/average-delivery-time/summary`
6) POST `/v1/product/info/wrong-volume`
7) POST `/v1/roles`
8) POST `/v1/removal/from-supply/list`
9) POST `/v1/removal/from-stock/list`

SDK namespace: `client.beta` with sub-namespaces:
- `client.beta.analytics`: `manageStocksV1`, `stocksV1`, `averageDeliveryTimeV1`, `averageDeliveryTimeDetailsV1`, `averageDeliveryTimeSummaryV1`
- `client.beta.product`: `listWrongVolumeInfoV1`
- `client.beta.access`: `rolesByTokenV1`
- `client.beta.removal`: `listFromSupplyV1`, `listFromStockV1`

Tasks: types (`src/types/beta-method.part1.ts`), APIs (`src/apis/beta.analytics.ts`, `src/apis/beta.product.ts`, `src/apis/beta.access.ts`, `src/apis/beta.removal.ts`), tests, docs, examples; mark beta and deprecations where indicated.

---
