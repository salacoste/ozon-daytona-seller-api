# Premium

## POST /v1/analytics/data

**Summary:** Данные аналитики

**operationId:** `AnalyticsAPI_AnalyticsGetData`

Уĸажите период и метриĸи, ĸоторые нужно посчитать. В ответе будет аналитиĸа, сгруппированная по параметру `dimensions`.

Для продавцов без подписки [Premium Plus](https://seller-edu.ozon.ru/seller-rating/about-rating/subscription-premium-plus):
- доступны данные за последние 3 месяца,
- есть ограничения по способам группировки данных и метрикам.

Для продавцов с подпиской [Premium Plus](https://seller-edu.ozon.ru/seller-rating/about-rating/subscription-premium-plus) ограничений нет.

Метод можно использовать не больше 1 раза в минуту.
Соответствует разделу **Аналитика → Графики** в личном кабинете.

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
- `analyticsAnalyticsGetDataRequest` — see [../common-types/analyticsanalyticsgetdatarequest.md](../common-types/analyticsanalyticsgetdatarequest.md)- `analyticsAnalyticsGetDataResponse` — see [../common-types/analyticsanalyticsgetdataresponse.md](../common-types/analyticsanalyticsgetdataresponse.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)
## POST /v1/analytics/product-queries

**Summary:** Получить информацию о запросах моих товаров

**operationId:** `AnalyticsAPI_AnalyticsProductQueries`

Используйте метод, чтобы получить данные о запросах ваших товаров. Полная аналитика доступна с подпиской [Premium](https://seller-edu.ozon.ru/seller-rating/about-rating/premium-program) или [Premium Plus](https://seller-edu.ozon.ru/seller-rating/about-rating/subscription-premium-plus). Без подписки вы можете посмотреть часть показателей. Метод аналогичен вкладке **Товары в поиске → Запросы моего товара** в личном кабинете.

Аналитику по запросам можно проверить за определённые даты. Для этого укажите интервал в полях `date_from` и `date_to`. Данные за последний месяц доступны в любом интервале, кроме трёх дней от текущей даты — в эти дни происходит расчёт. Аналитика за даты позже, чем месяц назад, доступна только с подпиской [Premium](https://seller-edu.ozon.ru/seller-rating/about-rating/premium-program) или [Premium Plus](https://seller-edu.ozon.ru/seller-rating/about-rating/subscription-premium-plus) и только по неделям — в запросе укажите параметр `date_from`.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1AnalyticsProductQueriesRequest` — see [../common-types/v1analyticsproductqueriesrequest.md](../common-types/v1analyticsproductqueriesrequest.md)- `v1AnalyticsProductQueriesResponse` — see [../common-types/v1analyticsproductqueriesresponse.md](../common-types/v1analyticsproductqueriesresponse.md)
## POST /v1/analytics/product-queries/details

**Summary:** Получить детализацию запросов по товару

**operationId:** `AnalyticsAPI_AnalyticsProductQueriesDetails`

Используйте метод, чтобы получить данные по запросам на конкретный товар. Полная аналитика доступна с подпиской [Premium](https://seller-edu.ozon.ru/seller-rating/about-rating/premium-program) или [Premium Plus](https://seller-edu.ozon.ru/seller-rating/about-rating/subscription-premium-plus). Без подписки вы можете посмотреть часть показателей. Метод аналогичен просмотру данных по товару на вкладке **Товары в поиске → Запросы моего товара** в личном кабинете.

Аналитику по запросам можно проверить за определённые даты. Для этого укажите интервал в полях `date_from` и `date_to`. Данные за последний месяц доступны в любом интервале, кроме трёх дней от текущей даты — в эти дни происходит расчёт. Аналитика за даты позже, чем месяц назад, доступна только с подпиской [Premium](https://seller-edu.ozon.ru/seller-rating/about-rating/premium-program) или [Premium Plus](https://seller-edu.ozon.ru/seller-rating/about-rating/subscription-premium-plus) и только по неделям — в запросе укажите параметр `date_from`.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1AnalyticsProductQueriesDetailsRequest` — see [../common-types/v1analyticsproductqueriesdetailsrequest.md](../common-types/v1analyticsproductqueriesdetailsrequest.md)- `v1AnalyticsProductQueriesDetailsResponse` — see [../common-types/v1analyticsproductqueriesdetailsresponse.md](../common-types/v1analyticsproductqueriesdetailsresponse.md)
