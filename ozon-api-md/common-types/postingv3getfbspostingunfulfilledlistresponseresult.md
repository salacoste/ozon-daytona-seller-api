# postingv3GetFbsPostingUnfulfilledListResponseResult

Результат запроса.

## Top-level fields
- `postingv3GetFbsPostingUnfulfilledListResponseResult` (top-level fields):
  - `count`: `integer`
  - `postings`: `array`

## Full schema (JSON)
```json
{
  "properties": {
    "count": {
      "format": "int64",
      "type": "integer",
      "description": "Счётчик элементов в ответе."
    },
    "postings": {
      "items": {
        "$ref": "#/components/schemas/v3FbsPosting"
      },
      "type": "array",
      "description": "Список отправлений и подробная информация по каждому."
    }
  },
  "type": "object",
  "title": "object",
  "description": "Результат запроса."
}
```
