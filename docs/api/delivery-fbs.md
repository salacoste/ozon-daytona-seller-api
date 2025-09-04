# DeliveryFbs API

DeliveryFBS API implementation

## Overview

The DeliveryFbsApi class provides 18 methods for deliveryfbs api implementation.

## Core Features

- **Core Operations** - 18 methods for comprehensive functionality
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
const result = await client.delivery-fbs.approveCarriage(/* parameters */);
```

## Methods Reference

### `approveCarriage()`

DeliveryFBS API implementation Generated from OZON API documentation DeliveryFBS - FBS delivery management and tracking / import { HttpClient } from "../../core/http.js"; import type { RequestOptions } from "../../core/types.js"; import type { DeliveryFbsCarriageApproveRequest, DeliveryFbsCarriageCancelRequest, DeliveryFbsCarriageCreateRequest, DeliveryFbsCarriageDeliveryListRequest, DeliveryFbsCarriageGetRequest, DeliveryFbsSetPostingsRequest, DeliveryFbsCarriageAvailableListRequest, DeliveryFbsPostingSplitRequest, DeliveryFbsActCheckStatusRequest, DeliveryFbsActCreateRequest, DeliveryFbsGetBarcodeRequest, DeliveryFbsGetContainerLabelsRequest, DeliveryFbsGetActRequest, DeliveryFbsActGetPostingsRequest, DeliveryFbsActListRequest, DeliveryFbsDigitalActCheckStatusRequest, DeliveryFbsGetDigitalActRequest, } from "../../types/requests/delivery-fbs.js"; import type { DeliveryFbsCarriageApproveResponse, DeliveryFbsCarriageCancelResponse, DeliveryFbsCarriageCreateResponse, DeliveryFbsCarriageDeliveryListResponse, DeliveryFbsCarriageGetResponse, DeliveryFbsSetPostingsResponse, DeliveryFbsCarriageAvailableListResponse, DeliveryFbsPostingSplitResponse, DeliveryFbsActCheckStatusResponse, DeliveryFbsActCreateResponse, DeliveryFbsGetBarcodeResponse, DeliveryFbsGetBarcodeTextResponse, DeliveryFbsGetContainerLabelsResponse, DeliveryFbsGetActResponse, DeliveryFbsActGetPostingsResponse, DeliveryFbsActListResponse, DeliveryFbsDigitalActCheckStatusResponse, DeliveryFbsGetDigitalActResponse, } from "../../types/responses/delivery-fbs.js"; /** DeliveryFBS API для управления доставкой и отгрузками FBS DeliveryFBS API for FBS delivery and shipment management Предоставляет полный набор методов для управления доставкой FBS: - Создание и управление отгрузками - Подтверждение и отмена отгрузок - Получение документов и штрихкодов - Управление составом отправлений в отгрузках - Отслеживание статусов документооборота ```typescript // Создать отгрузку const carriage = await deliveryFbsApi.createCarriage({ delivery_method_id: 123, first_mile_from_time: '09:00', first_mile_to_time: '18:00' }); // Подтвердить отгрузку const approved = await deliveryFbsApi.approveCarriage({ carriage_id: carriage.result?.carriage_id }); // Получить документы отгрузки const documents = await deliveryFbsApi.getAct({ carriage_id: carriage.result?.carriage_id, doc_type: 'act' }); ``` / export class DeliveryFbsApi { constructor(private readonly httpClient: HttpClient) {} // ============ Управление отгрузками ============ /** Подтверждение отгрузки Approve carriage Используйте метод, чтобы подтвердить отгрузку после её создания. После подтверждения отгрузка перейдёт в статус «Сформирована». ```typescript const result = await deliveryFbsApi.approveCarriage({ carriage_id: 12345 }); if (result.result) { console.log('Отгрузка подтверждена'); // Теперь можно получить лист отгрузки и штрихкод } ```

**Example:**
```typescript
const result = await client.approveCarriage(/* parameters */);
console.log(result);
```

### `cancelCarriage()`

Удаление отгрузки Cancel carriage ```typescript const result = await deliveryFbsApi.cancelCarriage({ carriage_id: 12345 }); if (result.result) { console.log('Отгрузка удалена'); } ```

**Example:**
```typescript
const result = await client.cancelCarriage(/* parameters */);
console.log(result);
```

### `createCarriage()`

Создание отгрузки Create carriage Используйте метод для создания первой FBS отгрузки. В неё попадут все отправления со статусом «Готов к отгрузке». Созданная отгрузка получит статус `new`. ```typescript const carriage = await deliveryFbsApi.createCarriage({ delivery_method_id: 123, first_mile_from_time: '09:00', first_mile_to_time: '18:00' }); if (carriage.result?.carriage_id) { console.log(`Отгрузка создана с ID: ${carriage.result.carriage_id}`); console.log(`Статус: ${carriage.result.status}`); } ```

**Example:**
```typescript
const result = await client.createCarriage(/* parameters */);
console.log(result);
```

### `getCarriageDeliveryList()`

Список методов доставки и отгрузок Get delivery methods and carriages list Используйте метод, чтобы получить список созданных отгрузок для метода доставки и их статусы. ```typescript const deliveryList = await deliveryFbsApi.getCarriageDeliveryList({ status: 'new', limit: 50 }); deliveryList.result?.forEach(item => { console.log(`Метод доставки: ${item.delivery_method?.name}`); item.carriages?.forEach(carriage => { console.log(`- Отгрузка ${carriage.carriage_id}: ${carriage.status}`); }); }); ```

**Example:**
```typescript
const result = await client.getCarriageDeliveryList(/* parameters */);
console.log(result);
```

### `getCarriage()`

Информация о перевозке Get carriage information ```typescript const carriageInfo = await deliveryFbsApi.getCarriage({ carriage_id: 12345 }); if (carriageInfo.result) { console.log(`Статус перевозки: ${carriageInfo.result.status}`); console.log(`Создана: ${carriageInfo.result.created_at}`); } ```

**Example:**
```typescript
const result = await client.getCarriage(/* parameters */);
console.log(result);
```

### `setPostings()`

Изменение состава отгрузки Set carriage postings ⚠️ Метод недоступен для продавцов из СНГ. Полностью перезаписывает список заказов в отгрузке. ```typescript const result = await deliveryFbsApi.setPostings({ carriage_id: 12345, posting_number: ['12345-0001-1', '12345-0002-1'] }); if (result.result) { console.log('Состав отгрузки изменён'); } ```

**Example:**
```typescript
const result = await client.setPostings(/* parameters */);
console.log(result);
```

### `getCarriageAvailableList()`

Список доступных перевозок Get available carriages list Метод для получения перевозок, по которым нужно распечатать штрихкод для отгрузки и документы. ```typescript const availableCarriages = await deliveryFbsApi.getCarriageAvailableList({ limit: 20 }); availableCarriages.result?.forEach(carriage => { console.log(`Перевозка ${carriage.carriage_id}`); console.log(`Статус: ${carriage.status}`); console.log(`Отправлений: ${carriage.postings_count}`); }); ```

**Example:**
```typescript
const result = await client.getCarriageAvailableList(/* parameters */);
console.log(result);
```

### `splitPosting()`

Разделить заказ на отправления без сборки Split posting without assembly ```typescript const result = await deliveryFbsApi.splitPosting({ posting_number: '12345-0001-1' }); if (result.result) { console.log('Заказ разделён на отправления'); result.created_postings?.forEach(posting => { console.log(`Создано отправление: ${posting}`); }); } ```

**Example:**
```typescript
const result = await client.splitPosting(/* parameters */);
console.log(result);
```

### `checkActStatus()`

Статус отгрузки и документов Get shipment and documents status Возвращает статус формирования штрихкода для отгрузки и документов. ```typescript const status = await deliveryFbsApi.checkActStatus({ carriage_id: 12345 }); console.log(`Статус отгрузки: ${status.carriage_status}`); console.log(`Статус штрихкода: ${status.barcode_status}`); status.documents?.forEach(doc => { console.log(`${doc.type}: ${doc.status}`); }); ```

**Example:**
```typescript
const result = await client.checkActStatus(/* parameters */);
console.log(result);
```

### `createAct()`

Подтвердить отгрузку и создать документы Confirm shipment and create documents Подтверждает отгрузку и запускает формирование транспортной накладной и штрихкода для отгрузки. ```typescript const result = await deliveryFbsApi.createAct({ carriage_id: 12345, posting_number: ['12345-0001-1', '12345-0002-1'] }); if (result.result) { console.log(`Акт создан с ID: ${result.act_id}`); } ```

**Example:**
```typescript
const result = await client.createAct(/* parameters */);
console.log(result);
```

### `getBarcode()`

Штрихкод для отгрузки отправления Get shipment barcode Метод для получения штрихкода, который нужно показать в пункте выдачи или сортировочном центре при отгрузке отправления. ```typescript const barcode = await deliveryFbsApi.getBarcode({ carriage_id: 12345 }); if (barcode.barcode) { // Сохранить изображение штрихкода из base64 const barcodeBuffer = Buffer.from(barcode.barcode, 'base64'); console.log(`Получен штрихкод: ${barcode.content_type}`); } ```

**Example:**
```typescript
const result = await client.getBarcode(/* parameters */);
console.log(result);
```

### `getBarcodeText()`

Значение штрихкода для отгрузки отправления Get shipment barcode text Используйте этот метод, чтобы получить штрихкод в текстовом виде. ```typescript const barcodeText = await deliveryFbsApi.getBarcodeText({ carriage_id: 12345 }); if (barcodeText.barcode_text) { console.log(`Штрихкод: ${barcodeText.barcode_text}`); } ```

**Example:**
```typescript
const result = await client.getBarcodeText(/* parameters */);
console.log(result);
```

### `getContainerLabels()`

Этикетки для грузового места Get container labels Метод создает этикетки для грузового места. ```typescript const labels = await deliveryFbsApi.getContainerLabels({ carriage_id: 12345, container_numbers: ['CONT001', 'CONT002'] }); if (labels.content) { // Сохранить PDF файл из base64 const labelsBuffer = Buffer.from(labels.content, 'base64'); console.log(`Получены этикетки: ${labels.content_type}`); } ```

**Example:**
```typescript
const result = await client.getContainerLabels(/* parameters */);
console.log(result);
```

### `getAct()`

Получить PDF c документами Get PDF documents С помощью метода можно получить лист отгрузки и транспортную накладную для продавцов из России, или акт и транспортную накладную для продавцов из СНГ. ```typescript const documents = await deliveryFbsApi.getAct({ carriage_id: 12345, doc_type: 'act' }); if (documents.content) { // Сохранить PDF файл из base64 const docBuffer = Buffer.from(documents.content, 'base64'); console.log(`Получен документ: ${documents.filename}`); } ```

**Example:**
```typescript
const result = await client.getAct(/* parameters */);
console.log(result);
```

### `getActPostings()`

Список отправлений в акте Get postings list in act Возвращает список отправлений в акте по его идентификатору. ```typescript const postings = await deliveryFbsApi.getActPostings({ carriage_id: 12345, limit: 100 }); postings.result?.forEach(posting => { console.log(`Отправление: ${posting.posting_number}`); console.log(`Статус: ${posting.status}`); }); ```

**Example:**
```typescript
const result = await client.getActPostings(/* parameters */);
console.log(result);
```

### `getActList()`

Список актов по отгрузкам Get acts list by shipments Возвращает список актов по отгрузкам с возможностью отфильтровать отгрузки по периоду, статусу и типу интеграции. ```typescript const acts = await deliveryFbsApi.getActList({ filter: { since: '2024-01-01T00:00:00Z', to: '2024-01-31T23:59:59Z', status: 'confirmed' }, limit: 50 }); acts.result?.forEach(act => { console.log(`Акт ${act.act_id}, отгрузка ${act.carriage_id}`); console.log(`Статус: ${act.status}, отправлений: ${act.postings_count}`); }); ```

**Example:**
```typescript
const result = await client.getActList(/* parameters */);
console.log(result);
```

### `checkDigitalActStatus()`

Статус формирования накладной Get waybill formation status ```typescript const status = await deliveryFbsApi.checkDigitalActStatus({ carriage_id: 12345 }); console.log(`Статус формирования: ${status.status}`); if (status.error_message) { console.log(`Ошибка: ${status.error_message}`); } ```

**Example:**
```typescript
const result = await client.checkDigitalActStatus(/* parameters */);
console.log(result);
```

### `getDigitalAct()`

Получить лист отгрузки по перевозке Get shipment list by carriage Вы можете получить документы, если статус перевозки: FORMED, CONFIRMED или CONFIRMED_WITH_MISMATCH. ```typescript const shipmentList = await deliveryFbsApi.getDigitalAct({ carriage_id: 12345 }); if (shipmentList.content) { // Сохранить PDF файл из base64 const listBuffer = Buffer.from(shipmentList.content, 'base64'); console.log(`Получен лист отгрузки: ${shipmentList.filename}`); } ```

**Example:**
```typescript
const result = await client.getDigitalAct(/* parameters */);
console.log(result);
```

## Type Definitions

The DeliveryFbs API uses strongly typed TypeScript interfaces for all requests and responses. Import the necessary types from the SDK:

```typescript
import type {
  // Request types
  Delivery-fbs*Request
} from '@ozon/seller-api';

import type {
  // Response types  
  Delivery-fbs*Response
} from '@ozon/seller-api';
```

## Error Handling

```typescript
try {
  const result = await client.delivery-fbs.approveCarriage(/* parameters */);
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