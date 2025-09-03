# v2FboPosting

Результат запроса.

## Top-level fields
- `v2FboPosting` (top-level fields):
  - `additional_data`: `array`
  - `analytics_data` → `$ref` FboPostingFboPostingAnalyticsData
  - `cancel_reason_id`: `integer`
  - `created_at`: `string`
  - `financial_data` → `$ref` v2PostingFinancialData
  - `in_process_at`: `string`
  - `legal_info` → `$ref` v2FboSinglePostingLegalInfo
  - `order_id`: `integer`
  - `order_number`: `string`
  - `posting_number`: `string`
  - `products`: `array`
  - `status`: `string`

## Full schema (JSON)
```json
{
  "properties": {
    "additional_data": {
      "items": {
        "$ref": "#/components/schemas/v2AdditionalDataItem"
      },
      "type": "array"
    },
    "analytics_data": {
      "$ref": "#/components/schemas/FboPostingFboPostingAnalyticsData"
    },
    "cancel_reason_id": {
      "format": "int64",
      "type": "integer",
      "description": "Идентификатор причины отмены отправления."
    },
    "created_at": {
      "format": "date-time",
      "type": "string",
      "description": "Дата и время создания отправления."
    },
    "financial_data": {
      "$ref": "#/components/schemas/v2PostingFinancialData"
    },
    "in_process_at": {
      "format": "date-time",
      "type": "string",
      "description": "Дата и время начала обработки отправления."
    },
    "legal_info": {
      "$ref": "#/components/schemas/v2FboSinglePostingLegalInfo"
    },
    "order_id": {
      "format": "int64",
      "type": "integer",
      "description": "Идентификатор заказа, к которому относится отправление."
    },
    "order_number": {
      "type": "string",
      "description": "Номер заказа, к которому относится отправление."
    },
    "posting_number": {
      "type": "string",
      "description": "Номер отправления."
    },
    "products": {
      "items": {
        "$ref": "#/components/schemas/v2PostingProduct"
      },
      "type": "array",
      "description": "Список товаров в отправлении."
    },
    "status": {
      "type": "string",
      "description": "Статус отправления:\n  - `awaiting_packaging` — ожидает упаковки,\n  - `awaiting_deliver` — ожидает отгрузки,\n  - `delivering` — доставляется,\n  - `delivered` — доставлено,\n  - `cancelled` — отменено.\n"
    }
  },
  "type": "object",
  "title": "object",
  "description": "Результат запроса."
}
```
