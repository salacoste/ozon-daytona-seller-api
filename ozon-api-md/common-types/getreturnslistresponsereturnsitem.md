# GetReturnsListResponseReturnsItem

## Top-level fields
- `GetReturnsListResponseReturnsItem` (top-level fields):
  - `exemplars`: `array`
  - `id`: `integer`
  - `company_id`: `integer`
  - `return_reason_name`: `string`
  - `type`: `string`
  - `schema`: `string`
  - `order_id`: `integer`
  - `order_number`: `string`
  - `place` → `$ref` GetReturnsListResponsePlace_now
  - `target_place` → `$ref` GetReturnsListResponsePlace_target
  - `storage` → `$ref` GetReturnsListResponseStorage
  - `product` → `$ref` GetReturnsListResponseProduct
  - `logistic` → `$ref` GetReturnsListResponseLogistic
  - `visual` → `$ref` GetReturnsListResponseVisual
  - `additional_info` → `$ref` GetReturnsListResponseAdditionalInfo
  - `source_id`: `integer`
  - `posting_number`: `string`
  - `clearing_id`: `integer`
  - `return_clearing_id`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "exemplars": {
      "type": "array",
      "description": "Информация об экземплярах.",
      "items": {
        "$ref": "#/components/schemas/GetReturnsListResponseExemplar"
      }
    },
    "id": {
      "type": "integer",
      "description": "Идентификатор возврата.",
      "format": "int64"
    },
    "company_id": {
      "type": "integer",
      "description": "Идентификатор продавца.",
      "format": "int64"
    },
    "return_reason_name": {
      "type": "string",
      "description": "Причина возврата или отмены."
    },
    "type": {
      "type": "string",
      "description": "Тип возврата: \n`Cancellation` - отмена (до вручения);\n`FullReturn` - полный отказ при вручении;\n`PartialReturn` - частичный отказ при вручении;\n`ClientReturn` - клиентский возврат (после вручения);\n`Unknown` - технический возврат.\n"
    },
    "schema": {
      "type": "string",
      "description": "Схема возврата:\n`FBS`;\n`FBO`.\n"
    },
    "order_id": {
      "type": "integer",
      "description": "Идентификатор заказа.",
      "format": "int64"
    },
    "order_number": {
      "type": "string",
      "description": "Номер заказа."
    },
    "place": {
      "$ref": "#/components/schemas/GetReturnsListResponsePlace_now"
    },
    "target_place": {
      "$ref": "#/components/schemas/GetReturnsListResponsePlace_target"
    },
    "storage": {
      "$ref": "#/components/schemas/GetReturnsListResponseStorage"
    },
    "product": {
      "$ref": "#/components/schemas/GetReturnsListResponseProduct"
    },
    "logistic": {
      "$ref": "#/components/schemas/GetReturnsListResponseLogistic"
    },
    "visual": {
      "$ref": "#/components/schemas/GetReturnsListResponseVisual"
    },
    "additional_info": {
      "$ref": "#/components/schemas/GetReturnsListResponseAdditionalInfo"
    },
    "source_id": {
      "type": "integer",
      "description": "Предыдущий идентификатор возврата.",
      "format": "int64"
    },
    "posting_number": {
      "type": "string",
      "description": "Номер отправления."
    },
    "clearing_id": {
      "type": "integer",
      "description": "Штрихкод изначального отправления.",
      "format": "int64"
    },
    "return_clearing_id": {
      "type": "integer",
      "description": "Возвратный штрихкод изначального отправления.",
      "format": "int64"
    }
  }
}
```
