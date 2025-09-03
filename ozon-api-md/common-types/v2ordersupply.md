# v2OrderSupply

## Top-level fields
- `v2OrderSupply` (top-level fields):
  - `bundle_id`: `string`
  - `storage_warehouse_id`: `integer`
  - `supply_id`: `integer`
  - `supply_state` → `$ref` v2Supply_state
  - `supply_tags`: `object`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "bundle_id": {
      "type": "string",
      "description": "Идентификатор состава поставки. Используется в методе [/v1/supply-order/bundle](#operation/SupplyOrderBundle)."
    },
    "storage_warehouse_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор склада хранения."
    },
    "supply_id": {
      "description": "Идентификатор поставки.",
      "type": "integer",
      "format": "int64"
    },
    "supply_state": {
      "$ref": "#/components/schemas/v2Supply_state"
    },
    "supply_tags": {
      "description": "Метки товаров в заявке на поставку.",
      "items": {
        "$ref": "#/components/schemas/v2OrderSupplySupplyTags"
      }
    }
  }
}
```
