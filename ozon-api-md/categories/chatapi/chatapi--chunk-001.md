# ChatAPI

## POST /v1/chat/send/file

**Summary:** Отправить файл

**operationId:** `ChatAPI_ChatSendFile`

Отправляет файл в существующий чат по его идентификатору. &lt;br&gt;&lt;br&gt; Отправить файл в чат с покупателем могут только продавцы с подпиской [Premium Plus](https://seller-edu.ozon.ru/seller-rating/about-rating/subscription-premium-plus).
Получите список чатов с покупателем `chats.chat.chat_type="Buyer_Seller"` в ответе метода [/v3/chat/list](#operation/ChatAPI_ChatListV3). 

Для отправлений:
- FBO — вы можете отправить файл в течение 48 часов с момента получения последнего сообщения от покупателя. 
- FBS или rFBS — вы можете отправить файл покупателю после оплаты и в течение 72 часов после доставки отправления. После этого вы можете только отвечать на сообщения в течение 48 часов с момента получения последнего сообщения от покупателя.

**Parameters (path/query/header/cookie):**
_query_:
- `` (optional)
- `` (optional)

**Request body (minimal valid example):**
```json
{
  "note": "no example"
}
```

**Success response (example):**
```json
{
  "result": "ok"
}
```

**Related schemas:**
- `chatChatSendFileRequest` — see [../common-types/chatchatsendfilerequest.md](../common-types/chatchatsendfilerequest.md)- `chatChatSendFileResponse` — see [../common-types/chatchatsendfileresponse.md](../common-types/chatchatsendfileresponse.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)
## POST /v2/chat/history

**Summary:** История чата

**operationId:** `ChatAPI_ChatHistoryV2`

&lt;aside class="warning"&gt;
13 июля 2025 года метод будет отключён. Переключитесь на &lt;a href="#operation/ChatAPI_ChatHistoryV3"&gt;/v3/chat/history&lt;/a&gt;.

&lt;/aside&gt;

Возвращает историю сообщений чата. По умолчанию от самого нового сообщения к старым. &lt;br&gt;&lt;br&gt; История чата с покупателем доступна только для продавцов с подпиской [Premium Plus](https://seller-edu.ozon.ru/seller-rating/about-rating/subscription-premium-plus).
Получите список чатов с покупателем `chats.chat.chat_type="Buyer_Seller"` в ответе метода [/v3/chat/list](#operation/ChatAPI_ChatListV3).

**Parameters (path/query/header/cookie):**
_query_:
- `` (optional)
- `` (optional)

**Request body (minimal valid example):**
```json
{
  "note": "no example"
}
```

**Success response (example):**
```json
{
  "result": "ok"
}
```

**Related schemas:**
- `ChatHistory` — see [../common-types/chathistory.md](../common-types/chathistory.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v2ChatHistoryResponse` — see [../common-types/v2chathistoryresponse.md](../common-types/v2chathistoryresponse.md)
## POST /v2/chat/list

**Summary:** Список чатов

**operationId:** `ChatAPI_ChatListV2`

&lt;aside class="warning"&gt;
Метод устаревает и будет отключён в будущем. Переключитесь на новую версию &lt;a href="#operation/ChatAPI_ChatListV3"&gt;/v3/chat/list&lt;/a&gt;.
&lt;/aside&gt; 

Возвращает информацию о чатах по указанным фильтрам.

**Parameters (path/query/header/cookie):**
_query_:
- `` (optional)
- `` (optional)

**Request body (minimal valid example):**
```json
{
  "note": "no example"
}
```

**Success response (example):**
```json
{
  "result": "ok"
}
```

**Related schemas:**
- `ChatList` — see [../common-types/chatlist.md](../common-types/chatlist.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v2ChatListResponse` — see [../common-types/v2chatlistresponse.md](../common-types/v2chatlistresponse.md)
## POST /v3/chat/list

**Summary:** Список чатов

**operationId:** `ChatAPI_ChatListV3`

Возвращает информацию о чатах по указанным фильтрам.

**Parameters (path/query/header/cookie):**
_query_:
- `` (optional)
- `` (optional)

**Request body (minimal valid example):**
```json
{
  "note": "no example"
}
```

**Success response (example):**
```json
{
  "result": "ok"
}
```

**Related schemas:**
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v3ChatList` — see [../common-types/v3chatlist.md](../common-types/v3chatlist.md)- `v3ChatListResponse` — see [../common-types/v3chatlistresponse.md](../common-types/v3chatlistresponse.md)
