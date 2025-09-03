# SupplierAvailableWarehousesResponseSchedule

Загруженность.

## Top-level fields
- `SupplierAvailableWarehousesResponseSchedule` (top-level fields):
  - `capacity`: `object`
  - `date`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Загруженность.",
  "properties": {
    "capacity": {
      "description": "Данные о количестве поставляемых на склад товаров.",
      "items": {
        "$ref": "#/components/schemas/SupplierAvailableWarehousesResponseCapacity"
      }
    },
    "date": {
      "type": "string",
      "format": "date-time",
      "description": "Ближайшая доступная дата для записи на поставку по местному времени."
    }
  }
}
```
