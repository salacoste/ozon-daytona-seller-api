# GetEtgbRequestDate

Фильтр по периоду создания деклараций.

## Top-level fields
- `GetEtgbRequestDate` (top-level fields):
  - `from`: `string`
  - `to`: `string`

## Full schema (JSON)
```json
{
  "required": [
    "from",
    "to"
  ],
  "type": "object",
  "title": "object",
  "description": "Фильтр по периоду создания деклараций.",
  "properties": {
    "from": {
      "type": "string",
      "format": "date-time",
      "description": "Дата начала."
    },
    "to": {
      "type": "string",
      "format": "date-time",
      "description": "Дата окончания."
    }
  }
}
```
