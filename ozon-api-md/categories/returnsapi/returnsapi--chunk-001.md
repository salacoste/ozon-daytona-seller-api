# ReturnsAPI

## POST /v1/returns/list

**Summary:** Информация о возвратах FBO и FBS

**operationId:** `returnsList`

Метод для получения информации о возвратах FBO и FBS.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1GetReturnsListRequest` — see [../common-types/v1getreturnslistrequest.md](../common-types/v1getreturnslistrequest.md)- `v1GetReturnsListResponse` — see [../common-types/v1getreturnslistresponse.md](../common-types/v1getreturnslistresponse.md)
