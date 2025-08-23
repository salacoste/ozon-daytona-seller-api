# v1UploadPostingCodesRequest

## Top-level fields
- `v1UploadPostingCodesRequest` (top-level fields):
  - `exemplars_by_sku`: `array`
  - `posting_number`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "exemplars_by_sku": {
      "description": "Данные о кодах цифрового товара по SKU.",
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/UploadPostingCodesRequestPostingLineExemplarInfo"
      }
    },
    "posting_number": {
      "description": "Номер отправления.",
      "type": "string"
    }
  }
}
```
