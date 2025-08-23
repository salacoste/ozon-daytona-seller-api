# productProductArchiveRequest

## Top-level fields
- `productProductArchiveRequest` (top-level fields):
  - `product_id`: `array`

## Full schema (JSON)
```json
{
  "required": [
    "product_id"
  ],
  "properties": {
    "product_id": {
      "items": {
        "format": "int64",
        "type": "integer"
      },
      "type": "array",
      "description": "Список идентификаторов товаров в системе продавца — `product_id`.  Вы можете передать до 100 идентификаторов за раз."
    }
  },
  "type": "object",
  "title": "object"
}
```
