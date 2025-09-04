# PricesStocks API

Prices&StocksAPI implementation

## Overview

The PricesStocksApi class provides 9 methods for prices&stocksapi implementation.

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
const result = await client.prices-stocks.getActionTimerStatus(/* parameters */);
```

## Methods Reference

### `getActionTimerStatus()`

Prices&StocksAPI implementation Price and inventory management / import { HttpClient } from "../../core/http.js"; import type { RequestOptions } from "../../core/types.js"; import type { EmptyResponse } from "../../types/common/base.js"; import type { PricesStocksActionTimerStatusRequest, PricesStocksActionTimerUpdateRequest, PricesStocksImportPricesRequest, PricesStocksGetDiscountedInfoRequest, PricesStocksGetStocksByWarehouseFbsRequest, PricesStocksUpdateDiscountRequest, PricesStocksUpdateStocksRequest, PricesStocksGetStocksRequest, PricesStocksGetPricesRequest, } from "../../types/requests/prices-stocks.js"; import type { PricesStocksActionTimerStatusResponse, PricesStocksImportPricesResponse, PricesStocksGetDiscountedInfoResponse, PricesStocksGetStocksByWarehouseFbsResponse, PricesStocksUpdateDiscountResponse, PricesStocksUpdateStocksResponse, PricesStocksGetStocksResponse, PricesStocksGetPricesResponse, } from "../../types/responses/prices-stocks.js"; /** Prices&StocksAPI для управления ценами и остатками товаров Prices&StocksAPI for price and inventory management ```typescript // Обновить цены товаров const priceUpdate = await pricesStocksApi.updatePrices({ prices: [{ offer_id: 'ITEM001', price: '1000', old_price: '1200', currency_code: 'RUB' }] }); // Обновить остатки товаров const stockUpdate = await pricesStocksApi.updateStocks({ stocks: [{ offer_id: 'ITEM001', stock: 50, warehouse_id: 12345 }] }); // Получить информацию о ценах const prices = await pricesStocksApi.getPrices({ filter: { offer_id: ['ITEM001', 'ITEM002'] }, limit: 100 }); ``` / export class PricesStocksApi { constructor(private readonly httpClient: HttpClient) {} /** Получить статус установленного таймера Get action timer status Получает статус таймера актуальности минимальной цены для товаров. ```typescript const timerStatus = await pricesStocksApi.getActionTimerStatus({ product_ids: ['123456', '789012'] }); timerStatus.statuses?.forEach(status => { console.log(`Товар ${status.product_id}: таймер ${status.is_timer_enabled ? 'включен' : 'выключен'}`); }); ```

**Example:**
```typescript
const result = await client.getActionTimerStatus(/* parameters */);
console.log(result);
```

### `updateActionTimer()`

Обновление таймера актуальности минимальной цены Update action timer Обновляет таймер актуальности минимальной цены для товаров. ```typescript await pricesStocksApi.updateActionTimer({ product_ids: ['123456', '789012'] }); console.log('Таймер обновлён'); ```

**Example:**
```typescript
const result = await client.updateActionTimer(/* parameters */);
console.log(result);
```

### `updatePrices()`

Обновить цену товаров Update product prices Позволяет изменить цену одного или нескольких товаров. Цену каждого товара можно обновлять не больше 10 раз в час. Чтобы сбросить old_price, поставьте 0 у этого параметра. ```typescript const result = await pricesStocksApi.updatePrices({ prices: [{ offer_id: 'ITEM001', price: '1500', old_price: '2000', premium_price: '1400', currency_code: 'RUB' }, { product_id: 123456, price: '999', currency_code: 'RUB' }] }); result.result?.forEach(item => { if (item.updated) { console.log(`Цена товара ${item.offer_id || item.product_id} обновлена`); } else { console.log(`Ошибки: ${item.errors?.join(', ')}`); } }); ```

**Example:**
```typescript
const result = await client.updatePrices(/* parameters */);
console.log(result);
```

### `getDiscountedProductInfo()`

Узнать информацию об уценке и основном товаре по SKU уценённого товара Get discounted product information Метод для получения информации о состоянии и дефектах уценённого товара по его SKU. Работает только с уценёнными товарами по схеме FBO. Также метод возвращает SKU основного товара. ```typescript const discountedInfo = await pricesStocksApi.getDiscountedProductInfo({ discounted_skus: ['987654321', '123456789'] }); discountedInfo.items?.forEach(item => { console.log(`Уценённый SKU: ${item.discounted_sku}, основной SKU: ${item.original_sku}`); console.log(`Состояние: ${item.condition}, скидка: ${item.discount_percentage}%`); }); ```

**Example:**
```typescript
const result = await client.getDiscountedProductInfo(/* parameters */);
console.log(result);
```

### `getStocksByWarehouseFbs()`

Информация об остатках на складах продавца (FBS и rFBS) Get FBS warehouse stocks information Получает информацию об остатках товаров на складах продавца по схемам FBS и rFBS. ```typescript const stockInfo = await pricesStocksApi.getStocksByWarehouseFbs({ sku: ['123456789', '987654321'] }); stockInfo.result?.forEach(product => { console.log(`SKU: ${product.sku}`); product.stocks?.forEach(stock => { console.log(`  Склад ${stock.warehouse_name}: ${stock.present} в наличии, ${stock.reserved} зарезервировано`); }); }); ```

**Example:**
```typescript
const result = await client.getStocksByWarehouseFbs(/* parameters */);
console.log(result);
```

### `updateDiscountedProductDiscount()`

Установить скидку на уценённый товар Update discounted product discount Метод для установки размера скидки на уценённые товары, продающиеся по схеме FBS. ```typescript const result = await pricesStocksApi.updateDiscountedProductDiscount({ product_id: 123456, discount: 25 }); if (result.result) { console.log('Скидка успешно установлена'); } else { console.log('Ошибка при установке скидки'); } ```

**Example:**
```typescript
const result = await client.updateDiscountedProductDiscount(/* parameters */);
console.log(result);
```

### `updateStocks()`

Обновить количество товаров на складах Update product stocks Позволяет изменить информацию о количестве товара в наличии. За один запрос можно изменить наличие для 100 пар товар-склад. С одного аккаунта продавца можно отправить до 80 запросов в минуту. ```typescript const result = await pricesStocksApi.updateStocks({ stocks: [{ offer_id: 'ITEM001', stock: 100, warehouse_id: 12345 }, { product_id: 987654, stock: 50, warehouse_id: 67890 }] }); result.result?.forEach(item => { if (item.updated) { console.log(`Остатки товара ${item.offer_id || item.product_id} обновлены`); } else { console.log(`Ошибки: ${item.errors?.join(', ')}`); } }); ```

**Example:**
```typescript
const result = await client.updateStocks(/* parameters */);
console.log(result);
```

### `getStocks()`

Информация о количестве товаров Get product stocks information Возвращает информацию о количестве товаров по схемам FBS и rFBS: сколько единиц есть в наличии, сколько зарезервировано покупателями. ```typescript const stocks = await pricesStocksApi.getStocks({ filter: { offer_id: ['ITEM001', 'ITEM002'], visibility: 'VISIBLE' }, limit: 100 }); stocks.items?.forEach(item => { console.log(`Товар ${item.offer_id} (SKU: ${item.sku})`); item.stocks?.forEach(stock => { console.log(`  Склад ${stock.warehouse_id}: ${stock.present} в наличии`); }); }); ```

**Example:**
```typescript
const result = await client.getStocks(/* parameters */);
console.log(result);
```

### `getPrices()`

Получить информацию о цене товара Get product price information Возвращает информацию о ценах товаров. ```typescript const prices = await pricesStocksApi.getPrices({ filter: { offer_id: ['ITEM001', 'ITEM002'], visibility: 'VISIBLE' }, limit: 100 }); prices.items?.forEach(item => { console.log(`Товар ${item.offer_id}: цена ${item.price} ${item.currency_code}`); if (item.old_price) { console.log(`  Старая цена: ${item.old_price}`); } if (item.premium_price) { console.log(`  Premium цена: ${item.premium_price}`); } }); ```

**Example:**
```typescript
const result = await client.getPrices(/* parameters */);
console.log(result);
```

## Type Definitions

The PricesStocks API uses strongly typed TypeScript interfaces for all requests and responses. Import the necessary types from the SDK:

```typescript
import type {
  // Request types
  Prices-stocks*Request
} from '@ozon/seller-api';

import type {
  // Response types  
  Prices-stocks*Response
} from '@ozon/seller-api';
```

## Error Handling

```typescript
try {
  const result = await client.prices-stocks.getActionTimerStatus(/* parameters */);
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