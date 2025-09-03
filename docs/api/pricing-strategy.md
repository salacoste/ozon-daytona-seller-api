# PricingStrategy API

Pricing Strategy API implementation

## Overview

The PricingStrategyApi class provides 12 methods for pricing strategy api implementation.

## Core Features

- **Core Operations** - 12 methods for comprehensive functionality
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
const result = await client.pricing-strategy.getCompetitors(/* parameters */);
```

## Methods Reference

### `getCompetitors()`

Pricing Strategy API implementation Manually implemented for comprehensive pricing strategy management / import { HttpClient } from '../../core/http.js'; import type { RequestOptions } from '../../core/types.js'; import type { GetCompetitorsRequest, CreatePricingStrategyRequest, DeletePricingStrategyRequest, GetStrategyInfoRequest, GetStrategyListRequest, GetStrategyItemInfoRequest, AddStrategyItemsRequest, DeleteStrategyItemsRequest, GetStrategyItemsRequest, UpdateStatusStrategyRequest, GetStrategyIDsByItemIDsRequest, UpdatePricingStrategyRequest } from '../../types/requests/pricing-strategy.js'; import type { GetCompetitorsResponse, CreatePricingStrategyResponse, EmptyResponse, GetStrategyResponse, GetStrategyListResponse, GetStrategyItemInfoResponse, AddStrategyItemsResponse, DeleteStrategyItemsResponse, GetStrategyItemsResponse, GetStrategyIDsByItemIDsResponse } from '../../types/responses/pricing-strategy.js'; /** Pricing Strategy API для динамических стратегий ценообразования и оптимизации Pricing Strategy API for dynamic pricing strategies and optimization ```typescript // Создать новую стратегию ценообразования const strategy = await pricingApi.createStrategy({ name: 'Конкурентная стратегия', description: 'Автоматическое ценообразование на основе цен конкурентов', strategy_type: 'COMPETITIVE' }); // Добавить товары в стратегию await pricingApi.addItemsToStrategy({ strategy_id: strategy.result.strategy_id, items: [{ sku: '123456789' }, { sku: '987654321' }] }); // Получить список конкурентов const competitors = await pricingApi.getCompetitors({ sku: ['123456789'], limit: 10 }); ``` / export class PricingStrategyApi { constructor(private readonly httpClient: HttpClient) {} /** Список конкурентов Get competitors list Метод для получения списка конкурентов — продавцов с похожими товарами в других интернет-магазинах и маркетплейсах. ```typescript const competitors = await pricingApi.getCompetitors({ sku: ['123456789', '987654321'], limit: 20 }); competitors.competitors?.forEach(competitor => { console.log(`${competitor.name}: ${competitor.price} ${competitor.currency}`); }); ```

**Example:**
```typescript
const result = await client.getCompetitors(/* parameters */);
console.log(result);
```

### `createStrategy()`

Создать стратегию Create pricing strategy Создание новой стратегии ценообразования с указанными параметрами. ```typescript const strategy = await pricingApi.createStrategy({ name: 'Премиум стратегия', description: 'Стратегия для товаров премиум сегмента', strategy_type: 'PREMIUM_PRICING', settings: { margin_min: 0.15, margin_max: 0.35, update_frequency: 'daily' } }); ```

**Example:**
```typescript
const result = await client.createStrategy(/* parameters */);
console.log(result);
```

### `deleteStrategy()`

Удалить стратегию Delete pricing strategy Можно удалить любую стратегию кроме системной.

**Example:**
```typescript
const result = await client.deleteStrategy(/* parameters */);
console.log(result);
```

### `getStrategyInfo()`

Информация о стратегии Get strategy information Получение подробной информации о конкретной стратегии ценообразования.

**Example:**
```typescript
const result = await client.getStrategyInfo(/* parameters */);
console.log(result);
```

### `getStrategiesList()`

Список стратегий Get strategies list Получение списка всех доступных стратегий ценообразования. ```typescript const strategies = await pricingApi.getStrategiesList({ limit: 50, offset: 0 }); strategies.strategies?.forEach(strategy => { console.log(`${strategy.name} (${strategy.status}): ${strategy.description}`); }); ```

**Example:**
```typescript
const result = await client.getStrategiesList(/* parameters */);
console.log(result);
```

### `getStrategyItemInfo()`

Цена товара у конкурента Get product competitor price Если вы добавили товар в стратегию ценообразования, метод вернёт цену и ссылку на товар у конкурента.

**Example:**
```typescript
const result = await client.getStrategyItemInfo(/* parameters */);
console.log(result);
```

### `addItemsToStrategy()`

Добавить товары в стратегию Add products to strategy Добавление товаров в существующую стратегию ценообразования. ```typescript const result = await pricingApi.addItemsToStrategy({ strategy_id: 'strategy_123', items: [ { sku: '123456789', settings: { min_price: 1000 } }, { sku: '987654321', settings: { min_price: 500 } } ] }); ```

**Example:**
```typescript
const result = await client.addItemsToStrategy(/* parameters */);
console.log(result);
```

### `removeItemsFromStrategy()`

Удалить товары из стратегии Remove products from strategy Удаление товаров из существующей стратегии ценообразования.

**Example:**
```typescript
const result = await client.removeItemsFromStrategy(/* parameters */);
console.log(result);
```

### `getStrategyItems()`

Список товаров в стратегии Get strategy products list Получение списка всех товаров, включённых в конкретную стратегию.

**Example:**
```typescript
const result = await client.getStrategyItems(/* parameters */);
console.log(result);
```

### `updateStrategyStatus()`

Изменить статус стратегии Update strategy status Можно изменить статус любой стратегии кроме системной.

**Example:**
```typescript
const result = await client.updateStrategyStatus(/* parameters */);
console.log(result);
```

### `getStrategyIDsByItemIDs()`

Список идентификаторов стратегий Get strategy IDs by product IDs Получение списка идентификаторов стратегий, к которым привязаны указанные товары.

**Example:**
```typescript
const result = await client.getStrategyIDsByItemIDs(/* parameters */);
console.log(result);
```

### `updateStrategy()`

Обновить стратегию Update pricing strategy Можно обновить все стратегии кроме системной.

**Example:**
```typescript
const result = await client.updateStrategy(/* parameters */);
console.log(result);
```

## Type Definitions

The PricingStrategy API uses strongly typed TypeScript interfaces for all requests and responses. Import the necessary types from the SDK:

```typescript
import type {
  // Request types
  Pricing-strategy*Request
} from '@ozon/seller-api';

import type {
  // Response types  
  Pricing-strategy*Response
} from '@ozon/seller-api';
```

## Error Handling

```typescript
try {
  const result = await client.pricing-strategy.getCompetitors(/* parameters */);
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