# Promos

## GET /v1/actions

**Summary:** Список акций

**operationId:** `Promos`

Метод для получения списка акций Ozon, в которых можно участвовать.

[Подробнее об акциях Ozon](https://seller-edu.ozon.ru/ceny-i-akcii/akcii-skidki-i-kupony/promo)

**Parameters (path/query/header/cookie):**
- none

**Request body (minimal valid example):**
_no request body_

**Success response (example):**
```json
{
  "result": "ok"
}
```

**Related schemas:**
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `seller_apiGetSellerActionsV1Response` — see [../common-types/seller-apigetselleractionsv1response.md](../common-types/seller-apigetselleractionsv1response.md)
## POST /v1/actions/candidates

**Summary:** Список доступных для акции товаров

**operationId:** `PromosCandidates`

Метод для получения списка товаров, которые могут участвовать в акции, по её идентификатору.
&lt;br&gt; 
&lt;aside class="warning"&gt;
С 5 мая 2025 параметр пагинации &lt;tt&gt;offset&lt;tt&gt; будет отключён. Переключитесь на параметр &lt;tt&gt;last_id&lt;tt&gt;.
&lt;/aside&gt;

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `seller_apiGetSellerProductV1Request` — see [../common-types/seller-apigetsellerproductv1request.md](../common-types/seller-apigetsellerproductv1request.md)- `seller_apiGetSellerProductV1Response` — see [../common-types/seller-apigetsellerproductv1response.md](../common-types/seller-apigetsellerproductv1response.md)
## POST /v1/actions/discounts-task/approve

**Summary:** Согласовать заявку на скидку

**operationId:** `promos_task_approve`

Вы можете согласовывать заявки в статусах: `NEW` — новые, `SEEN` — просмотренные.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1ApproveDeclineDiscountTasksResponse` — see [../common-types/v1approvedeclinediscounttasksresponse.md](../common-types/v1approvedeclinediscounttasksresponse.md)- `v1ApproveDiscountTasksRequest` — see [../common-types/v1approvediscounttasksrequest.md](../common-types/v1approvediscounttasksrequest.md)
## POST /v1/actions/discounts-task/decline

**Summary:** Отклонить заявку на скидку

**operationId:** `promos_task_decline`

Вы можете отклонить заявки в статусах: `NEW` — новые, `SEEN` — просмотренные.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1ApproveDeclineDiscountTasksResponse` — see [../common-types/v1approvedeclinediscounttasksresponse.md](../common-types/v1approvedeclinediscounttasksresponse.md)- `v1DeclineDiscountTasksRequest` — see [../common-types/v1declinediscounttasksrequest.md](../common-types/v1declinediscounttasksrequest.md)
## POST /v1/actions/discounts-task/list

**Summary:** Список заявок на скидку

**operationId:** `promos_task_list`

Метод для получения списка товаров, которые покупатели хотят купить со скидкой.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1GetDiscountTaskListRequest` — see [../common-types/v1getdiscounttasklistrequest.md](../common-types/v1getdiscounttasklistrequest.md)- `v1GetDiscountTaskListResponse` — see [../common-types/v1getdiscounttasklistresponse.md](../common-types/v1getdiscounttasklistresponse.md)
## POST /v1/actions/products

**Summary:** Список участвующих в акции товаров

**operationId:** `PromosProducts`

Метод для получения списка товаров, участвующих в акции, по её идентификатору.
&lt;br&gt; 
&lt;aside class="warning"&gt;
С 5 мая 2025 параметр пагинации &lt;tt&gt;offset&lt;tt&gt; будет отключён. Переключитесь на параметр &lt;tt&gt;last_id&lt;tt&gt;.
&lt;/aside&gt;

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `seller_apiGetSellerProductV1Request` — see [../common-types/seller-apigetsellerproductv1request.md](../common-types/seller-apigetsellerproductv1request.md)- `seller_apiGetSellerProductV1Response` — see [../common-types/seller-apigetsellerproductv1response.md](../common-types/seller-apigetsellerproductv1response.md)
## POST /v1/actions/products/activate

**Summary:** Добавить товар в акцию

**operationId:** `PromosProductsActivate`

Метод для добавления товаров в доступную акцию.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `seller_apiActivateProductV1Request` — see [../common-types/seller-apiactivateproductv1request.md](../common-types/seller-apiactivateproductv1request.md)- `seller_apiProductV1Response` — see [../common-types/seller-apiproductv1response.md](../common-types/seller-apiproductv1response.md)
