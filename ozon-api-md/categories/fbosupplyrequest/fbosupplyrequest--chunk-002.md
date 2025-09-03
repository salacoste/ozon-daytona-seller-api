# FboSupplyRequest

## POST /v1/cargoes/rules/get

**Summary:** Чек-лист по установке грузомест FBO

**operationId:** `CargoesAPI_CargoesRulesGet`

Метод для получения чек-листа с правилами по установке грузомест.

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
- `googlerpcStatus` — see [../common-types/googlerpcstatus.md](../common-types/googlerpcstatus.md)- `v1CargoesRulesGetRequest` — see [../common-types/v1cargoesrulesgetrequest.md](../common-types/v1cargoesrulesgetrequest.md)- `v1CargoesRulesGetResponse` — see [../common-types/v1cargoesrulesgetresponse.md](../common-types/v1cargoesrulesgetresponse.md)
## POST /v1/cluster/list

**Summary:** Информация о кластерах и их складах

**operationId:** `SupplyDraftAPI_DraftClusterList`

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1DraftClusterListRequest` — see [../common-types/v1draftclusterlistrequest.md](../common-types/v1draftclusterlistrequest.md)- `v1DraftClusterListResponse` — see [../common-types/v1draftclusterlistresponse.md](../common-types/v1draftclusterlistresponse.md)
## POST /v1/draft/create

**Summary:** Создать черновик заявки на поставку

**operationId:** `SupplyDraftAPI_DraftCreate`

Создать черновик заявки на поставку — прямой или кросс-докинг, а также указать поставляемые товары.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1DraftCreateRequest` — see [../common-types/v1draftcreaterequest.md](../common-types/v1draftcreaterequest.md)- `v1DraftCreateResponse` — see [../common-types/v1draftcreateresponse.md](../common-types/v1draftcreateresponse.md)
## POST /v1/draft/create/info

**Summary:** Информация о черновике заявки на поставку

**operationId:** `SupplyDraftAPI_DraftCreateInfo`

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1DraftCreateInfoRequest` — see [../common-types/v1draftcreateinforequest.md](../common-types/v1draftcreateinforequest.md)- `v1DraftCreateInfoResponse` — see [../common-types/v1draftcreateinforesponse.md](../common-types/v1draftcreateinforesponse.md)
## POST /v1/draft/supply/create

**Summary:** Создать заявку на поставку по черновику

**operationId:** `SupplyDraftAPI_DraftSupplyCreate`

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1DraftSupplyCreateRequest` — see [../common-types/v1draftsupplycreaterequest.md](../common-types/v1draftsupplycreaterequest.md)- `v1DraftSupplyCreateResponse` — see [../common-types/v1draftsupplycreateresponse.md](../common-types/v1draftsupplycreateresponse.md)
## POST /v1/draft/supply/create/status

**Summary:** Информация о создании заявки на поставку

**operationId:** `SupplyDraftAPI_DraftSupplyCreateStatus`

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1DraftSupplyCreateStatusRequest` — see [../common-types/v1draftsupplycreatestatusrequest.md](../common-types/v1draftsupplycreatestatusrequest.md)- `v1DraftSupplyCreateStatusResponse` — see [../common-types/v1draftsupplycreatestatusresponse.md](../common-types/v1draftsupplycreatestatusresponse.md)
## POST /v1/draft/timeslot/info

**Summary:** Доступные таймслоты

**operationId:** `SupplyDraftAPI_DraftTimeslotInfo`

Доступные таймслоты на конечных складах отгрузки.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1DraftTimeslotInfoRequest` — see [../common-types/v1drafttimeslotinforequest.md](../common-types/v1drafttimeslotinforequest.md)- `v1DraftTimeslotInfoResponse` — see [../common-types/v1drafttimeslotinforesponse.md](../common-types/v1drafttimeslotinforesponse.md)
## POST /v1/supply-order/cancel

**Summary:** Отменить заявку на поставку

**operationId:** `SupplyOrderAPI_SupplyOrderCancel`

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
- `googlerpcStatus` — see [../common-types/googlerpcstatus.md](../common-types/googlerpcstatus.md)- `v1SupplyOrderCancelRequest` — see [../common-types/v1supplyordercancelrequest.md](../common-types/v1supplyordercancelrequest.md)- `v1SupplyOrderCancelResponse` — see [../common-types/v1supplyordercancelresponse.md](../common-types/v1supplyordercancelresponse.md)
