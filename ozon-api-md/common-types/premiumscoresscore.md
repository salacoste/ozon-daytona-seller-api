# PremiumScoresScore

## Top-level fields
- `PremiumScoresScore` (top-level fields):
  - `date`: `string`
  - `rating_value`: `number`
  - `value`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "date": {
      "type": "string",
      "format": "date-time",
      "description": "Дата, когда были начислены штрафные баллы."
    },
    "rating_value": {
      "type": "number",
      "format": "double",
      "description": "Значение рейтинга, за которое были начислены штрафные баллы."
    },
    "value": {
      "type": "integer",
      "format": "int32",
      "description": "Количество начисленных штрафных баллов."
    }
  }
}
```
