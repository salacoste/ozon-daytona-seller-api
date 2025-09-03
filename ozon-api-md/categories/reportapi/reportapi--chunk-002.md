# ReportAPI

## POST /v1/report/products/create

**Summary:** Отчёт по товарам

**operationId:** `ReportAPI_CreateCompanyProductsReport`

Метод для получения отчёта с данными о товарах. Например, Ozon ID, количества товаров, цен, статуса.
Соответствует разделу/действию **Товары и цены → Список товаров → Скачать → Товары CSV** в личном кабинете.

Пояснения к некоторым полям:
  - __Ozon Product ID__ — идентификатор товара в нашей системе. Например, если вы продаёте товар со склада Ozon и со своего склада, Ozon Product ID будет для них одинаковым.
  - __FBO Ozon SKU ID__ — идентификатор товара, который продаётся со склада Ozon.
  - __FBS Ozon SKU ID__ — идентификатор товара, который продаётся с вашего склада.
  - __CrossBorder Ozon SKU__ — идентификатор товара, который продаётся из-за границы.
  - __Barcode__ — штрихкод товара, который печатается на маркировке.
  - __Статус товара__ — можно ли купить товар на Ozon. Если статус «Готов к продаже», товар купить нельзя.
  - __Доступно на складе Ozon, шт__ — сколько штук товара на складе доступно для продажи. Это количество не включает зарезервированные товары.
  - __Зарезервировано, шт__ — сколько штук товара со статусом «Зарезервировано». Товар зарезервирован с момента получения заказа на Ozon и до упаковки для передачи покупателю.
  - __Текущая цена с учётом скидки, руб.__ — цена, по которой товар продаётся сейчас (на момент загрузки отчёта, с учётом скидки). Если товар участвует в акции, указана цена без её учёта.
  - __Базовая цена (цена до скидок), руб.__ — цена без учёта скидки.
  - __Цена Premium, руб.__ — цена для покупателей с подпиской Ozon Premium.
  - __Рекомендованная цена, руб.__ — минимальная цена на товар на другой торговой площадке.
  - __Актуальная ссылка на рекомендованную цену__ — ссылка на товар с рекомендованной ценой на другой торговой площадке.

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
- `reportCreateCompanyProductsReportRequest` — see [../common-types/reportcreatecompanyproductsreportrequest.md](../common-types/reportcreatecompanyproductsreportrequest.md)- `reportCreateReportResponse` — see [../common-types/reportcreatereportresponse.md](../common-types/reportcreatereportresponse.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)
## POST /v1/report/warehouse/stock

**Summary:** Отчёт об остатках на FBS-складе

**operationId:** `ReportAPI_CreateStockByWarehouseReport`

Отчёт с информацией о количестве доступных и зарезервированных единиц товара на складе.
Соответствует разделу **FBS → Управление логистикой → Управление остатками → Скачать в XLS** в личном кабинете.

В результате запроса будет не сам отчёт, а его уникальный идентификатор. 
Чтобы получить отчёт, отправьте идентификатор в запросе метода [/v1/report/info](#operation/ReportAPI_ReportInfo).

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
- `commonCreateReportResponse` — see [../common-types/commoncreatereportresponse.md](../common-types/commoncreatereportresponse.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1CreateStockByWarehouseReportRequest` — see [../common-types/v1createstockbywarehousereportrequest.md](../common-types/v1createstockbywarehousereportrequest.md)
## POST /v2/report/returns/create

**Summary:** Отчёт о возвратах

**operationId:** `ReportAPI_ReportReturnsCreate`

Метод для получения отчёта о возвратах FBO и FBS.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v2ReportReturnsCreateRequest` — see [../common-types/v2reportreturnscreaterequest.md](../common-types/v2reportreturnscreaterequest.md)- `v2ReportReturnsCreateResponse` — see [../common-types/v2reportreturnscreateresponse.md](../common-types/v2reportreturnscreateresponse.md)
