# v5FbsPostingProductExemplarStatusV5Response

## Top-level fields
- `v5FbsPostingProductExemplarStatusV5Response` (top-level fields):
  - `posting_number`: `string`
  - `products`: `array`
  - `status`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "posting_number": {
      "type": "string",
      "description": "Номер отправления."
    },
    "products": {
      "type": "array",
      "description": "Список товаров.",
      "items": {
        "$ref": "#/components/schemas/v5FbsPostingProductExemplarStatusV5ResponseProduct"
      }
    },
    "status": {
      "type": "string",
      "description": "Статус проверки всех экземпляров и доступности сборки:\n - `ship_available` — сборка доступна,\n - `ship_not_available` — сборка недоступна,\n - `validation_in_process` — экземпляры на проверке.\n"
    }
  }
}
```
