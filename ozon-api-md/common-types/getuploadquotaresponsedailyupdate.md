# GetUploadQuotaResponseDailyUpdate

Суточный лимит на обновление товаров.

## Top-level fields
- `GetUploadQuotaResponseDailyUpdate` (top-level fields):
  - `limit`: `integer`
  - `reset_at`: `string`
  - `usage`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Суточный лимит на обновление товаров.",
  "properties": {
    "limit": {
      "type": "integer",
      "format": "int64",
      "description": "Сколько всего товаров можно обновить в сутки."
    },
    "reset_at": {
      "type": "string",
      "format": "date-time",
      "description": "Время в формате UTC, когда сбросится значение счётчика за текущие сутки."
    },
    "usage": {
      "type": "integer",
      "format": "int64",
      "description": "Сколько товаров обновлено за текущие сутки."
    }
  }
}
```
