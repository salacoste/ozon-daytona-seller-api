# FboSupplyRequest

## POST /v1/supply-order/cancel/status

**Summary:** Получить статус отмены заявки на поставку

**operationId:** `SupplyOrderAPI_SupplyOrderCancelStatus`

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
- `googlerpcStatus` — see [../common-types/googlerpcstatus.md](../common-types/googlerpcstatus.md)- `v1SupplyOrderCancelStatusRequest` — see [../common-types/v1supplyordercancelstatusrequest.md](../common-types/v1supplyordercancelstatusrequest.md)- `v1SupplyOrderCancelStatusResponse` — see [../common-types/v1supplyordercancelstatusresponse.md](../common-types/v1supplyordercancelstatusresponse.md)
## POST /v1/supply-order/content/update

**Summary:** Редактирование товарного состава

**operationId:** `SupplyOrderAPI_SupplyOrderContentUpdate`

Метод для редактирования товарного состава в заявке на поставку.

Чтобы проверить статус редактирования, используйте метод [/v1/supply-order/content/update/status](#operation/SupplyOrderAPI_SupplyOrderContentUpdateStatus).

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
- `googlerpcStatus` — see [../common-types/googlerpcstatus.md](../common-types/googlerpcstatus.md)- `v1SupplyOrderContentUpdateRequest` — see [../common-types/v1supplyordercontentupdaterequest.md](../common-types/v1supplyordercontentupdaterequest.md)- `v1SupplyOrderContentUpdateResponse` — see [../common-types/v1supplyordercontentupdateresponse.md](../common-types/v1supplyordercontentupdateresponse.md)
## POST /v1/supply-order/content/update/status

**Summary:** Информация о статусе редактирования товарного состава

**operationId:** `SupplyOrderAPI_SupplyOrderContentUpdateStatus`

Метод для получения статуса редактирования товарного состава.

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
- `googlerpcStatus` — see [../common-types/googlerpcstatus.md](../common-types/googlerpcstatus.md)- `v1SupplyOrderContentUpdateStatusRequest` — see [../common-types/v1supplyordercontentupdatestatusrequest.md](../common-types/v1supplyordercontentupdatestatusrequest.md)- `v1SupplyOrderContentUpdateStatusResponse` — see [../common-types/v1supplyordercontentupdatestatusresponse.md](../common-types/v1supplyordercontentupdatestatusresponse.md)
## POST /v1/warehouse/fbo/list

**Summary:** Поиск точек для отгрузки поставки

**operationId:** `SupplyDraftAPI_DraftGetWarehouseFboList`

Используйте метод, чтобы найти точки отгрузки для кросс-докинга и прямых поставок.

Вы можете посмотреть адреса всех точек на карте и в виде таблицы в [Базе знаний](https://seller-edu.ozon.ru/fbo/warehouses/adresa-skladov-fbo).

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1DraftGetWarehouseFboListRequest` — see [../common-types/v1draftgetwarehousefbolistrequest.md](../common-types/v1draftgetwarehousefbolistrequest.md)- `v1DraftGetWarehouseFboListResponse` — see [../common-types/v1draftgetwarehousefbolistresponse.md](../common-types/v1draftgetwarehousefbolistresponse.md)
