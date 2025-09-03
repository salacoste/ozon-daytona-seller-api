# GetConditionalCancellationListResponseCounters

Cчётчик заявок в разных статусах.

## Top-level fields
- `GetConditionalCancellationListResponseCounters` (top-level fields):
  - `on_approval`: `integer`
  - `approved`: `integer`
  - `rejected`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Cчётчик заявок в разных статусах.",
  "properties": {
    "on_approval": {
      "description": "Количество заявок на рассмотрении.",
      "type": "integer",
      "format": "int64"
    },
    "approved": {
      "description": "Количество подтверждённых заявок.",
      "type": "integer",
      "format": "int64"
    },
    "rejected": {
      "description": "Количество отклонённых заявок.",
      "type": "integer",
      "format": "int64"
    }
  }
}
```
