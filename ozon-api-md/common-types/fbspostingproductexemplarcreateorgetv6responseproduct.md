# FbsPostingProductExemplarCreateOrGetV6ResponseProduct

## Top-level fields
- `FbsPostingProductExemplarCreateOrGetV6ResponseProduct` (top-level fields):
  - `exemplars`: `array`
  - `is_gtd_needed`: `boolean`
  - `is_jw_uin_needed`: `boolean`
  - `is_mandatory_mark_needed`: `boolean`
  - `is_mandatory_mark_possible`: `boolean`
  - `is_rnpt_needed`: `boolean`
  - `product_id`: `integer`
  - `quantity`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "exemplars": {
      "type": "array",
      "description": "Информация об экземплярах.",
      "items": {
        "$ref": "#/components/schemas/ProductExemplar"
      }
    },
    "is_gtd_needed": {
      "type": "boolean",
      "description": "Признак того, что необходимо передать номер грузовой таможенной декларации (ГТД) для продукта и отправления."
    },
    "is_jw_uin_needed": {
      "type": "boolean",
      "description": "Признак того, что необходимо передать уникальный идентификационный номер ювелирного изделия (УИН)."
    },
    "is_mandatory_mark_needed": {
      "type": "boolean",
      "description": "Признак того, что необходимо передать маркировку «Честный ЗНАК»."
    },
    "is_mandatory_mark_possible": {
      "type": "boolean",
      "description": "Признак того, что возможно заполнить маркировку «Честный ЗНАК»."
    },
    "is_rnpt_needed": {
      "type": "boolean",
      "description": "Признак того, что необходимо передать номер партии товара (РНПТ)."
    },
    "product_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор товара в системе Ozon — SKU."
    },
    "quantity": {
      "type": "integer",
      "format": "int32",
      "description": "Количество экземпляров."
    }
  }
}
```
