# v2FbsPosting

Результаты запроса.

## Top-level fields
- `v2FbsPosting` (top-level fields):
  - `analytics_data` → `$ref` FbsPostingFbsPostingAnalyticsData
  - `barcodes` → `$ref` FbsPostingBarcodes
  - `cancel_reason_id`: `integer`
  - `created_at`: `string`
  - `financial_data` → `$ref` v2PostingFinancialData
  - `in_process_at`: `string`
  - `order_id`: `integer`
  - `order_number`: `string`
  - `posting_number`: `string`
  - `products`: `array`
  - `shipment_date`: `string`
  - `status`: `string`

## Full schema (JSON)
```json
{
  "properties": {
    "analytics_data": {
      "$ref": "#/components/schemas/FbsPostingFbsPostingAnalyticsData"
    },
    "barcodes": {
      "$ref": "#/components/schemas/FbsPostingBarcodes"
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
        "$ref": "#/components/schemas/v2FbsPostingProduct"
      },
      "type": "array",
      "description": "Список товаров в отправлении."
    },
    "shipment_date": {
      "format": "date-time",
      "type": "string",
      "description": "Дата и время, до которой необходимо собрать отправление. Если отправление не собрать к этой дате — оно автоматически отменится."
    },
    "status": {
      "type": "string",
      "description": "Статус отправления."
    }
  },
  "type": "object",
  "title": "object",
  "description": "Результаты запроса."
}
```
