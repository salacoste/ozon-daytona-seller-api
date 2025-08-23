# BetaMethod

## POST /v1/analytics/average-delivery-time

**Summary:** Получить аналитику по среднему времени доставки

**operationId:** `AnalyticsAPI_AverageDeliveryTime`

Метод позволяет получить аналитику по среднему времени доставки товара до покупателя. Соответствует разделу **Аналитика → География продаж → Среднее время доставки** в личном кабинете. Детальную аналитику по каждому кластеру можно получить с помощью метода [/v1/analytics/average-delivery-time/details](#operation/AnalyticsAPI_AverageDeliveryTimeDetails).

[Подробнее о среднем времени доставки в Базе знаний продавца](https://seller-edu.ozon.ru/analytics-and-metrics/graphs/srednee-vremya-dostavki)

Вы можете оставить обратную связь по этому методу в комментариях к [обсуждению](https://dev.ozon.ru/community/1421-Novye-metody-dlia-polucheniia-analitiki-po-srednemu-vremeni-dostavki) в сообществе разработчиков Ozon for dev.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1AverageDeliveryTimeRequest` — see [../common-types/v1averagedeliverytimerequest.md](../common-types/v1averagedeliverytimerequest.md)- `v1AverageDeliveryTimeResponse` — see [../common-types/v1averagedeliverytimeresponse.md](../common-types/v1averagedeliverytimeresponse.md)
## POST /v1/analytics/average-delivery-time/details

**Summary:** Получить детальную аналитику по среднему времени доставки

**operationId:** `AnalyticsAPI_AverageDeliveryTimeDetails`

Метод является аналогом вкладки **Аналитика → География продаж → Среднее время доставки** в личном кабинете продавца.
[Подробнее о среднем времени доставки в Базе знаний продавца](https://seller-edu.ozon.ru/analytics-and-metrics/graphs/srednee-vremya-dostavki).

Чтобы получить общую аналитику по кластерам, используйте метод &lt;a href="#operation/AnalyticsAPI_AverageDeliveryTime"&gt;/v1/analytics/average-delivery-time&lt;/a&gt;.

Вы можете оставить обратную связь по этому методу в комментариях к [обсуждению](https://dev.ozon.ru/community/1421-Novye-metody-dlia-polucheniia-analitiki-po-srednemu-vremeni-dostavki) в сообществе разработчиков Ozon&nbsp;for&nbsp;dev.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1AverageDeliveryTimeDetailsRequest` — see [../common-types/v1averagedeliverytimedetailsrequest.md](../common-types/v1averagedeliverytimedetailsrequest.md)- `v1AverageDeliveryTimeDetailsResponse` — see [../common-types/v1averagedeliverytimedetailsresponse.md](../common-types/v1averagedeliverytimedetailsresponse.md)
## POST /v1/analytics/average-delivery-time/summary

**Summary:** Получить общую аналитику по среднему времени доставки

**operationId:** `AverageDeliveryTimeSummary`

Метод позволяет получить общую аналитику по среднему времени доставки товара до покупателя. Соответствует разделу **Аналитика → География продаж → Среднее время доставки** в личном кабинете. 

Детальную аналитику по каждому кластеру можно получить с помощью метода [/v1/analytics/average-delivery-time/details](#operation/AnalyticsAPI_AverageDeliveryTimeDetails). 
Чтобы получить аналитику по среднему времени доставки, используйте метод [/v1/analytics/average-delivery-time](#operation/AnalyticsAPI_AverageDeliveryTime).

[Подробнее о среднем времени доставки в Базе знаний продавца](https://seller-edu.ozon.ru/analytics-and-metrics/graphs/srednee-vremya-dostavki)

Вы можете оставить обратную связь по этому методу в комментариях к [обсуждению](https://dev.ozon.ru/community/1421-Novye-metody-dlia-polucheniia-analitiki-po-srednemu-vremeni-dostavki) в сообществе разработчиков Ozon for dev.

**Parameters (path/query/header/cookie):**
_query_:
- `` (optional)
- `` (optional)

**Request body (minimal valid example):**
_no request body_

**Success response (example):**
```json
{
  "result": "ok"
}
```

**Related schemas:**
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1AverageDeliveryTimeSummaryResponse` — see [../common-types/v1averagedeliverytimesummaryresponse.md](../common-types/v1averagedeliverytimesummaryresponse.md)
## POST /v1/analytics/manage/stocks

**Summary:** Управление остатками

**operationId:** `AnalyticsAPI_ManageStocks`

&lt;aside class="warning"&gt;
В будущем метод будет отключён. Переключитесь на &lt;a href="#operation/AnalyticsAPI_AnalyticsStocks"&gt;/v1/analytics/stocks&lt;/a&gt;.
&lt;/aside&gt;

Используйте метод, чтобы узнать, сколько товаров осталось на складах FBO.

Вы можете оставить обратную связь по этому методу в комментариях к [обсуждению](https://dev.ozon.ru/community/1106-Razdel-upravleniia-ostatkami-analytics-manage-stocks)
в сообществе разработчиков Ozon for dev.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1AnalyticsManageStocksRequest` — see [../common-types/v1analyticsmanagestocksrequest.md](../common-types/v1analyticsmanagestocksrequest.md)- `v1AnalyticsManageStocksResponse` — see [../common-types/v1analyticsmanagestocksresponse.md](../common-types/v1analyticsmanagestocksresponse.md)
