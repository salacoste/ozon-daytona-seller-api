# FbsPostingProductExemplarValidateResponseFbsPostingProductExemplarValidateResultProductExemplar

## Top-level fields
- `FbsPostingProductExemplarValidateResponseFbsPostingProductExemplarValidateResultProductExemplar` (top-level fields):
  - `errors`: `object`
  - `gtd`: `string`
  - `mandatory_mark`: `string`
  - `jw_uin`: `array`
  - `valid`: `boolean`
  - `rnpt`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "errors": {
      "description": "Ошибки валидации экземпляра.",
      "items": {
        "type": "string"
      }
    },
    "gtd": {
      "description": "Номер грузовой таможенной декларации (ГТД).",
      "type": "string"
    },
    "mandatory_mark": {
      "description": "Обязательная маркировка «Честный ЗНАК».",
      "type": "string"
    },
    "jw_uin": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Уникальный идентификационный номер (УИН) ювелирного изделия."
    },
    "valid": {
      "description": "Результат прохождения проверки. `true`, если код экземпляра соответствует требованиям.",
      "type": "boolean"
    },
    "rnpt": {
      "type": "string",
      "description": "Регистрационный номер партии товара (РНПТ)."
    }
  }
}
```
