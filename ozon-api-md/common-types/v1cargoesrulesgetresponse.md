# v1CargoesRulesGetResponse

## Top-level fields
- `v1CargoesRulesGetResponse` (top-level fields):
  - `supply_check_lists`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "supply_check_lists": {
      "type": "array",
      "description": "Список чек-листов с правилами заполнения грузомест по поставкам.",
      "items": {
        "$ref": "#/components/schemas/CargoesRulesGetResponseSupplyCheck"
      }
    }
  }
}
```
