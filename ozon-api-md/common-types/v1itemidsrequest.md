# v1ItemIDsRequest

## Top-level fields
- `v1ItemIDsRequest` (top-level fields):
  - `product_id`: `array`

## Full schema (JSON)
```json
{
  "required": [
    "product_id"
  ],
  "type": "object",
  "title": "object",
  "properties": {
    "product_id": {
      "type": "array",
      "items": {
        "type": "string",
        "format": "int64"
      },
      "description": "Список идентификаторов товаров в системе продавца — `product_id`. Максимальное количество — 50."
    }
  }
}
```
