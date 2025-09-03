# v1GetConditionalCancellationListResponse

## Top-level fields
- `v1GetConditionalCancellationListResponse` (top-level fields):
  - `result`: `object`
  - `total`: `integer`
  - `counters` → `$ref` GetConditionalCancellationListResponseCounters

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "result": {
      "description": "Список заявок на отмену.",
      "items": {
        "$ref": "#/components/schemas/v1ConditionalCancellation"
      }
    },
    "total": {
      "type": "integer",
      "format": "int32",
      "description": "Общее количество заявок по заданным фильтрам."
    },
    "counters": {
      "$ref": "#/components/schemas/GetConditionalCancellationListResponseCounters"
    }
  }
}
```
