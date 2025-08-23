# v1CargoesCreateErrors

Ошибки.

## Top-level fields
- `v1CargoesCreateErrors` (top-level fields):
  - `error_reasons`: `array`
  - `items_validation`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "description": "Ошибки.",
  "properties": {
    "error_reasons": {
      "description": "Причина ошибки:\n  - `INVALID_STATE` — недопустимое состояние поставки.\n  - `VALIDATION_FAILED` — ошибки валидации.\n  - `WAREHOUSE_LIMITS_EXCEED` — превышены лимиты склада.\n  - `SUPPLY_NOT_BELONG_CONTRACTOR` — поставка не относится к указанному контрагенту.\n  - `SUPPLY_NOT_BELONG_COMPANY` — поставка не относится к указанной компании.\n  - `IS_FINALIZED` — редактирование поставки недоступно.\n  - `SKU_DISTRIBUTION_DISABLED` — распределение состава недоступно.\n  - `SUPPLY_IS_NOT_EMPTY` — поставка содержит распределение состава.\n  - `OPERATION_NOT_FOUND` — операция не найдена.\n  - `OPERATION_FAILED` — ошибка при обработке операции.\n",
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/CargoesCreateErrorsErrorReason"
      }
    },
    "items_validation": {
      "description": "Ошибки валидации.",
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/CargoesCreateErrorsItemValidation"
      }
    }
  }
}
```
