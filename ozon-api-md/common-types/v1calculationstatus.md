# v1CalculationStatus

Статус создания черновика заявки на поставку:
- `CALCULATION_STATUS_FAILED` — не удалось создать черновик,
- `CALCULATION_STATUS_SUCCESS` — черновик создан,
- `CALCULATION_STATUS_IN_PROGRESS` — черновик создаётся,
- `CALCULATION_STATUS_EXPIRED` — истёк срок действия черновика.


## Full schema (JSON)
```json
{
  "type": "string",
  "default": "CALCULATION_STATUS_FAILED",
  "enum": [
    "CALCULATION_STATUS_FAILED",
    "CALCULATION_STATUS_SUCCESS",
    "CALCULATION_STATUS_IN_PROGRESS",
    "CALCULATION_STATUS_EXPIRED"
  ],
  "description": "Статус создания черновика заявки на поставку:\n- `CALCULATION_STATUS_FAILED` — не удалось создать черновик,\n- `CALCULATION_STATUS_SUCCESS` — черновик создан,\n- `CALCULATION_STATUS_IN_PROGRESS` — черновик создаётся,\n- `CALCULATION_STATUS_EXPIRED` — истёк срок действия черновика.\n"
}
```
