# v1CargoesLabelCreateErrors

Ошибки.

## Top-level fields
- `v1CargoesLabelCreateErrors` (top-level fields):
  - `error_reasons`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "description": "Ошибки.",
  "properties": {
    "error_reasons": {
      "description": "Причина ошибки:\n   - `INVALID_STATE` — недопустимое состояние поставки.\n   - `OPERATION_NOT_FOUND` — операция не найдена.\n   - `OPERATION_FAILED` — операция завершилась с ошибкой.\n   - `SUPPLY_NOT_BELONG_CONTRACTOR` — контрагент не соответствует поставке.\n   - `SUPPLY_NOT_BELONG_COMPANY` — компания не соответствует поставке.\n   - `SUPPLY_IS_EMPTY` — поставка без грузомест.\n   - `CARGOES_NOT_FOUND` — грузоместа не найдены.\n",
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/v1CargoesLabelCreateErrorsErrorReason"
      }
    }
  }
}
```
