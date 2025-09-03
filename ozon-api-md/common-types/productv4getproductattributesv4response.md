# productv4GetProductAttributesV4Response

## Top-level fields
- `productv4GetProductAttributesV4Response` (top-level fields):
  - `result`: `array`
  - `last_id`: `string`
  - `total`: `string`

## Full schema (JSON)
```json
{
  "properties": {
    "result": {
      "items": {
        "$ref": "#/components/schemas/productv4GetProductAttributesV4ResponseResult"
      },
      "type": "array",
      "description": "Результаты запроса."
    },
    "last_id": {
      "type": "string",
      "description": "Идентификатор последнего значения на странице.\n\nЧтобы получить следующие значения, укажите полученное значение в следующем запросе в параметре `last_id`.\n"
    },
    "total": {
      "description": "Количество товаров в списке.",
      "type": "string",
      "format": "int64"
    }
  },
  "type": "object",
  "title": "object"
}
```
