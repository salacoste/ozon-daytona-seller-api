# ReturnsRfbsListResponseReturns

Данные о заявках.

## Top-level fields
- `ReturnsRfbsListResponseReturns` (top-level fields):
  - `client_name`: `string`
  - `created_at`: `string`
  - `order_number`: `string`
  - `posting_number`: `string`
  - `product` → `$ref` v2Product
  - `return_id`: `integer`
  - `return_number`: `string`
  - `state` → `$ref` v2ReturnsRfbsListV2ResponseState

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Данные о заявках.",
  "properties": {
    "client_name": {
      "type": "string",
      "description": "Имя покупателя."
    },
    "created_at": {
      "type": "string",
      "format": "date-time",
      "description": "Дата создания заявки."
    },
    "order_number": {
      "type": "string",
      "description": "Номер заказа."
    },
    "posting_number": {
      "type": "string",
      "description": "Номер отправления."
    },
    "product": {
      "$ref": "#/components/schemas/v2Product"
    },
    "return_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор заявки на возврат."
    },
    "return_number": {
      "type": "string",
      "description": "Номер заявки на возврат."
    },
    "state": {
      "$ref": "#/components/schemas/v2ReturnsRfbsListV2ResponseState"
    }
  }
}
```
