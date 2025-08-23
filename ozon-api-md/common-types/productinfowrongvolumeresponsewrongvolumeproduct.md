# ProductInfoWrongVolumeResponseWrongVolumeProduct

## Top-level fields
- `ProductInfoWrongVolumeResponseWrongVolumeProduct` (top-level fields):
  - `height`: `integer`
  - `length`: `integer`
  - `name`: `string`
  - `offer_id`: `string`
  - `product_id`: `integer`
  - `sku`: `integer`
  - `weight`: `integer`
  - `width`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "height": {
      "type": "integer",
      "format": "int64",
      "description": "Высота товара."
    },
    "length": {
      "type": "integer",
      "format": "int64",
      "description": "Длина товара."
    },
    "name": {
      "type": "string",
      "description": "Название товара."
    },
    "offer_id": {
      "type": "string",
      "description": "Идентификатор товара в системе продавца — артикул."
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
    },
    "weight": {
      "type": "integer",
      "format": "int64",
      "description": "Вес товара в упаковке."
    },
    "width": {
      "type": "integer",
      "format": "int64",
      "description": "Ширина товара."
    }
  }
}
```
