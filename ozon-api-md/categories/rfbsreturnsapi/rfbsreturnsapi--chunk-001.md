# RFBSReturnsAPI

## POST /v1/returns/rfbs/action/set

**Summary:** Передать доступные действия для rFBS возвратов

**operationId:** `ReturnsAPI_ReturnsRfbsActionSet`

Метод для передачи действий для возврата rFBS.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1ReturnsRfbsActionSetRequest` — see [../common-types/v1returnsrfbsactionsetrequest.md](../common-types/v1returnsrfbsactionsetrequest.md)
## POST /v2/returns/rfbs/compensate

**Summary:** Вернуть часть стоимости товара

**operationId:** `RFBSReturnsAPI_ReturnsRfbsCompensateV2`

&lt;aside class="warning"&gt;
В будущем метод будет отключён. Переключитесь на &lt;a href="#operation/ReturnsAPI_ReturnsRfbsActionSet"&gt;/v1/returns/rfbs/action/set&lt;/a&gt;.
&lt;/aside&gt;

Метод для частичной компенсации стоимости товара: вы возвращаете часть денег покупателю, товар остаётся у него.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1Empty` — see [../common-types/v1empty.md](../common-types/v1empty.md)- `v2ReturnsRfbsCompensateRequest` — see [../common-types/v2returnsrfbscompensaterequest.md](../common-types/v2returnsrfbscompensaterequest.md)
## POST /v2/returns/rfbs/get

**Summary:** Информация о заявке на возврат

**operationId:** `RFBSReturnsAPI_ReturnsRfbsGetV2`

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v2ReturnsRfbsGetRequest` — see [../common-types/v2returnsrfbsgetrequest.md](../common-types/v2returnsrfbsgetrequest.md)- `v2ReturnsRfbsGetResponse` — see [../common-types/v2returnsrfbsgetresponse.md](../common-types/v2returnsrfbsgetresponse.md)
## POST /v2/returns/rfbs/list

**Summary:** Список заявок на возврат

**operationId:** `RFBSReturnsAPI_ReturnsRfbsListV2`

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v2ReturnsRfbsListRequest` — see [../common-types/v2returnsrfbslistrequest.md](../common-types/v2returnsrfbslistrequest.md)- `v2ReturnsRfbsListResponse` — see [../common-types/v2returnsrfbslistresponse.md](../common-types/v2returnsrfbslistresponse.md)
## POST /v2/returns/rfbs/receive-return

**Summary:** Подтвердить получение товара на проверку

**operationId:** `RFBSReturnsAPI_ReturnsRfbsReceiveReturnV2`

&lt;aside class="warning"&gt;
  В будущем метод будет отключён. Переключитесь на &lt;a href="#operation/ReturnsAPI_ReturnsRfbsActionSet"&gt;/v1/returns/rfbs/action/set&lt;/a&gt;.
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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1Empty` — see [../common-types/v1empty.md](../common-types/v1empty.md)- `v2ReturnsRfbsReceiveReturnRequest` — see [../common-types/v2returnsrfbsreceivereturnrequest.md](../common-types/v2returnsrfbsreceivereturnrequest.md)
## POST /v2/returns/rfbs/reject

**Summary:** Отклонить заявку на возврат

**operationId:** `RFBSReturnsAPI_ReturnsRfbsRejectV2`

&lt;aside class="warning"&gt;
В будущем метод будет отключён. Переключитесь на &lt;a href="#operation/ReturnsAPI_ReturnsRfbsActionSet"&gt;/v1/returns/rfbs/action/set&lt;/a&gt;.
&lt;/aside&gt;

Метод позволяет отклонить заявку на возврат rFBS-заказа. Вы можете объяснить своё решение в параметре `comment`.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1Empty` — see [../common-types/v1empty.md](../common-types/v1empty.md)- `v2ReturnsRfbsRejectRequest` — see [../common-types/v2returnsrfbsrejectrequest.md](../common-types/v2returnsrfbsrejectrequest.md)
