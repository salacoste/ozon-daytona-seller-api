# v1PostingFbsTimeslotSetNewTimeslot

Новый период для даты доставки.

## Top-level fields
- `v1PostingFbsTimeslotSetNewTimeslot` (top-level fields):
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
  "description": "Новый период для даты доставки.",
  "properties": {
    "from": {
      "type": "string",
      "format": "date-time",
      "description": "Дата начала периода.\n\nФормат: `YYYY-MM-DDTHH:mm:ss.sssZ`.\n"
    },
    "to": {
      "type": "string",
      "format": "date-time",
      "description": "Дата конца периода.\n\nФормат: `YYYY-MM-DDTHH:mm:ss.sssZ`.\n"
    }
  }
}
```
