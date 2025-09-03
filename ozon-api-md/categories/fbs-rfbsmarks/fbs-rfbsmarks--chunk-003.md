# FBS&rFBSMarks

## POST /v5/fbs/posting/product/exemplar/set

**Summary:** Проверить и сохранить данные экземпляров (версия 5)

**operationId:** `PostingAPI_FbsPostingProductExemplarSet`

Асинхронный метод:
- для проверки наличия экземпляров в обороте в системе «Честный ЗНАК»;
- для сохранения данных экземпляров. 

Используйте метод только для отправлений в статусе `awaiting_packaging`, иначе вы получите ошибку `INVALID_POSTING_STATE`.

Чтобы получить результаты проверок, используйте метод [/v4/fbs/posting/product/exemplar/status](#operation/PostingAPI_GetProductExemplarStatus). 
Для получения данных о созданных экземплярах, используйте метод [/v5/fbs/posting/product/exemplar/create-or-get](#operation/PostingAPI_FbsPostingProductExemplarCreateOrGet).

При необходимости укажите номер грузовой таможенной декларации в параметре `gtd`. 
Если его нет, передайте значение `is_gtd_absent = true`.

Если у вас несколько одинаковых товаров в отправлении, укажите один `product_id` и массив `exemplars` для каждого товара из отправления.

Всегда передавайте полный набор данных по экземплярам и продуктам. 

Например, в вашей системе 10 экземпляров. 
Вы передали их для проверки и сохранения. 
Потом добавили в своей системе ещё 60 экземпляров.
При повторной передаче экземпляров для проверки и сохранения укажите все экземпляры: и старые, и только что добавленные.

Отличие от [/v4/fbs/posting/product/exemplar/set](#operation/PostingAPI_SetProductExemplar) — вы можете передать в запросе больше информации по экземплярам.

Код ответа 200 не гарантирует, что данные об экземплярах приняты. 
Он указывает, что создана задача для добавления информации. 
Чтобы проверить статус задачи, используйте метод [/v4/fbs/posting/product/exemplar/status](#operation/PostingAPI_GetProductExemplarStatus).

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v5FbsPostingProductExemplarSetV5Request` — see [../common-types/v5fbspostingproductexemplarsetv5request.md](../common-types/v5fbspostingproductexemplarsetv5request.md)- `v5FbsPostingProductExemplarSetV5Response` — see [../common-types/v5fbspostingproductexemplarsetv5response.md](../common-types/v5fbspostingproductexemplarsetv5response.md)
## POST /v5/fbs/posting/product/exemplar/status

**Summary:** Получить статус добавления экземпляров

**operationId:** `PostingAPI_FbsPostingProductExemplarStatusV5`

Метод для получения статусов добавления экземпляров, переданных в методе [/v6/fbs/posting/product/exemplar/set](PostingAPI_FbsPostingProductExemplarSetV6). Также возвращает данные по этим экземплярам.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v5FbsPostingProductExemplarStatusV5Request` — see [../common-types/v5fbspostingproductexemplarstatusv5request.md](../common-types/v5fbspostingproductexemplarstatusv5request.md)- `v5FbsPostingProductExemplarStatusV5Response` — see [../common-types/v5fbspostingproductexemplarstatusv5response.md](../common-types/v5fbspostingproductexemplarstatusv5response.md)
## POST /v5/fbs/posting/product/exemplar/validate

**Summary:** Валидация кодов маркировки

**operationId:** `PostingAPI_FbsPostingProductExemplarValidateV5`

Метод для проверки кодов на соответствие требованиям системы «Честный ЗНАК» по количеству и составу символов.

Если у вас нет номера грузовой таможенной декларации (ГТД), вы можете его не указывать.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v5FbsPostingProductExemplarValidateV5Request` — see [../common-types/v5fbspostingproductexemplarvalidatev5request.md](../common-types/v5fbspostingproductexemplarvalidatev5request.md)- `v5FbsPostingProductExemplarValidateV5Response` — see [../common-types/v5fbspostingproductexemplarvalidatev5response.md](../common-types/v5fbspostingproductexemplarvalidatev5response.md)
## POST /v6/fbs/posting/product/exemplar/create-or-get

**Summary:** Получить данные созданных экземпляров

**operationId:** `PostingAPI_FbsPostingProductExemplarCreateOrGetV6`

Метод для получения информации по экземплярам товаров из отправления, переданных в методе [/v6/fbs/posting/product/exemplar/set](#operation/PostingAPI_FbsPostingProductExemplarSetV6).

Используйте метод для получения `exemplar_id`.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v6FbsPostingProductExemplarCreateOrGetV6Request` — see [../common-types/v6fbspostingproductexemplarcreateorgetv6request.md](../common-types/v6fbspostingproductexemplarcreateorgetv6request.md)- `v6FbsPostingProductExemplarCreateOrGetV6Response` — see [../common-types/v6fbspostingproductexemplarcreateorgetv6response.md](../common-types/v6fbspostingproductexemplarcreateorgetv6response.md)
