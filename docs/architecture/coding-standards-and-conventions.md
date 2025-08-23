# Coding Standards and Conventions

## Existing Standards Compliance
**Code Style:** TypeScript strict mode with explicit return types, no-any warnings, prefer-const enforcement
**Linting Rules:** ESLint + TypeScript ESLint with comprehensive rules for consistency and quality
**Testing Patterns:** Vitest with comprehensive type-safe testing, proper mocking, and 95% coverage requirement
**Documentation Style:** JSDoc with Russian descriptions for endpoints, comprehensive TypeScript typing

## Enhancement-Specific Standards
**NONE REQUIRED** - Your existing standards are perfect for the 32-category expansion.

## Critical Integration Rules
- **Existing API Compatibility:** All new categories follow ProductApi patterns - constructor receives HttpClient, async methods with RequestOptions, proper error handling
- **Database Integration:** N/A - SDK project with no database layer
- **Error Handling:** All new categories use existing error hierarchy from `/src/core/errors.ts` with same retry logic and rate limiting
- **Logging Consistency:** All categories use same HttpClient logging patterns for request/response tracking
