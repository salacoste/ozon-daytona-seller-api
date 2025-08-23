# v1AnalyticsProductQueriesDetailsRequest

## Top-level fields
- `v1AnalyticsProductQueriesDetailsRequest` (top-level fields):
  - `date_from`: `string`
  - `date_to`: `string`
  - `limit_by_sku`: `integer`
  - `page`: `integer`
  - `page_size`: `integer`
  - `skus`: `array`
  - `sort_by` → `$ref` v1AnalyticsProductQueriesDetailsRequestSortBy
  - `sort_dir` → `$ref` v1AnalyticsProductQueriesDetailsRequestSortDir

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
    "limit_by_sku": {
      "type": "integer",
      "format": "int32",
      "description": "Лимит числа запросов по одному SKU. Максимум — 15 запросов."
    },
    "page": {
      "format": "int32",
      "type": "integer",
      "description": "Номер страницы, возвращаемой в запросе. Минимум — 0."
    },
    "page_size": {
      "format": "int32",
      "type": "integer",
      "description": "Количество элементов на странице. Максимум — 100."
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
      "$ref": "#/components/schemas/v1AnalyticsProductQueriesDetailsRequestSortBy"
    },
    "sort_dir": {
      "$ref": "#/components/schemas/v1AnalyticsProductQueriesDetailsRequestSortDir"
    }
  },
  "required": [
    "page_size",
    "date_from",
    "skus",
    "limit_by_sku"
  ]
}
```
