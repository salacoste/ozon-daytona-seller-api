# v3FbsPostingExemplarProductV3

Список товаров и экземпляров.

## Top-level fields
- `v3FbsPostingExemplarProductV3` (top-level fields):
  - `exemplars`: `array`
  - `sku`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Список товаров и экземпляров.",
  "properties": {
    "exemplars": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/v3FbsPostingProductExemplarInfoV3"
      },
      "description": "Информация по экземплярам."
    },
    "sku": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор товара в системе Ozon — SKU."
    }
  }
}
```
