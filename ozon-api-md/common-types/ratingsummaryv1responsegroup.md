# RatingSummaryV1ResponseGroup

## Top-level fields
- `RatingSummaryV1ResponseGroup` (top-level fields):
  - `group_name`: `string`
  - `items`: `object`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "group_name": {
      "description": "Название группы рейтингов.",
      "type": "string"
    },
    "items": {
      "description": "Список рейтингов.",
      "items": {
        "$ref": "#/components/schemas/v1RatingItem"
      }
    }
  }
}
```
