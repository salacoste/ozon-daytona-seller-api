# RFBSReturnsAPI

## POST /v2/returns/rfbs/return-money

**Summary:** Вернуть деньги покупателю

**operationId:** `RFBSReturnsAPI_ReturnsRfbsReturnMoneyV2`

&lt;aside class="warning"&gt;
В будущем метод будет отключён. Переключитесь на &lt;a href="#operation/ReturnsAPI_ReturnsRfbsActionSet"&gt;/v1/returns/rfbs/action/set&lt;/a&gt;.
&lt;/aside&gt;

Метод подтверждает возврат полной стоимости товара.
Используйте метод, если согласны:
- сразу вернуть стоимость товара и оставить его покупателю;
- вернуть стоимость после получения и проверки товара.

Если товар оказался ненадлежащего качества или с браком, вы возмещаете покупателю стоимость пересылки товара.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1Empty` — see [../common-types/v1empty.md](../common-types/v1empty.md)- `v2ReturnsRfbsReturnMoneyRequest` — see [../common-types/v2returnsrfbsreturnmoneyrequest.md](../common-types/v2returnsrfbsreturnmoneyrequest.md)
## POST /v2/returns/rfbs/verify

**Summary:** Одобрить заявку на возврат

**operationId:** `RFBSReturnsAPI_ReturnsRfbsVerifyV2`

&lt;aside class="warning"&gt;
В будущем метод будет отключён. Переключитесь на &lt;a href="#operation/ReturnsAPI_ReturnsRfbsActionSet"&gt;/v1/returns/rfbs/action/set&lt;/a&gt;.
&lt;/aside&gt;

Метод позволяет одобрить заявку и согласиться на получение товара для проверки.

Подтвердите получение товара с помощью метода [/v2/returns/rfbs/receive-return](#operation/RFBSReturnsAPI_ReturnsRfbsReceiveReturnV2).

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1Empty` — see [../common-types/v1empty.md](../common-types/v1empty.md)- `v2ReturnsRfbsVerifyRequest` — see [../common-types/v2returnsrfbsverifyrequest.md](../common-types/v2returnsrfbsverifyrequest.md)
