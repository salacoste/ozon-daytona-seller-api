# RatingItemChange

Изменение рейтинга: отношение предыдущего значения к текущему.


## Top-level fields
- `RatingItemChange` (top-level fields):
  - `direction`: `string`
  - `meaning`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Изменение рейтинга: отношение предыдущего значения к текущему.\n",
  "properties": {
    "direction": {
      "description": "Как изменилось значение рейтинга:\n- `DIRECTION_UNKNOWN` — не определено.\n- `DIRECTION_NONE` — не изменилось.\n- `DIRECTION_RISE` — выросло.\n- `DIRECTION_FALL` — упало.\n",
      "type": "string"
    },
    "meaning": {
      "description": "Что означает изменение:\n- `MEANING_UNKNOWN` — неизвестно.\n- `MEANING_NONE` — нейтрально.\n- `MEANING_GOOD` — показатель улучшается, всё хорошо.\n- `MEANING_BAD` — показатель падает, нужно что-то сделать.\n",
      "type": "string"
    }
  }
}
```
