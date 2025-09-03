# v1SupplyOrderCancelRequest

## Top-level fields
- `v1SupplyOrderCancelRequest` (top-level fields):
  - `order_id`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "order_id": {
      "description": "Идентификатор заявки на поставку.",
      "type": "integer",
      "format": "int64"
    }
  },
  "required": [
    "order_id"
  ]
}
```
