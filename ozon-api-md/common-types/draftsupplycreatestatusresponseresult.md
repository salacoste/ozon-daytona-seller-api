# DraftSupplyCreateStatusResponseResult

Идентификаторы заявок на поставку.

## Top-level fields
- `DraftSupplyCreateStatusResponseResult` (top-level fields):
  - `order_ids`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "description": "Идентификаторы заявок на поставку.",
  "properties": {
    "order_ids": {
      "type": "array",
      "description": "Идентификаторы заявок на поставку.",
      "items": {
        "type": "string",
        "format": "int64"
      }
    }
  }
}
```
