# Existing API Baseline Documentation

## Overview
This document establishes the baseline for the existing Product API that must be preserved during brownfield expansion.

**CRITICAL**: Any changes to existing API surface require explicit approval and breaking change documentation.

## Current API Surface (v0.1.0)

### ProductApi Class
Current implementation: `src/categories/product/index.ts`

#### Public Methods
```typescript
class ProductApi {
  /**
   * Перенести товар в архив
   * POST /v1/product/archive
   */
  public archive(
    request: ProductArchiveRequest,
    options?: RequestOptions
  ): Promise<ProductBooleanResponse>;

  /**
   * Восстановить товар из архива
   * POST /v1/product/unarchive
   */
  public unarchive(
    request: ProductUnarchiveRequest,
    options?: RequestOptions
  ): Promise<ProductBooleanResponse>;

  /**
   * Получить список товаров
   * POST /v2/product/list
   */
  public getList(
    request?: GetProductListRequest,
    options?: RequestOptions
  ): Promise<GetProductListResponse>;

  /**
   * Обновить характеристики товара
   * POST /v1/product/attributes/update
   */
  public updateAttributes(
    request: ProductUpdateAttributesRequest,
    options?: RequestOptions
  ): Promise<ProductBooleanResponse>;

  /**
   * Создать товар по SKU
   * POST /v1/product/import-by-sku
   */
  public importBySku(
    request: ImportProductsBySKURequest,
    options?: RequestOptions
  ): Promise<ImportProductsResponse>;

  /**
   * Узнать статус добавления или обновления товара
   * POST /v1/product/import/info
   */
  public getImportInfo(
    request: { task_id: number },
    options?: RequestOptions
  ): Promise<ImportProductsStatusResponse>;

  /**
   * Получить информацию о товаре
   * POST /v2/product/info
   */
  public getInfo(
    request: GetProductInfoRequest,
    options?: RequestOptions
  ): Promise<GetProductAttributesResponse>;

  /**
   * Получить остатки товаров
   * POST /v3/product/info/stocks
   */
  public getStocks(
    request: { 
      filter?: { 
        offer_id?: readonly string[]; 
        product_id?: readonly number[]; 
        visibility?: string 
      } 
    },
    options?: RequestOptions
  ): Promise<GetProductStocksResponse>;

  /**
   * Получить цены товаров
   * POST /v4/product/info/prices
   */
  public getPrices(
    request: { 
      filter?: { 
        offer_id?: readonly string[]; 
        product_id?: readonly number[]; 
        visibility?: string 
      } 
    },
    options?: RequestOptions
  ): Promise<GetProductPricesResponse>;

  /**
   * Получить характеристики товара
   * POST /v3/products/info/attributes
   */
  public getAttributes(
    request: { 
      filter?: { 
        offer_id?: readonly string[]; 
        product_id?: readonly number[] 
      }; 
      limit?: number; 
      last_id?: string 
    },
    options?: RequestOptions
  ): Promise<GetProductAttributesResponse>;

  /**
   * Получить список типов сертификатов
   * POST /v1/product/certificate/types
   */
  public getCertificateTypes(
    options?: RequestOptions
  ): Promise<GetCertificateTypesResponse>;

  /**
   * Получить информацию о нарушениях
   * POST /v2/product/info/discounted
   */
  public getDiscountedInfo(
    request: { discounted_skus?: readonly string[] },
    options?: RequestOptions
  ): Promise<{
    result: {
      discounted_skus: readonly {
        sku: string;
        discount_value: number;
        discount_percent: number;
      }[];
    };
  }>;
}
```

#### Exported Types
```typescript
// Request Types (inputs)
export type {
  ProductArchiveRequest,
  ProductUnarchiveRequest,
  GetProductListRequest,
  ProductUpdateAttributesRequest,
  ImportProductsBySKURequest,
  GetProductInfoRequest,
} from './types/requests/product.js';

// Response Types (outputs)
export type {
  GetProductListResponse,
  GetProductStocksResponse,
  GetProductPricesResponse,
  GetProductAttributesResponse,
  ImportProductsResponse,
  ImportProductsStatusResponse,
  GetCertificateTypesResponse,
  ProductInfo,
  ProductStock,
  ProductPrice,
  ProductAttribute,
} from './types/responses/product.js';

// Common Types
export type {
  ProductBooleanResponse,
  ProductId,
  OfferId,
  CategoryId,
  ProductStatus,
  VisibilityStatus,
  CurrencyCode,
  createProductId,
  createOfferId,
  createCategoryId,
} from './types/common/base.js';

// Core Types
export type {
  OzonConfig,
  RequestOptions,
  ApiKey,
  ClientId,
} from './core/types.js';
```

#### Usage Examples
```typescript
import { OzonSellerApiClient, createOzonSellerApiClient } from '@spacechemical/ozon-seller-api';

// Basic initialization
const client = new OzonSellerApiClient({
  apiKey: createApiKey('your-api-key'),
  clientId: createClientId('your-client-id')
});

// Alternative initialization  
const client = createOzonSellerApiClient({
  apiKey: createApiKey('your-api-key'),
  clientId: createClientId('your-client-id')
});

// Access Product API
const productApi = client.products;

// Get list of products
const products = await productApi.getList({
  filter: { visibility: 'ALL' },
  limit: 100
});

// Get product information
const productInfo = await productApi.getInfo({
  product_id: 123456
});

// Get product stocks
const stocks = await productApi.getStocks({
  filter: { 
    product_id: [123456, 789012] 
  }
});

// Get product prices
const prices = await productApi.getPrices({
  filter: { 
    offer_id: ['SKU-001', 'SKU-002'] 
  }
});

// Archive product
await productApi.archive({
  product_ids: [123456]
});

// Import product by SKU
const importResult = await productApi.importBySku({
  items: [{
    sku: 'external-sku-123',
    name: 'Product Name',
    category_id: 17028922
  }]
});

// Check import status
const importStatus = await productApi.getImportInfo({
  task_id: importResult.result.task_id
});
```

## Backward Compatibility Requirements

### Non-Breaking Changes (Allowed)
- [ ] Adding new optional parameters
- [ ] Adding new methods
- [ ] Adding new exported types
- [ ] Improving error messages
- [ ] Performance optimizations

### Breaking Changes (Require Approval)
- [ ] Removing methods
- [ ] Changing method signatures
- [ ] Removing exported types
- [ ] Changing return types
- [ ] Renaming public members

## Validation Process

1. **Automated Baseline Check**: `npm run breaking:check`
2. **Manual Review**: Product Owner approval for any breaking changes
3. **Migration Documentation**: Required for any breaking changes
4. **Customer Communication**: 30-day notice for breaking changes

## Last Updated
- **Date**: August 21, 2025
- **Version**: v0.1.0  
- **Baseline Hash**: Generated via `npm run breaking:update`
- **API Surface**: 12 public methods, 32+ exported types
- **Baseline File**: `.baseline/api-surface.json`

## Integration
Product API is integrated in the main client as:
```typescript  
const client = new OzonSellerApiClient(config);
const productApi = client.products; // Access point for all Product API methods
```

---
**BASELINE COMPLETED**: ✅ All existing API methods and types documented. This baseline must be preserved during brownfield expansion.