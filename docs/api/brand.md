# Brand API

Brand API implementation

## Overview

The BrandApi class provides 1 methods for brand api implementation.

## Core Features

- **Core Operations** - 1 methods for comprehensive functionality
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
const result = await client.brand.getCertificationList(/* parameters */);
```

## Methods Reference

### `getCertificationList()`

Brand API implementation Generated from MCP documentation: brandapi--chunk-001.md Handles brand certification and management / import { HttpClient } from '../../core/http.js'; import type { RequestOptions } from '../../core/types.js'; import type { BrandCertificationListRequest } from '../../types/requests/brand.js'; import type { BrandCertificationListResponse } from '../../types/responses/brand.js'; /** Brand API для управления брендами и сертификацией Brand API for brand and certification management ```typescript // Получить список брендов, требующих сертификацию const brands = await brandApi.getCertificationList({ page: 1, page_size: 50 }); brands.result?.brand_certification.forEach(brand => { if (brand.has_certificate) { console.log(`Бренд ${brand.brand_name} требует сертификат`); } }); ``` / export class BrandApi { constructor(private readonly httpClient: HttpClient) {} /** Получить список сертифицируемых брендов Get list of certifiable brands Метод для получения списка брендов, для которых требуется предоставить сертификат. Ответ содержит список брендов, товары которых есть в вашем личном кабинете. Список брендов может изменяться, если Ozon получит требование от бренда предоставлять сертификат. ```typescript const brands = await brandApi.getCertificationList({ page: 1, page_size: 100 }); console.log(`Всего брендов: ${brands.result?.total}`); const brandsRequiringCerts = brands.result?.brand_certification.filter( brand => brand.has_certificate ); console.log(`Брендов, требующих сертификацию: ${brandsRequiringCerts?.length}`); // Пагинация if (brands.result && brands.result.total > 100) { const nextPage = await brandApi.getCertificationList({ page: 2, page_size: 100 }); } ```

**Example:**
```typescript
const result = await client.getCertificationList(/* parameters */);
console.log(result);
```

## Type Definitions

The Brand API uses strongly typed TypeScript interfaces for all requests and responses. Import the necessary types from the SDK:

```typescript
import type {
  // Request types
  Brand*Request
} from '@ozon/seller-api';

import type {
  // Response types  
  Brand*Response
} from '@ozon/seller-api';
```

## Error Handling

```typescript
try {
  const result = await client.brand.getCertificationList(/* parameters */);
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