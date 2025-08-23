# v1GetStrategyListRequest

## Top-level fields
- `v1GetStrategyListRequest` (top-level fields):
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
      "description": "Страница списка, с которой нужно выгрузить стратегии. Минимальное значение — `1`."
    },
    "limit": {
      "type": "integer",
      "format": "int64",
      "description": "Максимальное количество стратегий на странице. Допустимые значения — от `1` до `50`."
    }
  }
}
```
