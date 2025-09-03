# v1PostingFbsTimeslotChangeRestrictionsDeliveryInterval

Период дат, доступных для переноса.

## Top-level fields
- `v1PostingFbsTimeslotChangeRestrictionsDeliveryInterval` (top-level fields):
  - `begin`: `string`
  - `end`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Период дат, доступных для переноса.",
  "properties": {
    "begin": {
      "type": "string",
      "format": "date-time",
      "description": "Дата начала периода.\n\nФормат: `YYYY-MM-DDTHH:mm:ss.sssZ`.\n"
    },
    "end": {
      "type": "string",
      "format": "date-time",
      "description": "Дата конца периода.\n\nФормат: `YYYY-MM-DDTHH:mm:ss.sssZ`.\n"
    }
  }
}
```
