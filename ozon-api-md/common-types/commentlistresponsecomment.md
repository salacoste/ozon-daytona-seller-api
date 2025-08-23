# CommentListResponseComment

## Top-level fields
- `CommentListResponseComment` (top-level fields):
  - `id`: `string`
  - `is_official`: `boolean`
  - `is_owner`: `boolean`
  - `parent_comment_id`: `string`
  - `published_at`: `string`
  - `text`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "id": {
      "description": "Идентификатор комментария.",
      "type": "string"
    },
    "is_official": {
      "description": "`true`, если комментарий оставило официальное лицо, `false` — покупатель.\n",
      "type": "boolean"
    },
    "is_owner": {
      "description": "`true`, если комментарий оставил продавец, `false` — покупатель.\n",
      "type": "boolean"
    },
    "parent_comment_id": {
      "description": "Идентификатор родительского комментария, на который нужно ответить.",
      "type": "string"
    },
    "published_at": {
      "description": "Дата публикации комментария.",
      "type": "string",
      "format": "date-time"
    },
    "text": {
      "description": "Текст комментария.",
      "type": "string"
    }
  }
}
```
