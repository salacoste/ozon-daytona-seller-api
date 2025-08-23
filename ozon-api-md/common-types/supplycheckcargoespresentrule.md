# SupplyCheckCargoesPresentRule

Правило указания грузомест.

## Top-level fields
- `SupplyCheckCargoesPresentRule` (top-level fields):
  - `cargo_count_per_type`: `array`
  - `count`: `integer`
  - `satisfied`: `boolean`

## Full schema (JSON)
```json
{
  "type": "object",
  "description": "Правило указания грузомест.",
  "properties": {
    "cargo_count_per_type": {
      "type": "array",
      "description": "Количество грузомест каждого типа.",
      "items": {
        "$ref": "#/components/schemas/CargoesPresentRuleCargoCountPerType"
      }
    },
    "count": {
      "type": "integer",
      "format": "int32",
      "description": "Общее количество грузомест."
    },
    "satisfied": {
      "type": "boolean",
      "description": "`true`, если грузоместа указаны.\n"
    }
  }
}
```
