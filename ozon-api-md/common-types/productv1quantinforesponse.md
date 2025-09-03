# ProductV1QuantInfoResponse

## Top-level fields
- `ProductV1QuantInfoResponse` (top-level fields):
  - `items`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "items": {
      "type": "array",
      "description": "Эконом-товары.",
      "items": {
        "$ref": "#/components/schemas/ProductV1QuantInfoResponseResultItems"
      }
    }
  }
}
```
