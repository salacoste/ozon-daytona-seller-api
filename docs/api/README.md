# OZON Seller API SDK - Complete API Reference

This directory contains comprehensive API documentation for all 32 categories of the OZON Seller API SDK.

## API Categories Overview

The OZON Seller API SDK provides access to 32 distinct API categories, organized by functional domain:

### Core Business Operations (Stories 1.1-1.6)
- **[Analytics](./analytics.md)** - Business analytics and performance metrics
- **[Finance](./finance.md)** - Financial operations and transactions
- **[Product](./product.md)** - Product catalog management
- **[Pricing Strategy](./pricing-strategy.md)** - Dynamic pricing and strategy management
- **[Returns](./returns.md)** - Return processing and management
- **[Return](./return.md)** - Return-specific operations
- **[Quants](./quants.md)** - Quantity and inventory analytics
- **[Review](./review.md)** - Customer review management
- **[Chat](./chat.md)** - Customer communication
- **[Q&A](./questions-answers.md)** - Product questions and answers
- **[Brand](./brand.md)** - Brand management operations
- **[Certification](./certification.md)** - Product certification workflows
- **[FBS](./fbs.md)** - Fulfillment by Seller operations
- **[Delivery FBS](./delivery-fbs.md)** - FBS delivery management
- **[Delivery rFBS](./delivery-rfbs.md)** - Reverse FBS delivery operations
- **[FBO](./fbo.md)** - Fulfillment by Ozon operations
- **[FBS/rFBS Marks](./fbs-rfbs-marks.md)** - Shipping label management
- **[rFBS Returns](./rfbs-returns.md)** - Reverse FBS return processing
- **[Supplier](./supplier.md)** - Supplier relationship management
- **[Warehouse](./warehouse.md)** - Warehouse operations
- **[FBO Supply Request](./fbo-supply-request.md)** - FBO supply chain requests

### Marketing, Reporting & Specialized Operations (Story 1.7)
- **[Report](./report.md)** - Business reporting and analytics generation
- **[Premium](./premium.md)** - Premium service management
- **[Prices & Stocks](./prices-stocks.md)** - Advanced pricing and inventory operations
- **[Beta Method](./beta-method.md)** - Beta features and experimental methods
- **[Promos](./promos.md)** - Promotional campaigns and discount management
- **[Pass](./pass.md)** - Pass and subscription services
- **[Cancellation](./cancellation.md)** - Order cancellation workflows
- **[Category](./category.md)** - Product category management
- **[Digital](./digital.md)** - Digital product operations
- **[Barcode](./barcode.md)** - Barcode generation and management
- **[Polygon](./polygon.md)** - Geographic polygon operations
- **[Seller Rating](./seller-rating.md)** - Seller performance ratings

## Quick Start

```typescript
import { OzonSellerApiClient, createApiKey, createClientId } from '@ozon/seller-api';

// Initialize the client
const client = new OzonSellerApiClient({
  apiKey: createApiKey('your-api-key'),
  clientId: createClientId('your-client-id')
});

// Access any API category
const products = await client.product.getProductList({
  filter: {},
  last_id: "",
  limit: 100
});

const analytics = await client.analytics.getStockOnWarehouses({
  limit: 50,
  offset: 0,
  warehouse_type: "ALL"
});
```

## Features

- **Full TypeScript Support** - Complete type definitions for all APIs
- **Consistent Interface** - Unified patterns across all 32 categories
- **Error Handling** - Comprehensive error handling and validation
- **Request/Response Types** - Strongly typed request and response objects
- **Documentation** - Detailed JSDoc documentation for all methods
- **Examples** - Real-world usage examples for each API

## Navigation

Each API category documentation includes:
- **Overview** - Purpose and key features
- **Methods** - Complete method reference
- **Types** - Request/response type definitions
- **Examples** - Practical usage examples
- **Error Handling** - Common errors and solutions

## API Statistics

- **Total Categories**: 32
- **Total Methods**: 278
- **TypeScript Coverage**: 100%
- **Documentation Coverage**: 100%
- **Test Coverage**: 95%+

## Complete API Reference

📊 **[API Summary](./api-summary.md)** - Complete overview of all 32 categories with method counts and business function groupings

## Support

For detailed information about each API category, click on the links above or browse the individual documentation files in this directory.