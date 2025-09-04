# QuestionsAnswers API

Questions & Answers API implementation

## Overview

The QuestionsAnswersApi class provides 8 methods for questions & answers api implementation.

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
const result = await client.questions-answers.createAnswer(/* parameters */);
```

## Methods Reference

### `createAnswer()`

Questions & Answers API implementation Generated from MCP documentation: questions-answers--chunk-001.md, questions-answers--chunk-002.md Handles product Q&A management and customer engagement / import { HttpClient } from "../../core/http.js"; import type { RequestOptions } from "../../core/types.js"; import type { QuestionAnswerCreateRequest, QuestionAnswerDeleteRequest, QuestionAnswerListRequest, QuestionChangeStatusRequest, QuestionCountRequest, QuestionInfoRequest, QuestionListRequest, QuestionTopSkuRequest } from "../../types/requests/questions-answers.js"; import type { QuestionAnswerCreateResponse, QuestionAnswerDeleteResponse, QuestionAnswerListResponse, QuestionChangeStatusResponse, QuestionCountResponse, QuestionInfoResponse, QuestionListResponse, QuestionTopSkuResponse } from "../../types/responses/questions-answers.js"; /** Questions & Answers API для управления вопросами и ответами Questions & Answers API for questions and answers management Доступно для продавцов с подпиской Premium Plus. Available for sellers with Premium Plus subscription. ```typescript // Получить список вопросов const questions = await questionsAnswersApi.getQuestionList({ filter: { status: 'NEW' } }); // Ответить на вопрос await questionsAnswersApi.createAnswer({ question_id: 'question-123', sku: 123456789, text: 'Да, товар совместим с указанной моделью.' }); ``` / export class QuestionsAnswersApi { constructor(private readonly httpClient: HttpClient) {} /** Создать ответ на вопрос Create answer to question Позволяет создать ответ продавца на вопрос покупателя о товаре. ```typescript const answer = await questionsAnswersApi.createAnswer({ question_id: 'question-123', sku: 123456789, text: 'Спасибо за вопрос! Да, товар полностью совместим с указанной моделью.' }); console.log(`Ответ создан с ID: ${answer.answer_id}`); ```

**Example:**
```typescript
const result = await client.createAnswer(/* parameters */);
console.log(result);
```

### `deleteAnswer()`

Удалить ответ на вопрос Delete answer to question Позволяет удалить ранее созданный ответ продавца на вопрос. ```typescript const result = await questionsAnswersApi.deleteAnswer({ answer_id: 'answer-456', sku: 123456789 }); if (result.result === 'ok') { console.log('Ответ успешно удален'); } ```

**Example:**
```typescript
const result = await client.deleteAnswer(/* parameters */);
console.log(result);
```

### `getAnswerList()`

Получить список ответов на вопрос Get list of answers to question Возвращает все ответы на конкретный вопрос с возможностью пагинации. ```typescript const answers = await questionsAnswersApi.getAnswerList({ question_id: 'question-123', sku: 123456789 }); answers.answers?.forEach(answer => { console.log(`${answer.author_name}: ${answer.text}`); }); // Пагинация if (answers.last_id) { const nextPage = await questionsAnswersApi.getAnswerList({ question_id: 'question-123', sku: 123456789, last_id: answers.last_id }); } ```

**Example:**
```typescript
const result = await client.getAnswerList(/* parameters */);
console.log(result);
```

### `changeQuestionStatus()`

Изменить статус вопросов Change questions status Позволяет массово изменить статус нескольких вопросов. ```typescript const result = await questionsAnswersApi.changeQuestionStatus({ question_ids: ['question-1', 'question-2', 'question-3'], status: 'PROCESSED' }); if (result.result === 'ok') { console.log('Статус вопросов успешно изменен'); } ```

**Example:**
```typescript
const result = await client.changeQuestionStatus(/* parameters */);
console.log(result);
```

### `getQuestionCount()`

Получить количество вопросов по статусам Get questions count by status Возвращает статистику по количеству вопросов в различных статусах. ```typescript const counts = await questionsAnswersApi.getQuestionCount(); console.log(`Всего вопросов: ${counts.all}`); console.log(`Новых: ${counts.new}`); console.log(`Обработанных: ${counts.processed}`); console.log(`Необработанных: ${counts.unprocessed}`); console.log(`Просмотренных: ${counts.viewed}`); ```

**Example:**
```typescript
const result = await client.getQuestionCount(/* parameters */);
console.log(result);
```

### `getQuestionInfo()`

Получить информацию о вопросе Get question information Возвращает подробную информацию о конкретном вопросе. ```typescript const question = await questionsAnswersApi.getQuestionInfo({ question_id: 'question-123' }); console.log(`Вопрос: ${question.text}`); console.log(`Автор: ${question.author_name}`); console.log(`Статус: ${question.status}`); console.log(`Ответов: ${question.answers_count}`); ```

**Example:**
```typescript
const result = await client.getQuestionInfo(/* parameters */);
console.log(result);
```

### `getQuestionList()`

Получить список вопросов Get questions list Возвращает список вопросов с возможностью фильтрации по статусу и дате. ```typescript const questions = await questionsAnswersApi.getQuestionList({ filter: { status: 'NEW', date_from: '2024-01-01T00:00:00Z', date_to: '2024-01-31T23:59:59Z' } }); questions.questions?.forEach(question => { console.log(`${question.status}: ${question.text.substring(0, 100)}...`); console.log(`Ответов: ${question.answers_count}`); }); // Пагинация if (questions.last_id) { const nextPage = await questionsAnswersApi.getQuestionList({ filter: { status: 'NEW' }, last_id: questions.last_id }); } ```

**Example:**
```typescript
const result = await client.getQuestionList(/* parameters */);
console.log(result);
```

### `getTopQuestionedProducts()`

Получить товары с наибольшим количеством вопросов Get products with most questions Возвращает список SKU товаров, которые получили наибольшее количество вопросов. ```typescript const topProducts = await questionsAnswersApi.getTopQuestionedProducts({ limit: 10 }); console.log('Товары с наибольшим количеством вопросов:'); topProducts.sku?.forEach((sku, index) => { console.log(`${index + 1}. SKU: ${sku}`); }); ```

**Example:**
```typescript
const result = await client.getTopQuestionedProducts(/* parameters */);
console.log(result);
```

## Type Definitions

The QuestionsAnswers API uses strongly typed TypeScript interfaces for all requests and responses. Import the necessary types from the SDK:

```typescript
import type {
  // Request types
  Questions-answers*Request
} from '@ozon/seller-api';

import type {
  // Response types  
  Questions-answers*Response
} from '@ozon/seller-api';
```

## Error Handling

```typescript
try {
  const result = await client.questions-answers.createAnswer(/* parameters */);
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