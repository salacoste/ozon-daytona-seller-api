## Section 39 — P0 Group: ReturnAPI (Part 1 of 1)

Scope: Implement `methods/14-returnapi.json` (8 endpoints, FBS выдача возврата).

Endpoints:
1) POST `/v1/returns/company/fbs/info`
2) POST `/v1/return/giveout/is-enabled`
3) POST `/v1/return/giveout/list`
4) POST `/v1/return/giveout/info`
5) POST `/v1/return/giveout/barcode`
6) POST `/v1/return/giveout/get-pdf`
7) POST `/v1/return/giveout/get-png`
8) POST `/v1/return/giveout/barcode-reset`

SDK namespace: `client.returnApi` → `getCompanyFbsInfoV1`, `isGiveoutEnabledV1`, `listGiveoutV1`, `getGiveoutInfoV1`, `getGiveoutBarcodeV1`, `getGiveoutPdfV1`, `getGiveoutPngV1`, `resetGiveoutBarcodeV1`.

Tasks: types (`src/types/return-api.part1.ts`), API (`src/apis/return-api.ts`), tests, docs, examples, coverage ≥ 80%.

---
