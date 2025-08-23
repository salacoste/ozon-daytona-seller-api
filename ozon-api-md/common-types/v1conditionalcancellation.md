# v1ConditionalCancellation

Результат запроса.

## Top-level fields
- `v1ConditionalCancellation` (top-level fields):
  - `cancellation_id`: `integer`
  - `posting_number`: `string`
  - `cancellation_reason` → `$ref` ConditionalCancellationCancellationReason
  - `cancelled_at`: `string`
  - `cancellation_reason_message`: `string`
  - `tpl_integration_type`: `string`
  - `state` → `$ref` ConditionalCancellationState
  - `cancellation_initiator`: `string`
  - `order_date`: `string`
  - `approve_comment`: `string`
  - `approve_date`: `string`
  - `auto_approve_date`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Результат запроса.",
  "properties": {
    "cancellation_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор заявки на отмену."
    },
    "posting_number": {
      "type": "string",
      "description": "Номер отправления."
    },
    "cancellation_reason": {
      "$ref": "#/components/schemas/ConditionalCancellationCancellationReason"
    },
    "cancelled_at": {
      "type": "string",
      "format": "date-time",
      "description": "Дата создания заявки на отмену."
    },
    "cancellation_reason_message": {
      "type": "string",
      "description": "Комментарий к заявке на отмену, введённый инициатором отмены вручную."
    },
    "tpl_integration_type": {
      "type": "string",
      "description": "Тип интеграции со службой доставки."
    },
    "state": {
      "$ref": "#/components/schemas/ConditionalCancellationState"
    },
    "cancellation_initiator": {
      "type": "string",
      "enum": [
        "OZON",
        "SELLER",
        "CLIENT",
        "SYSTEM",
        "DELIVERY"
      ],
      "description": "Инициатор отмены:\n- `OZON` — Ozon, \n- `SELLER` — продавец, \n- `CLIENT` — покупатель, \n- `SYSTEM` — система, \n- `DELIVERY` — служба доставки.\n"
    },
    "order_date": {
      "type": "string",
      "format": "date-time",
      "description": "Дата создания заказа."
    },
    "approve_comment": {
      "type": "string",
      "description": "Комментарий, оставленный при подтверждении или отклонении заявки на отмену."
    },
    "approve_date": {
      "type": "string",
      "format": "date-time",
      "description": "Дата подтверждения или отклонения заявки на отмену."
    },
    "auto_approve_date": {
      "type": "string",
      "format": "date-time",
      "description": "Дата, после которой заявка будет автоматически подтверждена."
    }
  }
}
```
