# ProductV1QuantInfoRequest

## Top-level fields
- `ProductV1QuantInfoRequest` (top-level fields):
  - `quant_code`: `object`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "quant_code": {
      "minItems": 1,
      "maxItems": 1000,
      "description": "Список квантов с товарами.\n",
      "items": {
        "type": "string"
      }
    }
  },
  "required": [
    "quant_code"
  ]
}
```
