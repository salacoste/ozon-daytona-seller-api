# FBS

## POST /v1/posting/fbs/cancel-reason

**Summary:** Причины отмены отправления

**operationId:** `PostingAPI_GetPostingFbsCancelReasonV1`

Возвращает список причин отмены для конкретных отправлений.

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
- `postingCancelReasonRequest` — see [../common-types/postingcancelreasonrequest.md](../common-types/postingcancelreasonrequest.md)- `postingCancelReasonResponse` — see [../common-types/postingcancelreasonresponse.md](../common-types/postingcancelreasonresponse.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)
## POST /v1/posting/fbs/package-label/create

**Summary:** Создать задание на выгрузку этикеток

**operationId:** `PostingAPI_CreateLabelBatch`

&lt;aside class="warning"&gt;
В будущем метод будет отключён. Мы предупредим вас об этом за месяц. Переключитесь на &lt;a href="#operation/PostingAPI_CreateLabelBatchV2"&gt;/v2/posting/fbs/package-label/create&lt;/a&gt;.
&lt;/aside&gt;

Метод для создания задания на асинхронное формирование этикеток.

Для получения этикеток, созданных в результате вызова метода, используйте [/v1/posting/fbs/package-label/get](#operation/PostingAPI_GetLabelBatch).

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1CreateLabelBatchRequest` — see [../common-types/v1createlabelbatchrequest.md](../common-types/v1createlabelbatchrequest.md)- `v1CreateLabelBatchResponse` — see [../common-types/v1createlabelbatchresponse.md](../common-types/v1createlabelbatchresponse.md)
## POST /v1/posting/fbs/package-label/get

**Summary:** Получить файл с этикетками

**operationId:** `PostingAPI_GetLabelBatch`

Метод для получения этикеток после вызова [/v1/posting/fbs/package-label/create](#operation/PostingAPI_CreateLabelBatch).

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1GetLabelBatchRequest` — see [../common-types/v1getlabelbatchrequest.md](../common-types/v1getlabelbatchrequest.md)- `v1GetLabelBatchResponse` — see [../common-types/v1getlabelbatchresponse.md](../common-types/v1getlabelbatchresponse.md)
## POST /v1/posting/fbs/pick-up-code/verify

**Summary:** Проверить код курьера

**operationId:** `PostingAPI_PostingFBSPickupCodeVerify`

Метод позволяет проверить код курьера при передаче отправлений realFBS Express. Подробнее о передаче отправлений в [Базе знаний продавца](https://seller-edu.ozon.ru/contract-for-sellers/regulations-fbs-realfbs/reglament-prodaji-so-svoego-sklada-fbs-express#7-порядок-передачи-отправлении-через-партнёров-ozon-при-экспресс-доставке).

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1PostingFBSPickupCodeVerifyRequest` — see [../common-types/v1postingfbspickupcodeverifyrequest.md](../common-types/v1postingfbspickupcodeverifyrequest.md)- `v1PostingFBSPickupCodeVerifyResponse` — see [../common-types/v1postingfbspickupcodeverifyresponse.md](../common-types/v1postingfbspickupcodeverifyresponse.md)
## POST /v1/posting/fbs/restrictions

**Summary:** Получить ограничения пункта приёма

**operationId:** `PostingAPI_GetRestrictions`

Метод для получения габаритных, весовых и прочих ограничений пункта приёма по номеру отправления. Метод применим только для работы по схеме FBS.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1GetRestrictionsRequest` — see [../common-types/v1getrestrictionsrequest.md](../common-types/v1getrestrictionsrequest.md)- `v1GetRestrictionsResponse` — see [../common-types/v1getrestrictionsresponse.md](../common-types/v1getrestrictionsresponse.md)
## POST /v1/posting/global/etgb

**Summary:** Таможенные декларации ETGB

**operationId:** `PostingAPI_GetEtgb`

Метод для получения таможенных деклараций Elektronik Ticaret Gümrük Beyannamesi (ETGB) для продавцов из Турции.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1GetEtgbRequest` — see [../common-types/v1getetgbrequest.md](../common-types/v1getetgbrequest.md)- `v1GetEtgbResponse` — see [../common-types/v1getetgbresponse.md](../common-types/v1getetgbresponse.md)
