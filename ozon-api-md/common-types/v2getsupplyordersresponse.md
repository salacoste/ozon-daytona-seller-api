# v2GetSupplyOrdersResponse

## Top-level fields
- `v2GetSupplyOrdersResponse` (top-level fields):
  - `orders`: `array`
  - `warehouses`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "orders": {
      "description": "Информация о заявке на поставку.",
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/v2Order"
      }
    },
    "warehouses": {
      "description": "Информация о складе.",
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/v2Warehouse"
      }
    }
  }
}
```
