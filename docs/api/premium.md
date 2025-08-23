# Premium API

Premium API implementation

## Overview

The PremiumApi class provides 8 methods for premium api implementation.

## Core Features

- **Core Operations** - 8 methods for comprehensive functionality
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
const result = await client.premium.getAnalyticsData(/* parameters */);
```

## Methods Reference

### `getAnalyticsData()`

Premium API implementation Premium seller features and scoring / import { HttpClient } from '../../core/http.js'; import type { RequestOptions } from '../../core/types.js'; import type { PremiumAnalyticsGetDataRequest, PremiumProductQueriesRequest, PremiumProductQueriesDetailsRequest, PremiumChatSendMessageRequest, PremiumChatStartRequest, PremiumRealizationByDayRequest, PremiumChatReadRequest, PremiumChatHistoryRequest } from '../../types/requests/premium.js'; import type { PremiumAnalyticsGetDataResponse, PremiumProductQueriesResponse, PremiumProductQueriesDetailsResponse, PremiumChatSendMessageResponse, PremiumChatStartResponse, PremiumRealizationByDayResponse, PremiumChatReadResponse, PremiumChatHistoryResponse } from '../../types/responses/premium.js'; /** Premium API для премиальных функций продавца и скоринга Premium API for premium seller features and scoring ⚠️ Большинство методов требуют подписку Premium или Premium Plus ⚠️ Most methods require Premium or Premium Plus subscription ```typescript // Получить данные аналитики (Premium Plus) const analyticsData = await premiumApi.getAnalyticsData({ date_from: '2024-01-01', date_to: '2024-01-31', dimension: ['sku', 'day'], metrics: ['revenue', 'ordered_units'], limit: 100 }); // Получить запросы товаров (Premium/Premium Plus) const productQueries = await premiumApi.getProductQueries({ date_from: '2024-01-01', skus: ['123456789'], page_size: 50 }); // Отправить сообщение в чат (Premium Plus) const messageResult = await premiumApi.sendChatMessage({ chat_id: 'chat_123', text: 'Здравствуйте! Есть вопросы по заказу?' }); ``` / export class PremiumApi { constructor(private readonly httpClient: HttpClient) {} /** Данные аналитики (Premium Plus) Get analytics data (Premium Plus) Укажите период и метрики, которые нужно посчитать. В ответе будет аналитика, сгруппированная по параметру dimensions. Для продавцов с подпиской Premium Plus ограничений нет. Метод можно использовать не больше 1 раза в минуту. Соответствует разделу "Аналитика → Графики" в личном кабинете. ```typescript const analytics = await premiumApi.getAnalyticsData({ date_from: '2024-01-01', date_to: '2024-01-31', dimension: ['sku', 'week'], metrics: ['revenue', 'hits_view', 'conv_tocart'], limit: 500, filters: [{ field: 'category1', values: ['Electronics'] }] }); analytics.result?.data?.forEach(item => { console.log(`SKU: ${item.dimensions?.sku}, Выручка: ${item.metrics?.revenue}`); }); ```

**Example:**
```typescript
const result = await client.getAnalyticsData(/* parameters */);
console.log(result);
```

### `getProductQueries()`

Получить информацию о запросах товаров (Premium/Premium Plus) Get product queries information (Premium/Premium Plus) Используйте метод для получения данных о запросах ваших товаров. Полная аналитика доступна с подпиской Premium или Premium Plus. Метод аналогичен вкладке "Товары в поиске → Запросы моего товара" в личном кабинете. ```typescript const queries = await premiumApi.getProductQueries({ date_from: '2024-01-01', date_to: '2024-01-31', skus: ['123456789', '987654321'], page_size: 50, sort_by: 'queries_count', sort_dir: 'DESC' }); queries.items?.forEach(item => { console.log(`SKU: ${item.sku}, Запросов: ${item.queries_count}, CTR: ${item.ctr}%`); }); ```

**Example:**
```typescript
const result = await client.getProductQueries(/* parameters */);
console.log(result);
```

### `getProductQueriesDetails()`

Получить детализацию запросов по товару (Premium/Premium Plus) Get product query details (Premium/Premium Plus) Используйте метод для получения данных по запросам на конкретный товар. Полная аналитика доступна с подпиской Premium или Premium Plus. Метод аналогичен просмотру данных по товару на вкладке "Товары в поиске → Запросы моего товара". ```typescript const details = await premiumApi.getProductQueriesDetails({ date_from: '2024-01-01', date_to: '2024-01-31', skus: ['123456789'], limit_by_sku: 10, page_size: 100, sort_by: 'clicks', sort_dir: 'DESC' }); details.queries?.forEach(query => { console.log(`"${query.query}": ${query.clicks} кликов, позиция ${query.position}`); }); ```

**Example:**
```typescript
const result = await client.getProductQueriesDetails(/* parameters */);
console.log(result);
```

### `sendChatMessage()`

Отправить сообщение в чат (Premium Plus) Send chat message (Premium Plus) Отправляет сообщение в существующий чат по его идентификатору. Доступно для продавцов с подпиской Premium Plus. ```typescript const result = await premiumApi.sendChatMessage({ chat_id: 'chat_123456', text: 'Здравствуйте! Ваш заказ готов к отправке. Есть вопросы?' }); console.log(`Результат отправки: ${result.result}`); ```

**Example:**
```typescript
const result = await client.sendChatMessage(/* parameters */);
console.log(result);
```

### `startChat()`

Создать новый чат (Premium Plus) Create new chat (Premium Plus) Создает новый чат с покупателем по отправлению. Например, чтобы уточнить адрес или модель товара. Доступно для продавцов с подпиской Premium Plus. ```typescript const chat = await premiumApi.startChat({ posting_number: '12345-0001-1' }); console.log(`Чат создан: ${chat.result?.chat_id}`); ```

**Example:**
```typescript
const result = await client.startChat(/* parameters */);
console.log(result);
```

### `getRealizationByDay()`

Отчёт о реализации товаров за день (Premium Plus) Daily product realization report (Premium Plus) Возвращает данные о суммах реализации из отчёта о реализации товаров за день. Отмены и невыкупы не включаются. Данные доступны не более чем за 32 календарных дня. Доступно для продавцов с подпиской Premium Plus. ```typescript const report = await premiumApi.getRealizationByDay({ day: 15, month: 1, year: 2024 }); report.rows?.forEach(row => { console.log(`${row.name}: ${row.quantity} шт., ${row.amount} ${row.currency}`); }); ```

**Example:**
```typescript
const result = await client.getRealizationByDay(/* parameters */);
console.log(result);
```

### `markChatAsRead()`

Отметить сообщения как прочитанные (Premium Plus) Mark messages as read (Premium Plus) Метод для отметки выбранного сообщения и сообщений до него прочитанными. Доступно для продавцов с подпиской Premium Plus. ```typescript const result = await premiumApi.markChatAsRead({ chat_id: 'chat_123456', message_id: 'msg_789012' }); console.log(`Результат: ${result.result}`); ```

**Example:**
```typescript
const result = await client.markChatAsRead(/* parameters */);
console.log(result);
```

### `getChatHistory()`

История чата (Premium Plus) Chat history (Premium Plus) Возвращает историю сообщений чата. По умолчанию от самого нового сообщения к старым. Доступно для продавцов с подпиской Premium Plus. ```typescript const history = await premiumApi.getChatHistory({ chat_id: 'chat_123456', limit: 50 }); history.messages?.forEach(message => { console.log(`${message.author}: ${message.text} (${message.created_at})`); }); ```

**Example:**
```typescript
const result = await client.getChatHistory(/* parameters */);
console.log(result);
```

## Type Definitions

The Premium API uses strongly typed TypeScript interfaces for all requests and responses. Import the necessary types from the SDK:

```typescript
import type {
  // Request types
  Premium*Request
} from '@ozon/seller-api';

import type {
  // Response types  
  Premium*Response
} from '@ozon/seller-api';
```

## Error Handling

```typescript
try {
  const result = await client.premium.getAnalyticsData(/* parameters */);
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