# BetaMethod

## POST /v1/analytics/stocks

**Summary:** Получить аналитику по остаткам

**operationId:** `AnalyticsAPI_AnalyticsStocks`

Используйте метод, чтобы получить аналитику по остаткам товаров на складах. Метод соответствует разделу [**FBO → Управление остатками**](https://seller.ozon.ru/app/fbo-stocks/stocks-management/) в личном кабинете. Аналитика обновляется раз в день в 07:00 UTC.

Вы можете оставить обратную связь по этому методу в комментариях к [обсуждению](https://dev.ozon.ru/community/1341-Novyi-metod-analitiki-po-ostatkam-na-skladakh-Ozon) в сообществе разработчиков Ozon for dev.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1AnalyticsStocksRequest` — see [../common-types/v1analyticsstocksrequest.md](../common-types/v1analyticsstocksrequest.md)- `v1AnalyticsStocksResponse` — see [../common-types/v1analyticsstocksresponse.md](../common-types/v1analyticsstocksresponse.md)
## POST /v1/product/info/wrong-volume

**Summary:** Список товаров с некорректными ОВХ

**operationId:** `ProductAPI_ProductInfoWrongVolume`

Возвращает список товаров с некорректными объёмно-весовыми характеристиками (ОВХ). Если вы указали размеры правильно, обратитесь в поддержку Ozon.

Вы можете оставить обратную связь по этому методу в комментариях к [обсуждению](https://dev.ozon.ru/community/1260-Informer-nekorrektnykh-OVKh) в сообществе разработчиков Ozon for dev.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1ProductInfoWrongVolumeRequest` — see [../common-types/v1productinfowrongvolumerequest.md](../common-types/v1productinfowrongvolumerequest.md)- `v1ProductInfoWrongVolumeResponse` — see [../common-types/v1productinfowrongvolumeresponse.md](../common-types/v1productinfowrongvolumeresponse.md)
## POST /v1/removal/from-stock/list

**Summary:** Отчёт по вывозу и утилизации со стока FBO

**operationId:** `GetSupplierReturnsSummaryReport`

Метод соответствует разделу [**FBO → Вывоз и утилизация**](https://seller.ozon.ru/app/fbo-operations/returns) в личном кабинете.

Вы можете оставить обратную связь по этому методу в комментариях к [обсуждению](https://dev.ozon.ru/community/1608-Novye-metody-po-vyvozu-i-utilizatsii) в сообществе разработчиков Ozon for dev.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1GetSupplierReturnsSummaryReportRequest` — see [../common-types/v1getsupplierreturnssummaryreportrequest.md](../common-types/v1getsupplierreturnssummaryreportrequest.md)- `v1GetSupplierReturnsSummaryReportResponse` — see [../common-types/v1getsupplierreturnssummaryreportresponse.md](../common-types/v1getsupplierreturnssummaryreportresponse.md)
## POST /v1/removal/from-supply/list

**Summary:** Отчёт по вывозу и утилизации с поставки FBO

**operationId:** `GetSupplyReturnsSummaryReport`

Метод соответствует разделу [**FBO → Вывоз и утилизация**](https://seller.ozon.ru/app/fbo-operations/returns) в личном кабинете.

Вы можете оставить обратную связь по этому методу в комментариях к [обсуждению](https://dev.ozon.ru/community/1608-Novye-metody-po-vyvozu-i-utilizatsii) в сообществе разработчиков Ozon for dev.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1GetSupplyReturnsSummaryReportRequest` — see [../common-types/v1getsupplyreturnssummaryreportrequest.md](../common-types/v1getsupplyreturnssummaryreportrequest.md)- `v1GetSupplyReturnsSummaryReportResponse` — see [../common-types/v1getsupplyreturnssummaryreportresponse.md](../common-types/v1getsupplyreturnssummaryreportresponse.md)
## POST /v1/roles

**Summary:** Получить список ролей и методов по API-ключу

**operationId:** `AccessAPI_RolesByToken`

Метод для получения информации и ролях и методах, привязанных к API-ключу.

Вы можете оставить обратную связь по этому методу в комментариях к [обсуждению](https://dev.ozon.ru/community/1609-Novyi-metod-dlia-polucheniia-rolei-po-API-kliuchu)
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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1Empty` — see [../common-types/v1empty.md](../common-types/v1empty.md)- `v1RolesByTokenResponse` — see [../common-types/v1rolesbytokenresponse.md](../common-types/v1rolesbytokenresponse.md)
