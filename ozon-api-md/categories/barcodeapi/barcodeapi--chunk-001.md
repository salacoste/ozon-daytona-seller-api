# BarcodeAPI

## POST /v1/barcode/add

**Summary:** Привязать штрихкод к товару

**operationId:** `add-barcode`

Если у товара есть штрихкод, который не указан в системе Ozon, привяжите его с помощью этого метода.
Если штрихкода нет, вы можете создать его через метод [/v1/barcode/generate](#operation/generate-barcode).

За один запрос вы можете назначить штрихкод не больше чем на 100 товаров. 
На одном товаре может быть до 100 штрихкодов. 
С одного аккаунта продавца можно использовать метод не больше 20 раз в минуту.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1AddBarcodeRequest` — see [../common-types/v1addbarcoderequest.md](../common-types/v1addbarcoderequest.md)- `v1AddBarcodeResponse` — see [../common-types/v1addbarcoderesponse.md](../common-types/v1addbarcoderesponse.md)
## POST /v1/barcode/generate

**Summary:** Создать штрихкод для товара

**operationId:** `generate-barcode`

Если у товара нет штрихкода, вы можете создать его с помощью этого метода.
Если штрихкод уже есть, но он не указан в системе Ozon, вы можете привязать его через метод [/v1/barcode/add](#operation/add-barcode).

За один запрос вы можете создать штрихкоды не больше чем для 100 товаров.
С одного аккаунта продавца можно использовать метод не больше 20 раз в минуту.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1GenerateBarcodeRequest` — see [../common-types/v1generatebarcoderequest.md](../common-types/v1generatebarcoderequest.md)- `v1GenerateBarcodeResponse` — see [../common-types/v1generatebarcoderesponse.md](../common-types/v1generatebarcoderesponse.md)
