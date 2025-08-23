# sellerSellerAPIArrivalPassCreateRequest

## Top-level fields
- `sellerSellerAPIArrivalPassCreateRequest` (top-level fields):
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
  "title": "object",
  "properties": {
    "arrival_passes": {
      "type": "array",
      "description": "Список пропусков.",
      "items": {
        "$ref": "#/components/schemas/sellerSellerAPIArrivalPassCreateRequestArrivalPass"
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
