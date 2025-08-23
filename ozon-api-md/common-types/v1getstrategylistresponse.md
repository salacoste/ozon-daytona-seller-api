# v1GetStrategyListResponse

## Top-level fields
- `v1GetStrategyListResponse` (top-level fields):
  - `strategies`: `array`
  - `total`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "strategies": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/GetStrategyListResponseStrategy"
      },
      "description": "Список стратегий."
    },
    "total": {
      "type": "integer",
      "format": "int32",
      "description": "Общее количество стратегий."
    }
  }
}
```
