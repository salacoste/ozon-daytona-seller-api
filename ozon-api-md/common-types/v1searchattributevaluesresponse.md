# v1SearchAttributeValuesResponse

## Top-level fields
- `v1SearchAttributeValuesResponse` (top-level fields):
  - `result`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "result": {
      "description": "Значения характеристики.",
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/SearchAttributeValuesResponseValue"
      }
    }
  }
}
```
