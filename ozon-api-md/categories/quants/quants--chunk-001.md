# Quants

## POST /v1/product/quant/info

**Summary:** Информация об эконом-товаре

**operationId:** `QuantGetInfo`

Вы можете оставить обратную связь по этому методу в комментариях к [обсуждению](https://dev.ozon.ru/community/1084-Metody-po-tarifu-Ekonom) в сообществе разработчиков Ozon for dev.

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
- `ProductV1QuantInfoRequest` — see [../common-types/productv1quantinforequest.md](../common-types/productv1quantinforequest.md)- `ProductV1QuantInfoResponse` — see [../common-types/productv1quantinforesponse.md](../common-types/productv1quantinforesponse.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)
## POST /v1/product/quant/list

**Summary:** Список эконом-товаров

**operationId:** `QuantProductList`

Вы можете оставить обратную связь по этому методу в комментариях к [обсуждению](https://dev.ozon.ru/community/1084-Metody-po-tarifu-Ekonom) в сообществе разработчиков Ozon for dev.

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
- `ProductV1QuantListRequest` — see [../common-types/productv1quantlistrequest.md](../common-types/productv1quantlistrequest.md)- `ProductV1QuantListResponse` — see [../common-types/productv1quantlistresponse.md](../common-types/productv1quantlistresponse.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)
