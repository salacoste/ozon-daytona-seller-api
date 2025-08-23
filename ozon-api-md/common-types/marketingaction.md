# MarketingAction

## Top-level fields
- `MarketingAction` (top-level fields):
  - `date_from`: `string`
  - `date_to`: `string`
  - `title`: `string`
  - `value`: `string`

## Full schema (JSON)
```json
{
  "properties": {
    "date_from": {
      "format": "date-time",
      "type": "string",
      "description": "Дата и время начала акции продавца."
    },
    "date_to": {
      "format": "date-time",
      "type": "string",
      "description": "Дата и время окончания акции продавца."
    },
    "title": {
      "type": "string",
      "description": "Название акции продавца."
    },
    "value": {
      "type": "string",
      "description": "Скидка по акции продавца."
    }
  },
  "type": "object",
  "title": "object"
}
```
