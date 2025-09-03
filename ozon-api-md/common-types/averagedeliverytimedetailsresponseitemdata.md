# AverageDeliveryTimeDetailsResponseItemData

Данные о товаре.

## Top-level fields
- `AverageDeliveryTimeDetailsResponseItemData` (top-level fields):
  - `delivery_schema` → `$ref` AverageDeliveryTimeDetailsResponseItemDataDeliverySchema
  - `name`: `string`
  - `offer_id`: `string`
  - `sku`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "description": "Данные о товаре.",
  "properties": {
    "delivery_schema": {
      "$ref": "#/components/schemas/AverageDeliveryTimeDetailsResponseItemDataDeliverySchema"
    },
    "name": {
      "type": "string",
      "description": "Название товара."
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
  }
}
```
