# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **TypeScript SDK for Ozon Seller API** (`@ozon/sdk`) - a comprehensive, type-safe client library for the Ozon marketplace seller API. The project transforms from a simple API client to a full-featured TypeScript SDK covering 263 endpoints across 32 API groups with 1069 schemas.

### Project Goals
- **Type Safety**: Zero `any` in public API, full TypeScript coverage
- **Comprehensive Coverage**: All production API groups (FBO, FBS, ProductAPI, Analytics, etc.)
- **Developer Experience**: <10min "hello world" time, intuitive pagination, excellent documentation
- **Enterprise Ready**: Rate limiting, retry policies, error handling, logging hooks
- **Dual Compatibility**: ESM/CJS builds, Node.js 18+, browser support (best-effort)

## Development Commands

### Core Development
- `npm run build` - Build TypeScript to `dist/esm` and `dist/cjs` with type declarations
- `npm run clean` - Clean build artifacts
- `npm run lint` - Run ESLint (zero tolerance for `any` in public API)
- `npm run format` - Run Prettier formatter
- `npm run typecheck` - Run TypeScript compiler without emit

### Testing
- `npm test` - Run unit tests with coverage (≥80% target)
- `npm run test:unit` - Unit tests only
- `npm run test:contract` - Contract tests (validate examples against types)
- `npm run test:e2e` - End-to-end tests (requires real API credentials)

### Code Generation
- `npm run generate:types` - Generate TypeScript types from `api-doc/ozon-api-documentation/`
- `npm run generate:client` - Generate client methods from API specs

## Architecture

### Core Components

**`src/index.ts`** - Main SDK entry point
- Exports `OzonClient` class and all types
- ESM/CJS dual build configuration

**`src/client/OzonClient.ts`** - Main SDK client
- Central configuration (clientId, apiKey, baseUrl)
- Sub-client registration and management
- Shared HTTP transport and middleware

**`src/transport/HttpClient.ts`** - HTTP transport layer
- Fetch-compatible API with interceptors
- Authentication header injection
- Timeout and AbortSignal support

**`src/transport/middleware/`** - Request/response middleware
- `RetryMiddleware.ts` - Exponential backoff with jitter
- `RateLimitMiddleware.ts` - Token bucket rate limiting
- `LoggingMiddleware.ts` - Request/response logging hooks

**`src/errors/`** - Error handling
- `OzonApiError.ts` - Base API error with rpcStatus normalization
- `RateLimitError.ts`, `AuthError.ts`, `ValidationError.ts` - Specialized errors

**`src/pagination/`** - Pagination utilities
- `iterateByLastId.ts` - Iterator for last_id based pagination
- `iterateByOffset.ts` - Iterator for limit/offset pagination
- `iterateByCursor.ts` - Iterator for cursor-based pagination

**`src/clients/`** - API group clients
- `ProductAPI.ts`, `FBOAPI.ts`, `FBSAPI.ts` - Core business logic
- `AnalyticsAPI.ts`, `ReportAPI.ts` - Data and reporting
- `WarehouseAPI.ts`, `PricesStocksAPI.ts` - Operations
- `*API.ts` - All 32 API groups from methods/ directory

**`src/types/generated/`** - Auto-generated types
- Schema types from `components/schemas-part-*.json`
- Request/response interfaces from `methods/*.json`
- Method metadata and operationId mappings

### Client Architecture Example

```typescript
import { OzonClient } from '@ozon/sdk';

const client = new OzonClient({ 
  clientId: 'your-client-id', 
  apiKey: 'your-api-key' 
});

// P0 Groups (Priority 0)
const products = await client.product.list({ limit: 100 });
const orders = await client.fbo.list({ limit: 50 });
const stocks = await client.pricesStocks.analyticsStocks({ skus: ['SKU123'] });

// Pagination example
for await (const page of client.fbo.listReturnsPaginated({ 
  date_from: '2024-01-01', 
  limit: 500 
})) {
  // Process page of returns
}
```

### Transport Layer

**Authentication**: All requests automatically include `Client-Id` and `Api-Key` headers

**Rate Limiting**: Configurable token bucket (default: respects Ozon API limits)

**Retries**: Exponential backoff for 5xx and network errors (max 3 attempts)

**Error Normalization**: All API errors mapped to typed `OzonApiError` classes

**Logging**: Optional hooks for request/response/retry events (English only, no PII)

## API Usage Patterns & Developer Guidelines

### Basic Client Setup

```typescript
import { OzonClient } from '@ozon/sdk';

const client = new OzonClient({
  clientId: process.env.OZON_CLIENT_ID!,
  apiKey: process.env.OZON_API_KEY!,
  // Optional configuration
  baseUrl: 'https://api-seller.ozon.ru', // production (default)
  timeoutMs: 30000,
  maxRetries: 3,
  rateLimitRps: 10 // requests per second
});
```

### Error Handling

```typescript
try {
  const products = await client.product.list({ limit: 100 });
} catch (error) {
  if (error instanceof OzonApiError) {
    console.error(`API Error ${error.code}: ${error.message}`);
    console.error('Details:', error.details);
  } else if (error instanceof RateLimitError) {
    console.error('Rate limited, retry after:', error.retryAfter);
  } else {
    console.error('Unexpected error:', error);
  }
}
```

### Pagination Patterns

```typescript
// Automatic pagination with async iterators
for await (const page of client.fbo.listReturnsPaginated(params)) {
  console.log(`Page with ${page.result.returns.length} items`);
}

// Manual pagination control
let hasMore = true;
let lastId = undefined;
while (hasMore) {
  const response = await client.fbs.getListV3({ 
    limit: 1000, 
    offset: lastId 
  });
  // Process response.result
  hasMore = response.result.has_next;
  lastId = response.result.last_id;
}
```

## Development Guidelines

### Code Quality Standards

1. **Zero `any` Policy**: Public API must not expose `any` types
2. **English Only**: All comments, logs, documentation in English
3. **Type Safety**: All request/response interfaces must be properly typed
4. **Error Handling**: All API calls must handle errors appropriately
5. **Testing**: ≥80% test coverage for core functionality

### File Organization Rules

- **≤200 LOC per file**: Split large files maintaining logical boundaries
- **Co-located tests**: Place test files alongside source (e.g., `Client.ts` + `Client.test.ts`)
- **Generated code**: Keep in `src/types/generated/` directory
- **Manual overrides**: Place in `src/types/manual/` for schema fixes

### Task Management Rules

1. **One sub-task at a time**: Do NOT start the next sub-task until user permission
2. **Use Context7 MCP**: Always use context7 MCP server for best practices
3. **Completion protocol**:
   - Mark sub-tasks as completed `[x]` immediately after finishing
   - Mark parent task `[x]` only when ALL sub-tasks are completed
   - Update relevant files list as you work
4. **Stop and wait**: Pause after each sub-task for user approval

### API Implementation Patterns

When implementing API methods:

```typescript
// Method naming: use SDK-friendly names, not raw operationIds
class FBOAPI {
  // Good: descriptive, version-aware
  async getUnfulfilledListV3(params: GetUnfulfilledListParams): Promise<UnfulfilledListResponse> {
    return this.httpClient.post('/v3/posting/fbs/unfulfilled/list', params);
  }
  
  // Good: provide pagination iterator
  async *iterateUnfulfilledV3(params: GetUnfulfilledListParams) {
    yield* iterateByOffset(
      (offset) => this.getUnfulfilledListV3({ ...params, offset }),
      (response) => response.result.has_next
    );
  }
}
```

## Testing Strategy

### Unit Tests
- Mock HTTP transport using `whatwg-fetch` or `MSW`
- Test request formatting, response parsing, error handling
- Verify header injection and middleware execution

### Contract Tests
- Validate that JSON examples from API docs parse correctly to generated types
- Ensure type definitions match actual API responses

### Integration Tests
- Optional E2E tests with real API credentials
- Test authentication, rate limiting, error scenarios

## Dependencies & Environment

### Core Dependencies
- **TypeScript** 5.0+ - Language and compiler
- **@types/node** - Node.js type definitions  
- **whatwg-fetch** - Fetch polyfill for Node.js < 18

### Development Dependencies
- **Vitest** - Test runner with TypeScript support
- **ESLint** + **@typescript-eslint** - Linting with strict rules
- **Prettier** - Code formatting
- **tsx** - TypeScript execution for scripts

### Environment Requirements
- **Node.js**: 18+ (for native fetch support)
- **TypeScript**: 5.0+ (for advanced type features)
- **API Credentials**: Set via environment variables or config file

## API Documentation Source

The SDK is generated from official Ozon API documentation:
- **Root**: `api-doc/ozon-api-documentation/`
- **Index**: `INDEX.json` - API statistics and group organization
- **Schemas**: `components/schemas-part-*.json` - Type definitions (1069 schemas)
- **Methods**: `methods/*.json` - Production API endpoints (27 groups, 263 endpoints)
- **Beta**: `beta/*.json` - Beta API endpoints (5 groups, 29 endpoints)

## API Groups Priority (Development Order)

### P0 (Priority 0 - First Implementation)
- **FBO** (`methods/06-fbo.json`) - 13 endpoints
- **FBS** (`methods/01-fbs.json`) - 22 endpoints  
- **FboSupplyRequest** (`methods/02-fbosupplyrequest.json`) - 19 endpoints
- **Prices&StocksAPI** (`methods/10-prices-stocksapi.json`) - 9 endpoints
- **WarehouseAPI** (`methods/23-warehouseapi.json`) - 2 endpoints
- **ProductAPI** (`methods/03-productapi.json`) - 18 endpoints

### P1 (Priority 1 - Second Wave)
- **AnalyticsAPI** (`methods/19-analyticsapi.json`) - 5 endpoints
- **ReportAPI** (`methods/16-reportapi.json`) - 8 endpoints
- **FinanceAPI** (`methods/09-financeapi.json`) - 11 endpoints
- **ReturnsAPI/RFBSReturnsAPI/ReturnAPI** - Combined returns handling

### P2 (Priority 2 - Later Implementation)
- **Promos** (`methods/11-promos.json`) - 8 endpoints
- **PricingStrategyAPI** (`methods/07-pricingstrategyapi.json`) - 12 endpoints
- **CategoryAPI** (`methods/20-categoryapi.json`) - 4 endpoints
- **SupplierAPI** (`methods/21-supplierapi.json`) - 4 endpoints
- **ChatAPI** (`methods/15-chatapi.json`) - 8 endpoints
- **CancellationAPI** (`methods/18-cancellationapi.json`) - 7 endpoints
- **BarcodeAPI** (`methods/22-barcodeapi.json`) - 2 endpoints
- **PolygonAPI** (`methods/24-polygonapi.json`) - 2 endpoints
- **SellerRating** (`methods/25-sellerrating.json`) - 2 endpoints
- **Pass** (`methods/17-pass.json`) - 7 endpoints

### Beta Groups (Optional - Behind Feature Flag)
Beta methods available with `enableBeta: true` configuration:
- **BetaMethod** (`beta/01-betamethod.json`) - 9 endpoints
- **Questions&Answers** (`beta/02-questions-answers.json`) - 8 endpoints
- **ReviewAPI** (`beta/03-reviewapi.json`) - 7 endpoints
- **Digital** (`beta/04-digital.json`) - 3 endpoints
- **Quants** (`beta/05-quants.json`) - 2 endpoints

## Release Milestones

### M1 (Core Foundation) - 2 weeks
- SDK infrastructure, transport, authentication
- Error handling and pagination utilities  
- P0 groups with minimal 1-2 methods per group
- Unit tests and basic documentation

### M2 (P0 Coverage) - 2-3 weeks
- Complete P0 group implementation
- Critical P1 methods (Analytics, Reports)
- Contract tests and comprehensive examples
- Enhanced pagination and error handling

### M3 (Analytics & Reports) - 2 weeks
- Full AnalyticsAPI and ReportAPI coverage
- Advanced pagination patterns
- Data aggregation utilities
- Performance optimizations

### M4 (Stabilization & Beta) - 1-2 weeks
- Beta methods behind feature flag
- DX improvements and polish
- Performance benchmarks
- Release 1.0.0

## Success Metrics (KPIs)

- **Developer Experience**: <10 min "hello world" setup time
- **Reliability**: <1% unhandled errors with proper usage
- **Type Safety**: Zero `any` in public API surface
- **Test Coverage**: ≥80% for core functionality
- **Documentation**: Usage example for every P0 group
- @prd-project-files/PRD.md находится PRD проекта
- @tasks/ находится список задач по реализации проекта
- @.cursor/rules/ находятся правила