# ReturnsCompanyFbsInfoResponsePass_info

Информация о пропуске.

## Top-level fields
- `ReturnsCompanyFbsInfoResponsePass_info` (top-level fields):
  - `count`: `integer`
  - `is_required`: `boolean`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Информация о пропуске.",
  "properties": {
    "count": {
      "type": "integer",
      "format": "int32",
      "description": "Количество пропусков на drop-off пункт."
    },
    "is_required": {
      "type": "boolean",
      "description": "Признак, нужен ли пропуск на drop-off пункт."
    }
  }
}
```
