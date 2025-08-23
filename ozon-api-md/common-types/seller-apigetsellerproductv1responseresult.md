# seller_apiGetSellerProductV1ResponseResult

Результаты запроса.

## Top-level fields
- `seller_apiGetSellerProductV1ResponseResult` (top-level fields):
  - `products`: `array`
  - `total`: `number`
  - `last_id`: `number`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "products": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/seller_apiProduct"
      },
      "description": "Список товаров."
    },
    "total": {
      "type": "number",
      "format": "double",
      "description": "Общее количество товаров, которое доступно для акции."
    },
    "last_id": {
      "type": "number",
      "format": "double",
      "description": "Идентификатор последнего значения на странице. Чтобы получить следующие значения, передайте полученное значение в следующем запросе в параметре `last_id`."
    }
  },
  "description": "Результаты запроса."
}
```
