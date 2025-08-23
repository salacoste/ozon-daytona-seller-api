# v1AddStrategyItemsResponseResult

Результат работы метода.

## Top-level fields
- `v1AddStrategyItemsResponseResult` (top-level fields):
  - `errors`: `array`
  - `failed_product_count`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Результат работы метода.",
  "properties": {
    "errors": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/AddStrategyItemsResponseError"
      },
      "description": "Товары с ошибками."
    },
    "failed_product_count": {
      "type": "integer",
      "format": "int32",
      "description": "Количество товаров с ошибками."
    }
  }
}
```
