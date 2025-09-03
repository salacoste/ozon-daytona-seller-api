# FBS&rFBSMarks

## POST /v4/posting/fbs/ship

**Summary:** Собрать заказ (версия 4)

**operationId:** `PostingAPI_ShipFbsPostingV4`

Делит заказ на отправления и переводит его в статус `awaiting_deliver`.

Каждый элемент в `packages` может содержать несколько элементов `products` или отправлений. 
Каждый элемент в `products` — это товар, включённый в данное отправление.

Разделить заказ нужно, если:
  - товары не помещаются в одну упаковку,
  - товары нельзя сложить в одну упаковку.
  
Чтобы разделить заказ, передайте в массиве `packages` несколько объектов.

Пример запроса, когда заказ разделять не нужно: 2 товара будут в одном отправлении.
```
{
  "packages": [
    {
      "products": [
        {
          "product_id": 185479045,
          "quantity": 2
        }
      ]
    }
  ],
  "posting_number": "89491381-0072-1"
}
```

Пример запроса, когда заказ нужно разделить: каждый товар будет в отдельном отправлении.

```
{
  "packages": [
    {
      "products": [
        {
          "product_id": 185479045,
          "quantity": 1
        }
      ]
    },
    {
      "products": [
        {
          "product_id": 185479045,
          "quantity": 1
        }
      ]
    }
  ],
  "posting_number": "89491381-0072-1"
}    
```  

Чтобы внести информацию по экземплярам, используйте метод [/v5/fbs/posting/product/exemplar/set](#operation/PostingAPI_FbsPostingProductExemplarSet).

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
- `fbsv4FbsPostingShipV4Request` — see [../common-types/fbsv4fbspostingshipv4request.md](../common-types/fbsv4fbspostingshipv4request.md)- `fbsv4FbsPostingShipV4Response` — see [../common-types/fbsv4fbspostingshipv4response.md](../common-types/fbsv4fbspostingshipv4response.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)
## POST /v4/posting/fbs/ship/package

**Summary:** Частичная сборка отправления (версия 4)

**operationId:** `PostingAPI_ShipFbsPostingPackage`

Если в запросе передать часть товаров из отправления, метод разделит первичное отправление на две части. 
В первичном несобранном отправлении останется часть товаров, которую не передали в запросе.

По умолчанию статус созданных отправлений `awaiting_packaging` — ожидает сборки.

Статус изначального отправления изменится только после изменения статуса отправлений, на которые он разделился.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v4FbsPostingShipPackageV4Request` — see [../common-types/v4fbspostingshippackagev4request.md](../common-types/v4fbspostingshippackagev4request.md)- `v4FbsPostingShipPackageV4Response` — see [../common-types/v4fbspostingshippackagev4response.md](../common-types/v4fbspostingshippackagev4response.md)
## POST /v5/fbs/posting/product/exemplar/create-or-get

**Summary:** Получить информацию об экземплярах

**operationId:** `PostingAPI_FbsPostingProductExemplarCreateOrGet`

Метод для получения информации по экземплярам товаров из отправления.
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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v5FbsPostingProductExemplarCreateOrGetV5Request` — see [../common-types/v5fbspostingproductexemplarcreateorgetv5request.md](../common-types/v5fbspostingproductexemplarcreateorgetv5request.md)- `v5FbsPostingProductExemplarCreateOrGetV5Response` — see [../common-types/v5fbspostingproductexemplarcreateorgetv5response.md](../common-types/v5fbspostingproductexemplarcreateorgetv5response.md)
