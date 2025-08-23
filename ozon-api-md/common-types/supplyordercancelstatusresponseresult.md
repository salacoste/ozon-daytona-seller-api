# SupplyOrderCancelStatusResponseResult

Информация об отмене заявки на поставку.

## Top-level fields
- `SupplyOrderCancelStatusResponseResult` (top-level fields):
  - `is_order_cancelled`: `boolean`
  - `supplies`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "description": "Информация об отмене заявки на поставку.",
  "properties": {
    "is_order_cancelled": {
      "description": "`true`, если заявка на поставку отменена.\n",
      "type": "boolean"
    },
    "supplies": {
      "description": "Список отменённых поставок.",
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/SupplyOrderCancelStatusResponseCancelSupplyResults"
      }
    }
  }
}
```
