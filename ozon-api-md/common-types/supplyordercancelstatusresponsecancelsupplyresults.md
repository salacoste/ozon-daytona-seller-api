# SupplyOrderCancelStatusResponseCancelSupplyResults

## Top-level fields
- `SupplyOrderCancelStatusResponseCancelSupplyResults` (top-level fields):
  - `error_reasons`: `array`
  - `is_supply_cancelled`: `boolean`
  - `supply_id`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "error_reasons": {
      "description": "Причина, по которой не удалось отменить поставки:\n  - `INVALID_SUPPLY_STATE` — неверный статус поставки.\n  - `SUPPLY_DOES_NOT_BELONG_TO_CONTRACTOR` — поставка не принадлежит юридическому лицу.\n  - `SUPPLY_DOES_NOT_BELONG_TO_COMPANY` — поставка не принадлежит продавцу.\n  - `SUPPLY_DOES_NOT_BELONG_TO_ORDER` — поставка не принадлежит заявке на поставку.\n  - `SUPPLY_BELONGS_TO_VIRTUAL_ORDER` — поставка принадлежит виртуальной заявке на поставку.\n  - `OTHER_ASYNCHRONOUS_OPERATION_IN_PROGRESS` — поставка в процессе отмены.\n",
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/CancelSupplyResultsCancelSupplyError"
      }
    },
    "is_supply_cancelled": {
      "description": "`true`, если поставка отменена.\n",
      "type": "boolean"
    },
    "supply_id": {
      "description": "Идентификатор поставки.",
      "type": "integer",
      "format": "int64"
    }
  }
}
```
