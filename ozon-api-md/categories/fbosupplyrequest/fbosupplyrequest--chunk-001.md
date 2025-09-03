# FboSupplyRequest

## POST /v1/cargoes-label/create

**Summary:** Сгенерировать этикетки для грузомест

**operationId:** `CargoesAPI_CargoesLabelCreate`

Используйте метод, чтобы сгенерировать этикетки для грузомест из заявки на поставку.

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
- `googlerpcStatus` — see [../common-types/googlerpcstatus.md](../common-types/googlerpcstatus.md)- `v1CargoesLabelCreateRequest` — see [../common-types/v1cargoeslabelcreaterequest.md](../common-types/v1cargoeslabelcreaterequest.md)- `v1CargoesLabelCreateResponse` — see [../common-types/v1cargoeslabelcreateresponse.md](../common-types/v1cargoeslabelcreateresponse.md)
## GET /v1/cargoes-label/file/{file_guid}

**Summary:** Получить PDF с этикетками грузовых мест

**operationId:** `CargoesAPI_CargoesLabelFile`

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
- `googlerpcStatus` — see [../common-types/googlerpcstatus.md](../common-types/googlerpcstatus.md)
## POST /v1/cargoes-label/get

**Summary:** Получить идентификатор этикетки для грузомест

**operationId:** `CargoesAPI_CargoesLabelGet`

Используйте метод, чтобы получить статус формирования этикеток и идентификатор файла с ними.

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
- `googlerpcStatus` — see [../common-types/googlerpcstatus.md](../common-types/googlerpcstatus.md)- `v1CargoesLabelGetRequest` — see [../common-types/v1cargoeslabelgetrequest.md](../common-types/v1cargoeslabelgetrequest.md)- `v1CargoesLabelGetResponse` — see [../common-types/v1cargoeslabelgetresponse.md](../common-types/v1cargoeslabelgetresponse.md)
## POST /v1/cargoes/create

**Summary:** Установка грузомест

**operationId:** `CargoesAPI_CargoesCreate`

Используйте метод, чтобы передать грузоместа и товарный состав в заявку на поставку.

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
- `googlerpcStatus` — see [../common-types/googlerpcstatus.md](../common-types/googlerpcstatus.md)- `v1CargoesCreateRequest` — see [../common-types/v1cargoescreaterequest.md](../common-types/v1cargoescreaterequest.md)- `v1CargoesCreateResponse` — see [../common-types/v1cargoescreateresponse.md](../common-types/v1cargoescreateresponse.md)
## POST /v1/cargoes/create/info

**Summary:** Получить информацию по установке грузомест

**operationId:** `CargoesAPI_CargoesCreateInfo`

Используйте метод, чтобы получить информацию по установленным грузоместам.

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
- `googlerpcStatus` — see [../common-types/googlerpcstatus.md](../common-types/googlerpcstatus.md)- `v1CargoesCreateInfoRequest` — see [../common-types/v1cargoescreateinforequest.md](../common-types/v1cargoescreateinforequest.md)- `v1CargoesCreateInfoResponse` — see [../common-types/v1cargoescreateinforesponse.md](../common-types/v1cargoescreateinforesponse.md)
## POST /v1/cargoes/delete

**Summary:** Удалить грузоместо в заявке на поставку

**operationId:** `CargoesAPI_CargoesDelete`

Метод для удаления грузомест в заявке на поставку.

Чтобы проверить статус удаления, используйте метод [/v1/cargoes/delete/status](#operation/CargoesAPI_CargoesDeleteStatus).

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
- `googlerpcStatus` — see [../common-types/googlerpcstatus.md](../common-types/googlerpcstatus.md)- `v1CargoesDeleteRequest` — see [../common-types/v1cargoesdeleterequest.md](../common-types/v1cargoesdeleterequest.md)- `v1CargoesDeleteResponse` — see [../common-types/v1cargoesdeleteresponse.md](../common-types/v1cargoesdeleteresponse.md)
## POST /v1/cargoes/delete/status

**Summary:** Информация о статусе удаления грузоместа

**operationId:** `CargoesAPI_CargoesDeleteStatus`

Метод для получения статуса удаления грузомест в заявке на поставку.

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
- `googlerpcStatus` — see [../common-types/googlerpcstatus.md](../common-types/googlerpcstatus.md)- `v1CargoesDeleteStatusRequest` — see [../common-types/v1cargoesdeletestatusrequest.md](../common-types/v1cargoesdeletestatusrequest.md)- `v1CargoesDeleteStatusResponse` — see [../common-types/v1cargoesdeletestatusresponse.md](../common-types/v1cargoesdeletestatusresponse.md)
