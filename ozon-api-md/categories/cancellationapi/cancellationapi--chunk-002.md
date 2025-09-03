# CancellationAPI

## POST /v2/conditional-cancellation/list

**Summary:** Получить список заявок на отмену rFBS

**operationId:** `CancellationAPI_GetConditionalCancellationListV2`

Метод для получения списка заявок на отмену rFBS-заказов.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v2GetConditionalCancellationListV2Request` — see [../common-types/v2getconditionalcancellationlistv2request.md](../common-types/v2getconditionalcancellationlistv2request.md)- `v2GetConditionalCancellationListV2Response` — see [../common-types/v2getconditionalcancellationlistv2response.md](../common-types/v2getconditionalcancellationlistv2response.md)
## POST /v2/conditional-cancellation/reject

**Summary:** Отклонить заявку на отмену rFBS

**operationId:** `CancellationAPI_ConditionalCancellationRejectV2`

Метод позволяет отклонить заявку на отмену в статусе `ON_APPROVAL`. В параметре `comment` опишите причину. Заказ останется в том же статусе, и его нужно будет доставить покупателю.

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
