# FBS&rFBSMarks

## POST /v6/fbs/posting/product/exemplar/set

**Summary:** Проверить и сохранить данные экземпляров

**operationId:** `PostingAPI_FbsPostingProductExemplarSetV6`

Асинхронный метод:
- для проверки наличия экземпляров в обороте в системе «Честный ЗНАК»;
- для сохранения данных экземпляров. 

Чтобы получить результаты проверок, используйте метод [/v5/fbs/posting/product/exemplar/status](#operation/PostingAPI_FbsPostingProductExemplarStatusV5). 
Для получения данных о созданных экземплярах, используйте метод [/v6/fbs/posting/product/exemplar/create-or-get](#operation/PostingAPI_FbsPostingProductExemplarCreateOrGetV6).

Если у вас несколько одинаковых товаров в отправлении, укажите один `product_id` и массив `exemplars` для каждого товара из отправления.

Всегда передавайте полный набор данных по экземплярам и продуктам. 

Например, в вашей системе 10 экземпляров. 
Вы передали их для проверки и сохранения. 
Потом добавили в своей системе ещё 60 экземпляров.
При повторной передаче экземпляров для проверки и сохранения укажите все экземпляры: и старые, и только что добавленные.

Код ответа 200 не гарантирует, что данные об экземплярах приняты. 
Он указывает, что создана задача для добавления информации. 
Чтобы проверить статус задачи, используйте метод [/v5/fbs/posting/product/exemplar/status](#operation/PostingAPI_FbsPostingProductExemplarStatusV5).

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v6FbsPostingProductExemplarSetV6Request` — see [../common-types/v6fbspostingproductexemplarsetv6request.md](../common-types/v6fbspostingproductexemplarsetv6request.md)
