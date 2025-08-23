# v5FbsPostingProductExemplarCreateOrGetV5ResponseProduct

## Top-level fields
- `v5FbsPostingProductExemplarCreateOrGetV5ResponseProduct` (top-level fields):
  - `exemplars`: `array`
  - `is_gtd_needed`: `boolean`
  - `is_mandatory_mark_needed`: `boolean`
  - `is_rnpt_needed`: `boolean`
  - `product_id`: `integer`
  - `quantity`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "exemplars": {
      "description": "Информация об экземплярах.",
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/v5FbsPostingProductExemplarCreateOrGetV5ResponseProductExemplar"
      }
    },
    "is_gtd_needed": {
      "description": "Признак того, что необходимо передать номер грузовой таможенной декларации (ГТД) для продукта и отправления.",
      "type": "boolean"
    },
    "is_mandatory_mark_needed": {
      "description": "Признак того, что необходимо передать маркировку «Честный ЗНАК».",
      "type": "boolean"
    },
    "is_rnpt_needed": {
      "description": "Признак того, что необходимо передать номер партии товара (РНПТ).",
      "type": "boolean"
    },
    "product_id": {
      "description": "Идентификатор товара в системе продавца — `product_id`.",
      "type": "integer",
      "format": "int64"
    },
    "quantity": {
      "description": "Количество экземпляров.",
      "type": "integer",
      "format": "int32"
    }
  }
}
```
