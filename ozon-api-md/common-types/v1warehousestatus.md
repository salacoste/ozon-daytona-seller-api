# v1WarehouseStatus

Доступность склада.

## Top-level fields
- `v1WarehouseStatus` (top-level fields):
  - `invalid_reason` → `$ref` v1WarehouseScoringInvalidReason
  - `is_available`: `boolean`
  - `state` → `$ref` v1WarehouseScoringStatus

## Full schema (JSON)
```json
{
  "type": "object",
  "description": "Доступность склада.",
  "properties": {
    "invalid_reason": {
      "$ref": "#/components/schemas/v1WarehouseScoringInvalidReason"
    },
    "is_available": {
      "type": "boolean",
      "description": "Доступность склада:\n- `true` — доступен,\n- `false` — недоступен.\n"
    },
    "state": {
      "$ref": "#/components/schemas/v1WarehouseScoringStatus"
    }
  }
}
```
