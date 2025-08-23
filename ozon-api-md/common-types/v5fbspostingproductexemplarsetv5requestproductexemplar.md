# v5FbsPostingProductExemplarSetV5RequestProductExemplar

## Top-level fields
- `v5FbsPostingProductExemplarSetV5RequestProductExemplar` (top-level fields):
  - `exemplar_id`: `integer`
  - `gtd`: `string`
  - `is_gtd_absent`: `boolean`
  - `is_rnpt_absent`: `boolean`
  - `mandatory_mark`: `string`
  - `rnpt`: `string`
  - `jw_uin`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "exemplar_id": {
      "description": "Идентификатор экземпляра.",
      "type": "integer",
      "format": "int64"
    },
    "gtd": {
      "description": "Номер грузовой таможенной декларации (ГТД).",
      "type": "string"
    },
    "is_gtd_absent": {
      "description": "Признак того, что не указан номер грузовой таможенной декларации (ГТД).",
      "type": "boolean"
    },
    "is_rnpt_absent": {
      "description": "Признак того, что не указан регистрационный номер партии товара (РНПТ).",
      "type": "boolean"
    },
    "mandatory_mark": {
      "description": "Обязательная маркировка «Честный ЗНАК».",
      "type": "string"
    },
    "rnpt": {
      "description": "Регистрационный номер партии товара (РНПТ).",
      "type": "string"
    },
    "jw_uin": {
      "description": "Уникальный идентификационный номер (УИН) ювелирного изделия.",
      "type": "string"
    }
  },
  "required": [
    "exemplar_id"
  ]
}
```
