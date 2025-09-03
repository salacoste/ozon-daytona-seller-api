# UploadPostingCodesResponsePostingExemplarInfo

## Top-level fields
- `UploadPostingCodesResponsePostingExemplarInfo` (top-level fields):
  - `failed_exemplars`: `array`
  - `received_qty`: `integer`
  - `rejected_qty`: `integer`
  - `sku`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "failed_exemplars": {
      "description": "Список кодов цифровых товаров с ошибками.",
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/PostingExemplarInfoExemplarError"
      }
    },
    "received_qty": {
      "description": "Количество кодов цифрового товара, которые были приняты.",
      "type": "integer",
      "format": "int32"
    },
    "rejected_qty": {
      "description": "Количество кодов цифровых товаров, которые не были приняты или переданы.",
      "type": "integer",
      "format": "int32"
    },
    "sku": {
      "description": "Идентификатор товара в системе Ozon — SKU.",
      "type": "integer",
      "format": "int64"
    }
  }
}
```
