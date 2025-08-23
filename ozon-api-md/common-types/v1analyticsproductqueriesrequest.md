# v1AnalyticsProductQueriesRequest

## Top-level fields
- `v1AnalyticsProductQueriesRequest` (top-level fields):
  - `date_from`: `string`
  - `date_to`: `string`
  - `page`: `integer`
  - `page_size`: `integer`
  - `skus`: `array`
  - `sort_by` → `$ref` AnalyticsProductQueriesRequestSortBy
  - `sort_dir` → `$ref` AnalyticsProductQueriesRequestSortDir

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "date_from": {
      "type": "string",
      "format": "date-time",
      "description": "Дата начала формирования аналитики."
    },
    "date_to": {
      "type": "string",
      "format": "date-time",
      "description": "Дата окончания формирования аналитики."
    },
    "page": {
      "format": "int32",
      "type": "integer",
      "description": "Номер страницы, возвращаемой в запросе."
    },
    "page_size": {
      "format": "int32",
      "type": "integer",
      "description": "Количество элементов на странице."
    },
    "skus": {
      "type": "array",
      "description": "Список SKU, идентификаторов товара в системе Ozon. По ним вернётся аналитика по запросам. Максимум — 1000 SKU.",
      "items": {
        "type": "string",
        "format": "int64"
      }
    },
    "sort_by": {
      "$ref": "#/components/schemas/AnalyticsProductQueriesRequestSortBy"
    },
    "sort_dir": {
      "$ref": "#/components/schemas/AnalyticsProductQueriesRequestSortDir"
    }
  },
  "required": [
    "page_size",
    "date_from",
    "skus"
  ]
}
```
