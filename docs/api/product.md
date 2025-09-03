# Product API

The Product API provides comprehensive product catalog management functionality for OZON sellers.

## Overview

The ProductApi class offers 23 methods for managing products, including creation, modification, archiving, pricing, inventory, and multimedia management. This is the most feature-rich API in the SDK.

## Core Features

- **Product Lifecycle Management** - Create, archive, unarchive, and delete products
- **Catalog Operations** - List, search, and filter products
- **Inventory Management** - Stock levels, pricing, and availability
- **Product Information** - Attributes, descriptions, and metadata
- **Multimedia Management** - Images, videos, and rich content
- **Performance Analytics** - Ratings, reviews, and metrics

## Quick Start

```typescript
import { OzonSellerApiClient, createApiKey, createClientId } from '@ozon/seller-api';

const client = new OzonSellerApiClient({
  apiKey: createApiKey('your-api-key'),
  clientId: createClientId('your-client-id')
});

// Get product list
const products = await client.product.getList({
  filter: {
    visibility: 'VISIBLE'
  },
  limit: 100
});

// Archive products
await client.product.archive({
  product_id: [123, 456, 789]
});
```

## Methods Reference

### Product Lifecycle

#### `archive(request: ProductArchiveRequest): Promise<ProductBooleanResponse>`

Archives products, removing them from search and sales.

**Parameters:**
- `request.product_id` - Array of product IDs to archive

**Example:**
```typescript
const result = await client.product.archive({
  product_id: [123, 456, 789]
});

if (result.result) {
  console.log('Products archived successfully');
}
```

#### `unarchive(request: ProductUnarchiveRequest): Promise<ProductBooleanResponse>`

Restores products from archive.

**Parameters:**
- `request.product_id` - Array of product IDs to unarchive

#### `deleteProducts(request: DeleteProductsRequest): Promise<DeleteProductsResponse>`

Permanently deletes products from catalog.

**Parameters:**
- `request.products` - Array of products to delete with reason codes

### Product Information

#### `getList(request: GetProductListRequest): Promise<GetProductListResponse>`

Retrieves paginated list of products with filtering.

**Parameters:**
- `request.filter` - Filter criteria (visibility, category, etc.)
- `request.last_id` - Pagination cursor
- `request.limit` - Number of products to return (max 1000)

**Example:**
```typescript
const products = await client.product.getList({
  filter: {
    visibility: 'VISIBLE',
    offer_id: ['SKU-001', 'SKU-002']
  },
  limit: 50
});

products.result?.items?.forEach(product => {
  console.log(`${product.name}: ${product.offer_id}`);
});
```

#### `getProductInfo(request: GetProductInfoRequest): Promise<any>`

Gets detailed product information by offer ID.

#### `getProductInfoById(request: GetProductInfoByIdRequest): Promise<any>`

Gets detailed product information by product ID.

#### `getProductInfoV3(request: GetProductInfoListV3Request): Promise<GetProductInfoListV3Response>`

Advanced product information retrieval with enhanced data.

### Inventory & Pricing

#### `getProductStocks(request: GetProductStocksRequest): Promise<GetProductStocksResponse>`

Retrieves current stock levels for products.

**Example:**
```typescript
const stocks = await client.product.getProductStocks({
  filter: {
    offer_id: ['SKU-001'],
    product_id: [],
    visibility: 'ALL'
  },
  limit: 100
});
```

#### `getProductPrices(request: GetProductPricesRequest): Promise<GetProductPricesResponse>`

Gets current pricing information for products.

#### `getDiscountedProducts(request: GetDiscountedProductsRequest): Promise<GetDiscountedProductsResponse>`

Retrieves products with active discounts.

### Product Attributes

#### `getProductAttributes(request: GetProductAttributesRequest): Promise<GetProductAttributesResponse>`

Gets product attributes and characteristics.

#### `updateAttributes(request: ProductUpdateAttributesRequest): Promise<any>`

Updates product attributes and metadata.

### Import & Export

#### `importProducts(request: ImportProductsBySKURequest): Promise<ImportProductsResponse>`

Bulk import products using SKU data.

#### `importProductsV3(request: ImportProductsV3Request): Promise<ImportProductsV3Response>`

Advanced bulk import with enhanced features.

#### `getImportTaskStatus(taskId: string): Promise<ImportProductsStatusResponse>`

Checks status of import operations.

### Multimedia Management

#### `importPictures(request: ProductImportPicturesRequest): Promise<ProductImportPicturesResponse>`

Imports product images.

#### `getProductPictures(request: GetProductPicturesRequest): Promise<GetProductPicturesResponse>`

Retrieves product image information.

### Performance & Analytics

#### `getProductRatingBySku(request: GetProductRatingBySkuRequest): Promise<GetProductRatingBySkuResponse>`

Gets product ratings and review metrics.

#### `getRelatedSKU(request: GetRelatedSKURequest): Promise<GetRelatedSKUResponse>`

Finds related products and cross-selling opportunities.

### Utility Operations

#### `getCertificateTypes(): Promise<GetCertificateTypesResponse>`

Gets available product certification types.

#### `getUploadQuota(request: GetUploadQuotaRequest): Promise<GetUploadQuotaResponse>`

Checks upload quotas and limits.

#### `updateOfferId(request: UpdateOfferIdRequest): Promise<UpdateOfferIdResponse>`

Updates product offer identifiers.

## Type Definitions

### Common Interfaces

```typescript
interface ProductArchiveRequest {
  product_id: number[];
}

interface GetProductListRequest {
  filter: {
    offer_id?: string[];
    product_id?: number[];
    visibility?: 'ALL' | 'VISIBLE' | 'INVISIBLE' | 'EMPTY_STOCK' | 'NOT_MODERATED' | 'MODERATED' | 'DISABLED' | 'STATE_FAILED_MODERATION' | 'READY_TO_SUPPLY' | 'VALIDATION_STATE_PENDING' | 'VALIDATION_STATE_FAIL' | 'VALIDATION_STATE_SUCCESS' | 'TO_SUPPLY' | 'IN_SALE' | 'REMOVED_FROM_SALE' | 'BANNED' | 'OVERPRICED' | 'CRITICALLY_OVERPRICED' | 'EMPTY_BARCODE' | 'BARCODE_EXISTS' | 'QUARANTINE' | 'ARCHIVED' | 'OVERPRICED_WITH_STOCK' | 'PARTIAL_APPROVED' | 'IMAGE_ABSENT' | 'MODERATION_BLOCK';
  };
  last_id: string;
  limit: number;
}

interface GetProductListResponse {
  result?: {
    items?: ProductItem[];
    total: number;
    last_id: string;
  };
}
```

## Error Handling

```typescript
try {
  const products = await client.product.getList({
    filter: { visibility: 'VISIBLE' },
    limit: 100,
    last_id: ""
  });
} catch (error) {
  if (error.code === 'INVALID_ARGUMENT') {
    console.error('Invalid request parameters');
  } else if (error.code === 'PERMISSION_DENIED') {
    console.error('Insufficient permissions');
  } else {
    console.error('Unexpected error:', error.message);
  }
}
```

## Best Practices

1. **Pagination** - Always use `last_id` for efficient pagination
2. **Filtering** - Use specific filters to reduce response size
3. **Batch Operations** - Group related operations for better performance
4. **Error Handling** - Implement comprehensive error handling
5. **Rate Limiting** - Respect API rate limits for bulk operations

## Related APIs

- **[Analytics](./analytics.md)** - Product performance analytics
- **[Pricing Strategy](./pricing-strategy.md)** - Dynamic pricing management
- **[Review](./review.md)** - Customer review management
- **[Warehouse](./warehouse.md)** - Inventory management