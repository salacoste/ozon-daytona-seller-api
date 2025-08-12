## Section 37 — P0 Group: DeliveryrFBS (Part 1 of 1)

Scope: Implement `methods/12-deliveryrfbs.json` (8 endpoints).

Endpoints:
1) POST `/v2/fbs/posting/tracking-number/set`
2) POST `/v2/fbs/posting/sent-by-seller`
3) POST `/v2/fbs/posting/delivering`
4) POST `/v2/fbs/posting/last-mile`
5) POST `/v2/fbs/posting/delivered`
6) POST `/v1/posting/fbs/timeslot/change-restrictions`
7) POST `/v1/posting/fbs/timeslot/set`
8) POST `/v1/posting/cutoff/set`

SDK namespace: `client.deliveryRfbs` → `setTrackingNumberV2`, `markSentBySellerV2`, `markDeliveringV2`, `markLastMileV2`, `markDeliveredV2`, `changeTimeslotRestrictionsV1`, `setTimeslotV1`, `setCutoffV1`.

Tasks: types (`src/types/delivery-rfbs.part1.ts`), API (`src/apis/delivery-rfbs.ts`), tests, docs, examples, coverage ≥ 80%.

---
