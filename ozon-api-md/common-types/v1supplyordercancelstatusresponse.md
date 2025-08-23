# v1SupplyOrderCancelStatusResponse

## Top-level fields
- `v1SupplyOrderCancelStatusResponse` (top-level fields):
  - `error_reasons`: `array`
  - `result` → `$ref` SupplyOrderCancelStatusResponseResult
  - `status` → `$ref` v1SupplyOrderCancelStatusResponseStatus

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "error_reasons": {
      "type": "array",
      "description": "Причина, по которой не удалось отменить заявку на поставку:\n  - `INVALID_ORDER_STATE` — неверный статус заявки на поставку.\n  - `ORDER_IS_VIRTUAL` — заявка виртуальная. \n  - `ORDER_DOES_NOT_BELONG_TO_CONTRACTOR` —  заявка на поставку не принадлежит вашему юридическому лицу.\n  - `ORDER_DOES_NOT_BELONG_TO_COMPANY` — заявка на поставку не принадлежит продавцу. \n  - `OTHER_ASYNCHRONOUS_OPERATION_IN_PROGRESS` — заявка на поставку в процессе отмены.\n",
      "items": {
        "$ref": "#/components/schemas/SupplyOrderCancelStatusResponseCancelOrderError"
      }
    },
    "result": {
      "$ref": "#/components/schemas/SupplyOrderCancelStatusResponseResult"
    },
    "status": {
      "$ref": "#/components/schemas/v1SupplyOrderCancelStatusResponseStatus"
    }
  }
}
```
