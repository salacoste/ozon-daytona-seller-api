# v1CreateStockByWarehouseReportRequest

## Top-level fields
- `v1CreateStockByWarehouseReportRequest` (top-level fields):
  - `language` → `$ref` reportLanguage
  - `warehouseId`: `object`

## Full schema (JSON)
```json
{
  "required": [
    "warehouseId"
  ],
  "type": "object",
  "title": "object",
  "properties": {
    "language": {
      "$ref": "#/components/schemas/reportLanguage"
    },
    "warehouseId": {
      "description": "Идентификаторы складов.",
      "items": {
        "type": "string",
        "format": "int64"
      }
    }
  }
}
```
