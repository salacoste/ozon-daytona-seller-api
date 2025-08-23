# v1RatingItem

## Top-level fields
- `v1RatingItem` (top-level fields):
  - `change` → `$ref` RatingItemChange
  - `current_value`: `number`
  - `name`: `string`
  - `past_value`: `number`
  - `rating`: `string`
  - `rating_direction`: `string`
  - `status`: `string`
  - `value_type`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "change": {
      "$ref": "#/components/schemas/RatingItemChange"
    },
    "current_value": {
      "description": "Текущее значение рейтинга.",
      "type": "number",
      "format": "double"
    },
    "name": {
      "description": "Название рейтинга.",
      "type": "string"
    },
    "past_value": {
      "description": "Предыдущее значение рейтинга.",
      "type": "number",
      "format": "double"
    },
    "rating": {
      "description": "Название рейтинга в системе.",
      "type": "string"
    },
    "rating_direction": {
      "description": "Каким должно быть значение рейтинга, чтобы оно считалось хорошим:\n- `UNKNOWN_DIRECTION` — не определено.\n- `NEUTRAL` — неважно.\n- `HIGHER_IS_BETTER` — чем выше, тем лучше.\n- `LOWER_IS_BETTER` — чем ниже, тем лучше.\n",
      "type": "string"
    },
    "status": {
      "description": "Статус рейтинга:\n- `UNKNOWN_STATUS` — не определён.\n- `OK` — все хорошо.\n- `WARNING` — показатели требуют внимания.\n- `CRITICAL` — критичный рейтинг.\n",
      "type": "string"
    },
    "value_type": {
      "description": "Тип значения:\n- `UNKNOWN_VALUE` — не определён.\n- `INDEX` — индекс.\n- `PERCENT` — процент.\n- `TIME` — время.\n- `RATIO` — коэффициент.\n- `REVIEW_SCORE` — оценка.\n- `COUNT` — счёт.\n",
      "type": "string"
    }
  }
}
```
