# Pass API

Pass API implementation

## Overview

The PassApi class provides 7 methods for pass api implementation.

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
const result = await client.pass.createCarriagePass(/* parameters */);
```

## Methods Reference

### `createCarriagePass()`

Pass API implementation Arrival pass and warehouse access management / import { HttpClient } from '../../core/http.js'; import type { RequestOptions } from '../../core/types.js'; import type { EmptyResponse } from '../../types/common/base.js'; import type { PassCreateCarriagePassRequest, PassDeleteCarriagePassRequest, PassUpdateCarriagePassRequest, PassListRequest, PassCreateReturnPassRequest, PassDeleteReturnPassRequest, PassUpdateReturnPassRequest } from '../../types/requests/pass.js'; import type { PassCreateCarriagePassResponse, PassListResponse, PassCreateReturnPassResponse } from '../../types/responses/pass.js'; /** Pass API для управления пропусками прибытия и доступом к складу Pass API for arrival pass and warehouse access management ```typescript // Создать пропуск для перевозки const carriagePass = await passApi.createCarriagePass({ carriage_id: 12345, arrival_passes: [{ vehicle_number: 'А123БВ777', driver_name: 'Иванов Иван Иванович', driver_license: '12 34 567890', arrival_date: '2024-01-15T09:00:00Z', comment: 'Доставка товаров' }] }); // Получить список пропусков const passList = await passApi.getPassList({ limit: 100, filter: { arrival_reason: 'FBS_DELIVERY', only_active_passes: true, warehouse_ids: ['12345'] } }); // Создать пропуск для возврата const returnPass = await passApi.createReturnPass({ arrival_passes: [{ vehicle_number: 'В456ГД888', driver_name: 'Петров Петр Петрович', posting_number: '12345-0001-1' }] }); ``` / export class PassApi { constructor(private readonly httpClient: HttpClient) {} /** Создать пропуск для перевозки Create carriage pass Идентификатор созданного пропуска добавится к перевозке. ```typescript const result = await passApi.createCarriagePass({ carriage_id: 12345, arrival_passes: [{ vehicle_number: 'А123БВ777', driver_name: 'Иванов Иван Иванович', driver_license: '12 34 567890', arrival_date: '2024-01-15T09:00:00Z', comment: 'Плановая поставка товаров' }, { vehicle_number: 'Б456ГД888', driver_name: 'Петров Петр Петрович', driver_license: '98 76 543210', arrival_date: '2024-01-15T14:00:00Z', comment: 'Дополнительная поставка' }] }); console.log(`Создано пропусков: ${result.arrival_pass_ids?.length}`); result.arrival_pass_ids?.forEach(id => { console.log(`Пропуск ID: ${id}`); }); ```

**Example:**
```typescript
const result = await client.createCarriagePass(/* parameters */);
console.log(result);
```

### `deleteCarriagePass()`

Удалить пропуск для перевозки Delete carriage pass Удаляет указанные пропуски для перевозки. ```typescript await passApi.deleteCarriagePass({ carriage_id: 12345, arrival_pass_ids: ['67890', '54321'] }); console.log('Пропуски успешно удалены'); ```

**Example:**
```typescript
const result = await client.deleteCarriagePass(/* parameters */);
console.log(result);
```

### `updateCarriagePass()`

Обновить пропуск для перевозки Update carriage pass Обновляет информацию о пропусках для перевозки. ```typescript await passApi.updateCarriagePass({ carriage_id: 12345, arrival_passes: [{ arrival_pass_id: '67890', vehicle_number: 'В789ДЕ999', driver_name: 'Сидоров Сидор Сидорович', driver_license: '11 22 334455', arrival_date: '2024-01-16T10:00:00Z', comment: 'Изменено время прибытия' }] }); console.log('Пропуск успешно обновлён'); ```

**Example:**
```typescript
const result = await client.updateCarriagePass(/* parameters */);
console.log(result);
```

### `getPassList()`

Список пропусков Get pass list Возвращает список пропусков с возможностью фильтрации. ```typescript const passList = await passApi.getPassList({ limit: 50, filter: { carriage_id: 12345, status: 'ACTIVE', date_from: '2024-01-01', date_to: '2024-01-31' } }); passList.arrival_passes?.forEach(pass => { console.log(`Пропуск ${pass.arrival_pass_id}:`); console.log(`  Автомобиль: ${pass.vehicle_number}`); console.log(`  Водитель: ${pass.driver_name}`); console.log(`  Прибытие: ${pass.arrival_date}`); console.log(`  Статус: ${pass.status}`); if (pass.comment) { console.log(`  Комментарий: ${pass.comment}`); } }); // Загрузить следующую страницу if (passList.cursor) { const nextPage = await passApi.getPassList({ limit: 50, cursor: passList.cursor, filter: { carriage_id: 12345 } }); } ```

**Example:**
```typescript
const result = await client.getPassList(/* parameters */);
console.log(result);
```

### `createReturnPass()`

Создать пропуск для возврата Create return pass Создает пропуск для возврата товаров. ```typescript const returnPassResult = await passApi.createReturnPass({ arrival_passes: [{ vehicle_number: 'С123ЖЗ111', driver_name: 'Федоров Федор Федорович', driver_license: '55 66 778899', arrival_date: '2024-01-20T11:00:00Z', posting_number: '12345-0001-1', comment: 'Возврат бракованных товаров' }] }); console.log(`Создано пропусков возврата: ${returnPassResult.arrival_pass_ids?.length}`); returnPassResult.arrival_pass_ids?.forEach(id => { console.log(`Пропуск возврата ID: ${id}`); }); ```

**Example:**
```typescript
const result = await client.createReturnPass(/* parameters */);
console.log(result);
```

### `deleteReturnPass()`

Удалить пропуск для возврата Delete return pass Удаляет указанные пропуски для возврата. ```typescript await passApi.deleteReturnPass({ arrival_pass_ids: ['11111', '22222'] }); console.log('Пропуски возврата успешно удалены'); ```

**Example:**
```typescript
const result = await client.deleteReturnPass(/* parameters */);
console.log(result);
```

### `updateReturnPass()`

Обновить пропуск для возврата Update return pass Обновляет информацию о пропусках для возврата. ```typescript await passApi.updateReturnPass({ arrival_passes: [{ arrival_pass_id: '11111', vehicle_number: 'Т456УФ222', driver_name: 'Николаев Николай Николаевич', driver_license: '33 44 556677', arrival_date: '2024-01-21T15:00:00Z', posting_number: '12345-0002-1', comment: 'Обновлено время прибытия для возврата' }] }); console.log('Пропуск возврата успешно обновлён'); ```

**Example:**
```typescript
const result = await client.updateReturnPass(/* parameters */);
console.log(result);
```

## Type Definitions

The Pass API uses strongly typed TypeScript interfaces for all requests and responses. Import the necessary types from the SDK:

```typescript
import type {
  // Request types
  Pass*Request
} from '@ozon/seller-api';

import type {
  // Response types  
  Pass*Response
} from '@ozon/seller-api';
```

## Error Handling

```typescript
try {
  const result = await client.pass.createCarriagePass(/* parameters */);
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