# FboSupplyRequest API

FBOSupplyRequest API implementation

## Overview

The FboSupplyRequestApi class provides 19 methods for fbosupplyrequest api implementation.

## Core Features

- **Core Operations** - 19 methods for comprehensive functionality
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
const result = await client.fbo-supply-request.createCargoLabels(/* parameters */);
```

## Methods Reference

### `createCargoLabels()`

FBOSupplyRequest API implementation Generated from OZON API documentation FBOSupplyRequest - FBO supply order management / import { HttpClient } from "../../core/http.js"; import type { RequestOptions } from "../../core/types.js"; import type { FboSupplyRequestCargoesLabelCreateRequest, FboSupplyRequestCargoesLabelGetRequest, FboSupplyRequestCargoesCreateRequest, FboSupplyRequestCargoesCreateInfoRequest, FboSupplyRequestCargoesDeleteRequest, FboSupplyRequestCargoesDeleteStatusRequest, FboSupplyRequestCargoesRulesGetRequest, FboSupplyRequestClusterListRequest, FboSupplyRequestDraftCreateRequest, FboSupplyRequestDraftCreateInfoRequest, FboSupplyRequestDraftSupplyCreateRequest, FboSupplyRequestDraftSupplyCreateStatusRequest, FboSupplyRequestDraftTimeslotInfoRequest, FboSupplyRequestSupplyOrderCancelRequest, FboSupplyRequestSupplyOrderCancelStatusRequest, FboSupplyRequestSupplyOrderContentUpdateRequest, FboSupplyRequestSupplyOrderContentUpdateStatusRequest, FboSupplyRequestWarehouseFboListRequest, } from "../../types/requests/fbo-supply-request.js"; import type { FboSupplyRequestCargoesLabelCreateResponse, FboSupplyRequestCargoesLabelGetResponse, FboSupplyRequestCargoesCreateResponse, FboSupplyRequestCargoesCreateInfoResponse, FboSupplyRequestCargoesDeleteResponse, FboSupplyRequestCargoesDeleteStatusResponse, FboSupplyRequestCargoesRulesGetResponse, FboSupplyRequestClusterListResponse, FboSupplyRequestDraftCreateResponse, FboSupplyRequestDraftCreateInfoResponse, FboSupplyRequestDraftSupplyCreateResponse, FboSupplyRequestDraftSupplyCreateStatusResponse, FboSupplyRequestDraftTimeslotInfoResponse, FboSupplyRequestSupplyOrderCancelResponse, FboSupplyRequestSupplyOrderCancelStatusResponse, FboSupplyRequestSupplyOrderContentUpdateResponse, FboSupplyRequestSupplyOrderContentUpdateStatusResponse, FboSupplyRequestWarehouseFboListResponse, } from "../../types/responses/fbo-supply-request.js"; /** FBOSupplyRequest API для управления заявками на поставку FBO FBOSupplyRequest API for FBO supply order management Предоставляет полный набор методов для управления заявками на поставку FBO: - Создание и управление черновиками заявок - Управление грузоместами и их составом - Генерация этикеток для грузомест - Редактирование товарного состава - Отмена заявок на поставку - Получение информации о складах и таймслотах ```typescript // Создать черновик заявки на поставку const draft = await fboSupplyRequestApi.createDraft({ supply_type: 'DIRECT', warehouse_id: 123, items: [ { sku: '123456789', quantity: 10 }, { sku: '987654321', quantity: 5 } ] }); // Создать заявку на поставку по черновику const supplyOrder = await fboSupplyRequestApi.createSupplyOrderFromDraft({ draft_id: draft.draft?.draft_id, timeslot_id: 'slot_123' }); // Установить грузоместа const cargoes = await fboSupplyRequestApi.createCargoes({ supply_order_id: 456, cargoes: [ { cargo_number: 'CARGO001', weight: 25.5, length: 40, width: 30, height: 20, items: [{ sku: '123456789', quantity: 5 }] } ] }); ``` / export class FboSupplyRequestApi { constructor(private readonly httpClient: HttpClient) {} // ============ Этикетки для грузомест ============ /** Сгенерировать этикетки для грузомест Generate cargo labels Используйте метод, чтобы сгенерировать этикетки для грузомест из заявки на поставку. ```typescript const labelTask = await fboSupplyRequestApi.createCargoLabels({ supply_order_id: 12345, cargo_ids: [1001, 1002, 1003] }); if (labelTask.task_id) { console.log(`Задача генерации этикеток: ${labelTask.task_id}`); console.log(`Статус: ${labelTask.status}`); } ```

**Example:**
```typescript
const result = await client.createCargoLabels(/* parameters */);
console.log(result);
```

### `getCargoLabels()`

Получить идентификатор этикетки для грузомест Get cargo label identifier Используйте метод, чтобы получить статус формирования этикеток и идентификатор файла с ними. ```typescript const labelStatus = await fboSupplyRequestApi.getCargoLabels({ task_id: 'task_12345' }); if (labelStatus.status === 'completed' && labelStatus.file_guid) { console.log(`Этикетки готовы: ${labelStatus.file_url}`); // Можно загрузить файл по file_guid } else if (labelStatus.status === 'processing') { console.log('Этикетки ещё формируются'); } ```

**Example:**
```typescript
const result = await client.getCargoLabels(/* parameters */);
console.log(result);
```

### `getCargoLabelsFile()`

Получить PDF с этикетками грузовых мест Get cargo labels PDF file ```typescript // После получения file_guid из getCargoLabels const pdfResponse = await fboSupplyRequestApi.getCargoLabelsFile('file_guid_123'); // PDF будет в теле ответа if (pdfResponse) { console.log('PDF файл с этикетками получен'); } ```

**Example:**
```typescript
const result = await client.getCargoLabelsFile(/* parameters */);
console.log(result);
```

### `createCargoes()`

Установка грузомест Set cargoes Используйте метод, чтобы передать грузоместа и товарный состав в заявку на поставку. ```typescript const cargoTask = await fboSupplyRequestApi.createCargoes({ supply_order_id: 12345, cargoes: [ { cargo_number: 'CARGO001', weight: 25.5, length: 40, width: 30, height: 20, items: [ { sku: '123456789', quantity: 5 }, { sku: '987654321', quantity: 3 } ] }, { cargo_number: 'CARGO002', weight: 18.0, length: 35, width: 25, height: 15, items: [ { sku: '555666777', quantity: 10 } ] } ] }); console.log(`Задача установки грузомест: ${cargoTask.task_id}`); ```

**Example:**
```typescript
const result = await client.createCargoes(/* parameters */);
console.log(result);
```

### `getCargoesCreateInfo()`

Получить информацию по установке грузомест Get cargoes creation info Используйте метод, чтобы получить информацию по установленным грузоместам. ```typescript const cargoInfo = await fboSupplyRequestApi.getCargoesCreateInfo({ task_id: 'task_12345' }); if (cargoInfo.status === 'completed') { cargoInfo.cargoes?.forEach(cargo => { console.log(`Грузоместо ${cargo.cargo_number}: ID ${cargo.cargo_id}`); console.log(`Вес: ${cargo.weight}кг, статус: ${cargo.status}`); }); } cargoInfo.errors?.forEach(error => { console.log(`Ошибка для ${error.cargo_number}: ${error.error_message}`); }); ```

**Example:**
```typescript
const result = await client.getCargoesCreateInfo(/* parameters */);
console.log(result);
```

### `deleteCargoes()`

Удалить грузоместо в заявке на поставку Delete cargo in supply request Метод для удаления грузомест в заявке на поставку. ```typescript const deleteTask = await fboSupplyRequestApi.deleteCargoes({ supply_order_id: 12345, cargo_ids: [1001, 1002] }); console.log(`Задача удаления: ${deleteTask.task_id}`); console.log(`Статус: ${deleteTask.status}`); ```

**Example:**
```typescript
const result = await client.deleteCargoes(/* parameters */);
console.log(result);
```

### `getCargoesDeleteStatus()`

Информация о статусе удаления грузоместа Get cargo deletion status Метод для получения статуса удаления грузомест в заявке на поставку. ```typescript const deleteStatus = await fboSupplyRequestApi.getCargoesDeleteStatus({ task_id: 'delete_task_123' }); if (deleteStatus.status === 'completed') { deleteStatus.results?.forEach(result => { if (result.success) { console.log(`Грузоместо ${result.cargo_id} удалено`); } else { console.log(`Ошибка удаления ${result.cargo_id}: ${result.error_message}`); } }); } ```

**Example:**
```typescript
const result = await client.getCargoesDeleteStatus(/* parameters */);
console.log(result);
```

### `getCargoRules()`

Чек-лист по установке грузомест FBO Get FBO cargo rules checklist Метод для получения чек-листа с правилами по установке грузомест. ```typescript const rules = await fboSupplyRequestApi.getCargoRules({}); rules.rules?.forEach(rule => { console.log(`${rule.type}: ${rule.description}`); if (rule.required) { console.log('  (Обязательное правило)'); } }); ```

**Example:**
```typescript
const result = await client.getCargoRules(/* parameters */);
console.log(result);
```

### `getClusterList()`

Информация о кластерах и их складах Get cluster and warehouse information ```typescript const clusters = await fboSupplyRequestApi.getClusterList({}); clusters.clusters?.forEach(cluster => { console.log(`Кластер: ${cluster.name} (ID: ${cluster.cluster_id})`); cluster.warehouses?.forEach(warehouse => { console.log(`  Склад: ${warehouse.name}`); console.log(`  Тип: ${warehouse.type}, доступен: ${warehouse.is_available}`); }); }); ```

**Example:**
```typescript
const result = await client.getClusterList(/* parameters */);
console.log(result);
```

### `getWarehouseFboList()`

Поиск точек для отгрузки поставки Search FBO warehouse list Используйте метод, чтобы найти точки отгрузки для кросс-докинга и прямых поставок. ```typescript const warehouses = await fboSupplyRequestApi.getWarehouseFboList({ region: 'Москва', warehouse_type: 'DIRECT' }); warehouses.warehouses?.forEach(warehouse => { console.log(`${warehouse.name} (${warehouse.type})`); console.log(`Адрес: ${warehouse.address}`); console.log(`Доступен: ${warehouse.is_available}`); }); ```

**Example:**
```typescript
const result = await client.getWarehouseFboList(/* parameters */);
console.log(result);
```

### `createDraft()`

Создать черновик заявки на поставку Create supply draft Создать черновик заявки на поставку — прямой или кросс-докинг, а также указать поставляемые товары. ```typescript const draft = await fboSupplyRequestApi.createDraft({ supply_type: 'DIRECT', warehouse_id: 123, items: [ { sku: '123456789', quantity: 10 }, { sku: '987654321', quantity: 5 }, { sku: '555666777', quantity: 20 } ] }); if (draft.draft?.draft_id) { console.log(`Черновик создан: ${draft.draft.draft_id}`); console.log(`Тип поставки: ${draft.draft.supply_type}`); console.log(`Склад: ${draft.draft.warehouse?.name}`); } ```

**Example:**
```typescript
const result = await client.createDraft(/* parameters */);
console.log(result);
```

### `getDraftInfo()`

Информация о черновике заявки на поставку Get draft information ```typescript const draftInfo = await fboSupplyRequestApi.getDraftInfo({ draft_id: 'draft_12345' }); if (draftInfo.draft) { console.log(`Статус черновика: ${draftInfo.draft.status}`); console.log(`Товаров в черновике: ${draftInfo.draft.items?.length}`); draftInfo.draft.items?.forEach(item => { console.log(`- ${item.name}: ${item.quantity} шт`); }); } ```

**Example:**
```typescript
const result = await client.getDraftInfo(/* parameters */);
console.log(result);
```

### `getTimeslotInfo()`

Доступные таймслоты Get available timeslots Доступные таймслоты на конечных складах отгрузки. ```typescript const timeslots = await fboSupplyRequestApi.getTimeslotInfo({ warehouse_id: 123, date_from: '2024-01-15', date_to: '2024-01-20' }); timeslots.timeslots?.forEach(slot => { if (slot.is_available) { console.log(`Доступен: ${slot.start_time} - ${slot.end_time}`); console.log(`Макс. палет: ${slot.max_pallets}`); } }); ```

**Example:**
```typescript
const result = await client.getTimeslotInfo(/* parameters */);
console.log(result);
```

### `createSupplyOrderFromDraft()`

Создать заявку на поставку по черновику Create supply order from draft ```typescript const createTask = await fboSupplyRequestApi.createSupplyOrderFromDraft({ draft_id: 'draft_12345', timeslot_id: 'slot_67890' }); console.log(`Задача создания заявки: ${createTask.task_id}`); console.log(`Статус: ${createTask.status}`); ```

**Example:**
```typescript
const result = await client.createSupplyOrderFromDraft(/* parameters */);
console.log(result);
```

### `getSupplyOrderCreateStatus()`

Информация о создании заявки на поставку Get supply order creation status ```typescript const createStatus = await fboSupplyRequestApi.getSupplyOrderCreateStatus({ task_id: 'create_task_123' }); if (createStatus.status === 'completed' && createStatus.supply_order_id) { console.log(`Заявка создана с ID: ${createStatus.supply_order_id}`); } else if (createStatus.status === 'error') { console.log(`Ошибка: ${createStatus.error_message}`); } ```

**Example:**
```typescript
const result = await client.getSupplyOrderCreateStatus(/* parameters */);
console.log(result);
```

### `cancelSupplyOrder()`

Отменить заявку на поставку Cancel supply order ```typescript const cancelTask = await fboSupplyRequestApi.cancelSupplyOrder({ supply_order_id: 12345, reason: 'Изменились планы поставки' }); console.log(`Задача отмены: ${cancelTask.task_id}`); console.log(`Статус: ${cancelTask.status}`); ```

**Example:**
```typescript
const result = await client.cancelSupplyOrder(/* parameters */);
console.log(result);
```

### `getSupplyOrderCancelStatus()`

Получить статус отмены заявки на поставку Get supply order cancellation status ```typescript const cancelStatus = await fboSupplyRequestApi.getSupplyOrderCancelStatus({ task_id: 'cancel_task_123' }); if (cancelStatus.status === 'completed') { if (cancelStatus.success) { console.log('Заявка успешно отменена'); } else { console.log(`Ошибка отмены: ${cancelStatus.error_message}`); } } ```

**Example:**
```typescript
const result = await client.getSupplyOrderCancelStatus(/* parameters */);
console.log(result);
```

### `updateSupplyOrderContent()`

Редактирование товарного состава Update supply order content Метод для редактирования товарного состава в заявке на поставку. ```typescript const updateTask = await fboSupplyRequestApi.updateSupplyOrderContent({ supply_order_id: 12345, items: [ { sku: '123456789', quantity: 15, operation: 'update' }, { sku: '987654321', quantity: 10, operation: 'add' }, { sku: '555666777', quantity: 0, operation: 'delete' } ] }); console.log(`Задача редактирования: ${updateTask.task_id}`); ```

**Example:**
```typescript
const result = await client.updateSupplyOrderContent(/* parameters */);
console.log(result);
```

### `getSupplyOrderContentUpdateStatus()`

Информация о статусе редактирования товарного состава Get content update status Метод для получения статуса редактирования товарного состава. ```typescript const updateStatus = await fboSupplyRequestApi.getSupplyOrderContentUpdateStatus({ task_id: 'update_task_123' }); if (updateStatus.status === 'completed') { updateStatus.results?.forEach(result => { const status = result.success ? 'успешно' : 'ошибка'; console.log(`${result.sku} (${result.operation}): ${status}`); if (!result.success) { console.log(`  Ошибка: ${result.error_message}`); } }); } ```

**Example:**
```typescript
const result = await client.getSupplyOrderContentUpdateStatus(/* parameters */);
console.log(result);
```

## Type Definitions

The FboSupplyRequest API uses strongly typed TypeScript interfaces for all requests and responses. Import the necessary types from the SDK:

```typescript
import type {
  // Request types
  Fbo-supply-request*Request
} from '@ozon/seller-api';

import type {
  // Response types  
  Fbo-supply-request*Response
} from '@ozon/seller-api';
```

## Error Handling

```typescript
try {
  const result = await client.fbo-supply-request.createCargoLabels(/* parameters */);
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