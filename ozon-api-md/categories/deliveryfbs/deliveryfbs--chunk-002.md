# DeliveryFBS

## POST /v1/carriage/set-postings

**Summary:** Изменение состава отгрузки

**operationId:** `CarriageAPI_SetPostings`

&lt;aside class="warning"&gt;
Метод недоступен для продавцов из СНГ. &lt;br&gt;

Полностью перезаписывает список заказов в отгрузке. Передавайте только те заказы, которые находятся в статусе &lt;code&gt;Ожидает отгрузки&lt;/code&gt;, и вы готовы их отгрузить.    
&lt;/aside&gt;

&lt;br&gt;

&lt;aside class="notice"&gt;
Чтобы вернуться к списку заказов, удалите отгрузку с помощью метода &lt;a href="#operation/CarriageAPI_CarriageCancel"&gt;/v1/carriage/cancel&lt;/a&gt;, и создайте новую.
&lt;/aside&gt;

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1SetPostingsRequest` — see [../common-types/v1setpostingsrequest.md](../common-types/v1setpostingsrequest.md)- `v1SetPostingsResponse` — see [../common-types/v1setpostingsresponse.md](../common-types/v1setpostingsresponse.md)
## POST /v1/posting/carriage-available/list

**Summary:** Список доступных перевозок

**operationId:** `PostingAPI_GetCarriageAvailableList`

Метод для получения перевозок, по которым нужно распечатать штрихкод для отгрузки и документы:
- для продацов из России — лист отгрузки и транспортную накладную;
- для продавцов из СНГ — акт и транспортную накладную.

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
- `postingv1GetCarriageAvailableListRequest` — see [../common-types/postingv1getcarriageavailablelistrequest.md](../common-types/postingv1getcarriageavailablelistrequest.md)- `postingv1GetCarriageAvailableListResponse` — see [../common-types/postingv1getcarriageavailablelistresponse.md](../common-types/postingv1getcarriageavailablelistresponse.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)
## POST /v1/posting/fbs/split

**Summary:** Разделить заказ на отправления без сборки

**operationId:** `FbsSplit`

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1PostingFbsSplitResponse` — see [../common-types/v1postingfbssplitresponse.md](../common-types/v1postingfbssplitresponse.md)
## POST /v2/posting/fbs/act/check-status

**Summary:** Статус отгрузки и документов

**operationId:** `PostingAPI_PostingFBSActCheckStatus`

Возвращает статус формирования штрихкода для отгрузки и документов:
- для продавцов из России — транспортной накладной и листа отгрузки;
- для продавцов из СНГ — транспортной накладной и акта приёма-передачи.

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
- `postingPostingFBSActCheckStatusRequest` — see [../common-types/postingpostingfbsactcheckstatusrequest.md](../common-types/postingpostingfbsactcheckstatusrequest.md)- `postingPostingFBSActCheckStatusResponse` — see [../common-types/postingpostingfbsactcheckstatusresponse.md](../common-types/postingpostingfbsactcheckstatusresponse.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)
## POST /v2/posting/fbs/act/create

**Summary:** Подтвердить отгрузку и создать документы

**operationId:** `PostingAPI_PostingFBSActCreate`

Подтверждает отгрузку и запускает формирование транспортной накладной и штрихкода для отгрузки.
Для продавцов из России также запускается формирование листа отгрузки, а для продавцов из СНГ — акта приёма-передачи.

Чтобы сформировать и получить документы, переведите отправление в статус `awaiting_deliver`.

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
- `postingPostingFBSActCreateRequest` — see [../common-types/postingpostingfbsactcreaterequest.md](../common-types/postingpostingfbsactcreaterequest.md)- `postingPostingFBSActCreateResponse` — see [../common-types/postingpostingfbsactcreateresponse.md](../common-types/postingpostingfbsactcreateresponse.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)
## POST /v2/posting/fbs/act/get-barcode

**Summary:** Штрихкод для отгрузки отправления

**operationId:** `PostingAPI_PostingFBSGetBarcode`

Метод для получения штрихкода, который нужно показать в пункте выдачи или сортировочном центре при отгрузке отправления.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v2PostingFBSGetBarcodeRequest` — see [../common-types/v2postingfbsgetbarcoderequest.md](../common-types/v2postingfbsgetbarcoderequest.md)- `v2PostingFBSGetBarcodeResponse` — see [../common-types/v2postingfbsgetbarcoderesponse.md](../common-types/v2postingfbsgetbarcoderesponse.md)
