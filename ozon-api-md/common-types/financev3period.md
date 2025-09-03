# financev3Period

Период формирования отчёта.

## Top-level fields
- `financev3Period` (top-level fields):
  - `from`: `string`
  - `to`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Период формирования отчёта.",
  "properties": {
    "from": {
      "type": "string",
      "format": "date-time",
      "description": "Дата, с ĸоторой рассчитывается отчёт."
    },
    "to": {
      "type": "string",
      "format": "date-time",
      "description": "Дата, по ĸоторую рассчитывается отчёт."
    }
  },
  "required": [
    "from",
    "to"
  ]
}
```
