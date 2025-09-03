# postingv4FbsPostingProductExemplarValidateRequestProductExemplar

## Top-level fields
- `postingv4FbsPostingProductExemplarValidateRequestProductExemplar` (top-level fields):
  - `gtd`: `string`
  - `mandatory_mark`: `string`
  - `jw_uin`: `array of strings`
  - `rnpt`: `string`

## Full schema (JSON)
```json
{
  "required": [
    "mandatory_mark"
  ],
  "type": "object",
  "title": "object",
  "properties": {
    "gtd": {
      "type": "string",
      "description": "Номер грузовой таможенной декларации (ГТД)."
    },
    "mandatory_mark": {
      "type": "string",
      "description": "Обязательная маркировка «Честный ЗНАК»."
    },
    "jw_uin": {
      "type": "array of strings",
      "description": "Уникальный идентификационный номер (УИН) ювелирного изделия."
    },
    "rnpt": {
      "type": "string",
      "description": "Регистрационный номер партии товара (РНПТ)."
    }
  }
}
```
