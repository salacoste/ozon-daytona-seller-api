# ProductAPI

## POST /v2/product/pictures/info

**Summary:** Получить изображения товаров

**operationId:** `ProductAPI_ProductInfoPicturesV2`

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v2ProductInfoPicturesRequest` — see [../common-types/v2productinfopicturesrequest.md](../common-types/v2productinfopicturesrequest.md)- `v2ProductInfoPicturesResponse` — see [../common-types/v2productinfopicturesresponse.md](../common-types/v2productinfopicturesresponse.md)
## POST /v2/products/delete

**Summary:** Удалить товар без SKU из архива

**operationId:** `ProductAPI_DeleteProducts`

В одном запросе можно передать до 500 идентификаторов.

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
- `productv2DeleteProductsRequest` — see [../common-types/productv2deleteproductsrequest.md](../common-types/productv2deleteproductsrequest.md)- `productv2DeleteProductsResponse` — see [../common-types/productv2deleteproductsresponse.md](../common-types/productv2deleteproductsresponse.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)
