# v5FbsPostingProductExemplarValidateV5ResponseProductExemplarMark

## Top-level fields
- `v5FbsPostingProductExemplarValidateV5ResponseProductExemplarMark` (top-level fields):
  - `errors`: `array`
  - `mark`: `string`
  - `mark_type`: `string`
  - `valid`: `boolean`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "errors": {
      "type": "array",
      "description": "Ошибки при проверке контрольных идентификационных знаков (КИЗ).",
      "items": {
        "type": "string"
      }
    },
    "mark": {
      "type": "string",
      "description": "Значение кода маркировки."
    },
    "mark_type": {
      "type": "string",
      "description": "Тип кода маркировки:\n - `mandatory_mark` — обязательная маркировка «Честный ЗНАК»;\n - `jw_uin` — уникальный идентификационный номер (УИН) ювелирного изделия.\n"
    },
    "valid": {
      "type": "boolean",
      "description": "Результат прохождения проверки. `true`, если контрольный идентификационный знак (КИЗ) соответствует требованиям."
    }
  }
}
```
