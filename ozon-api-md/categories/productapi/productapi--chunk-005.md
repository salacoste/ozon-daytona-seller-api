# ProductAPI

## POST /v3/product/info/list

**Summary:** Получить информацию о товарах по идентификаторам

**operationId:** `ProductAPI_GetProductInfoList`

Метод для получения информации о товарах по их идентификаторам.

В теле запроса должен быть массив однотипных идентификаторов, в ответе будет массив `items`.

В одном запросе вы можете передать не больше 1000 товаров по параметрам `offer_id`, `product_id` и `sku` в сумме.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v3GetProductInfoListRequest` — see [../common-types/v3getproductinfolistrequest.md](../common-types/v3getproductinfolistrequest.md)- `v3GetProductInfoListResponse` — see [../common-types/v3getproductinfolistresponse.md](../common-types/v3getproductinfolistresponse.md)
## POST /v3/product/list

**Summary:** Список товаров

**operationId:** `ProductAPI_GetProductList`

Метод для получения списка всех товаров.

Если вы используете фильтр по идентификатору `offer_id` или `product_id`, остальные параметры заполнять не обязательно.
За один раз вы можете использовать только одну группу идентификаторов, не больше 1000 товаров.

Если вы не используете для отображения идентификаторы, укажите `limit` и `last_id` в следующих запросах.

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
- `productv3GetProductListRequest` — see [../common-types/productv3getproductlistrequest.md](../common-types/productv3getproductlistrequest.md)- `productv3GetProductListResponse` — see [../common-types/productv3getproductlistresponse.md](../common-types/productv3getproductlistresponse.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)
## POST /v4/product/info/attributes

**Summary:** Получить описание характеристик товара

**operationId:** `ProductAPI_GetProductAttributesV4`

Возвращает описание характеристик товаров по идентификатору и видимости. Товар можно искать по `offer_id`, `product_id` или `sku`.

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
- `productv4GetProductAttributesV4Request` — see [../common-types/productv4getproductattributesv4request.md](../common-types/productv4getproductattributesv4request.md)- `productv4GetProductAttributesV4Response` — see [../common-types/productv4getproductattributesv4response.md](../common-types/productv4getproductattributesv4response.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)
## POST /v4/product/info/limit

**Summary:** Лимиты на ассортимент, создание и обновление товаров

**operationId:** `ProductAPI_GetUploadQuota`

Метод для получения информации о лимитах:
- На ассортимент — сколько всего товаров можно создать в вашем личном кабинете.
- На создание товаров — сколько товаров можно создать в сутки.
- На обновление товаров — сколько товаров можно отредактировать в сутки.

Если у вас есть лимит на ассортимент и вы израсходуете его, вы не сможете создавать новые товары.

[Подробнее о лимитах в Базе знаний продавца](https://seller-edu.ozon.ru/work-with-goods/zagruzka-tovarov/creating-goods/limit/)

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1Empty` — see [../common-types/v1empty.md](../common-types/v1empty.md)- `v4GetUploadQuotaResponse` — see [../common-types/v4getuploadquotaresponse.md](../common-types/v4getuploadquotaresponse.md)
