# Testing Strategy

## Integration with Existing Tests
**Existing Test Framework:** Vitest 1.0.4 with comprehensive mocking using vi.fn() and global fetch mocking
**Test Organization:** Clear separation - `/tests/unit/categories/`, `/tests/unit/core/`, `/tests/integration/`, `/tests/performance/`
**Coverage Requirements:** 95% coverage enforced across branches, functions, lines, and statements

## New Testing Requirements

### Unit Tests for New Components
- **Framework:** Vitest (same as existing) - no changes needed
- **Location:** `/tests/unit/categories/{category-name}/index.test.ts` for each of 31 categories  
- **Coverage Target:** 95% maintained across entire SDK
- **Integration with Existing:** Follows exact patterns from ProductApi tests - constructor mocking, HttpClient injection, response validation

### Integration Tests
- **Scope:** Each new category tested with real HTTP client behavior using Nock for response mocking
- **Existing System Verification:** Core HttpClient, AuthManager, and error handling continue working with all categories
- **New Feature Testing:** Each category's endpoint integration validated with proper request/response flow

### Regression Testing
- **Existing Feature Verification:** Automated regression tests ensure ProductApi functionality unchanged
- **Automated Regression Suite:** Current CI/CD pipeline runs all tests for every change - scales automatically
- **Manual Testing Requirements:** None needed - comprehensive automated coverage
