# v1AverageDeliveryTimeDetailsResponse

## Top-level fields
- `v1AverageDeliveryTimeDetailsResponse` (top-level fields):
  - `data`: `array`
  - `total_rows`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "data": {
      "type": "array",
      "description": "Информация о кластере.",
      "items": {
        "$ref": "#/components/schemas/v1AverageDeliveryTimeDetailsResponseData"
      }
    },
    "total_rows": {
      "type": "integer",
      "format": "int64",
      "description": "Всего записей."
    }
  }
}
```
