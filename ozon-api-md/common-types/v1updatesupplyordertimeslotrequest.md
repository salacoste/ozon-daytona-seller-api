# v1UpdateSupplyOrderTimeslotRequest

## Top-level fields
- `v1UpdateSupplyOrderTimeslotRequest` (top-level fields):
  - `supply_order_id`: `integer`
  - `timeslot` → `$ref` v1SupplyOrderTimeslot

## Full schema (JSON)
```json
{
  "required": [
    "supply_order_id",
    "timeslot"
  ],
  "type": "object",
  "properties": {
    "supply_order_id": {
      "description": "Идентификатор заявки на поставку.",
      "type": "integer",
      "format": "int64"
    },
    "timeslot": {
      "$ref": "#/components/schemas/v1SupplyOrderTimeslot"
    }
  }
}
```
