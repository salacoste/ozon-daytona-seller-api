# SupplierAvailableWarehousesResponseCapacity

## Top-level fields
- `SupplierAvailableWarehousesResponseCapacity` (top-level fields):
  - `start`: `string`
  - `end`: `string`
  - `value`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "start": {
      "type": "string",
      "format": "date-time",
      "description": "Начало периода по местному времени."
    },
    "end": {
      "type": "string",
      "format": "date-time",
      "description": "Конец периода по местному времени."
    },
    "value": {
      "type": "integer",
      "format": "int32",
      "description": "Среднее количество товаров, которые склад может принять в день за период."
    }
  }
}
```
