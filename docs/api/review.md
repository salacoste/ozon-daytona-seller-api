# Review API

Review API implementation

## Overview

The ReviewApi class provides 7 methods for review api implementation.

## Core Features

- **Core Operations** - 7 methods for comprehensive functionality
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
const result = await client.review.changeStatus(/* parameters */);
```

## Methods Reference

### `changeStatus()`

Review API implementation Generated from MCP documentation: reviewapi--chunk-001.md, reviewapi--chunk-002.md Handles customer review management and seller responses / import { HttpClient } from "../../core/http.js"; import type { RequestOptions } from "../../core/types.js"; import type { ReviewChangeStatusRequest, CommentCreateRequest, CommentDeleteRequest, CommentListRequest, ReviewCountRequest, ReviewInfoRequest, ReviewListRequest } from "../../types/requests/review.js"; import type { ReviewChangeStatusResponse, CommentCreateResponse, CommentDeleteResponse, CommentListResponse, ReviewCountResponse, ReviewInfoResponse, ReviewListResponse } from "../../types/responses/review.js"; /** Review API для управления отзывами и комментариями Review API for review and comment management Доступно для продавцов с подпиской Premium Plus. Available for sellers with Premium Plus subscription. ```typescript // Получить список отзывов const reviews = await reviewApi.getList({ limit: 50, status: 'UNPROCESSED' }); // Ответить на отзыв await reviewApi.createComment({ review_id: 'review-123', text: 'Спасибо за отзыв!', mark_review_as_processed: true }); ``` / export class ReviewApi { constructor(private readonly httpClient: HttpClient) {} /** Изменить статус отзывов Change review status Метод позволяет изменить статус отзывов на обработанный или необработанный. ```typescript const result = await reviewApi.changeStatus({ review_ids: ['review-123', 'review-456'], status: 'PROCESSED' }); if (result.result === 'ok') { console.log('Статус отзывов успешно изменен'); } ```

**Example:**
```typescript
const result = await client.changeStatus(/* parameters */);
console.log(result);
```

### `createComment()`

Оставить комментарий на отзыв Create comment on review Метод позволяет оставить комментарий продавца на отзыв покупателя. ```typescript const comment = await reviewApi.createComment({ review_id: 'review-123', text: 'Спасибо за ваш отзыв! Мы учтем ваши замечания.', mark_review_as_processed: true }); console.log(`Комментарий создан с ID: ${comment.comment_id}`); ```

**Example:**
```typescript
const result = await client.createComment(/* parameters */);
console.log(result);
```

### `deleteComment()`

Удалить комментарий на отзыв Delete comment on review Метод позволяет удалить ранее оставленный комментарий продавца. ```typescript const result = await reviewApi.deleteComment({ comment_id: 'comment-123' }); if (result.result === 'ok') { console.log('Комментарий успешно удален'); } ```

**Example:**
```typescript
const result = await client.deleteComment(/* parameters */);
console.log(result);
```

### `getCommentList()`

Получить список комментариев на отзыв Get list of comments on review Метод возвращает информацию по комментариям на отзывы, которые прошли модерацию. ```typescript const comments = await reviewApi.getCommentList({ review_id: 'review-123', limit: 50, sort_dir: 'DESC' }); comments.comments?.forEach(comment => { console.log(`${comment.is_owner ? 'Продавец' : 'Покупатель'}: ${comment.text}`); }); ```

**Example:**
```typescript
const result = await client.getCommentList(/* parameters */);
console.log(result);
```

### `getCount()`

Получить количество отзывов по статусам Get review count by status Метод возвращает количество отзывов по различным статусам обработки. ```typescript const counts = await reviewApi.getCount(); console.log(`Всего отзывов: ${counts.total}`); console.log(`Обработанных: ${counts.processed}`); console.log(`Необработанных: ${counts.unprocessed}`); ```

**Example:**
```typescript
const result = await client.getCount(/* parameters */);
console.log(result);
```

### `getInfo()`

Получить информацию об отзыве Get review information Метод возвращает подробную информацию об отзыве, включая фото и видео. ```typescript const review = await reviewApi.getInfo({ review_id: 'review-123' }); console.log(`Отзыв: ${review.text}`); console.log(`Рейтинг: ${review.rating}`); console.log(`Фото: ${review.photos_amount}, Видео: ${review.videos_amount}`); ```

**Example:**
```typescript
const result = await client.getInfo(/* parameters */);
console.log(result);
```

### `getList()`

Получить список отзывов Get review list Метод возвращает список отзывов с возможностью фильтрации по статусу и пагинацией. Не возвращает параметры «Достоинства» и «Недостатки», если они есть в отзывах. ```typescript const reviews = await reviewApi.getList({ limit: 100, status: 'UNPROCESSED', sort_dir: 'DESC' }); reviews.reviews?.forEach(review => { console.log(`${review.rating}⭐ ${review.text.substring(0, 100)}...`); }); // Пагинация if (reviews.has_next) { const nextPage = await reviewApi.getList({ limit: 100, last_id: reviews.last_id, status: 'UNPROCESSED' }); } ```

**Example:**
```typescript
const result = await client.getList(/* parameters */);
console.log(result);
```

## Type Definitions

The Review API uses strongly typed TypeScript interfaces for all requests and responses. Import the necessary types from the SDK:

```typescript
import type {
  // Request types
  Review*Request
} from '@ozon/seller-api';

import type {
  // Response types  
  Review*Response
} from '@ozon/seller-api';
```

## Error Handling

```typescript
try {
  const result = await client.review.changeStatus(/* parameters */);
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