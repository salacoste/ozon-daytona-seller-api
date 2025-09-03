# Return API

Return API implementation

## Overview

The ReturnApi class provides 8 methods for return api implementation.

## Core Features

- **Core Operations** - 8 methods for comprehensive functionality
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
const result = await client.return.getGiveoutBarcode(/* parameters */);
```

## Methods Reference

### `getGiveoutBarcode()`

Return API implementation For comprehensive return workflow management / import { HttpClient } from '../../core/http.js'; import type { RequestOptions } from '../../core/types.js'; import type { GiveoutInfoRequest, GiveoutListRequest, ReturnsCompanyFbsInfoRequest, EmptyRequest } from '../../types/requests/return.js'; import type { GiveoutGetBarcodeResponse, GiveoutBarcodeResetResponse, GiveoutGetPDFResponse, GiveoutGetPNGResponse, GiveoutInfoResponse, GiveoutIsEnabledResponse, GiveoutListResponse, ReturnsCompanyFbsInfoResponse } from '../../types/responses/return.js'; /** Return API для управления процессами возврата Return API for return workflow management ```typescript // Получить список возвратных отгрузок const giveouts = await returnApi.getGiveoutList({ limit: 50 }); // Получить штрихкод в PNG формате const barcode = await returnApi.getGiveoutPNG(); ``` / export class ReturnApi { constructor(private readonly httpClient: HttpClient) {} /** Получить значение штрихкода для возвратных отгрузок Get barcode value for return giveouts Метод для получения штрихкода в текстовом виде.

**Example:**
```typescript
const result = await client.getGiveoutBarcode(/* parameters */);
console.log(result);
```

### `resetGiveoutBarcode()`

Сгенерировать новый штрихкод Generate new barcode Метод для генерации нового штрихкода, если старый был скомпрометирован.

**Example:**
```typescript
const result = await client.resetGiveoutBarcode(/* parameters */);
console.log(result);
```

### `getGiveoutPDF()`

Получить штрихкод в формате PDF Get barcode in PDF format Метод для получения штрихкода в PDF формате. Работает только для схемы FBS.

**Example:**
```typescript
const result = await client.getGiveoutPDF(/* parameters */);
console.log(result);
```

### `getGiveoutPNG()`

Получить штрихкод в формате PNG Get barcode in PNG format Метод для получения штрихкода в PNG формате.

**Example:**
```typescript
const result = await client.getGiveoutPNG(/* parameters */);
console.log(result);
```

### `getGiveoutInfo()`

Получить информацию о возвратной отгрузке Get return giveout info Метод для получения подробной информации о конкретной возвратной отгрузке. ```typescript const giveoutInfo = await returnApi.getGiveoutInfo({ giveout_id: 12345 }); console.log(`Status: ${giveoutInfo.status}, Items: ${giveoutInfo.items?.length}`); ```

**Example:**
```typescript
const result = await client.getGiveoutInfo(/* parameters */);
console.log(result);
```

### `isGiveoutEnabled()`

Проверить возможность получения возвратных отгрузок по штрихкоду Check barcode access for return giveouts Метод для проверки доступности функции возвратных отгрузок.

**Example:**
```typescript
const result = await client.isGiveoutEnabled(/* parameters */);
console.log(result);
```

### `getGiveoutList()`

Получить список возвратных отгрузок Get return giveouts list Метод для получения списка активных возвратных отгрузок с пагинацией. ```typescript const giveouts = await returnApi.getGiveoutList({ limit: 100, last_id: 12345 }); giveouts.giveouts?.forEach(giveout => { console.log(`Giveout ${giveout.giveout_id}: ${giveout.status}`); }); ```

**Example:**
```typescript
const result = await client.getGiveoutList(/* parameters */);
console.log(result);
```

### `getReturnsCompanyFbsInfo()`

Получить информацию о возвратах FBS Get FBS returns info Метод для получения информации о количестве и сумме возвратов FBS. ```typescript const fbsInfo = await returnApi.getReturnsCompanyFbsInfo({ date_from: '2024-01-01T00:00:00Z', date_to: '2024-01-31T23:59:59Z' }); fbsInfo.returns_info?.forEach(info => { console.log(`${info.date}: ${info.count} returns, ${info.amount} ${info.currency_code}`); }); ```

**Example:**
```typescript
const result = await client.getReturnsCompanyFbsInfo(/* parameters */);
console.log(result);
```

## Type Definitions

The Return API uses strongly typed TypeScript interfaces for all requests and responses. Import the necessary types from the SDK:

```typescript
import type {
  // Request types
  Return*Request
} from '@ozon/seller-api';

import type {
  // Response types  
  Return*Response
} from '@ozon/seller-api';
```

## Error Handling

```typescript
try {
  const result = await client.return.getGiveoutBarcode(/* parameters */);
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