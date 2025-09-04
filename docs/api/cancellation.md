# Cancellation API

CancellationAPI implementation

## Overview

The CancellationApi class provides 7 methods for cancellationapi implementation.

## Core Features

- **Core Operations** - 7 methods for comprehensive functionality
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
const result = await client.cancellation.getConditionalCancellationList(/* parameters */);
```

## Methods Reference

### `getConditionalCancellationList()`

CancellationAPI implementation Order cancellation management / import { HttpClient } from "../../core/http.js"; import type { RequestOptions } from "../../core/types.js"; import type { EmptyResponse } from "../../types/common/base.js"; import type { CancellationGetListRequest, CancellationGetRequest, CancellationMoveRequest, CancellationGetListV2Request, CancellationApproveV2Request, CancellationRejectV2Request } from "../../types/requests/cancellation.js"; import type { CancellationGetListResponse, CancellationGetResponse, CancellationGetListV2Response } from "../../types/responses/cancellation.js"; /** CancellationAPI для управления заявками на отмену заказов CancellationAPI for order cancellation request management ⚠️ Методы v1 устарели и будут отключены 3 августа 2025 года ⚠️ v1 methods are deprecated and will be disabled on August 3, 2025 ```typescript // Получить список заявок на отмену (v2) const cancellationList = await cancellationApi.getConditionalCancellationListV2({ limit: 100, filters: { state: 'ON_APPROVAL', cancellation_initiator: ['CLIENT'] }, with: { counter: true } }); // Подтвердить заявку на отмену await cancellationApi.approveConditionalCancellationV2({ cancellation_id: 12345, comment: 'Заявка подтверждена, заказ будет отменён' }); // Отклонить заявку на отмену await cancellationApi.rejectConditionalCancellationV2({ cancellation_id: 12345, comment: 'Товар уже отправлен покупателю' }); ``` / export class CancellationApi { constructor(private readonly httpClient: HttpClient) {} /** Получить список заявок на отмену rFBS (v1) Get rFBS cancellation requests list (v1) Метод для получения списка заявок на отмену rFBS-заказов с возможностью фильтрации. ```typescript const cancellationList = await cancellationApi.getConditionalCancellationList({ limit: 50, offset: 0, filters: { state: 'ON_APPROVAL', cancellation_initiator: ['CLIENT', 'SYSTEM'], posting_number: ['12345-0001-1'] }, with: { counters: true } }); cancellationList.result?.forEach(cancellation => { console.log(`Заявка ${cancellation.cancellation_id}: ${cancellation.posting_number}`); console.log(`Статус: ${cancellation.state?.state}, инициатор: ${cancellation.cancellation_initiator}`); console.log(`Причина: ${cancellation.cancellation_reason?.name}`); if (cancellation.auto_approve_date) { console.log(`Автоподтверждение: ${cancellation.auto_approve_date}`); } }); if (cancellationList.counters) { console.log(`На рассмотрении: ${cancellationList.counters.on_approval}`); console.log(`Подтверждено: ${cancellationList.counters.approved}`); console.log(`Отклонено: ${cancellationList.counters.rejected}`); } ```

**Example:**
```typescript
const result = await client.getConditionalCancellationList(/* parameters */);
console.log(result);
```

### `getConditionalCancellation()`

Получить информацию о заявке на отмену rFBS (v1) Get rFBS cancellation request information (v1) Метод для получения детальной информации о конкретной заявке на отмену rFBS-заказа. ```typescript const cancellationInfo = await cancellationApi.getConditionalCancellation({ cancellation_id: 12345 }); if (cancellationInfo.result) { const cancellation = cancellationInfo.result; console.log(`Заявка на отмену ${cancellation.cancellation_id}:`); console.log(`Отправление: ${cancellation.posting_number}`); console.log(`Статус: ${cancellation.state?.state}`); console.log(`Инициатор: ${cancellation.cancellation_initiator}`); console.log(`Причина: ${cancellation.cancellation_reason?.name}`); console.log(`Создана: ${cancellation.cancelled_at}`); if (cancellation.state?.state === 'ON_APPROVAL') { console.log(`Требует решения до: ${cancellation.auto_approve_date}`); } } ```

**Example:**
```typescript
const result = await client.getConditionalCancellation(/* parameters */);
console.log(result);
```

### `approveConditionalCancellation()`

Подтвердить заявку на отмену rFBS (v1) Approve rFBS cancellation request (v1) Метод позволяет согласовать заявку на отмену в статусе ON_APPROVAL. Заказ будет отменён, а деньги вернутся покупателю. ```typescript await cancellationApi.approveConditionalCancellation({ cancellation_id: 12345, comment: 'Заявка обоснована, подтверждаем отмену заказа' }); console.log('Заявка на отмену подтверждена. Заказ будет отменён.'); ```

**Example:**
```typescript
const result = await client.approveConditionalCancellation(/* parameters */);
console.log(result);
```

### `rejectConditionalCancellation()`

Отклонить заявку на отмену rFBS (v1) Reject rFBS cancellation request (v1) Метод позволяет отклонить заявку на отмену в статусе ON_APPROVAL. Заказ останется в том же статусе, и его нужно будет доставить покупателю. ```typescript await cancellationApi.rejectConditionalCancellation({ cancellation_id: 12345, comment: 'Товар уже отправлен и находится в пути к покупателю' }); console.log('Заявка на отмену отклонена. Заказ будет доставлен.'); ```

**Example:**
```typescript
const result = await client.rejectConditionalCancellation(/* parameters */);
console.log(result);
```

### `getConditionalCancellationListV2()`

Получить список заявок на отмену rFBS (v2) Get rFBS cancellation requests list (v2) Актуальный метод для получения списка заявок на отмену rFBS-заказов. Поддерживает cursor-based пагинацию для эффективной работы с большими объёмами данных. ```typescript const cancellationList = await cancellationApi.getConditionalCancellationListV2({ limit: 100, filters: { state: 'ON_APPROVAL', cancellation_initiator: ['CLIENT'], posting_number: ['12345-0001-1', '12345-0001-2'] }, with: { counter: true } }); cancellationList.result?.forEach(cancellation => { console.log(`Заявка ${cancellation.cancellation_id}: ${cancellation.posting_number}`); console.log(`Статус: ${cancellation.state?.state}, инициатор: ${cancellation.cancellation_initiator}`); console.log(`Причина: ${cancellation.cancellation_reason?.name}`); console.log(`Создана: ${cancellation.cancelled_at}`); if (cancellation.state?.state === 'ON_APPROVAL') { console.log(`Автоподтверждение: ${cancellation.auto_approve_date}`); } }); console.log(`Заявок на рассмотрении: ${cancellationList.counter}`); // Загрузить следующую страницу if (cancellationList.last_id) { const nextPage = await cancellationApi.getConditionalCancellationListV2({ limit: 100, last_id: cancellationList.last_id, filters: { state: 'ON_APPROVAL' } }); } ```

**Example:**
```typescript
const result = await client.getConditionalCancellationListV2(/* parameters */);
console.log(result);
```

### `approveConditionalCancellationV2()`

Подтвердить заявку на отмену rFBS (v2) Approve rFBS cancellation request (v2) Актуальный метод для подтверждения заявки на отмену в статусе ON_APPROVAL. Заказ будет отменён, а деньги вернутся покупателю. ```typescript await cancellationApi.approveConditionalCancellationV2({ cancellation_id: 12345, comment: 'Заявка обоснована. Товар действительно повреждён при доставке.' }); console.log('Заявка на отмену подтверждена. Заказ отменён, деньги вернутся покупателю.'); ```

**Example:**
```typescript
const result = await client.approveConditionalCancellationV2(/* parameters */);
console.log(result);
```

### `rejectConditionalCancellationV2()`

Отклонить заявку на отмену rFBS (v2) Reject rFBS cancellation request (v2) Актуальный метод для отклонения заявки на отмену в статусе ON_APPROVAL. Заказ останется в том же статусе, и его нужно будет доставить покупателю. ```typescript await cancellationApi.rejectConditionalCancellationV2({ cancellation_id: 12345, comment: 'Товар уже отправлен курьером и будет доставлен в ближайшее время. Отмена невозможна.' }); console.log('Заявка на отмену отклонена. Заказ будет доставлен покупателю.'); ```

**Example:**
```typescript
const result = await client.rejectConditionalCancellationV2(/* parameters */);
console.log(result);
```

## Type Definitions

The Cancellation API uses strongly typed TypeScript interfaces for all requests and responses. Import the necessary types from the SDK:

```typescript
import type {
  // Request types
  Cancellation*Request
} from '@ozon/seller-api';

import type {
  // Response types  
  Cancellation*Response
} from '@ozon/seller-api';
```

## Error Handling

```typescript
try {
  const result = await client.cancellation.getConditionalCancellationList(/* parameters */);
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