# v1SupplyOrderStatusCounterResponseItem

## Top-level fields
- `v1SupplyOrderStatusCounterResponseItem` (top-level fields):
  - `count`: `integer`
  - `order_state` → `$ref` v1OrderState

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "count": {
      "description": "Количество заявок в статусе.",
      "type": "integer",
      "format": "int32"
    },
    "order_state": {
      "description": null,
      "$ref": "#/components/schemas/v1OrderState"
    }
  }
}
```
