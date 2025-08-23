# SupplierAPI

## POST /v1/invoice/delete

**Summary:** Удалить ссылку на счёт-фактуру

**operationId:** `invoice_delete`

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1InvoiceDeleteRequest` — see [../common-types/v1invoicedeleterequest.md](../common-types/v1invoicedeleterequest.md)- `v1InvoiceDeleteResponse` — see [../common-types/v1invoicedeleteresponse.md](../common-types/v1invoicedeleteresponse.md)
## POST /v1/invoice/file/upload

**Summary:** Загрузка счёта-фактуры

**operationId:** `invoice_upload`

Доступные форматы: JPEG и PDF. Максимальный размер файла: 10 МБ.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1InvoiceFileUploadRequest` — see [../common-types/v1invoicefileuploadrequest.md](../common-types/v1invoicefileuploadrequest.md)- `v1InvoiceFileUploadResponse` — see [../common-types/v1invoicefileuploadresponse.md](../common-types/v1invoicefileuploadresponse.md)
## POST /v2/invoice/create-or-update

**Summary:** Создать или изменить счёт-фактуру

**operationId:** `InvoiceAPI_InvoiceCreateOrUpdateV2`

Создание или изменение таможенного счёта-фактуры для возврата НДС продавцам из Турции.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v2InvoiceCreateOrUpdateV2Request` — see [../common-types/v2invoicecreateorupdatev2request.md](../common-types/v2invoicecreateorupdatev2request.md)- `v2InvoiceCreateOrUpdateV2Response` — see [../common-types/v2invoicecreateorupdatev2response.md](../common-types/v2invoicecreateorupdatev2response.md)
## POST /v2/invoice/get

**Summary:** Получить информацию о счёте-фактуре

**operationId:** `invoice_getV2`

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1InvoiceGetRequest` — see [../common-types/v1invoicegetrequest.md](../common-types/v1invoicegetrequest.md)- `v2InvoiceGetV2Response` — see [../common-types/v2invoicegetv2response.md](../common-types/v2invoicegetv2response.md)
