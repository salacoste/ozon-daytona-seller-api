# v5FbsPostingProductExemplarValidateV5ResponseProductExemplar

## Top-level fields
- `v5FbsPostingProductExemplarValidateV5ResponseProductExemplar` (top-level fields):
  - `errors`: `array`
  - `gtd`: `string`
  - `marks`: `array`
  - `rnpt`: `string`
  - `valid`: `boolean`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "errors": {
      "type": "array",
      "description": "Ошибки валидации экземпляра.",
      "items": {
        "type": "string"
      }
    },
    "gtd": {
      "type": "string",
      "description": "Номер грузовой таможенной декларации (ГТД)."
    },
    "marks": {
      "type": "array",
      "description": "Список контрольных идентификационных знаков (КИЗ) в одном экземпляре.",
      "items": {
        "$ref": "#/components/schemas/v5FbsPostingProductExemplarValidateV5ResponseProductExemplarMark"
      }
    },
    "rnpt": {
      "type": "string",
      "description": "Регистрационный номер партии товара (РНПТ)."
    },
    "valid": {
      "type": "boolean",
      "description": "Результат прохождения проверки. `true`, если код экземпляра соответствует требованиям."
    }
  }
}
```
