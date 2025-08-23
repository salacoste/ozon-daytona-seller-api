# v1GetCompetitorsRequest

## Top-level fields
- `v1GetCompetitorsRequest` (top-level fields):
  - `page`: `integer`
  - `limit`: `integer`

## Full schema (JSON)
```json
{
  "required": [
    "page",
    "limit"
  ],
  "type": "object",
  "title": "object",
  "properties": {
    "page": {
      "type": "integer",
      "format": "int64",
      "description": "Страница списка, с которой нужно выгрузить конкурентов. Минимальное значение — `1`."
    },
    "limit": {
      "type": "integer",
      "format": "int64",
      "description": "Максимальное количество конкурентов на странице. Допустимы значения от `1` до `50`."
    }
  }
}
```
