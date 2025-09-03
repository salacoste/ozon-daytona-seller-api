# ConditionalCancellationState

Статус заявки на отмену.

## Top-level fields
- `ConditionalCancellationState` (top-level fields):
  - `id`: `integer`
  - `name`: `string`
  - `state`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Статус заявки на отмену.",
  "properties": {
    "id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор статуса."
    },
    "name": {
      "type": "string",
      "description": "Название статуса."
    },
    "state": {
      "type": "string",
      "enum": [
        "ON_APPROVAL",
        "APPROVED",
        "REJECTED"
      ],
      "description": "Статус заявки:\n- `ON_APPROVAL` — ожидает решения.\n- `APPROVED` — подтверждённая.\n- `REJECTED` — отклонённая.\n"
    }
  }
}
```
