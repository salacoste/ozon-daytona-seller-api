# v1RatingStatus

Статус рейтинга.

## Top-level fields
- `v1RatingStatus` (top-level fields):
  - `danger`: `boolean`
  - `premium`: `boolean`
  - `warning`: `boolean`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Статус рейтинга.",
  "properties": {
    "danger": {
      "type": "boolean",
      "description": "Признак, превышено ли пороговое значение рейтинга для блокировки."
    },
    "premium": {
      "type": "boolean",
      "description": "Признак, достигнуто ли пороговое значение для участия в Premium-программе."
    },
    "warning": {
      "type": "boolean",
      "description": "Признак наличия предупреждения о возможном превышении порогового значения для блокировки."
    }
  }
}
```
