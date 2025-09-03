# ReportAPI

## POST /v1/finance/cash-flow-statement/list

**Summary:** Финансовый отчёт

**operationId:** `FinanceAPI_FinanceCashFlowStatementList`

Метод для получения финансового отчёта за периоды с 01 по 15 и с 16 по 31. 
Запросить отчёт за отдельные дни не получится. 
Соответствует разделу **Финансы → Баланс** в личном кабинете.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v3FinanceCashFlowStatementListRequest` — see [../common-types/v3financecashflowstatementlistrequest.md](../common-types/v3financecashflowstatementlistrequest.md)- `v3FinanceCashFlowStatementListResponse` — see [../common-types/v3financecashflowstatementlistresponse.md](../common-types/v3financecashflowstatementlistresponse.md)
## POST /v1/report/discounted/create

**Summary:** Отчёт об уценённых товарах

**operationId:** `ReportAPI_CreateDiscountedReport`

Запускает генерацию отчёта по уценённым товарам на складе Ozon.
Ozon может сам уценить товар, например, при повреждении.

В результате запроса будет не сам отчёт, а его уникальный идентификатор. 
Чтобы получить отчёт, отправьте идентификатор в запросе метода [/v1/report/info](#operation/ReportAPI_ReportInfo).

С одного аккаунта продавца можно отправить 1 запрос в минуту.
Соответствует разделу **Аналитика → Отчёты → Продажи со склада Ozon → Товары, уценённые Ozon** в личном кабинете.

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
- `reportCreateDiscountedRequest` — see [../common-types/reportcreatediscountedrequest.md](../common-types/reportcreatediscountedrequest.md)- `reportCreateDiscountedResponse` — see [../common-types/reportcreatediscountedresponse.md](../common-types/reportcreatediscountedresponse.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)
## POST /v1/report/info

**Summary:** Информация об отчёте

**operationId:** `ReportAPI_ReportInfo`

Возвращает информацию о созданном ранее отчёте по его идентификатору.

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
- `reportReportInfoRequest` — see [../common-types/reportreportinforequest.md](../common-types/reportreportinforequest.md)- `reportReportInfoResponse` — see [../common-types/reportreportinforesponse.md](../common-types/reportreportinforesponse.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)
## POST /v1/report/list

**Summary:** Список отчётов

**operationId:** `ReportAPI_ReportList`

Возвращает список отчётов, которые были сформированы раньше.

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
- `reportReportListRequest` — see [../common-types/reportreportlistrequest.md](../common-types/reportreportlistrequest.md)- `reportReportListResponse` — see [../common-types/reportreportlistresponse.md](../common-types/reportreportlistresponse.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)
## POST /v1/report/postings/create

**Summary:** Отчёт об отправлениях

**operationId:** `ReportAPI_CreateCompanyPostingsReport`

Отчёт об отправлениях с информацией по заказам:
  - статусы заказов,
  - дата начала обработки,
  - номера заказов,
  - номера отправлений,
  - стоимость отправлений,
  - содержимое отправлений.
Соответствует разделу **FBO → Заказы со склада Ozon** и **FBS → Заказы с моих складов → CSV** в личном кабинете.

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
- `reportCreateCompanyPostingsReportRequest` — see [../common-types/reportcreatecompanypostingsreportrequest.md](../common-types/reportcreatecompanypostingsreportrequest.md)- `reportCreateReportResponse` — see [../common-types/reportcreatereportresponse.md](../common-types/reportcreatereportresponse.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)
