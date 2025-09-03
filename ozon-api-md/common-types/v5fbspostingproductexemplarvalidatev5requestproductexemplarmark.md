# v5FbsPostingProductExemplarValidateV5RequestProductExemplarMark

## Top-level fields
- `v5FbsPostingProductExemplarValidateV5RequestProductExemplarMark` (top-level fields):
  - `mark`: `string`
  - `mark_type`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
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
