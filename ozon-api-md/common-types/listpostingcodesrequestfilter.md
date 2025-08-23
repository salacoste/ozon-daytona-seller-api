# ListPostingCodesRequestFilter

Фильтр для поиска отправлений.

## Top-level fields
- `ListPostingCodesRequestFilter` (top-level fields):
  - `posting_number`: `array`
  - `since`: `string`
  - `to`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "description": "Фильтр для поиска отправлений.",
  "properties": {
    "posting_number": {
      "description": "Номер отправления.",
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "since": {
      "description": "Начало периода в формате `YYYY-MM-DD`.",
      "type": "string",
      "format": "date-time"
    },
    "to": {
      "description": "Конец периода в формате `YYYY-MM-DD`.",
      "type": "string",
      "format": "date-time"
    }
  }
}
```
