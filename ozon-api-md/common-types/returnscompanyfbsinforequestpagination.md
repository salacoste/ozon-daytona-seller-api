# ReturnsCompanyFbsInfoRequestPagination

Разделение ответа метода.

## Top-level fields
- `ReturnsCompanyFbsInfoRequestPagination` (top-level fields):
  - `last_id`: `integer`
  - `limit`: `integer`

## Full schema (JSON)
```json
{
  "required": [
    "limit"
  ],
  "type": "object",
  "title": "object",
  "description": "Разделение ответа метода.",
  "properties": {
    "last_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор последнего drop-off пункта на странице. Для первого запроса оставьте это поле пустым.\n\nЧтобы получить следующие значения, укажите `id` последнего drop-off пункта из ответа предыдущего запроса.\n"
    },
    "limit": {
      "type": "integer",
      "format": "int32",
      "description": "Количество drop-off пунктов на странице. Максимум — 500."
    }
  }
}
```
