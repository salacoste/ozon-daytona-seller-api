# BrandAPI

## POST /v1/brand/company-certification/list

**Summary:** Список сертифицируемых брендов

**operationId:** `BrandAPI_BrandCompanyCertificationList`

Метод для получения списка брендов, для которых требуется предоставить сертификат. Ответ содержит список брендов,
товары которых есть в вашем личном кабинете.

Список брендов может изменяться, если Ozon получит требование от бренда предоставлять сертификат.

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
- `brandBrandCompanyCertificationListRequest` — see [../common-types/brandbrandcompanycertificationlistrequest.md](../common-types/brandbrandcompanycertificationlistrequest.md)- `brandBrandCompanyCertificationListResponse` — see [../common-types/brandbrandcompanycertificationlistresponse.md](../common-types/brandbrandcompanycertificationlistresponse.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)
