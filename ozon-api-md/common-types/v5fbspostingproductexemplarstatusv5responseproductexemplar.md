# v5FbsPostingProductExemplarStatusV5ResponseProductExemplar

## Top-level fields
- `v5FbsPostingProductExemplarStatusV5ResponseProductExemplar` (top-level fields):
  - `exemplar_id`: `integer`
  - `gtd`: `string`
  - `gtd_check_status`: `string`
  - `gtd_error_codes`: `array`
  - `is_gtd_absent`: `boolean`
  - `is_rnpt_absent`: `boolean`
  - `marks`: `array`
  - `rnpt`: `string`
  - `rnpt_check_status`: `string`
  - `rnpt_error_codes`: `array`

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
    "gtd_check_status": {
      "type": "string",
      "description": "Статус проверки грузовой таможенной декларации."
    },
    "gtd_error_codes": {
      "type": "array",
      "description": "Коды ошибок при проверке грузовой таможенной декларации.",
      "items": {
        "type": "string"
      }
    },
    "is_gtd_absent": {
      "type": "boolean",
      "description": "Признак того, что не указан номер таможенной декларации (ГТД)."
    },
    "is_rnpt_absent": {
      "type": "boolean",
      "description": "Признак того, что не указан регистрационный номер партии товара (РНПТ)."
    },
    "marks": {
      "type": "array",
      "description": "Список контрольных идентификационных знаков (КИЗ) в одном экземпляре.",
      "items": {
        "$ref": "#/components/schemas/v5FbsPostingProductExemplarStatusV5ResponseProductExemplarMark"
      }
    },
    "rnpt": {
      "type": "string",
      "description": "Регистрационный номер партии товара (РНПТ)."
    },
    "rnpt_check_status": {
      "type": "string",
      "description": "Статус проверки регистрационного номера партии товара."
    },
    "rnpt_error_codes": {
      "type": "array",
      "description": "Коды ошибок при проверке регистрационного номера партии товара.",
      "items": {
        "type": "string"
      }
    }
  }
}
```
