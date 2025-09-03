# v1GetStrategyIDsByItemIDsResponseResult

Результат работы метода.

## Top-level fields
- `v1GetStrategyIDsByItemIDsResponseResult` (top-level fields):
  - `products_info`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Результат работы метода.",
  "properties": {
    "products_info": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/GetStrategyIDsByItemIDsResponseProductInfo"
      },
      "description": "Информация о товаре."
    }
  }
}
```
