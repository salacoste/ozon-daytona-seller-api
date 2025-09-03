# GiveoutInfoResponseArticleDetails

## Top-level fields
- `GiveoutInfoResponseArticleDetails` (top-level fields):
  - `approved`: `boolean`
  - `delivery_schema` → `$ref` v1GiveoutDeliverySchema
  - `name`: `string`
  - `seller_id`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "approved": {
      "description": "`true`, если отгрузка подтверждена.\n",
      "type": "boolean"
    },
    "delivery_schema": {
      "$ref": "#/components/schemas/v1GiveoutDeliverySchema"
    },
    "name": {
      "description": "Название товара.",
      "type": "string"
    },
    "seller_id": {
      "description": "Идентификатор продавца.",
      "type": "integer",
      "format": "int64"
    }
  }
}
```
