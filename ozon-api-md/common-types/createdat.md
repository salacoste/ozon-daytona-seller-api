# CreatedAt

Период создания заявки.

## Top-level fields
- `CreatedAt` (top-level fields):
  - `from`: `string`
  - `to`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Период создания заявки.",
  "properties": {
    "from": {
      "type": "string",
      "format": "date-time",
      "description": "Дата начала периода."
    },
    "to": {
      "type": "string",
      "format": "date-time",
      "description": "Дата окончания периода."
    }
  }
}
```
