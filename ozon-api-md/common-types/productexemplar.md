# ProductExemplar

## Top-level fields
- `ProductExemplar` (top-level fields):
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
      "type": "array",
      "description": "Ошибки при проверке контрольных идентификационных знаков (КИЗ).",
      "items": {
        "$ref": "#/components/schemas/ExemplarMark"
      }
    },
    "rnpt": {
      "type": "string",
      "description": "Регистрационный номер партии товара (РНПТ)."
    }
  }
}
```
