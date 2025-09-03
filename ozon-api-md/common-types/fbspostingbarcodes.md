# FbsPostingBarcodes

Штрихкоды отправления.

## Top-level fields
- `FbsPostingBarcodes` (top-level fields):
  - `lower_barcode`: `string`
  - `upper_barcode`: `string`

## Full schema (JSON)
```json
{
  "properties": {
    "lower_barcode": {
      "type": "string",
      "description": "Нижний штрихкод на маркировке отправления."
    },
    "upper_barcode": {
      "type": "string",
      "description": "Верхний штрихкод на маркировке отправления."
    }
  },
  "type": "object",
  "title": "object",
  "description": "Штрихкоды отправления."
}
```
