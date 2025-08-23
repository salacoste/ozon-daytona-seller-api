# productv3GetProductListResponseResult

Результат.

## Top-level fields
- `productv3GetProductListResponseResult` (top-level fields):
  - `items`: `object`
  - `last_id`: `string`
  - `total`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Результат.",
  "properties": {
    "items": {
      "description": "Список товаров.",
      "items": {
        "$ref": "#/components/schemas/productv3GetProductListResponseItem"
      }
    },
    "last_id": {
      "type": "string",
      "description": "Идентификатор последнего значения на странице.\n\nЧтобы получить следующие значения, передайте полученное значение в следующем запросе в параметре `last_id`.\n"
    },
    "total": {
      "description": "Всего товаров.",
      "type": "integer",
      "format": "int32"
    }
  }
}
```
