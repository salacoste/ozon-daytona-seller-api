# ImportProductRequestPromotion

## Top-level fields
- `ImportProductRequestPromotion` (top-level fields):
  - `operation`: `string`
  - `type`: `string`

## Full schema (JSON)
```json
{
  "properties": {
    "operation": {
      "type": "string",
      "description": "Атрибут для действий с акцией:\n- `ENABLE` — включить,\n- `DISABLE` — выключить,\n- `UNKNOWN` — ничего не менять, передаётся по умолчанию.\n",
      "default": "UNKNOWN",
      "enum": [
        "UNKNOWN",
        "ENABLE",
        "DISABLE"
      ]
    },
    "type": {
      "type": "string",
      "description": "Тип акции:\n- `REVIEWS_PROMO` — акция «Баллы за отзывы».\n",
      "default": "REVIEWS_PROMO",
      "enum": [
        "REVIEWS_PROMO"
      ]
    }
  },
  "type": "object",
  "title": "object"
}
```
