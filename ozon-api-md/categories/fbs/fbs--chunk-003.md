# FBS

## POST /v2/posting/fbs/package-label

**Summary:** Напечатать этикетку

**operationId:** `PostingAPI_PostingFBSPackageLabel`

&lt;aside class="warning"&gt;
Если вы работаете по схеме rFBS или rFBS Express, изучите процесс печати этикетки в &lt;a href="https://seller-edu.ozon.ru/rfbs/scheme-of-work"&gt;Базе знаний продавца&lt;/a&gt;.
&lt;/aside&gt;

Генерирует PDF-файл с этикетками для указанных отправлений. В одном запросе можно передать не больше 20 идентификаторов. Если хотя бы для одного отправления возникнет ошибка, этикетки не будут подготовлены для всех отправлений в запросе.

Рекомендуем запрашивать этикетки через 45–60 секунд после сборки заказа.

Ошибка `The next postings aren't ready` означает, что этикетки ещё не готовы, повторите запрос позднее.

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
- `postingPostingFBSPackageLabelRequest` — see [../common-types/postingpostingfbspackagelabelrequest.md](../common-types/postingpostingfbspackagelabelrequest.md)- `postingPostingFBSPackageLabelResponse` — see [../common-types/postingpostingfbspackagelabelresponse.md](../common-types/postingpostingfbspackagelabelresponse.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)
## POST /v2/posting/fbs/package-label/create

**Summary:** Создать задание на формирование этикеток

**operationId:** `PostingAPI_CreateLabelBatchV2`

Метод для создания задания на асинхронное формирование этикеток.
Метод может вернуть несколько заданий: на формирование маленькой и большой этикетки.

Чтобы получить созданные этикетки, используйте [/v1/posting/fbs/package-label/get](#operation/PostingAPI_GetLabelBatch).

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1CreateLabelBatchRequest` — see [../common-types/v1createlabelbatchrequest.md](../common-types/v1createlabelbatchrequest.md)- `v2CreateLabelBatchResponse` — see [../common-types/v2createlabelbatchresponse.md](../common-types/v2createlabelbatchresponse.md)
## POST /v2/posting/fbs/product/cancel

**Summary:** Отменить отправку некоторых товаров в отправлении

**operationId:** `PostingAPI_CancelFbsPostingProduct`

Используйте метод, если вы не можете отправить часть продуктов из отправления.

Чтобы получить идентификаторы причин отмены `cancel_reason_id` при работе по схемам FBS или rFBS, используйте метод [/v2/posting/fbs/cancel-reason/list](#operation/PostingAPI_GetPostingFbsCancelReasonList).

Условно-доставленные отправления отменить нельзя.

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
- `postingPostingProductCancelRequest` — see [../common-types/postingpostingproductcancelrequest.md](../common-types/postingpostingproductcancelrequest.md)- `postingPostingProductCancelResponse` — see [../common-types/postingpostingproductcancelresponse.md](../common-types/postingpostingproductcancelresponse.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)
## POST /v2/posting/fbs/product/change

**Summary:** Добавить вес для весовых товаров в отправлении

**operationId:** `PostingAPI_ChangeFbsPostingProduct`

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
- `postingPostingProductChangeRequest` — see [../common-types/postingpostingproductchangerequest.md](../common-types/postingpostingproductchangerequest.md)- `postingPostingProductChangeResponse` — see [../common-types/postingpostingproductchangeresponse.md](../common-types/postingpostingproductchangeresponse.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)
## POST /v2/posting/fbs/product/country/list

**Summary:** Список доступных стран-изготовителей

**operationId:** `PostingAPI_ListCountryProductFbsPostingV2`

Метод для получения списка доступных стран-изготовителей и их ISO кодов.

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
- `googlerpcStatus` — see [../common-types/googlerpcstatus.md](../common-types/googlerpcstatus.md)- `v2FbsPostingProductCountryListRequest` — see [../common-types/v2fbspostingproductcountrylistrequest.md](../common-types/v2fbspostingproductcountrylistrequest.md)- `v2FbsPostingProductCountryListResponse` — see [../common-types/v2fbspostingproductcountrylistresponse.md](../common-types/v2fbspostingproductcountrylistresponse.md)
