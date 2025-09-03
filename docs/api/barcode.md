# Barcode API

BarcodeAPI implementation

## Overview

The BarcodeApi class provides 2 methods for barcodeapi implementation.

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
const result = await client.barcode.addBarcodes(/* parameters */);
```

## Methods Reference

### `addBarcodes()`

BarcodeAPI implementation Barcode generation and management / import { HttpClient } from '../../core/http.js'; import type { RequestOptions } from '../../core/types.js'; import type { BarcodeAddRequest, BarcodeGenerateRequest } from '../../types/requests/barcode.js'; import type { BarcodeAddResponse, BarcodeGenerateResponse } from '../../types/responses/barcode.js'; /** BarcodeAPI для управления штрихкодами товаров BarcodeAPI for product barcode management ⚡ Лимиты: максимум 20 запросов в минуту, 100 товаров за запрос ⚡ Limits: maximum 20 requests per minute, 100 products per request ```typescript // Создать штрихкоды для новых товаров const generateResult = await barcodeApi.generateBarcodes({ product_ids: ['123456789', '987654321'] }); // Привязать существующие штрихкоды к товарам const addResult = await barcodeApi.addBarcodes({ barcodes: [{ sku: 123456789, barcode: '4600051000057' }, { sku: 987654321, barcode: '4600051000064' }] }); ``` / export class BarcodeApi { constructor(private readonly httpClient: HttpClient) {} /** Привязать штрихкоды к товарам Add barcodes to products Если у товара есть штрихкод, который не указан в системе Ozon, привяжите его с помощью этого метода. За один запрос можно назначить штрихкоды не более чем на 100 товаров. На одном товаре может быть до 100 штрихкодов. ```typescript // Привязать штрихкоды к товарам const addResult = await barcodeApi.addBarcodes({ barcodes: [ { sku: 123456789, barcode: '4600051000057' // EAN-13 штрихкод }, { sku: 987654321, barcode: '123456789012' // UPC-A штрихкод }, { sku: 555666777, barcode: 'CUSTOM_BARCODE_001' // Пользовательский штрихкод } ] }); // Проверить результаты привязки if (addResult.errors && addResult.errors.length > 0) { console.log('Обнаружены ошибки при привязке штрихкодов:'); addResult.errors.forEach(error => { console.log(`SKU ${error.sku}, штрихкод ${error.barcode}:`); console.log(`  Код ошибки: ${error.code}`); console.log(`  Описание: ${error.error}`); }); } else { console.log('Все штрихкоды успешно привязаны!'); } // Пример пакетной обработки штрихкодов const addBarcodesInBatches = async (barcodes: BarcodeInfo[]) => { const batchSize = 100; // Максимальный размер батча const results: BarcodeAddResponse[] = []; for (let i = 0; i < barcodes.length; i += batchSize) { const batch = barcodes.slice(i, i + batchSize); try { const result = await barcodeApi.addBarcodes({ barcodes: batch }); results.push(result); console.log(`Обработан батч ${Math.floor(i / batchSize) + 1}/${Math.ceil(barcodes.length / batchSize)}`); // Задержка между запросами для соблюдения лимитов if (i + batchSize < barcodes.length) { await new Promise(resolve => setTimeout(resolve, 3000)); // 3 секунды } } catch (error) { console.error(`Ошибка в батче ${Math.floor(i / batchSize) + 1}:`, error); } } return results; }; ```

**Example:**
```typescript
const result = await client.addBarcodes(/* parameters */);
console.log(result);
```

### `generateBarcodes()`

Создать штрихкоды для товаров Generate barcodes for products Если у товара нет штрихкода, вы можете создать его с помощью этого метода. За один запрос можно создать штрихкоды не более чем для 100 товаров. Ozon автоматически генерирует уникальные штрихкоды для каждого товара. ```typescript // Создать штрихкоды для новых товаров const generateResult = await barcodeApi.generateBarcodes({ product_ids: [ '123456789', '987654321', '555666777', '111222333' ] }); // Проверить результаты создания if (generateResult.errors && generateResult.errors.length > 0) { console.log('Обнаружены ошибки при создании штрихкодов:'); generateResult.errors.forEach(error => { console.log(`Product ID ${error.product_id}:`); console.log(`  Код ошибки: ${error.code}`); console.log(`  Описание: ${error.error}`); if (error.barcode) { console.log(`  Проблемный штрихкод: ${error.barcode}`); } }); } else { console.log('Все штрихкоды успешно созданы!'); } // Функция для создания штрихкодов для всех товаров без штрихкодов const generateBarcodesForAllProducts = async (productIds: string[]) => { const batchSize = 100; const allErrors: BarcodeGenerateError[] = []; let successCount = 0; for (let i = 0; i < productIds.length; i += batchSize) { const batch = productIds.slice(i, i + batchSize); try { const result = await barcodeApi.generateBarcodes({ product_ids: batch }); if (result.errors && result.errors.length > 0) { allErrors.push(...result.errors); successCount += batch.length - result.errors.length; } else { successCount += batch.length; } console.log(`Обработан батч ${Math.floor(i / batchSize) + 1}/${Math.ceil(productIds.length / batchSize)}`); // Задержка между батчами if (i + batchSize < productIds.length) { await new Promise(resolve => setTimeout(resolve, 3000)); } } catch (error) { console.error(`Ошибка в батче ${Math.floor(i / batchSize) + 1}:`, error); } } console.log(`Создано штрихкодов: ${successCount}`); console.log(`Ошибок: ${allErrors.length}`); return { successCount, errors: allErrors }; }; // Пример использования с обработкой rate limiting const generateWithRateLimit = async (productIds: string[]) => { const requestsPerMinute = 20; const delayBetweenRequests = 60000 / requestsPerMinute; // ~3 секунды const batchSize = Math.min(100, productIds.length); for (let i = 0; i < productIds.length; i += batchSize) { const batch = productIds.slice(i, i + batchSize); const result = await barcodeApi.generateBarcodes({ product_ids: batch }); console.log(`Обработано товаров: ${batch.length}`); if (i + batchSize < productIds.length) { console.log(`Ожидание ${delayBetweenRequests}мс перед следующим запросом...`); await new Promise(resolve => setTimeout(resolve, delayBetweenRequests)); } } }; ```

**Example:**
```typescript
const result = await client.generateBarcodes(/* parameters */);
console.log(result);
```

## Type Definitions

The Barcode API uses strongly typed TypeScript interfaces for all requests and responses. Import the necessary types from the SDK:

```typescript
import type {
  // Request types
  Barcode*Request
} from '@ozon/seller-api';

import type {
  // Response types  
  Barcode*Response
} from '@ozon/seller-api';
```

## Error Handling

```typescript
try {
  const result = await client.barcode.addBarcodes(/* parameters */);
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