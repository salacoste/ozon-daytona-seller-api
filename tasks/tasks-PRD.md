## Relevant Files

- `README.md` - Project documentation to be rewritten based on PRD.
- `LICENSE` - License file to be updated or removed per project requirements.
- `package.json` - Scripts, build targets, and metadata.
- `tsconfig.base.json` - Base TS config shared across builds.
- `tsconfig.build.json` - Build-specific TS config for ESM/CJS outputs.
- `src/index.ts` - SDK entry point exporting public API.
- `src/http/HttpClient.ts` - Core HTTP transport with auth, timeout, hooks.
- `src/http/retry.ts` - Retry policy with exponential backoff and jitter.
- `src/http/rateLimiter.ts` - Optional token-bucket rate limiter.
- `src/errors/index.ts` - Error normalization (`OzonApiError`, specialized errors).
- `src/pagination/index.ts` - Pagination helpers (last_id, cursor, limit/offset).
- `src/clients/OzonClient.ts` - Root SDK client that wires sub-clients.
- `src/clients/fbs/index.ts` - FBS client namespace (P0 group).
- `src/clients/fbo/index.ts` - FBO client namespace (P0 group).
- `src/clients/fboSupplyRequest/index.ts` - FboSupplyRequest client (P0 group).
- `src/clients/pricesStocks/index.ts` - Prices&StocksAPI client (P0 group).
- `src/clients/warehouse/index.ts` - WarehouseAPI client (P0 group).
- `src/clients/product/index.ts` - ProductAPI client (P0 group).
- `src/types/generated/*` - Generated models from components schemas.
- `scripts/codegen.ts` - Types generation pipeline from `components/` and `methods/`.
- `tests/unit/*` - Unit tests (transport, errors, pagination, clients).
- `tests/contract/*` - Contract tests validating JSON `example` parsing.

### Notes

- Unit tests should typically be placed alongside the code files they are testing or in a mirrored structure under `tests/`.
- Use `npm test` to run all tests. Ensure coverage thresholds are configured in the test runner.
- Keep source files ≤ 200 LOC; split modules when approaching the limit.
- All logs and comments must be in ENGLISH language.

## Tasks (Phase 2 — With Sub-Tasks)

- [x] 1.0 Create Project README
  - [x] 1.1 Rewrite README.md title/description based on PRD (`prd-project-files/PRD.md`)
  - [x] 1.2 Add install/setup instructions (Node version, env vars, API keys)
  - [x] 1.3 Add usage quick start with `OzonClient` init and simple call
  - [x] 1.4 Document P0 groups overview and links to per-group examples
  - [x] 1.5 Add pagination, retries, error-handling sections with short code samples
  - [x] 1.6 Add badges (npm, version), license, contribution note

- [x] 2.0 Setup Project License
  - [x] 2.1 Confirm license choice (MIT by default) with stakeholders
  - [x] 2.2 Update `LICENSE` file text
  - [x] 2.3 Set `license` field in `package.json`
  - [x] 2.4 Add license header to source files via lint rule/template (optional)

- [x] 3.0 Bootstrap TypeScript SDK repository and tooling
  - [x] 3.1 Initialize `package.json` (name, version, exports for ESM/CJS)
  - [x] 3.2 Create `tsconfig.base.json` and `tsconfig.build.json` (ES2020, node16/next)
  - [x] 3.3 Add ESLint + Prettier configs (no `any` in public API)
  - [x] 3.4 Add scripts: `build`, `build:esm`, `build:cjs`, `clean`, `lint`, `test`
  - [x] 3.5 Create folder structure: `src/{clients,http,errors,pagination,types,utils}`
  - [x] 3.6 Verify dual build outputs to `dist/esm` and `dist/cjs`

- [x] 4.0 Implement Core HTTP transport (auth headers, timeout, hooks)
  - [x] 4.1 Design `HttpClient` interface and config object
  - [x] 4.2 Inject `Client-Id` and `Api-Key` headers on each request
  - [x] 4.3 Implement request timeout via `AbortController`
  - [x] 4.4 Implement request/response hooks (onRequest/onResponse)
  - [x] 4.5 Unit tests for headers, timeout, and hooks firing order

- [x] 5.0 Implement Retry and Rate Limiting
  - [x] 5.1 Implement exponential backoff (+ jitter) for network and 5xx errors
  - [x] 5.2 Make retry policy configurable (maxRetries, base, factor, statuses)
  - [x] 5.3 Implement optional token-bucket rate limiter with queue and cancel
  - [x] 5.4 Unit tests for retry sequences and rate limit behavior

- [x] 6.0 Implement Error normalization (`rpcStatus` → `OzonApiError`)
  - [x] 6.1 Implement `OzonApiError` (httpStatus, code, message, details, operationId, requestId)
  - [x] 6.2 Implement `RateLimitError`, `AuthError`, `ValidationError`
  - [x] 6.3 Map API error payloads to typed errors consistently
  - [x] 6.4 Unit tests for representative rpcStatus payloads

- [x] 7.0 Implement Pagination utilities (last_id, cursor, limit/offset)
  - [x] 7.1 `iterateByLastId(fetchPage)` until `last_id` empty
  - [x] 7.2 `iterateByCursor(fetchPage)` until end
  - [x] 7.3 `iterateByOffset(fetchPage, limit)` until empty page
  - [x] 7.4 Unit tests with mocked page providers

- [x] 8.0 Implement Public client API skeletons (OzonClient + P0 namespaces)
  - [x] 8.1 Implement `OzonClient` constructor and config surface
  - [x] 8.2 Wire sub-clients: `product`, `fbo`, `fbs`, `pricesStocks`, `warehouse`, `analytics`
  - [x] 8.3 Share `HttpClient` across sub-clients; ensure type-safe exports
  - [x] 8.4 Smoke tests instantiating client and calling no-op methods

- [x] 9.0 Prepare Types generation pipeline from `components/` and `methods/`
  - [x] 9.1 Create `scripts/codegen.ts` parsing `INDEX.json`
  - [x] 9.2 Load minimal referenced schemas for selected groups (start with P0)
  - [x] 9.3 Emit `src/types/generated/*.ts` with strict typing (no `any` in public)
  - [x] 9.4 Snapshot/contract tests for a sample of generated models

- [x] 10.0 Configure Test infrastructure (unit, contract, coverage)
  - [x] 10.1 Choose runner (Vitest/Jest) and configure TS support
  - [x] 10.2 Configure coverage thresholds and reporters
  - [x] 10.3 Add transport mocking (MSW/Nock) utilities
  - [x] 10.4 Sample unit + contract tests wired to CI

- [x] 11.0 Implement P0 Group: FBS (split into 4 parts)
  - [x] 11.1 Part 1 — endpoints 1–6 (see `prd-project-files/tasks.md` Section 2)
  - [x] 11.2 Part 2 — country list/set, restrictions, and subsequent endpoints
  - [x] 11.3 Part 3 — remaining posting management endpoints
  - [x] 11.4 Part 4 — finalize FBS docs, iterators, and tests coverage ≥ 80%

- [x] 12.0 Implement P0 Group: FBO
  - [x] 12.1 Define types (minimal first) from `methods/06-fbo.json`
  - [x] 12.2 Implement core endpoints (listing, details, operations)
  - [x] 12.3 Add iterators for paginated endpoints
  - [x] 12.4 Unit + contract tests; docs and examples

- [x] 13.0 Implement P0 Group: FboSupplyRequest
  - [x] 13.1 Define types from `methods/02-fbosupplyrequest.json`
  - [x] 13.2 Implement creation/listing/status endpoints
  - [x] 13.3 Iterators/tests/docs

- [x] 14.0 Implement P0 Group: Prices&StocksAPI
  - [x] 14.1 Define types from `methods/10-prices-stocksapi.json`
  - [x] 14.2 Implement price/stock read and update endpoints
  - [x] 14.3 Iterators/tests/docs

- [x] 15.0 Implement P0 Group: WarehouseAPI
  - [x] 15.1 Define types from `methods/23-warehouseapi.json`
  - [x] 15.2 Implement warehouse listing/info endpoints
  - [x] 15.3 Iterators/tests/docs

- [x] 16.0 Implement P0 Group: ProductAPI
  - [x] 16.1 Define types from `methods/03-productapi.json`
  - [x] 16.2 Implement product read/update endpoints (minimal MVP set)
  - [x] 16.3 Iterators/tests/docs

- [x] 17.0 Documentation and examples for P0 groups
  - [x] 17.1 Add per-group README sections with examples
  - [x] 17.2 Cross-link to official docs and operationIds
  - [x] 17.3 End-to-end quickstart showing 2–3 groups together

- [x] 18.0 QA, lint, CI and prepare Release 1.0.0
  - [x] 18.1 Ensure all new files ≤ 500 LOC; refactor if needed (updated from 200 to 500)
  - [x] 18.2 Lint, type-check, and test coverage ≥ 80% for core + P0
  - [x] 18.3 Setup GitHub Actions (build, lint, test, release dry-run)
  - [x] 18.4 Version bump and CHANGELOG; tag `v1.0.0`


---


---

Per-section plans have been moved to tasks/sections/.

# Sections

- [x] [Section 03 — P0 Group: FBS (Part 2 of 4)](./sections/section-03.md) ✅ **COMPLETED**
- [x] [Section 04 — P0 Group: FBS (Part 3 of 4)](./sections/section-04.md) ✅ **COMPLETED** 
- [x] [Section 05 — P0 Group: FBS (Part 4 of 4)](./sections/section-05.md) ✅ **COMPLETED**
- [x] [Section 06 — P0 Group: FBO (Part 1 of 3)](./sections/section-06.md) ✅ **COMPLETED**
- [x] [Section 07 — P0 Group: FBO (Part 2 of 3)](./sections/section-07.md) ✅ **COMPLETED**
- [x] [Section 08 — P0 Group: FBO (Part 3 of 3)](./sections/section-08.md) ✅ **COMPLETED**
- [x] [Section 09 — P0 Group: Prices & Stocks (Part 1 of 3)](./section-09.md) ✅ **COMPLETED**
- [x] [Section 10 — P0 Group: Prices & Stocks (Part 2 of 3)](./section-10.md) ✅ **COMPLETED**
- [x] [Section 11 — P0 Group: Prices & Stocks (Part 3 of 3)](./section-11.md) ✅ **COMPLETED**
- [x] [Section 12 — P0 Group: ProductAPI (Part 1 of 4)](./section-12.md) ✅ **COMPLETED**
- [x] [Section 13 — P0 Group: ProductAPI (Part 2 of 4)](./section-13.md) ✅ **COMPLETED**
- [x] [Section 14 — P0 Group: ProductAPI (Part 3 of 4)](./section-14.md) ✅ **COMPLETED**
- [x] [Section 16 — P0 Group: FboSupplyRequest (Part 1 of 3)](./section-16.md) ✅ **COMPLETED**
- [x] [Section 17 — P0 Group: FboSupplyRequest (Part 2 of 3)](./section-17.md) ✅ **COMPLETED**
- [x] [Section 18 — P0 Group: FboSupplyRequest (Part 3 of 3)](./section-18.md) ✅ **COMPLETED**
- [x] [Section 19 — P0 Group: WarehouseAPI (Part 1 of 1)](./section-19.md) ✅ **COMPLETED**
- [x] [Section 20 — P0 Group: AnalyticsAPI (Part 1 of 1)](./section-20.md) ✅ **COMPLETED**
- [x] [Section 21 — P0 Group: ReportAPI (Part 1 of 1)](./section-21.md) ✅ **COMPLETED**
- [x] [Section 22 — P0 Group: FinanceAPI (Part 1 of 2)](./section-22.md) ✅ **COMPLETED**
- [x] [Section 23 — P0 Group: FinanceAPI (Part 2 of 2)](./section-23.md) ✅ **COMPLETED**
- [x] [Section 24 — P0 Group: CategoryAPI (Part 1 of 1)](./section-24.md) ✅ **COMPLETED**
- [x] [Section 25 — P0 Group: SupplierAPI (Part 1 of 1)](./section-25.md) ✅ **COMPLETED**
- [x] [Section 26 — P0 Group: ChatAPI (Part 1 of 1)](./sections/section-26.md) ✅ **COMPLETED**
- [x] [Section 27 — P0 Group: CancellationAPI (Part 1 of 1)](./sections/section-27.md) ✅ **COMPLETED**
- [x] [Section 28 — P0 Group: ReturnsAPI (Part 1 of 1)](./sections/section-28.md) ✅ **COMPLETED**
- [x] [Section 29 — P0 Group: DeliveryFBS (Part 1 of 2)](./section-29.md) ✅ **COMPLETED**
- [x] [Section 30 — P0 Group: DeliveryFBS (Part 2 of 2)](./section-30.md) ✅ **COMPLETED** (All 18 endpoints implemented in Part 1)
- [x] [Section 31 — P0 Group: BarcodeAPI (Part 1 of 1)](./section-31.md) ✅ **COMPLETED**
- [x] [Section 32 — P0 Group: PolygonAPI (Part 1 of 1)](./section-32.md) ✅ **COMPLETED**
- [x] [Section 33 — P0 Group: RFBSReturnsAPI (Part 1 of 1)](./section-33.md) ✅ **COMPLETED**
- [x] [Section 34 — P0 Group: SellerRating (Part 1 of 1)](./section-34.md) ✅ **COMPLETED**
- [x] [Section 35 — P0 Group: BrandAPI (Part 1 of 1)](./section-35.md) ✅ **COMPLETED**
- [x] [Section 36 — P0 Group: Promos (Part 1 of 1)](./section-36.md) ✅ **COMPLETED**
- [x] [Section 37 — P0 Group: DeliveryrFBS (Part 1 of 1)](./section-37.md) ✅ **COMPLETED**
- [x] [Section 38 — P0 Group: Pass (Part 1 of 1)](./section-38.md) ✅ **COMPLETED**
- [x] [Section 39 — P0 Group: ReturnAPI (Part 1 of 1)](./section-39.md) ✅ **COMPLETED**
- [x] [Section 40 — P0 Group: ReturnsAPI (Part 1 of 1)](./section-40.md) ✅ **COMPLETED** (Already implemented in Section 28)
- [x] [Section 41 — Beta Group: ReviewAPI (Part 1 of 1)](./section-41.md) ✅ **COMPLETED**
- [x] [Section 42 — Beta Group: Digital (Part 1 of 1)](./section-42.md) ✅ **COMPLETED**
- [x] [Section 43 — Beta Group: Quants (Part 1 of 1)](./section-43.md) ✅ **COMPLETED**
- [x] [Section 44 — Beta Group: BetaMethod (Part 1 of 1)](./section-44.md) ✅ **COMPLETED**
- [x] [Section 45 — Beta Group: Questions&Answers (Part 1 of 1)](./section-45.md) ✅ **COMPLETED**
