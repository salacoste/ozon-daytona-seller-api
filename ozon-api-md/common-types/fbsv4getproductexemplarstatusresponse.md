# fbsv4GetProductExemplarStatusResponse

## Top-level fields
- `fbsv4GetProductExemplarStatusResponse` (top-level fields):
  - `posting_number`: `string`
  - `products`: `object`
  - `status`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "posting_number": {
      "type": "string",
      "description": "Номер отправления."
    },
    "products": {
      "description": "Список товаров.",
      "items": {
        "$ref": "#/components/schemas/fbsv4GetProductExemplarStatusResponseProduct"
      }
    },
    "status": {
      "description": "Статус проверки всех экземпляров и доступности сборки:\n- `ship_available` — сборка доступна,\n- `ship_not_available` — сборка недоступна,\n- `validation_in_process` — экземпляры на проверке.\n",
      "type": "string"
    }
  }
}
```
