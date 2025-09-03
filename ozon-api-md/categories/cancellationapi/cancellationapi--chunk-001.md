# CancellationAPI

## POST /v1/conditional-cancellation/approve

**Summary:** Подтвердить заявку на отмену rFBS

**operationId:** `CancellationAPI_ConditionalCancellationApprove`

&lt;aside class="warning"&gt;
3 августа 2025 года метод будет отключён. Переключитесь на &lt;a href="#operation/CancellationAPI_ConditionalCancellationApproveV2"&gt;/v2/conditional-cancellation/approve&lt;/a&gt;.
&lt;/aside&gt;

Метод позволяет согласовать заявку на отмену в статусе `ON_APPROVAL`. Метод применим для rFBS-заказов. Заказ будет отменён, а деньги вернутся покупателю.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1ConditionalCancellationMoveRequest` — see [../common-types/v1conditionalcancellationmoverequest.md](../common-types/v1conditionalcancellationmoverequest.md)- `v1Empty` — see [../common-types/v1empty.md](../common-types/v1empty.md)
## POST /v1/conditional-cancellation/get

**Summary:** Получить информацию о заявке на отмену rFBS

**operationId:** `CancellationAPI_GetConditionalCancellation`

&lt;aside class="warning"&gt;
3 августа 2025 года метод будет отключён. Переключитесь на &lt;a href="#operation/CancellationAPI_GetConditionalCancellationListV2"&gt;/v2/conditional-cancellation/list&lt;/a&gt;.
&lt;/aside&gt;

Метод для получения информации о заявке на отмену rFBS-заказа.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1GetConditionalCancellationRequest` — see [../common-types/v1getconditionalcancellationrequest.md](../common-types/v1getconditionalcancellationrequest.md)- `v1GetConditionalCancellationResponse` — see [../common-types/v1getconditionalcancellationresponse.md](../common-types/v1getconditionalcancellationresponse.md)
## POST /v1/conditional-cancellation/list

**Summary:** Получить список заявок на отмену rFBS

**operationId:** `CancellationAPI_GetConditionalCancellationList`

&lt;aside class="warning"&gt;
3 августа 2025 года метод будет отключён. Переключитесь на &lt;a href="#operation/CancellationAPI_GetConditionalCancellationListV2"&gt;/v2/conditional-cancellation/list&lt;/a&gt;.
&lt;/aside&gt;

Метод для получения списка заявок на отмену rFBS-заказов.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1GetConditionalCancellationListRequest` — see [../common-types/v1getconditionalcancellationlistrequest.md](../common-types/v1getconditionalcancellationlistrequest.md)- `v1GetConditionalCancellationListResponse` — see [../common-types/v1getconditionalcancellationlistresponse.md](../common-types/v1getconditionalcancellationlistresponse.md)
## POST /v1/conditional-cancellation/reject

**Summary:** Отклонить заявку на отмену rFBS

**operationId:** `CancellationAPI_ConditionalCancellationReject`

&lt;aside class="warning"&gt;
3 августа 2025 года метод будет отключён. Переключитесь на &lt;a href="#operation/CancellationAPI_ConditionalCancellationRejectV2"&gt;/v2/conditional-cancellation/reject&lt;/a&gt;.
&lt;/aside&gt;

Метод позволяет отклонить заявку на отмену в статусе `ON_APPROVAL`. Метод применим для rFBS-заказов. Объясните своё решение в параметре `comment`. 

Заказ останется в том же статусе, и его нужно будет доставить покупателю.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1ConditionalCancellationMoveRequest` — see [../common-types/v1conditionalcancellationmoverequest.md](../common-types/v1conditionalcancellationmoverequest.md)- `v1Empty` — see [../common-types/v1empty.md](../common-types/v1empty.md)
## POST /v2/conditional-cancellation/approve

**Summary:** Подтвердить заявку на отмену rFBS

**operationId:** `CancellationAPI_ConditionalCancellationApproveV2`

Метод позволяет согласовать заявку на отмену в статусе `ON_APPROVAL`. Заказ будет отменён, а деньги вернутся покупателю.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)
