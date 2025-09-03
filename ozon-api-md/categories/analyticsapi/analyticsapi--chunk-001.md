# AnalyticsAPI

## POST /v1/analytics/turnover/stocks

**Summary:** Оборачиваемость товара

**operationId:** `AnalyticsAPI_StocksTurnover`

Используйте метод, чтобы узнать оборачиваемость товара и количество дней, на которое хватит текущего остатка. 
Метод соответствует разделу [**FBO -&gt; Управление остатками**](https://seller.ozon.ru/app/supply/stocks-management) в личном кабинете.
Вы можете делать не больше 1 запроса в минуту по одному кабинету `Client-Id`.
    
Если вы запрашиваете список товаров по `sku`, параметры `limit` и `offset` необязательны.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1AnalyticsTurnoverStocksRequest` — see [../common-types/v1analyticsturnoverstocksrequest.md](../common-types/v1analyticsturnoverstocksrequest.md)- `v1AnalyticsTurnoverStocksResponse` — see [../common-types/v1analyticsturnoverstocksresponse.md](../common-types/v1analyticsturnoverstocksresponse.md)
## POST /v2/analytics/stock_on_warehouses

**Summary:** Отчёт по остаткам и товарам

**operationId:** `AnalyticsAPI_AnalyticsGetStockOnWarehousesV2`

&lt;aside class="warning"&gt;
В будущем метод будет отключён. Переключитесь на &lt;a href="#operation/AnalyticsAPI_AnalyticsStocks"&gt;/v1/analytics/stocks&lt;/a&gt;.
&lt;/aside&gt;

Метод для получения отчёта по остаткам и товарам в перемещении по складам Ozon.

&lt;aside class="warning"&gt;
Отличается от отчёта в разделе &lt;b&gt;Аналитика → Отчёты → Отчёт по остаткам и товарам в пути на склады Ozon&lt;/b&gt; в личном кабинете.
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
- `analyticsStockOnWarehouseRequest` — see [../common-types/analyticsstockonwarehouserequest.md](../common-types/analyticsstockonwarehouserequest.md)- `analyticsStockOnWarehouseResponse` — see [../common-types/analyticsstockonwarehouseresponse.md](../common-types/analyticsstockonwarehouseresponse.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)
