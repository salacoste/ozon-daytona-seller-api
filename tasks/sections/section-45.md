## Section 45 — Beta Group: Questions&Answers (Part 1 of 1)

Scope: Implement beta `02-questions-answers.json` (8 endpoints; доступ по подписке Premium Plus).

Endpoints:
1) POST `/v1/question/answer/create`
2) POST `/v1/question/answer/delete`
3) POST `/v1/question/answer/list`
4) POST `/v1/question/change-status`
5) POST `/v1/question/count`
6) POST `/v1/question/info`
7) POST `/v1/question/list`
8) POST `/v1/question/top-sku`

SDK namespace: `client.questions` → `createAnswerV1`, `deleteAnswerV1`, `listAnswersV1`, `changeStatusV1`, `countV1`, `infoV1`, `listV1`, `topSkuV1`.

Tasks: types (`src/types/questions-answers.beta.part1.ts`), API (`src/apis/questions-answers.beta.ts`), tests, docs, examples; mark beta and Premium Plus access notes.
