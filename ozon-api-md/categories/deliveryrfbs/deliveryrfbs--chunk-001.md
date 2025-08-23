# DeliveryrFBS

## POST /v1/posting/cutoff/set

**Summary:** Уточнить дату отгрузки отправления

**operationId:** `PostingAPI_SetPostingCutoff`

Метод для отправлений, которые доставляет продавец или неинтегрированный перевозчик.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1SetPostingCutoffRequest` — see [../common-types/v1setpostingcutoffrequest.md](../common-types/v1setpostingcutoffrequest.md)- `v1SetPostingCutoffResponse` — see [../common-types/v1setpostingcutoffresponse.md](../common-types/v1setpostingcutoffresponse.md)
## POST /v1/posting/fbs/timeslot/change-restrictions

**Summary:** Доступные даты для переноса доставки

**operationId:** `PostingAPI_PostingTimeslotChangeRestrictions`

Метод для получения доступных дат для переноса доставки и количества доступных переносов.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1PostingFbsTimeslotChangeRestrictionsRequest` — see [../common-types/v1postingfbstimeslotchangerestrictionsrequest.md](../common-types/v1postingfbstimeslotchangerestrictionsrequest.md)- `v1PostingFbsTimeslotChangeRestrictionsResponse` — see [../common-types/v1postingfbstimeslotchangerestrictionsresponse.md](../common-types/v1postingfbstimeslotchangerestrictionsresponse.md)
## POST /v1/posting/fbs/timeslot/set

**Summary:** Перенести дату доставки

**operationId:** `PostingAPI_SetPostingTimeslot`

Вы можете изменить дату доставки отправления не больше двух раз.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1PostingFbsTimeslotSetRequest` — see [../common-types/v1postingfbstimeslotsetrequest.md](../common-types/v1postingfbstimeslotsetrequest.md)- `v1PostingFbsTimeslotSetResponse` — see [../common-types/v1postingfbstimeslotsetresponse.md](../common-types/v1postingfbstimeslotsetresponse.md)
## POST /v2/fbs/posting/delivered

**Summary:** Изменить статус на «Доставлено»

**operationId:** `PostingAPI_FbsPostingDelivered`

Перевести отправление в статус «Доставлено», если используется сторонняя служба доставки.

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
- `postingFbsPostingDeliveredRequest` — see [../common-types/postingfbspostingdeliveredrequest.md](../common-types/postingfbspostingdeliveredrequest.md)- `postingFbsPostingMoveStatusResponse` — see [../common-types/postingfbspostingmovestatusresponse.md](../common-types/postingfbspostingmovestatusresponse.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)
## POST /v2/fbs/posting/delivering

**Summary:** Изменить статус на «Доставляется»

**operationId:** `PostingAPI_FbsPostingDelivering`

Перевести отправление в статус «Доставляется», если используется сторонняя служба доставки.

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
- `postingFbsPostingDeliveringRequest` — see [../common-types/postingfbspostingdeliveringrequest.md](../common-types/postingfbspostingdeliveringrequest.md)- `postingFbsPostingMoveStatusResponse` — see [../common-types/postingfbspostingmovestatusresponse.md](../common-types/postingfbspostingmovestatusresponse.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)
## POST /v2/fbs/posting/last-mile

**Summary:** Изменить статус на «Последняя миля»

**operationId:** `PostingAPI_FbsPostingLastMile`

Перевести отправление в статус «Последняя миля», если используется сторонняя служба доставки.

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
- `postingFbsPostingLastMileRequest` — see [../common-types/postingfbspostinglastmilerequest.md](../common-types/postingfbspostinglastmilerequest.md)- `postingFbsPostingMoveStatusResponse` — see [../common-types/postingfbspostingmovestatusresponse.md](../common-types/postingfbspostingmovestatusresponse.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)
