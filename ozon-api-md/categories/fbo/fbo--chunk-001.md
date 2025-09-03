# FBO

## POST /v1/posting/fbo/cancel-reason/list

**Summary:** Причины отмены отправлений по схеме FBO

**operationId:** `PostingAPI_GetPostingFboCancelReasonList`

Возвращает список причин отмены для всех FBO-отправлений.

**Parameters (path/query/header/cookie):**
_query_:
- `` (optional)
- `` (optional)

**Request body (minimal valid example):**
_no request body_

**Success response (example):**
```json
{
  "result": "ok"
}
```

**Related schemas:**
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1CancelReasonListResponse` — see [../common-types/v1cancelreasonlistresponse.md](../common-types/v1cancelreasonlistresponse.md)
## GET /v1/supplier/available_warehouses

**Summary:** Загруженность складов Ozon

**operationId:** `SupplierAPI_SupplierAvailableWarehouses`

Метод возвращает список активных складов Ozon с информацией об их средней загруженности на ближайшее время.

**Parameters (path/query/header/cookie):**
_query_:
- `` (optional)
- `` (optional)

**Request body (minimal valid example):**
_no request body_

**Success response (example):**
```json
{
  "result": "ok"
}
```

**Related schemas:**
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1SupplierAvailableWarehousesResponse` — see [../common-types/v1supplieravailablewarehousesresponse.md](../common-types/v1supplieravailablewarehousesresponse.md)
## POST /v1/supply-order/bundle

**Summary:** Состав поставки или заявки на поставку

**operationId:** `SupplyOrderBundle`

Используйте метод, чтобы получить товарный состав поставки или черновика заявки на поставку.
Одним вызовом метода можно получить состав одной поставки или черновика заявки.

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
- `googlerpcStatus` — see [../common-types/googlerpcstatus.md](../common-types/googlerpcstatus.md)- `v1GetSupplyOrderBundleRequest` — see [../common-types/v1getsupplyorderbundlerequest.md](../common-types/v1getsupplyorderbundlerequest.md)- `v1GetSupplyOrderBundleResponse` — see [../common-types/v1getsupplyorderbundleresponse.md](../common-types/v1getsupplyorderbundleresponse.md)
## POST /v1/supply-order/pass/create

**Summary:** Указать данные о водителе и автомобиле

**operationId:** `SupplyOrderAPI_SupplyOrderPassCreate`

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
- `googlerpcStatus` — see [../common-types/googlerpcstatus.md](../common-types/googlerpcstatus.md)- `v1SupplyOrderPassCreateRequest` — see [../common-types/v1supplyorderpasscreaterequest.md](../common-types/v1supplyorderpasscreaterequest.md)- `v1SupplyOrderPassCreateResponse` — see [../common-types/v1supplyorderpasscreateresponse.md](../common-types/v1supplyorderpasscreateresponse.md)
## POST /v1/supply-order/pass/status

**Summary:** Статус ввода данных о водителе и автомобиле

**operationId:** `SupplyOrderAPI_SupplyOrderPassStatus`

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
- `googlerpcStatus` — see [../common-types/googlerpcstatus.md](../common-types/googlerpcstatus.md)- `v1SupplyOrderPassStatusRequest` — see [../common-types/v1supplyorderpassstatusrequest.md](../common-types/v1supplyorderpassstatusrequest.md)- `v1SupplyOrderPassStatusResponse` — see [../common-types/v1supplyorderpassstatusresponse.md](../common-types/v1supplyorderpassstatusresponse.md)
## POST /v1/supply-order/status/counter

**Summary:** Количество заявок по статусам

**operationId:** `SupplyOrderAPI_SupplyOrderStatusCounter`

Возвращает количество заявок в конкретном статусе.

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
- `commonEmpty` — see [../common-types/commonempty.md](../common-types/commonempty.md)- `googlerpcStatus` — see [../common-types/googlerpcstatus.md](../common-types/googlerpcstatus.md)- `v1SupplyOrderStatusCounterResponse` — see [../common-types/v1supplyorderstatuscounterresponse.md](../common-types/v1supplyorderstatuscounterresponse.md)
## POST /v1/supply-order/timeslot/get

**Summary:** Интервалы поставки

**operationId:** `SupplyOrderAPI_GetSupplyOrderTimeslots`

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
- `googlerpcStatus` — see [../common-types/googlerpcstatus.md](../common-types/googlerpcstatus.md)- `v1GetSupplyOrderTimeslotsRequest` — see [../common-types/v1getsupplyordertimeslotsrequest.md](../common-types/v1getsupplyordertimeslotsrequest.md)- `v1GetSupplyOrderTimeslotsResponse` — see [../common-types/v1getsupplyordertimeslotsresponse.md](../common-types/v1getsupplyordertimeslotsresponse.md)
