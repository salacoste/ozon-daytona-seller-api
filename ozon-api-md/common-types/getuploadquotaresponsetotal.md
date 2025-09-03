# GetUploadQuotaResponseTotal

Лимит на ассортимент.

## Top-level fields
- `GetUploadQuotaResponseTotal` (top-level fields):
  - `limit`: `integer`
  - `usage`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Лимит на ассортимент.",
  "properties": {
    "limit": {
      "type": "integer",
      "format": "int64",
      "description": "Сколько всего товаров можно создать в личном кабинете."
    },
    "usage": {
      "type": "integer",
      "format": "int64",
      "description": "Сколько товаров уже создано."
    }
  }
}
```
