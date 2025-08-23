# Premium

## POST /v1/chat/send/message

**Summary:** Отправить сообщение

**operationId:** `ChatAPI_ChatSendMessage`

Доступно для продавцов с подпиской [Premium Plus](https://seller-edu.ozon.ru/seller-rating/about-rating/subscription-premium-plus).

Отправляет сообщение в существующий чат по его идентификатору. &lt;br&gt;&lt;br&gt;
Получите список чатов с покупателем `chats.chat.chat_type="Buyer_Seller"` в ответе метода [/v3/chat/list](#operation/ChatAPI_ChatListV3).

Для отправлений:
- FBO — вы можете отправить сообщение в течение 48 часов с момента получения последнего сообщения от покупателя. 
- FBS или rFBS — вы можете отправить сообщение покупателю после оплаты и в течение 72 часов после доставки отправления. После этого вы можете только отвечать на сообщения в течение 48 часов с момента получения последнего сообщения от покупателя.

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
- `chatChatSendMessageRequest` — see [../common-types/chatchatsendmessagerequest.md](../common-types/chatchatsendmessagerequest.md)- `chatChatSendMessageResponse` — see [../common-types/chatchatsendmessageresponse.md](../common-types/chatchatsendmessageresponse.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)
## POST /v1/chat/start

**Summary:** Создать новый чат

**operationId:** `ChatAPI_ChatStart`

Доступно для продавцов с подпиской [Premium Plus](https://seller-edu.ozon.ru/seller-rating/about-rating/subscription-premium-plus).

Создает новый чат с покупателем по отправлению. Например, чтобы уточнить адрес или модель товара. 

Для отправлений:
- FBO — начать чат может только покупатель.
- FBS и rFBS — вы можете открыть чат в течение 72 часов после оплаты или доставки отправления.

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
- `chatChatStartRequest` — see [../common-types/chatchatstartrequest.md](../common-types/chatchatstartrequest.md)- `chatChatStartResponse` — see [../common-types/chatchatstartresponse.md](../common-types/chatchatstartresponse.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)
## POST /v1/finance/realization/by-day

**Summary:** Отчёт о реализации товаров за день

**operationId:** `FinanceAPI_GetRealizationByDayReportV1`

Доступно для продавцов с подпиской [Premium Plus](https://seller-edu.ozon.ru/seller-rating/about-rating/subscription-premium-plus). 

Возвращает данные о суммах реализации из [отчёта о реализации товаров](#operation/FinanceAPI_GetRealizationReportV2) за день. Отмены и невыкупы не включаются. Данные доступны не более чем за 32 календарных дня от текущей даты.

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
- `GetRealizationReportByDayResponse` — see [../common-types/getrealizationreportbydayresponse.md](../common-types/getrealizationreportbydayresponse.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1GetRealizationReportByDayRequest` — see [../common-types/v1getrealizationreportbydayrequest.md](../common-types/v1getrealizationreportbydayrequest.md)
## POST /v2/chat/read

**Summary:** Отметить сообщения как прочитанные

**operationId:** `ChatAPI_ChatReadV2`

Доступно для продавцов с подпиской [Premium Plus](https://seller-edu.ozon.ru/seller-rating/about-rating/subscription-premium-plus).

Метод для отметки выбранного сообщения и сообщений до него прочитанными. &lt;br&gt;&lt;br&gt; 
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
- `ChatRead` — see [../common-types/chatread.md](../common-types/chatread.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v2ChatReadResponse` — see [../common-types/v2chatreadresponse.md](../common-types/v2chatreadresponse.md)
## POST /v3/chat/history

**Summary:** История чата

**operationId:** `ChatAPI_ChatHistoryV3`

Доступно для продавцов с подпиской [Premium Plus](https://seller-edu.ozon.ru/seller-rating/about-rating/subscription-premium-plus).

Возвращает историю сообщений чата. По умолчанию от самого нового сообщения к старым. &lt;br&gt;&lt;br&gt;
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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v3ChatHistoryRequest` — see [../common-types/v3chathistoryrequest.md](../common-types/v3chathistoryrequest.md)- `v3ChatHistoryResponse` — see [../common-types/v3chathistoryresponse.md](../common-types/v3chathistoryresponse.md)
