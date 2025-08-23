# postinglistV3status

Период, в который последний раз изменялся статус у отправлений.

## Top-level fields
- `postinglistV3status` (top-level fields):
  - `from`: `string`
  - `to`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Период, в который последний раз изменялся статус у отправлений.",
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
