# v1CommentListRequest

## Top-level fields
- `v1CommentListRequest` (top-level fields):
  - `limit`: `integer`
  - `offset`: `integer`
  - `review_id`: `string`
  - `sort_dir` → `$ref` v1CommentSort

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "limit": {
      "description": "Ограничение значений в ответе.\nМинимум — 20. Максимум — 100.\n",
      "type": "integer",
      "format": "int32"
    },
    "offset": {
      "description": "Количество элементов, которое будет пропущено с начала списка в ответе. Например, если `offset = 10`, то ответ начнётся с 11-го найденного элемента.",
      "type": "integer",
      "format": "int32"
    },
    "review_id": {
      "description": "Идентификатор отзыва.",
      "type": "string"
    },
    "sort_dir": {
      "$ref": "#/components/schemas/v1CommentSort"
    }
  },
  "required": [
    "review_id",
    "limit"
  ]
}
```
