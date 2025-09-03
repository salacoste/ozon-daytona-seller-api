# CargoesRulesGetResponseSupplyCheck

Чек-лист правил заполнения грузомест.

## Top-level fields
- `CargoesRulesGetResponseSupplyCheck` (top-level fields):
  - `cargoes_presents_rule` → `$ref` SupplyCheckCargoesPresentRule
  - `edit_deadline_expire_rule` → `$ref` SupplyCheckEditDeadlineExpireRule
  - `expire_dates_presented_rule` → `$ref` SupplyCheckExpireDatePresentedRule
  - `is_valid_distribution_rule` → `$ref` SupplyCheckIsValidDistributionRule
  - `package_units_with_distribution_rule` → `$ref` SupplyCheckPackageUnitWithDistributionRule
  - `placement_zones_rule` → `$ref` SupplyCheckPlacementZoneRule
  - `supply_id`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "description": "Чек-лист правил заполнения грузомест.",
  "properties": {
    "cargoes_presents_rule": {
      "$ref": "#/components/schemas/SupplyCheckCargoesPresentRule"
    },
    "edit_deadline_expire_rule": {
      "$ref": "#/components/schemas/SupplyCheckEditDeadlineExpireRule"
    },
    "expire_dates_presented_rule": {
      "$ref": "#/components/schemas/SupplyCheckExpireDatePresentedRule"
    },
    "is_valid_distribution_rule": {
      "$ref": "#/components/schemas/SupplyCheckIsValidDistributionRule"
    },
    "package_units_with_distribution_rule": {
      "$ref": "#/components/schemas/SupplyCheckPackageUnitWithDistributionRule"
    },
    "placement_zones_rule": {
      "$ref": "#/components/schemas/SupplyCheckPlacementZoneRule"
    },
    "supply_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор поставки."
    }
  }
}
```
