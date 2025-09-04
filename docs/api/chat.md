# Chat API

Chat API implementation

## Overview

The ChatApi class provides 8 methods for chat api implementation.

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
const result = await client.chat.startChat(/* parameters */);
```

## Methods Reference

### `startChat()`

Chat API implementation Generated from MCP documentation: chatapi--chunk-001.md and premium--chunk-002.md Handles customer communication and chat management / import { HttpClient } from "../../core/http.js"; import type { RequestOptions } from "../../core/types.js"; import type { ChatStartRequest, ChatSendMessageRequest, ChatSendFileRequest, ChatReadRequest, ChatHistoryV2Request, ChatHistoryV3Request, ChatListV2Request, ChatListV3Request } from "../../types/requests/chat.js"; import type { ChatStartResponse, ChatSendMessageResponse, ChatSendFileResponse, ChatReadResponse, ChatHistoryV2Response, ChatHistoryV3Response, ChatListV2Response, ChatListV3Response } from "../../types/responses/chat.js"; /** Chat API для управления чатами и сообщениями Chat API for chat and message management ⚠️ **ТРЕБУЕТ ПОДПИСКУ PREMIUM PLUS** - Все методы доступны только для продавцов с подпиской Premium Plus. ⚠️ **REQUIRES PREMIUM PLUS SUBSCRIPTION** - All methods are available only for sellers with Premium Plus subscription. ```typescript // Создать новый чат с покупателем const chat = await chatApi.startChat({ posting_number: 'FBS-12345' }); // Отправить сообщение в чат await chatApi.sendMessage({ chat_id: chat.result?.chat_id!, text: 'Здравствуйте! Как дела с заказом?' }); ``` / export class ChatApi { constructor(private readonly httpClient: HttpClient) {} /** Создать новый чат Start new chat Создает новый чат с покупателем по отправлению. Например, чтобы уточнить адрес или модель товара. Ограничения: - FBO — начать чат может только покупатель. - FBS и rFBS — вы можете открыть чат в течение 72 часов после оплаты или доставки отправления. ```typescript const chat = await chatApi.startChat({ posting_number: 'FBS-12345' }); console.log(`Чат создан с ID: ${chat.result?.chat_id}`); ```

**Example:**
```typescript
const result = await client.startChat(/* parameters */);
console.log(result);
```

### `sendMessage()`

Отправить сообщение Send message Отправляет сообщение в существующий чат по его идентификатору. Ограничения по времени: - FBO — вы можете отправить сообщение в течение 48 часов с момента получения последнего сообщения от покупателя. - FBS или rFBS — вы можете отправить сообщение покупателю после оплаты и в течение 72 часов после доставки отправления. После этого вы можете только отвечать на сообщения в течение 48 часов с момента получения последнего сообщения от покупателя. ```typescript const result = await chatApi.sendMessage({ chat_id: 'chat-123', text: 'Здравствуйте! Ваш заказ готовится к отправке.' }); if (result.result === 'ok') { console.log('Сообщение отправлено успешно'); } ```

**Example:**
```typescript
const result = await client.sendMessage(/* parameters */);
console.log(result);
```

### `sendFile()`

Отправить файл Send file Отправляет файл в существующий чат по его идентификатору. Ограничения по времени такие же, как для отправки сообщений. ```typescript const fileData = btoa(fileContent); // конвертация в base64 const result = await chatApi.sendFile({ chat_id: 'chat-123', base64_content: fileData, name: 'instruction.pdf' }); if (result.result === 'ok') { console.log('Файл отправлен успешно'); } ```

**Example:**
```typescript
const result = await client.sendFile(/* parameters */);
console.log(result);
```

### `markAsRead()`

Отметить сообщения как прочитанные Mark messages as read Метод для отметки выбранного сообщения и сообщений до него прочитанными. ```typescript const result = await chatApi.markAsRead({ chat_id: 'chat-123', from_message_id: 456 }); console.log(`Непрочитанных сообщений: ${result.unread_count}`); ```

**Example:**
```typescript
const result = await client.markAsRead(/* parameters */);
console.log(result);
```

### `getChatHistoryV2()`

Получить историю чата (v2) Get chat history v2 Возвращает историю сообщений чата. По умолчанию от самого нового сообщения к старым. ```typescript const history = await chatApi.getChatHistoryV2({ chat_id: 'chat-123', limit: 50, direction: 'Backward' }); history.messages?.forEach(message => { console.log(`${message.user?.name}: ${message.data?.join(' ')}`); }); ```

**Example:**
```typescript
const result = await client.getChatHistoryV2(/* parameters */);
console.log(result);
```

### `getChatHistoryV3()`

Получить историю чата (v3) Get chat history v3 Возвращает историю сообщений чата. По умолчанию от самого нового сообщения к старым. ```typescript const history = await chatApi.getChatHistoryV3({ chat_id: 'chat-123', limit: 50, direction: 'Backward' }); history.messages?.forEach(message => { console.log(`${message.user?.name}: ${message.data?.join(' ')}`); if (message.is_image) { console.log('📷 Содержит изображение'); } }); ```

**Example:**
```typescript
const result = await client.getChatHistoryV3(/* parameters */);
console.log(result);
```

### `getChatListV2()`

Получить список чатов (v2) Get chat list v2 Возвращает информацию о чатах по указанным фильтрам. ```typescript const chats = await chatApi.getChatListV2({ limit: 100, filter: { chat_status: 'Opened', unread_only: true } }); console.log(`Найдено ${chats.total_chats_count} чатов`); console.log(`Непрочитанных сообщений: ${chats.total_unread_count}`); ```

**Example:**
```typescript
const result = await client.getChatListV2(/* parameters */);
console.log(result);
```

### `getChatListV3()`

Получить список чатов (v3) Get chat list v3 Возвращает информацию о чатах по указанным фильтрам. ```typescript const chats = await chatApi.getChatListV3({ limit: 100, filter: { chat_status: 'Opened', unread_only: true } }); chats.chats?.forEach(chatInfo => { console.log(`Чат ${chatInfo.chat?.chat_id}: ${chatInfo.unread_count} непрочитанных`); }); // Пагинация if (chats.has_next) { const nextPage = await chatApi.getChatListV3({ limit: 100, cursor: chats.cursor }); } ```

**Example:**
```typescript
const result = await client.getChatListV3(/* parameters */);
console.log(result);
```

## Type Definitions

The Chat API uses strongly typed TypeScript interfaces for all requests and responses. Import the necessary types from the SDK:

```typescript
import type {
  // Request types
  Chat*Request
} from '@ozon/seller-api';

import type {
  // Response types  
  Chat*Response
} from '@ozon/seller-api';
```

## Error Handling

```typescript
try {
  const result = await client.chat.startChat(/* parameters */);
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