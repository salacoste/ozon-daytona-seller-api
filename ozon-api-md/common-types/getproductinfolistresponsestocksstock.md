# GetProductInfoListResponseStocksStock

## Top-level fields
- `GetProductInfoListResponseStocksStock` (top-level fields):
  - `present`: `integer`
  - `reserved`: `integer`
  - `sku`: `integer`
  - `source`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "present": {
      "type": "integer",
      "format": "int32",
      "description": "Сейчас на складе."
    },
    "reserved": {
      "type": "integer",
      "format": "int32",
      "description": "Зарезервировано."
    },
    "sku": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор товара в системе Ozon — SKU."
    },
    "source": {
      "type": "string",
      "description": "Схема продажи."
    }
  }
}
```
