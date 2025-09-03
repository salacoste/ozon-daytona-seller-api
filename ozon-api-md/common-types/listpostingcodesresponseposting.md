# ListPostingCodesResponsePosting

## Top-level fields
- `ListPostingCodesResponsePosting` (top-level fields):
  - `additional_data`: `array`
  - `analytics_data` → `$ref` PostingPostingAnalyticsData
  - `cancel_reason_id`: `integer`
  - `created_at`: `string`
  - `financial_data` → `$ref` PostingPostingFinancialData
  - `in_process_at`: `string`
  - `legal_info` → `$ref` PostingLegalInfo
  - `order_id`: `integer`
  - `order_number`: `string`
  - `posting_number`: `string`
  - `products`: `array`
  - `status`: `string`
  - `waiting_deadline_for_digital_code`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "additional_data": {
      "type": "array",
      "description": "Дополнительные параметры.",
      "items": {
        "$ref": "#/components/schemas/PostingAdditionalDataItem"
      }
    },
    "analytics_data": {
      "$ref": "#/components/schemas/PostingPostingAnalyticsData"
    },
    "cancel_reason_id": {
      "description": "Идентификатор причины отмены отправления.",
      "type": "integer",
      "format": "int64"
    },
    "created_at": {
      "description": "Дата и время создания отправления.",
      "type": "string",
      "format": "date-time"
    },
    "financial_data": {
      "$ref": "#/components/schemas/PostingPostingFinancialData"
    },
    "in_process_at": {
      "description": "Дата и время начала обработки отправления.",
      "type": "string",
      "format": "date-time"
    },
    "legal_info": {
      "$ref": "#/components/schemas/PostingLegalInfo"
    },
    "order_id": {
      "description": "Идентификатор заказа, к которому относится отправление.",
      "type": "integer",
      "format": "int64"
    },
    "order_number": {
      "description": "Номер заказа, к которому относится отправление.",
      "type": "string"
    },
    "posting_number": {
      "description": "Номер отправления.",
      "type": "string"
    },
    "products": {
      "description": "Список товаров в отправлении.",
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/PostingPostingProduct"
      }
    },
    "status": {
      "description": "Статус отправления: `awaiting_packaging` — ожидает упаковки.\n",
      "type": "string"
    },
    "waiting_deadline_for_digital_code": {
      "type": "string",
      "format": "date-time",
      "description": "Время, до которого нужно передать коды цифровых товаров. Передайте коды цифровых товаров с помощью метода [/v1/posting/digital/codes/upload](#operation/UploadPostingCodes)."
    }
  }
}
```
