# ReturnsRfbsGetResponseReturns

Данные о заявке.

## Top-level fields
- `ReturnsRfbsGetResponseReturns` (top-level fields):
  - `available_actions`: `array`
  - `client_name`: `string`
  - `client_photo`: `array`
  - `client_return_method_type` → `$ref` ReturnsRfbsGetV2ResponseClientReturnMethodType
  - `comment`: `string`
  - `created_at`: `string`
  - `order_number`: `string`
  - `posting_number`: `string`
  - `product` → `$ref` v2Product
  - `rejection_comment`: `string`
  - `rejection_reason`: `array`
  - `return_method_description`: `string`
  - `return_number`: `string`
  - `return_reason` → `$ref` ReturnsRfbsGetV2ResponseReturnReason
  - `ru_post_tracking_number`: `string`
  - `state` → `$ref` v2ReturnsRfbsGetV2ResponseState
  - `warehouse_id`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Данные о заявке.",
  "properties": {
    "available_actions": {
      "type": "array",
      "description": "Данные о доступных действиях с заявкой.",
      "items": {
        "$ref": "#/components/schemas/ReturnsRfbsGetV2ResponseAvailableAction"
      }
    },
    "client_name": {
      "type": "string",
      "description": "Имя покупателя."
    },
    "client_photo": {
      "type": "array",
      "description": "Ссылки на фотографии товара.",
      "items": {
        "type": "string"
      }
    },
    "client_return_method_type": {
      "$ref": "#/components/schemas/ReturnsRfbsGetV2ResponseClientReturnMethodType"
    },
    "comment": {
      "type": "string",
      "description": "Комментарий покупателя."
    },
    "created_at": {
      "type": "string",
      "format": "date-time",
      "description": "Дата создания заявки."
    },
    "order_number": {
      "type": "string",
      "description": "Номер заказа."
    },
    "posting_number": {
      "type": "string",
      "description": "Номер отправления."
    },
    "product": {
      "$ref": "#/components/schemas/v2Product"
    },
    "rejection_comment": {
      "type": "string",
      "description": "Комментарий об отклонении заявки."
    },
    "rejection_reason": {
      "type": "array",
      "description": "Данные о причине отклонения заявки.",
      "items": {
        "$ref": "#/components/schemas/ReturnsRfbsGetV2ResponseRejectionReason"
      }
    },
    "return_method_description": {
      "type": "string",
      "description": "Способ возврата товара."
    },
    "return_number": {
      "type": "string",
      "description": "Номер заявки на возврат."
    },
    "return_reason": {
      "$ref": "#/components/schemas/ReturnsRfbsGetV2ResponseReturnReason"
    },
    "ru_post_tracking_number": {
      "type": "string",
      "description": "Трек-номер почтового отправления."
    },
    "state": {
      "$ref": "#/components/schemas/v2ReturnsRfbsGetV2ResponseState"
    },
    "warehouse_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор склада."
    }
  }
}
```
