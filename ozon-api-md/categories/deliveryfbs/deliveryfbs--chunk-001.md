# DeliveryFBS

## POST /v1/carriage/approve

**Summary:** Подтверждение отгрузки

**operationId:** `CarriageAPI_CarriageApprove`

Используйте метод, чтобы подтвердить отгрузку после её создания.
После подтверждения отгрузка перейдёт в статус «Сформирована».

После подтверждения отгрузки вы можете получить лист отгрузки методом [/v2/posting/fbs/digital/act/get-pdf](#operation/PostingAPI_PostingFBSGetDigitalAct) и штрихкод отгрузки методом [/v2/posting/fbs/act/get-barcode](#operation/PostingAPI_PostingFBSGetBarcode).

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1CarriageApproveRequest` — see [../common-types/v1carriageapproverequest.md](../common-types/v1carriageapproverequest.md)- `v1CarriageApproveResponse` — see [../common-types/v1carriageapproveresponse.md](../common-types/v1carriageapproveresponse.md)
## POST /v1/carriage/cancel

**Summary:** Удаление отгрузки

**operationId:** `CarriageAPI_CarriageCancel`

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1CarriageCancelRequest` — see [../common-types/v1carriagecancelrequest.md](../common-types/v1carriagecancelrequest.md)- `v1CarriageCancelResponse` — see [../common-types/v1carriagecancelresponse.md](../common-types/v1carriagecancelresponse.md)
## POST /v1/carriage/create

**Summary:** Создание отгрузки

**operationId:** `CarriageAPI_CarriageCreate`

&lt;aside class="warning"&gt;
Если вы продавец не из России, обратите внимание на доступность &lt;a href="https://seller-edu.ozon.ru/fbs/ozon-logistika/sobrat-zakazy#шаг-2-сформируите-отгрузку"&gt;рекомендованного времени&lt;/a&gt; в личном кабинете.
Если вам не доступен этот функционал, создайте отгрузку через метод &lt;a href="#operation/PostingAPI_PostingFBSActCreate"&gt;/v2/posting/fbs/act/create&lt;/a&gt;. 
Подтверждать отгрузку, которую создали через этот метод, не нужно. Вы не сможете отредактировать состав отгрузки.

&lt;/aside&gt;

Используйте метод для создания первой FBS отгрузки. В неё попадут все отправления со статусом «Готов к отгрузке». Созданная отгрузка получит статус `new`.

Для отгрузки в статусе `new` можно перезаписать состав отправлений методом [/v1/carriage/set-postings](#operation/CarriageAPI_SetPostings). Если из отгрузки исключить часть отправлений, они могут попасть в следующую отгрузку. 

Чтобы получить список отправлений в отгрузке, используйте метод [/v2/posting/fbs/act/get-postings](#operation/PostingAPI_ActPostingList).

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1CarriageCreateRequest` — see [../common-types/v1carriagecreaterequest.md](../common-types/v1carriagecreaterequest.md)- `v1CarriageCreateResponse` — see [../common-types/v1carriagecreateresponse.md](../common-types/v1carriagecreateresponse.md)
## POST /v1/carriage/delivery/list

**Summary:** Список методов доставки и отгрузок

**operationId:** `CarriageAPI_CarriageDeliveryList`

Используйте метод, чтобы получить список созданных отгрузок для метода доставки и их статусы.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1CarriageDeliveryListRequest` — see [../common-types/v1carriagedeliverylistrequest.md](../common-types/v1carriagedeliverylistrequest.md)- `v1CarriageDeliveryListResponse` — see [../common-types/v1carriagedeliverylistresponse.md](../common-types/v1carriagedeliverylistresponse.md)
## POST /v1/carriage/get

**Summary:** Информация о перевозке

**operationId:** `CarriageGet`

**Parameters (path/query/header/cookie):**
- none

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
- `carriageCarriageGetRequest` — see [../common-types/carriagecarriagegetrequest.md](../common-types/carriagecarriagegetrequest.md)- `carriageCarriageGetResponse` — see [../common-types/carriagecarriagegetresponse.md](../common-types/carriagecarriagegetresponse.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)
