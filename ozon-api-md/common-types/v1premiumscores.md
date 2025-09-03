# v1PremiumScores

## Top-level fields
- `v1PremiumScores` (top-level fields):
  - `rating`: `string`
  - `scores`: `object`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "rating": {
      "description": "Название рейтинга.",
      "type": "string"
    },
    "scores": {
      "description": "Информация о штрафных баллах.",
      "items": {
        "$ref": "#/components/schemas/PremiumScoresScore"
      }
    }
  }
}
```
