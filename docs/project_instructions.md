# Claude Project Instructions — OZON SDK (TypeScript, MCP-first)

## Goals
- Implement a fully typed, category-based OZON SDK in TypeScript.
- Source of truth: MCP server `ozon-api-docs`. Engineering best practices: MCP server `context7`.
- Each API method must have: Zod schemas, strict TS types, unit tests (success/4xx/retry 429+5xx), optional live tests (flagged).

## Code Rules
- Use only `src/core/httpClient.ts` for HTTP. Retries: 429, 5xx with exponential backoff. Idempotence key for write ops.
- Zod-validate responses; strict TypeScript (`noImplicitAny`, `exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`).
- Pagination via common helper in `src/utils/`, not inside category methods.
- No `any`. Provide JSDoc with usage examples for each public method.

## Deliverables per Category (DoD)
- All endpoints listed from `ozon-api-docs` with paths, methods, params, errors.
- SDK methods + schemas + types + pagination helper usage.
- Tests: success, 4xx, retries (429/5xx), schema validation. Coverage ≥ 95%.
- Live tests exist behind `LIVE=1` (secrets via env). CI green. Changelog updated.

## Workflow with MCP
- Before coding: ask `ozon-api-docs` for the category contracts (JSON structure ready for type generation).
- Ask `context7` for a concise checklist of best practices for TS SDK (retries, rate limit, idempotency, pagination, test strategy).
- Include short MCP report in the PR description.

## Output Style
- Generate strict, production-ready TS (ESM), no placeholders, no `...`.
- For schemas, use Zod. For tests, use Vitest + Nock. Keep imports consistent.
