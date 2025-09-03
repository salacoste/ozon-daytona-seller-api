# Migration Guide: OZON Seller API SDK

This guide helps existing Product API users migrate to the complete OZON Seller API SDK with all 32 API categories.

## Overview

The OZON Seller API SDK has been expanded from the original Product API implementation to include 32 comprehensive API categories covering all aspects of OZON seller operations. This migration guide ensures a smooth transition while maintaining 100% backward compatibility.

## 🚀 Quick Migration Summary

✅ **Zero Breaking Changes** - All existing Product API code continues to work  
✅ **Enhanced Functionality** - Access to 31 additional API categories  
✅ **Improved Types** - Better TypeScript support and type safety  
✅ **Consistent Interface** - Unified patterns across all APIs  

## Migration Steps

### Step 1: Update Dependencies

```bash
# Update to the latest version
npm update @ozon/seller-api

# Verify version
npm list @ozon/seller-api
```

### Step 2: Verify Existing Code (No Changes Required)

Your existing Product API code continues to work exactly as before:

```typescript
// ✅ EXISTING CODE - NO CHANGES NEEDED
import { OzonSellerApiClient, createApiKey, createClientId } from '@ozon/seller-api';

const client = new OzonSellerApiClient({
  apiKey: createApiKey('your-api-key'),
  clientId: createClientId('your-client-id')
});

// All existing Product API methods work unchanged
const products = await client.product.getList({
  filter: { visibility: 'VISIBLE' },
  last_id: "",
  limit: 100
});

const archived = await client.product.archive({
  product_id: [123, 456]
});
```

### Step 3: Explore New API Categories (Optional)

Now you can access 31 additional API categories:

```typescript
// 📊 Analytics & Reporting
const analytics = await client.analytics.getStockOnWarehouses({
  limit: 50,
  offset: 0,
  warehouse_type: "ALL"
});

const reports = await client.report.getFinanceCashFlowStatement({
  date: { from: '2024-01-01', to: '2024-01-31' },
  page: 1,
  page_size: 100
});

// 🚚 Fulfillment & Logistics
const fboOrders = await client.fbo.getUnfulfilledList({
  limit: 50,
  offset: 0
});

// 🎯 Marketing & Promotions
const promotions = await client.promos.getActions();
```

## What's New

### New API Categories Available

The SDK now includes 32 total API categories organized by business function:

#### 📊 Analytics & Reporting (3 APIs)
- **Analytics** (2 methods) - Performance metrics and business intelligence
- **Report** (8 methods) - Business reporting and analytics generation  
- **Quants** (2 methods) - Quantity and inventory analytics

#### 💰 Finance & Pricing (3 APIs)
- **Finance** (10 methods) - Financial operations and transaction management
- **Pricing Strategy** (12 methods) - Dynamic pricing and strategy management
- **Prices & Stocks** (9 methods) - Advanced pricing and inventory operations

#### 📦 Product Management (6 APIs)
- **Product** (23 methods) - *Your existing API - unchanged*
- **Brand** (1 method) - Brand management operations
- **Category** (6 methods) - Product category management
- **Certification** (12 methods) - Product certification workflows
- **Digital** (4 methods) - Digital product operations
- **Barcode** (5 methods) - Barcode generation and management

#### 🚚 Fulfillment & Logistics (8 APIs)
- **FBO** (13 methods) - Fulfillment by Ozon operations
- **FBS** (22 methods) - Fulfillment by Seller operations
- **Delivery FBS** (18 methods) - FBS delivery management
- **Delivery rFBS** (8 methods) - Reverse FBS delivery operations
- **FBS/rFBS Marks** (13 methods) - Shipping label management
- **Warehouse** (2 methods) - Warehouse operations
- **Supplier** (4 methods) - Supplier relationship management
- **FBO Supply Request** (19 methods) - FBO supply chain requests

#### 🔄 Returns & Customer Service (7 APIs)
- **Returns** (1 method) - Return processing and management
- **Return** (8 methods) - Return-specific operations
- **rFBS Returns** (8 methods) - Reverse FBS return processing
- **Chat** (8 methods) - Customer communication
- **Q&A** (8 methods) - Product questions and answers
- **Review** (7 methods) - Customer review management
- **Cancellation** (7 methods) - Order cancellation workflows

#### 🎯 Marketing & Promotions (3 APIs)
- **Promos** (8 methods) - Promotional campaigns and discount management
- **Premium** (8 methods) - Premium service management
- **Pass** (7 methods) - Pass and subscription services

#### 🧪 Experimental & Specialized (3 APIs)
- **Beta Method** (9 methods) - Beta features and experimental methods
- **Polygon** (4 methods) - Geographic polygon operations
- **Seller Rating** (2 methods) - Seller performance ratings

### Enhanced Type Safety

All APIs now include comprehensive TypeScript types:

```typescript
// Before: Basic typing
const result = await client.product.getList(params);

// After: Full type safety (automatically available)
import type { 
  GetProductListRequest, 
  GetProductListResponse 
} from '@ozon/seller-api';

const request: GetProductListRequest = {
  filter: { visibility: 'VISIBLE' },
  last_id: "",
  limit: 100
};

const response: GetProductListResponse = await client.product.getList(request);
```

## Common Migration Patterns

### Pattern 1: Adding Analytics to Existing Product Operations

```typescript
// Your existing product operations
const products = await client.product.getList({
  filter: { visibility: 'VISIBLE' },
  limit: 100
});

// NEW: Add analytics data
const stockAnalytics = await client.analytics.getStockOnWarehouses({
  limit: 100,
  offset: 0,
  warehouse_type: "ALL"
});

// Combine data for enhanced insights
const enrichedProducts = products.result?.items?.map(product => ({
  ...product,
  stockData: stockAnalytics.result?.rows?.find(stock => 
    stock.sku === product.offer_id
  )
}));
```

### Pattern 2: Integrating Financial Reporting

```typescript
// Your existing product pricing
const prices = await client.product.getProductPrices({
  filter: {
    offer_id: ['SKU-001', 'SKU-002']
  },
  limit: 100
});

// NEW: Add financial context
const financialReport = await client.report.getFinanceCashFlowStatement({
  date: { from: '2024-01-01', to: '2024-01-31' },
  page: 1,
  page_size: 100
});

// Enhanced business intelligence
const profitabilityAnalysis = {
  products: prices.result?.items,
  financialContext: financialReport.result?.operations
};
```

### Pattern 3: Enhanced Order Management

```typescript
// Your existing product management
const products = await client.product.getList({ 
  filter: {}, 
  last_id: "", 
  limit: 100 
});

// NEW: Complete order lifecycle management
const fboOrders = await client.fbo.getUnfulfilledList({
  limit: 50,
  offset: 0
});

const fbsDeliveries = await client['delivery-fbs'].getDeliveryVariants({
  filter: {
    cutoff_from: '2024-01-01',
    cutoff_to: '2024-01-31'
  },
  limit: 50,
  offset: 0
});

// Comprehensive operational view
const operationalDashboard = {
  productCatalog: products.result?.items,
  pendingFBOOrders: fboOrders.result?.orders,
  activeDeliveries: fbsDeliveries.result?.deliveries
};
```

## Error Handling Updates

Error handling remains the same with enhanced error context:

```typescript
try {
  // Your existing code works unchanged
  const result = await client.product.archive({ product_id: [123] });
} catch (error) {
  // Same error handling patterns
  if (error.code === 'INVALID_ARGUMENT') {
    console.error('Invalid product IDs');
  } else if (error.code === 'PERMISSION_DENIED') {
    console.error('Insufficient permissions');
  }
}

// NEW: Enhanced error context for new APIs
try {
  const promotions = await client.promos.getActions();
} catch (error) {
  // Consistent error handling across all APIs
  if (error.code === 'PROMOTION_NOT_AVAILABLE') {
    console.error('No promotions available');
  }
}
```

## Performance Considerations

### Unchanged Performance
- Existing Product API calls have identical performance characteristics
- Same HTTP client with connection pooling and compression
- No impact on existing code execution time

### New Optimization Opportunities
```typescript
// Parallel API calls for enhanced performance
const [products, analytics, financials] = await Promise.all([
  client.product.getList({ filter: {}, last_id: "", limit: 100 }),
  client.analytics.getStockOnWarehouses({ limit: 100, offset: 0, warehouse_type: "ALL" }),
  client.finance.getTransactionList({ 
    filter: { date: { from: '2024-01-01', to: '2024-01-31' } },
    page: 1,
    page_size: 100
  })
]);
```

## Testing Your Migration

### 1. Verify Existing Functionality

```typescript
// Test suite to verify no breaking changes
describe('Product API Migration Compatibility', () => {
  test('existing product operations unchanged', async () => {
    const client = new OzonSellerApiClient({
      apiKey: createApiKey('test-key'),
      clientId: createClientId('test-id')
    });

    // All existing calls should work identically
    const products = await client.product.getList({
      filter: { visibility: 'VISIBLE' },
      last_id: "",
      limit: 10
    });

    expect(products).toBeDefined();
    expect(products.result?.items).toBeInstanceOf(Array);
  });
});
```

### 2. Test New API Access

```typescript
describe('New API Categories', () => {
  test('can access all new APIs', async () => {
    const client = new OzonSellerApiClient({
      apiKey: createApiKey('test-key'),
      clientId: createClientId('test-id')
    });

    // Verify new APIs are accessible
    expect(client.analytics).toBeDefined();
    expect(client.report).toBeDefined();
    expect(client.finance).toBeDefined();
    expect(client.promos).toBeDefined();
    // ... etc for all 32 APIs
  });
});
```

## Breaking Changes: NONE

✅ **Zero breaking changes** - This is a major commitment of this migration  
✅ **Identical method signatures** - All existing Product API methods unchanged  
✅ **Same response formats** - Response structures remain consistent  
✅ **Compatible error handling** - Error codes and messages unchanged  
✅ **Preserved imports** - All existing imports continue to work  

## Recommended Migration Timeline

### Phase 1: Verification (Week 1)
- [ ] Update SDK dependency
- [ ] Run existing test suite
- [ ] Verify all existing functionality works
- [ ] No code changes required

### Phase 2: Exploration (Weeks 2-3)
- [ ] Identify business processes that could benefit from new APIs
- [ ] Experiment with Analytics and Report APIs for insights
- [ ] Test integration patterns with new APIs

### Phase 3: Enhancement (Weeks 4-6)
- [ ] Gradually integrate relevant new APIs
- [ ] Enhance existing workflows with additional data
- [ ] Implement comprehensive business intelligence

### Phase 4: Optimization (Ongoing)
- [ ] Optimize API usage patterns
- [ ] Implement advanced business logic using multiple APIs
- [ ] Monitor performance and refine integration

## Support and Troubleshooting

### Common Issues and Solutions

#### Issue: Import Errors
```typescript
// ❌ If you see import errors
import { OzonSellerApiClient } from '@ozon/seller-api/old-path';

// ✅ Use the standard import (unchanged)
import { OzonSellerApiClient } from '@ozon/seller-api';
```

#### Issue: Type Errors
```typescript
// ❌ If you see TypeScript errors
const client: any = new OzonSellerApiClient(config);

// ✅ Use proper typing (enhanced, but compatible)
const client: OzonSellerApiClient = new OzonSellerApiClient(config);
```

#### Issue: New API Access
```typescript
// ❌ Trying to access non-existent API
await client.nonExistentApi.method();

// ✅ Check API availability and documentation
// Refer to docs/api/README.md for complete API list
await client.analytics.getStockOnWarehouses(params);
```

### Migration Support Resources

- **[Complete API Documentation](./api/README.md)** - Full reference for all 32 APIs
- **[API Summary](./api/api-summary.md)** - Overview with method counts and groupings
- **[Individual API Guides](./api/)** - Detailed documentation for each API category
- **[TypeScript Definitions](../src/types/)** - Complete type definitions
- **[Integration Tests](../tests/integration/)** - Example usage patterns

### Getting Help

1. **Check Documentation** - Comprehensive docs for all APIs
2. **Review Examples** - Real-world usage patterns in tests
3. **Verify Types** - Use TypeScript for compile-time validation
4. **Test Incrementally** - Add new APIs gradually to existing workflows

## Summary

This migration maintains 100% backward compatibility while providing access to 31 additional API categories. Your existing Product API code requires no changes and continues to work identically. The enhanced SDK enables comprehensive OZON seller operations through a unified, type-safe interface.

**Key Benefits:**
- ✅ No breaking changes or code modifications required
- ✅ Access to 278 total methods across 32 API categories  
- ✅ Enhanced TypeScript support and type safety
- ✅ Comprehensive business intelligence capabilities
- ✅ Unified error handling and response patterns
- ✅ Complete documentation and examples

Start by updating your dependency and verifying existing functionality, then gradually explore the new capabilities that enhance your OZON seller operations.

---

*Last updated: Story 1.8 Implementation - This migration guide is part of the comprehensive SDK release preparation.*