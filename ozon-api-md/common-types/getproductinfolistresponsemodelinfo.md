# GetProductInfoListResponseModelInfo

Информация о модели товара.

## Top-level fields
- `GetProductInfoListResponseModelInfo` (top-level fields):
  - `count`: `integer`
  - `model_id`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Информация о модели товара.",
  "properties": {
    "count": {
      "description": "Количество товаров в ответе.",
      "type": "integer",
      "format": "int64"
    },
    "model_id": {
      "description": "Идентификатор модели товара.",
      "type": "integer",
      "format": "int64"
    }
  }
}
```
