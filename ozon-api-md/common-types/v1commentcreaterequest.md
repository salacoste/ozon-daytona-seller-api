# v1CommentCreateRequest

## Top-level fields
- `v1CommentCreateRequest` (top-level fields):
  - `mark_review_as_processed`: `boolean`
  - `parent_comment_id`: `string`
  - `review_id`: `string`
  - `text`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "mark_review_as_processed": {
      "description": "Обновление статуса у отзыва:\n- `true` — статус изменится на `Processed`.\n- `false` — статус не изменится.\n",
      "type": "boolean"
    },
    "parent_comment_id": {
      "description": "Идентификатор родительского комментария, на который вы отвечаете.",
      "type": "string"
    },
    "review_id": {
      "description": "Идентификатор отзыва.",
      "type": "string"
    },
    "text": {
      "description": "Текст комментария.",
      "type": "string"
    }
  },
  "required": [
    "review_id",
    "text"
  ]
}
```
