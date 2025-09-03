# v1SupplyOrderTimeslot

Время интервала поставки.

## Top-level fields
- `v1SupplyOrderTimeslot` (top-level fields):
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
  "description": "Время интервала поставки.",
  "properties": {
    "from": {
      "description": "Начало интервала по местному времени.",
      "type": "string",
      "format": "date-time"
    },
    "to": {
      "description": "Конец интервала по местному времени.",
      "type": "string",
      "format": "date-time"
    }
  }
}
```
