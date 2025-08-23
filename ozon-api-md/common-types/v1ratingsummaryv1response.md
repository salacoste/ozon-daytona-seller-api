# v1RatingSummaryV1Response

## Top-level fields
- `v1RatingSummaryV1Response` (top-level fields):
  - `groups`: `object`
  - `localization_index`: `object`
  - `penalty_score_exceeded`: `boolean`
  - `premium`: `boolean`
  - `premium_plus`: `boolean`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "groups": {
      "description": "Список с группами рейтингов.",
      "items": {
        "$ref": "#/components/schemas/RatingSummaryV1ResponseGroup"
      }
    },
    "localization_index": {
      "description": "Данные по индексу локализации. Если за последние 14 дней у вас не было продаж, поля параметра будут пустыми.",
      "items": {
        "$ref": "#/components/schemas/RatingSummaryV1ResponseLocalIndex"
      }
    },
    "penalty_score_exceeded": {
      "description": "Признак, что баланс штрафных баллов превышен.",
      "type": "boolean"
    },
    "premium": {
      "description": "Признак наличия подписки [Premium](https://seller-edu.ozon.ru/seller-rating/about-rating/premium-program).",
      "type": "boolean"
    },
    "premium_plus": {
      "description": "Признак наличия подписки [Premium Plus](https://seller-edu.ozon.ru/seller-rating/about-rating/subscription-premium-plus).",
      "type": "boolean"
    }
  }
}
```
