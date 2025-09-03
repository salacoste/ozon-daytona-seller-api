# v2PostingFBSActGetPostingsResult

## Top-level fields
- `v2PostingFBSActGetPostingsResult` (top-level fields):
  - `id`: `integer`
  - `multi_box_qty`: `integer`
  - `posting_number`: `string`
  - `status`: `string`
  - `seller_error`: `string`
  - `updated_at`: `string`
  - `created_at`: `string`
  - `products`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор акта."
    },
    "multi_box_qty": {
      "type": "integer",
      "format": "int32",
      "description": "Количество коробок, в которые упакован товар."
    },
    "posting_number": {
      "type": "string",
      "description": "Номер отправления."
    },
    "status": {
      "type": "string",
      "description": "Статус отправления."
    },
    "seller_error": {
      "type": "string",
      "description": "Расшифровка кода ошибки."
    },
    "updated_at": {
      "type": "string",
      "format": "date-time",
      "description": "Дата и время обновления записи об отправлении."
    },
    "created_at": {
      "type": "string",
      "format": "date-time",
      "description": "Дата и время создания записи об отправлении."
    },
    "products": {
      "type": "array",
      "description": "Список товаров в отправлении.",
      "items": {
        "$ref": "#/components/schemas/v2PostingFBSActGetProducts"
      }
    }
  }
}
```
