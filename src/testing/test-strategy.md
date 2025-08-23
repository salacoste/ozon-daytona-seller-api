# Ozon Seller API SDK Testing Strategy

## Overview

Comprehensive testing strategy for the Ozon Seller API SDK ensuring reliability, type safety, and proper error handling across all API categories.

## Testing Pyramid

### 1. Unit Tests (80% coverage target)
- **Core Infrastructure**
  - HTTP client retry logic and timeout handling
  - Authentication manager credential validation
  - Error hierarchy instantiation and properties
  - Type utilities and branded type helpers
- **Category APIs**
  - Individual method parameter validation
  - Response type mapping and transformation
  - Error handling for each endpoint
- **Configuration**
  - SDK configuration validation
  - Default value application
  - URL validation and sanitization

### 2. Integration Tests (15% coverage target)
- **API Category Integration**
  - ProductAPI end-to-end workflows
  - Cross-method dependencies (import → getInfo → updateAttributes)
  - Rate limiting and retry behavior
- **Authentication Flow**
  - API key and client ID validation
  - Error responses for invalid credentials
- **HTTP Client Integration**
  - Request/response cycle with real network calls
  - Timeout and retry scenarios

### 3. End-to-End Tests (5% coverage target)
- **Complete SDK Workflows**
  - Full product lifecycle (create → update → archive)
  - Multi-category operations
  - Error recovery scenarios
- **Production-like Scenarios**
  - Large dataset handling
  - Concurrent request management
  - Network failure recovery

## Test Categories by API Domain

### Core Infrastructure Tests
```typescript
// HTTP Client Tests
describe('HttpClient', () => {
  test('retries failed requests with exponential backoff')
  test('respects timeout configuration')
  test('handles network errors gracefully')
  test('applies rate limiting correctly')
})

// Authentication Tests
describe('AuthManager', () => {
  test('validates API key format')
  test('masks credentials in debug output')
  test('detects invalid client ID')
})

// Error Handling Tests
describe('Error System', () => {
  test('maps HTTP status codes to error types')
  test('preserves request context in errors')
  test('handles malformed API responses')
})
```

### ProductAPI Tests
```typescript
// Method-specific Tests
describe('ProductApi', () => {
  describe('archive', () => {
    test('archives products by ID list')
    test('validates product ID array limits')
    test('handles partial failure responses')
  })
  
  describe('getList', () => {
    test('returns paginated product list')
    test('applies filter parameters correctly')
    test('handles empty result sets')
  })
  
  describe('importBySku', () => {
    test('imports products with valid SKU data')
    test('tracks import task status')
    test('validates price and currency formats')
  })
})
```

## Mock Strategy

### API Response Mocking
- **Static Fixtures**: JSON response files for each endpoint
- **Dynamic Mocking**: Parameterized responses for testing edge cases
- **Error Simulation**: Network failures, timeout scenarios, API errors

### Test Data Management
```typescript
// fixtures/product-responses.ts
export const PRODUCT_LIST_RESPONSE: GetProductListResponse = {
  result: {
    items: [
      {
        id: createProductId(12345),
        name: "Test Product",
        offer_id: createOfferId("TEST-001"),
        // ... complete fixture data
      }
    ],
    last_id: "abc123",
    total: 1
  }
};
```

## Performance Testing

### Load Testing Scenarios
- **Concurrent Requests**: 50+ simultaneous API calls
- **Large Datasets**: 1000+ product operations
- **Rate Limiting**: API throttling behavior validation
- **Memory Usage**: Memory leak detection during extended usage

### Benchmark Targets
- **Response Time**: <200ms for simple operations, <2s for complex operations
- **Memory Usage**: <50MB for typical usage patterns
- **Error Rate**: <0.1% for network-related failures

## Test Environment Configuration

### Environment Setup
```typescript
// test/setup.ts
export const TEST_CONFIG: OzonConfig = {
  apiKey: createApiKey(process.env.OZON_TEST_API_KEY || 'test-key'),
  clientId: createClientId(process.env.OZON_TEST_CLIENT_ID || 'test-client'),
  baseUrl: 'https://api-seller-test.ozon.ru',
  timeout: 5000,
  retries: 2
};
```

### CI/CD Integration
- **Pre-commit Hooks**: Unit tests must pass
- **PR Validation**: Full test suite execution
- **Release Testing**: Integration tests against staging environment
- **Package Validation**: Installation and import testing

## Test Organization Structure

```
tests/
├── unit/
│   ├── core/
│   │   ├── http.test.ts
│   │   ├── auth.test.ts
│   │   └── errors.test.ts
│   ├── categories/
│   │   └── product/
│   │       └── index.test.ts
│   └── types/
│       └── branded-types.test.ts
├── integration/
│   ├── product-api.test.ts
│   └── client.test.ts
├── e2e/
│   └── workflows.test.ts
├── fixtures/
│   ├── product-responses.ts
│   └── error-responses.ts
└── helpers/
    ├── mock-server.ts
    └── test-utils.ts
```

## Quality Gates

### Coverage Requirements
- **Minimum**: 85% line coverage, 80% branch coverage
- **Core Infrastructure**: 95% coverage required
- **Public API Methods**: 90% coverage required
- **Error Paths**: 100% coverage for error handling code

### Test Quality Metrics
- **Test Isolation**: No shared state between tests
- **Deterministic**: Tests must pass consistently
- **Fast Execution**: Unit tests <10ms, integration tests <1s
- **Clear Assertions**: Self-documenting test expectations

## Continuous Testing Strategy

### Automated Testing Pipeline
1. **Pre-commit**: Lint, type check, unit tests
2. **PR Validation**: Full test suite, coverage reports
3. **Nightly Builds**: Integration tests against live API
4. **Release Preparation**: E2E tests, performance validation

### Test Maintenance
- **Regular Review**: Monthly test effectiveness evaluation
- **API Changes**: Tests updated with API documentation changes
- **Deprecation Handling**: Legacy test cleanup
- **Performance Monitoring**: Test execution time tracking