# ReturnAPI

## POST /v1/return/giveout/barcode

**Summary:** Значение штрихкода для возвратных отгрузок

**operationId:** `ReturnAPI_GiveoutGetBarcode`

Используйте этот метод, чтобы получить штрихкод из ответа методов [/v1/return/giveout/get-png](#operation/ReturnAPI_GiveoutGetPNG) и [/v1/return/giveout/get-pdf](#operation/ReturnAPI_GiveoutGetPDF) в текстовом виде.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1Empty` — see [../common-types/v1empty.md](../common-types/v1empty.md)- `v1GiveoutGetBarcodeResponse` — see [../common-types/v1giveoutgetbarcoderesponse.md](../common-types/v1giveoutgetbarcoderesponse.md)
## POST /v1/return/giveout/barcode-reset

**Summary:** Сгенерировать новый штрихкод

**operationId:** `ReturnAPI_GiveoutBarcodeReset`

Используйте метод, если ваш штрихкод попал в посторонние руки.

Метод возвращает PNG-файл с новым штрихкодом. После использования метода вы не сможете получить возвратную отгрузку по старым штрихкодам.
Чтобы получить новый штрихкод в PDF-формате, запросите его методом [/v1/return/giveout/get-pdf](#operation/ReturnAPI_GiveoutGetPDF).

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1Empty` — see [../common-types/v1empty.md](../common-types/v1empty.md)- `v1GiveoutBarcodeResetResponse` — see [../common-types/v1giveoutbarcoderesetresponse.md](../common-types/v1giveoutbarcoderesetresponse.md)
## POST /v1/return/giveout/get-pdf

**Summary:** Штрихкод для получения возвратной отгрузки в формате PDF

**operationId:** `ReturnAPI_GiveoutGetPDF`

Возвращает PDF-файл со штрихкодом. Метод работает только для схемы FBS.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1Empty` — see [../common-types/v1empty.md](../common-types/v1empty.md)- `v1GiveoutGetPDFResponse` — see [../common-types/v1giveoutgetpdfresponse.md](../common-types/v1giveoutgetpdfresponse.md)
## POST /v1/return/giveout/get-png

**Summary:** Штрихкод для получения возвратной отгрузки в формате PNG

**operationId:** `ReturnAPI_GiveoutGetPNG`

Возвращает PNG-файл со штрихкодом.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1Empty` — see [../common-types/v1empty.md](../common-types/v1empty.md)- `v1GiveoutGetPNGResponse` — see [../common-types/v1giveoutgetpngresponse.md](../common-types/v1giveoutgetpngresponse.md)
## POST /v1/return/giveout/info

**Summary:** Информация о возвратной отгрузке

**operationId:** `ReturnAPI_GiveoutInfo`

Метод для получения информации о возвратной отгрузке. 
В параметр `giveout_id` передаётся значение, полученное в методе [/v1/return/giveout/list](#operation/ReturnAPI_GiveoutList).

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1GiveoutInfoRequest` — see [../common-types/v1giveoutinforequest.md](../common-types/v1giveoutinforequest.md)- `v1GiveoutInfoResponse` — see [../common-types/v1giveoutinforesponse.md](../common-types/v1giveoutinforesponse.md)
## POST /v1/return/giveout/is-enabled

**Summary:** Проверить возможность получения возвратных отгрузок по штрихкоду

**operationId:** `ReturnAPI_GiveoutIsEnabled`

Если у вас есть доступ, в параметре `enabled` будет указано значение `true`.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1Empty` — see [../common-types/v1empty.md](../common-types/v1empty.md)- `v1GiveoutIsEnabledResponse` — see [../common-types/v1giveoutisenabledresponse.md](../common-types/v1giveoutisenabledresponse.md)
## POST /v1/return/giveout/list

**Summary:** Список возвратных отгрузок

**operationId:** `ReturnAPI_GiveoutList`

Метод для получения списка активных возвратов.
Возвратная отгрузка становится активной после сканирования штрихкода. 
После сканирования штрихкода второй раз активная выдача переходит в статус неактивной.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1GiveoutListRequest` — see [../common-types/v1giveoutlistrequest.md](../common-types/v1giveoutlistrequest.md)- `v1GiveoutListResponse` — see [../common-types/v1giveoutlistresponse.md](../common-types/v1giveoutlistresponse.md)
