# GiveoutListResponseGiveoutDetails

## Top-level fields
- `GiveoutListResponseGiveoutDetails` (top-level fields):
  - `approved_articles_count`: `integer`
  - `created_at`: `string`
  - `giveout_id`: `integer`
  - `giveout_status` → `$ref` v1GiveoutStatus
  - `total_articles_count`: `integer`
  - `warehouse_address`: `string`
  - `warehouse_id`: `integer`
  - `warehouse_name`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "approved_articles_count": {
      "description": "Количество товаров в отгрузке.",
      "type": "integer",
      "format": "int32"
    },
    "created_at": {
      "description": "Дата и время.",
      "type": "string",
      "format": "date-time"
    },
    "giveout_id": {
      "description": "Идентификатор отгрузки.",
      "type": "integer",
      "format": "int64"
    },
    "giveout_status": {
      "$ref": "#/components/schemas/v1GiveoutStatus"
    },
    "total_articles_count": {
      "description": "Общее количество товаров, которые нужно забрать со склада.",
      "type": "integer",
      "format": "int32"
    },
    "warehouse_address": {
      "description": "Адрес склада.",
      "type": "string"
    },
    "warehouse_id": {
      "description": "Идентификатор склада.",
      "type": "integer",
      "format": "int64"
    },
    "warehouse_name": {
      "description": "Название склада.",
      "type": "string"
    }
  }
}
```
