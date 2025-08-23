# AverageDeliveryTimeDetailsRequestFilters

Фильтры.

## Top-level fields
- `AverageDeliveryTimeDetailsRequestFilters` (top-level fields):
  - `delivery_schema` → `$ref` AverageDeliveryTimeDetailsRequestFiltersDeliverySchema
  - `supply_period` → `$ref` AverageDeliveryTimeDetailsRequestFiltersSupplyPeriod

## Full schema (JSON)
```json
{
  "type": "object",
  "description": "Фильтры.",
  "properties": {
    "delivery_schema": {
      "$ref": "#/components/schemas/AverageDeliveryTimeDetailsRequestFiltersDeliverySchema"
    },
    "supply_period": {
      "$ref": "#/components/schemas/AverageDeliveryTimeDetailsRequestFiltersSupplyPeriod"
    }
  }
}
```
