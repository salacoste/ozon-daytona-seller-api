# v2GetSupplyOrdersListResponse

## Top-level fields
- `v2GetSupplyOrdersListResponse` (top-level fields):
  - `last_supply_order_id`: `integer`
  - `supply_order_id`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "last_supply_order_id": {
      "description": "Идентификатор заявки на поставку, который вы запрашивали в прошлый раз.",
      "type": "integer",
      "format": "int64"
    },
    "supply_order_id": {
      "description": "Идентификатор заявки на поставку.",
      "type": "array",
      "items": {
        "type": "string",
        "format": "int64"
      }
    }
  }
}
```
