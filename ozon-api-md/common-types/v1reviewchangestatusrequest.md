# v1ReviewChangeStatusRequest

## Top-level fields
- `v1ReviewChangeStatusRequest` (top-level fields):
  - `review_ids`: `array`
  - `status`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "ReviewChangeStatus",
  "properties": {
    "review_ids": {
      "description": "Массив с идентификаторами отзывов от 1 до 100.",
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "status": {
      "description": "Статус отзыва:\n- `PROCESSED` — обработанный,\n- `UNPROCESSED` — необработанный.\n",
      "type": "string"
    }
  },
  "required": [
    "review_ids",
    "status"
  ]
}
```
