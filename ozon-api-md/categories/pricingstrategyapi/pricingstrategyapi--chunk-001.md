# PricingStrategyAPI

## POST /v1/pricing-strategy/competitors/list

**Summary:** Список конкурентов

**operationId:** `pricing_competitors`

Метод для получения списка конкурентов — продавцов с похожими товарами в других интернет-магазинах и маркетплейсах.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1GetCompetitorsRequest` — see [../common-types/v1getcompetitorsrequest.md](../common-types/v1getcompetitorsrequest.md)- `v1GetCompetitorsResponse` — see [../common-types/v1getcompetitorsresponse.md](../common-types/v1getcompetitorsresponse.md)
## POST /v1/pricing-strategy/create

**Summary:** Создать стратегию

**operationId:** `pricing_create`

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1CreatePricingStrategyRequest` — see [../common-types/v1createpricingstrategyrequest.md](../common-types/v1createpricingstrategyrequest.md)- `v1CreatePricingStrategyResponse` — see [../common-types/v1createpricingstrategyresponse.md](../common-types/v1createpricingstrategyresponse.md)
## POST /v1/pricing-strategy/delete

**Summary:** Удалить стратегию

**operationId:** `pricing_delete`

Можно удалить любую стратегию кроме системной.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1Empty` — see [../common-types/v1empty.md](../common-types/v1empty.md)
## POST /v1/pricing-strategy/info

**Summary:** Информация о стратегии

**operationId:** `pricing_info`

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1GetStrategyResponse` — see [../common-types/v1getstrategyresponse.md](../common-types/v1getstrategyresponse.md)
## POST /v1/pricing-strategy/list

**Summary:** Список стратегий

**operationId:** `pricing_list`

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1GetStrategyListRequest` — see [../common-types/v1getstrategylistrequest.md](../common-types/v1getstrategylistrequest.md)- `v1GetStrategyListResponse` — see [../common-types/v1getstrategylistresponse.md](../common-types/v1getstrategylistresponse.md)
## POST /v1/pricing-strategy/product/info

**Summary:** Цена товара у конкурента

**operationId:** `pricing_items-info`

Если вы добавили товар в стратегию ценообразования, метод вернёт цену и ссылку на товар у конкурента.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1GetStrategyItemInfoRequest` — see [../common-types/v1getstrategyiteminforequest.md](../common-types/v1getstrategyiteminforequest.md)- `v1GetStrategyItemInfoResponse` — see [../common-types/v1getstrategyiteminforesponse.md](../common-types/v1getstrategyiteminforesponse.md)
## POST /v1/pricing-strategy/products/add

**Summary:** Добавить товары в стратегию

**operationId:** `pricing_items-add`

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1AddStrategyItemsRequest` — see [../common-types/v1addstrategyitemsrequest.md](../common-types/v1addstrategyitemsrequest.md)- `v1AddStrategyItemsResponse` — see [../common-types/v1addstrategyitemsresponse.md](../common-types/v1addstrategyitemsresponse.md)
## POST /v1/pricing-strategy/products/delete

**Summary:** Удалить товары из стратегии

**operationId:** `pricing_items-delete`

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1DeleteStrategyItemsResponse` — see [../common-types/v1deletestrategyitemsresponse.md](../common-types/v1deletestrategyitemsresponse.md)
## POST /v1/pricing-strategy/products/list

**Summary:** Список товаров в стратегии

**operationId:** `pricing_items-list`

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1GetStrategyItemsResponse` — see [../common-types/v1getstrategyitemsresponse.md](../common-types/v1getstrategyitemsresponse.md)
