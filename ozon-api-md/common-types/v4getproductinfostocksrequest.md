# v4GetProductInfoStocksRequest

## Top-level fields
- `v4GetProductInfoStocksRequest` (top-level fields):
  - `cursor`: `string`
  - `filter` → `$ref` v4GetProductInfoStocksRequestFilter
  - `limit`: `integer`

## Full schema (JSON)
```json
{
  "required": [
    "limit",
    "filter"
  ],
  "type": "object",
  "properties": {
    "cursor": {
      "description": "Указатель для выборки следующих данных.",
      "type": "string"
    },
    "filter": {
      "$ref": "#/components/schemas/v4GetProductInfoStocksRequestFilter"
    },
    "limit": {
      "type": "integer",
      "format": "int32",
      "description": "Количество значений на странице. Минимум — 1, максимум — 1000."
    }
  }
}
```
