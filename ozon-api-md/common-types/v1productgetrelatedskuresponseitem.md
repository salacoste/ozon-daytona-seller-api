# v1ProductGetRelatedSKUResponseItem

## Top-level fields
- `v1ProductGetRelatedSKUResponseItem` (top-level fields):
  - `availability`: `string`
  - `deleted_at`: `string`
  - `delivery_schema`: `string`
  - `product_id`: `integer`
  - `sku`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "availability": {
      "type": "string",
      "description": "Признак доступности товара по SKU:\n- `HIDDEN` — скрыт;\n- `AVAILABLE` — доступен;\n- `UNAVAILABLE` — недоступен, SKU удалён.\n"
    },
    "deleted_at": {
      "type": "string",
      "format": "date-time",
      "description": "Дата и время удаления."
    },
    "delivery_schema": {
      "type": "string",
      "description": "Схема доставки:\n- `SDS` - идентификатор единого Ozon SKU;\n- `FBO` - идентификатор товара, который продаётся со склада Ozon;\n- `FBS` - идентификатор товара, который продаётся со склада FBS;\n- `Crossborder` - идентификатор товара, который продаётся из-за границы.\n"
    },
    "product_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор товара в системе продавца — `product_id`."
    },
    "sku": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор товара в системе Ozon — SKU."
    }
  }
}
```
