# WarehouseAPI

## POST /v1/delivery-method/list

**Summary:** Список методов доставки склада

**operationId:** `WarehouseAPI_DeliveryMethodList`

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `warehouseDeliveryMethodListRequest` — see [../common-types/warehousedeliverymethodlistrequest.md](../common-types/warehousedeliverymethodlistrequest.md)- `warehouseDeliveryMethodListResponse` — see [../common-types/warehousedeliverymethodlistresponse.md](../common-types/warehousedeliverymethodlistresponse.md)
## POST /v1/warehouse/list

**Summary:** Список складов

**operationId:** `WarehouseAPI_WarehouseList`

Метод возвращает список складов FBS и rFBS. Чтобы получить список складов FBO, используйте метод [/v1/cluster/list](#operation/SupplyDraftAPI_DraftClusterList).

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `warehouseWarehouseListResponse` — see [../common-types/warehousewarehouselistresponse.md](../common-types/warehousewarehouselistresponse.md)
