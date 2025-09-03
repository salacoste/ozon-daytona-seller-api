# Prices&StocksAPI

## POST /v2/products/stocks

**Summary:** Обновить количество товаров на складах

**operationId:** `ProductAPI_ProductsStocksV2`

Позволяет изменить информацию о количестве товара в наличии.

&lt;aside class="warning"&gt;
Переданный остаток — количество товара в наличии без учёта зарезервированных товаров. Перед обновлением остатков проверьте количество зарезервированных товаров с помощью метода &lt;a href="#operation/ProductAPI_ProductStocksByWarehouseFbs"&gt;/v1/product/info/stocks-by-warehouse/fbs&lt;/a&gt;.
&lt;/aside&gt;

За один запрос можно изменить наличие для 100 пар товар-склад. С одного аккаунта продавца можно отправить до 80 запросов в минуту.

&lt;aside class="warning"&gt;Обновлять остатки у одной пары товар-склад можно только 1 раз в 30 секунд, иначе в параметре &lt;code&gt;result.errors&lt;/code&gt; в ответе будет ошибка &lt;code&gt;TOO_MANY_REQUESTS&lt;/code&gt;.&lt;/aside&gt;

Вы можете задать наличие товара только после того, как его статус сменится на `price_sent`.

Остатки крупногабаритных товаров можно обновлять только на предназначенных для них складах.

Если запрос содержит оба параметра — `offer_id` и `product_id`, изменения применятся к товару с `offer_id`. Для избежания неоднозначности используйте только один из параметров.

&lt;aside class="warning"&gt;
26 июня 2025 параметры &lt;tt&gt;stocks.quant_size&lt;/tt&gt; в запросе метода и &lt;tt&gt;result.quant_size&lt;/tt&gt; в ответе метода будут отключены.
&lt;/aside&gt;

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
- `productv2ProductsStocksRequest` — see [../common-types/productv2productsstocksrequest.md](../common-types/productv2productsstocksrequest.md)- `productv2ProductsStocksResponse` — see [../common-types/productv2productsstocksresponse.md](../common-types/productv2productsstocksresponse.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)
## POST /v4/product/info/stocks

**Summary:** Информация о количестве товаров

**operationId:** `ProductAPI_GetProductInfoStocks`

Возвращает информацию о ĸоличестве товаров по схемам FBS и rFBS:
  - сĸольĸо единиц есть в наличии,
  - сĸольĸо зарезервировано поĸупателями.

Чтобы получить информацию об остатках по схеме FBO, используйте метод [v1/analytics/manage/stocks](#operation/AnalyticsAPI_ManageStocks).

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v4GetProductInfoStocksRequest` — see [../common-types/v4getproductinfostocksrequest.md](../common-types/v4getproductinfostocksrequest.md)- `v4GetProductInfoStocksResponse` — see [../common-types/v4getproductinfostocksresponse.md](../common-types/v4getproductinfostocksresponse.md)
## POST /v5/product/info/prices

**Summary:** Получить информацию о цене товара

**operationId:** `ProductAPI_GetProductInfoPrices`

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
- `productv5GetProductInfoPricesV5Request` — see [../common-types/productv5getproductinfopricesv5request.md](../common-types/productv5getproductinfopricesv5request.md)- `productv5GetProductInfoPricesV5Response` — see [../common-types/productv5getproductinfopricesv5response.md](../common-types/productv5getproductinfopricesv5response.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)
