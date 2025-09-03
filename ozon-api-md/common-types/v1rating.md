# v1Rating

## Top-level fields
- `v1Rating` (top-level fields):
  - `danger_threshold`: `number`
  - `premium_threshold`: `number`
  - `rating`: `string`
  - `values`: `object`
  - `warning_threshold`: `number`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "danger_threshold": {
      "type": "number",
      "format": "double",
      "description": "Пороговое значение рейтинга, после которого продажи будут заблокированы."
    },
    "premium_threshold": {
      "type": "number",
      "format": "double",
      "description": "Пороговое значение рейтинга для участия в Premium-программе."
    },
    "rating": {
      "type": "string",
      "description": "Системное название рейтинга."
    },
    "values": {
      "description": "Список значений рейтинга.",
      "items": {
        "$ref": "#/components/schemas/RatingValue"
      }
    },
    "warning_threshold": {
      "type": "number",
      "format": "double",
      "description": "Пороговое значение рейтинга, после которого появится предупреждение о возможной блокировке."
    }
  }
}
```
