# ProductCertificateUnbindResponseItem

## Top-level fields
- `ProductCertificateUnbindResponseItem` (top-level fields):
  - `error`: `string`
  - `product_id`: `integer`
  - `updated`: `boolean`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "error": {
      "type": "string",
      "description": "Сообщение об ошибке при отвязывании товара."
    },
    "product_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор товара в системе продавца — `product_id`."
    },
    "updated": {
      "type": "boolean",
      "description": "Был ли отвязан товар от сертификата:\n- `true` — отвязан,\n- `false` — не отвязан.\n"
    }
  }
}
```
