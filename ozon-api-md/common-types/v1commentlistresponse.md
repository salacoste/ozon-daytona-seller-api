# v1CommentListResponse

## Top-level fields
- `v1CommentListResponse` (top-level fields):
  - `comments`: `array`
  - `offset`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "comments": {
      "description": "Информация о комментарии.",
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/CommentListResponseComment"
      }
    },
    "offset": {
      "description": "Количество элементов в выдаче.",
      "type": "integer",
      "format": "int32"
    }
  }
}
```
