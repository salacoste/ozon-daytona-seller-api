# CertificationAPI

## POST /v1/product/certificate/rejection_reasons/list

**Summary:** Возможные причины отклонения сертификата

**operationId:** `RejectionReasonsList`

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1ProductCertificateRejectionReasonsListRequest` — see [../common-types/v1productcertificaterejectionreasonslistrequest.md](../common-types/v1productcertificaterejectionreasonslistrequest.md)- `v1ProductCertificateRejectionReasonsListResponse` — see [../common-types/v1productcertificaterejectionreasonslistresponse.md](../common-types/v1productcertificaterejectionreasonslistresponse.md)
## POST /v1/product/certificate/status/list

**Summary:** Возможные статусы сертификатов

**operationId:** `CertificateStatusList`

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1ProductCertificateStatusListRequest` — see [../common-types/v1productcertificatestatuslistrequest.md](../common-types/v1productcertificatestatuslistrequest.md)- `v1ProductCertificateStatusListResponse` — see [../common-types/v1productcertificatestatuslistresponse.md](../common-types/v1productcertificatestatuslistresponse.md)
## GET /v1/product/certificate/types

**Summary:** Справочник типов документов

**operationId:** `ProductAPI_ProductCertificateTypes`

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
- `productProductCertificateTypesResponse` — see [../common-types/productproductcertificatetypesresponse.md](../common-types/productproductcertificatetypesresponse.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)
## POST /v1/product/certificate/unbind

**Summary:** Отвязать товар от сертификата

**operationId:** `CertificateUnbind`

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1ProductCertificateUnbindRequest` — see [../common-types/v1productcertificateunbindrequest.md](../common-types/v1productcertificateunbindrequest.md)- `v1ProductCertificateUnbindResponse` — see [../common-types/v1productcertificateunbindresponse.md](../common-types/v1productcertificateunbindresponse.md)
## POST /v1/product/certification/list

**Summary:** Список сертифицируемых категорий

**operationId:** `ProductAPI_V1ProductCertificationList`

&lt;aside class="warning"&gt;
14 апреля 2025 года метод будет отключён. Переключитесь на &lt;a href="#operation/ProductAPI_ProductCertificationList"&gt;/v2/product/certification/list&lt;/a&gt;.
&lt;/aside&gt;

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
- `productProductCertificationListRequest` — see [../common-types/productproductcertificationlistrequest.md](../common-types/productproductcertificationlistrequest.md)- `productProductCertificationListResponse` — see [../common-types/productproductcertificationlistresponse.md](../common-types/productproductcertificationlistresponse.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)
## GET /v2/product/certificate/accordance-types/list

**Summary:** Список типов соответствия требованиям (версия 2)

**operationId:** `CertificateAccordanceTypes`

**Parameters (path/query/header/cookie):**
- none

**Request body (minimal valid example):**
_no request body_

**Success response (example):**
```json
{
  "result": "ok"
}
```

**Related schemas:**
- `googlerpcStatus` — see [../common-types/googlerpcstatus.md](../common-types/googlerpcstatus.md)- `v2ProductCertificateAccordanceTypesResponse` — see [../common-types/v2productcertificateaccordancetypesresponse.md](../common-types/v2productcertificateaccordancetypesresponse.md)
## POST /v2/product/certification/list

**Summary:** Список сертифицируемых категорий

**operationId:** `ProductAPI_ProductCertificationList`

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
- `googlerpcStatus` — see [../common-types/googlerpcstatus.md](../common-types/googlerpcstatus.md)- `v2ProductCertificationListRequest` — see [../common-types/v2productcertificationlistrequest.md](../common-types/v2productcertificationlistrequest.md)- `v2ProductCertificationListResponse` — see [../common-types/v2productcertificationlistresponse.md](../common-types/v2productcertificationlistresponse.md)
