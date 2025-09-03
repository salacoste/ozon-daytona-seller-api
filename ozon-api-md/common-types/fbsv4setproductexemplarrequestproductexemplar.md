# fbsv4SetProductExemplarRequestProductExemplar

## Top-level fields
- `fbsv4SetProductExemplarRequestProductExemplar` (top-level fields):
  - `gtd`: `string`
  - `is_gtd_absent`: `boolean`
  - `mandatory_mark`: `string`
  - `jw_uin`: `array`
  - `rnpt`: `string`
  - `is_rnpt_absent`: `boolean`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "gtd": {
      "type": "string",
      "description": "Номер грузовой таможенной декларации (ГТД)."
    },
    "is_gtd_absent": {
      "type": "boolean",
      "description": "Признак того, что не указан номер таможенной декларации."
    },
    "mandatory_mark": {
      "type": "string",
      "description": "Обязательная маркировка «Честный ЗНАК»."
    },
    "jw_uin": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Уникальный идентификационный номер (УИН) ювелирного изделия."
    },
    "rnpt": {
      "type": "string",
      "description": "Регистрационный номер партии товара (РНПТ)."
    },
    "is_rnpt_absent": {
      "type": "boolean",
      "description": "Признак того, что не указан регистрационный номер партии товара (РНПТ)."
    }
  }
}
```
