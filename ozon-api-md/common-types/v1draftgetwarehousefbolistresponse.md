# v1DraftGetWarehouseFboListResponse

## Top-level fields
- `v1DraftGetWarehouseFboListResponse` (top-level fields):
  - `search`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "search": {
      "type": "array",
      "description": "Результат поиска складов.",
      "items": {
        "$ref": "#/components/schemas/DraftGetWarehouseFboListResponseSearch"
      }
    }
  }
}
```
