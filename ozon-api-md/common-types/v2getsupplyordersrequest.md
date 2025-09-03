# v2GetSupplyOrdersRequest

## Top-level fields
- `v2GetSupplyOrdersRequest` (top-level fields):
  - `order_ids`: `array`

## Full schema (JSON)
```json
{
  "required": [
    "order_ids"
  ],
  "type": "object",
  "title": "object",
  "properties": {
    "order_ids": {
      "description": "Идентификатор заявки на поставку в системе Ozon.",
      "type": "array",
      "items": {
        "type": "string",
        "format": "int64"
      }
    }
  }
}
```
