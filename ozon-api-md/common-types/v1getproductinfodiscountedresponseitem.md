# v1GetProductInfoDiscountedResponseItem

## Top-level fields
- `v1GetProductInfoDiscountedResponseItem` (top-level fields):
  - `comment_reason_damaged`: `string`
  - `condition`: `string`
  - `condition_estimation`: `string`
  - `defects`: `string`
  - `discounted_sku`: `integer`
  - `mechanical_damage`: `string`
  - `package_damage`: `string`
  - `packaging_violation`: `string`
  - `reason_damaged`: `string`
  - `repair`: `string`
  - `shortage`: `string`
  - `sku`: `integer`
  - `warranty_type`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "comment_reason_damaged": {
      "type": "string",
      "description": "Комментарий к причине повреждения."
    },
    "condition": {
      "type": "string",
      "description": "Состояние товара — новый или Б/У."
    },
    "condition_estimation": {
      "type": "string",
      "description": "Состояние товара по шкале от 1 до 7:\n- 1 — удовлетворительное,\n- 2 — хорошее,\n- 3 — очень хорошее,\n- 4 — отличное,\n- 5–7 — как новый.\n"
    },
    "defects": {
      "type": "string",
      "description": "Дефекты товара."
    },
    "discounted_sku": {
      "type": "integer",
      "format": "int64",
      "description": "SKU уценённого товара."
    },
    "mechanical_damage": {
      "type": "string",
      "description": "Описание механического повреждения."
    },
    "package_damage": {
      "type": "string",
      "description": "Описание повреждения упаковки."
    },
    "packaging_violation": {
      "type": "string",
      "description": "Признак нарушения целостности упаковки."
    },
    "reason_damaged": {
      "type": "string",
      "description": "Причина повреждения."
    },
    "repair": {
      "type": "string",
      "description": "Признак, что товар отремонтирован."
    },
    "shortage": {
      "type": "string",
      "description": "Признак, что товар некомплектный."
    },
    "sku": {
      "type": "integer",
      "format": "int64",
      "description": "SKU основного товара."
    },
    "warranty_type": {
      "type": "string",
      "description": "Наличие у товара действующей гарантии."
    }
  }
}
```
