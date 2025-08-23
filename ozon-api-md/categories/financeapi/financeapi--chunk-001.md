# FinanceAPI

## POST /v1/finance/compensation

**Summary:** Отчёт о компенсациях

**operationId:** `ReportAPI_GetCompensationReport`

Метод для получения отчёта о компенсациях. Соответствует отчёту из раздела **Финансы → Документы → Компенсации и прочие начисления** в личном кабинете.

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
- `CreateReportResponse` — see [../common-types/createreportresponse.md](../common-types/createreportresponse.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1GetCompensationReportRequest` — see [../common-types/v1getcompensationreportrequest.md](../common-types/v1getcompensationreportrequest.md)
## POST /v1/finance/decompensation

**Summary:** Отчёт о декомпенсациях

**operationId:** `ReportAPI_GetDecompensationReport`

Метод для получения отчёта о декомпенсациях. Соответствует отчёту из раздела **Финансы → Документы → Компенсации и прочие начисления** в личном кабинете.

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
- `CreateReportResponse` — see [../common-types/createreportresponse.md](../common-types/createreportresponse.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1GetDecompensationReportRequest` — see [../common-types/v1getdecompensationreportrequest.md](../common-types/v1getdecompensationreportrequest.md)
## POST /v1/finance/document-b2b-sales

**Summary:** Реестр продаж юридическим лицам

**operationId:** `ReportAPI_CreateDocumentB2BSalesReport`

Используйте метод, чтобы получить отчёт по продажам юридическим лицам. Соответствует разделу **Финансы → Документы → Реестр продаж юр. лицам** в личном кабинете.

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
- `commonCreateReportResponse` — see [../common-types/commoncreatereportresponse.md](../common-types/commoncreatereportresponse.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1CreateDocumentB2BSalesReportRequest` — see [../common-types/v1createdocumentb2bsalesreportrequest.md](../common-types/v1createdocumentb2bsalesreportrequest.md)
## POST /v1/finance/document-b2b-sales/json

**Summary:** Реестр продаж юридическим лицам в JSON-формате

**operationId:** `ReportAPI_CreateDocumentB2BSalesJSONReport`

Используйте метод, чтобы получить отчёт по продажам юридическим лицам в JSON-формате. Соответствует разделу **Финансы → Документы → Реестр продаж юр. лицам** в личном кабинете.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1CreateDocumentB2BSalesJSONReportRequest` — see [../common-types/v1createdocumentb2bsalesjsonreportrequest.md](../common-types/v1createdocumentb2bsalesjsonreportrequest.md)- `v1CreateDocumentB2BSalesJSONReportResponse` — see [../common-types/v1createdocumentb2bsalesjsonreportresponse.md](../common-types/v1createdocumentb2bsalesjsonreportresponse.md)
## POST /v1/finance/mutual-settlement

**Summary:** Отчёт о взаиморасчётах

**operationId:** `ReportAPI_CreateMutualSettlementReport`

Используйте метод, чтобы получить отчёт о взаиморасчетах. Соответствует разделу **Финансы → Документы → Аналитические отчеты → Отчет о взаиморасчетах** в личном кабинете.

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
- `commonCreateReportResponse` — see [../common-types/commoncreatereportresponse.md](../common-types/commoncreatereportresponse.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1CreateMutualSettlementReportRequest` — see [../common-types/v1createmutualsettlementreportrequest.md](../common-types/v1createmutualsettlementreportrequest.md)
## POST /v1/finance/products/buyout

**Summary:** Отчёт о выкупленных товарах

**operationId:** `GetFinanceProductsBuyout`

Возвращает отчёт о товарах, которые выкупил Ozon для продажи в ЕАЭС и другие страны. Соответствует разделу **Финансы → Документы → УПД по сделкам с юр. лицами → УПД по выкупленным товарам** в личном кабинете.

[Подробнее о продаже товаров в ЕАЭС и другие страны в Базе знаний](https://seller-edu.ozon.ru/commissions-tariffs/commissions-tariffs-ozon/prodaji-tovarov-v-eaes-i-drugie-strany?search=выкупленные+товары)

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1GetFinanceProductsBuyoutRequest` — see [../common-types/v1getfinanceproductsbuyoutrequest.md](../common-types/v1getfinanceproductsbuyoutrequest.md)- `v1GetFinanceProductsBuyoutResponse` — see [../common-types/v1getfinanceproductsbuyoutresponse.md](../common-types/v1getfinanceproductsbuyoutresponse.md)
