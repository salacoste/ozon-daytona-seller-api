# sellerSellerAPIArrivalPassDeleteRequest

## Top-level fields
- `sellerSellerAPIArrivalPassDeleteRequest` (top-level fields):
  - `arrival_pass_ids`: `array`
  - `carriage_id`: `integer`

## Full schema (JSON)
```json
{
  "required": [
    "arrival_pass_ids",
    "carriage_id"
  ],
  "type": "object",
  "properties": {
    "arrival_pass_ids": {
      "type": "array",
      "description": "Идентификаторы пропусков.",
      "items": {
        "type": "string",
        "format": "int64"
      }
    },
    "carriage_id": {
      "type": "integer",
      "description": "Идентификатор перевозки.",
      "format": "int64"
    }
  }
}
```
