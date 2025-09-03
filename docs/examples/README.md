# OZON Seller API SDK - Examples and Tutorials

This directory contains comprehensive examples and tutorials for using the OZON Seller API SDK effectively.

## 📚 Tutorial Categories

### Getting Started
- **[Quick Start Guide](./quick-start.md)** - Basic setup and first API calls
- **[Authentication Setup](./authentication.md)** - API key and client configuration
- **[Error Handling](./error-handling.md)** - Comprehensive error handling patterns

### Core Business Operations
- **[Product Management](./product-management.md)** - Complete product lifecycle examples
- **[Inventory Management](./inventory-management.md)** - Stock and warehouse operations
- **[Order Processing](./order-processing.md)** - FBO/FBS order management
- **[Financial Operations](./financial-operations.md)** - Payments and reporting

### Advanced Workflows
- **[Multi-API Integration](./multi-api-integration.md)** - Combining multiple APIs
- **[Promotional Campaigns](./promotional-campaigns.md)** - Marketing and promos
- **[Analytics Dashboard](./analytics-dashboard.md)** - Business intelligence
- **[Automated Workflows](./automated-workflows.md)** - Background processing

### Specialized Use Cases
- **[International Sellers](./international-sellers.md)** - Multi-region operations
- **[High-Volume Operations](./high-volume-operations.md)** - Enterprise-scale usage
- **[Migration Examples](./migration-examples.md)** - From other platforms

## 🚀 Quick Examples by Business Need

### Product Catalog Management
```typescript
import { OzonSellerApiClient, createApiKey, createClientId } from '@ozon/seller-api';

const client = new OzonSellerApiClient({
  apiKey: createApiKey('your-api-key'),
  clientId: createClientId('your-client-id')
});

// List all visible products
const products = await client.product.getList({
  filter: { visibility: 'VISIBLE' },
  last_id: "",
  limit: 100
});

// Get detailed product information
const productDetails = await client.product.getProductInfo({
  offer_id: 'your-sku-123',
  product_id: 0,
  sku: 0
});

// Update product prices
const priceUpdate = await client['pricing-strategy'].importPrices({
  prices: [{
    offer_id: 'your-sku-123',
    price: '999',
    old_price: '1299',
    premium_price: '899'
  }]
});
```

### Sales Analytics
```typescript
// Get warehouse stock analytics
const stockAnalytics = await client.analytics.getStockOnWarehouses({
  limit: 100,
  offset: 0,
  warehouse_type: "ALL"
});

// Generate financial report
const financialReport = await client.report.getFinanceCashFlowStatement({
  date: { from: '2024-01-01', to: '2024-01-31' },
  page: 1,
  page_size: 100
});

// Create products performance report
const productsReport = await client.report.createProductsReport({
  sku: [123456789, 987654321],
  visibility: 'VISIBLE',
  language: 'RU'
});
```

### Order Management
```typescript
// Get FBO unfulfilled orders
const fboOrders = await client.fbo.getUnfulfilledList({
  limit: 50,
  offset: 0
});

// Process FBS orders
const fbsOrders = await client.fbs.getOrders({
  filter: {
    since: '2024-01-01T00:00:00Z',
    to: '2024-01-31T23:59:59Z',
    status: 'awaiting_packaging'
  },
  limit: 50,
  offset: 0
});

// Get delivery information
const deliveryVariants = await client['delivery-fbs'].getDeliveryVariants({
  filter: {
    cutoff_from: '2024-01-01',
    cutoff_to: '2024-01-31'
  },
  limit: 50,
  offset: 0
});
```

### Promotional Campaigns
```typescript
// Discover available promotions
const promotions = await client.promos.getActions();

// Get eligible products for promotion
const candidates = await client.promos.getCandidates({
  action_id: 12345,
  limit: 100
});

// Join products to promotion
const activation = await client.promos.activateProducts({
  action_id: 12345,
  products: [{
    product_id: 67890,
    action_price: '899',
    stock: 50
  }]
});
```

## 📖 Tutorial Structure

Each tutorial includes:

1. **Overview** - What you'll learn and prerequisites
2. **Setup** - Initial configuration and dependencies
3. **Step-by-Step Guide** - Detailed implementation
4. **Complete Code Example** - Working implementation
5. **Testing** - How to test the implementation
6. **Best Practices** - Tips and recommendations
7. **Troubleshooting** - Common issues and solutions
8. **Next Steps** - Related tutorials and advanced topics

## 🛠️ Code Examples Features

- **TypeScript First** - All examples use TypeScript with full type safety
- **Error Handling** - Comprehensive error handling patterns
- **Real-World Scenarios** - Based on actual seller workflows
- **Production Ready** - Examples suitable for production use
- **Well Documented** - Detailed comments and explanations
- **Testable** - Includes test examples and validation

## 📋 Prerequisites

Before working with these examples, ensure you have:

- Node.js 18+ installed
- TypeScript knowledge
- OZON Seller API credentials (API key and Client ID)
- Basic understanding of async/await patterns
- Familiarity with REST API concepts

## 🎯 Learning Path

### Beginner Path
1. [Quick Start Guide](./quick-start.md)
2. [Authentication Setup](./authentication.md)
3. [Product Management](./product-management.md)
4. [Error Handling](./error-handling.md)

### Intermediate Path
1. [Inventory Management](./inventory-management.md)
2. [Order Processing](./order-processing.md)
3. [Financial Operations](./financial-operations.md)
4. [Multi-API Integration](./multi-api-integration.md)

### Advanced Path
1. [Analytics Dashboard](./analytics-dashboard.md)
2. [Promotional Campaigns](./promotional-campaigns.md)
3. [Automated Workflows](./automated-workflows.md)
4. [High-Volume Operations](./high-volume-operations.md)

## 🔗 Related Resources

- **[API Documentation](../api/README.md)** - Complete API reference
- **[Migration Guide](../MIGRATION.md)** - Migration from Product API
- **[TypeScript Definitions](../../src/types/)** - Type definitions
- **[Integration Tests](../../tests/integration/)** - Test examples

## 💡 Contributing Examples

We welcome contributions of additional examples and tutorials. Please follow these guidelines:

1. **Use TypeScript** - All examples should use TypeScript
2. **Include Tests** - Provide test examples where applicable
3. **Document Thoroughly** - Add comprehensive comments
4. **Follow Patterns** - Use consistent patterns with existing examples
5. **Real-World Focus** - Base examples on actual seller needs

---

*These examples are maintained as part of the OZON Seller API SDK documentation. Last updated during Story 1.8 implementation.*