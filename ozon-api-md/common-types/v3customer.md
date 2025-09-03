# v3Customer

Данные о покупателе.

## Top-level fields
- `v3Customer` (top-level fields):
  - `address` → `$ref` v3Address
  - `customer_id`: `integer`
  - `name`: `string`
  - `phone`: `string`

## Full schema (JSON)
```json
{
  "properties": {
    "address": {
      "$ref": "#/components/schemas/v3Address"
    },
    "customer_id": {
      "format": "int64",
      "type": "integer",
      "description": "Идентификатор покупателя."
    },
    "name": {
      "type": "string",
      "description": "Имя покупателя."
    },
    "phone": {
      "type": "string",
      "description": "Контактный телефон. \n\nВсегда возвращает пустую строку `\"\"`.\n"
    }
  },
  "type": "object",
  "title": "object",
  "description": "Данные о покупателе."
}
```
