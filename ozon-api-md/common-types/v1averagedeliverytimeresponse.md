# v1AverageDeliveryTimeResponse

## Top-level fields
- `v1AverageDeliveryTimeResponse` (top-level fields):
  - `data`: `array`
  - `total` → `$ref` AverageDeliveryTimeResponseTotal

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "data": {
      "description": "Информация о кластере.",
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/v1AverageDeliveryTimeResponseData"
      }
    },
    "total": {
      "$ref": "#/components/schemas/AverageDeliveryTimeResponseTotal"
    }
  }
}
```
