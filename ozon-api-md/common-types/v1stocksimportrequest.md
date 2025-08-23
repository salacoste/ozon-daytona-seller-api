# v1StocksImportRequest

## Top-level fields
- `v1StocksImportRequest` (top-level fields):
  - `stocks`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "stocks": {
      "type": "array",
      "description": "Данные об остатках.",
      "items": {
        "$ref": "#/components/schemas/StocksImportRequestItemStock"
      }
    }
  }
}
```
