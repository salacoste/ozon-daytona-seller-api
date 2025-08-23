# ProductAPI

## POST /v1/product/pictures/import

**Summary:** Загрузить или обновить изображения товара

**operationId:** `ProductAPI_ProductImportPictures`

Метод для загрузки или обновления изображений товара.

При каждом вызове метода передавайте все изображения, которые должны быть на карточке товара. Например, если вы вызвали метод и загрузили 10 изображений, а затем вызвали метод второй раз и загрузили ещё одно,
то все 10 предыдущих сотрутся.

Для загрузки передайте адрес ссылки на изображение в общедоступном облачном хранилище.
Формат изображения по ссылке — JPG или PNG.

Изображения в массиве `images` располагайте в соответствии с желаемым порядком на сайте. Главным будет
первое изображение в массиве.

Для каждого товара вы можете загрузить до 15 изображений.

Для загрузки изображений 360 используйте поле `images360`, для загрузки маркетингового цвета — `color_image`.

Если вы хотите изменить состав или порядок изображений, получите информацию с помощью метода
[/v3/product/info/list](#operation/ProductAPI_GetProductInfoList) — в нём отображается текущий порядок и
состав изображений. Скопируйте данные полей `images`, `images360`, `color_image`, измените и дополните состав или
порядок в соответствии с необходимостью.

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
- `productv1ProductImportPicturesRequest` — see [../common-types/productv1productimportpicturesrequest.md](../common-types/productv1productimportpicturesrequest.md)- `productv1ProductInfoPicturesResponse` — see [../common-types/productv1productinfopicturesresponse.md](../common-types/productv1productinfopicturesresponse.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)
## POST /v1/product/rating-by-sku

**Summary:** Получить контент-рейтинг товаров по SKU

**operationId:** `ProductAPI_GetProductRatingBySku`

Метод для получения контент-рейтинга товаров, а также рекомендаций по его увеличению.

[Подробнее о контент-рейтинге](https://seller-edu.ozon.ru/docs/work-with-goods/content-rating.html)

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1GetProductRatingBySkuRequest` — see [../common-types/v1getproductratingbyskurequest.md](../common-types/v1getproductratingbyskurequest.md)- `v1GetProductRatingBySkuResponse` — see [../common-types/v1getproductratingbyskuresponse.md](../common-types/v1getproductratingbyskuresponse.md)
## POST /v1/product/related-sku/get

**Summary:** Получить связанные SKU

**operationId:** `ProductAPI_ProductGetRelatedSKU`

Метод для получения единого SKU по старым идентификаторам SKU FBS и SKU FBO. 
В ответе будут все SKU, связанные с переданными.

Метод может обработать любые SKU, даже скрытые или удалённые.

Передавайте до 200 SKU в одном запросе.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1ProductGetRelatedSKURequest` — see [../common-types/v1productgetrelatedskurequest.md](../common-types/v1productgetrelatedskurequest.md)- `v1ProductGetRelatedSKUResponse` — see [../common-types/v1productgetrelatedskuresponse.md](../common-types/v1productgetrelatedskuresponse.md)
## POST /v1/product/unarchive

**Summary:** Вернуть товар из архива

**operationId:** `ProductAPI_ProductUnarchive`

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
- `productBooleanResponse` — see [../common-types/productbooleanresponse.md](../common-types/productbooleanresponse.md)- `productProductUnarchiveRequest` — see [../common-types/productproductunarchiverequest.md](../common-types/productproductunarchiverequest.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)
## POST /v1/product/update/offer-id

**Summary:** Изменить артикулы товаров из системы продавца

**operationId:** `ProductAPI_ProductUpdateOfferID`

Метод для изменения `offer_id`, привязанных к товарам. Вы можете изменить несколько `offer_id`.

Рекомендуем передавать до 250 значений в массиве.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1ProductUpdateOfferIdRequest` — see [../common-types/v1productupdateofferidrequest.md](../common-types/v1productupdateofferidrequest.md)- `v1ProductUpdateOfferIdResponse` — see [../common-types/v1productupdateofferidresponse.md](../common-types/v1productupdateofferidresponse.md)
