# Testing Strategy for Brownfield API Expansion

## Overview
Comprehensive testing strategy to ensure safe brownfield expansion from 1 to 32 API categories.

## Testing Pyramid

### Unit Tests (Foundation - 95% Coverage Target)
- **Scope**: Individual methods, classes, and functions
- **Coverage Requirement**: ≥95% lines/branches/functions
- **Location**: `src/**/*.test.ts`
- **Command**: `npm run test:unit`

#### Critical Areas
- [ ] **Existing Product API**: Zero regression tolerance
- [ ] **Core HTTP Client**: All error scenarios
- [ ] **Type Validations**: All Zod schemas  
- [ ] **New API Categories**: Complete method coverage

### Integration Tests (API Contract Testing)
- **Scope**: API interactions and data flow
- **Coverage Target**: All API endpoints
- **Location**: `tests/integration/`
- **Command**: `npm run test:integration`

#### Test Categories
- [ ] **Backward Compatibility**: Existing Product API unchanged
- [ ] **Cross-Category Integration**: Categories working together
- [ ] **Error Handling**: Network failures, API errors
- [ ] **Configuration**: Different client configurations

### Performance Tests (Non-Functional Requirements)
- **Scope**: Response times, memory usage, bundle size
- **Requirements**: NFR1 (<200ms), NFR5 (bundle limits)
- **Location**: `tests/performance/`
- **Command**: `npm run test:performance`

#### Performance Targets
- [ ] **Response Time**: <200ms for cached operations
- [ ] **Memory Usage**: <100MB heap for typical usage
- [ ] **Bundle Size**: <500KB ESM, <500KB CJS
- [ ] **Concurrent Requests**: Handle 10+ simultaneous calls

## Breaking Change Testing

### Automated Baseline Testing
\`\`\`bash
# Capture current API surface
npm run breaking:update

# Detect any breaking changes
npm run breaking:check
\`\`\`

### API Contract Validation
- [ ] **Method Signatures**: All existing methods unchanged
- [ ] **Return Types**: Compatible response structures  
- [ ] **Error Formats**: Consistent error handling
- [ ] **Usage Patterns**: Common usage scenarios still work

### Regression Test Suite
Comprehensive tests for existing functionality:
\`\`\`typescript
describe('Backward Compatibility', () => {
  describe('Product API', () => {
    it('should maintain all existing method signatures', () => {
      // Test existing method calls
    });
    
    it('should return compatible response formats', () => {
      // Test response structure compatibility
    });
    
    it('should handle errors in the same way', () => {
      // Test error handling consistency  
    });
  });
});
\`\`\`

## Quality Gates

### Pre-Commit Validation
\`\`\`bash
# Run before every commit
npm run typecheck
npm run lint  
npm run test:unit
npm run breaking:check
\`\`\`

### Pre-Release Validation
\`\`\`bash
# Complete validation suite
npm run clean
npm run build
npm run test:unit
npm run test:integration  
npm run test:performance
npm run breaking:check
npm run bundle:check
npm run risk:assess
\`\`\`

## Success Metrics

### Coverage Metrics
- [ ] **Unit Test Coverage**: ≥95% maintained
- [ ] **Integration Coverage**: All endpoints tested
- [ ] **Performance Coverage**: All NFRs validated
- [ ] **Regression Coverage**: All existing functionality

### Quality Metrics
- [ ] **Zero Regressions**: No existing functionality broken
- [ ] **Performance Maintained**: <200ms response times
- [ ] **Bundle Size**: Within defined limits
- [ ] **Error Rate**: <0.1% in production

---
**USER ACTION REQUIRED**: Implement comprehensive test suites for each new API category following this strategy.