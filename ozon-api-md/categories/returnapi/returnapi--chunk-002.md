# ReturnAPI

## POST /v1/returns/company/fbs/info

**Summary:** Количество возвратов FBS

**operationId:** `returnsCompanyFBSInfo`

Метод для получения информации о возвратах FBS и их количестве.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1ReturnsCompanyFbsInfoRequest` — see [../common-types/v1returnscompanyfbsinforequest.md](../common-types/v1returnscompanyfbsinforequest.md)- `v1ReturnsCompanyFbsInfoResponse` — see [../common-types/v1returnscompanyfbsinforesponse.md](../common-types/v1returnscompanyfbsinforesponse.md)
