# Quants API

Quants API implementation

## Overview

The QuantsApi class provides 2 methods for quants api implementation.

## Core Features

- **Core Operations** - 2 methods for comprehensive functionality
- **Type Safety** - Full TypeScript support with typed interfaces
- **Error Handling** - Robust error handling and validation
- **Documentation** - Detailed method documentation and examples

## Quick Start

```typescript
import { OzonSellerApiClient, createApiKey, createClientId } from '@ozon/seller-api';

const client = new OzonSellerApiClient({
  apiKey: createApiKey('your-api-key'),
  clientId: createClientId('your-client-id')
});

// Example usage
const result = await client.quants.getInfo(/* parameters */);
```

## Methods Reference

### `getInfo()`

Quants API implementation For product quantity and SKU management / import { HttpClient } from '../../core/http.js'; import type { RequestOptions } from '../../core/types.js'; import type { QuantInfoRequest, QuantListRequest } from '../../types/requests/quants.js'; import type { QuantInfoResponse, QuantListResponse } from '../../types/responses/quants.js'; /** Quants API для управления количествами и SKU товаров Quants API for product quantity and SKU management ```typescript // Получить информацию об эконом-товарах const quantInfo = await quantsApi.getInfo({ quant_code: ['QUANT001', 'QUANT002'] }); // Получить список эконом-товаров const quantList = await quantsApi.getList({ visibility: 'VISIBLE', limit: 100 }); ``` / export class QuantsApi { constructor(private readonly httpClient: HttpClient) {} /** Получить информацию об эконом-товаре Get economy product info Метод для получения подробной информации об эконом-товарах по кодам квантов. ```typescript const quantInfo = await quantsApi.getInfo({ quant_code: ['QUANT001', 'QUANT002', 'QUANT003'] }); quantInfo.items?.forEach(item => { console.log(`${item.name}: ${item.quantity} шт, ${item.price} ${item.currency_code}`); }); ```

**Example:**
```typescript
const result = await client.getInfo(/* parameters */);
console.log(result);
```

### `getList()`

Получить список эконом-товаров Get economy products list Метод для получения списка эконом-товаров с фильтрацией и пагинацией. ```typescript const quantList = await quantsApi.getList({ visibility: 'IN_SALE', limit: 50, cursor: 'next_page_cursor' }); quantList.products?.forEach(product => { console.log(`${product.name} (${product.quant_code}): ${product.status}`); }); // Для следующей страницы используйте cursor из ответа if (quantList.cursor) { const nextPage = await quantsApi.getList({ cursor: quantList.cursor, limit: 50 }); } ```

**Example:**
```typescript
const result = await client.getList(/* parameters */);
console.log(result);
```

## Type Definitions

The Quants API uses strongly typed TypeScript interfaces for all requests and responses. Import the necessary types from the SDK:

```typescript
import type {
  // Request types
  Quants*Request
} from '@ozon/seller-api';

import type {
  // Response types  
  Quants*Response
} from '@ozon/seller-api';
```

## Error Handling

```typescript
try {
  const result = await client.quants.getInfo(/* parameters */);
} catch (error) {
  if (error.code === 'INVALID_ARGUMENT') {
    console.error('Invalid request parameters');
  } else if (error.code === 'PERMISSION_DENIED') {
    console.error('Insufficient permissions');
  } else {
    console.error('Operation failed:', error.message);
  }
}
```

## Best Practices

1. **Type Safety** - Use TypeScript interfaces for all requests and responses
2. **Error Handling** - Implement comprehensive error handling for all operations
3. **Rate Limiting** - Respect API rate limits and implement retry logic
4. **Validation** - Validate input parameters before making API calls
5. **Documentation** - Refer to method-specific documentation for detailed usage

## Related APIs

- **[Product](./product.md)** - Product operations
- **[Analytics](./analytics.md)** - Analytics operations
- **[Report](./report.md)** - Report operations

---

*This documentation is auto-generated from the TypeScript implementation. For the most up-to-date information, refer to the source code and TypeScript definitions.*