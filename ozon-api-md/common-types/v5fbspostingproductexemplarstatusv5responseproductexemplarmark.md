# v5FbsPostingProductExemplarStatusV5ResponseProductExemplarMark

## Top-level fields
- `v5FbsPostingProductExemplarStatusV5ResponseProductExemplarMark` (top-level fields):
  - `check_status`: `string`
  - `error_codes`: `array`
  - `mark`: `string`
  - `mark_type`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "check_status": {
      "type": "string",
      "description": "Статус проверки."
    },
    "error_codes": {
      "description": "Ошибки при проверке контрольных идентификационных знаков (КИЗ).",
      "type": "array",
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
    }
  }
}
```
