# v1GiveoutInfoResponse

## Top-level fields
- `v1GiveoutInfoResponse` (top-level fields):
  - `articles`: `array`
  - `giveout_id`: `integer`
  - `giveout_status` → `$ref` v1GiveoutStatus
  - `warehouse_address`: `string`
  - `warehouse_name`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "articles": {
      "description": "Артикулы товаров.",
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/GiveoutInfoResponseArticleDetails"
      }
    },
    "giveout_id": {
      "description": "Идентификатор отгрузки.",
      "type": "integer",
      "format": "int64"
    },
    "giveout_status": {
      "$ref": "#/components/schemas/v1GiveoutStatus"
    },
    "warehouse_address": {
      "description": "Адрес склада.",
      "type": "string"
    },
    "warehouse_name": {
      "description": "Название склада.",
      "type": "string"
    }
  }
}
```
