# v1RatingHistoryV1Response

## Top-level fields
- `v1RatingHistoryV1Response` (top-level fields):
  - `premium_scores`: `object`
  - `ratings`: `object`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "premium_scores": {
      "description": "Информация о штрафных баллах в Premium-программе.",
      "items": {
        "$ref": "#/components/schemas/v1PremiumScores"
      }
    },
    "ratings": {
      "description": "Информация о рейтингах продавца.",
      "items": {
        "$ref": "#/components/schemas/v1Rating"
      }
    }
  }
}
```
