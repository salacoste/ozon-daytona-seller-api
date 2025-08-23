# v1GetCompetitorsResponse

## Top-level fields
- `v1GetCompetitorsResponse` (top-level fields):
  - `competitor`: `array`
  - `total`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "competitor": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/GetCompetitorsResponseCompetitorInfo"
      },
      "description": "Список конкурентов."
    },
    "total": {
      "type": "integer",
      "format": "int32",
      "description": "Общее количество конкурентов."
    }
  }
}
```
