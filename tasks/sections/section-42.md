## Section 42 — Beta Group: Digital (Part 1 of 1)

Scope: Implement beta `04-digital.json` (3 endpoints: цифровые коды и остатки).

Endpoints:
1) POST `/v1/posting/digital/codes/upload`
2) POST `/v1/posting/digital/list`
3) POST `/v1/product/digital/stocks/import`

SDK namespace: `client.digital` → `uploadPostingCodesV1`, `listPostingDigitalV1`, `importProductDigitalStocksV1`.

Tasks: types (`src/types/digital.beta.part1.ts`), API (`src/apis/digital.beta.ts`), tests, docs, examples; mark beta.

---
