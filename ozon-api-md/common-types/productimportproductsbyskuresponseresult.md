# productImportProductsBySKUResponseResult

## Top-level fields
- `productImportProductsBySKUResponseResult` (top-level fields):
  - `task_id`: `integer`
  - `unmatched_sku_list`: `array`

## Full schema (JSON)
```json
{
  "properties": {
    "task_id": {
      "format": "int64",
      "type": "integer",
      "description": "Код задачи на импорт товаров."
    },
    "unmatched_sku_list": {
      "items": {
        "format": "int64",
        "type": "integer"
      },
      "type": "array",
      "description": "Список идентификаторов товаров в системе продавца — `product_id`."
    }
  },
  "type": "object",
  "title": "object"
}
```
