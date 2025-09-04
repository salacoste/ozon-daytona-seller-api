# RfbsReturns API

RFBSReturnsAPI implementation

## Overview

The RfbsReturnsApi class provides 8 methods for rfbsreturnsapi implementation.

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
const result = await client.rfbs-returns.setAction(/* parameters */);
```

## Methods Reference

### `setAction()`

RFBSReturnsAPI implementation RFBS return processing ```typescript import { OzonSellerAPI } from 'bmad-ozon-seller-api'; const api = new OzonSellerAPI({ clientId: 'your-client-id', apiKey: 'your-api-key' }); // Get returns list const returns = await api.rfbsReturns.getReturnsList({ filter: { status: ['awaiting_approve', 'awaiting_return'], created_since: '2024-01-01T00:00:00Z' }, limit: 50 }); // Approve return await api.rfbsReturns.setAction({ return_id: 123456, action: 'approve', comment: 'Return approved for inspection' }); // Return money to customer await api.rfbsReturns.returnMoney({ return_id: 123456, full_amount: true, compensate_shipping: true }); ``` / import { HttpClient } from "../../core/http.js"; import type { RequestOptions } from "../../core/types.js"; // Request types import { RfbsReturnsActionSetRequest, RfbsReturnsCompensateRequest, RfbsReturnsGetRequest, RfbsReturnsListRequest, RfbsReturnsReceiveReturnRequest, RfbsReturnsRejectRequest, RfbsReturnsReturnMoneyRequest, RfbsReturnsVerifyRequest } from "../../types/requests/rfbs-returns"; // Response types import { RfbsReturnsActionSetResponse, RfbsReturnsEmptyResponse, RfbsReturnsGetResponse, RfbsReturnsListResponse } from "../../types/responses/rfbs-returns"; /** RFBSReturnsAPI class Handles RFBS return processing operations / export class RfbsReturnsApi { constructor(private readonly httpClient: HttpClient) {} /** Передать доступные действия для rFBS возвратов Set available actions for rFBS returns ```typescript const result = await api.rfbsReturns.setAction({ return_id: 123456, action: 'approve', comment: 'Return approved for inspection' }); console.log('Action result:', result.result); ```

**Example:**
```typescript
const result = await client.setAction(/* parameters */);
console.log(result);
```

### `compensate()`

Вернуть часть стоимости товара (устаревший метод) Return part of product cost (deprecated method) ```typescript // Deprecated - use setAction instead await api.rfbsReturns.compensate({ return_id: 123456, compensation_amount: 500.00, reason: 'Partial compensation for minor defect' }); ```

**Example:**
```typescript
const result = await client.compensate(/* parameters */);
console.log(result);
```

### `getReturn()`

Получить информацию о заявке на возврат Get return application information ```typescript const returnInfo = await api.rfbsReturns.getReturn({ return_id: 123456 }); console.log('Return status:', returnInfo.return?.status); console.log('Customer reason:', returnInfo.return?.customer_reason); console.log('Products:', returnInfo.return?.products?.length); ```

**Example:**
```typescript
const result = await client.getReturn(/* parameters */);
console.log(result);
```

### `getReturnsList()`

Получить список заявок на возврат Get returns list ```typescript const returns = await api.rfbsReturns.getReturnsList({ filter: { status: ['awaiting_approve', 'awaiting_return'], created_since: '2024-01-01T00:00:00Z', created_to: '2024-01-31T23:59:59Z' }, limit: 100, offset: 0 }); console.log('Found returns:', returns.total); returns.returns?.forEach(ret => { console.log(`Return ${ret.return_id}: ${ret.status}`); }); ```

**Example:**
```typescript
const result = await client.getReturnsList(/* parameters */);
console.log(result);
```

### `receiveReturn()`

Подтвердить получение товара на проверку (устаревший метод) Confirm product receipt for inspection (deprecated method) ```typescript // Deprecated - use setAction instead await api.rfbsReturns.receiveReturn({ return_id: 123456, received_at: '2024-01-20T10:00:00Z' }); ```

**Example:**
```typescript
const result = await client.receiveReturn(/* parameters */);
console.log(result);
```

### `reject()`

Отклонить заявку на возврат (устаревший метод) Reject return application (deprecated method) ```typescript // Deprecated - use setAction instead await api.rfbsReturns.reject({ return_id: 123456, comment: 'Return does not meet our return policy criteria' }); ```

**Example:**
```typescript
const result = await client.reject(/* parameters */);
console.log(result);
```

### `returnMoney()`

Вернуть деньги покупателю (устаревший метод) Return money to customer (deprecated method) ```typescript // Deprecated - use setAction instead await api.rfbsReturns.returnMoney({ return_id: 123456, full_amount: true, compensate_shipping: true }); ```

**Example:**
```typescript
const result = await client.returnMoney(/* parameters */);
console.log(result);
```

### `verify()`

Одобрить заявку на возврат (устаревший метод) Approve return application (deprecated method) ```typescript // Deprecated - use setAction instead await api.rfbsReturns.verify({ return_id: 123456, comment: 'Return approved for inspection' }); ```

**Example:**
```typescript
const result = await client.verify(/* parameters */);
console.log(result);
```

## Type Definitions

The RfbsReturns API uses strongly typed TypeScript interfaces for all requests and responses. Import the necessary types from the SDK:

```typescript
import type {
  // Request types
  Rfbs-returns*Request
} from '@ozon/seller-api';

import type {
  // Response types  
  Rfbs-returns*Response
} from '@ozon/seller-api';
```

## Error Handling

```typescript
try {
  const result = await client.rfbs-returns.setAction(/* parameters */);
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