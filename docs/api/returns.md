# Returns API

Returns API implementation

## Overview

The ReturnsApi class provides 1 methods for returns api implementation.

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
const result = await client.returns.getList(/* parameters */);
```

## Methods Reference

### `getList()`

Returns API implementation For managing FBO and FBS returns / import { HttpClient } from "../../core/http.js"; import type { RequestOptions } from "../../core/types.js"; import type { GetReturnsListRequest } from "../../types/requests/returns.js"; import type { GetReturnsListResponse } from "../../types/responses/returns.js"; /** Returns API для управления возвратами FBO и FBS Returns API for FBO and FBS returns management ```typescript // Получить список возвратов const returns = await returnsApi.getList({ filter: { status: ['NEW', 'PROCESSING'] }, limit: 50 }); ``` / export class ReturnsApi { constructor(private readonly httpClient: HttpClient) {} /** Получить список возвратов FBO и FBS Get FBO and FBS returns list Метод для получения информации о возвратах с фильтрацией и пагинацией. ```typescript const returns = await returnsApi.getList({ filter: { created_at_from: '2024-01-01T00:00:00Z', created_at_to: '2024-01-31T23:59:59Z', status: ['NEW', 'PROCESSING'] }, limit: 100 }); returns.returns?.forEach(returnItem => { console.log(`Return ${returnItem.id}: ${returnItem.name} - ${returnItem.status}`); }); ```

**Example:**
```typescript
const result = await client.getList(/* parameters */);
console.log(result);
```

## Type Definitions

The Returns API uses strongly typed TypeScript interfaces for all requests and responses. Import the necessary types from the SDK:

```typescript
import type {
  // Request types
  Returns*Request
} from '@ozon/seller-api';

import type {
  // Response types  
  Returns*Response
} from '@ozon/seller-api';
```

## Error Handling

```typescript
try {
  const result = await client.returns.getList(/* parameters */);
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