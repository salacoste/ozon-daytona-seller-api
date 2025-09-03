# Prices&StocksAPI

## POST /v1/product/action/timer/status

**Summary:** Получить статус установленного таймера

**operationId:** `ProductAPI_ActionTimerStatus`

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1ProductActionTimerStatusRequest` — see [../common-types/v1productactiontimerstatusrequest.md](../common-types/v1productactiontimerstatusrequest.md)- `v1ProductActionTimerStatusResponse` — see [../common-types/v1productactiontimerstatusresponse.md](../common-types/v1productactiontimerstatusresponse.md)
## POST /v1/product/action/timer/update

**Summary:** Обновление таймера актуальности минимальной цены

**operationId:** `ProductAPI_ActionTimerUpdate`

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1ProductActionTimerUpdateRequest` — see [../common-types/v1productactiontimerupdaterequest.md](../common-types/v1productactiontimerupdaterequest.md)
## POST /v1/product/import/prices

**Summary:** Обновить цену

**operationId:** `ProductAPI_ImportProductsPrices`

Позволяет изменить цену одного или нескольких товаров.
Цену каждого товара можно обновлять не больше 10 раз в час.
Чтобы сбросить `old_price`, поставьте `0` у этого параметра. 

Если у товара установлена минимальная цена и включено автоприменение в акции, отключите его и обновите 
минимальную цену, иначе вернётся ошибка `action_price_enabled_min_price_missing`.

Если запрос содержит оба параметра — `offer_id` и `product_id`, изменения применятся к товару с `offer_id`. Для избежания неоднозначности используйте только один из параметров.

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
- `productImportProductsPricesRequest` — see [../common-types/productimportproductspricesrequest.md](../common-types/productimportproductspricesrequest.md)- `productImportProductsPricesResponse` — see [../common-types/productimportproductspricesresponse.md](../common-types/productimportproductspricesresponse.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)
## POST /v1/product/info/discounted

**Summary:** Узнать информацию об уценке и основном товаре по SKU уценённого товара

**operationId:** `ProductAPI_GetProductInfoDiscounted`

Метод для получения информации о состоянии и дефектах уценённого товара по его SKU. Работает только с уценёнными товарами по схеме FBO. Также метод возвращает SKU основного товара.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1GetProductInfoDiscountedRequest` — see [../common-types/v1getproductinfodiscountedrequest.md](../common-types/v1getproductinfodiscountedrequest.md)- `v1GetProductInfoDiscountedResponse` — see [../common-types/v1getproductinfodiscountedresponse.md](../common-types/v1getproductinfodiscountedresponse.md)
## POST /v1/product/info/stocks-by-warehouse/fbs

**Summary:** Информация об остатках на складах продавца (FBS и rFBS)

**operationId:** `ProductAPI_ProductStocksByWarehouseFbs`

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
- `productsv1GetProductInfoStocksByWarehouseFbsRequest` — see [../common-types/productsv1getproductinfostocksbywarehousefbsrequest.md](../common-types/productsv1getproductinfostocksbywarehousefbsrequest.md)- `productsv1GetProductInfoStocksByWarehouseFbsResponse` — see [../common-types/productsv1getproductinfostocksbywarehousefbsresponse.md](../common-types/productsv1getproductinfostocksbywarehousefbsresponse.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)
## POST /v1/product/update/discount

**Summary:** Установить скидку на уценённый товар

**operationId:** `ProductAPI_ProductUpdateDiscount`

Метод для установки размера скидки на уценённые товары, продающиеся по схеме FBS.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1ProductUpdateDiscountRequest` — see [../common-types/v1productupdatediscountrequest.md](../common-types/v1productupdatediscountrequest.md)- `v1ProductUpdateDiscountResponse` — see [../common-types/v1productupdatediscountresponse.md](../common-types/v1productupdatediscountresponse.md)
