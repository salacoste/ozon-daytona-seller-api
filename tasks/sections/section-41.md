## Section 41 — Beta Group: ReviewAPI (Part 1 of 1)

Scope: Implement beta `03-reviewapi.json` (7 endpoints, управление отзывами; Premium Plus может требоваться для некоторых операций).

Endpoints:
1) POST `/v1/review/comment/create`
2) POST `/v1/review/comment/delete`
3) POST `/v1/review/comment/list`
4) POST `/v1/review/change-status`
5) POST `/v1/review/count`
6) POST `/v1/review/info`
7) POST `/v1/review/list`

SDK namespace: `client.reviews` → `createCommentV1`, `deleteCommentV1`, `listCommentsV1`, `changeStatusV1`, `countV1`, `infoV1`, `listV1`.

Tasks: types (`src/types/review.beta.part1.ts`), API (`src/apis/review.beta.ts`), tests, docs, examples; clearly mark beta and potential access constraints.

---
