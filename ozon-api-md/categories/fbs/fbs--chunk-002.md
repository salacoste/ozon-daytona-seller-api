# FBS

## POST /v1/posting/unpaid-legal/product/list

**Summary:** Список неоплаченных товаров, заказанных юридическими лицами

**operationId:** `PostingAPI_UnpaidLegalProductList`

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1PostingUnpaidLegalProductListRequest` — see [../common-types/v1postingunpaidlegalproductlistrequest.md](../common-types/v1postingunpaidlegalproductlistrequest.md)- `v1PostingUnpaidLegalProductListResponse` — see [../common-types/v1postingunpaidlegalproductlistresponse.md](../common-types/v1postingunpaidlegalproductlistresponse.md)
## POST /v2/posting/fbs/arbitration

**Summary:** Открыть спор по отправлению

**operationId:** `PostingAPI_MoveFbsPostingToArbitration`

Если отправление передано в доставку, но не просканировано в сортировочном центре, можно открыть спор. Открытый спор переведёт отправление в статус `arbitration`.

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
- `postingBooleanResponse` — see [../common-types/postingbooleanresponse.md](../common-types/postingbooleanresponse.md)- `postingMovePostingRequest` — see [../common-types/postingmovepostingrequest.md](../common-types/postingmovepostingrequest.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)
## POST /v2/posting/fbs/awaiting-delivery

**Summary:** Передать отправление к отгрузке

**operationId:** `PostingAPI_MoveFbsPostingToAwaitingDelivery`

Передает спорные заказы к отгрузке. Статус отправления изменится на `awaiting_deliver`.

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
- `postingBooleanResponse` — see [../common-types/postingbooleanresponse.md](../common-types/postingbooleanresponse.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v2MovePostingToAwaitingDeliveryRequest` — see [../common-types/v2movepostingtoawaitingdeliveryrequest.md](../common-types/v2movepostingtoawaitingdeliveryrequest.md)
## POST /v2/posting/fbs/cancel

**Summary:** Отменить отправление

**operationId:** `PostingAPI_CancelFbsPosting`

Меняет статус отправления на `cancelled`.

Перед началом работы проверьте причины отмены для конкретного отправления методом [/v1/posting/fbs/cancel-reason](#operation/PostingAPI_GetPostingFbsCancelReasonV1).

Условно-доставленные отправления отменить нельзя.

Если значение параметра `cancel_reason_id` — 402, заполните поле `cancel_reason_message`.

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
- `postingBooleanResponse` — see [../common-types/postingbooleanresponse.md](../common-types/postingbooleanresponse.md)- `postingCancelFbsPostingRequest` — see [../common-types/postingcancelfbspostingrequest.md](../common-types/postingcancelfbspostingrequest.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)
## POST /v2/posting/fbs/cancel-reason/list

**Summary:** Причины отмены отправлений

**operationId:** `PostingAPI_GetPostingFbsCancelReasonList`

Возвращает список причин отмены для всех отправлений.

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
- `postingCancelReasonListResponse` — see [../common-types/postingcancelreasonlistresponse.md](../common-types/postingcancelreasonlistresponse.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)
## POST /v2/posting/fbs/get-by-barcode

**Summary:** Получить информацию об отправлении по штрихкоду

**operationId:** `PostingAPI_GetFbsPostingByBarcode`

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
- `postingGetFbsPostingByBarcodeRequest` — see [../common-types/postinggetfbspostingbybarcoderequest.md](../common-types/postinggetfbspostingbybarcoderequest.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v2FbsPostingResponse` — see [../common-types/v2fbspostingresponse.md](../common-types/v2fbspostingresponse.md)
