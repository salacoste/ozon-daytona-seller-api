# draftv1Warehouse

## Top-level fields
- `draftv1Warehouse` (top-level fields):
  - `bundle_ids`: `array`
  - `restricted_bundle_id`: `string`
  - `status` → `$ref` v1WarehouseStatus
  - `supply_warehouse` → `$ref` v1SupplyWarehouse
  - `total_rank`: `integer`
  - `total_score`: `number`
  - `travel_time_days`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "bundle_ids": {
      "type": "array",
      "description": "Товарный состав в виде комплекта.",
      "items": {
        "$ref": "#/components/schemas/v1BundleId"
      }
    },
    "restricted_bundle_id": {
      "type": "string",
      "description": "Комплект товаров, которые не попадают в поставку. Используйте параметр в методе [/v1/supply-order/bundle](#operation/SupplyOrderBundle), чтобы получить подробную информацию.\n"
    },
    "status": {
      "$ref": "#/components/schemas/v1WarehouseStatus"
    },
    "supply_warehouse": {
      "$ref": "#/components/schemas/v1SupplyWarehouse"
    },
    "total_rank": {
      "type": "integer",
      "format": "int32",
      "description": "Ранг склада в кластере."
    },
    "total_score": {
      "type": "number",
      "format": "double",
      "description": "Рейтинг склада."
    },
    "travel_time_days": {
      "type": "integer",
      "format": "int64",
      "description": "Предполагаемый срок доставки.",
      "nullable": true
    }
  }
}
```
