# FbsPostingProductExemplarSetV6RequestExemplars

## Top-level fields
- `FbsPostingProductExemplarSetV6RequestExemplars` (top-level fields):
  - `exemplar_id`: `integer`
  - `gtd`: `string`
  - `is_gtd_absent`: `boolean`
  - `is_rnpt_absent`: `boolean`
  - `marks`: `array`
  - `rnpt`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "exemplar_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор экземпляра."
    },
    "gtd": {
      "type": "string",
      "description": "Номер грузовой таможенной декларации (ГТД)."
    },
    "is_gtd_absent": {
      "type": "boolean",
      "description": "Признак того, что не указан номер грузовой таможенной декларации (ГТД)."
    },
    "is_rnpt_absent": {
      "type": "boolean",
      "description": "Признак того, что не указан регистрационный номер партии товара (РНПТ)."
    },
    "marks": {
      "description": "Ошибки при проверке контрольных идентификационных знаков (КИЗ).",
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/ExemplarsMarks"
      }
    },
    "rnpt": {
      "type": "string",
      "description": "Регистрационный номер партии товара (РНПТ)."
    }
  }
}
```
