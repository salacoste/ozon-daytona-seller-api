# productv5GetProductInfoPricesV5Response

## Top-level fields
- `productv5GetProductInfoPricesV5Response` (top-level fields):
  - `cursor`: `string`
  - `items`: `object`
  - `total`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "cursor": {
      "type": "string",
      "description": "Указатель для выборки следующих данных."
    },
    "items": {
      "description": "Список товаров.",
      "items": {
        "$ref": "#/components/schemas/productGetProductInfoPricesV5ResponseItem"
      }
    },
    "total": {
      "type": "integer",
      "format": "int32",
      "description": "Количество товаров в списке."
    }
  }
}
```
