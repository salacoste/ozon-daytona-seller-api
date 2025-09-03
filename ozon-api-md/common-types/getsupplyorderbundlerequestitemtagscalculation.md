# GetSupplyOrderBundleRequestItemTagsCalculation

Список складов для расчёта товарных тегов.

## Top-level fields
- `GetSupplyOrderBundleRequestItemTagsCalculation` (top-level fields):
  - `dropoff_warehouse_id`: `string`
  - `storage_warehouse_ids`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Список складов для расчёта товарных тегов.",
  "properties": {
    "dropoff_warehouse_id": {
      "description": "Идентификатор склада отгрузки поставки.",
      "type": "string"
    },
    "storage_warehouse_ids": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Список идентификаторов складов поставки, не больше 25 значений."
    }
  },
  "required": [
    "dropoff_warehouse_id",
    "storage_warehouse_ids"
  ]
}
```
