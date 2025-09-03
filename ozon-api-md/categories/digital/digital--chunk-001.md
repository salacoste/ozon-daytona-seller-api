# Digital

## POST /v1/posting/digital/codes/upload

**Summary:** Загрузить коды цифровых товаров для отправления

**operationId:** `UploadPostingCodes`

Метод доступен только продавцам, работающим с цифровыми товарами. Вы можете загрузить коды цифровых товаров в течение 24 часов с момента получения заказа.

Вы можете оставить обратную связь по этому методу в комментариях к [обсуждению](https://dev.ozon.ru/community/1588-Novye-metody-po-rabote-s-tsifrovymi-tovarami) в сообществе разработчиков Ozon for dev.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1UploadPostingCodesRequest` — see [../common-types/v1uploadpostingcodesrequest.md](../common-types/v1uploadpostingcodesrequest.md)- `v1UploadPostingCodesResponse` — see [../common-types/v1uploadpostingcodesresponse.md](../common-types/v1uploadpostingcodesresponse.md)
## POST /v1/posting/digital/list

**Summary:** Получить список отправлений

**operationId:** `ListPostingCodes`

Возвращает список отправлений, по которым нужно загрузить коды цифровых товаров. Метод доступен только продавцам, работающим с цифровыми товарами. 

Чтобы получить список отправлений в любом статусе, воспользуйтесь методом [/v2/posting/fbo/list](#operation/PostingAPI_GetFboPostingList).

Вы можете оставить обратную связь по этому методу в комментариях к [обсуждению](https://dev.ozon.ru/community/1588-Novye-metody-po-rabote-s-tsifrovymi-tovarami) в сообществе разработчиков Ozon for dev.

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
- `googlerpcStatus` — see [../common-types/googlerpcstatus.md](../common-types/googlerpcstatus.md)- `v1ListPostingCodesRequest` — see [../common-types/v1listpostingcodesrequest.md](../common-types/v1listpostingcodesrequest.md)- `v1ListPostingCodesResponse` — see [../common-types/v1listpostingcodesresponse.md](../common-types/v1listpostingcodesresponse.md)
## POST /v1/product/digital/stocks/import

**Summary:** Обновить количество цифровых товаров

**operationId:** `DigitalProductAPI_StocksImport`

Метод доступен только продавцам, работающим с цифровыми товарами. 

Используйте метод, чтобы изменить информацию о количестве товара в наличии. 

Вы можете узнать о работе с цифровыми товарами и оставить обратную связь по этому методу в комментариях к [обсуждению](https://dev.ozon.ru/community/1588-Novye-metody-po-rabote-s-tsifrovymi-tovarami) в сообществе разработчиков Ozon for dev.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1StocksImportRequest` — see [../common-types/v1stocksimportrequest.md](../common-types/v1stocksimportrequest.md)- `v1StocksImportResponse` — see [../common-types/v1stocksimportresponse.md](../common-types/v1stocksimportresponse.md)
