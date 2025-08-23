# Existing Project Analysis

## Current Project State
- **Primary Purpose:** Comprehensive TypeScript SDK for OZON Seller API with category-based organization
- **Current Tech Stack:** TypeScript 5.3, ESNext modules, Zod 3.22, Vitest 1.0, cross-fetch 4.0
- **Architecture Style:** Category-based modular SDK with core HTTP client and authentication management
- **Deployment Method:** npm package with dual ESM/CJS exports, Node.js 18+ target

## Available Documentation
- ✅ Package.json with comprehensive scripts (build, test, lint, docs generation)
- ✅ TypeScript strict mode configuration with enterprise-grade type safety
- ✅ Vitest testing framework with unit, integration, and performance test suites
- ✅ Nock for HTTP mocking in tests (perfect for API SDK testing)
- ✅ ESLint + Prettier for code quality
- ✅ Comprehensive build tooling (dual module format, TypeDoc, bundle size checking)

## Identified Constraints
- **Node.js 18+ requirement** - Modern runtime targeting
- **ESNext module system** - Must maintain modern JavaScript patterns
- **Strict TypeScript** - All new code must pass strict mode compilation
- **Dual module export** - Must support both ESM and CJS consumers
- **Zero runtime dependencies** - Only cross-fetch and Zod as production dependencies
- **Category-based structure** - Must follow existing `/src/categories/{name}/` pattern
- **Existing Product API** - Must maintain 100% backward compatibility
