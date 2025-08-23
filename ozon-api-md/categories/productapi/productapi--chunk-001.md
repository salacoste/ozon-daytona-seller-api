# ProductAPI

## POST /v1/product/archive

**Summary:** Перенести товар в архив

**operationId:** `ProductAPI_ProductArchive`

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
- `productBooleanResponse` — see [../common-types/productbooleanresponse.md](../common-types/productbooleanresponse.md)- `productProductArchiveRequest` — see [../common-types/productproductarchiverequest.md](../common-types/productproductarchiverequest.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)
## POST /v1/product/attributes/update

**Summary:** Обновить характеристики товара

**operationId:** `ProductAPI_ProductUpdateAttributes`

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1ProductUpdateAttributesRequest` — see [../common-types/v1productupdateattributesrequest.md](../common-types/v1productupdateattributesrequest.md)- `v1ProductUpdateAttributesResponse` — see [../common-types/v1productupdateattributesresponse.md](../common-types/v1productupdateattributesresponse.md)
## POST /v1/product/import-by-sku

**Summary:** Создать товар по SKU

**operationId:** `ProductAPI_ImportProductsBySKU`

Метод создаёт [копию карточки товара](https://seller-edu.ozon.ru/work-with-goods/zagruzka-tovarov/creating-goods/cherez-kopirovanie)
с указанным SKU.

Создать копию не получится, если продавец запретил копирование своих карточек.

Обновить товар по SKU нельзя.

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
- `productImportProductsBySKURequest` — see [../common-types/productimportproductsbyskurequest.md](../common-types/productimportproductsbyskurequest.md)- `productImportProductsBySKUResponse` — see [../common-types/productimportproductsbyskuresponse.md](../common-types/productimportproductsbyskuresponse.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)
## POST /v1/product/import/info

**Summary:** Узнать статус добавления или обновления товара

**operationId:** `ProductAPI_GetImportProductsInfo`

Позволяет получить статус создания или обновления карточки товара.

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
- `productGetImportProductsInfoRequest` — see [../common-types/productgetimportproductsinforequest.md](../common-types/productgetimportproductsinforequest.md)- `productGetImportProductsInfoResponse` — see [../common-types/productgetimportproductsinforesponse.md](../common-types/productgetimportproductsinforesponse.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)
## POST /v1/product/info/description

**Summary:** Получить описание товара

**operationId:** `ProductAPI_GetProductInfoDescription`

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
- `productGetProductInfoDescriptionRequest` — see [../common-types/productgetproductinfodescriptionrequest.md](../common-types/productgetproductinfodescriptionrequest.md)- `productGetProductInfoDescriptionResponse` — see [../common-types/productgetproductinfodescriptionresponse.md](../common-types/productgetproductinfodescriptionresponse.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)
## POST /v1/product/info/subscription

**Summary:** Количество подписавшихся на товар пользователей

**operationId:** `ProductAPI_GetProductInfoSubscription`

Метод для получения количества пользователей, которые нажали **Узнать о поступлении** на странице товара.

Вы можете передать несколько товаров в запросе.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1GetProductInfoSubscriptionRequest` — see [../common-types/v1getproductinfosubscriptionrequest.md](../common-types/v1getproductinfosubscriptionrequest.md)- `v1GetProductInfoSubscriptionResponse` — see [../common-types/v1getproductinfosubscriptionresponse.md](../common-types/v1getproductinfosubscriptionresponse.md)
