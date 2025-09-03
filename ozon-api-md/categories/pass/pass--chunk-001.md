# Pass

## POST /v1/carriage/pass/create

**Summary:** Создать пропуск

**operationId:** `carriagePassCreate`

Идентификатор созданного пропуска добавится к перевозке.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `sellerSellerAPIArrivalPassCreateRequest` — see [../common-types/sellersellerapiarrivalpasscreaterequest.md](../common-types/sellersellerapiarrivalpasscreaterequest.md)- `sellerSellerAPIArrivalPassCreateResponse` — see [../common-types/sellersellerapiarrivalpasscreateresponse.md](../common-types/sellersellerapiarrivalpasscreateresponse.md)
## POST /v1/carriage/pass/delete

**Summary:** Удалить пропуск

**operationId:** `carriagePassDelete`

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `sellerSellerAPIArrivalPassDeleteRequest` — see [../common-types/sellersellerapiarrivalpassdeleterequest.md](../common-types/sellersellerapiarrivalpassdeleterequest.md)
## POST /v1/carriage/pass/update

**Summary:** Обновить пропуск

**operationId:** `carriagePassUpdate`

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `sellerSellerAPIArrivalPassUpdateRequest` — see [../common-types/sellersellerapiarrivalpassupdaterequest.md](../common-types/sellersellerapiarrivalpassupdaterequest.md)
## POST /v1/pass/list

**Summary:** Список пропусков

**operationId:** `PassList`

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
- `arrivalpassArrivalPassListRequest` — see [../common-types/arrivalpassarrivalpasslistrequest.md](../common-types/arrivalpassarrivalpasslistrequest.md)- `arrivalpassArrivalPassListResponse` — see [../common-types/arrivalpassarrivalpasslistresponse.md](../common-types/arrivalpassarrivalpasslistresponse.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)
## POST /v1/return/pass/create

**Summary:** Создать пропуск для возврата

**operationId:** `returnPassCreate`

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
- `arrivalpassArrivalPassCreateRequest` — see [../common-types/arrivalpassarrivalpasscreaterequest.md](../common-types/arrivalpassarrivalpasscreaterequest.md)- `arrivalpassArrivalPassCreateResponse` — see [../common-types/arrivalpassarrivalpasscreateresponse.md](../common-types/arrivalpassarrivalpasscreateresponse.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)
## POST /v1/return/pass/delete

**Summary:** Удалить пропуск для возврата

**operationId:** `returnPassDelete`

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
- `arrivalpassArrivalPassDeleteRequest` — see [../common-types/arrivalpassarrivalpassdeleterequest.md](../common-types/arrivalpassarrivalpassdeleterequest.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)
## POST /v1/return/pass/update

**Summary:** Обновить пропуск для возврата

**operationId:** `returnPassUpdate`

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
- `arrivalpassArrivalPassUpdateRequest` — see [../common-types/arrivalpassarrivalpassupdaterequest.md](../common-types/arrivalpassarrivalpassupdaterequest.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)
