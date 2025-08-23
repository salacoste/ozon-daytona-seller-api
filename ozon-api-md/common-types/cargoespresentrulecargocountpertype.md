# CargoesPresentRuleCargoCountPerType

## Top-level fields
- `CargoesPresentRuleCargoCountPerType` (top-level fields):
  - `count`: `integer`
  - `type` → `$ref` CargoesPresentRuleCargoCountPerTypeEnum

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "Количество грузомест каждого типа",
  "properties": {
    "count": {
      "type": "integer",
      "format": "int32",
      "description": "Количество грузомест."
    },
    "type": {
      "$ref": "#/components/schemas/CargoesPresentRuleCargoCountPerTypeEnum"
    }
  }
}
```
