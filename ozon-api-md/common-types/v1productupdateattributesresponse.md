# v1ProductUpdateAttributesResponse

## Top-level fields
- `v1ProductUpdateAttributesResponse` (top-level fields):
  - `task_id`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "task_id": {
      "description": "Номер задания на обновление товаров. \n\nЧтобы проверить статус обновления, передайте полученное значение в метод [/v1/product/import/info](#operation/ProductAPI_GetImportProductsInfo).\n",
      "type": "integer",
      "format": "int64"
    }
  }
}
```
