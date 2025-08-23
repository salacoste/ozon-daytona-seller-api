# Fbs API

FBS API implementation

## Overview

The FbsApi class provides 22 methods for fbs api implementation.

## Core Features

- **Core Operations** - 22 methods for comprehensive functionality
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
const result = await client.fbs.getCancelReasons(/* parameters */);
```

## Methods Reference

### `getCancelReasons()`

FBS API implementation Generated from OZON API documentation FBS - Fulfillment by Seller operations / import { HttpClient } from '../../core/http.js'; import type { RequestOptions } from '../../core/types.js'; import type { FbsCancelReasonRequest, FbsCreateLabelBatchRequest, FbsGetLabelBatchRequest, FbsPickupCodeVerifyRequest, FbsGetRestrictionsRequest, FbsMovePostingRequest, FbsCancelPostingRequest, FbsGetPostingByBarcodeRequest, FbsPackageLabelRequest, FbsProductCancelRequest, FbsProductChangeRequest, FbsProductCountryListRequest, FbsProductCountrySetRequest, FbsGetPostingV3Request, FbsGetPostingListV3Request, FbsGetUnfulfilledListV3Request, FbsMultiBoxQtySetV3Request, FbsGetEtgbRequest, FbsUnpaidLegalProductListRequest } from '../../types/requests/fbs.js'; import type { FbsCancelReasonResponse, FbsCancelReasonListResponse, FbsCreateLabelBatchResponse, FbsGetLabelBatchResponse, FbsPickupCodeVerifyResponse, FbsGetRestrictionsResponse, FbsBooleanResponse, FbsPostingResponse, FbsPackageLabelResponse, FbsProductCancelResponse, FbsProductChangeResponse, FbsProductCountryListResponse, FbsProductCountrySetResponse, FbsGetPostingV3Response, FbsGetPostingListV3Response, FbsGetUnfulfilledListV3Response, FbsMultiBoxQtySetV3Response, FbsGetEtgbResponse, FbsUnpaidLegalProductListResponse } from '../../types/responses/fbs.js'; /** FBS API для управления отправлениями Fulfillment by Seller FBS API for Fulfillment by Seller posting management Предоставляет полный набор методов для управления отправлениями FBS: - Создание и отмена отправлений - Печать и управление этикетками - Отслеживание статусов и доставки - Управление товарами в отправлениях - Работа с возвратами и спорами ```typescript // Получить список отправлений const postings = await fbsApi.getPostingListV3({ filter: { since: '2024-01-01T00:00:00Z', to: '2024-01-31T23:59:59Z', status: 'awaiting_deliver' }, limit: 100 }); // Напечатать этикетки для отправлений const labels = await fbsApi.packageLabel({ posting_number: ['12345-0001-1', '12345-0002-1'] }); // Отменить отправление const cancelled = await fbsApi.cancelPosting({ posting_number: '12345-0001-1', cancel_reason_id: 402, cancel_reason_message: 'Товар не в наличии' }); ``` / export class FbsApi { constructor(private readonly httpClient: HttpClient) {} // ============ Причины отмены ============ /** Причины отмены отправления Get posting cancellation reasons Возвращает список причин отмены для конкретных отправлений. ```typescript const reasons = await fbsApi.getCancelReasons({ related_posting_numbers: ['12345-0001-1', '12345-0002-1'] }); reasons.result?.forEach(posting => { console.log(`Отправление ${posting.posting_number}:`); posting.cancel_reasons?.forEach(reason => { console.log(`- ${reason.name} (ID: ${reason.id})`); }); }); ```

**Example:**
```typescript
const result = await client.getCancelReasons(/* parameters */);
console.log(result);
```

### `getCancelReasonsList()`

Причины отмены отправлений (список всех) Get all posting cancellation reasons Возвращает список причин отмены для всех отправлений. ```typescript const allReasons = await fbsApi.getCancelReasonsList(); allReasons.result?.forEach(reason => { console.log(`${reason.name} (ID: ${reason.id}, Тип: ${reason.type_id})`); }); ```

**Example:**
```typescript
const result = await client.getCancelReasonsList(/* parameters */);
console.log(result);
```

### `createLabelBatch()`

Создать задание на выгрузку этикеток (v1 - устарел) Create label batch task (v1 - deprecated) ⚠️ В будущем метод будет отключён. Переключитесь на v2/posting/fbs/package-label/create.

**Example:**
```typescript
const result = await client.createLabelBatch(/* parameters */);
console.log(result);
```

### `createLabelBatchV2()`

Создать задание на формирование этикеток (v2) Create label batch task (v2) Метод для создания задания на асинхронное формирование этикеток. Может вернуть несколько заданий: на формирование маленькой и большой этикетки. ```typescript const batchTask = await fbsApi.createLabelBatchV2({ posting_number: ['12345-0001-1', '12345-0002-1'] }); if (batchTask.result?.task_id) { console.log(`Задание создано с ID: ${batchTask.result.task_id}`); } ```

**Example:**
```typescript
const result = await client.createLabelBatchV2(/* parameters */);
console.log(result);
```

### `getLabelBatch()`

Получить файл с этикетками Get label batch file Метод для получения этикеток после вызова createLabelBatch/createLabelBatchV2. ```typescript const labels = await fbsApi.getLabelBatch({ task_id: 123456 }); if (labels.result?.file_url) { console.log(`Этикетки готовы: ${labels.result.file_url}`); } else if (labels.result?.status === 'processing') { console.log('Этикетки ещё обрабатываются, повторите запрос позднее'); } ```

**Example:**
```typescript
const result = await client.getLabelBatch(/* parameters */);
console.log(result);
```

### `packageLabel()`

Напечатать этикетку Print package label Генерирует PDF-файл с этикетками для указанных отправлений. В одном запросе можно передать не больше 20 идентификаторов. Рекомендуем запрашивать этикетки через 45–60 секунд после сборки заказа. ```typescript const label = await fbsApi.packageLabel({ posting_number: ['12345-0001-1'] }); if (label.content) { // Сохранить PDF файл из base64 const pdfBuffer = Buffer.from(label.content, 'base64'); console.log(`Получен PDF размером ${pdfBuffer.length} байт`); } ```

**Example:**
```typescript
const result = await client.packageLabel(/* parameters */);
console.log(result);
```

### `verifyPickupCode()`

Проверить код курьера Verify courier pickup code Метод позволяет проверить код курьера при передаче отправлений realFBS Express. ```typescript const verification = await fbsApi.verifyPickupCode({ code: '123456', posting_number: '12345-0001-1' }); if (verification.result) { console.log('Код курьера верный'); } else { console.log('Неверный код курьера'); } ```

**Example:**
```typescript
const result = await client.verifyPickupCode(/* parameters */);
console.log(result);
```

### `getRestrictions()`

Получить ограничения пункта приёма Get pickup point restrictions Метод для получения габаритных, весовых и прочих ограничений пункта приёма по номеру отправления. Применим только для работы по схеме FBS. ```typescript const restrictions = await fbsApi.getRestrictions({ posting_number: '12345-0001-1' }); const maxWeight = restrictions.result?.max_weight; const maxDims = restrictions.result?.max_dimensions; console.log(`Макс. вес: ${maxWeight}кг, габариты: ${maxDims?.length}x${maxDims?.width}x${maxDims?.height}см`); ```

**Example:**
```typescript
const result = await client.getRestrictions(/* parameters */);
console.log(result);
```

### `moveToArbitration()`

Открыть спор по отправлению Move posting to arbitration Если отправление передано в доставку, но не просканировано в сортировочном центре, можно открыть спор. Открытый спор переведёт отправление в статус `arbitration`. ```typescript const result = await fbsApi.moveToArbitration({ posting_number: ['12345-0001-1'] }); if (result.result) { console.log('Отправление переведено в арбитраж'); } ```

**Example:**
```typescript
const result = await client.moveToArbitration(/* parameters */);
console.log(result);
```

### `moveToAwaitingDelivery()`

Передать отправление к отгрузке Move posting to awaiting delivery Передает спорные заказы к отгрузке. Статус отправления изменится на `awaiting_deliver`. ```typescript const result = await fbsApi.moveToAwaitingDelivery({ posting_number: ['12345-0001-1'] }); if (result.result) { console.log('Отправление передано к отгрузке'); } ```

**Example:**
```typescript
const result = await client.moveToAwaitingDelivery(/* parameters */);
console.log(result);
```

### `cancelPosting()`

Отменить отправление Cancel FBS posting Меняет статус отправления на `cancelled`. Условно-доставленные отправления отменить нельзя. Если значение параметра `cancel_reason_id` — 402, заполните поле `cancel_reason_message`. ```typescript const result = await fbsApi.cancelPosting({ posting_number: '12345-0001-1', cancel_reason_id: 402, cancel_reason_message: 'Товар не в наличии' }); if (result.result) { console.log('Отправление отменено'); } ```

**Example:**
```typescript
const result = await client.cancelPosting(/* parameters */);
console.log(result);
```

### `getPostingByBarcode()`

Получить информацию об отправлении по штрихкоду Get posting information by barcode ```typescript const posting = await fbsApi.getPostingByBarcode({ barcode: '1234567890123' }); if (posting.result) { console.log(`Отправление: ${posting.result.posting_number}`); console.log(`Статус: ${posting.result.status}`); } ```

**Example:**
```typescript
const result = await client.getPostingByBarcode(/* parameters */);
console.log(result);
```

### `cancelProducts()`

Отменить отправку некоторых товаров в отправлении Cancel products in posting Используйте метод, если вы не можете отправить часть продуктов из отправления. Условно-доставленные отправления отменить нельзя. ```typescript const result = await fbsApi.cancelProducts({ posting_number: '12345-0001-1', products: [ { sku: '123456789', quantity: 1, cancel_reason_id: 402 } ] }); result.result?.forEach(product => { if (product.result) { console.log(`Товар ${product.sku} отменён`); } else { console.log(`Ошибка отмены товара ${product.sku}: ${product.error}`); } }); ```

**Example:**
```typescript
const result = await client.cancelProducts(/* parameters */);
console.log(result);
```

### `changeProducts()`

Добавить вес для весовых товаров в отправлении Change products in posting ```typescript const result = await fbsApi.changeProducts({ posting_number: '12345-0001-1', products: [ { sku: '123456789', quantity: 2, weight: 1.5 } ] }); result.result?.forEach(product => { if (product.result) { console.log(`Товар ${product.sku} изменён`); } else { console.log(`Ошибка изменения товара ${product.sku}: ${product.error}`); } }); ```

**Example:**
```typescript
const result = await client.changeProducts(/* parameters */);
console.log(result);
```

### `getProductCountriesList()`

Список доступных стран-изготовителей Get available product countries list Метод для получения списка доступных стран-изготовителей и их ISO кодов. ```typescript const countries = await fbsApi.getProductCountriesList({}); countries.result?.forEach(country => { console.log(`${country.name} (${country.iso_code})`); }); ```

**Example:**
```typescript
const result = await client.getProductCountriesList(/* parameters */);
console.log(result);
```

### `setProductCountry()`

Добавить информацию о стране-изготовителе товара Set product country information Метод для добавления на продукт атрибута «Страна-изготовитель», если он не был указан. ```typescript const result = await fbsApi.setProductCountry({ posting_number: '12345-0001-1', products: [ { sku: '123456789', country_iso_code: 'RU' } ] }); result.result?.forEach(product => { if (product.result) { console.log(`Страна для товара ${product.sku} установлена`); } else { console.log(`Ошибка установки страны для ${product.sku}: ${product.error}`); } }); ```

**Example:**
```typescript
const result = await client.setProductCountry(/* parameters */);
console.log(result);
```

### `getPostingV3()`

Получить информацию об отправлении по идентификатору (v3) Get posting information by ID (v3) Чтобы получать актуальную дату отгрузки, регулярно обновляйте информацию об отправлениях или подключите push-уведомления. ```typescript const posting = await fbsApi.getPostingV3({ posting_number: '12345-0001-1', translit: true }); if (posting.result) { console.log(`Отправление: ${posting.result.posting_number}`); console.log(`Статус: ${posting.result.status}`); console.log(`Дата отгрузки: ${posting.result.shipment_date}`); } ```

**Example:**
```typescript
const result = await client.getPostingV3(/* parameters */);
console.log(result);
```

### `getPostingListV3()`

Список отправлений (версия 3) Get postings list (version 3) Возвращает список отправлений за указанный период времени — он должен быть не больше одного года. Можно дополнительно отфильтровать отправления по их статусу. ```typescript const postings = await fbsApi.getPostingListV3({ filter: { since: '2024-01-01T00:00:00Z', to: '2024-01-31T23:59:59Z', status: 'awaiting_deliver' }, limit: 100, offset: 0, dir: 'DESC', with: { analytics_data: true, financial_data: true } }); postings.result?.forEach(posting => { console.log(`${posting.posting_number} - ${posting.status}`); }); if (postings.has_next) { console.log('Есть ещё отправления, увеличьте offset'); } ```

**Example:**
```typescript
const result = await client.getPostingListV3(/* parameters */);
console.log(result);
```

### `getUnfulfilledListV3()`

Список необработанных отправлений (версия 3) Get unfulfilled postings list (version 3) Возвращает список необработанных отправлений за указанный период времени. Период должен быть не больше одного года. ```typescript const unfulfilledPostings = await fbsApi.getUnfulfilledListV3({ filter: { since: '2024-01-01T00:00:00Z', to: '2024-01-31T23:59:59Z' }, limit: 50 }); unfulfilledPostings.result?.forEach(posting => { console.log(`Необработанное отправление: ${posting.posting_number}`); console.log(`Статус: ${posting.status}`); console.log(`Дата создания: ${posting.created_at}`); }); ```

**Example:**
```typescript
const result = await client.getUnfulfilledListV3(/* parameters */);
console.log(result);
```

### `setMultiBoxQtyV3()`

Указать количество коробок для многокоробочных отправлений Set multi-box quantity for postings Метод для передачи количества коробок для отправлений, в которых есть многокоробочные товары. Используйте метод при работе по схеме rFBS Агрегатор — c доставкой партнёрами Ozon. ```typescript const result = await fbsApi.setMultiBoxQtyV3({ posting_number: '12345-0001-1', multi_box_qty: 3 }); if (result.result) { console.log('Количество коробок установлено'); } ```

**Example:**
```typescript
const result = await client.setMultiBoxQtyV3(/* parameters */);
console.log(result);
```

### `getEtgb()`

Таможенные декларации ETGB Get ETGB customs declarations Метод для получения таможенных деклараций Elektronik Ticaret Gümrük Beyannamesi (ETGB) для продавцов из Турции. ```typescript const declarations = await fbsApi.getEtgb({ posting_number: ['12345-0001-1', '12345-0002-1'], doc_type: 'ETGB' }); declarations.result?.forEach(declaration => { console.log(`Декларация для ${declaration.posting_number}: ${declaration.document_url}`); }); ```

**Example:**
```typescript
const result = await client.getEtgb(/* parameters */);
console.log(result);
```

### `getUnpaidLegalProductList()`

Список неоплаченных товаров, заказанных юридическими лицами Get unpaid legal products list ```typescript const unpaidProducts = await fbsApi.getUnpaidLegalProductList({ limit: 100, offset: 0 }); unpaidProducts.result?.forEach(product => { console.log(`Неоплаченный товар: ${product.name} (${product.sku})`); console.log(`Отправление: ${product.posting_number}, Цена: ${product.price}`); }); ```

**Example:**
```typescript
const result = await client.getUnpaidLegalProductList(/* parameters */);
console.log(result);
```

## Type Definitions

The Fbs API uses strongly typed TypeScript interfaces for all requests and responses. Import the necessary types from the SDK:

```typescript
import type {
  // Request types
  Fbs*Request
} from '@ozon/seller-api';

import type {
  // Response types  
  Fbs*Response
} from '@ozon/seller-api';
```

## Error Handling

```typescript
try {
  const result = await client.fbs.getCancelReasons(/* parameters */);
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