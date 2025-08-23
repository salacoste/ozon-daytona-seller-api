# Data Models and Schema Changes

## New Data Models

### Analytics Category
**Purpose:** Business analytics and reporting data types
**Integration:** Extends existing branded type pattern (ProductId, OfferId, etc.)

**Key Attributes:**
- `AnalyticsRequestId`: string & { readonly __brand: 'AnalyticsRequestId' }
- `ReportType`: enum - 'sales' | 'inventory' | 'performance'
- `DateRange`: { from: string; to: string } - ISO date strings

**Relationships:**
- **With Existing:** Uses ProductId, OfferId from common/base.ts
- **With New:** Integrates with Finance category for financial metrics

### Finance Category
**Purpose:** Financial operations, transactions, and reporting
**Integration:** Follows existing BaseRequest/BaseResponse pattern

**Key Attributes:**
- `TransactionId`: string & { readonly __brand: 'TransactionId' }
- `Amount`: number & { readonly __brand: 'Amount' }
- `Currency`: 'RUB' | 'USD' | 'EUR' - extending existing Currency pattern

**Relationships:**
- **With Existing:** Uses existing CurrencyCode types
- **With New:** Connects to Analytics for financial reporting

### Remaining Categories (3-32)
Each following the established patterns:
- Branded types for entity IDs
- BaseRequest/BaseResponse interfaces
- Readonly properties for immutability
- Zod schema validation alongside TypeScript types

## Schema Integration Strategy
**Database Changes Required:** N/A - SDK project with no database layer

**Type System Changes:**
- **New Type Files:** `/src/types/requests/{category}.ts` and `/src/types/responses/{category}.ts` for each of 31 categories
- **Extended Common Types:** Additional branded types in `/src/types/common/base.ts`
- **Zod Schema Files:** Corresponding validation schemas for each category
- **Migration Strategy:** Additive only - no breaking changes to existing types

**Backward Compatibility:**
- All existing ProductId, OfferId, CategoryId types remain unchanged
- Existing Product API types completely preserved
- New categories extend rather than modify the common type system
