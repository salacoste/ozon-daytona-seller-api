# productGetImportProductsInfoResponseResult

## Top-level fields
- `productGetImportProductsInfoResponseResult` (top-level fields):
  - `items`: `array`
  - `total`: `integer`

## Full schema (JSON)
```json
{
  "properties": {
    "items": {
      "items": {
        "$ref": "#/components/schemas/GetImportProductsInfoResponseResultItem"
      },
      "type": "array",
      "description": "Информация о товарах."
    },
    "total": {
      "format": "int32",
      "type": "integer",
      "description": "Идентификатор товара в системе продавца — артикул."
    }
  },
  "type": "object",
  "title": "object"
}
```
