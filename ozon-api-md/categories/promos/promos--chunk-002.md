# Promos

## POST /v1/actions/products/deactivate

**Summary:** Удалить товары из акции

**operationId:** `PromosProductsDeactivate`

Метод для удаления товаров из акции.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `seller_apiProductIDsV1Request` — see [../common-types/seller-apiproductidsv1request.md](../common-types/seller-apiproductidsv1request.md)- `seller_apiProductV1ResponseDeactivate` — see [../common-types/seller-apiproductv1responsedeactivate.md](../common-types/seller-apiproductv1responsedeactivate.md)
