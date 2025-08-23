# CertificationAPI

## GET /v1/product/certificate/accordance-types

**Summary:** Список типов соответствия требованиям (версия 1)

**operationId:** `ProductAPI_ProductCertificateAccordanceTypes`

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
- `productProductCertificateAccordanceTypesResponse` — see [../common-types/productproductcertificateaccordancetypesresponse.md](../common-types/productproductcertificateaccordancetypesresponse.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)
## POST /v1/product/certificate/bind

**Summary:** Привязать сертификат к товару

**operationId:** `ProductAPI_ProductCertificateBind`

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
- `productBooleanResponse` — see [../common-types/productbooleanresponse.md](../common-types/productbooleanresponse.md)- `productProductCertificateBindRequest` — see [../common-types/productproductcertificatebindrequest.md](../common-types/productproductcertificatebindrequest.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)
## POST /v1/product/certificate/create

**Summary:** Добавить сертификаты для товаров

**operationId:** `ProductAPI_ProductCertificateCreate`

**Parameters (path/query/header/cookie):**
_query_:
- `` (optional)
- `` (optional)

**Request body (minimal valid example):**
```json
{
  "files": [],
  "name": "text",
  "number": "text",
  "type_code": "text",
  "issue_date": "2025-08-21T00:00:00Z"
}
```

**Success response (example):**
```json
{
  "id": 50058
}
```

**Related schemas:**
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)
## POST /v1/product/certificate/delete

**Summary:** Удалить сертификат

**operationId:** `CertificateDelete`

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1ProductCertificateDeleteRequest` — see [../common-types/v1productcertificatedeleterequest.md](../common-types/v1productcertificatedeleterequest.md)- `v1ProductCertificateDeleteResponse` — see [../common-types/v1productcertificatedeleteresponse.md](../common-types/v1productcertificatedeleteresponse.md)
## POST /v1/product/certificate/info

**Summary:** Информация о сертификате

**operationId:** `CertificateInfo`

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1ProductCertificateInfoRequest` — see [../common-types/v1productcertificateinforequest.md](../common-types/v1productcertificateinforequest.md)- `v1ProductCertificateInfoResponse` — see [../common-types/v1productcertificateinforesponse.md](../common-types/v1productcertificateinforesponse.md)
## POST /v1/product/certificate/list

**Summary:** Список сертификатов

**operationId:** `CertificateList`

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1ProductCertificateListRequest` — see [../common-types/v1productcertificatelistrequest.md](../common-types/v1productcertificatelistrequest.md)- `v1ProductCertificateListResponse` — see [../common-types/v1productcertificatelistresponse.md](../common-types/v1productcertificatelistresponse.md)
## POST /v1/product/certificate/product_status/list

**Summary:** Список возможных статусов товаров

**operationId:** `ProductStatusList`

Метод для получения списка возможных статусов товаров при их привязке к сертификату.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1ProductCertificateProductStatusListRequest` — see [../common-types/v1productcertificateproductstatuslistrequest.md](../common-types/v1productcertificateproductstatuslistrequest.md)- `v1ProductCertificateProductStatusListResponse` — see [../common-types/v1productcertificateproductstatuslistresponse.md](../common-types/v1productcertificateproductstatuslistresponse.md)
## POST /v1/product/certificate/products/list

**Summary:** Список товаров, привязанных к сертификату

**operationId:** `CertificateProductsList`

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1ProductCertificateProductsListRequest` — see [../common-types/v1productcertificateproductslistrequest.md](../common-types/v1productcertificateproductslistrequest.md)- `v1ProductCertificateProductsListResponse` — see [../common-types/v1productcertificateproductslistresponse.md](../common-types/v1productcertificateproductslistresponse.md)
