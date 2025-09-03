# v1SupplyOrderContentUpdateRequest

## Top-level fields
- `v1SupplyOrderContentUpdateRequest` (top-level fields):
  - `items`: `array`
  - `order_id`: `integer`
  - `supply_id`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "items": {
      "type": "array",
      "description": "Новый товарный состав заявки на поставку.\n\nМаксимум 5000 товаров.\n",
      "items": {
        "$ref": "#/components/schemas/v1SupplyOrderContentUpdateRequestItem"
      }
    },
    "order_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор заказа."
    },
    "supply_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор поставки."
    }
  }
}
```
