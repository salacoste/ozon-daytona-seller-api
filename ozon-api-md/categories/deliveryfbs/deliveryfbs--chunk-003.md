# DeliveryFBS

## POST /v2/posting/fbs/act/get-barcode/text

**Summary:** Значение штрихкода для отгрузки отправления

**operationId:** `PostingAPI_PostingFBSGetBarcodeText`

Используйте этот метод, чтобы получить штрихкод из ответа
[/v2/posting/fbs/act/get-barcode](#operation/PostingAPI_PostingFBSGetBarcode) в текстовом виде.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v2PostingFBSGetBarcodeRequest` — see [../common-types/v2postingfbsgetbarcoderequest.md](../common-types/v2postingfbsgetbarcoderequest.md)- `v2PostingFBSGetBarcodeTextResponse` — see [../common-types/v2postingfbsgetbarcodetextresponse.md](../common-types/v2postingfbsgetbarcodetextresponse.md)
## POST /v2/posting/fbs/act/get-container-labels

**Summary:** Этикетки для грузового места

**operationId:** `PostingAPI_PostingFBSActGetContainerLabels`

Метод создает этикетки для грузового места.

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
- `postingPostingFBSActGetContainerLabelsRequest` — see [../common-types/postingpostingfbsactgetcontainerlabelsrequest.md](../common-types/postingpostingfbsactgetcontainerlabelsrequest.md)- `postingPostingFBSActGetContainerLabelsResponse` — see [../common-types/postingpostingfbsactgetcontainerlabelsresponse.md](../common-types/postingpostingfbsactgetcontainerlabelsresponse.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)
## POST /v2/posting/fbs/act/get-pdf

**Summary:** Получить PDF c документами

**operationId:** `PostingAPI_PostingFBSGetAct`

С помощью метода можно получить:
- продацам из России — лист отгрузки и транспортную накладную;
- продавцам из СНГ — акт и транспортную накладную.

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
- `postingPostingFBSGetActRequest` — see [../common-types/postingpostingfbsgetactrequest.md](../common-types/postingpostingfbsgetactrequest.md)- `postingPostingFBSGetActResponse` — see [../common-types/postingpostingfbsgetactresponse.md](../common-types/postingpostingfbsgetactresponse.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)
## POST /v2/posting/fbs/act/get-postings

**Summary:** Список отправлений в акте

**operationId:** `PostingAPI_ActPostingList`

Возвращает список отправлений в акте по его идентификатору.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v2PostingFBSActGetPostingsRequest` — see [../common-types/v2postingfbsactgetpostingsrequest.md](../common-types/v2postingfbsactgetpostingsrequest.md)- `v2PostingFBSActGetPostingsResponse` — see [../common-types/v2postingfbsactgetpostingsresponse.md](../common-types/v2postingfbsactgetpostingsresponse.md)
## POST /v2/posting/fbs/act/list

**Summary:** Список актов по отгрузкам

**operationId:** `PostingAPI_FbsActList`

Возвращает список актов по отгрузкам с возможностью отфильтровать отгрузки по периоду, статусу и типу интеграции.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v2PostingFBSActListRequest` — see [../common-types/v2postingfbsactlistrequest.md](../common-types/v2postingfbsactlistrequest.md)- `v2PostingFBSActListResponse` — see [../common-types/v2postingfbsactlistresponse.md](../common-types/v2postingfbsactlistresponse.md)
## POST /v2/posting/fbs/digital/act/check-status

**Summary:** Статус формирования накладной

**operationId:** `PostingAPI_PostingFBSDigitalActCheckStatus`

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v2PostingFBSDigitalActCheckStatusRequest` — see [../common-types/v2postingfbsdigitalactcheckstatusrequest.md](../common-types/v2postingfbsdigitalactcheckstatusrequest.md)- `v2PostingFBSDigitalActCheckStatusResponse` — see [../common-types/v2postingfbsdigitalactcheckstatusresponse.md](../common-types/v2postingfbsdigitalactcheckstatusresponse.md)
