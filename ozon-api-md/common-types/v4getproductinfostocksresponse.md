# v4GetProductInfoStocksResponse

## Top-level fields
- `v4GetProductInfoStocksResponse` (top-level fields):
  - `cursor`: `string`
  - `items`: `array`
  - `total`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "cursor": {
      "description": "Указатель для выборки следующих данных.",
      "type": "string"
    },
    "items": {
      "description": "Информация о товарах.",
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/v4GetProductInfoStocksResponseItem"
      }
    },
    "total": {
      "description": "Количество уникальных товаров, для которых выводится информация об остатках.",
      "type": "integer",
      "format": "int32"
    }
  }
}
```
