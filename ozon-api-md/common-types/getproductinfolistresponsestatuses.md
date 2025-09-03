# GetProductInfoListResponseStatuses

Информация о статусах товара.

## Top-level fields
- `GetProductInfoListResponseStatuses` (top-level fields):
  - `is_created`: `boolean`
  - `moderate_status`: `string`
  - `status`: `string`
  - `status_description`: `string`
  - `status_failed`: `string`
  - `status_name`: `string`
  - `status_tooltip`: `string`
  - `status_updated_at`: `string`
  - `validation_status`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Информация о статусах товара.",
  "properties": {
    "is_created": {
      "description": "`true`, если товар создан корректно.\n",
      "type": "boolean"
    },
    "moderate_status": {
      "type": "string",
      "description": "Статус модерации."
    },
    "status": {
      "type": "string",
      "description": "Статус товара."
    },
    "status_description": {
      "type": "string",
      "description": "Описание статуса товара."
    },
    "status_failed": {
      "type": "string",
      "description": "Статус товара, в котором возникла ошибка."
    },
    "status_name": {
      "type": "string",
      "description": "Название статуса товара."
    },
    "status_tooltip": {
      "type": "string",
      "description": "Описание статуса."
    },
    "status_updated_at": {
      "type": "string",
      "format": "date-time",
      "description": "Время последнего изменения статуса."
    },
    "validation_status": {
      "type": "string",
      "description": "Статус валидации."
    }
  }
}
```
