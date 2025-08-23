# fbsv4GetProductExemplarStatusResponseProductExemplar

## Top-level fields
- `fbsv4GetProductExemplarStatusResponseProductExemplar` (top-level fields):
  - `exemplar_id`: `integer`
  - `gtd`: `string`
  - `gtd_check_status`: `string`
  - `gtd_error_codes`: `object`
  - `is_gtd_absent`: `boolean`
  - `jw_uin`: `array`
  - `jw_uin_check_status`: `string`
  - `jw_uin_error_codes`: `array`
  - `mandatory_mark`: `string`
  - `mandatory_mark_check_status`: `string`
  - `mandatory_mark_error_codes`: `object`
  - `rnpt`: `string`
  - `rnpt_check_status`: `string`
  - `rnpt_error_codes`: `object`
  - `is_rnpt_absent`: `boolean`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "exemplar_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор экземпляра."
    },
    "gtd": {
      "description": "Номер грузовой таможенной декларации (ГТД).",
      "type": "string"
    },
    "gtd_check_status": {
      "type": "string",
      "description": "Статус проверки грузовой таможенной декларации."
    },
    "gtd_error_codes": {
      "description": "Коды ошибок при проверке грузовой таможенной декларации.",
      "items": {
        "type": "string"
      }
    },
    "is_gtd_absent": {
      "type": "boolean",
      "description": "Признак того, что не указан номер таможенной декларации."
    },
    "jw_uin": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Уникальный идентификационный номер (УИН) ювелирного изделия."
    },
    "jw_uin_check_status": {
      "type": "string",
      "description": "Статус проверки уникального идентификационного номера (УИН) ювелирного изделия."
    },
    "jw_uin_error_codes": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Коды ошибок при проверке уникального идентификационного номера (УИН) ювелирного изделия."
    },
    "mandatory_mark": {
      "type": "string",
      "description": "Обязательная маркировка «Честный ЗНАК»."
    },
    "mandatory_mark_check_status": {
      "type": "string",
      "description": "Статус проверки маркировки «Честный ЗНАК»:\n- `processing` — маркировка обрабатывается.\n- `passed` — проверка пройдена.\n- `failed` — проверка не пройдена.\n"
    },
    "mandatory_mark_error_codes": {
      "description": "Коды ошибок при проверке маркировки «Честный ЗНАК».",
      "items": {
        "type": "string"
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
      "items": {
        "type": "string"
      },
      "description": "Коды ошибок при проверке регистрационного номера партии товара."
    },
    "is_rnpt_absent": {
      "type": "boolean",
      "description": "Признак того, что не указан регистрационный номер партии товара (РНПТ)."
    }
  }
}
```
