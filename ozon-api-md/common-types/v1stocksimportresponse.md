# v1StocksImportResponse

## Top-level fields
- `v1StocksImportResponse` (top-level fields):
  - `status`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "status": {
      "type": "array",
      "description": "Информация о товарах.",
      "items": {
        "$ref": "#/components/schemas/StocksImportResponseItemStatus"
      }
    }
  }
}
```
