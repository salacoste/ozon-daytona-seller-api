# Finance API

Finance API implementation

## Overview

The FinanceApi class provides 10 methods for finance api implementation.

## Core Features

- **Transaction Management** - Financial operations and payments
- **Balance Tracking** - Account balance and transaction history
- **Financial Reporting** - Revenue and expense analysis

## Quick Start

```typescript
import { OzonSellerApiClient, createApiKey, createClientId } from '@ozon/seller-api';

const client = new OzonSellerApiClient({
  apiKey: createApiKey('your-api-key'),
  clientId: createClientId('your-client-id')
});

// Example usage
const result = await client.finance.createCompensationReport(/* parameters */);
```

## Methods Reference

### `createCompensationReport()`

Finance API implementation Manually implemented for comprehensive financial reporting / import { HttpClient } from '../../core/http.js'; import type { RequestOptions } from '../../core/types.js'; import type { GetCompensationReportRequest, GetDecompensationReportRequest, CreateDocumentB2BSalesReportRequest, CreateDocumentB2BSalesJSONReportRequest, CreateMutualSettlementReportRequest, GetFinanceProductsBuyoutRequest, GetRealizationReportPostingRequest, GetRealizationReportV2Request, FinanceTransactionListV3Request, FinanceTransactionTotalsV3Request } from '../../types/requests/finance.js'; import type { CreateReportResponse, CommonCreateReportResponse, CreateDocumentB2BSalesJSONReportResponse, GetFinanceProductsBuyoutResponse, GetRealizationReportPostingResponse, GetRealizationReportV2Response, FinanceTransactionListV3Response, FinanceTransactionTotalsV3Response } from '../../types/responses/finance.js'; /** Finance API для работы с финансовыми отчётами и транзакциями Finance API for working with financial reports and transactions ```typescript // Создать отчёт о компенсациях const compensationReport = await financeApi.createCompensationReport({ date: '2024-01', language: 'RU' }); // Получить список транзакций const transactions = await financeApi.getTransactionList({ page: 1, page_size: 100, filter: { date: { from: '2024-01-01', to: '2024-01-31' } } }); ``` / export class FinanceApi { constructor(private readonly httpClient: HttpClient) {} /** Отчёт о компенсациях Compensation report Создаёт отчёт о компенсациях для указанного периода. Отчёт содержит информацию о компенсациях, выплаченных продавцу. ```typescript const report = await financeApi.createCompensationReport({ date: '2024-01', language: 'RU' }); if (report.result?.code === 'SUCCESS') { console.log('Отчёт создан успешно'); } ```

**Example:**
```typescript
const result = await client.createCompensationReport(/* parameters */);
console.log(result);
```

### `createDecompensationReport()`

Отчёт о декомпенсациях Decompensation report Создаёт отчёт о декомпенсациях (возврат компенсаций) для указанного периода.

**Example:**
```typescript
const result = await client.createDecompensationReport(/* parameters */);
console.log(result);
```

### `createDocumentB2BSalesReport()`

Реестр продаж юридическим лицам B2B sales document report Создаёт отчёт с информацией о продажах юридическим лицам.

**Example:**
```typescript
const result = await client.createDocumentB2BSalesReport(/* parameters */);
console.log(result);
```

### `createDocumentB2BSalesJSONReport()`

Реестр продаж юридическим лицам в JSON B2B sales JSON document report Создаёт отчёт о продажах юридическим лицам в формате JSON.

**Example:**
```typescript
const result = await client.createDocumentB2BSalesJSONReport(/* parameters */);
console.log(result);
```

### `createMutualSettlementReport()`

Отчёт о взаиморасчётах Mutual settlement report Создаёт отчёт о взаиморасчётах между продавцом и Ozon.

**Example:**
```typescript
const result = await client.createMutualSettlementReport(/* parameters */);
console.log(result);
```

### `getProductsBuyout()`

Отчёт о выкупленных товарах Product buyout report Получает отчёт о товарах, которые были выкуплены Ozon у продавца за указанный период (максимум 31 день).

**Example:**
```typescript
const result = await client.getProductsBuyout(/* parameters */);
console.log(result);
```

### `getRealizationReportPosting()`

Отчёт о реализации товаров (позаказный) Realization report by posting Получает отчёт о реализации товаров с группировкой по отправлениям.

**Example:**
```typescript
const result = await client.getRealizationReportPosting(/* parameters */);
console.log(result);
```

### `getRealizationReportV2()`

Отчёт о реализации товаров v2 Realization report v2 Получает отчёт о реализации товаров за указанный месяц. Версия 2 API с улучшенным форматом данных.

**Example:**
```typescript
const result = await client.getRealizationReportV2(/* parameters */);
console.log(result);
```

### `getTransactionList()`

Список транзакций v3 Transaction list v3 Получает список финансовых транзакций с фильтрацией и пагинацией. Версия 3 API с расширенными возможностями фильтрации.

**Example:**
```typescript
const result = await client.getTransactionList(/* parameters */);
console.log(result);
```

### `getTransactionTotals()`

Итоги по транзакциям v3 Transaction totals v3 Получает агрегированные данные по транзакциям за период или отправление. Позволяет получить общую сумму и количество операций.

**Example:**
```typescript
const result = await client.getTransactionTotals(/* parameters */);
console.log(result);
```

## Type Definitions

The Finance API uses strongly typed TypeScript interfaces for all requests and responses. Import the necessary types from the SDK:

```typescript
import type {
  // Request types
  Finance*Request
} from '@ozon/seller-api';

import type {
  // Response types  
  Finance*Response
} from '@ozon/seller-api';
```

## Error Handling

```typescript
try {
  const result = await client.finance.createCompensationReport(/* parameters */);
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

- **[Analytics](./analytics.md)** - Analytics operations
- **[Report](./report.md)** - Report operations

---

*This documentation is auto-generated from the TypeScript implementation. For the most up-to-date information, refer to the source code and TypeScript definitions.*