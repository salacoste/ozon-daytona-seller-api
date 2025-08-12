# Changelog

All notable changes to the Ozon Seller API SDK will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-01-15

### 🎉 Initial Release

The first stable release of the TypeScript SDK for Ozon Seller API, providing comprehensive coverage of 263 endpoints across 32 API groups.

### ✨ Features

#### Core Infrastructure
- **TypeScript-First Design**: Full type safety with zero `any` in public API
- **Dual Build Support**: ESM and CommonJS builds for maximum compatibility
- **HTTP Client**: Robust transport layer with retry, rate limiting, and timeout support
- **Error Handling**: Normalized error system with specialized error classes
- **Pagination**: Smart pagination utilities for all API patterns (last_id, cursor, offset)
- **Authentication**: Automatic header injection for all API requests

#### Production API Groups (27 groups)
- **FBS API** (22 endpoints): Complete fulfillment by seller operations
- **FBO API** (13 endpoints): Fulfillment by Ozon management
- **ProductAPI** (18 endpoints): Product catalog management
- **Prices & Stocks API** (9 endpoints): Pricing and inventory control
- **WarehouseAPI** (2 endpoints): Warehouse operations
- **AnalyticsAPI** (5 endpoints): Business analytics and insights
- **ReportAPI** (8 endpoints): Report generation and download
- **FinanceAPI** (11 endpoints): Financial operations and settlements
- **CategoryAPI** (4 endpoints): Category tree and attributes
- **SupplierAPI** (4 endpoints): Supplier management
- **ChatAPI** (8 endpoints): Customer communication
- **CancellationAPI** (7 endpoints): Order cancellation handling
- **ReturnsAPI** (9 endpoints): Returns processing (FBS, rFBS, FBO)
- **DeliveryFBS** (18 endpoints): FBS delivery operations
- **DeliveryrFBS** (8 endpoints): rFBS delivery management
- **BarcodeAPI** (2 endpoints): Barcode generation
- **PolygonAPI** (2 endpoints): Polygon-based operations
- **SellerRating** (2 endpoints): Seller rating management
- **BrandAPI** (1 endpoint): Brand certification
- **PromosAPI** (8 endpoints): Promotional campaigns
- **PassAPI** (7 endpoints): Pass generation and management
- **PricingStrategyAPI** (12 endpoints): Dynamic pricing strategies
- **FboSupplyRequest** (19 endpoints): FBO supply management
- **CertificationAPI** (15 endpoints): Product certification
- **FBS & rFBS Marks** (12 endpoints): Marking operations

#### Beta API Groups (5 groups)
- **ReviewAPI** (7 endpoints): Customer review management
- **DigitalAPI** (3 endpoints): Digital product code distribution
- **QuantsAPI** (2 endpoints): Economy product management
- **BetaMethodAPI** (9 endpoints): Advanced analytics and operations
- **Questions & Answers** (8 endpoints): Customer Q&A management

#### Developer Experience
- **Comprehensive Documentation**: Detailed API docs with examples
- **Type-Safe Pagination**: Async iterators for all paginated endpoints
- **Error Recovery**: Automatic retry with exponential backoff
- **Rate Limiting**: Built-in rate limiter respecting API limits
- **Performance Optimized**: Efficient batching and caching strategies
- **Test Coverage**: 563 tests with >80% coverage

### 📦 Installation

```bash
npm install @ozon/sdk
```

### 🚀 Quick Start

```typescript
import { OzonClient } from '@ozon/sdk';

const client = new OzonClient({
  clientId: process.env.OZON_CLIENT_ID!,
  apiKey: process.env.OZON_API_KEY!
});

// Example: List products
const products = await client.product.list({ limit: 100 });

// Example: Update stock levels
await client.pricesStocks.updateStocks({
  stocks: [{
    offer_id: 'PRODUCT-001',
    stock: 150,
    warehouse_id: 123456789
  }]
});

// Example: Process orders with pagination
for await (const page of client.fbs.iterateUnshippedList({ limit: 100 })) {
  for (const posting of page) {
    console.log(`Order ${posting.posting_number}: ${posting.status}`);
  }
}
```

### 🔧 Technical Details

- **Node.js**: Requires version 18.0.0 or higher
- **TypeScript**: Full TypeScript 5.0+ support
- **Bundle Size**: Optimized for minimal footprint
- **Dependencies**: Minimal external dependencies
- **Security**: Regular vulnerability scanning

### 📊 Statistics

- **Total Endpoints**: 263
- **API Groups**: 32 (27 production + 5 beta)
- **Type Definitions**: 1069 schemas
- **Test Cases**: 563
- **Code Coverage**: >80%
- **File Count**: 200+ implementation files

### 🤝 Contributors

- [@salacoste](https://github.com/salacoste) - Project lead and main contributor

### 📄 License

MIT License - see [LICENSE](LICENSE) file for details

### 🔗 Links

- [NPM Package](https://www.npmjs.com/package/@ozon/sdk)
- [GitHub Repository](https://github.com/salacoste/ozon-seller-api)
- [Ozon Seller API Documentation](https://api-seller.ozon.ru/docs)
- [Issue Tracker](https://github.com/salacoste/ozon-seller-api/issues)

---

[1.0.0]: https://github.com/salacoste/ozon-seller-api/releases/tag/v1.0.0