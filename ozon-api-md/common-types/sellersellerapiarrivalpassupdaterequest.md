# sellerSellerAPIArrivalPassUpdateRequest

## Top-level fields
- `sellerSellerAPIArrivalPassUpdateRequest` (top-level fields):
  - `arrival_passes`: `array`
  - `carriage_id`: `integer`

## Full schema (JSON)
```json
{
  "required": [
    "arrival_passes",
    "carriage_id"
  ],
  "type": "object",
  "properties": {
    "arrival_passes": {
      "type": "array",
      "description": "Список пропусков.",
      "items": {
        "$ref": "#/components/schemas/sellerSellerAPIArrivalPassUpdateRequestArrivalPass"
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
