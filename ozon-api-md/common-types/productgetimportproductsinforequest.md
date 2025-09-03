# productGetImportProductsInfoRequest

## Top-level fields
- `productGetImportProductsInfoRequest` (top-level fields):
  - `task_id`: `integer`

## Full schema (JSON)
```json
{
  "required": [
    "task_id"
  ],
  "properties": {
    "task_id": {
      "format": "int64",
      "type": "integer",
      "description": "Код задачи на импорт товаров. Можно получить с помощью метода [/v3/product/import](#operation/ProductAPI_ImportProductsV3)."
    }
  },
  "type": "object",
  "title": "object"
}
```
