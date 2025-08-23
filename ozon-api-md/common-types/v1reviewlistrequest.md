# v1ReviewListRequest

## Top-level fields
- `v1ReviewListRequest` (top-level fields):
  - `last_id`: `string`
  - `limit`: `integer`
  - `sort_dir`: `string`
  - `status`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "ReviewList",
  "properties": {
    "last_id": {
      "description": "Идентификатор последнего отзыва на странице.",
      "type": "string"
    },
    "limit": {
      "description": "Количество отзывов в ответе. Минимум — 20, максимум — 100.",
      "type": "integer",
      "format": "int32"
    },
    "sort_dir": {
      "description": "Направление сортировки:\n- `ASC` — по возрастанию,\n- `DESC` — по убыванию.\n",
      "type": "string"
    },
    "status": {
      "description": "Статусы отзывов:\n- `ALL` — все,\n- `UNPROCESSED` — необработанные,\n- `PROCESSED` — обработанные.\n",
      "type": "string"
    }
  },
  "required": [
    "limit"
  ]
}
```
