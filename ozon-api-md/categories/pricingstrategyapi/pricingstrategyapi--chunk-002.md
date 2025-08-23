# PricingStrategyAPI

## POST /v1/pricing-strategy/status

**Summary:** Изменить статус стратегии

**operationId:** `pricing_status`

Можно изменить статус любой стратегии кроме системной.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1Empty` — see [../common-types/v1empty.md](../common-types/v1empty.md)- `v1UpdateStatusStrategyRequest` — see [../common-types/v1updatestatusstrategyrequest.md](../common-types/v1updatestatusstrategyrequest.md)
## POST /v1/pricing-strategy/strategy-ids-by-product-ids

**Summary:** Список идентификаторов стратегий

**operationId:** `pricing_ids`

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1GetStrategyIDsByItemIDsResponse` — see [../common-types/v1getstrategyidsbyitemidsresponse.md](../common-types/v1getstrategyidsbyitemidsresponse.md)
## POST /v1/pricing-strategy/update

**Summary:** Обновить стратегию

**operationId:** `pricing_update`

Можно обновить все стратегии кроме системной.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1Empty` — see [../common-types/v1empty.md](../common-types/v1empty.md)- `v1UpdatePricingStrategyRequest` — see [../common-types/v1updatepricingstrategyrequest.md](../common-types/v1updatepricingstrategyrequest.md)
