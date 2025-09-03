# v1UploadPostingCodesResponse

## Top-level fields
- `v1UploadPostingCodesResponse` (top-level fields):
  - `exemplars_by_sku`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "exemplars_by_sku": {
      "description": "Данные о кодах цифрового товара по SKU.",
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/UploadPostingCodesResponsePostingExemplarInfo"
      }
    }
  }
}
```
