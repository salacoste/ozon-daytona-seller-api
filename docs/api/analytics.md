# Analytics API

Analytics API implementation

## Overview

The AnalyticsApi class provides 2 methods for analytics api implementation.

## Core Features

- **Performance Metrics** - Sales, views, and conversion analytics
- **Inventory Analytics** - Stock levels and turnover analysis
- **Business Intelligence** - Data-driven insights and reporting

## Quick Start

```typescript
import { OzonSellerApiClient, createApiKey, createClientId } from '@ozon/seller-api';

const client = new OzonSellerApiClient({
  apiKey: createApiKey('your-api-key'),
  clientId: createClientId('your-client-id')
});

// Example usage
const result = await client.analytics.getStocksTurnover(/* parameters */);
```

## Methods Reference

### `getStocksTurnover()`

Analytics API implementation Manually implemented for comprehensive business analytics / import { HttpClient } from '../../core/http.js'; import type { RequestOptions } from '../../core/types.js'; import type { AnalyticsTurnoverStocksRequest, AnalyticsStockOnWarehouseRequest } from '../../types/requests/analytics.js'; import type { AnalyticsTurnoverStocksResponse, AnalyticsStockOnWarehouseResponse } from '../../types/responses/analytics.js'; /** Analytics API для бизнес-аналитики и отчетности данных Analytics API for business analytics and data reporting ```typescript // Получить оборачиваемость товаров const turnover = await analyticsApi.getStocksTurnover({ limit: 10, sku: ['123456789', '987654321'] }); // Получить отчёт по остаткам на складах const stockReport = await analyticsApi.getStockOnWarehouses({ limit: 100, warehouse_type: 'ALL' }); ``` / export class AnalyticsApi { constructor(private readonly httpClient: HttpClient) {} /** Оборачиваемость товара Get stock turnover analytics Используйте метод, чтобы узнать оборачиваемость товара и количество дней, на которое хватит текущего остатка. Метод соответствует разделу "FBO -> Управление остатками" в личном кабинете. ```typescript const result = await analyticsApi.getStocksTurnover({ limit: 50, offset: 0, sku: ['123456789'] }); result.items?.forEach(item => { console.log(`SKU: ${item.sku}, Оборачиваемость: ${item.turnover_days} дней`); }); ```

**Example:**
```typescript
const result = await client.getStocksTurnover(/* parameters */);
console.log(result);
```

### `getStockOnWarehouses()`

Отчёт по остаткам и товарам (версия 2) Get stock and products report (version 2) Метод для получения отчёта по остаткам и товарам в перемещении по складам Ozon. ⚠️ В будущем метод будет отключён. Переключитесь на /v1/analytics/stocks. ⚠️ Отличается от отчёта в разделе "Аналитика → Отчёты → Отчёт по остаткам и товарам в пути на склады Ozon" в личном кабинете. ```typescript const report = await analyticsApi.getStockOnWarehouses({ limit: 100, offset: 0, warehouse_type: 'FULFILLMENT' }); report.result?.rows?.forEach(row => { console.log(`${row.name}: остаток ${row.present}, в пути ${row.reserved}`); }); ```

**Example:**
```typescript
const result = await client.getStockOnWarehouses(/* parameters */);
console.log(result);
```

## Type Definitions

The Analytics API uses strongly typed TypeScript interfaces for all requests and responses. Import the necessary types from the SDK:

```typescript
import type {
  // Request types
  Analytics*Request
} from '@ozon/seller-api';

import type {
  // Response types  
  Analytics*Response
} from '@ozon/seller-api';
```

## Error Handling

```typescript
try {
  const result = await client.analytics.getStocksTurnover(/* parameters */);
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
- **[Finance](./finance.md)** - Finance operations
- **[Report](./report.md)** - Report operations

---

*This documentation is auto-generated from the TypeScript implementation. For the most up-to-date information, refer to the source code and TypeScript definitions.*