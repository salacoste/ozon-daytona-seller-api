# BetaMethod API

BetaMethod API implementation

## Overview

The BetaMethodApi class provides 9 methods for betamethod api implementation.

## Core Features

- **Core Operations** - 9 methods for comprehensive functionality
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
const result = await client.beta-method.getAverageDeliveryTime(/* parameters */);
```

## Methods Reference

### `getAverageDeliveryTime()`

BetaMethod API implementation Beta features and experimental APIs / import { HttpClient } from '../../core/http.js'; import type { RequestOptions } from '../../core/types.js'; import type { EmptyRequest } from '../../types/common/base.js'; import type { BetaMethodAverageDeliveryTimeRequest, BetaMethodAverageDeliveryTimeDetailsRequest, BetaMethodManageStocksRequest, BetaMethodAnalyticsStocksRequest, BetaMethodProductInfoWrongVolumeRequest, BetaMethodRemovalReportRequest } from '../../types/requests/beta-method.js'; import type { BetaMethodAverageDeliveryTimeResponse, BetaMethodAverageDeliveryTimeDetailsResponse, BetaMethodAverageDeliveryTimeSummaryResponse, BetaMethodManageStocksResponse, BetaMethodAnalyticsStocksResponse, BetaMethodProductInfoWrongVolumeResponse, BetaMethodRemovalReportResponse, BetaMethodRolesByTokenResponse } from '../../types/responses/beta-method.js'; /** BetaMethod API для бета-функций и экспериментальных возможностей BetaMethod API for beta features and experimental functionality ⚠️ Это экспериментальные методы, которые могут изменяться ⚠️ These are experimental methods that may change ```typescript // Получить аналитику по среднему времени доставки const deliveryAnalytics = await betaMethodApi.getAverageDeliveryTime({ delivery_schema: 'FBO', supply_period: { from: '2024-01-01', to: '2024-01-31' }, sku: ['123456789'] }); // Получить товары с некорректными ОВХ const wrongVolumeProducts = await betaMethodApi.getProductsWithWrongVolume({ limit: 100 }); // Получить роли API-ключа const roles = await betaMethodApi.getRolesByToken(); ``` / export class BetaMethodApi { constructor(private readonly httpClient: HttpClient) {} /** Получить аналитику по среднему времени доставки Get average delivery time analytics Метод позволяет получить аналитику по среднему времени доставки товара до покупателя. Соответствует разделу "Аналитика → География продаж → Среднее время доставки" в личном кабинете. ```typescript const analytics = await betaMethodApi.getAverageDeliveryTime({ delivery_schema: 'FBO', supply_period: { from: '2024-01-01', to: '2024-01-31' }, sku: ['123456789', '987654321'] }); analytics.data?.forEach(cluster => { console.log(`Кластер ${cluster.cluster_name}: ${cluster.average_delivery_time} дней`); console.log(`Заказов: ${cluster.orders_count} (${cluster.orders_share}%)`); }); console.log(`Общее среднее время: ${analytics.total?.average_delivery_time} дней`); ```

**Example:**
```typescript
const result = await client.getAverageDeliveryTime(/* parameters */);
console.log(result);
```

### `getAverageDeliveryTimeDetails()`

Получить детальную аналитику по среднему времени доставки Get detailed average delivery time analytics Метод является аналогом вкладки "Аналитика → География продаж → Среднее время доставки" в личном кабинете продавца с детализацией по товарам и регионам. ```typescript const details = await betaMethodApi.getAverageDeliveryTimeDetails({ cluster_id: 123, limit: 100, offset: 0, filters: { sku: ['123456789'], regions: ['Москва', 'Санкт-Петербург'] } }); details.data?.forEach(item => { console.log(`Товар: ${item.product_name} (SKU: ${item.sku})`); console.log(`Время доставки: ${item.average_delivery_time} дней`); console.log(`Регион: ${item.region}, заказов: ${item.orders_count}`); }); ```

**Example:**
```typescript
const result = await client.getAverageDeliveryTimeDetails(/* parameters */);
console.log(result);
```

### `getAverageDeliveryTimeSummary()`

Получить общую аналитику по среднему времени доставки Get delivery time summary analytics Метод позволяет получить общую аналитику по среднему времени доставки товара до покупателя с рекомендациями и информацией о переплатах. ```typescript const summary = await betaMethodApi.getAverageDeliveryTimeSummary(); console.log(`Текущее среднее время доставки: ${summary.average_delivery_time} дней`); console.log(`Рекомендуемое время: ${summary.perfect_delivery_time} дней`); console.log(`Переплата за логистику: ${summary.lost_profit} руб.`); console.log(`Текущий тариф: ${summary.current_tariff?.name} (${summary.current_tariff?.cost} руб.)`); ```

**Example:**
```typescript
const result = await client.getAverageDeliveryTimeSummary(/* parameters */);
console.log(result);
```

### `getManageStocks()`

Управление остатками (устаревший) Stock management (deprecated) Используйте метод для получения информации об остатках товаров на складах FBO. ```typescript const stocks = await betaMethodApi.getManageStocks({ filter: { sku: ['123456789', '987654321'], status: ['ACTIVE'] }, limit: 100, offset: 0 }); stocks.items?.forEach(item => { console.log(`${item.product_name}: ${item.available_for_sale} доступно`); console.log(`На складе: ${item.warehouse_stock}, зарезервировано: ${item.reserved_quantity}`); }); ```

**Example:**
```typescript
const result = await client.getManageStocks(/* parameters */);
console.log(result);
```

### `getAnalyticsStocks()`

Получить аналитику по остаткам Get stock analytics Используйте метод для получения аналитики по остаткам товаров на складах. Метод соответствует разделу "FBO → Управление остатками" в личном кабинете. Аналитика обновляется раз в день в 07:00 UTC. ```typescript const analytics = await betaMethodApi.getAnalyticsStocks({ skus: ['123456789', '987654321'], turnover_grades: ['DEFICIT', 'POPULAR'], item_tags: ['NOVEL', 'SUPER'], warehouse_ids: ['12345', '67890'] }); analytics.items?.forEach(item => { console.log(`${item.product_name} (SKU: ${item.sku})`); console.log(`Остаток: ${item.warehouse_stock}, статус: ${item.turnover_grade}`); console.log(`Прогноз продаж: ${item.sales_forecast}, тег: ${item.item_tag}`); }); ```

**Example:**
```typescript
const result = await client.getAnalyticsStocks(/* parameters */);
console.log(result);
```

### `getProductsWithWrongVolume()`

Список товаров с некорректными ОВХ Get products with wrong volume characteristics Возвращает список товаров с некорректными объёмно-весовыми характеристиками (ОВХ). Если вы указали размеры правильно, обратитесь в поддержку Ozon. ```typescript const wrongVolumeProducts = await betaMethodApi.getProductsWithWrongVolume({ limit: 50 }); wrongVolumeProducts.products?.forEach(product => { console.log(`Товар: ${product.product_name} (SKU: ${product.sku})`); console.log(`Текущие размеры: ${product.current_volume?.length}x${product.current_volume?.width}x${product.current_volume?.height} см`); console.log(`Рекомендуемые размеры: ${product.recommended_volume?.length}x${product.recommended_volume?.width}x${product.recommended_volume?.height} см`); console.log(`Текущий вес: ${product.current_volume?.weight}г, рекомендуемый: ${product.recommended_volume?.weight}г`); }); // Загрузить следующую страницу if (wrongVolumeProducts.cursor) { const nextPage = await betaMethodApi.getProductsWithWrongVolume({ cursor: wrongVolumeProducts.cursor, limit: 50 }); } ```

**Example:**
```typescript
const result = await client.getProductsWithWrongVolume(/* parameters */);
console.log(result);
```

### `getRemovalFromStockReport()`

Отчёт по вывозу и утилизации со склада FBO FBO stock removal and disposal report Метод соответствует разделу "FBO → Вывоз и утилизация" в личном кабинете. ```typescript const removalReport = await betaMethodApi.getRemovalFromStockReport({ date_from: '2024-01-01', date_to: '2024-01-31', limit: 100 }); removalReport.returns_summary_report_rows?.forEach(row => { console.log(`${row.product_name}: ${row.quantity} шт.`); console.log(`Операция: ${row.operation_type}, дата: ${row.operation_date}`); console.log(`Стоимость: ${row.operation_cost} руб., статус: ${row.status}`); }); ```

**Example:**
```typescript
const result = await client.getRemovalFromStockReport(/* parameters */);
console.log(result);
```

### `getRemovalFromSupplyReport()`

Отчёт по вывозу и утилизации с поставки FBO FBO supply removal and disposal report Метод соответствует разделу "FBO → Вывоз и утилизация" в личном кабинете. ```typescript const supplyRemovalReport = await betaMethodApi.getRemovalFromSupplyReport({ date_from: '2024-01-01', date_to: '2024-01-31', limit: 100 }); supplyRemovalReport.returns_summary_report_rows?.forEach(row => { console.log(`${row.product_name}: ${row.quantity} шт.`); console.log(`Операция: ${row.operation_type}, дата: ${row.operation_date}`); console.log(`Стоимость: ${row.operation_cost} руб., статус: ${row.status}`); }); ```

**Example:**
```typescript
const result = await client.getRemovalFromSupplyReport(/* parameters */);
console.log(result);
```

### `getRolesByToken()`

Получить список ролей и методов по API-ключу Get roles and methods list by API key Метод для получения информации о ролях и методах, привязанных к API-ключу. ```typescript const roles = await betaMethodApi.getRolesByToken(); roles.roles?.forEach(role => { console.log(`Роль: ${role.name}`); console.log(`Описание: ${role.description}`); console.log(`Доступные методы: ${role.methods?.join(', ')}`); }); ```

**Example:**
```typescript
const result = await client.getRolesByToken(/* parameters */);
console.log(result);
```

## Type Definitions

The BetaMethod API uses strongly typed TypeScript interfaces for all requests and responses. Import the necessary types from the SDK:

```typescript
import type {
  // Request types
  Beta-method*Request
} from '@ozon/seller-api';

import type {
  // Response types  
  Beta-method*Response
} from '@ozon/seller-api';
```

## Error Handling

```typescript
try {
  const result = await client.beta-method.getAverageDeliveryTime(/* parameters */);
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