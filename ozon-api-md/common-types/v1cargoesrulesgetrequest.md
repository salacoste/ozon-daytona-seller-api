# v1CargoesRulesGetRequest

## Top-level fields
- `v1CargoesRulesGetRequest` (top-level fields):
  - `supply_ids`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "supply_ids": {
      "type": "array",
      "description": "Список идентификаторов поставок в заявке.\n\nМаксимум 100 идентификаторов.\n",
      "items": {
        "type": "string",
        "format": "int64"
      }
    }
  }
}
```
