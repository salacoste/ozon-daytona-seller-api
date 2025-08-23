# FinanceAPI

## POST /v1/finance/realization/posting

**Summary:** Позаказный отчёт о реализации товаров

**operationId:** `FinanceAPI_GetRealizationReportV1`

&lt;aside class="warning"&gt;
Метод недоступен для продавцов, которые заключили договор с ТОО «ОЗОН Маркетплейс Казахстан».
&lt;/aside&gt;

Отчёт о реализации доставленных и возвращённых товаров с детализацией по каждому заказу. Отмены и невыкупы не включаются. Отчёт доступен с настоящего времени по август 2023 года включительно.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1GetRealizationReportPostingRequest` — see [../common-types/v1getrealizationreportpostingrequest.md](../common-types/v1getrealizationreportpostingrequest.md)- `v1GetRealizationReportPostingResponse` — see [../common-types/v1getrealizationreportpostingresponse.md](../common-types/v1getrealizationreportpostingresponse.md)
## POST /v2/finance/realization

**Summary:** Отчёт о реализации товаров (версия 2)

**operationId:** `FinanceAPI_GetRealizationReportV2`

&lt;aside class="warning"&gt;
Метод недоступен для продавцов, которые заключили договор с ТОО «ОЗОН Маркетплейс Казахстан».
&lt;/aside&gt;

Отчёт о реализации доставленных и возвращённых товаров за месяц. Отмены и невыкупы не включаются.
Соответствует разделу **Финансы → Документы → Отчёты о реализации → Отчёт о реализации товара** в личном кабинете.

Отчёт придёт не позднее 5-го числа следующего месяца.

[Подробнее об отчёте в Базе знаний продавца](https://seller-edu.ozon.ru/docs/finances-documents/calculations-documents/otchet-o-realizacii-tovarov.html)

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v2GetRealizationReportRequestV2` — see [../common-types/v2getrealizationreportrequestv2.md](../common-types/v2getrealizationreportrequestv2.md)- `v2GetRealizationReportResponseV2` — see [../common-types/v2getrealizationreportresponsev2.md](../common-types/v2getrealizationreportresponsev2.md)
## POST /v3/finance/transaction/list

**Summary:** Список транзакций

**operationId:** `FinanceAPI_FinanceTransactionListV3`

&lt;aside class="warning"&gt;
Используйте метод с последовательной отправкой запросов.&lt;br&gt;
Данные могут не соответствовать информации в личном кабинете.
&lt;/aside&gt;

Возвращает подробную информацию по всем начислениям. Максимальный период, за который можно получить информацию в одном запросе — 1 месяц.

Если в запросе не указывать `posting_number`, то в ответе будут все отправления за указанный период или отправления определённого типа.

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
- `financev3FinanceTransactionListV3Request` — see [../common-types/financev3financetransactionlistv3request.md](../common-types/financev3financetransactionlistv3request.md)- `financev3FinanceTransactionListV3Response` — see [../common-types/financev3financetransactionlistv3response.md](../common-types/financev3financetransactionlistv3response.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)
## POST /v3/finance/transaction/totals

**Summary:** Суммы транзакций

**operationId:** `FinanceAPI_FinanceTransactionTotalV3`

&lt;aside class="warning"&gt;
Данные могут не соответствовать информации в личном кабинете.
&lt;/aside&gt;

Возвращает итоговые суммы по транзакциям за указанный период. 

Если вы неправильно заполните номера отправлений, в ответе вернутся нулевые значения.

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
- `financev3FinanceTransactionTotalsV3Request` — see [../common-types/financev3financetransactiontotalsv3request.md](../common-types/financev3financetransactiontotalsv3request.md)- `financev3FinanceTransactionTotalsV3Response` — see [../common-types/financev3financetransactiontotalsv3response.md](../common-types/financev3financetransactiontotalsv3response.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)
