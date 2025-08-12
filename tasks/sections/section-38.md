## Section 38 — P0 Group: Pass (Part 1 of 1)

Scope: Implement `methods/17-pass.json` (7 endpoints).

Endpoints:
1) POST `/v1/pass/list`
2) POST `/v1/carriage/pass/create`
3) POST `/v1/carriage/pass/update`
4) POST `/v1/carriage/pass/delete`
5) POST `/v1/return/pass/create`
6) POST `/v1/return/pass/update`
7) POST `/v1/return/pass/delete`

SDK namespace: `client.pass` → `listV1`, `createCarriagePassV1`, `updateCarriagePassV1`, `deleteCarriagePassV1`, `createReturnPassV1`, `updateReturnPassV1`, `deleteReturnPassV1`.

Tasks: types (`src/types/pass.part1.ts`), API (`src/apis/pass.ts`), tests, docs, examples, coverage ≥ 80%.

---
