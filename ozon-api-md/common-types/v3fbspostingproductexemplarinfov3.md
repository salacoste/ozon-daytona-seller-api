# v3FbsPostingProductExemplarInfoV3

## Top-level fields
- `v3FbsPostingProductExemplarInfoV3` (top-level fields):
  - `exemplar_id`: `integer`
  - `mandatory_mark`: `string`
  - `gtd`: `string`
  - `is_gtd_absent`: `boolean`
  - `rnpt`: `string`
  - `is_rnpt_absent`: `boolean`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "exemplar_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор экземпляра."
    },
    "mandatory_mark": {
      "type": "string",
      "description": "Обязательная маркировка «Честный ЗНАК»."
    },
    "gtd": {
      "type": "string",
      "description": "Номер грузовой таможенной декларации (ГТД)."
    },
    "is_gtd_absent": {
      "type": "boolean",
      "description": "Признак того, что не указан номер таможенной декларации."
    },
    "rnpt": {
      "type": "string",
      "description": "Регистрационный номер партии товара (РНПТ)."
    },
    "is_rnpt_absent": {
      "type": "boolean",
      "description": "Признак того, что не указан регистрационный номер партии товара (РНПТ)."
    }
  }
}
```
