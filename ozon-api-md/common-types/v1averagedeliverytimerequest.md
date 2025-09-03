# v1AverageDeliveryTimeRequest

## Top-level fields
- `v1AverageDeliveryTimeRequest` (top-level fields):
  - `delivery_schema` → `$ref` v1AverageDeliveryTimeRequestDeliverySchema
  - `sku`: `array`
  - `supply_period` → `$ref` v1AverageDeliveryTimeRequestSupplyPeriod

## Full schema (JSON)
```json
{
  "type": "object",
  "required": [
    "delivery_schema",
    "supply_period"
  ],
  "properties": {
    "delivery_schema": {
      "$ref": "#/components/schemas/v1AverageDeliveryTimeRequestDeliverySchema"
    },
    "sku": {
      "maximum": 100,
      "description": "Идентификатор товара в системе Ozon — SKU.",
      "type": "array",
      "items": {
        "type": "string",
        "format": "int64"
      }
    },
    "supply_period": {
      "$ref": "#/components/schemas/v1AverageDeliveryTimeRequestSupplyPeriod"
    }
  }
}
```
