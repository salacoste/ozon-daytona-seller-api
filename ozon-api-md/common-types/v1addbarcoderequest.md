# v1AddBarcodeRequest

## Top-level fields
- `v1AddBarcodeRequest` (top-level fields):
  - `barcodes`: `array`

## Full schema (JSON)
```json
{
  "required": [
    "barcodes"
  ],
  "type": "object",
  "title": "object",
  "properties": {
    "barcodes": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/v1Barcode"
      },
      "description": "Список штрихкодов и товаров."
    }
  }
}
```
