# DeliveryFBS

## POST /v2/posting/fbs/digital/act/get-pdf

**Summary:** Получить лист отгрузки по перевозке

**operationId:** `PostingAPI_PostingFBSGetDigitalAct`

Вы можете получить документы, если в ответе метода [/v2/posting/fbs/digital/act/check-status](#operation/PostingAPI_PostingFBSDigitalActCheckStatus) был один из статусов:
- `FORMED` — перевозка сформирована успешно,
- `CONFIRMED` — перевозка подтверждена Ozon,
- `CONFIRMED_WITH_MISMATCH` — перевозка принята Ozon с расхождениями.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v2PostingFBSGetDigitalActRequest` — see [../common-types/v2postingfbsgetdigitalactrequest.md](../common-types/v2postingfbsgetdigitalactrequest.md)- `v2PostingFBSGetDigitalActResponse` — see [../common-types/v2postingfbsgetdigitalactresponse.md](../common-types/v2postingfbsgetdigitalactresponse.md)
