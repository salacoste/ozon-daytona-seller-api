# v5FbsPostingProductExemplarValidateV5RequestProductExemplar

## Top-level fields
- `v5FbsPostingProductExemplarValidateV5RequestProductExemplar` (top-level fields):
  - `gtd`: `string`
  - `marks`: `array`
  - `rnpt`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "gtd": {
      "type": "string",
      "description": "Номер грузовой таможенной декларации (ГТД)."
    },
    "marks": {
      "type": "array",
      "description": "Список контрольных идентификационных знаков (КИЗ) в одном экземпляре.",
      "items": {
        "$ref": "#/components/schemas/v5FbsPostingProductExemplarValidateV5RequestProductExemplarMark"
      }
    },
    "rnpt": {
      "type": "string",
      "description": "Регистрационный номер партии товара (РНПТ)."
    }
  }
}
```
