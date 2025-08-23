# FBS

## POST /v2/posting/fbs/product/country/set

**Summary:** Добавить информацию о стране-изготовителе товара

**operationId:** `PostingAPI_SetCountryProductFbsPostingV2`

Метод для добавления на продукт атрибута «Страна-изготовитель», если он не был указан.

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
- `googlerpcStatus` — see [../common-types/googlerpcstatus.md](../common-types/googlerpcstatus.md)- `v2FbsPostingProductCountrySetRequest` — see [../common-types/v2fbspostingproductcountrysetrequest.md](../common-types/v2fbspostingproductcountrysetrequest.md)- `v2FbsPostingProductCountrySetResponse` — see [../common-types/v2fbspostingproductcountrysetresponse.md](../common-types/v2fbspostingproductcountrysetresponse.md)
## POST /v3/posting/fbs/get

**Summary:** Получить информацию об отправлении по идентификатору

**operationId:** `PostingAPI_GetFbsPostingV3`

Чтобы получать актуальную дату отгрузки, регулярно обновляйте информацию об отправлениях или подключите [пуш-уведомления](#tag/push_start).

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
- `postingv3GetFbsPostingRequest` — see [../common-types/postingv3getfbspostingrequest.md](../common-types/postingv3getfbspostingrequest.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v3GetFbsPostingResponseV3` — see [../common-types/v3getfbspostingresponsev3.md](../common-types/v3getfbspostingresponsev3.md)
## POST /v3/posting/fbs/list

**Summary:** Список отправлений (версия 3)

**operationId:** `PostingAPI_GetFbsPostingListV3`

Возвращает список отправлений за указанный период времени — он должен быть не больше одного года.

Дополнительно можно отфильтровать отправления по их статусу — список доступных для выдачи статусов указан в описании параметра `filter.status`.

`has_next = true` в ответе может значить, что вернули не весь массив отправлений. Чтобы получить информацию об остальных отправлениях, сделайте новый запрос с другим значением `offset`.

 Чтобы получать актуальную дату отгрузки, регулярно обновляйте информацию об отправлениях или подключите [пуш-уведомления](#tag/push_start).

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
- `postingv3GetFbsPostingListRequest` — see [../common-types/postingv3getfbspostinglistrequest.md](../common-types/postingv3getfbspostinglistrequest.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v3GetFbsPostingListResponseV3` — see [../common-types/v3getfbspostinglistresponsev3.md](../common-types/v3getfbspostinglistresponsev3.md)
## POST /v3/posting/fbs/unfulfilled/list

**Summary:** Список необработанных отправлений (версия 3)

**operationId:** `PostingAPI_GetFbsPostingUnfulfilledList`

Возвращает список необработанных отправлений за указанный период времени — он должен быть не больше одного года.

Возможные статусы отправлений:
- `awaiting_registration` — ожидает регистрации,
- `acceptance_in_progress` — идёт приёмка,
- `awaiting_approve` — ожидает подтверждения,
- `awaiting_packaging` — ожидает упаковки,
- `awaiting_deliver` — ожидает отгрузки,
- `arbitration` — арбитраж,
- `client_arbitration` — клиентский арбитраж доставки,
- `delivering` — доставляется,
- `driver_pickup` — у водителя,
- `cancelled` — отменено,
- `not_accepted` — не принят на сортировочном центре,
- `sent_by_seller` — отправлено продавцом.

Чтобы получать актуальную дату отгрузки, регулярно обновляйте информацию об отправлениях или подключите [пуш-уведомления](#tag/push_start).

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
- `postingv3GetFbsPostingUnfulfilledListRequest` — see [../common-types/postingv3getfbspostingunfulfilledlistrequest.md](../common-types/postingv3getfbspostingunfulfilledlistrequest.md)- `postingv3GetFbsPostingUnfulfilledListResponse` — see [../common-types/postingv3getfbspostingunfulfilledlistresponse.md](../common-types/postingv3getfbspostingunfulfilledlistresponse.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)
## POST /v3/posting/multiboxqty/set

**Summary:** Указать количество коробок для многокоробочных отправлений

**operationId:** `PostingAPI_PostingMultiBoxQtySetV3`

Метод для передачи количества коробок для отправлений, в которых есть многокоробочные товары.

Используйте метод при работе по схеме rFBS Агрегатор — c доставкой партнёрами Ozon.

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
- `postingv3PostingMultiBoxQtySetV3Request` — see [../common-types/postingv3postingmultiboxqtysetv3request.md](../common-types/postingv3postingmultiboxqtysetv3request.md)- `postingv3PostingMultiBoxQtySetV3Response` — see [../common-types/postingv3postingmultiboxqtysetv3response.md](../common-types/postingv3postingmultiboxqtysetv3response.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)
