# FBO

## POST /v1/supply-order/timeslot/status

**Summary:** Статус интервала поставки

**operationId:** `SupplyOrderAPI_GetSupplyOrderTimeslotStatus`

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
- `googlerpcStatus` — see [../common-types/googlerpcstatus.md](../common-types/googlerpcstatus.md)- `v1GetSupplyOrderTimeslotStatusRequest` — see [../common-types/v1getsupplyordertimeslotstatusrequest.md](../common-types/v1getsupplyordertimeslotstatusrequest.md)- `v1GetSupplyOrderTimeslotStatusResponse` — see [../common-types/v1getsupplyordertimeslotstatusresponse.md](../common-types/v1getsupplyordertimeslotstatusresponse.md)
## POST /v1/supply-order/timeslot/update

**Summary:** Обновить интервал поставки

**operationId:** `SupplyOrderAPI_UpdateSupplyOrderTimeslot`

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
- `googlerpcStatus` — see [../common-types/googlerpcstatus.md](../common-types/googlerpcstatus.md)- `v1UpdateSupplyOrderTimeslotRequest` — see [../common-types/v1updatesupplyordertimeslotrequest.md](../common-types/v1updatesupplyordertimeslotrequest.md)- `v1UpdateSupplyOrderTimeslotResponse` — see [../common-types/v1updatesupplyordertimeslotresponse.md](../common-types/v1updatesupplyordertimeslotresponse.md)
## POST /v2/posting/fbo/get

**Summary:** Информация об отправлении

**operationId:** `PostingAPI_GetFboPosting`

Возвращает информацию об отправлении по его идентификатору.

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
- `postingGetFboPostingRequest` — see [../common-types/postinggetfbopostingrequest.md](../common-types/postinggetfbopostingrequest.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v2FboPostingResponse` — see [../common-types/v2fbopostingresponse.md](../common-types/v2fbopostingresponse.md)
## POST /v2/posting/fbo/list

**Summary:** Список отправлений

**operationId:** `PostingAPI_GetFboPostingList`

Возвращает список отправлений за указанный период времени.
 Если период больше года, вернётся ошибка `PERIOD_IS_TOO_LONG`.
 
 Дополнительно можно отфильтровать отправления по их статусу.

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
- `postingGetFboPostingListRequest` — see [../common-types/postinggetfbopostinglistrequest.md](../common-types/postinggetfbopostinglistrequest.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v2FboPostingListResponse` — see [../common-types/v2fbopostinglistresponse.md](../common-types/v2fbopostinglistresponse.md)
## POST /v2/supply-order/get

**Summary:** Информация о заявке на поставку

**operationId:** `SupplyOrderAPI_GetSupplyOrdersV2`

Учитываются заявки с поставкой на конкретный склад и через [виртуальный распределительный центр (вРЦ)](https://seller-edu.ozon.ru/fbo/scheme-of-work/about#чем-отличаются-процессы-при-заявках-через-врц-и-напрямую-на-склад).

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v2GetSupplyOrdersRequest` — see [../common-types/v2getsupplyordersrequest.md](../common-types/v2getsupplyordersrequest.md)- `v2GetSupplyOrdersResponse` — see [../common-types/v2getsupplyordersresponse.md](../common-types/v2getsupplyordersresponse.md)
## POST /v2/supply-order/list

**Summary:** Список заявок на поставку на склад Ozon

**operationId:** `SupplyOrderAPI_GetSupplyOrdersListV2`

Учитываются заявки с поставкой на конкретный склад и через [виртуальный распределительный центр (вРЦ)](https://seller-edu.ozon.ru/fbo/scheme-of-work/about#чем-отличаются-процессы-при-заявках-через-врц-и-напрямую-на-склад).

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v2GetSupplyOrdersListRequest` — see [../common-types/v2getsupplyorderslistrequest.md](../common-types/v2getsupplyorderslistrequest.md)- `v2GetSupplyOrdersListResponse` — see [../common-types/v2getsupplyorderslistresponse.md](../common-types/v2getsupplyorderslistresponse.md)
