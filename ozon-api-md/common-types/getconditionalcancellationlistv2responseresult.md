# GetConditionalCancellationListV2ResponseResult

## Top-level fields
- `GetConditionalCancellationListV2ResponseResult` (top-level fields):
  - `approve_comment`: `string`
  - `approve_date`: `string`
  - `auto_approve_date`: `string`
  - `cancellation_id`: `integer`
  - `cancellation_initiator` → `$ref` v2CancellationInitiatorEnum
  - `cancellation_reason` → `$ref` GetConditionalCancellationListV2ResponseCancellationReason
  - `cancellation_reason_message`: `string`
  - `cancelled_at`: `string`
  - `order_date`: `string`
  - `posting_number`: `string`
  - `source_id`: `integer`
  - `state` → `$ref` GetConditionalCancellationListV2ResponseState
  - `tpl_integration_type`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "approve_comment": {
      "type": "string",
      "description": "Комментарий, оставленный при подтверждении или отклонении заявки на отмену."
    },
    "approve_date": {
      "description": "Дата подтверждения или отклонения заявки на отмену.",
      "type": "string",
      "format": "date-time"
    },
    "auto_approve_date": {
      "description": "Дата, после которой заявка будет автоматически подтверждена.",
      "type": "string",
      "format": "date-time"
    },
    "cancellation_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор заявки на отмену."
    },
    "cancellation_initiator": {
      "$ref": "#/components/schemas/v2CancellationInitiatorEnum"
    },
    "cancellation_reason": {
      "$ref": "#/components/schemas/GetConditionalCancellationListV2ResponseCancellationReason"
    },
    "cancellation_reason_message": {
      "description": "Комментарий к заявке на отмену, введённый инициатором отмены вручную.",
      "type": "string"
    },
    "cancelled_at": {
      "type": "string",
      "format": "date-time",
      "description": "Дата создания заявки на отмену."
    },
    "order_date": {
      "description": "Дата создания заказа.",
      "type": "string",
      "format": "date-time"
    },
    "posting_number": {
      "type": "string",
      "description": "Номер отправления."
    },
    "source_id": {
      "type": "integer",
      "format": "int64",
      "description": "Предыдущий идентификатор заявки на отмену.\n\nИспользуется для поддержания обратной совместимости.\n"
    },
    "state": {
      "$ref": "#/components/schemas/GetConditionalCancellationListV2ResponseState"
    },
    "tpl_integration_type": {
      "description": "Тип интеграции со службой доставки.",
      "type": "string"
    }
  }
}
```
