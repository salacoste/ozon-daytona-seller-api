# sellerSellerAPIArrivalPassCreateResponse

Результат запроса.

## Top-level fields
- `sellerSellerAPIArrivalPassCreateResponse` (top-level fields):
  - `arrival_pass_ids`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Результат запроса.",
  "properties": {
    "arrival_pass_ids": {
      "type": "array",
      "description": "Идентификаторы пропусков.",
      "items": {
        "type": "string",
        "format": "int64"
      }
    }
  }
}
```
