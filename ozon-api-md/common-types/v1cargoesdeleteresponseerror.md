# v1CargoesDeleteResponseError

Список ошибок, которые возникли при удалении грузомест.

## Top-level fields
- `v1CargoesDeleteResponseError` (top-level fields):
  - `cargo_error_reasons`: `array`
  - `supply_error_reasons`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "description": "Список ошибок, которые возникли при удалении грузомест.",
  "properties": {
    "cargo_error_reasons": {
      "type": "array",
      "description": "Ошибки при удалении грузомест.",
      "items": {
        "$ref": "#/components/schemas/v1CargoesDeleteResponseErrorCargoErrorReason"
      }
    },
    "supply_error_reasons": {
      "type": "array",
      "description": "Список ошибок поставки:\n- `SUPPLY_NOT_FOUND` — поставка не найдена,\n- `CANT_DELETE_ALL_CARGOES` — нельзя удалять все грузоместа,\n- `SUPPLY_DOES_NOT_BELONG_TO_THE_CONTRACTOR` — не принадлежит вашему юридическому лицу,\n- `SUPPLY_DOES_NOT_BELONG_TO_THE_COMPANY` — не принадлежит вашему кабинету,\n- `SUPPLY_CARGOES_IS_FINALIZED` — грузоместа поставки нельзя редактировать,\n- `SUPPLY_CARGOES_LOCKED` — другой процесс блокирует редактирование грузомест поставки,\n- `OPERATION_NOT_FOUND` — операция не найдена.\n",
      "items": {
        "$ref": "#/components/schemas/v1CargoesDeleteResponseErrorSupplyErrorReasonEnum"
      }
    }
  }
}
```
