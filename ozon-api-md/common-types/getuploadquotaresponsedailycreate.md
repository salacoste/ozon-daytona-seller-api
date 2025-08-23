# GetUploadQuotaResponseDailyCreate

Суточный лимит на создание товаров.

## Top-level fields
- `GetUploadQuotaResponseDailyCreate` (top-level fields):
  - `limit`: `integer`
  - `reset_at`: `string`
  - `usage`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Суточный лимит на создание товаров.",
  "properties": {
    "limit": {
      "type": "integer",
      "format": "int64",
      "description": "Сколько всего товаров можно создать в сутки."
    },
    "reset_at": {
      "type": "string",
      "format": "date-time",
      "description": "Время в формате UTC, когда сбросится значение счётчика за текущие сутки."
    },
    "usage": {
      "type": "integer",
      "format": "int64",
      "description": "Сколько товаров создано за текущие сутки."
    }
  }
}
```
