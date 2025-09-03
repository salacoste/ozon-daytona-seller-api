# FBS&rFBSMarks

## POST /v1/fbs/posting/product/exemplar/update

**Summary:** Обновить данные экземпляров

**operationId:** `PostingAPI_FbsPostingProductExemplarUpdate`

Используйте метод после передачи информации по экземплярам методом [/v6/fbs/posting/product/exemplar/set](#operation/PostingAPI_FbsPostingProductExemplarSetV6), чтобы сохранить обновлённые данные по экземплярам для отправлений в статусе «Ожидает отгрузки».

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1FbsPostingProductExemplarUpdateRequest` — see [../common-types/v1fbspostingproductexemplarupdaterequest.md](../common-types/v1fbspostingproductexemplarupdaterequest.md)
## POST /v4/fbs/posting/product/exemplar/set

**Summary:** Проверить и сохранить данные экземпляров

**operationId:** `PostingAPI_SetProductExemplar`

&lt;aside class="warning"&gt;
  В будущем метод будет отключён. Мы предупредим вас об этом за месяц в &lt;a href="https://dev.ozon.ru/"&gt;сообществе Ozon for Dev&lt;/a&gt; и &lt;a href="https://t.me/OZON_int"&gt;чате для разработчиков&lt;/a&gt;.

  Переключитесь на &lt;a href="#operation/PostingAPI_FbsPostingProductExemplarSet"&gt;/v5/fbs/posting/product/exemplar/set&lt;/a&gt;.
&lt;/aside&gt;

Асинхронный метод:
- для проверки наличия экземпляров в обороте в системе «Честный ЗНАК»;
- для сохранения данных экземпляров. 

Чтобы получить результаты проверок, используйте метод [/v4/fbs/posting/product/exemplar/status](#operation/PostingAPI_GetProductExemplarStatus).

При необходимости укажите номер грузовой таможенной декларации в параметре `gtd`. Если его нет, передайте значение `is_gtd_absent = true`.

Если у вас несколько одинаковых товаров в отправлении, укажите один `product_id` и массив `exemplars` для каждого товара из отправления.

Всегда передавайте полный набор данных по экземплярам и продуктам. 

Например, в вашей системе 10 экземпляров. Вы передали их для проверки и сохранения. Потом добавили в своей системе ещё 60 экземпляров.
При повторной передаче экземпляров для проверки и сохранения укажите все экземпляры: и старые, и только что добавленные.

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
- `fbsv4SetProductExemplarRequest` — see [../common-types/fbsv4setproductexemplarrequest.md](../common-types/fbsv4setproductexemplarrequest.md)- `fbsv4SetProductExemplarResponse` — see [../common-types/fbsv4setproductexemplarresponse.md](../common-types/fbsv4setproductexemplarresponse.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)
## POST /v4/fbs/posting/product/exemplar/status

**Summary:** Получить статус добавления экземпляров

**operationId:** `PostingAPI_GetProductExemplarStatus`

Метод для получения статусов добавления экземпляров, переданных в методе [/v5/fbs/posting/product/exemplar/set](#operation/PostingAPI_FbsPostingProductExemplarSet). 
Также возвращает данные по этим экземплярам.

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
- `fbsv4GetProductExemplarStatusRequest` — see [../common-types/fbsv4getproductexemplarstatusrequest.md](../common-types/fbsv4getproductexemplarstatusrequest.md)- `fbsv4GetProductExemplarStatusResponse` — see [../common-types/fbsv4getproductexemplarstatusresponse.md](../common-types/fbsv4getproductexemplarstatusresponse.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)
## POST /v4/fbs/posting/product/exemplar/validate

**Summary:** Валидация кодов маркировки

**operationId:** `PostingAPI_FbsPostingProductExemplarValidate`

Метод для проверки кодов на соответствие требованиям по количеству и составу символов.&lt;br&gt;
[Подробнее об ошибках в Базе знаний продавца](https://seller-edu.ozon.ru/fbs/ozon-logistika/markirovka#какие-могут-возникать-ошибки-при-проверке-кода-маркировки)

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
- `postingv4FbsPostingProductExemplarValidateRequest` — see [../common-types/postingv4fbspostingproductexemplarvalidaterequest.md](../common-types/postingv4fbspostingproductexemplarvalidaterequest.md)- `postingv4FbsPostingProductExemplarValidateResponse` — see [../common-types/postingv4fbspostingproductexemplarvalidateresponse.md](../common-types/postingv4fbspostingproductexemplarvalidateresponse.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)
