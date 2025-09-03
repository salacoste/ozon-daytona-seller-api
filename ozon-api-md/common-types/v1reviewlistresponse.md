# v1ReviewListResponse

## Top-level fields
- `v1ReviewListResponse` (top-level fields):
  - `has_next`: `boolean`
  - `last_id`: `string`
  - `reviews`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "has_next": {
      "description": "`true`, если в ответе вернули не все отзывы.\n",
      "type": "boolean"
    },
    "last_id": {
      "description": "Идентификатор последнего отзыва на странице.",
      "type": "string"
    },
    "reviews": {
      "description": "Информация об отзыве.",
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/ReviewListResponseReview"
      }
    }
  }
}
```
