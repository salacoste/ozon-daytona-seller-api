# RowItem

Информация о товаре.

## Top-level fields
- `RowItem` (top-level fields):
  - `barcode`: `string`
  - `name`: `string`
  - `offer_id`: `string`
  - `sku`: `integer`

## Full schema (JSON)
```json
{
  "properties": {
    "barcode": {
      "type": "string",
      "description": "Штрихкод товара."
    },
    "name": {
      "type": "string",
      "description": "Наименование товара."
    },
    "offer_id": {
      "type": "string",
      "description": "Идентификатор товара в системе продавца — артикул."
    },
    "sku": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор товара в системе Ozon — SKU."
    }
  },
  "type": "object",
  "title": "object",
  "description": "Информация о товаре."
}
```
